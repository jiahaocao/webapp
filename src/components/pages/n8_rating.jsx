import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import RatingTree from "../panels/ratingTree";
import TreeNode from "../structs/TreeNode";

function createTree(criteria, selected) {
  if (criteria === null) return null;
  if (!selected.has(criteria.key)) return null;
  const root = new TreeNode(criteria.key, criteria.title, criteria.text);
  for (const child of criteria.children)
    if (selected.has(child.key)) root.add(createTree(child, selected));
  return root;
}

/******************************************************************************/

const RatingPage = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? "block" : "none" };

  const { criteria, subcriteriaSelected, cb } = props;
  const [ratings, setRatings] = useState({});

  const tree = createTree(criteria, subcriteriaSelected);

  useEffect(() => {
    const newRatings = {};
    for (const key in ratings)
      if (subcriteriaSelected.has(key)) newRatings[key] = ratings[key];
    setRatings(newRatings);
  }, [subcriteriaSelected]);

  useEffect(() => {
    cb(ratings);
  }, [ratings]);


  /****************************************************************************/


  if (tree == null) {
    return (
      <div className="rating-page" style={style}>
        <Alert variant="warning">You haven't selected your criteria.</Alert>
      </div>
    );
  }

  /****************************************************************************/

  const onSelect = (e) => {
    const newRatings = { ...ratings };
    newRatings[e.target.name] = e.target.value;
    setRatings(newRatings);
  };

  return (
    <section className="rating-page" style={style}>
      <h2>Rating</h2>
      <RatingTree root={tree} cb={onSelect} />
      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          {Object.keys(ratings)
            .map((key) => `(${key}, ${ratings[key]})`)
            .join(", ")}
        </p>
      </div>
    </section>
  );
};

export default RatingPage;

