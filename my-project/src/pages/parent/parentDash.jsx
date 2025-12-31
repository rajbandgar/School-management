import React, { useEffect, useState } from "react"
import {
  HomeIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"



const studentData = {
  name: "Raj Patil",
  class: "10-A",
  roll_no: 23,
  grade: "A+",
  percentage: 82,
  attendance: 50,
  last_updated: "Nov 30, 2024",
}

const stats = [
  { label: "Overall Grade", value: "A+" },
  { label: "Attendance", value: "50%" },
  { label: "Assignments", value: "36" },
]

const upcomingTests = [
  { subject: "Mathematics", date: "Mon, 2 Dec" },
  { subject: "Physics", date: "Tue, 3 Dec" },
  { subject: "Chemistry", date: "Thu, 5 Dec" },
]

const performance = [
  { exam: "Test 1", score: 72, avg: 65 },
  { exam: "Test 2", score: 78, avg: 68 },
  { exam: "Mid Term", score: 85, avg: 72 },
  { exam: "Final", score: 90, avg: 78 },
]



const ParentDashboard = () => {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    setStudent(studentData)
  }, [])

  if (!student) return null

  return (
    <div className="min-h-screen bg-[#cebfe6] flex p-4 gap-6">

      {/* SIDEBAR */}
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>

          <ul className="space-y-2 text-sm text-gray-800">
            <SidebarItem icon={HomeIcon} label="Dashboard" active />
            
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* HEADER */}
        <div className="mb-6 h-20 rounded-2xl bg-white px-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Parent Dashboard
            </h2>
            <p className="text-sm text-gray-600">
              {student.name} • Class {student.class}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-slate-50 p-6 rounded-2xl min-h-screen space-y-6">

          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* PERFORMANCE + ATTENDANCE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">

            {/* PERFORMANCE */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Academic Performance
              </h3>

              <div className="space-y-4">
                {performance.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{p.exam}</span>
                      <span className="font-medium">{p.score}%</span>
                    </div>

                    {/* BLACK PROGRESS BAR */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${p.score}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Class Avg: {p.avg}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

           
            
          </div>

          {/* UPCOMING TESTS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Upcoming Tests
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingTests.map((t, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <p className="font-semibold text-gray-800">{t.subject}</p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}



const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-purple-400 text-white font-semibold shadow-sm"
        : "hover:bg-white"
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </li>
)

export default ParentDashboard
