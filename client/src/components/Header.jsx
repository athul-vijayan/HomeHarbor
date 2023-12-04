import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm]=useState('')
  const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const urlSearchParams=new URLSearchParams(window.location.search)
        urlSearchParams.set('searchTerm',searchTerm)
        const searchQuery = urlSearchParams.toString()
        navigate(`/search?${searchQuery}`)

    }

    useEffect(()=>{
        const urlSearchParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlSearchParams.get('searchTerm')
        if(searchTermFromUrl) setSearchTerm(searchTermFromUrl)
    },[location.search])

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Home</span>
            <span className="text-slate-700">Harbor</span>
          </h1>
        </Link>
        <form
        onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          action=""
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-slate-700 hover:underline hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline hidden sm:inline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
