"use client";

import { Toaster } from "react-hot-toast";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ClientProvider;
