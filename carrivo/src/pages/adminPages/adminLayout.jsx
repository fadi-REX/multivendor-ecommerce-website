import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar } from "@mui/material";



import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";




import { useContext } from "react";
import { Admincontext } from "../../admincontext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



const color = grey[300];
const drawerWidth = 240;

export default function AdminLayout() {

 const { admin, setadmin, ready } = useContext(Admincontext);
 const navigate = useNavigate()
 let location = useLocation();
  


  if (!ready) {
    return "loading";
  }
  // return admin to login if he dosnt have an account
  if (ready && !admin) {
    return <Navigate to={"/adminlogin"} />;
  }


  async function  hundleLogout(){
       await  axios.post('/adminlogout')
       setadmin(null)
  }

 


  
  const Array1 = [
    { text: "Users", icon: <PeopleOutlineIcon />, path: "/admin" },
    { text: "Admins", icon: <GroupOutlinedIcon />, path: "/admin/admins" },
    { text: "Cars", icon: <Inventory2OutlinedIcon />, path: "/admin/cars" },
    { text: "Dashboard", icon: <SpaceDashboardOutlinedIcon />, path: "/admin/dashboard" },
  ];




  const Array2 = [
    { text: "Profile", icon: <PersonOutlineOutlinedIcon />, path: "/admin/profile" },
    { text: "Log out", icon: <LoginOutlinedIcon />, path: "/" },
    
  ];



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {!!admin && <div>Admin Name : {admin.name} </div>}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Avatar
            className=" mx-auto my-2 mt-10 "
            sx={{ width: 88, height: 88 }}
          >
            <AccountCircleIcon sx={{ width: 88, height: 88, border: "2px " }} />
          </Avatar>
          <Typography
            align="center"
            variant="body1"
            sx={{ fontSize: 19 }}
            className=" text-blue-500"
            fontWeight={"bold"}
          >
            Admin Panel
          </Typography>

          <Divider className=" mt-2" />

          <List>
            {Array1.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                  sx={{
                    bgcolor: location.pathname === item.path ? color : null,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontFamily: "cursive",
                      fontWeight: "bold",
                    }}
                  >
                    {item.text}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {Array2.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.path === "/") {
                      hundleLogout();
                    }
                    navigate(item.path);
                  }}
                  sx={{
                    bgcolor: location.pathname === item.path ? color : null,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontFamily: "cursive",
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
