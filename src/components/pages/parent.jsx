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
    }
  }

  getProductsAndSelected = (products, selected) => {
    this.setState(
      () => {
        console.log("cb getProductsAndSelected");
        console.log(products);
        console.log(selected);
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
        console.log("cb getCriteriaAndSelected");
        console.log(criteria);
        console.log(selected);
        return {
          criteria: criteria,
          criteriaSelected: selected,
        }
      }
    );
  }

  onPageTurn = (type) => {
    return (event) => {
      let currentPage = this.state.currentPage;
      if (type == "prev") currentPage = Math.max(1, currentPage - 1);
      if (type == "next") currentPage = Math.min(7, currentPage + 1);
      if (typeof(type) == 'number') {
        currentPage = type;
        currentPage = Math.max(1, currentPage);
        currentPage = Math.min(7, currentPage);
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
      criteriaSelected={this.state.criteriaSelected} />);

    pages.push(<RatingPage key="page7" current={this.state.currentPage} number="7"
      criteria={this.state.criteria}
      criteriaSelected={this.state.criteriaSelected}
      subcriteriaSelected={this.state.subcriteriaSelected} />);

    const globalDebugInfoStyle = {
      position: 'fixed',
      bottom: '40px',
      left: '40px',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '10px',
      display: 'none',
    };

    return (
      <div className='p-4'>
        {pages}
        <PageTurn handler={this.onPageTurn} current={this.state.currentPage} total={7} />
        <div style={{display: 'block', height: '150px'}}></div>

        <div className="debug-info" style={globalDebugInfoStyle}>
          <h2>Global Debug Info</h2>
          <p>products: {this.state.products && this.state.products.results.length}</p>
          <p>productsSelected: {this.state.productsSelected && Array.from(this.state.productsSelected).join(', ')}</p>
          <p>criteria: {this.state.criteria && this.state.criteria.children.length}</p>
          <p>criteriaSelected: {this.state.criteriaSelected && Array.from(this.state.criteriaSelected).join(', ')}</p>
        </div>
      </div>
    );
  }
}

export default ParentPage;

