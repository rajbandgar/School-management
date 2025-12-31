import React, { useEffect, useState } from "react"
import {
  HomeIcon,
  BuildingOffice2Icon,
  BeakerIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"


const stats = [
  { title: "Total Students", value: "1,250", icon: UserGroupIcon },
  { title: "Total Teachers", value: "68", icon: UserGroupIcon },
  { title: "Fees Collected", value: "₹48,75,000", icon: CurrencyRupeeIcon },
]


const teacherData = [
  {
    id: 1,
    first_name: "Amit",
    last_name: "Sharma",
    employee_code: "EMP-T-001",
    email: "amit.sharma@school.com",
    phone: "+919876543210",
    emergency_contact: "+919000000000",
    subject: "Mathematics",
    department: "Science",
    qualification: "M.Sc, B.Ed",
    experience_years: 10,
    gender: "Male",
    date_of_birth: "1986-04-12",
    joining_date: "2014-06-10",
    employment_type: "Full Time",
    salary: "₹45,000",
    blood_group: "O+",
    address: "Baner, Pune",
    city: "Pune",
    state: "Maharashtra",
    status: "active",
    class_incharge: "10A",
    attendance_percentage: "96%",
  },
]

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([])
  const [showAddTeacher, setShowAddTeacher] = useState(false)

  const [teacherForm, setTeacherForm] = useState({
    first_name: "",
    last_name: "",
    employee_code: "",
    email: "",
    phone: "",
    emergency_contact: "",
    subject: "",
    department: "",
    qualification: "",
    experience_years: "",
    gender: "",
    date_of_birth: "",
    joining_date: "",
    employment_type: "",
    salary: "",
    blood_group: "",
    address: "",
    city: "",
    state: "",
    class_incharge: "",
    status: "active",
  })

  useEffect(() => {
    setTeachers(teacherData)
  }, [])

  const handleDelete = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "phone" || name === "emergency_contact") {
      const digits = value.replace(/\D/g, "").slice(0, 10)
      setTeacherForm((p) => ({ ...p, [name]: digits }))
      return
    }

    setTeacherForm((p) => ({ ...p, [name]: value }))
  }

  const handleAddTeacher = (e) => {
    e.preventDefault()

    const newTeacher = {
      ...teacherForm,
      id: Date.now(),
      phone: `+91${teacherForm.phone}`,
      emergency_contact: `+91${teacherForm.emergency_contact}`,
      attendance_percentage: "0%",
    }

    setTeachers((prev) => [...prev, newTeacher])
    setShowAddTeacher(false)

    setTeacherForm({
      first_name: "",
      last_name: "",
      employee_code: "",
      email: "",
      phone: "",
      emergency_contact: "",
      subject: "",
      department: "",
      qualification: "",
      experience_years: "",
      gender: "",
      date_of_birth: "",
      joining_date: "",
      employment_type: "",
      salary: "",
      blood_group: "",
      address: "",
      city: "",
      state: "",
      class_incharge: "",
      status: "active",
    })
  }

  return (
    <div className="min-h-screen bg-[#ede8f5] flex p-4 gap-6">
      {/* SIDEBAR */}
      <aside className="w-64 px-6 py-6 rounded-2xl bg-white flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-8">🎓 TREMAD SCHOOLS</div>
          <ul className="space-y-2 text-sm text-gray-700">
            <SidebarItem icon={HomeIcon} label="Dashboard" active />
            
            <SidebarItem icon={BuildingOffice2Icon} label="Classrooms" />
            <SidebarItem icon={BeakerIcon} label="Labs" />
          </ul>
        </div>
        <Link to={"/"}>
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
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
              <p className="text-2xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* HEADER */}
        <div className="mb-6 bg-gray-100 px-6 py-4 rounded-2xl flex justify-between">
          <h2 className="text-xl font-bold text-gray-700">
            Teacher Management
          </h2>

          <button
            onClick={() => setShowAddTeacher(true)}
            className="flex items-center gap-2 bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
          >
            <PlusIcon className="w-4 h-4" />
            Add Teacher
          </button>
        </div>

        {/* TEACHERS */}
        <div className="bg-gray-100 p-6 rounded-2xl space-y-6">
          {teachers.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">
                  {t.first_name} {t.last_name}
                </h3>
                <button onClick={() => handleDelete(t.id)} className="text-red-600">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <Info label="Subject" value={t.subject} />
                <Info label="Department" value={t.department} />
                <Info label="Phone" value={t.phone} />
                <Info label="Experience" value={`${t.experience_years} yrs`} />
                <Info label="Class Incharge" value={t.class_incharge} />
                <Info label="Attendance" value={t.attendance_percentage} />
              </div>
            </div>
          ))}
        </div>
      </main>

      
      {showAddTeacher && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <form
            onSubmit={handleAddTeacher}
            className="bg-white p-8 rounded-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]"
          >
            <h3 className="text-xl font-semibold mb-4">Add Teacher</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" name="first_name" onChange={handleChange} />
              <Input label="Last Name" name="last_name" onChange={handleChange} />
              <Input label="Employee Code" name="employee_code" onChange={handleChange} />
              <Input label="Email" name="email" onChange={handleChange} />
              <PhoneInput label="Phone" name="phone" onChange={handleChange} />
              <PhoneInput label="Emergency Contact" name="emergency_contact" onChange={handleChange} />
              <Input label="Subject" name="subject" onChange={handleChange} />
              <Input label="Department" name="department" onChange={handleChange} />
              <Input label="Qualification" name="qualification" onChange={handleChange} />
              <Input label="Experience (Years)" name="experience_years" onChange={handleChange} />
              <Input label="Salary" name="salary" onChange={handleChange} />
              <Input label="Class Incharge" name="class_incharge" onChange={handleChange} />
              <Input label="DOB" type="date" name="date_of_birth" onChange={handleChange} />
              <Input label="Joining Date" type="date" name="joining_date" onChange={handleChange} />
              <Input label="City" name="city" onChange={handleChange} />
              <Input label="State" name="state" onChange={handleChange} />
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
                onClick={() => setShowAddTeacher(false)}
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
      active ? "bg-purple-400 text-white" : "hover:bg-gray-100"
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input {...props} className="w-full border rounded-lg px-3 py-2" />
  </div>
)

const PhoneInput = ({ label, name, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <div className="flex">
      <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-lg">
        +91
      </span>
      <input
        name={name}
        onChange={onChange}
        className="w-full border rounded-r-lg px-3 py-2"
        placeholder="9876543210"
      />
    </div>
  </div>
)

export default PrincipalDashboard
