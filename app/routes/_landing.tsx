import { Outlet } from "@remix-run/react";
import Modal from "~/components/Modal";
import { AppProvider } from "~/store";

export default function LandingPageLayout() {
  return (
    <AppProvider>
      <Modal />
      <Outlet />
    </AppProvider>
  );
}
