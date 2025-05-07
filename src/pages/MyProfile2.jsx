// import React, {  useContext, useState } from "react";
// // import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";

// const MyProfile2 = () => {
//   const {setUserData, userData} = useContext(AppContext );


//   const [isEdit, setIsEdit] = useState(false);

//   return userData && (
//     <div className=" max-w-lg flex flex-col gap-2 text-sm p-4">
//       {/* Profile Image */}
//       <img className="w-36 rounded" src={userData.profileImagePath} alt="Profile" />

//       {/* Name */}
//       {isEdit ? (
//         <input
//           className="bg-gray-50 text-3xl font-medium max-w-[240px] mt-4 p-2 border border-gray-300 rounded"
//           type="text"
//           value={userData.fullName}
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, fullName: e.target.value }))
//           }
//         />
//       ) : (
//         <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.fullName}</p>
//       )}

//       <hr className="bg-zinc-400 h-[1px] border-none my-4" />

//       {/* Contact Information */}
//       <div>
//         <p className="text-neutral-500  underline mt-1">CONTACT INFORMATION</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//           <p className="font-medium">Email:</p>
//           <p className="text-blue-500">{userData.email}</p>

//           <p className="font-medium">Phone:</p>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 max-w-[208px] p-2 border border-gray-300 rounded"
//               type="text"
//               value={userData.phoneNumbers}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, phoneNumbers: e.target.value }))
//               }
//             />
//           ) : (
//             <p className="text-blue-400">{userData.phoneNumbers}</p>
//           )}

        
              
            
//         </div>
//       </div>

//       {/* Basic Information */}
//       <div>
//         <p className="text-neutral-500 underline mt-1">BASIC INFORMATION</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//           <p className="font-medium">Patient ID:</p>
//           <p className="text-blue-500">{userData.patientId}</p> {/* Placeholder since not in userData */}

//           <p className="font-medium">Username:</p>
//           <p className="text-blue-500">{userData.userName}</p> {/* Placeholder since not in userData */}

        

          
//         </div>
//       </div>

//       {/* Edit/Save Button */}
//       <div className="mt-6">
//         {isEdit ? (
//           <button
//             className="border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
//             onClick={() => setIsEdit(false)}
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className="border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
//             onClick={() => setIsEdit(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile2;


// =============================
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile2 = () => {
  const { setUserData, userData, loading, error } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // Show loading state while fetching user data
  if (loading.user) {
    return <div>Loading profile...</div>;
  }

  // Handle error or no user data (e.g., after 401 or 400 error)
  if (error || !userData) {
    return (
      <div>
        <p className="text-red-500">
          {error || "Unable to load profile. Please log in again."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm p-4">
      {/* Profile Image */}
      <img
        className="w-36 rounded"
        src={userData.profileImagePath || "default-image.png"} // Fallback image if profileImagePath is empty
        alt="Profile"
      />

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-[240px] mt-4 p-2 border border-gray-300 rounded"
          type="text"
          value={userData.fullName || ""} // Fallback to empty string
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, fullName: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.fullName || "N/A"}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none my-4" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-1">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email || "N/A"}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-[208px] p-2 border border-gray-300 rounded"
              type="text"
              value={userData.phoneNumbers || ""} // Fallback to empty string
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phoneNumbers: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phoneNumbers || "N/A"}</p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-1">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Patient ID:</p>
          <p className="text-blue-500">{userData.patientId || "N/A"}</p>

          <p className="font-medium">Username:</p>
          <p className="text-blue-500">{userData.userName || "N/A"}</p>
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="mt-6">
        {isEdit ? (
          <button
            className="border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile2;