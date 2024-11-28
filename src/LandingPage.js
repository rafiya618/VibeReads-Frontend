import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from './file.png';
const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #512da8, #311b92)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h2" gutterBottom>
          Welcome to VibeReads
        </Typography>
        <Typography variant="h6" gutterBottom>
          Find personalized book recommendations or take a quiz to discover new
          reads!
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleGoogleAuth}
            sx={{
              background: "#FF5722",
              "&:hover": { background: "#E64A19" },
            }}
          >
            Login with Google
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => navigate("/books")}
          >
            Explore Books
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default LandingPage;