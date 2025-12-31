import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { authService } from "../../services/authService"

const PrincipalVerifyPage = () => {
  const [otp, setOtp] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("phone")
    if (!storedPhone) {
      navigate("/login")
    } else {
      setPhone(storedPhone)
    }
  }, [navigate])

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setError("")
  //   setLoading(true)

  //   try {
  //   const res = await authService.verifyOTP(phone, otp)

  //     localStorage.setItem("access_token", res.data.access_token)
      

  //     navigate("/admin")

  //   }

  //   catch (err) {
  //     setError(err.response?.data?.detail || "Invalid OTP")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1️⃣ Verify OTP → get tokens
      const tokenResponse = await authService.verifyOTP(phone, otp)
      console.log('OTP verification response:', tokenResponse)

      localStorage.setItem('access_token', tokenResponse.access_token)

      // 2️⃣ STORE TOKENS ONLY
      login(tokenResponse, null)

      // 3️⃣ Redirect (AuthContext will fetch user)
      navigate('/principal/teachers')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP')
    } finally {
      setLoading(false)
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
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 w-full max-w-sm rounded-2xl p-8 bg-white shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-700">
          Verify OTP
        </h1>

        <p className="text-center text-sm text-slate-500 mt-2">
          Enter the 6-digit code sent to your mobile number
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 text-center tracking-widest
                       rounded-full border border-slate-300
                       focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-indigo-700
                       transition text-white rounded-full py-2 font-semibold"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PrincipalVerifyPage
