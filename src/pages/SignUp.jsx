import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../modules/shop/store/useUserStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp, loading, error } = useUserStore();
  const [fakeLoading, setFakeLoading] = useState();
  const navigate = useNavigate();
  const timeInterval = 1200;

  const schema = Yup.object({
    username: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignUp = async (data) => {
    const loadingToast = toast.loading("Creating your account...",)
    const result = await signUp(data);

    setFakeLoading(true);
    if (result.success) {
      setTimeout(() => {
        setFakeLoading(false);
        toast.update(loadingToast, {
          render: "Account created successfully. Redirecting…",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          pauseOnHover: false,
        });

        sessionStorage.setItem("userSignedUp", true);
        navigate("/")
      }, timeInterval);
    } else {
      setTimeout(() => {
        setFakeLoading(false);
        toast.update(loadingToast, {
          render: result.error || "Signup failed. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }, timeInterval);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container max-w-md p-8 rounded-2xl shadow-lg bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-black mb-8 animate-fadeIn">Create Your Account</h2>

        <Formik initialValues={{ username: "", email: "", password: "" }} validationSchema={schema} onSubmit={(data) => handleSignUp(data)}>
          <Form className="space-y-6">
            <div className="relative">
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-3 border border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="relative">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              disabled={fakeLoading}
              className="w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {fakeLoading ? "Loading..." : "Sign Up"}
            </button>

            {error && !fakeLoading && <p className="text-red-500 text-center text-sm">{error}</p>}
          </Form>
        </Formik>

        <p className="text-center text-black mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/signIn" className="underline hover:text-gray-700 transition">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
