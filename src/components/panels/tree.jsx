import React, { useState, useEffect } from 'react';

const Item = (props) => {
  const { tree, level, cb } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (level == 1)
      setIsOpen(true);
    cb(tree.key, isOpen);
  }, [isOpen]);
  
  return (
    <div className="tree-item" style={{ textAlign: 'left' }}>
      {
        false && level == 1 && <p>{tree['title']}</p>
      }
      
      {
        true && (
          <span>
            <input type="checkbox" style={{ marginRight: '10px' }}
              onClick={handleToggle} />
            <span>{tree['title']}</span>
          </span>
        )
      }

      <ul style={{ listStyleType: 'none' }}>
        {
          (!isOpen) ? (<></>) : (
            tree['children'].map(child => {
              return (<li><Item tree={child} level={level + 1} cb={cb} /></li>);
            })
          )
        }
      </ul>
    </div>
  )
}

const Tree = (props) => {
  const { criteria, criteriaSelected } = props;
  const [selected, setSelected] = useState(new Set());

  const onClick = (key, isSelected) => {
    const newSelected = new Set(selected);
    if (isSelected) newSelected.add(key);
    else newSelected.delete(key);
    setSelected(newSelected);
  };

  if (criteria === null || criteriaSelected.size === 0) {
    return (
      <div className="tree">
        <p>You haven't selected your criteria.</p>
      </div>
    );
  }

  const children = criteria.children.filter(
    (child) => criteriaSelected.has(child.key)
  );

  return (
    <div className="tree">
      {
        children.map(child => {
          return (
            <Item tree={child} level={1} cb={onClick} />
          )
        })
      }

      <div className="debug-info">
        <p>
          selected:
          {Array.from(selected).join(', ')}
        </p>
      </div>
    </div>
  );
}

export default Tree;

