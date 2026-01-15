import React from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { SpinWheel } from "./SpinWheel";

interface ChanceStepProps {
  webcamRef: React.RefObject<Webcam | null>;
  isSpinning: boolean;
  reward: string | null;
  onConfirm: () => void;
  currentQ: number;
}

export const ChanceStep = ({
  webcamRef,
  isSpinning,
  reward,
  onConfirm,
  currentQ,
}: ChanceStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="z-10 flex flex-col items-center gap-10 w-full max-w-5xl"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
          {reward ? "Chúc mừng!" : "Vẫy tay để dừng!"}
        </h2>
        <p className="text-slate-500 font-medium italic mt-2 h-6">
          {reward 
            ? `Bạn đã nhận được: ${reward}` 
            : "AI đang theo dõi cử động của bạn qua Camera"}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-16 items-center justify-center w-full">
        {/* Webcam Box */}
        <div className="relative">
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-white relative">
            <Webcam
              ref={webcamRef}
              mirrored
              className="w-full h-full object-cover"
              screenshotFormat="image/jpeg"
            />
            {!reward && (
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-[2.5rem] animate-pulse pointer-events-none" />
            )}
          </div>
          
          <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors ${reward ? 'bg-emerald-500' : 'bg-blue-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Wheel Box */}
        <div className="relative scale-110">
          <SpinWheel isSpinning={isSpinning} rewardResult={reward} />
        </div>
      </div>

      {/* Nút điều hướng thông minh */}
      <div className="flex flex-col items-center min-h-[80px] justify-center">
        <AnimatePresence mode="wait">
          {reward ? (
            <motion.button
              key="btn-confirm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }} // emerald-600
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
              className="px-12 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-2xl shadow-emerald-200 transition-all uppercase tracking-wide"
            >
              {currentQ + 1 < 15 ? "Tiếp tục chặng tiếp theo" : "Xem kết quả cuối cùng"}
            </motion.button>
          ) : (
            <motion.button
              key="btn-skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ color: "#475569" }} // slate-600
              onClick={onConfirm}
              className="px-8 py-3 text-slate-400 font-bold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-slate-300 transition-all"
            >
              Bỏ qua lượt quay này &rsaquo;
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};