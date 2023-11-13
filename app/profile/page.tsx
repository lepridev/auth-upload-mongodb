"use client";

import axios from "axios";
import { type } from "os";

import React, { useState } from "react";

const ProfilesPage = () => {
  const [user, setUser] = useState({
    name: "",
    imgUrl: "",
    img: null,
  });
  const [img, setImg] = useState(null);

  console.log("user", user);

  const handleInput = async (type: String) => {
    const formData = new FormData();
    formData.append("file", type === "image" ? user.img : "video");
    formData.append("upload_preset", "images_preset");

    try {
      let api = `https://api.cloudinary.com/v1_1/dlliywj6u/image/upload`;
      const res = await axios.post(api, formData);
      const { secure_url } = await res.data;
      console.log(secure_url);

      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const imgUrl = await handleInput("image");
      setUser({ ...user, imgUrl: imgUrl });

      const response = await axios.post("/api/users/profilpic", {
        name: user.name,
        imgUrl: user.imgUrl,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="file"
          // onChange={(e) => setImg(e.target.files[0])}
          onChange={(e) => setUser({ ...user, img: e.target.files[0] })}
        />
        <button>Upload Data and File</button>
      </form>
    </div>
  );
};

export default ProfilesPage;
