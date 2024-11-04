import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

const NavegationAll = () => {
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<string>();
  const navegate = useNavigate();
  const location = useLocation();
  const urlDefault = "/menu";

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const Page = (index: number) => {
    switch (index) {
      case 0:
        navegate(`${urlDefault}`);
        break;
      case 1:
        navegate(`${urlDefault}/cardapio`);
        break;
      case 2:
        navegate(`${urlDefault}/perfil`);
        break;
    }
  };

  useEffect(() => {
    const urlStage = location.pathname.split("/")[2];
    if (urlStage === undefined) {
      setPagination("Noticias do Dia");
    } else if (urlStage === "cardapio") {
      setPagination("Cardápio da Semana");
    } else {
      setPagination("Perfil");
    }
  }, [location.pathname]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Divider />
      <List>
        {["Noticias", "Cardápio", "Perfil"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => Page(index)}>
              <ListItemIcon>
                {index === 1 ? (
                  <RestaurantMenuIcon />
                ) : index === 2 ? (
                  <AccountCircleIcon />
                ) : (
                  <FeedIcon />
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
