"use client";

import axios from "axios";

import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { APP_NAME } from "@/app/constants/app.constants";
import { rentModalStore } from "@/app/store/modal.store";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Country } from "@/app/hooks/useCountries";
import { CategoryModalContent } from "../modal-contents/CategoryModalContent";
import { LocationModalContent } from "../modal-contents/LocationModalContent";
import { InfoModalContent } from "../modal-contents/InfoModalContent";
import { CounterProps } from "../Counter";
import { ImageUploaderModalContent } from "../modal-contents/ImageUploaderModalContent";
import { DescriptionModalContent } from "../modal-contents/DescriptionModalContent";
import { PriceModalContent } from "../modal-contents/PriceModalContent";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Listing } from "@prisma/client";

const enum RentModalPages {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE_UPLOADER = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const { isOpen, closeModal } = rentModalStore();

  const [page, setPage] = useState(RentModalPages.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function moveToPage(direction: "next" | "back") {
    setPage((prev) =>
      direction === "next" ? Math.min(prev + 1, 5) : Math.max(prev - 1, 0)
    );
  }

  const actionLabel = useMemo(() => {
    return page === RentModalPages.PRICE ? "Create" : "Next";
  }, [page]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      image: "",
      title: "",
      description: "",
    },
  });

  const category: string = watch("category");
  const location: Country = watch("location");

  const guestCount: number = watch("guestCount");
  const roomCount: number = watch("roomCount");
  const bathroomCount: number = watch("bathroomCount");

  const image: string = watch("image");

  const counterData: CounterProps[] = [
    {
      title: "Guests",
      subtitle: "How many guests do you allow?",
      value: guestCount,
      onChange: (value: number) => setCustomValue("guestCount", value),
    },
    {
      title: "Rooms",
      subtitle: "How many rooms do you have?",
      value: roomCount,
      onChange: (value: number) => setCustomValue("roomCount", value),
    },
    {
      title: "Bathrooms",
      subtitle: "How many bathrooms do you have?",
      value: bathroomCount,
      onChange: (value: number) => setCustomValue("bathroomCount", value),
    },
  ];

  function setCustomValue(id: string, value: unknown) {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (page !== RentModalPages.PRICE) return moveToPage("next");
    setIsLoading(true);

    const dataToSend: Partial<Listing> = {
      ...data,
      price: parseInt(data.price),
      location: data?.location?.value,
    };

    axios
      .post("/api/listings", dataToSend)
      .then(() => {
        toast.success("Listing created with success!");
        setPage(RentModalPages.CATEGORY);
        router.refresh();
        closeModal();
        reset();
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  const secondaryActionLabel = useMemo(() => {
    return page === RentModalPages.CATEGORY ? "" : "Back";
  }, [page]);

  const getContent = () => {
    switch (page) {
      case RentModalPages.CATEGORY:
        return (
          <CategoryModalContent
            category={category}
            onClick={(value) => setCustomValue("category", value)}
          />
        );

      case RentModalPages.LOCATION:
        return (
          <LocationModalContent
            showMap
            location={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        );

      case RentModalPages.INFO:
        return <InfoModalContent counterData={counterData} />;

      case RentModalPages.IMAGE_UPLOADER:
        return (
          <ImageUploaderModalContent
            image={image}
            onChange={(value) => setCustomValue("image", value)}
          />
        );

      case RentModalPages.DESCRIPTION:
        return (
          <DescriptionModalContent
            isLoading={isLoading}
            errors={errors}
            register={register}
          />
        );
      case RentModalPages.PRICE:
        return (
          <PriceModalContent
            errors={errors}
            isLoading={isLoading}
            register={register}
          />
        );
      default:
        return <></>;
    }
  };

  const ModalContent = () => getContent();

  return (
    <Modal
      showDivider
      dividerText={(page + 1).toString()}
      content={<ModalContent />}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        page === RentModalPages.CATEGORY ? undefined : () => moveToPage("back")
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={closeModal}
      isOpen={isOpen}
      title={`${APP_NAME} your home`}
    />
  );
};
