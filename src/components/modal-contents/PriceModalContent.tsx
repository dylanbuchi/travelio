import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../inputs/Input";
import { ModalContentLayout } from "./ModalContentLayout";
import { listingStore } from "@/store/listing.store";

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
  const { listing } = listingStore();
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
        value={listing?.price?.toString() ?? "1"}
      />
    </ModalContentLayout>
  );
};
