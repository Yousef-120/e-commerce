import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useUserStore } from "../modules/shop/store/useUserStore";
import AccountModal from "../components/common/AccountModal";

export default function AuthLayout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { checkTokenServer } = useUserStore();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await checkTokenServer();
      if (isValid) {
        const user = useUserStore.getState().user;
        setUserData(user);
        setModalOpen(true);
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-white h-dvh">
        {modalOpen && userData ? (
          <AccountModal user={userData} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        ) : (
          <div className="w-full max-w-md p-4">
            <div className="flex justify-center mb-16">
              <Link to={"/"}>
                <h1 className="integral-font text-4xl font-extrabold text-black tracking-wide animate-pulse">
                  shop.<span className="text-gray-700">co</span>
                </h1>
              </Link>
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
