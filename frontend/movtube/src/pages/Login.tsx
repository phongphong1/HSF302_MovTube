import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login data:", loginData);
      // Redirect to home after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Sign up data:", signUpData);
      // Switch to login after successful sign up
      setIsSignUp(false);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex bg-gray-100 rounded-t-2xl">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              !isSignUp
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              isSignUp
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Đăng Ký
          </button>
        </div>

        <div className="flex flex-col md:flex-row min-h-[600px] relative md:overflow-hidden">
          {/* Login Form Section */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center transition-all duration-700 ease-in-out md:relative md:z-10 ${
              isSignUp
                ? "md:opacity-0 md:pointer-events-none hidden md:flex"
                : "opacity-100 flex"
            }`}
          >
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Đăng Nhập
              </h2>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    "Đăng Nhập"
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <span className="text-gray-600">Chưa có tài khoản? </span>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  Đăng ký ngay
                </button>
              </div>
              <div className="mt-6">
                <Link
                  to="/"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Quay về trang chủ
                </Link>
              </div>
            </div>
          </div>

          {/* Sign Up Form Section */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white transition-all duration-700 ease-in-out md:absolute md:top-0 md:right-0 md:h-full md:z-20 ${
              isSignUp
                ? "opacity-100 pointer-events-auto flex"
                : "md:opacity-0 md:pointer-events-none hidden md:flex"
            }`}
          >
            <div className="max-w-sm mx-auto w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Đăng Ký
              </h2>
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={signUpData.fullName}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-red-600 hover:text-red-800">
                      điều khoản sử dụng
                    </a>
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang đăng ký...
                    </div>
                  ) : (
                    "Đăng Ký"
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <span className="text-gray-600">Đã có tài khoản? </span>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-red-600 hover:text-red-800 font-medium transition-colors"
                >
                  Đăng nhập ngay
                </button>
              </div>
            </div>
          </div>

          {/* Welcome Section - Slides */}
          <div
            className={`w-full md:w-1/2 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white flex flex-col justify-center items-center p-6 md:p-8 relative overflow-hidden transition-all duration-700 ease-in-out ${
              isSignUp
                ? "md:transform md:translate-x-[-100%] order-first md:order-last"
                : "md:transform md:translate-x-0 order-last md:order-last"
            }`}
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            <div className="relative z-10 text-center max-w-sm overflow-hidden">
              <div className="relative">
                {!isSignUp ? (
                  // Login Welcome Content
                  <div 
                    className={`space-y-6 transition-all duration-1000 ease-out transform ${
                      !isSignUp 
                        ? "opacity-100 translate-y-0 translate-x-0" 
                        : "opacity-0 translate-y-4 -translate-x-8"
                    }`}
                    key="login-content"
                  >
                  <div 
                    className={`w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-700 delay-100 ${
                      !isSignUp 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h1 
                    className={`text-4xl font-bold transition-all duration-700 delay-200 ${
                      !isSignUp 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    Chào mừng trở lại!
                  </h1>
                  <p 
                    className={`text-xl opacity-90 transition-all duration-700 delay-300 ${
                      !isSignUp 
                        ? "opacity-90 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    Đăng nhập để tiếp tục khám phá thế giới phim ảnh tuyệt vời
                  </p>
                  <div 
                    className={`flex justify-center space-x-2 mt-8 transition-all duration-700 delay-400 ${
                      !isSignUp 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              ) : (
                // Sign Up Welcome Content
                <div 
                  className={`space-y-6 transition-all duration-1000 ease-out transform ${
                    isSignUp 
                      ? "opacity-100 translate-y-0 translate-x-0" 
                      : "opacity-0 translate-y-4 translate-x-8"
                  }`}
                  key="signup-content"
                >
                  <div 
                    className={`w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-700 delay-100 ${
                      isSignUp 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h1 
                    className={`text-4xl font-bold transition-all duration-700 delay-200 ${
                      isSignUp 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    Tham gia cùng chúng tôi!
                  </h1>
                  <p 
                    className={`text-xl opacity-90 transition-all duration-700 delay-300 ${
                      isSignUp 
                        ? "opacity-90 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    Tạo tài khoản để trải nghiệm đầy đủ các tính năng của
                    MovTube
                  </p>
                  <div 
                    className={`flex justify-center space-x-2 mt-8 transition-all duration-700 delay-400 ${
                      isSignUp 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              )}
              </div>
            </div>

            {/* Floating Elements */}
            <div 
              className={`absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse transition-all duration-1000 ${
                isSignUp 
                  ? "opacity-100 scale-100" 
                  : "opacity-100 scale-100"
              }`}
            ></div>
            <div 
              className={`absolute top-1/4 right-8 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-300 transition-all duration-1000 ${
                isSignUp 
                  ? "opacity-100 scale-100" 
                  : "opacity-100 scale-100"
              }`}
            ></div>
            <div 
              className={`absolute bottom-20 left-8 w-3 h-3 bg-white/25 rounded-full animate-pulse delay-700 transition-all duration-1000 ${
                isSignUp 
                  ? "opacity-100 scale-100" 
                  : "opacity-100 scale-100"
              }`}
            ></div>
            <div 
              className={`absolute bottom-1/3 right-12 w-5 h-5 bg-white/10 rounded-full animate-pulse delay-500 transition-all duration-1000 ${
                isSignUp 
                  ? "opacity-100 scale-100" 
                  : "opacity-100 scale-100"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
