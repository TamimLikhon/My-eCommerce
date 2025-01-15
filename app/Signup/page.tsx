import { signIn, auth, signOut } from "@/app/auth";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import SignupForm from "@/app/components/signupUser";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <img
          src={session.user.image || ""}
          alt={session.user.name || "User Avatar"}
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <p className="text-gray-700 font-bold">{session.user.name}</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
          <h1 className="text-2xl font-bold">🔒 Auth</h1>
          <p className="text-gray-500">Create Your Account</p>



        <SignupForm />


    
          {/* Divider */}
          <div className="flex items-center w-full space-x-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-black font-bold text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div>
            <p className="font-sans text-sm"> Signup with Google or Github </p>
          </div>
    
          {/* OAuth Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={async () => {
                "use server";
                await signIn("google");
              }}
              className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span> <FaGoogle /> </span>
            </button>
            <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
              className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span> <FaGithub /> </span>

            </button>
          </div>
    
 
        </div>
      </div>
    );
  }    

}