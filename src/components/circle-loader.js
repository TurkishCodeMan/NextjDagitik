import React from "react";
import { motion } from "framer-motion";

const containerStyle = {
  position: "relative",
  width: "1.5rem",
  height: "1.5rem",
  boxSizing: "border-box"
};

const circleStyle = {
  display: "block",
  width: "1.5rem",
  height: "1.5rem",
  border: "0.3rem solid #e9e9e9",
  borderTop: "0.3rem solid #3498db",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};

export default function CircleLoader({className,...props}) {
  return (
    <div style={containerStyle} className={className}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}