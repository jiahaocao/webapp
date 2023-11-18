import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function computeBudget(val) {
    val = ((val / 100.0)**2 * 1500).toFixed(0);
    val = (val / 10.0).toFixed(0) * 10;
    return val;
}

const InputPage = (props) => {
  const { current, number, cb } = props;
  const style = { display: current == number ? 'block' : 'none' };

  const [budget, setBudget] = useState(0);
  const [systemPref, setSystemPref] = useState(0);
  const [sizePref, setSizePref] = useState(0);
  const [weightPref, setWeightPref] = useState(0);
  const [brandPref, setBrandPref] = useState(0);

  useEffect(() => {
    cb({budget: computeBudget(budget), systemPref, sizePref, weightPref, brandPref});
  }, [budget, systemPref, sizePref, weightPref, brandPref]);

  const onChange = (e) => {
    setBudget(e.target.value);
  }

  return (
    <section className="input-page" style={style}>
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
            <input type="radio" name="q2" onChange={(e) => setSystemPref(e.target.value)} value="android" />
            <label>Android (Pixel, Samsung, etc.)</label><br />
            <input type="radio" name="q2" onChange={(e) => setSystemPref(e.target.value)} value="ios" />
            <label>iOS (Apple iPhone)</label><br />
          </div>
        </div>

        <div className="input-question">
          <p>Question 3: What size of phone do you prefer?</p>
          <div className="input-option">
            <input type="radio" name="q3" onChange={(e) => setSizePref(e.target.value)} value="small" /> <label>Small</label><br />
            <input type="radio" name="q3" onChange={(e) => setSizePref(e.target.value)} value="medium" /> <label>Medium</label><br />
            <input type="radio" name="q3" onChange={(e) => setSizePref(e.target.value)} value="large" /> <label>Large</label><br />
            <input type="radio" name="q3" onChange={(e) => setSizePref(e.target.value)} value="none" /> <label>No Prefrence</label><br />
          </div>
        </div>

        <div className="input-question">
          <p>Question 4: What weight of phone do you prefer?</p>
          <div className="input-option">
            <input type="radio" name="q4" onChange={(e) => setWeightPref(e.target.value)} value="lighter" /> <label>Lighter</label><br />
            <input type="radio" name="q4" onChange={(e) => setWeightPref(e.target.value)} value="medium" /> <label>Medium</label><br />
            <input type="radio" name="q4" onChange={(e) => setWeightPref(e.target.value)} value="heavier" /> <label>Heavier</label><br />
            <input type="radio" name="q4" onChange={(e) => setWeightPref(e.target.value)} value="none" /> <label>No Prefrence</label><br />
          </div>
        </div>

        <div className="input-question">
          <p>Question 5: Which brand do you prefer?</p>
          <div className="input-option">
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="apple" /> <label>Apple</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="google" /> <label>Google</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="honor" /> <label>Honor</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="nothing" /> <label>Nothing</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="oppo" /> <label>Oppo</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="samsung" /> <label>Samsung</label><br />
            <input type="radio" name="q5" onChange={(e) => setBrandPref(e.target.value)} value="xiaomi" /> <label>Xiaomi</label><br />
          </div>
        </div>
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
}

export default InputPage;

