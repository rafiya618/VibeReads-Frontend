import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

const Books = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "AIzaSyAETEXosIPFjA0Ak0DV-ta8GswuwJaok7Y";

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=6&key=${apiKey}`
        );
        setBooks(response.data.items || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, apiKey]);

  if (loading) {
    return (
      <Typography variant="h6" align="center" color="white">
        Loading book recommendations...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "radial-gradient(circle, #512da8, #311b92)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                sx={{
                  background: "white",
                  color: "black",
                  borderRadius: "15px",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {book.volumeInfo.authors?.join(", ")}
                  </Typography>
                  <Button
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    variant="contained"
                    sx={{ 
                      marginTop: 2, 
                      background: "#512da8", 
                      color: "white",
                      "&:hover": { background: "#311b92" }
                    }}
                  >
                    More Info
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default Books;