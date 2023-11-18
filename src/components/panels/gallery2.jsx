import React from "react";
import { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const ProductCol = (props) => {
  const { criterion, isSelected, cb } = props;

  let buttonText = "Select";
  let buttonVariant = "secondary";
  if (isSelected) {
    buttonText = "Selected";
    buttonVariant = "primary";
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{criterion.title}</Card.Title>
        <Card.Text>{criterion.text}</Card.Text>
        <div className="card-blank"></div>
        <Button variant={buttonVariant} onClick={cb(criterion)}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

const ProductRow = (props) => {
  const { criteria, selected, cb } = props;

  const content = criteria.map((criterion) => {
    return (
      <Col key={"criterion-col-" + criterion.title}>
        <ProductCol
          criterion={criterion}
          isSelected={selected.has(criterion.key)}
          cb={cb}
        />
      </Col>
    );
  });

  return <Row>{content}</Row>;
};

const Gallery2 = (props) => {
  const { criteria, selected, cb } = props;
  return (
    <Container className="gallery2">
      <ProductRow criteria={criteria} selected={selected} cb={cb} />
    </Container>
  );
};

export default Gallery2;
