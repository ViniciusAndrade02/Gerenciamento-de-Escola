import React, { useState } from "react";
import ContactList from "./ContactList";
import ChatWindow from "./ChatWindow";

const ChatApp = () => {
  const [selectedChatId, setSelectedChatId] = useState("");

  const handleChatStart = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div>
      {!selectedChatId ? (
        <ContactList onChatStart={handleChatStart} />
      ) : (
        <ChatWindow chatId={selectedChatId} />
      )}
    </div>
  );
};

export default ChatApp;
