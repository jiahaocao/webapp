import React, { useState } from "react";
import PageTurn from "../widgets/PageTurn";

import WelcomePage from "./n1_welcome";
import BrokenPage from "./n2_broken";
import SurveyPage from "./n3_survey";
import GalleryPage from "./n4_gallery";
import SelectPage1 from "./n5_select1";
import SelectPage2 from "./n6_select2";
import RatingPage from "./n8_rating";
import InputPage from "./n9_input";
import SummaryPage from "./n10_summary";
import ProductsPage from "./n11_products";
import GoaltreePage from "./n7_goeltree";

const NUM_PAGES = 11;

const ParentPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(null);
  const [criteria, setCriteria] = useState(null);
  const [productsSelected, setProductsSelected] = useState(new Set());
  const [criteriaSelected, setCriteriaSelected] = useState(new Set());
  const [subcriteriaSelected, setSubcriteriaSelected] = useState(new Set());
  const [ratings, setRatings] = useState(null);
  const [survey, setSurvey] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [scores, setScores] = useState(null);

  const getProductsAndSelected = (products, selected) => {
    setProducts(products);
    setProductsSelected(selected);
  };

  const getCriteriaAndSelected = (criteria, selected) => {
    setCriteria(criteria);
    setCriteriaSelected(selected);
  };

  const onPageTurn = (type) => {
    return (e) => {
      let newPage = currentPage;
      if (type === "prev") newPage = Math.max(1, currentPage - 1);
      if (type === "next") newPage = Math.min(NUM_PAGES, currentPage + 1);
      if (typeof type === "number") {
        newPage = type;
        newPage = Math.max(1, newPage);
        newPage = Math.min(NUM_PAGES, newPage);
      }
      setCurrentPage(newPage);
    };
  };

  const pages = [];
  pages.push(<WelcomePage key="page1" current={currentPage} number="1" />);

  pages.push(<BrokenPage key="page2" current={currentPage} number="2" />);

  pages.push(
    <SurveyPage key="page3" current={currentPage} number="3" cb={setSurvey} />
  );

  pages.push(
    <GalleryPage
      key="page4"
      current={currentPage}
      number="4"
      cb={getProductsAndSelected}
    />
  );

  pages.push(
    <SelectPage1
      key="page5"
      current={currentPage}
      number="5"
      cb={getCriteriaAndSelected}
    />
  );

  pages.push(
    <SelectPage2
      key="page6"
      current={currentPage}
      number="6"
      criteria={criteria}
      criteriaSelected={criteriaSelected}
      cb={setSubcriteriaSelected}
    />
  );

  pages.push(
    <GoaltreePage
      key="page7"
      current={currentPage}
      number="7"
      criteria={criteria}
      subcriteriaSelected={subcriteriaSelected}
    />
  );

  pages.push(
    <RatingPage
      key="page8"
      current={currentPage}
      number="8"
      criteria={criteria}
      criteriaSelected={criteriaSelected}
      subcriteriaSelected={subcriteriaSelected}
      cb={setRatings}
    />
  );

  pages.push(
    <InputPage key="page9" current={currentPage} number="9" cb={setInputs} />
  );

  pages.push(
    <SummaryPage
      key="page10"
      current={currentPage}
      number="10"
      summary={{
        productsSelected: productsSelected,
        subcriteriaSelected: subcriteriaSelected,
        ratings: ratings,
        survey: survey,
        inputs: inputs,
      }}
      cb={setScores}
    />
  );

  pages.push(
    <ProductsPage
      key="page11"
      current={currentPage}
      number="11"
      products={products}
      productsSelected={productsSelected}
      scores={scores}
    />
  );

  const globalDebugInfoStyle = {
    position: "fixed",
    maxWidth: "300px",
    top: "40px",
    right: "40px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "10px",
    display: "none",
  };

  return (
    <div className="parent-page">
      {pages}
      <PageTurn
        handler={onPageTurn}
        current={currentPage}
        total={NUM_PAGES}
        titles={[
          "Welcome",
          "Broken",
          "Survey",
          "Gallery",
          "Select1",
          "Select2",
          "Goaltree",
          "Rating",
          "Input",
          "Summary",
          "Products",
        ]}
      />
      <div style={{ display: "block", height: "150px" }}></div>

      <div className="global-debug-info" style={globalDebugInfoStyle}>
        <h2>Global Debug Info</h2>
        <p>
          <strong>products:</strong> {products && products.results.length}
        </p>
        <p>
          <strong>productsSelected:</strong>{" "}
          {productsSelected && Array.from(productsSelected).join(", ")}
        </p>
        <p>
          <strong>criteria:</strong> {criteria && criteria.children.length}
        </p>
        <p>
          <strong>criteriaSelected:</strong>{" "}
          {criteriaSelected && Array.from(criteriaSelected).join(", ")}
        </p>
        <p>
          <strong>subcriteriaSelected:</strong>{" "}
          {subcriteriaSelected && Array.from(subcriteriaSelected).join(", ")}
        </p>
        <p>
          <strong>ratings:</strong>{" "}
          {ratings &&
            Object.keys(ratings)
              .map((key) => `(${key}, ${ratings[key]})`)
              .join(", ")}
        </p>

        <p>
          <strong>survey:</strong>{" "}
          {survey &&
            Object.keys(survey)
              .map((key) => survey[key])
              .join(", ")}
        </p>

        <p>
          <strong>inputs:</strong>{" "}
          {inputs &&
            Object.keys(inputs)
              .map((key) => inputs[key])
              .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ParentPage;
