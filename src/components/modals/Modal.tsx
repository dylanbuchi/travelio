"use client";

import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "../buttons/Button";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import { Divider } from "../Divider";

interface ModalProps {
  isOpen?: boolean;
  isDisabled?: boolean;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  onSubmit: () => void;
  onClose: () => void;
  title?: string;
  content?: ReactElement;
  footer?: ReactElement;
  dividerText?: string;
  showDivider?: boolean;
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    isDisabled,
    actionLabel,
    onClose,
    onSubmit,
    content,
    footer,
    secondaryAction,
    secondaryActionLabel,
    title,
    showDivider,
    dividerText = "",
  } = useMemo(() => props, [props]);

  const [showModal, setShowModal] = useState(isOpen);

  const handelOnClose = useCallback(() => {
    if (isDisabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [isDisabled, onClose]);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handelOnClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handelOnClose]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleOnSubmit = useCallback(() => {
    if (isDisabled) return;
    onSubmit();
  }, [onSubmit, isDisabled]);

  const handleSecondaryAction = useCallback(() => {
    if (isDisabled || !secondaryAction) return;
    secondaryAction();
  }, [secondaryAction, isDisabled]);

  if (!isOpen) return <></>;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center  overflow-auto bg-neutral-800/70  outline-none focus:outline-none">
        <section
          className={clsx(
            "translate mx-auto flex h-fit w-[90%] flex-col overflow-hidden rounded-lg border-0 bg-white shadow-lg outline-none duration-300 focus:outline-none sm:h-fit sm:w-[50%] lg:h-[95%] max-height-813px:h-[90%] mobile-tablet-landscape:h-[90%] mobile-tablet-landscape:w-[70%]",
            showModal ? "translate-y-0" : "translate-y-full",
            showModal ? "opacity-100" : "opacity-0"
          )}
        >
          <header className="flex items-center justify-center rounded-t border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold">{title && title}</h2>
            <button
              onClick={handelOnClose}
              className="absolute right-3 top-2 border-0 p-1 transition hover:opacity-70"
            >
              <IoMdClose size={25} />
            </button>
          </header>
          <div className="flex flex-col gap-2 overflow-y-auto p-6 pt-4">
            <div className="flex-auto pb-2">{content && <>{content}</>}</div>
            {showDivider && <Divider smallText text={dividerText} />}
            <div className="flex w-full items-center gap-4">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  outline
                  isDisabled={isDisabled}
                  label={secondaryActionLabel || ""}
                  onClick={handleSecondaryAction}
                />
              )}
              <Button
                isDisabled={isDisabled}
                label={actionLabel}
                onClick={handleOnSubmit}
              />
            </div>
            {footer && <>{footer}</>}
          </div>
        </section>
      </div>
    </>
  );
};
