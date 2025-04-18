import React from "react";
import { SignIn } from "@clerk/clerk-react";

const UserLogin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/"
        />
    </div>
  );
};

export default UserLogin;
