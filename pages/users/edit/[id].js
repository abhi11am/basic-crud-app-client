import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import Avatar from "../../../components/avatar";
import Button from "../../../components/button";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Router from "next/router";

export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:5000/users/${context.query.id}`);
  const data = await res.json();

  return { props: { title: "Edit Profile", data } };
};

const UserProfile = ({ data }) => {
  const [firstName, setFirstName] = useState(data.data.first_name);
  const [lastName, setLastName] = useState(data.data.last_name);
  const [email, setEmail] = useState(data.data.email);
  const [contact, setContact] = useState(data.data.contact);
  const [gender, setGender] = useState(data.data.gender);
  const [about, setAbout] = useState(data.data.about);
  const userId = data.data.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/users/update/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        contact: contact,
        gender: gender,
        about: about,
      }),
    });
    const data = await res.json();

    if (data && data.status) {
      toast.success(data.message, {});
      Router.push(`/users/${userId}`);
    } else {
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="rounded-tl rounded-tr object-cover object-center h-60 w-full"
            />
            <Avatar>{data.data.first_name.charAt(0)}</Avatar>
          </div>
          <div className="px-8 py-4 flex justify-end">
            <Button className="mr-2">
              <CheckIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Link href={`/users/${data.data.id}`} key={data.data.id}>
              <a>
                <Button className="" type="default">
                  <XIcon className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </a>
            </Link>
          </div>
          <div className="rounded-bl rounded-br w-full p-8">
            <div className="flex">
              <div className="flex-initial w-3/5">
                <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-8">
                  <div className="">
                    <div className="text-gray-600 text-xs">First Name</div>
                    <input
                      type="text"
                      className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                      name="first_name"
                      defaultValue={data.data.first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <div className="text-gray-600 text-xs">Last Name</div>
                    <input
                      type="text"
                      className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                      name="last_name"
                      defaultValue={data.data.last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <div className="text-gray-600 text-xs">Email</div>
                    <input
                      type="email"
                      className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                      name="email"
                      defaultValue={data.data.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                      <input
                        type="email"
                        className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                        name="contact"
                        defaultValue={data.data.contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-gray-600 text-xs">Gender</div>
                    <select
                      className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="">
                    <div className="text-gray-600 text-xs">Registered On</div>
                    <input
                      type="text"
                      className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded px-2 py-1 mt-1 w-full"
                      name="createdAt"
                      defaultValue={moment(data.data.createdAt)
                        .utc()
                        .format("YYYY-MM-DD")}
                      readOnly
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600 text-xs">About</div>
                    <div className="text-gray-800 text-lg">
                      <textarea
                        className="form-input border-1 border-gray-300 hover:border-gray-400 focus:border-indigo-400 rounded resize-none px-2 py-1 mt-1 h-48 w-full"
                        name="about"
                        defaultValue={data.data.about}
                        onChange={(e) => setAbout(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-initial w-2/5"></div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserProfile;
