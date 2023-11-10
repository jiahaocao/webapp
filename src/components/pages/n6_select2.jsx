import { useState } from 'react';
import Tree from '../panels/tree';

const SelectPage2 = (props) => {
  const { current, number, criteria, criteriaSelected } = props;
  const style = { display: current == number ? 'block' : 'none' };

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

  return (
    <div className="select2-page" style={style}>
      <h2>Select Sub-Criteria</h2>
      <Tree criteria={criteria} criteriaSelected={criteriaSelected} />

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          selected:
          {Array.from(selected).join(', ')}
        </p>
      </div>
    </div>
  );
}

export default SelectPage2;

