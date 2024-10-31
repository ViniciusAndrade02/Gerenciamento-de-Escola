import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Autentication/Login";
import Noticia from "./pages/Users/Noticia";
import Navegacao from "./components/@fixed/Navegacao";
import Perfil from "./pages/Users/Perfil";
import Cardápio from "./pages/Users/Cardápio";

const IndexRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />

      <Route path="/menu" element={<Navegacao />}>
        <Route index element={<Noticia />} />
        <Route path="cardapio" element={<Cardápio />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={IndexRouter} />;
};

export default App;
