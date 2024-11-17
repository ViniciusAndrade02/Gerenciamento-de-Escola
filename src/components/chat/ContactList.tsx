import React, { useState, useEffect, useContext } from "react";
import { database } from "../../services/firebase";
import { ref, onValue, push, set } from "firebase/database";
import { AuthContext } from "../../context/Auth";

interface User {
  id: string;
  name: string;
  role: string;
}

interface ContactListProps {
  onChatStart: (chatId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onChatStart }) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data)
          .filter(([key]) => key !== user?.id)
          .map(([key, value]: any) => ({
            id: key,
            ...value,
          }));
        setUsers(usersArray);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const startChat = (receiverId: string) => {
    const chatRef = ref(database, "chats");
    const newChatKey = push(chatRef).key;
    const chatPath = `chats/${newChatKey}`;

    set(ref(database, chatPath), {
      participants: {
        [user?.id]: true,
        [receiverId]: true,
      },
      messages: {},
    });

    onChatStart(newChatKey);
  };

  return (
    <div>
      <h3>Selecione um Contato</h3>
      <ul>
        {users.map((contact) => (
          <li key={contact.id}>
            {contact.name} ({contact.role})
            <button onClick={() => startChat(contact.id)}>Conversar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
