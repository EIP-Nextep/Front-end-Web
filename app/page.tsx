import Home from "@/components/Home/home";
import Stats from "@/components/Home/home"
import Navbar from "@/components/navbar";
import SignupPage from "@/components/signup"
import HowItWorks from "@/components/Home/HowItWorks"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar/>
      <Home/>
      <HowItWorks />
      <Footer/>
    </main>
  );
}
