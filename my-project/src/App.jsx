import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import LoginPage from './pages/Login.jsx'
import OTPVerifyPage from './pages/Otp-verify.jsx'
import AdminDashboard from './pages/admin/adminDashboard.jsx'
import PrincipalManagement from './pages/admin/Principal.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import PrincipalDashboard from './pages/principal/PrincipalDash.jsx'
import PrincipalClassrooms from './pages/principal/Classroom.jsx'
import PrincipalLabs from './pages/principal/Labs.jsx'
import TeacherDashboard from './pages/teacher/TeacherDash.jsx'
import StudentDashboard from './pages/teacher/StudentDash.jsx'
import TeacherAssignments from './pages/teacher/Assignments.jsx'
import ParentDashboard from './pages/parent/parentDash.jsx'
import LandingPage from './pages/LandingPage.jsx'
import RolingPage from './pages/RolingPage.jsx'
import PrincipalPage from './pages/principal/PrincipalLogin.jsx'
import PrincipalLogin from './pages/principal/PrincipalLogin.jsx'
import PrincipalVerifyPage from './pages/principal/PrincipalVerify.jsx'
import TeacherLogin from './pages/teacher/teacherLogin.jsx'
import TeacherVerifyPage from './pages/teacher/teacherVerify.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verify" element={<OTPVerifyPage />} />
        
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/principals" element={<PrincipalManagement />} />
        <Route path="/principal/teachers" element={<PrincipalDashboard />} />
        <Route path="/principal/classrooms" element={<PrincipalClassrooms />} />
        <Route path="/principal/labs" element={<PrincipalLabs />} />
        <Route path="/teacher/performance" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<StudentDashboard />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments/>} />
        <Route path="/parent" element={<ParentDashboard/>} />
        <Route path="/principalLogin" element={<PrincipalLogin/>} />
        <Route path="/principalverify" element={<PrincipalVerifyPage/>} />
        <Route path="/teacherLogin" element={<TeacherLogin/>} />
        <Route path="/teacherVerify" element={<TeacherVerifyPage/>} />
        
        <Route path="/" element={<RolingPage/>} />
        

        
      </Routes>
    </Router>
   
    </AuthProvider>
    </>
  )
}

export default App
