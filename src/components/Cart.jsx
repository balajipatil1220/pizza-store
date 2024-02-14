import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../redux/features/cartSlice";

function Button({ text }) {
  return (
    <button className="bg-gray-500 px-2 py-1 text-white  mr-1 text-xs md:text-sm rounded-md ">
      {text}
    </button>
  );
}

const Cart = ({ setShowCart, showCart }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={setShowCart}
        className={`overlay ${showCart && "active"} `}
      ></div>
      <div className="sidebar fixed top-0 bottom-0 right-0 p-2 w-screen md:w-auto overflow-y-auto bg-white shadow-lg ease-in duration-1000 z-20">
        <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 ">
          <div className="p-2.5 mt-1 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-[15px] ml-3">
              <span className="font-mono text-xl text-center font-semibold md:text-3xl">
                Your Cart
              </span>
            </h3>
            <button onClick={setShowCart} className="ml-28">
              <AiOutlineClose />
            </button>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
          <ul className="flex flex-col divide-y divide-gray-700">
            {cart.items.map((productItem) => {
              return (
                <li className="flex flex-col py-6 sm:flex-row sm:justify-center flex-wrap">
                  <div className="flex w-full space-x-2 sm:space-x-4">
                    <img
                      className="flex-shrink-0 object-cover w-20 h-20  rounded outline-none sm:w-52 sm:h-52"
                      src={`${productItem.product.img_url}`}
                      alt={productItem.product.name}
                    />
                    <div className="flex flex-col justify-between w-full pb-4">
                      <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {productItem.product.name}
                          </h3>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            ${productItem.product.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col mt-4 mb-5">
                        <div className="flex justify-between">
                          <span className="mr-3">Size</span>
                          {productItem.size.map((s) => {
                            return <Button text={`${s}`} />;
                          })}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="mr-3">toppings</span>
                          {productItem.toppings.map((t) => {
                            return <Button text={`${t}`} />;
                          })}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="m-3">
                          <button className="m-3 p-3 bg-slate-100">
                            <AiOutlinePlus
                              onClick={() =>
                                dispatch(
                                  increaseQuantity({
                                    productId: productItem.product.id,
                                  })
                                )
                              }
                            />
                          </button>
                          <span>{productItem.quantity}</span>
                          <button className="m-3 p-3 bg-slate-100">
                            <AiOutlineMinus
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity({
                                    productId: productItem.product.id,
                                  })
                                )
                              }
                            />
                          </button>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(removeItem({ ...productItem }))
                            }
                            className="flex items-center px-2 py-1 pl-0 space-x-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-4 h-4 fill-current"
                            >
                              <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                              <rect
                                width="32"
                                height="200"
                                x="168"
                                y="216"
                              ></rect>
                              <rect
                                width="32"
                                height="200"
                                x="240"
                                y="216"
                              ></rect>
                              <rect
                                width="32"
                                height="200"
                                x="312"
                                y="216"
                              ></rect>
                              <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                            </svg>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="space-y-1 text-start">
            <p>
              Total amount:
              <span className="font-semibold">${cart.subTotal} </span>
            </p>
            <p className="text-sm">Not including taxes and shipping costs</p>
          </div>
          <div className="flex justify-start space-x-2">
            <button
              onClick={setShowCart}
              type="button"
              className="px-6 py-2 border bg-gray-200 text-black font-semibold hover:bg-opacity-70 rounded-md"
            >
              Back
              <span className="sr-only sm:not-sr-only">to shop</span>
            </button>
            <button
              type="button"
              className="px-6 py-2 border bg-gray-200 text-black font-semibold hover:bg-opacity-70 rounded-md"
            >
              <span className="sr-only sm:not-sr-only">Continue to</span>
              Checkout
            </button>
            <button
              type="button"
              className="px-6 py-2 border bg-gray-200 text-black font-semibold hover:bg-opacity-70 rounded-md"
            >
              <span className="">clearCart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
