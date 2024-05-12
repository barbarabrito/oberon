import AuthButton from "@/app/components/auth/auth-button/auth-button"
import { signUp } from "./actions"
import Link from "next/link"

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

const SignUp = () => {
  return (
    <div className="flex flex-col h-screen px-4">
      <div className="m-auto w-full md:w-[380px]">
        <h1 className="text-2xl pb-1">Create a new account</h1>
        <form action={signUp} className="w-full">
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300"
            type="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="mx-auto w-full mt-6 mb-3">
            <AuthButton text="Sign Up" />
          </div>

          <Link href={"/auth/sign-in"} className="text-sm px-0.5 hover:underline text-gray-300">
            {"Already have an account?"}
            <span className="text-indigo-300"> Sign in</span>.
          </Link>
        </form>
      </div>
    </div>
  )
}
export default SignUp
