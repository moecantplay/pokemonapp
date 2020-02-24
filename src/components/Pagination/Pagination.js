import React from "react";
import "./Pagination.scss";

const Pagination = ({ prevFunc, nextFunc, disablePrev, disableNext }) => {
  return (
    <div className="pokemon__pagination">
      <button
        type="button"
        className="button button-prev"
        disabled={disablePrev}
        onClick={() => prevFunc()}
      >
        Prev
      </button>
      <button
        type="button"
        className="button button-next"
        disabled={disableNext}
        onClick={() => nextFunc()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
