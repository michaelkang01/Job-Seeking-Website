import { randomBytes } from "crypto";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type UserTableRow = {
    firstName: string;
    lastName: string;
}

type UserTable = {
    [id: string]: UserTableRow;
}

type ChatInstance = {
    _id: string;
    personOne: string;
    personTwo: string;
    messages: [
        {
            sender: string;
            message: string;
            when: string;
        }
    ];
}

type ModalProps = {
    webSocket: WebSocket | undefined;
}

const ChatSystem = () => {
    const auth = useAuth();
    const authToken = auth.getAuthData().authToken;
    const authData = auth.getAuthData().authData;
    const [webSocket, setWebSocket] = useState<WebSocket | undefined>();
    const [loading, setLoading] = useState(true);
    const [chatSessions, setChatSessions] = useState<Array<ChatInstance>>([]);
    const [userTable, setUserTable] = useState<UserTable>({});
    const [selectedChat, setSelectedChat] = useState<ChatInstance | undefined>();
    const chime = new Audio('/assets/message_received.mp3');
    const [disconnected, setDisconnected] = useState(false);
    const [showComposeModal, setShowComposeModal] = useState(false);

    // Attempt to establish a websocket connection to the server
    useEffect(() => {
        if (webSocket === undefined && authToken !== "") {
            console.log("Attempting to establish websocket connection...");
            const newWebSocket = new WebSocket("ws://localhost:8001/api/ws/connect");
            setWebSocket(newWebSocket);

            newWebSocket.onmessage = (event) => {
                if (event.data && event.data.length > 0) {
                    const data = JSON.parse(event.data);
                    if (data.type === "init") {
                        chatSessions.splice(0, chatSessions.length);
                        let first = true;
                        data.chats.forEach((chat: any) => {
                            const chatInstance: ChatInstance = {
                                _id: chat._id,
                                personOne: chat.personOne,
                                personTwo: chat.personTwo,
                                messages: chat.messages,
                            };
                            chatSessions.push(chatInstance);
                            setChatSessions([]);
                            setChatSessions(chatSessions);
                            if (first) {
                                setSelectedChat(chatInstance);
                                first = false;
                            }
                        });
                        data.users.forEach((user: any) => {
                            userTable[user._id] = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                            };
                        });
                        userTable[JSON.parse(authData).payload.id] = {
                            firstName: JSON.parse(authData).payload.firstName,
                            lastName: JSON.parse(authData).payload.lastName,
                        };
                        setUserTable({});
                        setUserTable(userTable);
                        if (loading) setLoading(false);
                    } else if (data.type === "new_message") {
                        console.log("New message received!");
                        chime.play();
                        if (!data.isNewChat) {
                            chatSessions.forEach((chat: ChatInstance) => {
                                if (chat.personOne === data.personOne && chat.personTwo === data.personTwo) {
                                    if (chatSessions.indexOf(chat) > -1) {
                                        chat.messages.push({
                                            sender: data.from,
                                            message: data.message,
                                            when: data.when,
                                        });
                                    }
                                }
                            });
                        } else {
                            const chatInstance: ChatInstance = {
                                _id: data.chatId,
                                personOne: data.personOne,
                                personTwo: data.personTwo,
                                messages: [{
                                    sender: data.from,
                                    message: data.message,
                                    when: data.when,
                                }],
                            };

                            userTable[data.fromUser.id] = {
                                firstName: data.fromUser.firstName,
                                lastName: data.fromUser.lastName
                            };
    
                            userTable[data.toUser.id] = {
                                firstName: data.toUser.firstName,
                                lastName: data.toUser.lastName
                            };

                            chatSessions.push(chatInstance);
                            setSelectedChat(chatInstance);
                        }

                        userTable[JSON.parse(authData).payload.id] = {
                            firstName: JSON.parse(authData).payload.firstName,
                            lastName: JSON.parse(authData).payload.lastName,
                        };

                        setChatSessions([]);
                        setChatSessions(chatSessions);
                    }
                }
            }

            newWebSocket.onopen = () => {
                newWebSocket.send(JSON.stringify({
                    type: "init",
                    token: authToken
                }));
                setLoading(false);
            }

            newWebSocket.onclose = () => {
                setDisconnected(true);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, webSocket, authToken]);

    // Show chat interface, and loading screen if websocket connection is not established
    if ((loading || !authData || !webSocket || webSocket.readyState !== webSocket.OPEN) && !disconnected) {
        return <div className="pt-32 text-2xl text-center"><h1>Messaging system loading...</h1></div>;
    }

    if (disconnected) {
        return <div className="pt-32 text-2xl text-center"><h1>You've been disconnected. Click <a className="font-bold underline" href={`/messages/?${randomBytes(6).toString('hex')}`}>here</a> to attempt reconnection.</h1></div>;
    }

    const ComposeModal = ({ webSocket }: ModalProps) => {
        const [recipient, setRecipient] = useState<string>("");

        return (
            <div className="fixed inset-0 z-10 flex justify-center items-center">
                <div className="fixed inset-0 z-20 bg-gray-900 opacity-75"></div>
                <div className="fixed inset-0 z-30 bg-white rounded-lg shadow-xl p-8 h-60 my-28" style={{ marginLeft: "30%", marginRight: "30%" }}>
                    <div className="flex justify-between">
                        <h1 className="text-2xl">Compose Message</h1>
                        <button className="text-gray-600" onClick={() => {
                            setRecipient("")
                            setShowComposeModal(false);
                        }}>Close</button>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">Recipient</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="recipient" type="text" placeholder="Enter recepient's ID" value={recipient} onChange={(event) => setRecipient(event.target.value)} />
                        { /* Submit */}
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => {
                            if (recipient.length > 0 && webSocket) {
                                webSocket.send(JSON.stringify({
                                    type: "send",
                                    token: authToken,
                                    to: recipient,
                                    message: "Hello, there!",
                                }));
                                setRecipient("");
                                setShowComposeModal(false);
                            }
                        }}>Start chat</button>
                    </div>
                </div>
            </div>
        )
    }


    // Messages interface (show sidebar with messages, tailwindcss)
    return <>
        {showComposeModal && <ComposeModal webSocket={webSocket} />}
        <div className="flex h-screen gap-1 bg-gray-300">
            <div className="col-span-3 md:w-1/6 flex-row overflow-y-scroll bg-white" style={{
                paddingTop: "88px"
            }}>
                <h3 className="text-2xl text-center py-4 text-gray-900 font-bold" style={{ backgroundColor: "#9AC2C9" }}>Conversations</h3>
                <p className="text-center pb-4 text-gray-900 font-bold underline cursor-pointer" onClick={() => { setShowComposeModal(true) }} style={{ backgroundColor: "#9AC2C9" }}>Compose</p>
                {chatSessions.map((chatSession) => {
                    const talkingTo = chatSession.personOne === JSON.parse(authData).payload.id ? chatSession.personTwo : chatSession.personOne;
                    const talkingToUser = (userTable && userTable[talkingTo]) || { firstName: talkingTo, lastName: "" };
                    return (
                        <div onClick={() => {
                            // Set selected chat
                            setSelectedChat(chatSession);
                        }} className={`w-full px-4 py-4 ${chatSession === selectedChat ? "bg-yellow-100" : "bg-gray-200"}`} key={JSON.parse(authData).payload.id + talkingTo + randomBytes(4).toString("hex")}>
                            <p className="font-bold">{talkingToUser.firstName + " " + talkingToUser.lastName}</p>
                            <p className="text-sm">Last message: {chatSession.messages[chatSession.messages.length - 1].message.substr(0, 36)}...</p>
                        </div>
                    )
                })}
            </div>
            <div className="col-span-9 bg-white md:w-5/6" style={{
                paddingTop: "88px"
            }}>
                {selectedChat && (
                    <div className="flex-row h-full">
                        <div className="border-t-4" style={{}}>
                            <form className="" onSubmit={(event) => {
                                event.preventDefault();
                                const message = (event.target as any).elements.message.value;
                                if (message && message.length > 0 && webSocket) {
                                    // Send message to server
                                    webSocket.send(JSON.stringify({
                                        type: "send",
                                        token: authToken,
                                        message: message,
                                        to: selectedChat.personOne === JSON.parse(authData).payload.id ? selectedChat.personTwo : selectedChat.personOne,
                                    }));
                                    (event.target as any).elements.message.value = "";
                                }
                            }}>
                                <input className="w-full px-4 py-2 bg-gray-200 mb-1 focus:outline-none" type="text" name="message" placeholder="Type a message..." />
                            </form>
                        </div>
                        <div className="flex-grow overflow-y-scroll" style={{ height: "calc(100% - 53px)" }}>
                            <div className="flex-col">
                                {selectedChat.messages.slice().reverse().map((messageObject, index) => {
                                    // From
                                    const from = (userTable && userTable[messageObject.sender]) || { firstName: messageObject.sender, lastName: "" };
                                    // If message is from current user, show message in green
                                    const fromClass = messageObject.sender === JSON.parse(authData).payload.id ? "" : "text-right";
                                    const bubbleClass = messageObject.sender === JSON.parse(authData).payload.id ? "bg-blue-600 text-white" : "bg-gray-300";
                                    return (
                                        <div className={`w-full px-4 py-4 ${fromClass}`} key={index}>
                                            <p className="">{from.firstName + " " + from.lastName} ({(new Date(messageObject.when)).toLocaleString()})</p>
                                            <div className="inline-block break-all" style={{ maxWidth: "40%" }}>
                                                <p className={`text-sm rounded-md px-4 py-2 ${bubbleClass}`}>{messageObject.message}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                <p className="w-full text-center italic py-4">
                                    End of conversation
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    </>;
};

export default ChatSystem;