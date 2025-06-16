import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify'; // ✅ استدعاء toast

export default function GetCode() {
    const { token, backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/Auth/GetCode`,
        {
          params: { email },
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Verification code has been sent to your email!"); // ✅ Toast message

        setTimeout(() => {
          navigate('/resetPassword', { state: { email } }); // 👈 Navigate with email
        }, 2000);
      } else {
        setError(response.data.message || 'An error occurred while sending the code.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Server connection error.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 dark:bg-slate-900">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendCode}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Send Code
        </button>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
