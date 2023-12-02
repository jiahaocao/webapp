import React from "react";
import { Pagination } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const PageTurn = (props) => {

  const actionStyle = {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "10px",
  };

  const { handler, current, total, titles } = props;
  const prevDisabled = current == 1;
  const nextDisabled = current == total;

  let items = [];
  for (let i = 1; i <= total; ++i) {
    items.push(
      <OverlayTrigger
        key={i}
        placement="top"
        delay={{ show: 0, hide: 0 }}
        overlay={(props) => {
          return (
            <Tooltip id="button-tooltip" {...props}>
              {titles[i-1]}
            </Tooltip>
          );
        }}
      >
        <Pagination.Item key={i} active={i === current} onClick={handler(i)}>
          {i}
        </Pagination.Item>
      </OverlayTrigger>
    );
  }
  items.unshift(
    <Pagination.Item
      key="prev"
      onClick={handler("prev")}
      disabled={prevDisabled}
    >
      Prev
    </Pagination.Item>
  );
  items.push(
    <Pagination.Item
      key="next"
      onClick={handler("next")}
      disabled={nextDisabled}
    >
      Next
    </Pagination.Item>
  );

  return (
    <div className="p-2" style={actionStyle}>
      <Pagination className="mb-1">{items}</Pagination>
      <ProgressBar
        striped
        animated
        now={(current * 100.0) / total}
        label={((current * 100.0) / total).toFixed(0) + "%"}
        style={{ background: "#e4eeff" }}
      />
    </div>
  );
};

export default PageTurn;
