"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "@/contexts/userAccessContext";
import Link from 'next/link';

const AnimatedCarNavbar = () => {
  const { userAccess, setUserAccess } = useContext<any>(UserContext);
  const [carPosition, setCarPosition] = useState(0);
  const navRef = useRef<any>(null);
  const isHoveringNavbar = useRef<any>(false);

  const getUserAccess = async () => {
    const response = await axios.post("/api/getUserAccess");
    if(window.location.pathname!=="/log-in" && window.location.pathname!=="/organisation-signup"){
      if (response.data.status !== 200) {
        await setUserAccess("read_only");
        toast.error("Could not retirieve permission level");
      } else {
        console.log(response.data.permissions)
        await setUserAccess(await response.data.permissions);
      }
    }
    
  };
  useEffect(() => {
    if (userAccess == null) {
      getUserAccess();
    }
  }, []);
  useEffect(()=>{
    console.log(userAccess)
  },[userAccess])
  const handleLogOut = async () => {
    const res = await axios.post("/api/logoutUser");
    if (res.status == 200) {
      setUserAccess(null);
      window.location.reload();
    } else {
      toast.error("could not logout.");
    }
  };
  const handleMouseOverNavItem = (event: any) => {
    if (navRef.current && event.target.tagName === "A") {
      const navItemPosition =
        event.target.getBoundingClientRect().left -
        navRef.current.getBoundingClientRect().left;
      setCarPosition(navItemPosition - 120);
    }
    isHoveringNavbar.current = true;
  };

  const handleMouseOutNavItem = () => {
    isHoveringNavbar.current = false;
    setTimeout(() => {
      if (!isHoveringNavbar.current) {
        setCarPosition(0);
      }
    }, 500); // Delay to check if the mouse is still hovering
  };

  return (
    <nav
      className="bg-gray-800 p-4 text-white"
      onMouseOver={() => (isHoveringNavbar.current = true)}
      onMouseOut={handleMouseOutNavItem}
    >
      <div
        className="container mx-auto flex justify-between items-center"
        ref={navRef}
      >
        <div>
          <h1
            className="charles text-2xl text-white "
            style={{ display: "inline-block" }}
          >
            AutoHub
          </h1>

          <div style={{ display: "inline-block" }}>
            <div
              className="car-logo text-3xl"
              style={{
                transform: `translateX(${carPosition}px) scaleX(-1)`,
                transition: "transform 0.5s ease",
              }}
            >
              🚗
            </div>
          </div>
        </div>
        <ul className="flex">
          {userAccess !== null ? (
            <>
              <li
                className="nav-item px-4"
                onMouseOver={handleMouseOverNavItem}
              >
                <Link href="/" className="px-4 py-2">
                  Vehicle Search
                </Link>
              </li>
              <li
                className="nav-item px-4"
                onMouseOver={handleMouseOverNavItem}
              >
                <Link href="/job-search" className="px-4 py-2">
                  Job Search
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {userAccess === "Admin" ? (
            <>
              <li
                className="nav-item px-4"
                onMouseOver={handleMouseOverNavItem}
              >
                <Link href="/admin-center" className="px-4 py-2">
                  Admin Center
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          {userAccess !== null ? (
            <>
              <li
                className="nav-item px-4"
                onMouseOver={handleMouseOverNavItem}
              >
                <Link href="/my-account" className="px-4 py-2">
                  My Account
                </Link>
              </li>
              <li>
            <button
              onClick={handleLogOut}
              className="bg-slate-500 hover:bg-slate-400 rounded py-1 px-2 transition-all"
            >
              Log Out
            </button>
          </li>
            </>
          ) : (
            <></>
          )}

          
        </ul>
      </div>
      <Toaster />
    </nav>
  );
};

export default AnimatedCarNavbar;
