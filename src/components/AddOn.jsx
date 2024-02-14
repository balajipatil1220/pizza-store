import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { useState, Suspense, lazy } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Model = lazy(() => import("./Model"));

export default function AddOn({ product, closeModel, setCloseModel }) {
  const [Slectedsize, setSlectedsize] = useState([]);
  const [Slectedtoppings, setSlectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (Slectedsize.length === 0 || Slectedtoppings.length === 0) {
      alert("Slect some addons");
      return;
    }
    dispatch(
      addToCart({
        product: {
          id: product.id,
          name: product.name,
          img_url: product.img_url,
          isVeg: product.isVeg,
          rating: product.rating,
          price: product.price,
        },
        quantity,
        size: [...Slectedsize],
        toppings: [...Slectedtoppings],
      })
    );
    setCloseModel(!closeModel);
  };

  function handleChangeTopping(event) {
    const topping = event.target.value;
    const isChecked = event.target.checked;
    console.log(topping, isChecked);

    if (isChecked) {
      setSlectedToppings([...Slectedtoppings, topping]);
    } else {
      setSlectedToppings(
        Slectedtoppings.filter((toppingName) => toppingName !== topping)
      );
    }
  }

  function handleChangeSize(event) {
    const size = event.target.value;
    console.log(size);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSlectedsize([...Slectedsize, size]);
    } else {
      setSlectedToppings(Slectedsize.filter((sizeName) => sizeName !== size));
    }
  }

  return (
    <>
      {closeModel && (
        <Suspense fallback={<div>Loading...</div>}>
          <Model CloseModel={() => setCloseModel(!closeModel)}>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 px-4 bg-white">
              <div className="col-span-full ">
                <label htmlFor="size" className="text-base text-black">
                  {product.size[0].title}
                </label>
                <div className="mt-2">
                  {Slectedsize.map((value) => {
                    return (
                      <span
                        key={value}
                        className="px-2 py-1 bg-gray-600 text-gray-100 rounded-md"
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
                <ul>
                  {product.size[0].items.map((item, i) => {
                    return (
                      <>
                        <li key={item.size}>
                          <label className="text-black">
                            {product.size[0].isRadio ? (
                              <input
                                type="radio"
                                name="size"
                                value={item.size}
                                checked={Slectedsize.includes(item.size)}
                                onChange={(e) =>
                                  setSlectedsize([e.target.value])
                                }
                              />
                            ) : (
                              <input
                                type="checkbox"
                                name="size"
                                checked={Slectedsize.includes(item.size)}
                                value={item.size}
                                onChange={handleChangeSize}
                              />
                            )}
                            {item.size}
                          </label>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className="col-span-full ">
                <label htmlFor="email" className="text-base text-black">
                  {product.toppings[0].title}
                </label>
                <div className="mt-2 flex items-center space-y-1 flex-wrap">
                  {Slectedtoppings.map((value) => {
                    return (
                      <span
                        key={value}
                        className="px-2 py-1 bg-gray-600 text-gray-100 mr-1  mt-1 rounded-md"
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
                <ul>
                  {product.toppings[0].items.map((item) => {
                    return (
                      <>
                        <li key={item.name}>
                          <label className="text-black">
                            {product.toppings[0].isRadio ? (
                              <input
                                type="radio"
                                value={item.name}
                                checked={Slectedtoppings.includes(item.name)}
                                onChange={handleChangeTopping}
                              />
                            ) : (
                              <input
                                type="checkbox"
                                value={item.name}
                                checked={Slectedtoppings.includes(item.name)}
                                onChange={handleChangeTopping}
                              />
                            )}
                            {item.name}
                          </label>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <span className="p-2 text-black text-xs w-full">
                Total Price :{quantity * product.price}
              </span>
              <div className="flex items-center w-full">
                <button className="m-3 p-3 bg-slate-100">
                  <AiOutlinePlus
                    fill="black"
                    stroke="black"
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </button>
                <span className="text-black">{quantity}</span>
                <button className="m-3 p-3 bg-slate-100">
                  <AiOutlineMinus
                    fill="black"
                    stroke="black"
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity - 1);
                    }}
                  />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="col-span-full px-8 py-1 w-full text-center bg-gray-600 text-white rounded-md hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-80"
              >
                Add To Cart
              </button>
            </div>
          </Model>
        </Suspense>
      )}
    </>
  );
}
