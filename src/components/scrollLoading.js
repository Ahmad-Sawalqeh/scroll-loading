import React, { useEffect } from "react";
import '../style.css';

const types = {
  start: "START",
  loaded: "LOADED",
  error: "ERROR"
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.start:
      return { ...state, loading: true };
    case types.loaded:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...payload]
      };
    case types.error:
      return payload;
    default:
      return state;
  }
};

function ScrollLoading() {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    data: []
  });

  const { loading, data, page } = state;

  useEffect(() => {
    dispatch({ type: types.start });
    fetchData();
  }, [])

  function fetchData(pageNumber = page){
      fetch(`https://randomuser.me/api/?page=${pageNumber}&results=7`)
        .then(res => res.json())
        .then(result => {
          dispatch({ type: types.loaded, payload: result.results })
        })
        .catch(err => {
          dispatch({ type: types.error, payload: err.statusText })
        })
  }

  function handleMore(e){
    let botton = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 50
    if(botton){
      let pageNumber = page + 1;
      dispatch({ type: types.start });
      setTimeout(() => {
        fetchData(pageNumber);
      }, 1000);
    }
  }
  
  return (
    <div className="table-wrap" onScroll={handleMore}>
        <table className="table text-center">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
              { 
                data.map(item => {
                  return (
                    <tr>
                        <td><img src={ item.picture.thumbnail } alt='not available' /></td>
                        <td>{ item.name.first }</td>
                        <td>{ item.gender }</td>
                        <td>{ item.location.street.name }</td>
                    </tr>  
                  )
                })
              }              
              { 
                loading && 
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
              }
            </tbody>
        </table>
    </div>
  );
}

export default ScrollLoading;