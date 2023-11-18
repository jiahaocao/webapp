import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";

const ProductCol = (props) => {
  const { product, isSelected, cb } = props;

  if (isSelected) {
    var buttonText = "Selected";
    var buttonVariant = "primary";
  } else {
    var buttonText = "Select";
    var buttonVariant = "secondary";
  }

  const url = "http://127.0.0.1:8000/todo/weights/";
  //const url = "http://www.jiahaocao.com/myapp/weights/";

  return (
    <Card>
      <Card.Img
        variant="top"
        src={url}
        alt={product.brand + " " + product.model}
      />
      <Card.Body>
        <Card.Text>
          {product.brand}
          <br />
          {product.model}
          <br />
        </Card.Text>
        <div className="card-blank"></div>
        <Button variant={buttonVariant} onClick={cb(product)}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

const ProductRow = (props) => {
  const { products, selected, cb } = props;

  const content = products.map((product) => {
    return (
      <Col key={"product-col-" + product.id}>
        <ProductCol
          product={product}
          isSelected={selected.has(product.id)}
          cb={cb}
        />
      </Col>
    );
  });

  return <Row>{content}</Row>;
};

const Gallery = (props) => {
  const { products, selected, cb } = props;
  return (
    <Container className="gallery">
      <ProductRow products={products} selected={selected} cb={cb} />
    </Container>
  );
};

export default Gallery;
