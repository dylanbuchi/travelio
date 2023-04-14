"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../inputs/Input";
import { ModalContentLayout } from "./ModalContentLayout";

interface PriceModalContentProps {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}
export const PriceModalContent = ({
  isLoading,
  register,
  errors,
}: PriceModalContentProps) => {
  return (
    <ModalContentLayout
      title="Set your price"
      subtitle="How much do you charge per night?"
    >
      <Input
        showDollarIcon
        id="price"
        label="Price"
        type="number"
        isDisabled={isLoading}
        errors={errors}
        register={register}
        isRequired
      />
    </ModalContentLayout>
  );
};
