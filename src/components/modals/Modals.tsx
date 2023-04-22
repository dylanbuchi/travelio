"use client";

import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { RentModal } from "./RentModal";
import { SearchModal } from "./SearchModal";

const Modals = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
    </>
  );
};

export default Modals;
