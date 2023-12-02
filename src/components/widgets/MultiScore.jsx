import React from "react";

const MultiScore = (props) => {
  const { question, choices, range } = props;
  const { names, setters } = props;

  const questionContent = (
    <p>
      {question.split("<br />").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );

  const choicesContent = choices.map((choice, index) => {
    return (
      <div key={index} className="scores">
        {[...Array(range).keys()].map((i) => {
          return (
            <input
              key={i + 1}
              type="radio"
              name={names[index]}
              value={i + 1}
              onChange={(e) => setters[index](e.target.value)}
            />
          );
        })}
        <label>{choice}</label>
      </div>
    );
  });

  return (
    <div className="multi-score">
      {questionContent}
      {choicesContent}
    </div>
  );
};

export default MultiScore;
