import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navegacao from "./components/@fixed/Navegacao";
import Noticia from "./pages/Users/Noticia";
import Cardapio from "./pages/Users/Cardápio";
import Perfil from "./pages/Users/Perfil";
import ChatPage from "./pages/Users/ChatPage";

const App = () => {
  return (
    <Router>
      <Navegacao />
      <Routes>
        <Route path="/menu" element={<Noticia />} />
        <Route path="/menu/cardapio" element={<Cardapio />} />
        <Route path="/menu/perfil" element={<Perfil />} />
        <Route path="/menu/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
