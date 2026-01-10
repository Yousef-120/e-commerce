import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../shop/store/useUserStore";

export default function useCheckAuth() {
  const { checkTokenServer } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const valid = await checkTokenServer();
        if (!valid) {
          navigate("/signIn");
          return;
        }
      }

      const userLogged = sessionStorage.getItem("userLogged");
      const userSignedUp = sessionStorage.getItem("userSignedUp");

      if (userLogged || userSignedUp) {
        sessionStorage.removeItem("userSignedUp");
        sessionStorage.removeItem("userLogged");
      }
    };

    verifyUser();
  }, [location.pathname, checkTokenServer, navigate]);
}
