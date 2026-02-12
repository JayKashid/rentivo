import { useState } from "react";
import axios from "../utils/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/register", form);
    alert("Registered Successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password"
        onChange={e => setForm({...form, password: e.target.value})} />
      <button>Register</button>
    </form>
  );
}
