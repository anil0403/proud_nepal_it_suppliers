import React from "react";
import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import { BiLogOut } from "react-icons/bi";
import useCurrentUser from "@/hooks/useCurrentUser";
import { RiAdminFill } from "react-icons/ri";
import ManageAdmin from "@/components/Dashboard/ManageAdmin";
import ManageBrands from "@/components/Dashboard/ManageBrands";
import ManageCategories from "@/components/Dashboard/ManageCategories";
import ManageProduct from "@/components/Dashboard/ManageProduct";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const dashboard = () => {
  const { data: user } = useCurrentUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <div className="m-1 text-gray-800 flex flex-row justify-center items-center">
        <div className="text-center pt-2">
          <h1 className="font-bold text-lg md:text-2xl">
            Proud Nepal IT Suppliers Pvt. Ltd.
          </h1>
          <p className="font-semibold">Putalisadak, Kathmandu</p>
        </div>
        <div className="flex flex-col items-end pr-2 absolute right-2">
          <p className="font-semibold flex flex-row items-center gap-2">
            {" "}
            <RiAdminFill /> {user?.email}
          </p>
          <div
            onClick={() => {
              signOut();
            }}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <BiLogOut size={20} />
            <span className="text-lg font-bold hover:underline">Logout</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <Sidebar setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 border-t-gray-800 border-t-2 max-h-[90vh] overflow-y-auto">
          {activeTab === "manage_admins" && <ManageAdmin />}
          {activeTab === "manage_brands" && <ManageBrands />}
          {activeTab === "manage_categories" && <ManageCategories />}
          {activeTab === "manage_products" && <ManageProduct />}
          {/* {activeTab === "manage_categories" && <ManageCategories />} */}
        </main>
      </div>
    </>
  );
};
export default dashboard;
