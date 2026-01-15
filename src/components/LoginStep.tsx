import { motion } from "framer-motion";

interface LoginStepProps {
  userName: string;
  setUserName: (name: string) => void;
  onStart: () => void;
}

export const LoginStep = ({
  userName,
  setUserName,
  onStart,
}: LoginStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="z-10 w-full max-w-md"
    >
      <div className="bg-white/70 backdrop-blur-3xl p-10 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center">
        <div className="w-20 h-2 bg-blue-500 rounded-full mx-auto mb-8" />
        <h1 className="text-4xl font-black mb-2 tracking-tight text-slate-900">
          HCM202 <span className="text-blue-600">QUIZ</span>
        </h1>
        <p className="text-slate-400 text-xs tracking-[0.2em] font-bold mb-10 uppercase">
          Smart Interaction Experience
        </p>

        <input
          autoFocus
          className="w-full p-5 bg-slate-100/50 border border-slate-200 rounded-2xl text-slate-800 font-bold outline-none mb-6 transition-all focus:ring-4 focus:ring-blue-500/10 focus:bg-white text-center text-xl"
          placeholder="Tên của bạn..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && userName && onStart()}
        />

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={!userName}
          onClick={onStart}
          className="w-full py-5 bg-slate-900 rounded-2xl font-bold text-white text-lg shadow-lg hover:bg-blue-600 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          BẮT ĐẦU NGAY
        </motion.button>
      </div>
    </motion.div>
  );
};
