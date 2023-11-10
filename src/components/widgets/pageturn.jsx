import React from 'react';
import { Button } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

class PageTurn extends React.Component {
  render() {

    const actionStyle = {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '10px',
    };

    const { handler, current, total } = this.props;
    const prevDisabled = current == 1;
    const nextDisabled = current == total;

    let items = [];
    for (let i = 1; i <= total; ++i) {
      items.push(
        <Pagination.Item key={i} active={i === current} onClick={handler(i)}>
          {i}
        </Pagination.Item>
      );
    }
    items.unshift(<Pagination.Item key='prev' onClick={handler("prev")} disabled={prevDisabled}>Prev</Pagination.Item>);
    items.push(<Pagination.Item key='next' onClick={handler("next")} disabled={nextDisabled}>Next</Pagination.Item>);

    return (
        <div className='p-2'style={actionStyle}>
        <Pagination className='mb-1'>{items}</Pagination>
        <ProgressBar striped animated
          now={current * 100.0 / total}
          label={(current * 100.0 / total).toFixed(0) + '%'}
          style={{background: '#e4eeff'}}/>
      </div>
    );
  }
}

export default PageTurn;

