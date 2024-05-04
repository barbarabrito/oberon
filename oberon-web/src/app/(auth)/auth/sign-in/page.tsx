import Link from "next/link"
import { signIn } from "./actions"

export const metadata = {
  title: "Sign In",
  description: "Sign in to Oberon",
}

const SignIn = () => {
  return (
    <div className="flex flex-col h-screen px-4">
      <div className="m-auto w-full md:w-[384px]">
        <h1 className="text-2xl pb-1">Welcome back</h1>
        <form className="w-full">
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 focus:shadow-outline-blue"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 focus:shadow-outline-blue"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="mx-auto w-full mt-6 mb-3">
            <button
              formAction={signIn}
              className="w-full bg-indigo-300 text-black text-sm py-1.5 rounded-md px-3 border-indigo-300 hover:bg-transparent hover:text-indigo-300 border   "
            >
              Sign In
            </button>
          </div>

          <Link href={"/auth/sign-up"} className="text-sm px-0.5 hover:underline text-gray-300">
            {"Don't have an account yet?"}
            <span className="text-indigo-300"> Register</span>.
          </Link>
        </form>
      </div>
    </div>
  )
}
export default SignIn
