import React from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#ede8f5] flex items-center justify-center p-6">
      {/* OUTER WRAPPER */}
      <div className="w-full max-w-7xl bg-[#512f87] rounded-[36px] px-10 py-14 text-white relative overflow-hidden">

        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-xl font-semibold tracking-wide">
            TREMAD SCHOOLS
          </h1>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <span className="cursor-pointer hover:opacity-80">About</span>
            <span className="cursor-pointer hover:opacity-80">Learning</span>
            <span className="cursor-pointer hover:opacity-80">Enrollment</span>
            <span className="cursor-pointer hover:opacity-80">Community</span>
          </div>

          <button className="bg-white text-[#512f87] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100">
            Book a Tour
          </button>
        </div>

        {/* HERO CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Empowering Education <br />
              for a Brighter Future
            </h2>

            <p className="text-white/80 max-w-md mb-8">
              “Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela
            </p>

            <div className="flex items-center gap-4">
                <Link to="/roleLogin">
              <button className="bg-white text-[#512f87] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 cursor-pointer">
                Login
              </button>
                </Link>

              <span className="text-sm underline cursor-pointer hover:opacity-80">
                Read more
              </span>
            </div>

            <div className="mt-10 text-sm text-white/70">
              10 years of excellence in education
            </div>
          </div>

          
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://www.lawyer-monthly.com/wp-content/uploads/2018/11/Law-Students-Graduating.jpg"
                alt="Graduation"
                className="w-full h-105 object-cover"
              />
            </div>

            
            <div className="absolute -top-6 -left-6 bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              🎓
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
