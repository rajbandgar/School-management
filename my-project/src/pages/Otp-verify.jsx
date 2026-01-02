import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

const OTPVerifyPage = () => {
  const [otp, setOtp] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  // 🔹 Load phone from session
  useEffect(() => {
    const storedPhone = sessionStorage.getItem("phone")
    if (!storedPhone) {
      navigate("/login")
    } else {
      setPhone(storedPhone)
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // 1️⃣ Verify OTP with Firebase
      const result = await window.confirmationResult.confirm(otp)
      const firebaseIdToken = await result.user.getIdToken()

      // 2️⃣ Exchange Firebase token for backend JWT
      const res = await axios.post(
        "https://school-management-3-3awh.onrender.com/auth/firebase-login",
        {
          firebase_token: firebaseIdToken,
        }
      )

      const { access_token, role } = res.data

      // 3️⃣ IMPORTANT: use AuthContext login (NO manual localStorage here)
      login(access_token, res.data)

      // 4️⃣ Role-based redirect
      if (role === "ADMIN") navigate("/admin")
      else if (role === "PRINCIPAL") navigate("/principal/teachers")
      else if (role === "TEACHER") navigate("/teacher/students")
      else if (role === "PARENT") navigate("/parent")
      else navigate("/login")

    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Verify OTP
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm font-semibold text-gray-700">
            {phone}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            maxLength={6}
            placeholder="● ● ● ● ● ●"
            className="
              w-full text-center text-2xl tracking-[0.6em]
              px-4 py-3 border rounded-xl outline-none
              focus:ring-2 focus:ring-indigo-400
            "
            required
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="
              w-full py-2.5 rounded-xl font-semibold text-white
              bg-indigo-600 hover:bg-indigo-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Didn’t receive the code?
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-indigo-600 hover:underline mt-1"
          >
            Change phone number
          </button>
        </div>

      </div>
    </div>
  )
}

export default OTPVerifyPage
