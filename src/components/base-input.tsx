import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface BaseInputProps extends ComponentProps<"input"> {
  children?: React.ReactNode;
}

export function BaseInput({
  children,
  className,
  disabled,
  ...inputProps
}: BaseInputProps) {
  return (
    <>
      <InputGroup
        data-disabled={disabled}
        className={cn(
          "data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
          className,
        )}
      >
        <InputGroupInput disabled={disabled} {...inputProps} />
        <InputGroupAddon>{children}</InputGroupAddon>
      </InputGroup>
    </>
  );
}
