import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";

const adminAuth = () => {
  const router = useRouter();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  //login
  const login = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const user = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/dashboard",
        });
        setAlert(user?.error || "");
        if (user?.status != 200) {
          router.push("/admin");
          return;
        }
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
      }
    },
    [email, password, router]
  );

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={login}
        className=" bg-gray-800 shadow-md w-[80%] md:w-[30%] rounded-lg"
        action=""
      >
        <h1 className="text-center p-5 font-bold text-3xl text-white underline">
          Admin Login
        </h1>
        <div className="p-5 flex justify-center flex-col gap-2">
          <div className="py-1 flex flex-col gap-2">
            <label className="font-semibold text-white" htmlFor="email">
              Enter Username:
            </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="outline-none bg-gray-100 py-1 px-2 font-semibold rounded-lg"
              type="text"
              required
            />
          </div>
          <div className="py-1 flex flex-col gap-2">
            <label className="font-semibold text-white" htmlFor="email">
              Enter Password:
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="outline-none bg-gray-100 py-1 px-2 font-semibold rounded-lg"
              type="password"
              required
            />
          </div>
          <button
            className="my-2 py-2 bg-sky-500 hover:bg-sky-600 border-radius-4 text-lg font-bold rounded-lg text-white"
            type="submit"
          >
            Login
          </button>
        </div>
        <p className="mb-2 pb-2 text-white text-small text-center">{alert}</p>
      </form>
    </div>
  );
};

export default adminAuth;
