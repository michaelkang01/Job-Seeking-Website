/**
 * This controller is used to handle all chat requests.
 * 
 * Particularly, this handles websocket requests from the client, and notifies the client if a new message has arrived.
 */

const { verifyUser } = require("../middleware/auth");
const { queryString } = require("query-string");

const initChat = async (ws, data, authData, ChatInstance, User, connections) => {
    ChatInstance.find({
        $or: [{
            personOne: authData.id
        }, {
            personTwo: authData.id
        }]
    }, async (err, chats) => {
        if (err) {
            ws.send(JSON.stringify({
                type: 'init',
                error: 'Error while fetching chats'
            }));
            return;
        }

        // Fetch first/last name of chat users
        const getUsers = async () =>
            Promise.all(chats.map(async (chat) => {
                let userId = "";
                if (chat.personOne == authData.id) {
                    userId = chat.personTwo;
                } else {
                    userId = chat.personOne;
                }
                const user = await User.find({
                    _id: userId
                });
                return {
                    _id: userId,
                    firstName: user[0].firstName || "None",
                    lastName: user[0].lastName || "Set"
                };
            }));

        const users = await getUsers();
        console.log(users);

        ws.send(JSON.stringify({
            type: 'init',
            chats: chats,
            users: users
        }));
    })
}

const sendMessage = async (ws, data, authData, ChatInstance, User, connections) => {
    const from = authData.id;
    const to = data.to;
    const message = data.message;

    // Check if users are valid
    User.find({ id: from }, (err, user) => {
        if (err || !user) {
            ws.send(JSON.stringify({
                type: 'send',
                error: 'Invalid user'
            }));
            return;
        }
    });

    User.find({ id: to }, (err, user) => {
        if (err || !user) {
            ws.send(JSON.stringify({
                type: 'send',
                error: 'Invalid user'
            }));
            return;
        }
    });

    ChatInstance.find({
        $or: [{
            personOne: from,
            personTwo: to
        }, {
            personOne: to,
            personTwo: from
        }]
    }, async (err, chats) => {
        let chat = chats && chats[0] || null;
        if (err) {
            console.log(err);
            return;
        }
        if (!chat) {
            console.log("Creating new chat");
            if (from === to) {
                return;
            }

            chat = ChatInstance.create({
                personOne: from,
                personTwo: to,
                messages: []
            });
        }
        const when = (new Date()).getTime();

        chat.messages.push({
            message: message,
            sender: from,
            when: when,
        });

        const saveChat = await chat.save();

        if (!saveChat) {
            console.log(err);
            ws.send(JSON.stringify({
                type: 'send',
                error: 'Error while saving chat'
            }));
        } else {
            // Notify 
            ws.send(JSON.stringify({
                type: 'send',
                message: message,
                to: to,
                from: from,
                when: when,
                status: 'success'
            }));

            // Notify other clients
            connections.forEach(connection => {
                if (connection && connection.webSocket && (connection.userId === to || connection.userId === from)) {
                    // Send message to client
                    connection.webSocket.send(JSON.stringify({
                        type: 'new_message',
                        to: to,
                        from: from,
                        personOne: chat.personOne,
                        personTwo: chat.personTwo,
                        message: message,
                        messageId: saveChat._id,
                        when: when
                    }));
                }
            });
        }
    });
};

module.exports = { initChat, sendMessage };