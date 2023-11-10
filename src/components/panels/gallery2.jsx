import React from 'react';
import { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

class ProductCol extends React.Component {
  render() {
    const { criterion, isSelected, cb } = this.props;

    let cardStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '15px',
      marginBottom: '15px',
      height: '90%',
      padding: "15px",
      width: '215px',
      borderColor: '#dddddd',
    };

    let buttonText = 'Select';
    let buttonVariant = 'secondary';
    if (isSelected) {
      buttonText = 'Selected';
      buttonVariant = 'primary';
    }

    return (
      <Card style={cardStyle}>
        <Card.Body style={{padding: '0px'}}>
          <Card.Text>
            {criterion.title}<br/>
          </Card.Text>
          <Button variant={buttonVariant} onClick={cb(criterion)}>{buttonText}</Button>
        </Card.Body>
      </Card>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const { criteria, selected, cb } = this.props;
    return (
      <>
        {
          criteria.map((criterion) => {
            return (
              <Col key={'criterion-col-' + criterion.title}
                style={{textAlign: 'center'}}>
                <ProductCol criterion={criterion} isSelected={selected.has(criterion.key)} cb={cb} />
              </Col>
            );
          })
        }
      </>
    );
  }
}

class Gallery2 extends React.Component {
  render() {
    const { criteria, selected, cb } = this.props;
    return (
      <Container>
        <Row>
        <ProductRow criteria={criteria} selected={selected} cb={cb} />
        </Row>
      </Container>
    );
  }
};

export default Gallery2;

