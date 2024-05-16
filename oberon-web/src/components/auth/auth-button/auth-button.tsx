"use client"

import { useFormStatus } from "react-dom"

type AuthButtonProps = {
  text: string
}

const AuthButton = ({ text }: AuthButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full text-black text-sm py-1.5 rounded-md px-3 border ${pending ? "bg-indigo-200 border-transparent bg-opacity-30" : "bg-indigo-300 border-indigo-300 hover:bg-transparent hover:text-indigo-300"}`}
    >
      {pending ? (
        <div className="flex space-x-2 justify-center items-center py-1.5">
          <span className="sr-only">Loading...</span>
          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
      ) : (
        text
      )}
    </button>
  )
}
export default AuthButton
