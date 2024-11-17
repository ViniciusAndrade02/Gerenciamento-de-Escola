import React, { useState, useEffect, useContext } from "react";
import { database } from "../firebase";
import { ref, onValue, push, set } from "firebase/database";
import { AuthContext } from "../context/Auth";

const ContactList = ({ onChatStart }: { onChatStart: (chatId: string) => void }) => {
  const { user } = useContext(AuthContext); // Obtém o usuário logado
  const [users, setUsers] = useState<any[]>([]); // Lista de usuários disponíveis

  // Carregar usuários do Firebase
  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.entries(data)
          .filter(([key]) => key !== user.id) // Exclui o usuário logado da lista
          .map(([key, value]: any) => ({ id: key, ...value }));
        setUsers(usersArray);
      }
    });
  }, [user]);

  const startChat = (receiverId: string) => {
    const chatRef = ref(database, `chats`);
    const newChatKey = push(chatRef).key; // Gera um ID único para o chat
    const chatPath = `chats/${newChatKey}`;

    set(ref(database, chatPath), {
      participants: {
        [user.id]: true, // ID do usuário logado
        [receiverId]: true, // ID do destinatário
      },
      messages: {}, // Inicializa a conversa sem mensagens
    });

    onChatStart(newChatKey); // Retorna o chatId para o componente pai
  };

  return (
    <div>
      <h3>Selecione um Contato</h3>
      <ul>
        {users.map((contact) => (
          <li key={contact.id} style={{ marginBottom: "10px" }}>
            <span>{contact.name} ({contact.role})</span>
            <button
              onClick={() => startChat(contact.id)}
              style={{ marginLeft: "10px" }}
            >
              Conversar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
