import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1>User Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page:
        <span className="p-2 rounded bg-orange-300 ml-3"> {params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
