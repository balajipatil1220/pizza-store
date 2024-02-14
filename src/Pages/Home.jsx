import { useState, lazy, Suspense } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductLists from "../components/ProjuctLists";
import { Layout } from "../components/layout";

const Cart = lazy(() => import("../components/Cart"));

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar setShowCart={() => setShowCart(!showCart)} />
      <Layout>
        <ProductLists />
      </Layout>
      <Suspense fallback={<div>Loading...</div>}>
        {showCart && (
          <Cart
            showCart={showCart}
            setShowCart={() => setShowCart(!showCart)}
          />
        )}
      </Suspense>
      <Footer />
    </>
  );
}
