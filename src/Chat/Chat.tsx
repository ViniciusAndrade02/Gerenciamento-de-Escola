import { useContext, useState, useEffect } from "react";
import { databaseApp } from "../services/firebaseConfig";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/Auth";

const ChatRoom = () => {
  const { user } = useContext(AuthContext); // Obter informações do usuário logado
  const messageRef = collection(databaseApp, "messages");
  const QueryMessages = query(messageRef, orderBy("createdAt"), limit(50));
  const [messages, setMessages] = useState<any[]>([]);
  const [formValue, setFormValue] = useState("");

  // Carregar mensagens em tempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(QueryMessages, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
    });
    return unsubscribe; // Limpa o listener ao desmontar o componente
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValue.trim()) return; // Evitar mensagens vazias

    try {
      await addDoc(messageRef, {
        text: formValue,
        uid: user?.id || "desconhecido", // Identificador do usuário
        name: user?.sub || user?.email || "Anônimo", // Nome ou e-mail do usuário
        createdAt: serverTimestamp(),
      });
      setFormValue(""); // Limpar o campo de entrada
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        maxWidth: "400px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages &&
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                margin: "5px 0",
                padding: "10px",
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
                alignSelf: "flex-start",
                maxWidth: "70%",
                color: "#000",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{msg.name}:</strong> {msg.text}
              </p>
            </div>
          ))}
      </main>

      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Digite sua mensagem"
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
