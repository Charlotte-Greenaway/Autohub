"use client"
import axios from 'axios';
import {useState, useEffect} from 'react';

interface user{
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

const myAccount = () => {
    const [greeting,setGreeting] = useState("Hello,")
    const [userDetails, setUserDetails] = useState<user>({
        first_name:"User",
         last_name:"",
         email:"",
         permission_level:"",
         job_title:"",
         contact_number:"",
         emergency_contact_name:"",
         emergency_contact_number:"",
         emergency_contact_address:""
    })
    const getUserDetails = async()=>{
        const response = await axios.post("/api/getUserDetails");
        setUserDetails(await response.data.permissions)
        console.log(response.data.permissions)
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
    useEffect(()=>{
        getUserDetails();
        setGreeting(greetBasedOnTime());
    },[])
    return(
        <>
        <h1>{greeting}{" "}{userDetails.first_name}!</h1>
        </>
    )
}

export default myAccount;