import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const AddUser = () => {

  const users ={
    fname :"",
    lname :"",
    email :"",
    password :""

  }
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    // console.log(user);
  }

  const submitform = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create", user)
    .then((response)=>{
      toast.success(response.data.msg, {position:"top-right"})
      navigate("/")
    }).catch(error => console.log(error))
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Link to="/" className="hover:underline text-xl">Back</Link>
            <h1 className="text-center text-2xl font-bold">Add New User Data</h1>
            <form onSubmit={submitform}>
              <div className="mt-5">
                <label htmlFor="fname" className="block text-sm font-medium leading-5  text-gray-700">First Name</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="text" onChange={inputHandler} id="fname" name="fname" placeholder="John" required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="lname" className="block text-sm font-medium leading-5 text-gray-700">Last Name</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="text" onChange={inputHandler} id="lname" name="lname" placeholder="Doe" required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Email</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="email" onChange={inputHandler} id="email" name="email" placeholder="John@gmail.com" required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="block text-sm font-medium leading-5  text-gray-700">Password</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="password" onChange={inputHandler} id="password" name="password" placeholder="" required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-6 flex flex-row items-center">
                <button className="bg-green-500 hover:bg-green-600 mx-auto text-white font-bold py-2 px-4 rounded inline-flex items-center">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
