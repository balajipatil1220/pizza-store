import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { filterByPrice, filterByRating } from "../redux/features/productSlice";

function FilterButtons() {
  const dispatch = useDispatch();

  function handlePriceSort(value) {
    dispatch(filterByPrice(value));
  }
  function handleRatingSort(value) {
    dispatch(filterByRating(value));
  }
  return (
    <>
      <div className="flex items-center py-3 pl-3 ">
        <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
          Sort by:
        </label>
        <Select
          isMulti={false}
          name="price"
          placeholder="price"
          onChange={(value) => {
            handlePriceSort(value?.value);
          }}
          isSearchable={false}
          isClearable={true}
          options={[
            { value: "lowest", label: "lowest" },
            { value: "highest", label: "highest" },
          ]}
          classNamePrefix="select"
          className="px-4 py-3 rounded-md basic-multi-select text-gray-900"
        />
      </div>
      <div className="flex items-center py-3 pl-3 ">
        <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
          Sort by:
        </label>
        <Select
          isMulti={false}
          name="rating"
          placeholder="rating"
          onChange={(value) => {
            handleRatingSort(value?.value);
          }}
          isSearchable={false}
          isClearable={true}
          options={[
            { value: "lowest", label: "lowest" },
            { value: "highest", label: "highest" },
          ]}
          classNamePrefix="select"
          className="px-4 py-3 rounded-md basic-multi-select text-gray-900"
        />
      </div>
    </>
  );
}

export default function Filter() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <p className="text-xl  font-bold text-gray-600 hidden lg:block">
        Sort for: <span className="text-gray-800 ">Pizza</span>
      </p>
      <div className="mt-5 overflow-x-auto lg:hidden">
        <div className="flex flex-nowrap gap-2">{<FilterButtons />}</div>
      </div>
      <div className="hidden gap-2 lg:flex lg:items-center lg:justify-end ">
        {<FilterButtons />}
        <button
          type="button"
          className="inline-flex items-center justify-center text-gray-800 border rounded-xl w-11 h-11"
        >
          <svg
            className="w-5 yc"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center text-gray-600 border rounded-xl w-11 h-11"
        >
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
