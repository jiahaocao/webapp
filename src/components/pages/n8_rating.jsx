import React, { useState, useEffect } from 'react';
import RatingTree from '../panels/ratingTree';

class TreeNode {
  constructor(key) {
    this.key = key;
    this.children = [];
  }
  add(child) {
    this.children.push(child);
  }
  traverse() {
    let result = [this]
    for (const child of this.children)
      result.push(child);
    for (const child of this.children)
      result = result.concat(child.traverse());
    return result;
  }
}

function createTree(criteria, selected) {
  if (criteria === null) return null;
  if (!(selected.has(criteria.key))) return null;
  const root = new TreeNode(criteria.key);
  for (const child of criteria.children)
    if (selected.has(child.key))
      root.add(createTree(child, selected));
  return root;
}

/******************************************************************************/

const RatingPage = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? 'block' : 'none' };

  const { criteria, subcriteriaSelected, cb } = props;
  const [ratings, setRatings] = useState({});

  const tree = createTree(criteria, subcriteriaSelected);

  useEffect(() => {
    cb(ratings);
  }, [ratings])

  /************************************/

  if (tree == null) {
    return (
      <div className="rating-page" style={style}>
        <p>You haven't selected your criteria.</p>
      </div>
    );
  }

  /************************************/

  const onSelect = (key) => {
    return (e) => {
      const newRatings = {...ratings};
      newRatings[e.target.name] = e.target.value;
      setRatings(newRatings);
    };
  }

  return (
    <div className="rating-page" style={style}>
      <h2>Rating</h2>
      <RatingTree root={tree} cb={onSelect} />
      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          {
            Object.keys(ratings)
            .map((key) => `(${key}, ${ratings[key]})`)
            .join(', ')
          }
        </p>
      </div>
    </div>
  );
}

export default RatingPage;

