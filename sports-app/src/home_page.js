// src/Squares.js
import React from 'react';

const Squares = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-6">
          <div className="large-square">Large Square 1</div>
          <div className="small-square"></div>
          <div className="small-square"></div>
          <div className="small-square"></div>
        </div>
        <div className="col-6">
          <div className="large-square">Large Square 2</div>
          <div className="small-square"></div>
          <div className="small-square"></div>
          <div className="small-square"></div>
        </div>
      </div>
    </div>
  );
};

export default Squares;
