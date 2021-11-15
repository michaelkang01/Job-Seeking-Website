/**
 * This controller is used to handle all chat requests.
 *
 * Particularly, this handles websocket requests from the client, and notifies the client if a new message has arrived.
 */

const { verifyUser } = require("../middleware/auth");
const { queryString } = require("query-string");

const initChat = async (
  ws,
  data,
  authData,
  ChatInstance,
  User,
  connections
) => {
  ChatInstance.find(
    {
      $or: [
        {
          personOne: authData.id,
        },
        {
          personTwo: authData.id,
        },
      ],
    },
    async (err, chats) => {
      if (err) {
        ws.send(
          JSON.stringify({
            type: "init",
            error: "Error while fetching chats",
          })
        );
        return;
      }

      // Fetch first/last name of chat users
      const getUsers = async () =>
        Promise.all(
          chats.map(async (chat) => {
            let userId = "";
            if (chat.personOne == authData.id) {
              userId = chat.personTwo;
            } else {
              userId = chat.personOne;
            }
            const user = await User.find({
              _id: userId,
            });
            return {
              _id: userId,
              firstName: (user && user[0] && user[0].firstName) || "None",
              lastName: (user && user[0] && user[0].lastName) || "Set",
            };
          })
        );

      const users = await getUsers();

      ws.send(
        JSON.stringify({
          type: "init",
          chats: chats,
          users: users,
        })
      );
    }
  );
};

const sendMessage = async (
  ws,
  data,
  authData,
  ChatInstance,
  User,
  connections
) => {
  const from = authData.id;
  const to = data.to;
  const message = data.message;
  let fromUser;
  let toUser;
  let isValid = true;

  // Check if users are valid
  fromUser = await User.findOne({ _id: from });

  toUser = await User.findOne({ _id: to });

  console.log(to);
  console.log(fromUser, toUser);

  if (!fromUser || !toUser) {
    ws.send(
      JSON.stringify({
        type: "send",
        error: "Invalid user",
      })
    );
    isValid = false;
    return;
  }

  ChatInstance.find(
    {
      $or: [
        {
          personOne: from,
          personTwo: to,
        },
        {
          personOne: to,
          personTwo: from,
        },
      ],
    },
    async (err, chats) => {
      let isNewChat = false;
      let personOne,
        personTwo = "";

      let chat = (chats && chats[0]) || null;
      if (err) {
        return;
      }

      const when = new Date().getTime();
      let saveChat;

      if (!chat) {
        if (from === to) {
          return;
        }

        saveChat = await ChatInstance.create({
          personOne: from,
          personTwo: to,
          messages: [
            {
              sender: from,
              message: message,
              when: when,
            },
          ],
        });

        toUser = (
          await User.find({
            _id: to,
          })
        )[0];

        personOne = from;
        personTwo = to;
        isNewChat = true;
      } else {
        chat.messages.push({
          message: message,
          sender: from,
          when: when,
        });
        personOne = chat.personOne;
        personTwo = chat.personTwo;
        saveChat = await chat.save();
      }

      if (!saveChat) {
        ws.send(
          JSON.stringify({
            type: "send",
            error: "Error while saving chat",
          })
        );
      }

      // Notify
      ws.send(
        JSON.stringify({
          type: "send",
          message: message,
          to: to,
          from: from,
          isNewChat: isNewChat,
          when: when,
          status: "success",
        })
      );

      // Notify other clients
      connections.forEach((connection) => {
        if (
          connection &&
          connection.webSocket &&
          (connection.userId === to || connection.userId === from)
        ) {
          // Send message to client)
          connection.webSocket.send(
            JSON.stringify({
              type: "new_message",
              to: to,
              from: from,
              personOne: personOne,
              personTwo: personTwo,
              fromUser: {
                firstName: fromUser.firstName,
                lastName: fromUser.lastName,
                id: from,
              },
              toUser: {
                firstName: (toUser && toUser.firstName) || "None",
                lastName: (toUser && toUser.lastName) || "Set",
                id: to,
              },
              message: message,
              isNewChat: isNewChat,
              chatId: saveChat._id,
              when: when,
            })
          );
        }
      });
    }
  );
};

module.exports = { initChat, sendMessage };
