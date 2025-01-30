import {auth, signOut } from "@/app/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="group relative">
          <button
            className="text-gray-700 font-bold focus:outline-none"
            aria-haspopup="true"
          >
            {session.user.name}
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="p-4"
            >
              <button
                type="submit"
                className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }else{


  return null;
  }
}