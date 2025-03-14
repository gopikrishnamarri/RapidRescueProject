/** @format */

import * as React from "react";
import { IconButton } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
export default function NestedList() {
  const [bookingOpen, setBookingOpen] = React.useState(true);
  const [withdrawalOpen, setWithdrawalOpen] = React.useState(true);

  const bookingHandle = () => {
    setBookingOpen(!bookingOpen);
  };
  const withdrawHandle = () => {
    setWithdrawalOpen(!withdrawalOpen);
  };
  // *************** for collapse dropdown ******************
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const handleClick5 = () => {
    setOpen5(!open5);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, backgroundColor: "#E3641B" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <DashboardIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/users" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PeopleIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/mechanic" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PrecisionManufacturingOutlinedIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Mechanic" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/services" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <TireRepairIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Service Category" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>

      
    </List>
  );
}
