class TreeNode {
  constructor(key, title, text) {
    this.key = key;
    this.title = title;
    this.text = text;
    this.children = [];
  }
  add(child) {
    this.children.push(child);
  }
  traverse() {
    let result = [this];
    for (const child of this.children) result.push(child);
    for (const child of this.children) result = result.concat(child.traverse());
    return result;
  }
  descendants() {
    let result = [];
    for (const child of this.children) result.push(child.key);
    for (const child of this.children)
      result = result.concat(child.descendants);
    return result;
  }
}

export default TreeNode;
