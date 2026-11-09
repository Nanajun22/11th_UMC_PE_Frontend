import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 시도:", form);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F8F9FA] pt-32 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">로그인</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-6" noValidate>
        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-gray-900">
            이메일
          </label>
          <div className="relative flex items-center">
            {/* 이메일 아이콘 */}
            <svg className="absolute left-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold text-gray-900">
            비밀번호
          </label>
          <div className="relative flex items-center">
            {/* 자물쇠 아이콘 */}
            <svg className="absolute left-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full py-4 mt-2 text-white font-bold rounded-lg bg-[#2563EB] hover:bg-blue-700 transition-colors"
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <div className="text-center text-sm text-gray-500 mt-6">
          처음이신가요?{" "}
          <Link to="/signup" className="text-[#2563EB] font-bold hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}