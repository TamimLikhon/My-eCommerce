// SignUpPage.jsx
import { signIn, auth, signOut } from "@/app/auth";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import SignupForm from "@/app/components/signupUser";
import Image from "next/image";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Image
                src={session.user.image || "/api/placeholder/64/64"}
                alt={session.user.name || "User Avatar"}
                width={16} height={16}
                className="rounded-full border-2 border-white shadow"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {session.user.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">Account created successfully</p>
            <form
              action={async () => {
                "use server";
                await signOut({redirectTo: "/"});
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-gray-500 text-center text-sm mb-6">Join us today</p>

        <SignupForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={async () => {
              "use server";
              await signIn("google");
            }}
            className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-2"
          >
            <FaGoogle className="text-red-500" />
            <span className="text-sm text-gray-600">Google</span>
          </button>
          <button
            onClick={async () => {
              "use server";
              await signIn("github");
            }}
            className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-2"
          >
            <FaGithub />
            <span className="text-sm text-gray-600">GitHub</span>
          </button>
        </div>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/Signin" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}