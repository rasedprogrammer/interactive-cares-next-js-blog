"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(data.success);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center vh-90">
        <div className="col-lg-5 p-4 shadow">
          <h2 className="fw-bold lead mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Enter Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Enter Password"
              required
            />
            <button
              disabled={loading}
              className="btn btn-lg w-100 mb-2 btn-primary"
            >
              {loading ? "Please wait.." : "Success"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
