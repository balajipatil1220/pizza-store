const Model = ({ CloseModel, children }) => {
  return (
    <div className="popup-overlay z-40 px-3">
      <div className="popup-container bg-light-navy p-4 mt-10 md:mt-10">
        <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white text-gray-100">
          <button onClick={CloseModel} className="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="flex-shrink-0 w-6 h-6 fill-black stroke-black"
            >
              <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
