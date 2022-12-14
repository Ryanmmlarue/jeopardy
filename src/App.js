import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./features/card/card";

const App = () => {
  const [data, setData] = useState();
  const [score, setScore] = useState(0);
  const [questionValue, setQuestionValue] = useState(0);

  const getNewQuestion = () => {
    fetch("https://jservice.io/api/random")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setData(data);
        setQuestionValue(data[0].value);
      })
      .catch(function () {
        console.log("Error retriving data");
      });
  };

  const onClick = (event) => {
    var card = document.getElementById("card-container");
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }

    getNewQuestion();
  };

  useEffect(() => {
    getNewQuestion();
  }, []);

  const incrementScore = (event) => {
    var card = document.getElementById("card-container");
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
    setScore(score + questionValue);
    getNewQuestion();
  };

  const decrementScore = (event) => {
    var card = document.getElementById("card-container");
    if (card.classList.contains("is-flipped")) {
      card.classList.remove("is-flipped");
    }
    setScore(score - questionValue);
    getNewQuestion();
  };

  return (
    <div className="App">
      <Card data={data} />
      <div className="controls-container">
        <h2
          style={
            score == 0
              ? { color: "black" }
              : score > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {score}
        </h2>
        <div className="controls">
          <button onClick={decrementScore}>Incorrect</button>
          <button onClick={onClick}>Random</button>
          <button onClick={incrementScore}>Correct</button>
        </div>
      </div>
    </div>
  );
};

export default App;
