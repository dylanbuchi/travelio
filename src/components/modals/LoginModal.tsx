"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { Header } from "../Header";
import { APP_NAME } from "@/constants/app.constants";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SocialButtons } from "../buttons/SocialButtons";
import { loginModalStore } from "@/store/modal.store";
import { Divider } from "../Divider";

export const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { isOpen, closeModal } = loginModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false })
      .then((response) => {
        setIsLoading(false);
        if (response?.ok) {
          toast.success(`Logged in`);

          closeModal();
          router.refresh();
        }
        if (response?.error) {
          toast.error(response.error);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const Content = () => (
    <div className="flex flex-col gap-4">
      <Header
        title={`Welcome back to ${APP_NAME}`}
        subTitle="Log in to your account"
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
      title="Log in"
      actionLabel="Log in"
      isOpen={isOpen}
      onClose={closeModal}
      isDisabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      content={<Content />}
      footer={<Footer />}
    />
  );
};
