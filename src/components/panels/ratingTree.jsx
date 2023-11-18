import React from "react";
import Stars from "../widgets/Stars";
import MoreInfo from "../widgets/MoreInfo";

const Item = (props) => {
  const { root, cb, level } = props;

  // Tree Item Head.
  const treeItemHead =
    root.key == "root" ? (
      <></>
    ) : (
      <div className="tree-item-head" style={{background: `rgba(0,128,256,${0.03*level})` }}>
        <span className="left">
          {root.title}
          {root.text ? <MoreInfo text={root.text} /> : <></>}
        </span>

        <Stars name={root.key} count="5" cb={cb} />
      </div>
    );

  // Tree Item Body.
  let treeItemBody = null;
  if (root.children.length > 0) {
    const treeItemBodyContent = root.children.map((child) => (
      <li key={child.key}>
        <Item root={child} cb={cb} level={level+1} />
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
  const { root, cb } = props;
  return (
    <div className="tree">
      <Item root={root} cb={cb} level={0} />
    </div>
  );
};

export default Tree;
