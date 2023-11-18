import React from "react";
import RegTable from "../panels/RegTable";
import { Alert } from "react-bootstrap";

const ProductsPage = (props) => {
  const { current, number } = props;
  const display = { display: current == number ? "block" : "none" };

  const { products, productsSelected } = props;

  const names = ["brand", "model", "system", "ram", "rom", "price"];

  if (products === null || productsSelected.size == 0)
    return (
      <section className="products-page" style={display}>
        <h2>Product Table</h2>
        <Alert variant="warning">You haven't selected any product.</Alert>
      </section>
    );

  const filtered = products['results'].filter((prod) => {
    return productsSelected.has(prod.id);
  });

  return (
    <section className="products-page" style={display}>
      <h2>Product Table</h2>
      <RegTable dataFrame={filtered} names={names} />
    </section>
  );
};

export default ProductsPage;
