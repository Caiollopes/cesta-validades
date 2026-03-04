import { NavMenu } from "../nav-menu";
import { ProductPage } from "./product-page";

export function Home() {
  return (
    <div className="flex flex-col px-20 py-5 justify-center  w-full gap-20">
      <NavMenu />
      <ProductPage />
    </div>
  );
}
