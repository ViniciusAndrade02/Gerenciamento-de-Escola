import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Autentication/Register";
import Login from "./pages/Autentication/Login";


const IndexRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={IndexRouter} />;
};

export default App;
