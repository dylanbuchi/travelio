import clsx from "clsx";

interface DividerProps {
  text: string;
  smallText: boolean;
}
export const Divider = ({ text, smallText }: DividerProps) => {
  return (
    <fieldset className="border-t border-slate-300">
      <legend
        className={clsx(
          "mx-auto px-4 italic",
          smallText ? "text-xs" : "text-base"
        )}
      >
        {text}
      </legend>
    </fieldset>
  );
};
