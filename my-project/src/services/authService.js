import api from './api'

export const authService = {
  async sendOTP(phone) {
    const response = await api.post('/auth/otp/send', { phone })
    return response.data
  },

  async verifyOTP(phone, otp) {
    const response = await api.post('/auth/otp/verify', { phone, otp })
    return response.data
  },

  async logout(refreshToken) {
    await api.post('/auth/logout', { refresh_token: refreshToken })
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  },


  
}
// import api from "./api"

// export const authService = {
//   getMe: () => api.get("/auth/me"),
//   logout: () => {
//     localStorage.clear()
//   },
// }
