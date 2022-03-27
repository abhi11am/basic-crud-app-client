import { PlusIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Button from "../components/button";
import UserList from "../components/user_list";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/users?limit=10");
  const data = await res.json();

  return {
    props: {
      title: "All Users",
      users: data.data,
    },
  };
};

export default function Home({ users }) {
  return (
    <div className="container">
      <div className="flex justify-end mb-4">
        <Link href={`/users/add`} key="add">
          <a>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </a>
        </Link>
      </div>
      <UserList users={users} />
    </div>
  );
}
