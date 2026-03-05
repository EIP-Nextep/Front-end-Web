import HomeSection from "@/components/Home/home";
import Stats from "@/components/Home/home"
import Navbar from "@/components/navbar";
import SignupPage from "@/components/signup"

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Stats />
      <SignupPage/>
      <HomeSection />
    </main>
  );
}