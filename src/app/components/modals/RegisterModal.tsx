"use client";

import axios from "axios";
import { useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Header } from "../Header";
import { APP_NAME } from "@/app/constants/app.constants";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { SocialButtons } from "../buttons/SocialButtons";
import { registerModalStore } from "@/app/store/modal.store";
import { Divider } from "../Divider";

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, closeModal } = registerModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => closeModal())
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  const Content = () => (
    <div className="flex flex-col gap-4">
      <Header title={`Welcome to ${APP_NAME}`} subTitle="Create your account" />
      <Input
        id="name"
        label="Name"
        isDisabled={isLoading}
        errors={errors}
        register={register}
        isRequired
      />
      <Input
        id="email"
        label="Email"
        isDisabled={isLoading}
        errors={errors}
        register={register}
        isRequired
      />
      <Input
        id="password"
        type="password"
        label="Password"
        isDisabled={isLoading}
        errors={errors}
        register={register}
        isRequired
      />
    </div>
  );

  const Footer = () => (
    <>
      <Divider text="or" />
      <SocialButtons />
    </>
  );

  return (
    <Modal
      title="Log in or sign up"
      actionLabel="Submit"
      isOpen={isOpen}
      onClose={closeModal}
      isDisabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      content={<Content />}
      footer={<Footer />}
    />
  );
};
