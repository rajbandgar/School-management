import React, { useEffect, useState } from "react"
import {
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  ChartBarIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import api from "../../services/api"
import { Link } from "react-router-dom"



const PrincipalManagement = () => {
  const [principals, setPrincipals] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    emergency_contact: "",
    qualification: "",
    experience_years: "",
    gender: "",
    date_of_birth: "",
    joining_date: "",
    employee_code: "",
    department: "",
    city: "",
    state: "",
    address: "",
    blood_group: "",
    status: "active",
  })

  useEffect(() => {
    fetchPrincipals()
  }, [])

  

  const fetchPrincipals = async () => {
    try {
      setLoading(true)
      const res = await api.get("/admin/principals")
      setPrincipals(res.data.items || [])
    } catch (err) {
      console.error("Error fetching principals:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/admin/principals", formData)
      setShowForm(false)
      fetchPrincipals()
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        emergency_contact: "",
        qualification: "",
        experience_years: "",
        gender: "",
        date_of_birth: "",
        joining_date: "",
        employee_code: "",
        department: "",
        city: "",
        state: "",
        address: "",
        blood_group: "",
        status: "active",
      })
    } catch (err) {
      console.error("Failed to add principal:", err)
      alert("Failed to add principal")
    }
  }

  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-6">
      {/* SIDEBAR */}
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>
          <ul className="space-y-2 text-sm text-gray-700">
            <SidebarItem icon={HomeIcon} label="Home" />
            <SidebarItem icon={UserGroupIcon} label="Principal Management" active />
            <SidebarItem icon={ChartBarIcon} label="Result Management" />
            <SidebarItem icon={ReceiptPercentIcon} label="Receipts" />
            <SidebarItem icon={CreditCardIcon} label="Payment Management" />
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
        <div className="mb-6 h-20 rounded-2xl bg-white px-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Principal Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage principals & information
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-500 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700"
          >
            <PlusIcon className="w-4 h-4" />
            Add Principal
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white p-6 rounded-2xl min-h-screen">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {principals.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">
                      {p.first_name?.[0]}
                      {p.last_name?.[0]}
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg">
                        {p.first_name} {p.last_name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {p.department || "—"}
                      </p>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><b>Email:</b> {p.email || "—"}</p>
                    <p><b>Phone:</b> {p.phone || "—"}</p>
                    <p><b>Emergency:</b> {p.emergency_contact || "—"}</p>
                    <p><b>Qualification:</b> {p.qualification || "—"}</p>
                    <p><b>Experience:</b> {p.experience_years || 0} yrs</p>
                    <p><b>Gender:</b> {p.gender || "—"}</p>
                    <p><b>DOB:</b> {p.date_of_birth || "—"}</p>
                    <p><b>Joining:</b> {p.joining_date || "—"}</p>
                    <p><b>Employee Code:</b> {p.employee_code || "—"}</p>
                    <p>
                      <b>City:</b> {p.city || "—"}, {p.state || ""}
                    </p>
                    <p><b>Blood Group:</b> {p.blood_group || "—"}</p>
                  </div>

                  {/* STATUS */}
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-3xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Add Principal</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" name="first_name" onChange={handleChange} required />
              <Input label="Last Name" name="last_name" onChange={handleChange} required />
              <Input label="Email" name="email" type="email" onChange={handleChange} />
              <Input label="Phone" name="phone" onChange={handleChange} />
              <Input label="Emergency Contact" name="emergency_contact" onChange={handleChange} />
              <Input label="Qualification" name="qualification" onChange={handleChange} />
              <Input label="Experience (Years)" name="experience_years" type="number" onChange={handleChange} />
              <Input label="Employee Code" name="employee_code" onChange={handleChange} />
              <Input label="Department" name="department" onChange={handleChange} />
              <Input label="City" name="city" onChange={handleChange} />
              <Input label="State" name="state" onChange={handleChange} />
              <Input label="DOB" name="date_of_birth" type="date" onChange={handleChange} />
              <Input label="Joining Date" name="joining_date" type="date" onChange={handleChange} />
              <Select label="Gender" name="gender" options={["Male","Female","Other"]} onChange={handleChange} />
              <Select label="Blood Group" name="blood_group" options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]} onChange={handleChange} />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}


const SidebarItem = ({ icon: Icon, label, active }) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
      active ? "bg-purple-400 text-white" : "hover:bg-blue-100"
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </li>
)

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="w-full border rounded-lg px-3 py-2" />
  </div>
)

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select {...props} className="w-full border rounded-lg px-3 py-2">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
)

export default PrincipalManagement
