import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../modules/shop/store/useUserStore";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, token } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");

      toast.success("Logged out successfully!");

      navigate("/signin", { replace: true });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <CgProfile className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg  bg-white shadow-xl z-50">
          <motion.button
            whileTap={{ scale: 0.90 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg outline-0"
          >
            Profile
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.90 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg outline-0"
          >
            Settings
          </motion.button>

          {user && token && (
            <motion.button
              onClick={handleLogOut}
              whileTap={{ scale: 0.90 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-lg outline-0"
            >
              Logout
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
