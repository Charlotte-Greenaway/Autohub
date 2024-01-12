"use client"
import AddNewUser from "@/components/addNewUser";
import ManageUsers from "@/components/manageUsers";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/userAccessContext";
const AdminCenter = () => {
  const { userAccess, setUserAccess } = useContext<any>(UserContext);
  useEffect(() => {
    if (userAccess !== "Admin") {
      window.location.pathname = "/";
    }
  });
  return (
    <>
      {userAccess == "Admin" ? (
        <>
          <h2 className="my-5 text-2xl text-center">Add New User</h2>

          <AddNewUser />
          <ManageUsers />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminCenter;
