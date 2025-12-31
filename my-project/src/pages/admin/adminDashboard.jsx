import React from "react"
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  CreditCardIcon,
  ReceiptPercentIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-5">

      
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg mb-10">
          🎓 TREMAD SCHOOLS
        </div>

        {/* Menu */}
        <ul className="space-y-5 text-gray-700 font-medium">
          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer bg-purple-400 text-white">
            <HomeIcon className="w-5 h-5 " />
            Home
          </li>

        <Link to="/admin/principals">
          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
            <UserGroupIcon className="w-5 h-5" />
            Principal management
          </li>
        </Link>
          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
            <ChartBarIcon className="w-5 h-5" />
            Result management
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
            <ReceiptPercentIcon className="w-5 h-5" />
            Receipts
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
            <CreditCardIcon className="w-5 h-5" />
            Payment management
          </li>

          <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
            <ChartBarIcon className="w-5 h-5" />
            Analytics & insights
          </li>
        </ul>
      </aside>

      
      <main className="flex-1">

        
        <div className="flex items-center justify-between mb-6 h-20 rounded-2xl bg-white px-6">
          
          <h2 className="text-xl font-semibold text-black ">
            Hello ,James Sir 
          </h2>

          <div className="flex items-center gap-3">
            <UserIcon className="w-10 h-10" />
            <div className="text-sm">
              <p className="font-medium text-gray-700">James White</p>
              <p className="text-xs text-gray-400">TR092018</p>
            </div>
          </div>
        </div>

        
        <div className="min-h-screen rounded-2xl bg-white p-6">

          {/* ADMIN DETAILS CARD */}
          <div className="max-w-md bg-white rounded-2xl shadow-sm p-6">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <UserIcon className="w-10 h-10  rounded-full bg-gray-100" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  James White
                </h2>
                <p className="text-sm text-gray-500">
                  System Administrator
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Admin ID</span>
                <span className="font-medium text-gray-700">TR092018</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-700">
                  admin@tremadschools.com
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-700">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium text-gray-700">
                  Admin
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-100">
                Edit Profile
              </button>
              <Link to={'/'}>
              <button className="flex-1 bg-purple-400 text-white rounded-lg py-2 text-sm hover:bg-blue-700">
                Logout
              </button>
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
