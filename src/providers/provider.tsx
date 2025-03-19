import { ReactNode } from "react";
import { QueryProvider } from "./queryProvider";
import { RouterProvider } from "./routerProvider";

const providers = [QueryProvider, RouterProvider];

const Providers = () => {
  return providers.reduce((acc: ReactNode, Prv) => {
    return <Prv>{acc}</Prv>;
  }, null);
};

export default Providers;
