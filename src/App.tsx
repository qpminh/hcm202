import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { AnimatePresence, motion } from "framer-motion";

import { quizData, rewards } from "./data/questions";
import { useHandTracker } from "./hooks/useHandTracker";
import { saveQuizResult } from "./services/excelService";

import { LoginStep } from "./components/LoginStep";
import { QuizStep } from "./components/QuizStep";
import { ChanceStep } from "./components/ChanceStep";
import { ResultDashboard } from "./components/ResultDashboard";

export default function App() {
  const [step, setStep] = useState<"login" | "quiz" | "chance" | "result">(
    "login"
  );
  const [user, setUser] = useState({ name: "", score: 0 });
  const [currentQ, setCurrentQ] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(1000);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const webcamRef = useRef<Webcam>(null);

  // --- LOGIC 1: ĐIỀU KHIỂN TIMER ---
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(1000);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 10 ? prev - 5 : 10));
    }, 100);
  }, []);

  useEffect(() => {
    if (step === "quiz") startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQ, step, startTimer]);

  // --- LOGIC 2: XỬ LÝ TRẢ LỜI CÂU HỎI ---
  const handleAnswer = (selectedOption: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const isCorrect = selectedOption === quizData[currentQ].answer;

    if (isCorrect) {
      setUser((prev) => ({ ...prev, score: prev.score + timeLeft }));
    }

    const nextIdx = currentQ + 1;
    // Cứ sau mỗi 5 câu (5, 10, 15) thì hiện Spin
    if (nextIdx % 5 === 0 && nextIdx !== 0) {
      setTimeout(() => {
        setStep("chance");
        setIsSpinning(true);
      }, 500);
    } else {
      setCurrentQ(nextIdx);
    }
  };

  // --- LOGIC 3: ÁP DỤNG PHẦN THƯỞNG VÀO ĐIỂM ---
  const applyRewardToScore = (rewardType: string) => {
    setUser((prev) => {
      let newScore = prev.score;
      if (rewardType.includes("x2")) newScore *= 2;
      else if (rewardType.includes("+1000")) newScore += 1000;
      else if (rewardType.includes("+500")) newScore += 500;
      else newScore += 200; // Mặc định nếu quà là text khác
      return { ...prev, score: Math.floor(newScore) };
    });
  };

  const handleHandStop = useCallback(() => {
    setIsSpinning((spinning) => {
      if (spinning) {
        const randomReward =
          rewards[Math.floor(Math.random() * rewards.length)];
        setReward(randomReward);
        applyRewardToScore(randomReward); // Áp dụng điểm ngay khi dừng
        return false;
      }
      return spinning;
    });
  }, []);

  useHandTracker(webcamRef, () => {}, handleHandStop, step === "chance");

  // --- LOGIC 4: CHUYỂN TIẾP SAU KHI SPIN ---
  const handleContinue = async () => {
    // 1. Dọn dẹp trạng thái xoay và quà ngay lập tức
    // Việc này giúp camera dừng tracking và giao diện không bị "khựng"
    setIsSpinning(false);
    setReward(null);

    // 2. Xác định câu hỏi tiếp theo
    // Nếu đang ở câu 5 (index 4), nextIdx sẽ là 5 (câu 6)
    const nextIdx = currentQ + 1;

    // 3. Kiểm tra điều kiện kết thúc (sau câu 15)
    if (nextIdx >= 15) {
      // Chuyển sang kết quả ngay lập tức
      setStep("result");

      // Chạy ngầm việc lưu kết quả để không lag giao diện
      saveQuizResult(user.name, user.score, "Hoàn thành 15 câu").catch(
        console.error
      );
    } else {
      // Nếu chưa xong 15 câu, quay lại Quiz làm chặng tiếp theo
      setCurrentQ(nextIdx);
      setStep("quiz");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans">
      {/* HUD: ĐIỂM NGƯỜI DÙNG (Góc trên bên phải) */}
      <AnimatePresence>
        {step !== "login" && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-6 right-6 z-50 bg-white shadow-xl rounded-2xl p-4 border border-slate-100 flex flex-col items-end"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Tổng điểm hiện tại
            </span>
            <span className="text-3xl font-black text-blue-600">
              {user.score.toLocaleString()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px] -z-10" />

      <AnimatePresence mode="wait">
        {step === "login" && (
          <LoginStep
            userName={user.name}
            setUserName={(name) => setUser({ ...user, name })}
            onStart={() => setStep("quiz")}
          />
        )}

        {step === "quiz" && (
          <QuizStep
            currentQ={currentQ}
            question={quizData[currentQ]}
            timeLeft={timeLeft}
            onAnswer={handleAnswer}
          />
        )}

        {step === "chance" && (
          <ChanceStep
            webcamRef={webcamRef}
            isSpinning={isSpinning}
            reward={reward}
            onConfirm={handleContinue} // Đổi từ submitFinal sang handleContinue
            currentQ={currentQ}
          />
        )}

        {step === "result" && <ResultDashboard user={user} />}
      </AnimatePresence>
    </div>
  );
}
