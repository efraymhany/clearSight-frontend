import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ScanUpload = () => {
  const { token, backendUrl } = useContext(AppContext);
  const { patientId } = useParams();

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // تأخير ظهور الفورم لتحسين الأنيميشن
    const timer = setTimeout(() => setShowForm(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a scan image to upload.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setShowResult(false);

    try {
      const formData = new FormData();
      formData.append("ScanImage", file);

      const response = await fetch(`${backendUrl}/Doctors/Scan/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/plain",
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response");
      }

      if (data.success) {
        setResult(data.data);
        setShowResult(true);
      } else {
        setError(data.message || "Scan failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4 mt-14 dark:bg-gray-900 transition-colors duration-700">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-900 text-center drop-shadow-md animate-fadeInDown">
          Upload Fundus Scan Image for Patient
        </h2>

        {/* Form with fade-in and slide-up */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-6 mb-10 transition-all duration-700 ease-out transform ${
            showForm
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div>
            <label
              htmlFor="scanImage"
              className="block mb-2 font-semibold text-blue-700"
            >
              Scan Image:
            </label>
            <input
              id="scanImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-400 hover:shadow-md transition-shadow duration-300 cursor-pointer"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-center font-semibold animate-fadeIn">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Upload and Scan"
            )}
          </button>
        </form>

        {/* Result with fade-in and slide-up */}
        {result && showResult && (
          <div className="flex flex-col md:flex-row bg-green-50 rounded-lg p-6 shadow-lg border border-green-200 transition-all duration-700 ease-out transform animate-fadeInUp">
            {/* Left: Data */}
            <div className="md:w-2/3 pr-6 space-y-3 text-left text-sm">
              <h3 className="text-2xl font-semibold mb-4 text-green-800 border-b border-green-300 pb-2">
                Scan Result
              </h3>

              {[
                { label: "👨‍⚕️ Doctor", value: result.doctorName },
                { label: " 🧑 Patient", value: result.patientName },
                {
                  label: " 📅Date",
                  value: result.date
                    ? new Date(result.date).toLocaleString()
                    : "N/A",
                },
                { label: "💬Disease Message", value: result.diseaseMsg },
                { label: "📝Arabic Name", value: result.arabicName },
                {
                  label: "  📊 Confidence",
                  value: result.confidence + "%",
                },
                {
                  label: "🎯Fundus Camera Result",
                  value: result.fundusCameraResult,
                },
              ].map(({ label, value }) => (
                <p key={label} className="text-gray-700">
                  <span className="font-semibold text-blue-700">{label}:</span>{" "}
                  <span className="text-gray-900">{value || "N/A"}</span>
                </p>
              ))}
            </div>

            {/* Right: Image */}
            {result.fundusCameraPath && (
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center items-start">
                <img
                  src={result.fundusCameraPath}
                  alt="Fundus Camera"
                  className="rounded-lg border max-w-full max-h-48 shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animation keyframes styles */}
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        .animate-fadeIn {
          animation: fadeInDown 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ScanUpload;
