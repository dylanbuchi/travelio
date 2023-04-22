interface UserMenuItemProps {
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const UserMenuItem = ({
  label,
  onClick = () => {},
  isDisabled,
}: UserMenuItemProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="w-full px-4 py-3 text-left font-semibold transition hover:bg-neutral-100 disabled:bg-gray-200 disabled:text-gray-500"
    >
      {label}
    </button>
  );
};
