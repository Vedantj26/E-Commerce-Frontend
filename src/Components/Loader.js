import { ThreeCircles } from "react-loader-spinner";

import React from "react";

export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 400 }}
    >
      <ThreeCircles
        height="100"
        width="100"
        color="#000000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
