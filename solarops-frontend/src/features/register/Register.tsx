import { useState } from "react";
import { register as registerAPI } from "@/services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await registerAPI(email, password);
    setMessage(data.message);
    if (data.userId) navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}