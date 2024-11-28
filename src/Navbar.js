import React, { useState } from "react"; 
import { Typography } from "@mui/material";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import your logo
import Logo from "./file.png"; // Update the path to where your logo is located

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Get user name from localStorage
  const userName = localStorage.getItem("userName") || "";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Redirect to landing page
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#0d47a1", // Bluish gradient
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo instead of Text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/books")}
        >
          <img
            src={Logo} // Logo image source
            alt="BookHub Logo"
            style={{
              maxHeight: "70px", // Limit the logo's height
              width: "150px", // Keep the aspect ratio intact
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/books")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#bbdefb", color: "#1e3c72" },
            }}
          >
            Books
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/quiz")}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#bbdefb", color: "#1e3c72" },
            }}
          >
            Book Quiz
          </Button>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              "&:hover": { backgroundColor: "#bbdefb" },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "secondary.main",
                fontWeight: "bold",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ "& .MuiPaper-root": { backgroundColor: "#e3f2fd" } }} // Light blue menu
          >
            <MenuItem disabled>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Logged in as {userName}
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                "&:hover": { backgroundColor: "#bbdefb", color: "#1e3c72" },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
