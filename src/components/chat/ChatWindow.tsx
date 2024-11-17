import React, { useState, useEffect, useContext } from "react";
import { database } from "../../services/firebase";
import { ref, onValue, push } from "firebase/database";
import { AuthContext } from "../../context/Auth";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        setMessages(parsedMessages);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messagesRef = ref(database, `chats/${chatId}/messages`);
    push(messagesRef, {
      sender: user?.id,
      content: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>
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

export default ChatWindow;
