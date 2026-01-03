import Navbar from "../../components/navbar/main/navbar";
import Footer from "../../components/footer/footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/authContext";

const RootLayout = () => {
  const { loading } = useContext(AuthContext);
  
  if (loading) {
    console.log("Loading state:", loading);
    return <div>Loading...</div>;
  }
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

export default RootLayout;