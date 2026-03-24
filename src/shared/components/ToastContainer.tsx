"use client"

import { Toaster } from "sonner"

export default function ToastContainer() {
  return (
    <Toaster 
        richColors={true}
        position="top-right"
    />
  )
}
