import { ModalContentLayout } from "./ModalContentLayout";
import { Input } from "../inputs/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { listingStore } from "@/store/listing.store";

interface DescriptionModalContentProps {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const DescriptionModalContent = ({
  isLoading,
  errors,

  register,
}: DescriptionModalContentProps) => {
  const { listing } = listingStore();

  const headerTitle = "What makes your place special?";
  const headerSubtitle = `Write a title and a short description that highlight the best features and benefits of your place.\n
  For example:\n🌲 Cozy cabin in the woods with a fireplace 🔥\n🌊 Modern apartment near the beach with a balcony 🌇`;

  return (
    <ModalContentLayout title={headerTitle} subtitle={headerSubtitle}>
      <Input
        id="title"
        label="Title"
        isDisabled={isLoading}
        register={register}
        errors={errors}
        isRequired
        value={listing?.title}
      />

      <Input
        id="description"
        label="Description"
        isDisabled={isLoading}
        register={register}
        errors={errors}
        isRequired
        value={listing?.description}
      />
    </ModalContentLayout>
  );
};
