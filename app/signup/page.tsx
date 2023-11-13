"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    fileUrl: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl">
        {loading ? "Processing" : "Sign Up..."}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
      <label htmlFor="file">Profile Pic</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        type="file"
        id="profile"
        value={user.fileUrl}
        onChange={(e) => setUser({ ...user, fileUrl: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className="py-2 px-6 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        SignUp here
      </button>
      <Link className="underline" href={"/login"}>
        Visite Login page
      </Link>
    </div>
  );
};

export default SignupPage;
