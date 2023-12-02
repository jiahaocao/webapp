import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import MultiChoice from "../widgets/MultiChoice";

function computeBudget(val) {
  val = ((val / 100.0) ** 2 * 1500).toFixed(0);
  val = (val / 10.0).toFixed(0) * 10;
  return val;
}

const InputPage = (props) => {
  const { current, number, cb } = props;
  const style = { display: current == number ? "block" : "none" };

  const [budget, setBudget] = useState(0);
  const [systemPref, setSystemPref] = useState(0);
  const [sizePref, setSizePref] = useState(0);
  const [weightPref, setWeightPref] = useState(0);
  const [brandPref, setBrandPref] = useState(0);

  useEffect(() => {
    cb({
      budget: computeBudget(budget),
      systemPref,
      sizePref,
      weightPref,
      brandPref,
    });
  }, [budget, systemPref, sizePref, weightPref, brandPref]);

  const onChange = (e) => {
    setBudget(e.target.value);
  };

  const question2 = {
    question: "Question 2: Which operating system do you prefer?",
    choices: ["Android", "iOS"],
    name: "q2",
    values: ["Android", "iOS"],
    setter: setSystemPref,
  };

  const question3 = {
    question: "Question 3: What size of phone do you prefer?",
    choices: ["Small", "Medium", "Large", "No Prefrence"],
    name: "q3",
    values: ["small", "medium", "large", "none"],
    setter: setSizePref,
  };

  const question4 = {
    question: "Question 4: What weight of phone do you prefer?",
    choices: ["Lighter", "Medium", "Heavier", "No Prefrence"],
    name: "q4",
    values: ["light", "medium", "heavy", "none"],
    setter: setWeightPref,
  };

  const question5 = {
    question: "Question 5: Which brand do you prefer?",
    choices: [
      "Apple",
      "Google",
      "Honor",
      "Nothing",
      "Oppo",
      "Samsung",
      "Xiaomi",
    ],
    name: "q5",
    values: [
      "apple",
      "google",
      "honor",
      "nothing",
      "oppo",
      "samsung",
      "xiaomi",
    ],
    setter: setBrandPref,
  };

  return (
    <section className="input-page" style={style}>
      <h2>Input Page</h2>
      <form>
        <div className="input-question">
          <p>Question 1: What's your budget?</p>
          <Form.Range value={budget} onChange={onChange} />
          <Form.Label>${computeBudget(budget)}</Form.Label>
        </div>

        <MultiChoice {...question2} />
        <MultiChoice {...question3} />
        <MultiChoice {...question4} />
        <MultiChoice {...question5} />
      </form>

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>budget: {computeBudget(budget)}</p>
        <p>system: {systemPref}</p>
        <p>size: {sizePref}</p>
        <p>weight: {weightPref}</p>
        <p>brand: {brandPref}</p>
      </div>
    </section>
  );
};

export default InputPage;
