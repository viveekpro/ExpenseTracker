import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi"
import { useAuth } from "../context/AuthContext";


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [ formData, setFormData ] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(
                formData
            );
            login(data);
            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message || "Login failed :"
            );
        }
    };

    return (

        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register"> Register </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;