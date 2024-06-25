import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllDataFetch = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const AllDataFetch = async()=>{
      const response = await axios.get("http://localhost:8000/api/getAll")
      setUsers(response.data);
    }
    AllDataFetch();
  },[])

  const delUser = async(UserId) =>{
      await axios.delete(`http://localhost:8000/api/delete/${UserId}`)
      .then((response)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== UserId))
        toast.success(response.data.msg, {position:"top-right"})
      
      })
      .catch((error)=>{
        console.log(error);
      })
   }

  return (
    <>
      <div className='p-20'>
        <Link to="/adduser" className='bg-green-400 rounded-sm hover:bg-green-500 py-2 px-4'>Add New User</Link>
        <div className="">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light text-surface">
                  <thead className="border-b border-neutral-200 font-medium ">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Name</th>
                      <th scope="col" className="px-6 py-4">Email</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((user, index)=>{
                        return(                        
                            <tr className="border-b border-neutral-200" key={user._id}>
                              <th className="px-6 py-4">{index + 1}</th>
                              <td className="px-6 py-4 font-medium">{user.fname} {user.lname}</td>
                              <td className="px-6 py-4 font-medium">{user.email}</td>
                              <td className="px-6 py-4">
                                <Link to={`/edituser/`+user._id} className="bg-blue-500 hover:bg-blue-600 mx-auto text-white font-bold py-2 px-6 rounded inline-flex items-center">Edit</Link>
                              </td>
                              <td className="px-6 py-4">
                                <button onClick={()=> delUser(user._id)} className="bg-red-500 hover:bg-red-600 mx-auto text-white font-bold py-2 px-6 rounded inline-flex items-center">Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllDataFetch