import React, { useState, useEffect } from 'react';

const Item = (props) => {
  const { root, opened, cb } = props;

  // Tree Item Head.
  const treeItemHead = (
    <div className="tree-item-head">
      <input type="checkbox" value={root.key} onClick={cb(root.key)}
        checked={opened.has(root.key)} onChange={() => {}}/>
      <span>{root.key}</span>
    </div>
  );

  // Tree Item Body.
  let treeItemBody = null;
  if (opened.has(root.key)) {
    const treeItemBodyContent = root.children
    .map((child) => (<li key={child.key}><Item root={child} opened={opened} cb={cb} /></li>));
    treeItemBody = (
      <div className="tree-item-body">
        <ul>
          {treeItemBodyContent}
        </ul>
      </div>
    );
  }

  return (
    <div className="tree-item">
        {treeItemHead}
        {treeItemBody}
    </div>
  )
}

const Tree = (props) => {
  const { root, opened, cb } = props;
  return (
    <div className="tree">
      <Item root={root} opened={opened} cb={cb} />
    </div>
  );
}

export default Tree;
