import Navbar from "../../components/navbar/main/navbar";
import Footer from "../../components/footer/footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}