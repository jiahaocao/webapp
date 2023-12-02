import React from "react";
import { Table } from "react-bootstrap";

const MyTableRow = (props) => {
  const { entry } = props;
  return (
    <tr>
      {entry.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
};

const MyTable = (props) => {
  const { entrys, headers } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entrys.map((entry, index) => {
          return <MyTableRow key={index} entry={entry} />;
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
