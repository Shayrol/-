import Header from "@/components/layout/header/header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="w-full flex justify-center">{children}</main>
    </>
  );
}
