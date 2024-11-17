import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Autentication/Login";
import Noticia from "./pages/Users/Noticia";
import Navegacao from "./components/@fixed/Navegacao";
import Perfil from "./pages/Users/Perfil";
import Cardápio from "./pages/Users/Cardápio";
import Turma from "./pages/Admin/Turma";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import NoticiaAdmin from "./pages/Admin/NoticiaAdmin";
import Cadastrar from "./pages/Admin/Cadastrar";

import { database } from "./firebase";
import { ref, set as setData, onValue } from "firebase/database";

import { useEffect, useState } from "react";

// Rota protegida para validar permissões
const ProtectedRoute = ({ role }: any) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role.includes("ADMIN") && user.role !== "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (role.includes("PAI") && user.role !== "PAI") {
    return <Navigate to="/menu" replace />;
  }

  return <Outlet />;
};

// Rota pública para login e redirecionamentos
const PublicRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return user.role === "ADMIN" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/menu" replace />
    );
  } else {
    <Navigate to="/" replace />;
  }

  return children;
};

// Configuração do roteamento
const IndexRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route element={<ProtectedRoute role={["PAI"]} />}>
        <Route path="/menu" element={<Navegacao />}>
          <Route index element={<Noticia />} />
          <Route path="cardapio" element={<Cardápio />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role={["ADMIN"]} />}>
        <Route path="/admin/:id?" element={<Navegacao />}>
          <Route index element={<Turma />} />
          <Route path="noticia/:id?" element={<NoticiaAdmin />} />
          <Route path="cadastrar" element={<Cadastrar />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Referência no Firebase para o nó "messages"
    const messagesRef = ref(database, "messages/");

    // Escreve dados no Realtime Database
    setData(messagesRef, {
      message1: "Olá, Firebase!",
      message2: "Teste de conexão funcionando.",
    }).catch((error) => console.error("Erro ao escrever no Firebase:", error));

    // Lê dados do Realtime Database
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);

  return (
    <>
      <RouterProvider router={IndexRouter} />
      <div>
        <h2>Mensagens do Firebase:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
