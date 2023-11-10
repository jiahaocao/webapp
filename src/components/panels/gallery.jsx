import React from 'react';
import { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

class ProductCol extends React.Component {
  render() {
    const { product, isSelected, cb } = this.props;

    let cardStyle = {
      padding: "15px",
      height: "95%",
      width: '10rem',
      borderColor: 'white',
    };

    let buttonText = 'Select';
    let buttonVariant = 'secondary';
    if (isSelected) {
      buttonText = 'Selected';
      buttonVariant = 'primary';
    }

    const imageStyle = {
      objectFit: 'contain',
      height: '150px',
    };

    return (
      <Card className="m-1 p-1" style={cardStyle}>
        <Card.Img variant='top' src={`http://127.0.0.1:8000/todo/product/${product.id}`}
          alt={product.brand + ' ' + product.model} style={imageStyle} />
        <Card.Body>
          <Card.Text>
            {product.brand}<br/>
            {product.model}<br/>
          </Card.Text>
            <Button variant={buttonVariant} onClick={cb(product)}>{buttonText}</Button>
        </Card.Body>
      </Card>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { products, selected, cb } = this.props;
    return (
      <>
        {
          products.map((product) => {
            return (
              <Col key={'product-col-' + product.id}>
                <ProductCol product={product} isSelected={selected.has(product.id)} cb={cb} />
              </Col>
            );
          })
        }
      </>
    );
  }
}

class Gallery extends React.Component {
  render() {
    const { products, selected, cb } = this.props;
    return (
      <Container>
        <Row>
        <ProductRow products={products} selected={selected} cb={cb} />
        </Row>
      </Container>
    );
  }
};

export default Gallery;

