import React, { Suspense, lazy, useState } from "react";
import { Rating } from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/features/cartSlice";

const AddOn = lazy(() => import("./AddOn"));

export default function Productpage({ product }) {
  const [closeModel, setCloseModel] = useState(false);

  const { items, subTotal, totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.img_url}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                {<Rating rating={product.rating} />}
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5">
                <span>
                  <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                    {product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  </button>
                </span>
              </div>
              <div className="flex mt-6 items-center pb-5">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                {items.some((i) => i.product.id === product.id) ? (
                  <button
                    onClick={() =>
                      dispatch(
                        removeItem(
                          items[
                            items.findIndex(
                              (item) => item.product.id === product.id
                            )
                          ]
                        )
                      )
                    }
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => setCloseModel(!closeModel)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <AddOn
          product={product}
          closeModel={closeModel}
          setCloseModel={setCloseModel}
        />
      </Suspense>
    </>
  );
}
