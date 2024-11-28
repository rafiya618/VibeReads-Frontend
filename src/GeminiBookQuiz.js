import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Divider, 
  IconButton 
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import QuizIcon from '@mui/icons-material/Quiz';

const GeminiBookQuiz = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const API_KEY = 'AIzaSyCmcpy-I3C9AUC2PnLwxbYQfeKI5ADtPjw';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  const generateQuestion = async () => {
    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        contents: [{
          parts: [{
            text: `Generate an interesting question about the book "${bookName}" by ${authorName}`
          }]
        }]
      });
      
      const question = response.data.candidates[0].content.parts[0].text;
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Error generating question:', error);
      setCurrentQuestion('Unable to generate question');
    }
  };

  const checkAnswer = async () => {
    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        contents: [{
          parts: [{
            text: `Evaluate the answer to the question: "${currentQuestion}". 
            The user's answer is: "${userAnswer}". 
            Provide constructive feedback not more than 4 or 5 lines 
            and also give some points to user out of 5 based on evaluating user's answer.
            Dont make any Headings`
          }]
        }]
      });
      
      const feedback = response.data.candidates[0].content.parts[0].text;
      setFeedback(feedback);
    } catch (error) {
      console.error('Error checking answer:', error);
      setFeedback('Unable to process feedback');
    }
  };

  const handleSubmit = async () => {
    if (questionCount < 5) {
      await generateQuestion();
      setQuestionCount(prev => prev + 1);
      setUserAnswer('');
      setFeedback('');
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setBookName('');
    setAuthorName('');
    setCurrentQuestion('');
    setUserAnswer('');
    setFeedback('');
    setQuestionCount(0);
    setCompleted(false);
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
      {/* Background Animated Circles */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
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
            {['❓', '🤔', '📝', '💡'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </Box>

      {/* Main Content - Now with relative positioning to sit above background */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
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
            Book Quiz Challenge <QuizIcon sx={{ ml: 2 }} />
            </Typography>

        {/* Rest of the component remains the same */}
        {!currentQuestion && !completed ? (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                variant="filled"
                label="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                sx={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px",
                  mb: 2
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                sx={{ 
                  backgroundColor: "white", 
                  borderRadius: "8px" 
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ 
                  mt: 2,
                  background: "linear-gradient(to right, #8e24aa, #512da8)", 
                  color: "white", 
                  borderRadius: "20px" 
                }}
              >
                Start Quiz
              </Button>
            </Grid>
          </Grid>
        ) : completed ? (
          <Box textAlign="center">
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: "white",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 4,
              }}
            >
              Quiz Completed!
            </Typography>
            <Button
              variant="contained"
              onClick={resetQuiz}
              sx={{ 
                mt: 2,
                background: "linear-gradient(to right, #8e24aa, #512da8)", 
                color: "white", 
                borderRadius: "20px" 
              }}
            >
              Start New Quiz
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Existing Quiz Grid Content */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  borderRadius: '15px'
                }}
              >
                <Typography variant="h6">
                  Question {questionCount}/5
                </Typography>
                <Divider sx={{ my: 2, backgroundColor: 'white' }} />
                <Typography>{currentQuestion}</Typography>
                
                {feedback && (
                  <>
                    <Divider sx={{ my: 2, backgroundColor: 'white' }} />
                    <Typography variant="subtitle1">Feedback:</Typography>
                    <Typography>{feedback}</Typography>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Right Side - User Answer Input */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  sx={{ 
                    backgroundColor: "white", 
                    borderRadius: "8px",
                    mb: 2
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    onClick={checkAnswer}
                    sx={{ 
                      background: "linear-gradient(to right, #8e24aa, #512da8)", 
                      color: "white", 
                      borderRadius: "20px",
                      mr: 1
                    }}
                  >
                  <SendIcon /> Submit Answer
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ 
                      background: "linear-gradient(to right, #8e24aa, #512da8)", 
                      color: "white", 
                      borderRadius: "20px",
                      mr: 1
                    }}
                  >
                  Next Question
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default GeminiBookQuiz;