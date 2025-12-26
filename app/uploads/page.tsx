import UploadsCard from "@/components/uploads-card";
import { ToastContainer, Bounce } from "react-toastify";

export default function UploadsPage() {
  return (
    <>
      <UploadsCard />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
