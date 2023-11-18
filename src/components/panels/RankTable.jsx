import React from "react";
import { Table } from "react-bootstrap";

const RankTableRow = (props) => {
  const { rank, criteria, weighting } = props;
  return (
    <tr key={rank}>
      <td style={{textAlign: "right"}}>{rank}</td>
      <td>{criteria}</td>
      <td>{weighting.toFixed(3)}</td>
    </tr>
  );
};

const RankTable = (props) => {
  const { rankList } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{textAlign: "right"}}>Rank</th>
          <th>Criteria</th>
          <th>Weighting</th>
        </tr>
      </thead>
      <tbody>
      {rankList.map((item, index) => {
        return (
          <RankTableRow rank={index} criteria={item[0]} weighting={item[1]} />
        );
      })}
      </tbody>
    </Table>
  );
};

export default RankTable;
