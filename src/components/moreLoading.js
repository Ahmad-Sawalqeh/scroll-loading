import React from "react";
import '../style.css';

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 7;

const types = {
  start: "START",
  loaded: "LOADED"
};

const reducer = (state, action) => {
  const { type, newData } = action;
  switch (type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...newData],
        more: newData.length === perPage,
        after: state.after + newData.length
      };
    default:
      throw new Error("Don't understand action");
  }
};

function MoreLoading() {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0
  });

  const { loading, data, after, more } = state;

  const buttonHandler = () => {
    dispatch({ type: types.start });

    setTimeout(() => {
      const newData = allData.slice(after, after + perPage);
      dispatch({ type: types.loaded, newData });
    }, 1000);
  }
  
  return (
    <div className="moreLoad">
      <ul>
        {data.map(row => (
          <li key={row} className='bg-orange'>
            {row}
          </li>
        ))}

        {loading && <li>Loading...</li>}

        {!loading && more && (
          <li className='bg-green'>
            <button
              onClick={buttonHandler}
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default MoreLoading;