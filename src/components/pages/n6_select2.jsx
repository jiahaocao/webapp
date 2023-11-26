import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Tree from "../panels/tree";
import TreeNode from "../structs/TreeNode";

function createTree(criteria) {
  const root = new TreeNode(criteria.key, criteria.title, criteria.text);
  for (const child of criteria.children) root.add(createTree(child));
  return root;
}

/******************************************************************************/

const SelectPage2 = (props) => {
  const { current, number } = props;
  const display = { display: current == number ? "block" : "none" };

  const { criteria, criteriaSelected, cb } = props;
  const [opened, setOpened] = useState(new Set());

  const rootChildren =
    criteria === null
      ? []
      : criteria.children
          .filter((child) => criteriaSelected.has(child.key))
          .map((child) => createTree(child));

  /****************************************************************************/

  const tree = new TreeNode("root", "Root", "Root");
  for (const child of rootChildren) tree.add(child);

  const nodes = {}; // a key-node map
  for (const node of tree.traverse()) nodes[node.key] = node;

  // If top-level criteria have change, start afresh.
  useEffect(() => {
    const newOpened = new Set();
    newOpened.add("root");
    for (const child of rootChildren) newOpened.add(child.key);
    setOpened(newOpened);
  }, [criteriaSelected]);

  // Opened = selected.
  useEffect(() => {
    cb(opened);
  }, [opened]);

  /****************************************************************************/

  if (rootChildren.length === 0) {
    return (
      <div className="select2-page" style={display}>
        <h2>Select Sub-Criteria</h2>
        <Alert variant="warning">You haven't selected your criteria.</Alert>
      </div>
    );
  }

  /****************************************************************************/

  const onSelect = (key) => {
    return (e) => {
      const newOpened = new Set(opened);
      if (e.target.checked) {
        newOpened.add(key);
      } else {
        for (const k of nodes[key].descendants()) newOpened.delete(k);
        newOpened.delete(key);
      }
      setOpened(newOpened);
    };
  };

  /****************************************************************************/

  return (
    <section className="select2-page" style={display}>
      <h2>Select Sub-Criteria</h2>

      <Tree root={tree} opened={opened} cb={onSelect} />

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          Opened:
          {Array.from(opened).join(", ")}
        </p>
      </div>
    </section>
  );
};

export default SelectPage2;
