import React, { useEffect } from "react";
import Product from "./Product";
import { useSelector } from "react-redux";

export default function ProductLists() {
  const { isLoading, iserror, error, filteredProducts } = useSelector(
    (state) => state.products
  );

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap m-4">
            {isLoading
              ? "loading....."
              : iserror
              ? `${error}`
              : filteredProducts.map((product) => {
                  return <Product key={product.id} product={product} />;
                })}
          </div>
        </div>
      </section>
    </>
  );
}
