import React from "react"
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"


const stats = [
  {
    title: "Overall Class Score",
    value: "68%",
    subtitle: "Grade avg: 71%",
    color: "bg-green-500",
  },
  {
    title: "Work Assigned",
    value: "36",
    subtitle: "Grade avg: 38%",
    color: "bg-yellow-400",
  },
  {
    title: "Needs Attention",
    value: "5",
    subtitle: "20% of class",
    color: "bg-orange-400",
  },
]


const students = [
  {
    name: "Sabine Klein",
    completed: "33 / 36",
    score: 23,
    attention: 45,
    working: 8,
    mastered: 7,
    color: "bg-red-100",
  },
  {
    name: "Dante Podenzana",
    completed: "31 / 36",
    score: 53,
    attention: 6,
    working: 35,
    mastered: 19,
    color: "bg-yellow-100",
  },
  {
    name: "Susan Chan",
    completed: "27 / 36",
    score: 82,
    attention: 1,
    working: 14,
    mastered: 45,
    color: "bg-green-100",
  },
]

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-6">

      {/* SIDEBAR */}
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>

          <ul className="space-y-2 text-sm text-gray-700">
            
            <Link to="/teacher/students">
              <SidebarItem icon={UserGroupIcon} label="Students" />
            </Link>
            <Link to="/teacher/assignments">
              <SidebarItem icon={ClipboardDocumentListIcon} label="Assignments" />
            </Link>
            <Link to="/teacher/performance">
              <SidebarItem icon={ChartBarIcon} label="Performance" active />
            </Link>
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-white px-6 py-5 flex justify-between items-center">
          <div className="flex justify-between items-center gap-200">
             <div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Dashboard
            </h2>

            <p className="text-sm text-gray-500">Class A · 36 Students</p>
             </div>
            <button className="right-0 bg-purple-500  font-medium p-2 rounded-2xl text-white">Edit Performance</button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">{s.title}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.subtitle}</p>
              </div>

              <div className={`w-14 h-14 rounded-full ${s.color} opacity-90`} />
            </div>
          ))}
        </div>

        {/* STUDENT PROFICIENCY */}
        <div className="bg-white rounded-2xl p-6 min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Students Proficiency
            </h3>
            <p className="text-sm text-gray-500">Learning Objectives</p>
          </div>

          <div className="space-y-4">
            {students.map((s, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 ${s.color} flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
              >
                {/* NAME */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold">
                    {s.name[0]}
                  </div>
                  <p className="font-semibold">{s.name}</p>
                </div>

                {/* COMPLETED */}
                <div className="text-sm w-full md:w-1/6">
                  <p className="text-gray-500">Work Completed</p>
                  <p className="font-medium">{s.completed}</p>
                </div>

                {/* SCORE */}
                <div className="w-full md:w-1/6">
                  <p className="text-gray-500 text-sm">Average Score</p>
                  <div className="mt-1 h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <p className="text-sm font-semibold mt-1">{s.score}%</p>
                </div>

                {/* METRICS */}
                <Metric label="Attention" value={s.attention} color="bg-red-400" />
                <Metric label="Working" value={s.working} color="bg-yellow-400" />
                <Metric label="Mastered" value={s.mastered} color="bg-green-500" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}



const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active ? "bg-purple-400 text-white font-semibold" : "hover:bg-blue-100"
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </li>
)

const Metric = ({ label, value, color }) => (
  <div className="text-center w-20">
    <div
      className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center font-bold mx-auto`}
    >
      {value}
    </div>
    <p className="text-xs text-gray-600 mt-1">{label}</p>
  </div>
)

export default TeacherDashboard
