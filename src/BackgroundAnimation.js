// BackgroundAnimation.js
import React from "react";
import { motion } from "framer-motion";

const generateCircles = (count) => {
  const circles = [];
  for (let i = 0; i < count; i++) {
    circles.push(
      <motion.div
        key={i}
        style={{
          position: "absolute",
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          borderRadius: "50%",
          background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          zIndex: 0,
        }}
        animate={{
          x: [0, Math.random() * 200 - 100],
          y: [0, Math.random() * 200 - 100],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    );
  }
  return circles;
};

const BackgroundAnimation = ({ count = 10 }) => {
  return <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", overflow: "hidden", zIndex: -1 }}>{generateCircles(count)}</div>;
};

export default BackgroundAnimation;
