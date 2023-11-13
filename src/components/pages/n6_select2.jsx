import React, { useEffect, useState } from 'react';
import Tree from '../panels/tree';

/******************************************************************************/

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
  descendants() {
    let result = []
    for (const child of this.children)
      result.push(child.key);
    for (const child of this.children)
      result = result.concat(child.descendants);
    return result;
  }
}

function createTree(criteria) {
  const root = new TreeNode(criteria.key);
  for (const child of criteria.children)
    root.add(createTree(child));
  return root;
}

/******************************************************************************/

const SelectPage2 = (props) => {
  const { current, number } = props;
  const style = { display: current == number ? 'block' : 'none' };

  /************************************/

  const { criteria, criteriaSelected, cb } = props;
  const [opened, setOpened] = useState(new Set());

  /************************************/

  const rootChildren =
    criteria === null ? [] :
      criteria.children
        .filter((child) => criteriaSelected.has(child.key))
        .map((child) => createTree(child));

  const tree = new TreeNode("root");
  for (const child of rootChildren)
    tree.add(child);

  const nodes = {};
  for (const node of tree.traverse())
    nodes[node.key] = node;

  useEffect(() => {
    const newOpened = new Set();
    newOpened.add("root");
    for (const child of rootChildren)
      newOpened.add(child.key);
    setOpened(newOpened);
  }, [criteriaSelected]);

  useEffect(() => {
    cb(opened);
  }, [opened]);

  /************************************/

  if (rootChildren.length === 0) {
    return (
      <div className="select2-page" style={style}>
        <p>You haven't selected your criteria.</p>
      </div>
    );
  }

  /************************************/

  const onSelect = (key) => {
    return (e) => {
      const newOpened = new Set(opened);
      if (e.target.checked) {
        newOpened.add(key);
      } else {
        for (const k of nodes[key].descendants())
          newOpened.delete(k);
        newOpened.delete(key);
      }
      setOpened(newOpened);
    };
  }

  /************************************/

  return (
    <div className="select2-page" style={style}>
      <h2>Select Sub-Criteria</h2>

      <Tree root={tree} opened={opened} cb={onSelect} />

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          Opened:
          {Array.from(opened).join(', ')}
        </p>
      </div>
    </div>
  );
}

export default SelectPage2;
