import React, { useState, useEffect } from 'react';
import Gallery from '../panels/gallery';
import useFetch from '../hooks/useFetch';

const GalleryPage = (props) => {
  const { current, number, cb } = props;
  const style = { display: current == number ? 'block' : 'none' };

  const url = 'http://127.0.0.1:8000/todo/product/';
  const { data: products, isLoading, error } = useFetch(url);

  const [selected, setSelected] = useState(new Set());

  const onSelect = (product) => {
    return (e) => {
      e.preventDefault();
      const newSelected = new Set(selected);
      console.log("newSelect");
      console.log(newSelected);
      if (newSelected.has(product.id))
        newSelected.delete(product.id);
      else newSelected.add(product.id);
      setSelected(newSelected);
    }
  };

  // setSelected is asynchronous.
  useEffect(() => {
    console.log(selected);
    cb(products, selected);
  }, [selected]);

  return (
    <div className="gallery-page" style={style}>
      <h2>Available Smart Phones</h2>
      <p>
        With the following phones available on the market, you want to find the most suitable one for you.
        Please <strong>select 5 to 10 phones</strong> that you are most interested in, then click next to start the purchase decision process.
      </p>

      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {
        products && <Gallery products={products.results} selected={selected} cb={onSelect} />
      }

      <div className="debug-info">
        <h2>Debug Info</h2>
        <p>
          selected:
          {Array.from(selected).join(', ')}
        </p>
      </div>
    </div>
  );
}

export default GalleryPage;
