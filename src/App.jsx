import { BrowserRouter } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right"/>
      <AppWrapper />
    </BrowserRouter>
  );
}
