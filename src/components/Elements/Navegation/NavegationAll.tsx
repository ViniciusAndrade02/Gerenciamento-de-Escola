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
