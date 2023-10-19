import { motion, AnimatePresence } from "framer-motion";

import React from "react";

function AnimatedComponent(props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "backInOut" }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedComponent;
