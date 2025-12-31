import React from "react"
import { Link } from "react-router-dom"
const RolingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://s3.amazonaws.com/campus.reform/18716/ir2hyUntitleddesign.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT — LOGIN CARD */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md min-h-120 bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-white mb-3">
                Welcome to Tremad Schools
              </h1>

              <p className="text-white/80 mb-8">
                Secure access for every role
              </p>

              <div className="space-y-6">
                
                
                
                
                
                
                
                <Link to="/login" className="block">
                <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#93785b] hover:bg-[#865d36] transition shadow-lg">
                    Login as Admin
                </button>
                </Link>
            
                <Link to="/login" className="block">
                <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#93785b] hover:bg-[#865d36] transition shadow-lg">
                    Login as Principal
                </button>
                
                </Link>
                <Link to="/login" className="block">
                <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#93785b] hover:bg-[#865d36] transition shadow-lg">
                    Login as Teacher
                </button>
                </Link>
                <Link to="/login" className="block">
                <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#93785b] hover:bg-[#865d36] transition shadow-lg">
                    Login as Parent
                </button>
                </Link>
              </div>

              <p className="text-xs text-white/60 mt-8">
                © 2025 Tremad Schools
              </p>
            </div>
          </div>

          {/* RIGHT — SCHOOL INFO */}
          <div className="hidden md:flex items-center">
            <div className="text-white max-w-xl">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Empowering Education <br /> for a Brighter Future
              </h2>

              <p className="text-lg text-white/90 mb-4">
                Tremad Schools is a modern digital platform designed to bring
                students, teachers, parents, and administrators together —
                seamlessly.
              </p>

              <p className="text-sm text-white/70">
                From academic management to real-time insights, Tremad helps
                institutions focus on what truly matters — learning, growth,
                and excellence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* REUSABLE BUTTON */
const RoleButton = ({ label }) => (
  <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#93785b] hover:bg-[#865d36] transition shadow-lg">
    {label}
  </button>
)

export default RolingPage
