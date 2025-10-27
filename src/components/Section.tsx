import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "green" | "blue" | "transparent";
  padding?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

const Section = ({
  children,
  className = "",
  background = "white",
  padding = "lg",
  id,
}: SectionProps) => {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    green: "bg-green-600",
    blue: "bg-blue-600",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  };

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
