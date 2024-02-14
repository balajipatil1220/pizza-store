import React, { Suspense, lazy, useState } from "react";
import { Rating } from "./Ratings";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/features/cartSlice";

const AddOn = lazy(() => import("./AddOn"));

export default function Product({ product }) {
  const [closeModel, setCloseModel] = useState(false);

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <NavLink
          to={`${product.id}`}
          className="block relative h-48 rounded overflow-hidden p-1"
        >
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={product.img_url}
          />
        </NavLink>
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.name}{" "}
          </h2>

          {
            <div className="flex mb-4 justify-between items-center">
              <span className="text-xs">
                {product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              </span>
              {<Rating rating={product.rating} />}
            </div>
          }
          <div className="flex items-center">
            <span className="mt-1">${product.price}</span>
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
                className="flex ml-auto bg-gray-200 border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded text-base "
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => setCloseModel(!closeModel)}
                className="flex ml-auto bg-gray-200 border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded text-base "
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
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
