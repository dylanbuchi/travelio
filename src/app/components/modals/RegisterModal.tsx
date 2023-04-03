"use client";

import axios from "axios";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import { Modal } from "./Modal";
import { Header } from "../Header";
import { APP_NAME } from "@/app/constants/app.constants";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";

export const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();

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
      .then(() => registerModal.onClose())
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
      <span className="text-center">or</span>
      <div className="mt-1 flex flex-col gap-4 text-neutral-500">
        <Button
          outline
          icon={FcGoogle}
          label="Continue with Google"
          onClick={() => {}}
        />
      </div>
      <div className="mt-1 flex flex-col gap-4 text-neutral-500">
        <Button
          outline
          icon={AiFillGithub}
          label="Continue with GitHub"
          onClick={() => {}}
        />
      </div>
      <div className="mt-2 flex items-center justify-center text-xs text-neutral-500">
        <footer>
          {"Already have an account? "}
          <span className="cursor-pointer text-neutral-600 underline-offset-2 hover:text-black hover:underline">
            Log in
          </span>
        </footer>
      </div>
    </>
  );

  return (
    <Modal
      title="Log in or sign up"
      actionLabel="Submit"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      isDisabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      content={<Content />}
      footer={<Footer />}
    />
  );
};
