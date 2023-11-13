"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import multer from "multer";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);

      if (res.status === 200) {
        console.log("user connected successfully", res.data);
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("Please Check your credentials", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl">
        {loading ? "Processing" : "Login..."}
      </h1>{" "}
      <hr />
      <form onSubmit={onLogin} className="flex flex-col">
        <label htmlFor="email">e-mail</label>
        <input
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="py-2 px-6 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login here
        </button>
      </form>
      <Link className="underline" href={"/signup"}>
        Visite Signup page
      </Link>
    </div>
  );
};

export default LoginPage;
