import { useState } from "react";
import axios from "../utils/axios";
import { GoogleLogin } from "@react-oauth/google";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);
    alert("Login Successful");
    window.location.href = "/";
  } catch (err) {
    alert("Login Failed");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* Normal Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">
          OR
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post("/auth/google", {
                  token: credentialResponse.credential,
                });

                localStorage.setItem("token", res.data.token);
                alert("Google Login Success");
                window.location.href = "/";
              } catch (error) {
                alert("Google Login Failed");
              }
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </div>

      </div>
    </div>
  );
}
