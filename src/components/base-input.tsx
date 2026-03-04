import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface BaseInputProps extends ComponentProps<"input"> {
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

export function BaseInput({
  placeholder,
  children,
  className,
  ...props
}: BaseInputProps) {
  return (
    <>
      <InputGroup {...props} className={cn("", className)}>
        <InputGroupInput placeholder={placeholder} />
        <InputGroupAddon>{children}</InputGroupAddon>
      </InputGroup>
    </>
  );
}
