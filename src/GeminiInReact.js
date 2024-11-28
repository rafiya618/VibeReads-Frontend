import React, { useState } from "react";
import {
  Chip,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import Books from "./Books";
import { Mood, Add } from "@mui/icons-material";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiInReact() {
  const [moods, setMoods] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI("AIzaSyCmcpy-I3C9AUC2PnLwxbYQfeKI5ADtPjw");

  const handleAddMood = () => {
    if (inputValue.trim() && !moods.includes(inputValue)) {
      setMoods([...moods, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteMood = (moodToDelete) => {
    setMoods(moods.filter((mood) => mood !== moodToDelete));
  };

  const fetchRecommendations = async () => {
    if (!moods.length) return;
    setLoading(true);

    try {
      // Prepare mood-based prompt for Gemini
      const prompt = `Recommend 20 books based on the following moods: ${moods.join(', ')}. 
      Provide recommendations in the format: 
      Title by Author (Brief reason related to the mood)`;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse Gemini's response into a search query
      setSearchQuery(text);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setSearchQuery("mood books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(to bottom, #4a148c, #0d47a1)",
        color: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Emoji Circles (previous implementation remains the same) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const emojis = ["😊", "😢", "😡", "😂"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "50px",
              height: "50px",
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
              borderRadius: "50%",
              zIndex: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              color: "white",
              fontWeight: "bold",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {randomEmoji}
          </motion.div>
        );
      })}

      {/* Main Content */}
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(to right, #ff4081, #ff6e40)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
        }}
      >
        What's Your Mood? <Mood />
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="filled"
            label="Type your mood..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleAddMood}
            sx={{
              background: "#8e24aa",
              color: "white",
              borderRadius: "8px",
              height: "56px",
              "&:hover": { background: "#5c007a" },
            }}
            startIcon={<Add />}
          >
            Add Mood
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        {moods.map((mood, index) => (
          <Chip
            key={index}
            label={mood}
            onDelete={() => handleDeleteMood(mood)}
            sx={{
              fontWeight: "bold",
              margin: 0.5,
              background: "linear-gradient(to right, #ff4081, #ff6e40)",
              color: "white",
              "&:hover": { opacity: 0.8 },
            }}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={fetchRecommendations}
          
          sx={{
            background: "linear-gradient(to right, #512da8, #0d47a1)",
            color: "white",
            borderRadius: "20px",
            padding: "10px 20px",
            "&:hover": {
              background: "linear-gradient(to right, #311b92, #002171)",
            },
          }}
        >
          Get Book Recommendations
        </Button>
      </Box>

      {loading && (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <CircularProgress sx={{ color: "white" }} />
        </Box>
      )}

      {!loading && searchQuery && <Books searchQuery={searchQuery} />}
    </Box>
  );
}

export default GeminiInReact;