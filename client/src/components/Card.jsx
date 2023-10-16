import React from "react";

function Card(props) {
  return (
    <>
      <div className="w-screen bg-[#570DF8] h-20 flex justify-center items-center shadow-lg">
        <div className=" ">
          <p className="text-white px-3 py-2 text-2xl font-bold font-inter">
            {props.title}
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="card w-full">
          <div className="card-body">
            <hr></hr>
            {props.children}
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
