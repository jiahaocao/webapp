import { OverlayTrigger, Tooltip } from "react-bootstrap";

const MoreInfo = (props) => {
  const { text } = props;

  const renderTooltip = (props) => {
    return <Tooltip id="button-tooltip" {...props}>{text}</Tooltip>;
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 0, hide: 0 }}
      overlay={renderTooltip}
    >
      <span
        style={{
          margin: "10px",
          color: "#bbbbbb",
          cursor: "pointer",
        }}
      >
        <svg width={20} height={20}>
          <circle cx="10" cy="10" r="6" stroke="#cccccc" fill="none"></circle>
          <text
            x="10"
            y="11"
            fill="#cccccc"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="11"
          >
            ?
          </text>
        </svg>
      </span>
    </OverlayTrigger>
  );
};

export default MoreInfo;
