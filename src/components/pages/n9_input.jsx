import { useState } from 'react';
import { Form } from 'react-bootstrap';

function computeBudget(val) {
    val = ((val / 100.0)**2 * 1500).toFixed(0);
    val = (val / 10.0).toFixed(0) * 10;
    return val;
}

const InputPage = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? 'block' : 'none' };

  const [budget, setBudget] = useState(0);
  const [systemPref, setSystemPref] = useState(0);
  const [brandPref, setBrandPref] = useState(0);;

  const onChange = (e) => {
    setBudget(e.target.value);
  }

  return (
    <div className="input-page" style={style}>
      <h2>Input Page</h2>
      <form>
        <div className="input-question">
          <p>Question 1: What's your budget?</p>
          <Form.Range value={budget} onChange={onChange} />
          <Form.Label>${computeBudget(budget)}</Form.Label>
        </div>

        <div className="input-question">
          <p>Question 2: Which operating system do you prefer?</p>
          <div className="input-option">
            <input type="radio" name="q2" value="1" onChange={(e) => setSystemPref(e.target.value)} />
            <label>Android (Pixel, Samsung, etc.)</label><br />
            <input type="radio" name="q2" value="2" onChange={(e) => setSystemPref(e.target.value)} />
            <label>iOS (Apple iPhone)</label><br />
          </div>
        </div>

        <div className="input-question">
          <p>Question 3: Which brand do you prefer?</p>
          <div className="input-option">
            <input type="radio" name="q3" value="1" onChange={(e) => setBrandPref(e.target.value)} /> <label>Apple</label><br />
            <input type="radio" name="q3" value="2" onChange={(e) => setBrandPref(e.target.value)} /> <label>Google</label><br />
            <input type="radio" name="q3" value="3" onChange={(e) => setBrandPref(e.target.value)} /> <label>Honor</label><br />
            <input type="radio" name="q3" value="4" onChange={(e) => setBrandPref(e.target.value)} /> <label>Nothing</label><br />
            <input type="radio" name="q3" value="5" onChange={(e) => setBrandPref(e.target.value)} /> <label>Oppo</label><br />
            <input type="radio" name="q3" value="6" onChange={(e) => setBrandPref(e.target.value)} /> <label>Samsung</label><br />
            <input type="radio" name="q3" value="7" onChange={(e) => setBrandPref(e.target.value)} /> <label>Xiaomi</label><br />
          </div>
        </div>
      </form>

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>budget: {computeBudget(budget)}</p>
        <p>system: {systemPref}</p>
        <p>brand: {brandPref}</p>
      </div>
    </div>
  );
}

export default InputPage;
