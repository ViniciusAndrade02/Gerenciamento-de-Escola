import React, { useState, useEffect, useContext } from "react";
import { database } from "../../services/firebase";
import { ref, onValue, push } from "firebase/database";
import { AuthContext } from "../../context/Auth";

const Chat = ({ chatId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setMessages(parsedMessages);
      }
    });
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    push(messagesRef, {
      sender: user.id,
      content: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
