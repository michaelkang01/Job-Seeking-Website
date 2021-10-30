import { randomBytes } from "crypto";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
            id: string;
        }
    ];
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

    // Attempt to establish a websocket connection to the server
    useEffect(() => {
        if (webSocket === undefined && authToken != "") {
            console.log("Attempting to establish websocket connection...");
            const newWebSocket = new WebSocket("ws://localhost:8001/api/ws/connect");
            newWebSocket.onmessage = (event) => {
                if (event.data && event.data.length > 0) {
                    const data = JSON.parse(event.data);
                    if (data.type === "init") {
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
                        setLoading(false);
                    } else if (data.type === "new_message") {
                        chime.play();
                        chatSessions.forEach((chat: ChatInstance) => {
                            if (chat.personOne == data.personOne && chat.personTwo == data.personTwo) {
                                chat.messages.push({
                                    sender: data.from,
                                    message: data.message,
                                    when: data.when,
                                    id: data.messageId,
                                });
                                setChatSessions([]);
                                setChatSessions(chatSessions);
                            }
                        });
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

            setWebSocket(newWebSocket);
        }
    }, [loading, webSocket, authToken]);

    // Show chat interface, and loading screen if websocket connection is not established
    if ((loading || !authData || !webSocket || webSocket.readyState !== webSocket.OPEN) && !disconnected) {
        return <div className="pt-32 text-2xl text-center"><h1>Messaging system loading...</h1></div>;
    }

    if (disconnected) {
        return <div className="pt-32 text-2xl text-center"><h1>You've been disconnected. Click <a className="font-bold underline" href={`/messages/?${randomBytes(6).toString('hex')}`}>here</a> to attempt reconnection.</h1></div>;
    }

    // Messages interface (show sidebar with messages, tailwindcss)
    return (
        <div className="flex h-screen gap-1 bg-blue-400">
            <div className="col-span-3 bg-gray-100 md:w-1/6 flex-row overflow-y-scroll" style={{
                paddingTop: "88px"
            }}>
                <h3 className="text-2xl text-center py-4 text-gray-900 font-bold" style={{ backgroundColor: "#9AC2C9" }}>Conversations</h3>
                {chatSessions.map((chatSession) => {
                    const talkingTo = chatSession.personOne === JSON.parse(authData).payload.id ? chatSession.personTwo : chatSession.personOne;
                    const talkingToUser = (userTable && userTable[talkingTo]) || { firstName: talkingTo, lastName: "" };
                    return (
                        <div onClick={() => {
                            setSelectedChat(chatSession);
                        }} className={`w-full px-4 py-4 ${chatSession === selectedChat ? "bg-yellow-100" : "bg-gray-200"}`} key={JSON.parse(authData).payload.id + talkingTo}>
                            <p className="font-bold">{talkingToUser.firstName + " " + talkingToUser.lastName}</p>
                            <p className="text-sm">Last message: {chatSession.messages[chatSession.messages.length - 1].message.substr(0, 36)}...</p>
                        </div>
                    )
                })}
            </div>
            <div className="col-span-9 bg-gray-300 md:w-5/6" style={{
                paddingTop: "88px"
            }}>
                {selectedChat && (
                    <div className="flex-row h-full bg-blue-300">
                        <div className="border-t-4 border-blue-300" style={{  }}>
                            <form className="" onSubmit={(event) => {
                                event.preventDefault();
                                const message = (event.target as any).elements.message.value;
                                if (message && message.length > 0 && webSocket) {
                                    webSocket.send(JSON.stringify({
                                        type: "send",
                                        token: authToken,
                                        message: message,
                                        to: selectedChat.personOne === JSON.parse(authData).payload.id ? selectedChat.personTwo : selectedChat.personOne,
                                    }));
                                    (event.target as any).elements.message.value = "";
                                }
                            }}>
                                <input className="w-full px-4 py-2 bg-gray-200 mb-1" type="text" name="message" placeholder="Type a message..." />
                            </form>
                        </div>
                        <div className="flex-grow overflow-y-scroll" style={{ height: "calc(100% - 53px)" }}>
                            <div className="flex-col">
                                {selectedChat.messages.slice().reverse().map((messageObject) => {
                                    // From
                                    const from = (userTable && userTable[messageObject.sender]) || { firstName: messageObject.sender, lastName: "" };
                                    // If message is from current user, show message in green
                                    const fromClass = messageObject.sender === JSON.parse(authData).payload.id ? "bg-green-100" : "bg-gray-100";
                                    return (
                                        <div className={`w-full px-4 py-4 ${fromClass} border-b-2 border-black`} key={messageObject.id}>
                                            <p className="font-bold">{from.firstName + " " + from.lastName} ({(new Date(messageObject.when)).toLocaleString()})</p>
                                            <p className="text-sm">{messageObject.message}</p>
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
    );
};

export default ChatSystem;