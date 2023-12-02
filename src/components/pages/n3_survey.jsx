import { useEffect, useState } from "react";
import MultiChoice from "../widgets/MultiChoice";
import MultiScore from "../widgets/MultiScore";

const SurveyPage = (props) => {
  const { current, number, cb } = props;
  const display = { display: current == number ? "block" : "none" };

  const [q1, setq1] = useState(0);
  const [q2, setq2] = useState(0);
  const [q3a, setq3a] = useState(0);
  const [q3b, setq3b] = useState(0);
  const [q4, setq4] = useState("");

  useEffect(() => {
    cb({ q1, q2, q3a, q3b, q4 });
  }, [q1, q2, q3a, q3b, q4]);

  const question1 = {
    question:
      "Question 1: How long do you use your cell phone on average per day?",
    choices: ["Less than 2 hours", "2 to 4 hours", "Over 4 hours"],
    name: "q1",
    values: [1, 2, 3],
    setter: setq1,
  };

  const question2 = {
    question: "Question 2: How long do you expect this new phone to last?",
    choices: ["Less than 1 year", "1-2 years", "Over 2 years"],
    name: "q2",
    values: [1, 2, 3],
    setter: setq2,
  };

  const question3 = {
    question:
      "Question 3: How often do you use the following functions?<br />" +
      "( 1 = never/seldom; 2 = sometimes; 3 = often )",
    choices: ["Internet search", "Phone/video call"],
    range: 3,
    names: ["q3a", "q3b"],
    setters: [setq3a, setq3b],
  };

  return (
    <section className="survey-page" style={display}>
      <h2>Smart Phone Usage Survey</h2>
      <p>
        First of all, let's explore your needs for the new phone.
        <br />
        Please answer the following questions.
      </p>
      <form>
        <MultiChoice {...question1} />
        <MultiChoice {...question2} />
        <MultiScore {...question3} />

        <div className="survey-question">
          <p>
            Question 4: Based on your phone usage, what makes a good cell phone
            for you? Please write down the factors that are important to you
            when considering buying the new one.
          </p>
          <textarea
            value={q4}
            onChange={(e) => setq4(e.target.value)}
          ></textarea>
        </div>
      </form>
    </section>
  );
};

export default SurveyPage;
