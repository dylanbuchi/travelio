"use client";

import axios from "axios";

import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { APP_NAME } from "@/constants/app.constants";
import { rentModalStore } from "@/store/modal.store";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Country, useCountries } from "@/hooks/useCountries";
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
import { SerializedListing } from "@/models/listing.model";
import { listingStore } from "@/store/listing.store";

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

  const { requestMethod, setRequestMethod, setListing, listing } =
    listingStore();

  const [page, setPage] = useState(RentModalPages.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function moveToPage(direction: "next" | "back") {
    setPage((prev) =>
      direction === "next" ? Math.min(prev + 1, 5) : Math.max(prev - 1, 0)
    );
  }

  const actionLabel = useMemo(() => {
    return page === RentModalPages.PRICE
      ? requestMethod === "PATCH"
        ? "Update"
        : "Create"
      : "Next";
  }, [page, requestMethod]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const { getCountryByValue } = useCountries();

  const category: string = watch("category", listing?.category ?? "");
  const location: Country = watch(
    "location",
    getCountryByValue(listing?.location ?? null)
  );

  const guestCount: number = watch("guestCount", listing?.guestCount ?? 1);
  const roomCount: number = watch("roomCount", listing?.roomCount ?? 1);

  const bathroomCount: number = watch(
    "bathroomCount",
    listing?.bathroomCount ?? 1
  );

  const image: string = watch("image", listing?.image ?? "");

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

  function resetAll() {
    setIsLoading(false);
    setRequestMethod(undefined);
    setListing({} as SerializedListing);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (page !== RentModalPages.PRICE) return moveToPage("next");
    setIsLoading(true);

    const dataToSend: Partial<Listing> = {
      image: "",
      bathroomCount: 1,
      roomCount: 1,
      guestCount: 1,
      category: "",
      ...data,
      price: parseInt(data.price),
      location: data?.location?.value ?? "",
    };

    const listingsBaseUrl = `/api/listings`;

    if (requestMethod === "PATCH") {
      if (!listing?.id) return;

      const currentData: Partial<Listing> = { ...dataToSend };

      const updatedData: any = {};

      let key: keyof Listing;

      for (key in currentData) {
        if (currentData[key] === "" || currentData[key] == undefined) {
          if (listing.hasOwnProperty(key)) {
            updatedData[key] = listing[key];
          }
        } else {
          updatedData[key] = currentData[key];
        }
      }

      axios
        .patch(`${listingsBaseUrl}/${listing.id}`, {
          ...updatedData,
        })
        .then(() => {
          setPage(RentModalPages.CATEGORY);
          router.refresh();
          closeModal();
          reset();
        })
        .catch((error) => {
          toast.error(error.message);
          closeModal();
        })
        .finally(() => {
          resetAll();
        });
    } else {
      axios
        .post(listingsBaseUrl, dataToSend)
        .then(() => {
          setPage(RentModalPages.CATEGORY);
          router.refresh();
          closeModal();
          reset();
        })
        .catch((error) => toast.error(error.message))
        .finally(() => {
          resetAll();
        });
    }
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
      dividerText={(page + 1)?.toString()}
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
