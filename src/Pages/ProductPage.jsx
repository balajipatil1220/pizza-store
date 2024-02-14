import React, { Suspense, lazy, useState } from "react";
import Productpage from "../components/Productpage";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Cart = lazy(() => import("../components/Cart"));

function ProductPage() {
  const [showCart, setShowCart] = useState(false);

  const { id } = useParams();

  const { isLoading, iserror, error, products } = useSelector(
    (state) => state.products
  );

  return (
    <>
      <Navbar setShowCart={() => setShowCart(!showCart)} />
      {isLoading ? (
        "loading ...."
      ) : iserror ? (
        `${error}`
      ) : (
        <Productpage product={products.filter((value) => value.id == id)[0]} />
      )}
      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        {showCart && (
          <Cart
            showCart={showCart}
            setShowCart={() => setShowCart(!showCart)}
          />
        )}
      </Suspense>
    </>
  );
}

export default ProductPage;
