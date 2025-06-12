import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";

const RevokeAccessPage = () => {
  const { token } = useContext(AppContext);
  const { doctorId } = useParams(); // ناخد doctorId من الرابط
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      handleRevoke();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const handleRevoke = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(
        `https://clearsight.runasp.net/api/Patients/revoke-access?doctorId=${doctorId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Revoke failed");
      }

      const result = await response.json();
      if (result.success) {
        setMessage("تم إلغاء الوصول بنجاح.");
        // مثلاً ترجّع لصفحة الدكاترة بعد 2 ثانية
        setTimeout(() => {
          navigate("/doctors"); // أو المسار المناسب لديك
        }, 2000);
      } else {
        throw new Error(result.message || "فشل إلغاء الوصول.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6 dark:bg-gray-900">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-xl font-bold text-center mb-4 text-[#f17732]">
          إلغاء صلاحية الوصول لدكتور
        </h1>

        {loading && <p className="text-center">جاري إلغاء الوصول...</p>}

        {message && (
          <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default RevokeAccessPage;
