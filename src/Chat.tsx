import React, { useEffect, useState, useContext } from "react";
import { database } from "./firebase";
import { ref, onValue, push } from "firebase/database";
import { AuthContext } from "./context/Auth";

const Chat = ({ chatId }: { chatId: string }) => {
  const { user } = useContext(AuthContext); // Obtemos o usuário autenticado
  const userRole = user?.role || ""; // Papel do usuário (PAI, PROFESSOR, ADMIN)

  const canSendMessage = userRole !== "PAI"; // Apenas ADMIN e PROFESSOR podem enviar mensagens

  // Estados para armazenar mensagens e nova mensagem
  const [messages, setMessages] = useState<any[]>([]); // Lista de mensagens
  const [newMessage, setNewMessage] = useState(""); // Nova mensagem a ser enviada

  // Leitura em tempo real das mensagens
  useEffect(() => {
    const fetchUserName = async (userId: string) => {
      const userRef = ref(database, `users/${userId}`);
      return new Promise<string>((resolve) => {
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          resolve(userData?.name || "Usuário Desconhecido");
        });
      });
    };

 

    const messagesRef = ref(database, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedMessages = await Promise.all(
          Object.entries(data).map(async ([key, value]: any) => {
            const userName = await fetchUserName(value.sender);
            return {
              id: key,
              content: value.content,
              timestamp: value.timestamp,
              sender: userName,
            };
          })
        );
        setMessages(parsedMessages);
      } else {
        setMessages([]);
      }
    });

    console.log("Usuário autenticado:", user);
    return () => unsubscribe();
  }, [chatId, user]);

  // Função para enviar nova mensagem
  const sendMessage = () => {
    if (newMessage.trim() === "") return; // Evita mensagens vazias
  
    const messagesRef = ref(database, "messages"); // Caminho exato definido nas regras
    push(messagesRef, {
      sender: user?.id || "Desconhecido", // ID do usuário autenticado
      content: newMessage,
      timestamp: Date.now(),
    })
      .then(() => console.log("Mensagem enviada com sucesso!"))
      .catch((error) => console.error("Erro ao escrever no Firebase:", error));
  
    setNewMessage(""); // Limpa o campo de entrada
  };
  

  return (
    <div>
      <h2>Bate-Papo</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          maxHeight: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      {canSendMessage && ( // Verifica se o usuário pode enviar mensagens
        <>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem"
            style={{ width: "80%", marginRight: "10px" }}
          />
          <button onClick={sendMessage}>Enviar</button>
        </>
      )}
    </div>
  );
};

export default Chat;
