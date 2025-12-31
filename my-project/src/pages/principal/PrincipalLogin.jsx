import { useState } from "react"
import { useNavigate } from "react-router"
import { authService } from "../../services/authService"

const PrincipalLogin = () => {
  const [phone, setPhone] = useState("")
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try{

      const response = await authService.sendOTP(phone)
      sessionStorage.setItem('phone', phone)

      if(response.otp){
        alert(`OTP is ${response.otp}`)
      }
      navigate('/principalverify')
    }
      catch(err){
        setError("Failed to send OTP. Please try again.")
        console.error("Send OTP error:", err)
      }
    
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://marketplace.canva.com/EAE6jAwSlHc/1/0/1600w/canva-blue-minimalist-school-linktree-background-mIaWDQjiZSI.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl p-8 bg-white shadow-xl">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-slate-700">
          Welcome Back 
        </h1>

        {/* Subheading */}
        <p className="text-center text-sm text-slate-500 mt-2">
          Login using your registered mobile number
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Phone Label */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Mobile Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-2 rounded-full
                         border border-slate-300 outline-none
                         text-slate-800 placeholder-slate-400
                         focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Helper text */}
            <p className="text-xs text-slate-400 mt-1">
              We’ll send an OTP to this number
            </p>
          </div>

          {/* Send OTP Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-indigo-700
                       transition text-white rounded-full py-2 font-semibold"
          >
            Send OTP
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          By continuing, you agree to our{" "}
          <span className="text-blue-500 cursor-pointer">Terms</span> &{" "}
          <span className="text-blue-500 cursor-pointer">Privacy Policy</span>
        </div>

      </div>
    </div>
  )
}

export default PrincipalLogin
