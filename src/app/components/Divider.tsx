interface DividerProps {
  text: string;
}
export const Divider = ({ text }: DividerProps) => {
  return (
    <fieldset className="border-t border-slate-300">
      <legend className="mx-auto px-4 text-base italic">{text}</legend>
    </fieldset>
  );
};
