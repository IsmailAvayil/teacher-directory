// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// type Teacher = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   roomNumber: string;
//   profilePicture?: string;
//   subjects: string[];
// };

// export default function TeacherDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [teacher, setTeacher] = useState<Teacher | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [subjects, setSubjects] = useState<string[]>([]);
//   const [newSubject, setNewSubject] = useState("");

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     roomNumber: "",
//     profilePicture: "",
//   });

//   // Fetch teacher
//   useEffect(() => {
//     const fetchTeacher = async () => {
//       try {
//         const res = await fetch("/api/teachers");
//         const data = await res.json();
//         const t = data.find((teacher: Teacher) => teacher.id === id);

//         if (t) {
//           setTeacher(t);
//           setSubjects(t.subjects);

//           setForm({
//             firstName: t.firstName,
//             lastName: t.lastName,
//             email: t.email,
//             phone: t.phone,
//             roomNumber: t.roomNumber,
//             profilePicture: t.profilePicture || "",
//           });
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeacher();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddSubject = () => {
//     if (!newSubject.trim()) return;
//     if (subjects.length >= 5) {
//       alert("Teacher can have maximum 5 subjects");
//       return;
//     }

//     setSubjects([...subjects, newSubject.trim()]);
//     setNewSubject("");
//   };

//   const handleRemoveSubject = (index: number) => {
//     const updated = subjects.filter((_, i) => i !== index);
//     setSubjects(updated);
//   };

//   const handleSave = async () => {
//     if (!teacher) return;

//     const formData = new FormData();
//     formData.append("firstName", form.firstName);
//     formData.append("lastName", form.lastName);
//     formData.append("email", form.email);
//     formData.append("phone", form.phone);
//     formData.append("roomNumber", form.roomNumber);
//     formData.append("profilePicture", form.profilePicture);
//     formData.append("subjects", subjects.join(","));

//     await fetch(`/api/teachers/${teacher.id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     setTeacher({
//       ...teacher,
//       ...form,
//       subjects,
//     });

//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     if (!teacher) return;

//     setForm({
//       firstName: teacher.firstName,
//       lastName: teacher.lastName,
//       email: teacher.email,
//       phone: teacher.phone,
//       roomNumber: teacher.roomNumber,
//       profilePicture: teacher.profilePicture || "",
//     });

//     setSubjects(teacher.subjects);
//     setIsEditing(false);
//   };

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (!teacher) return <p className="p-6">Teacher not found</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {!isEditing ? (
//         <>
//           <div className="bg-white shadow-xl rounded-3xl p-8 relative">
//             {teacher.profilePicture && (
//               <img
//                 src={teacher.profilePicture}
//                 alt={teacher.firstName}
//                 className="w-32 h-32 rounded-2xl object-cover mb-6"
//               />
//             )}

//             <h2 className="text-2xl font-bold mb-2">
//               {teacher.firstName} {teacher.lastName}
//             </h2>
//             <p>Email: {teacher.email}</p>
//             <p>Phone: {teacher.phone}</p>
//             <p>Room: {teacher.roomNumber}</p>

//             <div className="mt-4">
//               <h4 className="font-semibold">Subjects:</h4>
//               {teacher.subjects.map((sub, index) => (
//                 <span
//                   key={index}
//                   className="inline-block bg-slate-200 px-3 py-1 rounded-full mr-2 mt-2 text-sm"
//                 >
//                   {sub}
//                 </span>
//               ))}
//             </div>

//             <button
//               onClick={() => setIsEditing(true)}
//               className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl"
//             >
//               Edit
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="bg-white shadow-xl rounded-3xl p-8">
//           <h2 className="text-xl font-bold mb-6">Edit Teacher</h2>

//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <input
//             name="roomNumber"
//             value={form.roomNumber}
//             onChange={handleChange}
//             placeholder="Room Number"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <input
//             name="profilePicture"
//             value={form.profilePicture}
//             onChange={handleChange}
//             placeholder="Profile Picture URL"
//             className="w-full border p-2 mb-4 rounded-lg"
//           />

//           <div className="mb-4">
//             <h4 className="font-semibold mb-2">Subjects</h4>

//             {subjects.map((sub, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <span className="flex-1">{sub}</span>
//                 <button
//                   onClick={() => handleRemoveSubject(index)}
//                   className="text-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}

//             <div className="flex mt-3">
//               <input
//                 value={newSubject}
//                 onChange={(e) => setNewSubject(e.target.value)}
//                 placeholder="New Subject"
//                 className="flex-1 border p-2 rounded-l-lg"
//               />
//               <button
//                 onClick={handleAddSubject}
//                 className="bg-green-600 text-white px-4 rounded-r-lg"
//               >
//                 Add
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-6 py-2 rounded-xl"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="bg-gray-400 text-white px-6 py-2 rounded-xl"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomNumber: string;
  profilePicture?: string;
  subjects: string[];
};

export default function TeacherDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomNumber: "",
    profilePicture: "",
  });

  // Fetch teacher
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch("/api/teachers");
        const data = await res.json();
        const t = data.find((teacher: Teacher) => teacher.id === id);

        if (t) {
          setTeacher(t);
          setSubjects(t.subjects);

          setForm({
            firstName: t.firstName,
            lastName: t.lastName,
            email: t.email,
            phone: t.phone,
            roomNumber: t.roomNumber,
            profilePicture: t.profilePicture || "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    if (subjects.length >= 5) {
      alert("Maximum 5 subjects allowed");
      return;
    }

    setSubjects([...subjects, newSubject.trim()]);
    setNewSubject("");
  };

  const handleRemoveSubject = (index: number) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSave = async () => {
    if (!teacher) return;

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("roomNumber", form.roomNumber);
    formData.append("profilePicture", form.profilePicture);
    formData.append("subjects", subjects.join(","));

    await fetch(`/api/teachers/${teacher.id}`, {
      method: "PUT",
      body: formData,
    });

    setTeacher({
      ...teacher,
      ...form,
      subjects,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!teacher) return;

    setForm({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      roomNumber: teacher.roomNumber,
      profilePicture: teacher.profilePicture || "",
    });

    setSubjects(teacher.subjects);
    setIsEditing(false);
  };

  if (loading) return <p className="p-6 text-white">Loading...</p>;
  if (!teacher) return <p className="p-6 text-white">Teacher not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-3xl bg-slate-800 rounded-3xl shadow-2xl p-10 relative text-white">
        {/* Profile Image */}
        {teacher.profilePicture && (
          <div className="absolute -top-16 left-10">
            <div className="w-32 h-32 bg-white rounded-3xl p-1.5 shadow-2xl">
              <img
                src={teacher.profilePicture}
                alt={teacher.firstName}
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
          </div>
        )}

        {!isEditing ? (
          <>
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-2">
                {teacher.firstName} {teacher.lastName}
              </h2>

              <p className="text-slate-300 mb-2">📧 {teacher.email}</p>
              <p className="text-slate-300 mb-2">📱 {teacher.phone}</p>
              <p className="text-slate-300 mb-4">
                🏫 Room {teacher.roomNumber}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Subjects</h4>
                {teacher.subjects.map((sub, index) => (
                  <span
                    key={index}
                    className="inline-block bg-slate-700 px-4 py-2 rounded-full mr-2 mb-2 text-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              <input
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
                placeholder="Room Number"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              <input
                name="profilePicture"
                value={form.profilePicture}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="w-full bg-slate-700 p-3 rounded-xl outline-none"
              />

              {/* Subjects */}
              <div className="pt-4">
                <h4 className="mb-3 font-semibold">Subjects</h4>

                {subjects.map((sub, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-700 p-2 rounded-lg mb-2"
                  >
                    <span>{sub}</span>
                    <button
                      onClick={() => handleRemoveSubject(index)}
                      className="text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex mt-3">
                  <input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="New Subject"
                    className="flex-1 bg-slate-700 p-3 rounded-l-xl outline-none"
                  />
                  <button
                    onClick={handleAddSubject}
                    className="bg-green-600 px-4 rounded-r-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
