import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback, useState } from "react";
import axios from "axios";
import useAllAdmins from "@/hooks/useAllAdmins";

const ManageAdmin = () => {
  const { data: admins } = useAllAdmins();
  const { data: user } = useCurrentUser();
  const [ChangePasswordToggle, setChangePasswordToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("current");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const ChangePasswordToggleHandler = useCallback(() => {
    setChangePasswordToggle((prev) => !prev);
  }, []);

  // add new admin
  const createNewAdminHandler = useCallback(
    async (e: any) => {
      e.preventDefault();
      console.log(email, password);
      try {
        const user = await axios.post("api/registerAdmin", {
          email,
          password,
        });
        console.log(user);
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    },
    [email, password]
  );

  // remove admin
  const removeAdmin = useCallback(async (id: any) => {
    try {
      const response = await axios.post("api/admin/removeAdmin", {
        id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // change password
  const changePassword = useCallback(
    async (id: any) => {
      try {
        const response = await axios.post("api/admin/changePassword", {
          id,
          password,
        });
        console.log(response);
        ChangePasswordToggleHandler();
      } catch (error) {
        console.log(error);
      }
    },
    [password]
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Admins</h1>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "current"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("current")}
        >
          Admin
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "add"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("add")}
        >
          Add New Admin
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "view"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("view")}
        >
          All Admins
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "current" && (
          <div>
            <p>Username : {user?.email}</p>
            {!ChangePasswordToggle && (
              <button
                onClick={ChangePasswordToggleHandler}
                className="text-blue-500"
              >
                Change Password
              </button>
            )}
            {ChangePasswordToggle && (
              <>
                <div className="flex flex-row gap-3 items-center">
                  <label className="font-semibold" htmlFor="password">
                    Enter new password:
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-1 px-2 rounded-lg outline-none bg-gray-300 font-semibold text-small hover:ring-gray-500 hover:ring-2"
                    type="text"
                  />
                  <button
                    onClick={() => {
                      changePassword(user?.id);
                    }}
                    className="bg-gray-800 py-2 px-3 rounded-lg text-white font-semibold"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={ChangePasswordToggleHandler}
                    className="bg-red-700 py-2 px-3 rounded-lg text-white font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {activeTab === "add" && (
          <div>
            <div className="flex  flex-col gap-3 my-3 w-[300px]">
              <input
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                type="text"
                className="outline-none bg-gray-300 py-1 px-3 rounded-lg"
                placeholder="Enter Username"
              />
              <input
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type="text"
                className="outline-none bg-gray-300 py-1 px-3 rounded-lg"
                placeholder="Enter Password"
              />
              <button
                onClick={createNewAdminHandler}
                className="py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700"
              >
                Add Admin
              </button>
            </div>
          </div>
        )}
        {activeTab === "view" && (
          <div className="overflow-x-auto overflow-y-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin: any, i: number) => (
                  <tr
                    key={i + 1}
                    className="transition-colors duration-300 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {admin?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeAdmin(admin?.id)}
                        className="p-2 bg-red-700 rounded-lg text-lg font-semibold text-white  cursor-pointer hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAdmin;
