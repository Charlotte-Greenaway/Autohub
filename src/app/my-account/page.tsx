"use client" 
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    permission_level: string;
    job_title: string;
    contact_number: string;
    emergency_contact_name: string;
    emergency_contact_number: string;
    emergency_contact_address: string;
}

const MyAccount = () => {
    const [greeting, setGreeting] = useState("Hello,");
    const [userDetails, setUserDetails] = useState<User>({
        first_name: "User",
        last_name: "",
        email: "",
        permission_level: "",
        job_title: "",
        contact_number: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        emergency_contact_address: ""
    });

    const getUserDetails = async () => {
        const response = await axios.post("/api/getUserDetails");
        setUserDetails(response.data.permissions);
        console.log(response.data.permissions);
    }

    function greetBasedOnTime() {
        const now = new Date();
        const hours = now.getHours();

        if (hours < 12) {
            return "Good morning,";
        } else if (hours < 18) {
            return "Good afternoon,";
        } else {
            return "Good evening,";
        }
    }

    useEffect(() => {
        getUserDetails();
        setGreeting(greetBasedOnTime());
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">{greeting} {userDetails.first_name}!</h1>
            <div className="mt-6">
                <h2 className="text-xl font-semibold">Your Details</h2>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Job Title:</strong> {userDetails.job_title}</p>
                    <p><strong>Contact Number:</strong> {userDetails.contact_number}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Emergency Contact</h2>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p><strong>Name:</strong> {userDetails.emergency_contact_name}</p>
                    <p><strong>Number:</strong> {userDetails.emergency_contact_number}</p>
                    <p><strong>Address:</strong> {userDetails.emergency_contact_address}</p>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
