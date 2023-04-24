import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  isDisabled?: boolean;
  showDollarIcon?: boolean;
  isRequired?: boolean;
  errors: FieldErrors;
  value?: string;
  register: UseFormRegister<FieldValues>;
}

export const Input = ({
  id,
  label,
  type,
  isDisabled,
  showDollarIcon,
  isRequired,
  errors,
  value,
  register,
}: InputProps) => {
  return (
    <div className="relative w-full">
      {showDollarIcon && (
        <BiDollar
          aria-hidden="false"
          tabIndex={-1}
          size={25}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={isDisabled}
        {...register(id, { required: isRequired, value: value ?? "" })}
        placeholder=" "
        type={type}
        className={clsx(
          "peer w-full rounded-md border-2 bg-white p-4 pt-8 font-normal outline-none transition disabled:cursor-not-allowed disabled:opacity-70",
          showDollarIcon ? "pl-9" : "pl-4",
          errors[id] ? "border-red-700" : "border-neutral-300",
          errors[id] ? "focus:red-700" : "focus:border-black"
        )}
        aria-label={label}
        aria-required={isRequired}
        aria-invalid={!!errors[id]}
        aria-describedby={`${id} ${id}-error`}
      />
      <label
        className={clsx(
          "text-md absolute top-6 z-10 origin-[0] -translate-y-3 text-base text-gray-800 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75",
          showDollarIcon ? "left-9" : "left-4",
          errors[id] ? "text-red-700" : "text-gray-800"
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {errors[id] && (
        <span
          id={`${id}-error`}
          className="ml-1 mt-1 text-sm font-semibold text-red-800"
          role="alert"
        >
          {errors[id] &&
            `${id[0].toUpperCase()}${id.substring(1)} is required!`}
        </span>
      )}
    </div>
  );
};
