
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "gradient" | "solid";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  gradient:
    "bg-linear-to-r from-[#8B15BA] to-[#FCA311] text-white hover:opacity-90",

  solid:
    "bg-[#11071F] text-white hover:bg-[#11071F]",
};

export default function Button({
  variant = "solid",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}