import React, { useEffect, useState } from "react"
import {
  HomeIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import api from "../../services/api"


const stats = [
  { title: "Total Students", value: "1,250" },
  { title: "Total Teachers", value: "68" },
  { title: "Fees Collected", value: "₹48,75,000" },
]


const emptyForm = {
  lab_name: "",
  lab_code: "",
  subject: "",
  floor: "",
  building: "",
  capacity: "",
  incharge: "",
  assistant: "",
  equipment_count: "",
  computers: "",
  internet: "",
  safety_equipment: "",
  fire_extinguisher: "",
  ventilation: "",
  power_backup: "",
  last_audit: "",
  next_audit: "",
  utilization: "",
  maintenance_cost: "",
  cleanliness: "",
  remarks: "",
}

const PrincipalLabs = () => {
  const [labs, setLabs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLabs()
  }, [])

 

  const fetchLabs = async () => {
    try {
      const res = await api.get("/principal/labs")
      setLabs(res.data)
    } catch (err) {
      console.error("Error fetching labs", err)
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
        equipment_count: Number(form.equipment_count),
        computers: Number(form.computers),
      }

      const res = await api.post("/principal/labs", payload)

      setLabs((prev) => [res.data, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch (err) {
      console.error("Create lab error", err)
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

          <ul className="space-y-2 text-sm text-gray-700">
            <Link to="/principal/teachers">
              <SidebarItem icon={HomeIcon} label="Dashboard" />
            </Link>
            <Link to="/principal/classrooms">
              <SidebarItem icon={BuildingOffice2Icon} label="Classrooms" />
            </Link>
            <SidebarItem icon={BeakerIcon} label="Labs" active />
          </ul>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
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
          <h2 className="text-2xl font-semibold">Labs</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            + Add Lab
          </button>
        </div>

        {/* ADD LAB FORM */}
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
                {loading ? "Saving..." : "Save Lab"}
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

        {/* LAB LIST */}
        <div className="space-y-6">
          {labs.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                {l.lab_name} ({l.lab_code})
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Info label="Subject" value={l.subject} />
                <Info label="Floor" value={l.floor} />
                <Info label="Building" value={l.building} />
                <Info label="Capacity" value={l.capacity} />
                <Info label="Incharge" value={l.incharge} />
                <Info label="Assistant" value={l.assistant} />
                <Info label="Equipment" value={l.equipment_count} />
                <Info label="Computers" value={l.computers} />
                <Info label="Internet" value={l.internet} />
                <Info label="Safety" value={l.safety_equipment} />
                <Info label="Fire Ext." value={l.fire_extinguisher} />
                <Info label="Ventilation" value={l.ventilation} />
                <Info label="Power Backup" value={l.power_backup} />
                <Info label="Utilization" value={l.utilization} />
                <Info label="Maintenance" value={l.maintenance_cost} />
                <Info label="Cleanliness" value={l.cleanliness} />
                <Info label="Last Audit" value={l.last_audit} />
                <Info label="Next Audit" value={l.next_audit} />
                <Info label="Remarks" value={l.remarks} />
              </div>

              <Status value={l.status} />
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

export default PrincipalLabs
