"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div>
      <div className="bg-secondary rounded-xl flex items-center justify-between">
        <h2 className="px-4">{question}</h2>
        <AnimatePresence>
          {showAnswer ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=" p-3"
              onClick={() => setShowAnswer(false)}
            >
              {" "}
              <Minus className="w-4 h-4" />{" "}
            </motion.button>
          ) : (
            <motion.button className=" p-3" onClick={() => setShowAnswer(true)}>
              {" "}
              <Plus className="w-4 h-4" />{" "}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showAnswer && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-4"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
