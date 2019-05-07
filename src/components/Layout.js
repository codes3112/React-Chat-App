import React, { Component } from 'react';
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';


// const socketUrl = 'http://10.5.143.17:4000'
const socketUrl = '/'
export default class Layout extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            socket:null,
            user:null
        };
      }
    componentWillMount() {
        this.initSocket();
        console.log('component wii mount');
    }

    //connect to and initialize socket

    initSocket = () => {
        const socket = io(socketUrl)
        socket.on('connect', () => {
            if(this.state.user){
                this.reconnect(socket)
            }else{
                console.log('Connected');
            }
            
        })
        this.setState({ socket });
    }
    reconnect =(socket) =>{
        socket.emit(VERIFY_USER, this.state.name, ({isUser, user}) =>{
        if(isUser){
            this.setState( {user:null})
        } else{
            this.setUser(user)
        }
        })
    }
    //Set the user property in state
    //@param user{id:number, name:string}
    setUser = (user) => {
        const { socket } = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({ user });
    }

    //Sets the user property in state to null

    logout = () => {
        const { socket } = this.state
        socket.emit(LOGOUT);
        this.setState({ user: null })
    }

    render() {
        // const { title } = this.props
        const { socket, user} = this.state
        return (
            <div className='container'>
                {/* {title} */}
            {
					!user ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<ChatContainer socket={socket} user={user} logout={this.logout}/>
				}
			</div>
		);
	}
}
