import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";
import Swal from "sweetalert2";

export default function AccountModal({ user, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  if (!isOpen) return null;

  const handleLoginWithOtherAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will log out from this account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      scrollbarPadding: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        onClose();
        navigate(location.pathname);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-center">Choose Account</h2>

        <Link to="/" onClick={onClose} className="flex items-center bg-gray-100 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-200 transition">
          <img src={profileImg} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="font-semibold">{user.email}</p>
            <p className="text-gray-500 text-sm">Signed in</p>
          </div>
        </Link>

        <button onClick={handleLoginWithOtherAccount} className="w-full text-center py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
          Log in with other account
        </button>
      </div>
    </div>
  );
}
