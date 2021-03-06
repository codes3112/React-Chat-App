import React, { Component } from 'react';
import { SideBarOption } from './SideBarOption';
import { last, get, differenceBy } from 'lodash';
import { createChatNameFromUsers } from '../../Actions'

//import { FAChevronDown } from 'react-icons/md/keyboard-arrow-down';
// import { FAMenu } from 'react-icons/lib/fa/list-ul';
// import { FASearch } from 'react-icons/lib/fa/search';
// import { MdEject } from 'react-icons/lib/md/eject';

export default class SideBar extends Component {
	static type = {
		CHATS: 'chats',
		USERS: 'users'
	}
	state = {
		receiver: '',
		activeSideBar: SideBar.type.CHATS
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { receiver } = this.state;
		//console.log(receiver);
		const { onSendPrivateMessage } = this.props;
		onSendPrivateMessage(receiver);
		this.setState({ receiver: '' })
	}

	addChatForUser = (username) => {
		this.setActiveSideBar(SideBar.type.CHATS)
		this.props.onSendPrivateMessage(username);
	}

	setActiveSideBar = (newSideBar) => {
		this.setState({ activeSideBar: newSideBar })
	}
	render() {
		//props from chat container
		const { chats, activeChat, user, setActiveChat, logout, users } = this.props
		const { receiver, activeSideBar } = this.state;
		return (
			<div id="side-bar">
				<div className="heading">
					<div className="app-name">My_Chat_App
						{/* <FAChevronDown /> */}
					</div>
					<div className="menu">
						{/* <FAMenu /> */}
					</div>
				</div>
				<form onSubmit={this.handleSubmit} className="search">
					<i className="search-icon">
						{/* <FASearch /> */}
					</i>
					<input
						placeholder="Search"
						type="text"
						value={receiver}
						onChange={(e) => { this.setState({ receiver: e.target.value }) }} />
					<div className="plus"></div>
				</form>

				<div className='side-bar-select'>
					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.CHATS) }}
						className={`side-bar-select__option ${activeSideBar === SideBar.type.CHATS}`}>
						<span>OnlineChats</span>
					</div>

					<div
						onClick={() => { this.setActiveSideBar(SideBar.type.USERS) }}
						className={`side-bar-select__option ${activeSideBar === SideBar.type.USERS}`}>
						<span>Users</span>
					</div>

				</div>

				<div
					className="users"
					ref='users'
					onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>

					{
						activeSideBar === SideBar.type.CHATS ?
							chats && chats.map((chat) => {
								return (
									<SideBarOption
										key={chat.id}
										lastMessage={get(last(chat.messages), 'message', '')}
										name={chat.isOnlineUser ? chat.name : createChatNameFromUsers(chat.users, user.name)}
										active={activeChat.id === chat.id}
										onClick={() => { this.props.setActiveChat(chat) }}
									/>
								)
							})

							:
							differenceBy(users, [user], 'name').map((otherUser) => {
								return <SideBarOption
									key={otherUser.id}
									name={otherUser.name}
									onClick={() => { this.addChatForUser(otherUser.name) }}
								/>
							})
					}
				</div>
				<div className="current-user">
					<span>{user.name}</span>
					<div onClick={() => { logout() }} title="Logout">Logout
							{/* <MdEject/>	 */}
					</div>
				</div>
			</div>
		);

	}
}