import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const EditUser = () => {

  const users = {
    fname : "",
    lname : "",
    email : ""
  }

  const {id} = useParams();  
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const inputchangehandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
  }

  useEffect(()=>{  
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
      setUser(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[id])

const submitForm = async(e)=>{
  e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
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
            <h1 className="text-center text-2xl font-bold">Edit User Data</h1>
            <form onSubmit={submitForm}>
              <div className="mt-5">
                <label htmlFor="fname" className="block text-sm font-medium leading-5  text-gray-700">First Name</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="text"  value={user.fname} onChange={inputchangehandler} id="fname" name="fname"   required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="lname" className="block text-sm font-medium leading-5  text-gray-700">Last Name</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="text"  value={user.lname} onChange={inputchangehandler} id="lname" name="lname"   required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Email</label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input type="email" value={user.email} onChange={inputchangehandler}  id="email" name="email"   required="" className=" w-full px-3 py-2 border border-gray-300 rounded-md "/>
                </div>
              </div>
              <div className="mt-6 flex flex-row items-center">
                <button className="bg-blue-500 hover:bg-blue-600 mx-auto text-white font-bold py-2 px-4 rounded inline-flex items-center">Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser