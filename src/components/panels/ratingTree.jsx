import React, { useState, useEffect } from 'react';
import Stars from '../widgets/Stars';

const Item = (props) => {
  const { root, cb } = props;

  // Tree Item Head.
  const treeItemHead = (
    <div className="tree-item-head">
      <Stars name={root.key} count="5" cb={cb} />
      <span>{root.key}</span>
    </div>
  );

  // Tree Item Body.
  let treeItemBody = null;
  if (root.children.length > 0) {
    const treeItemBodyContent = root.children
    .map((child) => (<li key={child.key}><Item root={child} cb={cb} /></li>));
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
  const { root, cb } = props;
  return (
    <div className="tree">
      <Item root={root} cb={cb} />
    </div>
  );
}

export default Tree;
