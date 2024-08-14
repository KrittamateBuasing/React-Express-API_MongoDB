
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    file: '', // or any default value you want
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="\assets\wallpaper2.jpg"
        breakPoint="md"
        style={{ height: "100%" }}
        // backgroundColor="green"
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>KB APP</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`http://localhost:5000/uploads/${user.userfile}`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>{data.name}</Typography>
                    
                  </Box>
                </Box>
              )}

              

              <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <Link to={"/admin/viewtable"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon />}>
                    {" "}
                    Table 
                  </MenuItem>
                </Link>
               
              </SubMenu>

              <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                <Link to={"/admin/ManageUser"} className="menu-bars">
                  <MenuItem icon={<ManageAccountsIcon/>}>User</MenuItem>
                </Link>

              </SubMenu>
              <Link to="/admin/index" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
              </Link>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              
            </div>

            
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
