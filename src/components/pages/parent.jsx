import React from 'react';
import PageTurn from '../widgets/pageturn';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import WelcomePage from './n1_welcome';
import BrokenPage from './n2_broken';
import SurveyPage from './n3_survey';
import GalleryPage from './n4_gallery';
import SelectPage1 from './n5_select1';
import SelectPage2 from './n6_select2';
import RatingPage from './n8_rating';
import InputPage from './n9_input';
import SummaryPage from './n10_summary';

const NUM_PAGES = 9;

class ParentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      products: null,
      criteria: null,
      productsSelected: new Set(),
      criteriaSelected: new Set(),
      subcriteriaSelected: new Set(),
      ratings: null,
    }
  }

  getProductsAndSelected = (products, selected) => {
    this.setState(
      () => {
        return {
          products: products,
          productsSelected: selected,
        }
      }
    );
  }

  getCriteriaAndSelected = (criteria, selected) => {
    this.setState(
      () => {
        return {
          criteria: criteria,
          criteriaSelected: selected,
        };
      }
    );
  }

  getSubcriteriaSelected = (subcriteriaSelected) => {
    this.setState(
      () => {
        return {
          subcriteriaSelected: subcriteriaSelected,
        };
      }
    );
  }

  getRatings = (ratings) => {
    this.setState(
      () => {
        return {
          ratings: ratings,
        };
      }
    );
  }

  onPageTurn = (type) => {
    return (event) => {
      let currentPage = this.state.currentPage;
      if (type == "prev") currentPage = Math.max(1, currentPage - 1);
      if (type == "next") currentPage = Math.min(NUM_PAGES, currentPage + 1);
      if (typeof(type) == 'number') {
        currentPage = type;
        currentPage = Math.max(1, currentPage);
        currentPage = Math.min(NUM_PAGES, currentPage);
      }
      this.setState(
        () => {
          return {
            currentPage: currentPage,
          }
        },
      );
    }
  }

  render() {

    const actionStyle = {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '10px',
    };

    const pages = [];
    pages.push(<WelcomePage key="page1" current={this.state.currentPage} number="1" />);
    pages.push(<BrokenPage  key="page2" current={this.state.currentPage} number="2" />);
    pages.push(<SurveyPage  key="page3" current={this.state.currentPage} number="3" />);
    pages.push(<GalleryPage key="page4" current={this.state.currentPage} number="4" cb={this.getProductsAndSelected} />);
    pages.push(<SelectPage1 key="page5" current={this.state.currentPage} number="5" cb={this.getCriteriaAndSelected} />);

    pages.push(<SelectPage2 key="page6" current={this.state.currentPage} number="6"
      criteria={this.state.criteria}
      criteriaSelected={this.state.criteriaSelected}
      cb={this.getSubcriteriaSelected} />);

    pages.push(<RatingPage key="page7" current={this.state.currentPage} number="7"
      criteria={this.state.criteria}
      criteriaSelected={this.state.criteriaSelected}
      subcriteriaSelected={this.state.subcriteriaSelected}
      cb={this.getRatings} />);

    pages.push(<InputPage key="page8" current={this.state.currentPage} number="8" />);

    pages.push(<SummaryPage key="page9" current={this.state.currentPage} number="9"
      productsSelected={this.state.productsSelected}
      subcriteriaSelected={this.state.subcriteriaSelected}
      ratings={this.state.ratings} />);

    const globalDebugInfoStyle = {
      position: 'fixed',
      maxWidth: '300px',
      top: '40px',
      right: '40px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '10px',
      display: 'block',
    };

    return (
      <div className='p-4'>
        {pages}
        <PageTurn handler={this.onPageTurn} current={this.state.currentPage} total={NUM_PAGES} />
        <div style={{display: 'block', height: '150px'}}></div>

        <div className="debug-info" style={globalDebugInfoStyle}>
          <h2>Global Debug Info</h2>
          <p><strong>products:</strong> {this.state.products && this.state.products.results.length}</p>
          <p><strong>productsSelected:</strong> {this.state.productsSelected && Array.from(this.state.productsSelected).join(', ')}</p>
          <p><strong>criteria:</strong> {this.state.criteria && this.state.criteria.children.length}</p>
          <p><strong>criteriaSelected:</strong> {this.state.criteriaSelected && Array.from(this.state.criteriaSelected).join(', ')}</p>
          <p><strong>subcriteriaSelected:</strong> {this.state.subcriteriaSelected && Array.from(this.state.subcriteriaSelected).join(', ')}</p>
          <p><strong>ratings:</strong> {
            this.state.ratings &&
            Object.keys(this.state.ratings)
            .map((key) => `(${key}, ${this.state.ratings[key]})`)
            .join(', ')
          }</p>
        </div>
      </div>
    );
  }
}

export default ParentPage;

