import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import RankTable from "../panels/RankTable";

const SummaryPage = (props) => {
  const { current, number, summary, cb } = props;
  const display = { display: current == number ? "block" : "none" };

  const { productsSelected, subcriteriaSelected, ratings } = summary;
  const { survey, inputs } = summary;

  const data = {
    productsSelected: Array.from(productsSelected),
    subcriteriaSelected: Array.from(subcriteriaSelected),
    ratings,
    survey,
    inputs,
  };

  const [weights, setWeights] = useState(null);
  const [scores, setScores] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const url = "http://127.0.0.1:8000/todo/result/";
  //const url = "http://www.jiahaocao.com/myapp/weights/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data, null, 2),
      })
        .then((res) => {
          if (res.ok) return res.json();
          else {
            throw Error("Could not fetch data");
          }
        })
        .then((data) => {
          console.log("data", typeof data);
          console.log(data["weights"]);
          setWeights(data["weights"]);

          console.log(data["scores"]);
          setScores(data["scores"]);

          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError')
            console.log("Fetch aborted");
          else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 500);
  };

  useEffect(() => {
    cb(scores);
  }, [scores])

  return (
    <section className="summary-page" style={display}>
      <h2>Summary</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && <Alert variant="warning">Loading</Alert>}

      {weights && <RankTable rankList={weights} />}

      <span style={{
        display: "inline-block",
        position: "relative",
        }}>
        <textarea
          cols="40"
          rows="10"
          id="ujson"
          name="ujson"
          value={JSON.stringify(data, null, 2)}
          onChange={() => {}}>
        </textarea>
        <Button onClick={handleSubmit}
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}>Submit</Button>
      </span>
    </section>
  );
};

export default SummaryPage;
