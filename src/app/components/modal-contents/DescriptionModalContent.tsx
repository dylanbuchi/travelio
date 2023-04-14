"use client";

import React from "react";
import { ModalContentLayout } from "./ModalContentLayout";
import { Input } from "../inputs/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
  const title = "What makes your place special?";
  const subtitle = `Write a title and a short description that highlight the best features and benefits of your place.\n
  For example:\n🌲 Cozy cabin in the woods with a fireplace 🔥\n🌊 Modern apartment near the beach with a balcony 🌇`;

  return (
    <ModalContentLayout title={title} subtitle={subtitle}>
      <Input
        id="title"
        label="Title"
        isDisabled={isLoading}
        register={register}
        errors={errors}
        isRequired
      />

      <Input
        id="description"
        label="Description"
        isDisabled={isLoading}
        register={register}
        errors={errors}
        isRequired
      />
    </ModalContentLayout>
  );
};
