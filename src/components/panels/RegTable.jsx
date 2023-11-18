import React from "react";
import { Table } from "react-bootstrap";

const RegTableRow = (props) => {
  const { row, names } = props;
  const columns = names.map((name, idx) => {
    return <td key={`reg-col-${idx}`}>{row[name]}</td>;
  });
  return columns;
};

const RegTable = (props) => {
  const { dataFrame, names } = props;

  const tableHead = (
    <thead>
      <tr>
        {names.map((name, idx) => {
          return <th key={`reg-head-${idx}`}>{name.toUpperCase()}</th>;
        })}
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {dataFrame.map((row, idx) => {
        return (
          <tr key={`reg-col-${idx}`}>
            <RegTableRow row={row} names={names} />
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <div className="reg-table">
      <Table responsive bordered hover>
        {tableHead}
        {tableBody}
      </Table>
    </div>
  );
};

export default RegTable;
