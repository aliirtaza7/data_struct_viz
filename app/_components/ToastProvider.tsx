"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

type ToastProviderProps = {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2000} closeOnClick={true} draggable={false} theme="dark" />
    </>
  );
}