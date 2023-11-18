import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Gallery2 from '../panels/gallery2';
import { Alert } from 'react-bootstrap';

const SelectPage1 = (props) => {
  const { current, number, cb } = props;
  const display = { display: current == number ? 'block' : 'none' };

  const url = "http://127.0.0.1:8000/todo/criteria/";
  //const url = "http://www.jiahaocao.com/myapp/criteria/";
  
  const { data: criteria, isLoading, error } = useFetch(url);

  const [selected, setSelected] = useState(new Set());

  const onSelect = (criterion) => {
    return (e) => {
      e.preventDefault();
      const newSelected = new Set(selected);
      console.log("newSelect");
      console.log(newSelected);
      if (newSelected.has(criterion.key))
        newSelected.delete(criterion.key);
      else newSelected.add(criterion.key);
      setSelected(newSelected);
    }
  };

  useEffect(() => {
    console.log(selected);
    cb(criteria, selected);
  }, [selected]);

  return (
    <section className="select1-page" style={display}>
      <h2>Select Criteria</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading && <Alert variant="warning">Loading</Alert>}

      {
        criteria && <Gallery2 criteria={criteria.children} selected={selected} cb={onSelect} />
      }
      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          selected:
          {Array.from(selected).join(', ')}
        </p>
      </div>
    </section>
  );
}

export default SelectPage1;

