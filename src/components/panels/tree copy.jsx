import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Accordion } from 'react-bootstrap';

class DirItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isMouseOver: false,
      color: 'black',
    };
  }

  onMouseOver = (event) => {
    event.preventDefault();
    this.setState(
      () => {
        return {
          isMouseOver: true,
          color: 'blue',
        };
      }
    );
  }

  onMouseOut = (event) => {
    event.preventDefault();
    this.setState(
      () => {
        return {
          isMouseOver: false,
          color: 'black',
        };
      }
    );
  }

  render() {
    const { name } = this.props;
    return (
      <span className="dir-item" onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={{ color: this.state.color }}>
        <span>{name}</span>
      </span>
    );
  }
}


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
    <div className="Tree-Item" style={{ textAlign: 'left' }}>
      {
        level == 1 && <DirItem name={tree['title']} />
      }
      
      {
        level > 1 && (
          <span onClick={handleToggle}>
            <input type="checkbox" id="checkbox" name={tree.key} style={{ marginRight: '10px' } } />
            <DirItem name={tree['title']} />
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

