import React, { useEffect } from "react";
import { ReactComponent as GoalTree } from "../assets/graph.svg";

class GoaltreePage extends React.Component {
  componentDidUpdate = function () {
    const mapping = computeMapping();

    const { criteria, subcriteriaSelected } = this.props;
    if (criteria === null) return;

    const arr = getNames(criteria, subcriteriaSelected);

    for (const title in mapping) {
      if (arr.find((x) => x == title) !== undefined)
        continue;
      const { rect, line, arrow, text } = mapping[title];
      rect.setAttribute("fill", "#f8f8f8");
      rect.setAttribute("stroke", "#f8f8f8");
      line.setAttribute("stroke", "#f0f0f0");
      arrow.setAttribute("fill", "#f0f0f0");
      arrow.setAttribute("stroke", "#f0f0f0");
      text.style.color = "#ffffff";
    }


    for (const title of arr) {
      if (title in mapping) {
        const { rect, line, arrow, text } = mapping[title];
        line.remove();
        const content = document.querySelector(".goaltree-page svg");
        content.querySelector("svg > g").appendChild(line);
      }
    }
  };

  render() {
    const { current, number } = this.props;
    const style = { display: current == number ? "block" : "none" };

    return (
      <section className="goaltree-page" style={style}>
        <h2>Visualization</h2>
        <GoalTree key={Math.random()} />
      </section>
    );
  }
}

function computeMapping() {
  let mapping = {};

  const content = document.querySelector(".goaltree-page svg");

  const rects = Array.from(content.querySelectorAll("rect"));
  const rectCenters = rects.map((rect) => getRectCenter(rect));

  const texts = Array.from(
    content.querySelectorAll('div[style*="font-family"]')
  );
  const textCenters = texts.map((text) => getTextCenter(text));

  const paths = Array.from(content.querySelectorAll("path"));
  const lines = paths.filter((path) => getPathType(path) === "line");
  const lineEnds = lines.map((path) => getPathEnd(path));

  const arrows = paths.filter((path) => getPathType(path) === "arrow");
  const arrowPos = arrows.map((arrow) => getArrowPosition(arrow));

  for (let i = 1; i <= lines.length; ++i) {
    const lineDistances = lineEnds.map((p) =>
      computeDistance(p, rectCenters[i])
    );
    const textDistances = textCenters.map((p) =>
      computeDistance(p, rectCenters[i])
    );
    const arrowDistances = arrowPos.map((p) =>
      computeDistance(p, rectCenters[i])
    );

    const lineMinIdx = lineDistances.indexOf(Math.min(...lineDistances));
    const textMinIdx = textDistances.indexOf(Math.min(...textDistances));
    const arrowMinIdx = arrowDistances.indexOf(Math.min(...arrowDistances));

    const rect = rects[i];
    const line = lines[lineMinIdx];
    const text = texts[textMinIdx];
    const arrow = arrows[arrowMinIdx];

    const title = getTextContent(text.innerHTML);
    mapping[title] = {
      rect: rect,
      line: line,
      arrow: arrow,
      text: text,
    };
  }
  
  return mapping;
}

function getRectCenter(rect) {
  const x = parseInt(rect.getAttribute("x"));
  const y = parseInt(rect.getAttribute("y"));
  const w = parseInt(rect.getAttribute("width"));
  const h = parseInt(rect.getAttribute("height"));
  const cx = x + w / 2;
  const cy = y + h / 2;
  return [cx, cy];
}

function getPathInstructions(path) {
  const re = new RegExp("[a-z][^a-z]*", "gi");
  const res = path.getAttribute("d").match(re);
  if (res == null) return null;
  for (let i = 0; i < res.length; ++i) res[i] = res[i].trim();
  return res;
}

function getPathType(path) {
  const ins = getPathInstructions(path);
  if (ins[ins.length - 1] == "Z") return "arrow";
  else return "line";
}

function getPathEnd(path) {
  const ins = getPathInstructions(path);
  const end = ins[ins.length - 1];
  const x = end.split(" ")[1];
  const y = end.split(" ")[2];
  return [x, y];
}

function getArrowPosition(path) {
  const ins = getPathInstructions(path);
  const end = ins[ins.length - 2];
  const x = end.split(" ")[1];
  const y = end.split(" ")[2];
  return [x, y];
}

function computeDistance(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function getTextContent(text) {
  const re = new RegExp("[ \n]+", "g");
  const res = text.split(re).filter((s) => s.length > 0);
  return res.join(" ");
}

function getTextCenter(text) {
  const grand = text.parentElement.parentElement;
  const x = parseInt(grand.style["margin-left"]);
  const y = parseInt(grand.style["padding-top"]);
  return [x, y];
}

function getNames(criteria, criteriaSelected) {
  return Array.from(criteriaSelected).map(key => getName(criteria, key));
}

function getName(criteria, key) {
  if (criteria.key == key)
    return criteria.title;
  for (const child of criteria.children) {
    const tmp = getName(child, key);
    if (tmp !== null) return tmp;
  }
  return null;
}

export default GoaltreePage;
