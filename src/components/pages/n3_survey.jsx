import { useState } from 'react';

const SurveyPage = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? 'block' : 'none' };

  const [q1, setq1] = useState(1);
  const [q2, setq2] = useState(1);
  const [q3a, setq3a] = useState(1);
  const [q3b, setq3b] = useState(1);
  const [q4, setq4] = useState("");

  return (
    <div className="survey-page" style={style}>
      <h2>Smart Phone Usage Survey</h2>
      <p>First of all, let's explore your needs for the new phone. Please answer the following questions.</p>
      <form>
        <div className="survey-question">
          <p>Question 1: How long do you use your cell phone on average per day?</p>
          <div className="survey-option">
            <input type="radio" name="q1" value="1" onChange={(e) => setq1(e.target.value)} /> <label>Less than 2 hours</label><br />
            <input type="radio" name="q1" value="2" onChange={(e) => setq1(e.target.value)} /> <label>2 to 4 hours</label><br />
            <input type="radio" name="q1" value="3" onChange={(e) => setq1(e.target.value)} /> <label>Over 4 hours</label>
          </div>
        </div>

        <div className="survey-question">
          <p>Question 2: How long do you expect this new phone to last?</p>
          <div className="survey-option">
            <input type="radio" name="q2" value="1" onChange={(e) => setq2(e.target.value)} /> <label>Less than 1 year</label><br />
            <input type="radio" name="q2" value="2" onChange={(e) => setq2(e.target.value)} /> <label>1-2 years</label><br />
            <input type="radio" name="q2" value="3" onChange={(e) => setq2(e.target.value)} /> <label>Over 2 years</label>
          </div>
        </div>

        <div className="survey-question">
          <p>Question 3: How often do you use the following functions?</p>
          <p>(1: never/seldom, 2: sometimes, 3: often)</p>
          <div className="survey-option">
            <input type="radio" name="q3a" value="1" onChange={(e) => setq3a(e.target.value)} />
            <input type="radio" name="q3a" value="2" onChange={(e) => setq3a(e.target.value)} />
            <input type="radio" name="q3a" value="3" onChange={(e) => setq3a(e.target.value)} />
            <label>Internet search</label>
          </div>
          <div className="survey-option">
            <input type="radio" name="q3b" value="1" onChange={(e) => setq3b(e.target.value)} />
            <input type="radio" name="q3b" value="2" onChange={(e) => setq3b(e.target.value)} />
            <input type="radio" name="q3b" value="3" onChange={(e) => setq3b(e.target.value)} />
            <label>Phone/video call</label>
          </div>
        </div>

        <div className="survey-question">
          <p>Question 4: Based on your phone usage, what makes a good cell phone for you? Please write down the factors that are important to you when considering buying the new one.</p>
          <textarea
            value={q4}
            onChange={(e) => setq4(e.target.value)} >
          </textarea>
        </div>
      </form>

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>q1: {q1}</p>
        <p>q2: {q2}</p>
        <p>q3a: {q3a}</p>
        <p>q3b: {q3b}</p>
        <p>q4: {q4}</p>
      </div>
    </div>
  );
}

export default SurveyPage;

