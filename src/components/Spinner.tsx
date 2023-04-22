"use client";

import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <ClipLoader color="teal" size={120} />
    </div>
  );
};

export default Spinner;
