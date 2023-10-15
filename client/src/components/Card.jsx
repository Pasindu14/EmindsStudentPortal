import React from "react";

function Card(props) {
  return (
    <>
      <div className="card w-full bg-base-100 shadow-inner border-2 mt-8">
        <div className="card-body">
          <h2 className="card-title text-4xl">{props.title}</h2>
          <hr></hr>
          {props.children}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}

export default Card;
