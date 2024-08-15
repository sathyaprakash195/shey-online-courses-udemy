import Spinner from "@/components/spinner";
import React from "react";

function LoadingState() {
  return (
    <div className="flex justify-center items-center mt-40">
      <Spinner />
    </div>
  );
}

export default LoadingState;
