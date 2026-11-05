"use client";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();


  return (
    <>
      <div className="text-2xl font-bold mb-2">Truyện đăng</div>
      
      {children}
    </>
  );
}
