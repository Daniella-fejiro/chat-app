import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });
    console.log(res)
    const data = await res.json();
              
    if(res.ok){
      toast.success(data.message || "You Have Successfully Signed up");
      setForm({
        name: "",
        email: "",
        password: ""
    });
      
      navigate('/login');
    }else{
      toast.error(data.message || 'Sign Up failed')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-purple-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-purple-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-purple-700"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;