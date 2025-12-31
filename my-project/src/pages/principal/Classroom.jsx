import React, { useEffect, useState } from "react"
import {
  HomeIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import api from "../../services/api"


const stats = [
  { title: "Total Students", value: "1,250" },
  { title: "Total Teachers", value: "68" },
  { title: "Fees Collected", value: "₹48,75,000" },
]

const emptyForm = {
  room_number: "",
  class_name: "",
  section: "",
  floor: "",
  building: "",
  capacity: "",
  current_students: "",
  class_teacher: "",
  assistant_teacher: "",
  board: "",
  medium: "",
  projector: "",
  smart_board: "",
  air_conditioned: "",
  benches: "",
  desks: "",
  windows: "",
  timetable: "",
  cleanliness_rating: "",
  last_inspection: "",
  emergency_exit: "",
  fire_extinguisher: "",
}

const PrincipalClassrooms = () => {
  const [classrooms, setClassrooms] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClassrooms()
  }, [])

  const fetchClassrooms = async () => {
    try {
      const res = await api.get("/principal/classrooms")
      setClassrooms(res.data)
    } catch (err) {
      console.error("Fetch classrooms error", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
        current_students: Number(form.current_students),
        benches: Number(form.benches),
        desks: Number(form.desks),
        windows: Number(form.windows),
      }

      const res = await api.post("/principal/classrooms", payload)

      setClassrooms((prev) => [res.data, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch (err) {
      console.error("Create classroom error", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-6">

      {/* SIDEBAR */}
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>

          <ul className="space-y-2 text-gray-700 text-sm">
            <Link to="/principal/teachers">
              <SidebarItem icon={HomeIcon} label="Dashboard" />
            </Link>
            <SidebarItem
              icon={BuildingOffice2Icon}
              label="Classrooms"
              active
            />
            <Link to="/principal/labs">
              <SidebarItem icon={BeakerIcon} label="Labs" />
            </Link>
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-2xl font-semibold mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        {/* HEADER */}
        <div className="bg-slate-100 p-6 rounded-2xl mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold">Classrooms</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            + Add Classroom
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {Object.keys(emptyForm).map((key) => (
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={key.replace(/_/g, " ").toUpperCase()}
                className="border rounded-lg px-3 py-2 text-sm"
              />
            ))}

            <div className="md:col-span-3 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Save Classroom"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* CLASSROOM LIST */}
        <div className="space-y-6">
          {classrooms.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Class {c.class_name}{c.section} — Room {c.room_number}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Info label="Floor" value={c.floor} />
                <Info label="Building" value={c.building} />
                <Info label="Capacity" value={c.capacity} />
                <Info label="Students" value={c.current_students} />
                <Info label="Class Teacher" value={c.class_teacher} />
                <Info label="Assistant" value={c.assistant_teacher} />
                <Info label="Board" value={c.board} />
                <Info label="Medium" value={c.medium} />
              </div>

              <Status value={c.status} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

/* ===== Helpers ===== */

const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active ? "bg-purple-400 text-white font-semibold" : "hover:bg-purple-100"
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

const Status = ({ value }) => (
  <div className="mt-4">
    <span
      className={`px-4 py-1 rounded-full text-xs font-semibold ${
        value === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {value?.toUpperCase()}
    </span>
  </div>
)

export default PrincipalClassrooms
