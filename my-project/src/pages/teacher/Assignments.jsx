import React, { useEffect, useState } from "react"
import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import api from "../../services/api" // axios instance

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    subject: "",
    class_name: "",
    section: "",
    total_students: "",
    assigned_date: "",
    due_date: "",
    description: "",
    attachment: "",
  })

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      const res = await api.get("/teacher/assignments")
      setAssignments(res.data || [])
    } catch (err) {
      console.error("Fetch assignments error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/teacher/assignments", {
        ...form,
        total_students: Number(form.total_students),
      })
      setShowForm(false)
      setForm({
        title: "",
        subject: "",
        class_name: "",
        section: "",
        total_students: "",
        assigned_date: "",
        due_date: "",
        description: "",
        attachment: "",
      })
      fetchAssignments()
    } catch (err) {
      console.error("Create assignment error:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/teacher/assignments/${id}`)
      setAssignments((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

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
            <SidebarItem
              icon={ClipboardDocumentListIcon}
              label="Assignments"
              active
            />
            <Link to="/teacher/performance">
              <SidebarItem icon={ChartBarIcon} label="Performance" />
            </Link>
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
        </Link>
      </aside>

      {/* MAIN */}
      <main className="flex-1 space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Assignments</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            <PlusIcon className="w-4 h-4" />
            Add Assignment
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input name="title" label="Title" onChange={handleChange} />
            <Input name="subject" label="Subject" onChange={handleChange} />
            <Input name="class_name" label="Class" onChange={handleChange} />
            <Input name="section" label="Section" onChange={handleChange} />
            <Input
              name="total_students"
              label="Total Students"
              type="number"
              onChange={handleChange}
            />
            <Input
              name="assigned_date"
              label="Assigned Date"
              type="date"
              onChange={handleChange}
            />
            <Input
              name="due_date"
              label="Due Date"
              type="date"
              onChange={handleChange}
            />
            <Input
              name="attachment"
              label="Attachment (URL/File name)"
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* ASSIGNMENTS LIST */}
        <div className="space-y-4">
          {loading && <p>Loading...</p>}

          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{a.title}</h3>
                  <p className="text-sm text-gray-500">
                    {a.subject} · Class {a.class_name}-{a.section}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <Info label="Assigned" value={a.assigned_date} />
                <Info label="Due" value={a.due_date} />
                <Info label="Students" value={a.total_students} />
                <Info label="Status" value={a.status} />
              </div>

              <div className="mt-3 text-sm">
                <p className="text-gray-500">Description</p>
                <p>{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active ? "bg-purple-400 text-white" : "hover:bg-purple-100"
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </li>
)

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      {...props}
      required
      className="w-full border rounded-lg p-2"
    />
  </div>
)

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
)

export default TeacherAssignments
