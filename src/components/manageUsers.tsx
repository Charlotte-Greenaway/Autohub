"use client"
import {useEffect,useState} from 'react';
import axios from 'axios';
import UserWidget from './userWidget';

const ManageUsers= () => {
    const [users,setUsers] =useState<any>(null)

    const getUsers = async() => {
        const response = await axios.post("/api/getAllUsers");
        setUsers(response.data.users);
        console.log(response.data.users)
    }

    useEffect(()=>{
        getUsers()
    },[])


    return(
        <>
        <h2 className="my-5 text-2xl text-center">Current Users</h2>
        <div className=" flex flex-row flex-wrap justify-center my-5">
        {
            
            users!==null ?(
                users.length>0 ?(
                    users.map((user:any,index:any)=>
                    <>
                    <UserWidget user ={user} key={index}/>
                    </>
                    )
                ):(
                    <p>Add users to get started</p>
                )
                
                
            ):(
                <p>Add users to get started</p>
            )
            
        }
        </div>
        </>
    )
}

export default ManageUsers;