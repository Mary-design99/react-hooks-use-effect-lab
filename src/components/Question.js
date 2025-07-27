import React, { useState, useEffect, useRef } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  const handleAnswerClick = (index) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onAnswered(index === question.correctIndex);
  };

  return (
    <div>
      <div>
        <p>
          {timeRemaining} seconds remaining
        </p>

        <h2>
          {question.prompt}
        </h2>

        <div>
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
