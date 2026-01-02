import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserStore } from "../modules/shop/store/useUserStore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AccountModal from "../components/common/AccountModal";

export default function SignIn() {
  const { signIn, loading, error, checkTokenServer } = useUserStore();
  const navigate = useNavigate();
  const [fakeLoading, setFakeLoading] = useState(false);
  const timeInterval = 1200;

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignIn = async (values) => {
    const loadingToast = toast.loading("Signing in...");
    const result = await signIn(values);
    setFakeLoading(true);

    if (result.success) {
      setTimeout(() => {
        setFakeLoading(false);
        toast.update(loadingToast, {
          render: "Login successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          pauseOnHover: false,
        });
        sessionStorage.setItem("userLogged", true);
        navigate("/");
      }, timeInterval);
    } else {
      setTimeout(() => {
        setFakeLoading(false);
        toast.update(loadingToast, {
          render: "Incorrect email or password. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        Swal.fire({
          title: "Error",
          text: "Incorrect email or password. Please try again.",
          icon: "error",
        });
      }, timeInterval);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container max-w-md p-8 rounded-2xl shadow-lg bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-black mb-8 animate-fadeIn">Sign In</h2>

        <Formik initialValues={{ email: "", password: "" }} validationSchema={schema} onSubmit={(values) => handleSignIn(values)}>
          <Form className="space-y-6">
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
              {fakeLoading ? "Signing in..." : "Sign In"}
            </button>
          </Form>
        </Formik>

        <p className="text-center text-black mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/SignUp" className="underline hover:text-gray-700 transition">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
