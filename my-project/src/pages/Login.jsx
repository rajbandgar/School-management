import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "../config/firebase"

const LoginPage = () => {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    )
  }, [])

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const formattedPhone = phone.startsWith("+91")
        ? phone
        : `+91${phone}`

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      )

      window.confirmationResult = confirmationResult
      sessionStorage.setItem("phone", formattedPhone)

      navigate("/otp-verify")
    } catch (err) {
      console.error(err)
      setError(err.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
             School Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Login using your mobile number
          </p>
        </div>

        
        <div id="recaptcha-container"></div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSendOTP} className="space-y-5">

          {/* PHONE INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
              <span className="px-3 text-gray-500 bg-gray-100 border-r">
                +91
              </span>
              <input
                type="tel"
                value={phone.replace("+91", "")}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                required
                className="w-full px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white 
                       bg-indigo-600 hover:bg-indigo-700 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to receive an OTP for authentication
        </p>
      </div>
    </div>
  )
}

export default LoginPage
