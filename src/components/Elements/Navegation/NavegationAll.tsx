import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import FeedIcon from "@mui/icons-material/Feed";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";

// Estruturas de navegação
const Admin = {
  urlDefault: "admin",
  urls: ["noticia", "cardapio", "chat"],
  namePage: ["Notícias", "Cardápio", "Bate-Papo"],
  nameNavegation: ["Notícias", "Cardápio", "Bate-Papo", "Sair"],
};

const Menu = {
  urlDefault: "menu",
  urls: ["perfil", "chat"],
  namePage: ["Perfil", "Bate-Papo"],
  nameNavegation: ["Notícias", "Perfil", "Bate-Papo", "Sair"],
};

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import { Admin, Menu, Route } from "./NavegationState";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";


const NavegationAll = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const route = user.role === "ADMIN" ? Admin : Menu; // Define rota com base no papel do usuário

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (index: number) => {
    if (index === route.nameNavegation.length - 1) {
      logout();
      navigate("/"); // Redireciona para o login após logout
    } else if (index === 0) {
      navigate(`/${route.urlDefault}`);
    } else {
      navigate(`/${route.urlDefault}/${route.urls[index - 1]}`);
    }
  };

  useEffect(() => {

    const pathArray = location.pathname.split("/");
    const currentPage = pathArray[pathArray.length - 1];


    const pageIndex = route.urls.indexOf(currentPage);
    setPagination(route.namePage[pageIndex] || route.namePage[0]);

    if(urlStageTwo == route.nameNavegation[1].toLowerCase() && urlStageTwo != undefined){
      setPagination(route.namePage[1]);
    }else if(urlStageTwo == route.nameNavegation[2].toLowerCase() && urlStageTwo != undefined){
      setPagination(route.namePage[2]);
    }else if(urlStageOne == route.urlDefault){
      setPagination(route.namePage[0]);

    const urlStageTwo = location.pathname.split("/")[2];

    if (user.role == "ADMIN") {
      switch (urlStageTwo) {
        case "noticia":
          setPagination(Admin.namePage[1]);
          break;
        case "cadastrar":
          setPagination(Admin.namePage[2]);
          break;
        case "cardapio":
          setPagination(Admin.namePage[3]);
          break;
        case "chat":
          setPagination(Admin.namePage[4]);
          break;
        case undefined:
          setPagination(Admin.namePage[0]);
          break;
      }
    }

    if ((user.role == "PAI" || user.role == "PROFESSOR")) {
      switch (urlStageTwo) {
        case "cardapio":
          setPagination(Menu.namePage[1]);
          break;
        case "perfil":
          setPagination(Menu.namePage[2]);
          break;
        case "Chat":
          setPagination(Menu.namePage[3]);
          break;
        case undefined:
          setPagination(Menu.namePage[0]);
          break;
      }

    }

  }, [location.pathname]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Divider />
      <List>
        {route.nameNavegation.map((text, index) => (
          <ListItem key={text} disablePadding>

            <ListItemButton onClick={() => handleNavigation(index)}>
              <ListItemIcon>
                {index === 0 ? (
                  <FeedIcon />
                ) : index === 1 ? (
                  <RestaurantMenuIcon />
                ) : index === 2 ? (
                  <ChatIcon />
                ) : (
                  <AccountCircleIcon />
                )}
              </ListItemIcon>

            <ListItemButton onClick={() => Page(index)}>
              {user.role == "ADMIN" && (
                <ListItemIcon>
                  {index === 0 ? (
                    <AssignmentIndIcon />
                  ) : index === 1 ? (
                    <FeedIcon />
                  ) : index === 2 ? (
                    <PersonIcon />
                  ) : index === 3 ? (
                    <RestaurantMenuIcon />
                  ) : index === 4 ? (
                    <ChatIcon />
                  ) : (
                    <LogoutIcon />
                  )}
                </ListItemIcon>
              )}

              {(user.role == "PAI" || user.role == "PROFESSOR") && (
                <ListItemIcon>
                  {index === 0 ? (
                    <FeedIcon />
                  ) : index === 1 ? (
                    <RestaurantMenuIcon />
                  ) : index === 2 ? (
                    <PersonIcon />
                  ) : index === 3 ? (
                    <ChatIcon />
                  ) : (
                    <LogoutIcon />
                  )}
                </ListItemIcon>
              )}

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div className="flex items-center relative right-4 mb-2">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </Button>
        <p className="">{pagination}</p>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default NavegationAll;
