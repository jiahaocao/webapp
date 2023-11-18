import React from "react";
import MoreInfo from "../widgets/MoreInfo";

const Item = (props) => {
  const { root, opened, cb, level } = props;

  // Tree Item Head.
  const treeItemHead =
    root.key == "root" ? (
      <></>
    ) : (
      <div
        className="tree-item-head"
        style={{ background: `rgba(0,128,256,${0.03 * level})` }}
      >
        <input
          type="checkbox"
          value={root.key}
          onClick={cb(root.key)}
          checked={opened.has(root.key)}
          onChange={() => {}}
        />
        <span>{root.title}</span>
        {root.text ? <MoreInfo text={root.text} /> : <></>}
      </div>
    );

  // Tree Item Body.
  let treeItemBody = null;
  if (opened.has(root.key)) {
    const treeItemBodyContent = root.children.map((child) => (
      <li key={child.key}>
        <Item root={child} opened={opened} cb={cb} level={level + 1} />
      </li>
    ));
    treeItemBody = (
      <div className="tree-item-body">
        <ul>{treeItemBodyContent}</ul>
      </div>
    );
  }

  return (
    <div className="tree-item">
      {treeItemHead}
      {treeItemBody}
    </div>
  );
};

const Tree = (props) => {
  const { root, opened, cb } = props;
  return (
    <div className="tree">
      <Item root={root} opened={opened} cb={cb} level={0} />
    </div>
  );
};

export default Tree;
