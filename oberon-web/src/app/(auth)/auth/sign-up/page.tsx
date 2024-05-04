import { signUp } from "./actions"

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

const SignUp = () => {
  return (
    <div className="flex flex-col h-screen px-4">
      <div className="m-auto w-full md:w-[384px]">
        <h1 className="text-2xl pb-1">Create a new account</h1>
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
            type="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="w-full my-6 block outline-none text-base mb-1 bg-transparent border-b border-solid border-gray-300 focus:border-b-indigo-300 focus:shadow-outline-blue"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className="mx-auto w-full mt-6">
            <button
              formAction={signUp}
              className="w-full bg-indigo-300 text-black text-sm py-1.5 rounded-md px-3 border-indigo-300 hover:bg-transparent hover:text-indigo-300 border   "
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp
