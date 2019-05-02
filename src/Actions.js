//create functions
const uuidv4 = require('uuid/v4');
//create user
const createUser = ({name = '', socketId= null} = {})=>(
	{
		id:uuidv4(),
		name,
		socketId
		
	}
)


//create message

const createMessage = ({message = '', sender = ''} = { })=>(
    {
        id:uuidv4(),
        time:getTime(new Date(Date.now())),
        message,
        sender	
    }

)

//create chat
const createChat = ({messages = [], name = "OnlineUsers", users = [],isOnlineUser = false } = {})=>(
	{
		id:uuidv4(),
		name :isOnlineUser ? 'OnlineChat' : createChatNameFromUsers(users),
		messages,
		users,
		typingUsers:[],
		isOnlineUser
	}
)
//create group name
const createChatNameFromUsers = (users, excludedUser = "") =>{
	return users.filter(u => u!== excludedUser).join(' & ') || 'No Users'
}
//getDate
//returns time in 24 hr format '11:30'

const getTime = (date) => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
}

module.exports = {
	createMessage,
	createChat,
	createUser,
	createChatNameFromUsers
}
