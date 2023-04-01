"use client";

interface UserMenuItemProps {
  label: string;
  onClick: () => void;
}

export const UserMenuItem = ({ label, onClick }: UserMenuItemProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="w-full px-4 py-3 font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};
