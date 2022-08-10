import React from "react";
import { ClerkLoaded, ClerkLoading } from "@clerk/remix";

interface Props {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: Props) => (
  <div className="flex justify-center space-y-5 text-center">
    <ClerkLoading>
      <div className="h-[450px] w-96 animate-pulse rounded-md bg-slate-200" />
    </ClerkLoading>

    <ClerkLoaded>{children}</ClerkLoaded>
  </div>
);

export default AuthWrapper;
