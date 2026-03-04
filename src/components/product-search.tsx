import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";

interface ProductSearchProps {
  placeholder: string;
}

export function ProductSearch({ placeholder }: ProductSearchProps) {
  return (
    <>
      <InputGroup>
        <InputGroupInput placeholder={placeholder} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
