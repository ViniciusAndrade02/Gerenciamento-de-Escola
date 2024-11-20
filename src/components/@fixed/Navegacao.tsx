import React from "react";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";

const Navegacao = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/menu">
            <FeedIcon /> Notícias
          </Link>
        </li>
        <li>
          <Link to="/menu/cardapio">
            <RestaurantMenuIcon /> Cardápio
          </Link>
        </li>
        <li>
          <Link to="/menu/perfil">
            <AccountCircleIcon /> Perfil
          </Link>
        </li>
        <li>
          <Link to="/menu/chat">
            <ChatIcon /> Bate-Papo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navegacao;
