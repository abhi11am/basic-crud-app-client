import { ChevronRightIcon, MailIcon } from "@heroicons/react/outline";
import Link from "next/link";

const UserList = ({ users }) => {
  return (
    <div className="bg-white shadow rounded divide-y divide-slate-200">
      {users.map((user) => (
        <Link href={`/users/${user.id}`} key={user.id}>
          <div className="flex flex-row p-4 hover:bg-indigo-100 cursor-pointer transition">
            <div className="basis-1/2">
              <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-indigo-600 flex items-center justify-center text-white font-medium mr-5">
                  {user.first_name.charAt(0)}
                </div>
                <div className="flex-auto">
                  <h6 className="text-md text-indigo-500 font-bold mb-1">
                    {user.first_name + " " + user.last_name}
                  </h6>
                  <div className="flex items-center text-sm text-gray-500">
                    <MailIcon className="h-5 w-5 mr-2" />
                    <div className="">{user.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4"></div>
            <div className="basis-1/4 flex items-center justify-end">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
