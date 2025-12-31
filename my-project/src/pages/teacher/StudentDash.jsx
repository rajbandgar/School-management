import React, { useEffect, useState } from "react"
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import api from "../../services/api" // axios instance
import { Link } from "react-router-dom"

const StudentDashboard = () => {
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    roll_number: "",
    admission_number: "",
    email: "",
    date_of_birth:"",
    phone: "",
    parent_phone: "",
    gender: "",
    class_name: "",
    section: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const fetchStudents = async () => {
    try {
      const res = await api.get("/teacher/students")
      setStudents(res.data)
    } catch (err) {
      console.error("Failed to fetch students", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/teacher/students", form)
      setStudents((prev) => [res.data, ...prev])
      setShowForm(false)
      setForm({})
    } catch (err) {
      console.error("Failed to add student", err)
    }
  }

 
  const handleDelete = async (id) => {
    try {
      await api.delete(`/teacher/students/${id}`)
      setStudents((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-6">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>

          <ul className="space-y-2 text-sm text-gray-700">
            <SidebarItem icon={UserGroupIcon} label="Students" active />
            <Link to={"/teacher/assignments"}>
            <SidebarItem icon={ClipboardDocumentListIcon} label="Assignments" />
            </Link>
            <Link to={"/teacher/performance"}>
            <SidebarItem icon={ChartBarIcon} label="Performance" />
            </Link>
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 text-red-600">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="flex-1 space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Student Dashboard</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            <PlusIcon className="w-4 h-4" />
            Add Student
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl grid grid-cols-2 gap-4"
          >
            {Object.keys(form).map((key) => (
              <input
                key={key}
                placeholder={key.replace("_", " ").toUpperCase()}
                className="border rounded-lg px-3 py-2"
                value={form[key] || ""}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}

            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* STUDENTS */}
        <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : students.length === 0 ? (
            <p>No students found</p>
          ) : (
            students.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {s.first_name} {s.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Class {s.class_name}-{s.section} · Roll {s.roll_number}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <Info label="Email" value={s.email} />
                  <Info label="Phone" value={s.phone} />
                  <Info label="Parent" value={s.parent_phone} />
                  <Info label="City" value={s.city} />
                </div>

                <span
                  className={`inline-block mt-4 px-4 py-1 rounded-full text-xs ${
                    s.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status?.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}


const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
      active ? "bg-purple-500 text-white" : "hover:bg-purple-100"
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </li>
)

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
)

export default StudentDashboard
