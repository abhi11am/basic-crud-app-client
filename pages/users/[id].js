import { data } from "autoprefixer";
import moment from "moment";
import Link from "next/link";
import Avatar from "../../components/avatar";
import Button from "../../components/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Router from "next/router";

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:5000/users/${context.query.id}`);
  const data = await res.json();

  return { props: { title: "View Profile", data } };
};

const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:5000/users/delete/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (data && data.status) {
    toast.success(data.message, {});
    Router.push("/");
  } else {
    toast.error("Failed to update user");
  }
};

const UserProfile = ({ data }) => {
  return (
    <>
      <div className="bg-white shadow rounded">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            className="rounded-tl rounded-tr object-cover object-center h-60 w-full"
          />
          <Avatar>{data.data.first_name.charAt(0)}</Avatar>
        </div>
        <div className="px-8 py-4 flex justify-end">
          <Link href={`/users/edit/${data.data.id}`} key={data.data.id}>
            <a>
              <Button className="mr-2">
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </a>
          </Link>
          <Button
            className=""
            type="danger"
            onClick={() => deleteUser(data.data.id)}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
        <div className="rounded-bl rounded-br w-full p-8">
          <div className="flex">
            <div className="flex-initial w-3/5">
              <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-y-8">
                <div className="">
                  <div className="text-gray-600 text-xs">First Name</div>
                  <div className="text-gray-800 text-lg">
                    {data.data.first_name}
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-600 text-xs">Last Name</div>
                  <div className="text-gray-800 text-lg">
                    {data.data.last_name}
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-600 text-xs">Email</div>
                  <div className="text-gray-800 text-lg">{data.data.email}</div>
                </div>
                <div className="">
                  <div className="text-gray-600 text-xs">Contact</div>
                  <div
                    className={
                      data.data.contact
                        ? "text-gray-800 text-lg"
                        : "text-gray-600 text-sm"
                    }
                  >
                    {data.data.contact ? data.data.contact : "(Not Available)"}
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-600 text-xs">Gender</div>
                  <div className="text-gray-800 text-lg">
                    {data.data.gender}
                  </div>
                </div>
                <div className="">
                  <div className="text-gray-600 text-xs">Registered On</div>
                  <div className="text-gray-800 text-lg">
                    {moment(data.data.createdAt).utc().format("YYYY-MM-DD")}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-600 text-xs">About</div>
                  <div className="text-gray-800 text-lg">{data.data.about}</div>
                </div>
              </div>
            </div>
            <div className="flex-initial w-2/5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
