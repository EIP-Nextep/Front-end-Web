import { Github, Facebook } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-[#1a367f] flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#7c8db5] rounded-l-[100%] opacity-50 translate-x-1/4"></div>
      
      <div className="relative z-10 w-full max-w-md bg-[#2b4c9b]/80 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-white">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
             <span className="text-3xl">🦥</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8">Sign up</h2>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold ml-1">Email</label>
            <input 
              type="email" 
              placeholder="username@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold ml-1">Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-xs text-slate-300 hover:underline">Forgot Password?</button>
          </div>
          <button className="w-full bg-[#002a54] hover:bg-[#001f3d] py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
            Sign up
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-[1px] flex-grow bg-white/20"></div>
          <span className="text-xs text-slate-300">or</span>
          <div className="h-[1px] flex-grow bg-white/20"></div>
        </div>

        <div className="flex justify-between gap-4">
          <SocialButton icon="Google" />
          <SocialButton icon={<Github size={20} className="text-slate-900" />} />
          <SocialButton icon={<Facebook size={20} className="text-blue-600" />} />
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }: { icon: any }) {
  return (
    <button className="flex-1 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
      {icon === "Google" ? (
        <img src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="w-5 h-5" alt="Google" />
      ) : icon}
    </button>
  );
}