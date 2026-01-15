import { motion } from "framer-motion";

interface QuizStepProps {
  currentQ: number;
  question: any;
  timeLeft: number;
  onAnswer: (opt: string) => void;
}

export const QuizStep = ({
  currentQ,
  question,
  timeLeft,
  onAnswer,
}: QuizStepProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full max-w-2xl"
  >
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-xl border border-white">
      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm uppercase">
          Câu {currentQ + 1}
        </span>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Điểm tiềm năng:
          </p>
          <p className="text-3xl font-black text-orange-500">{timeLeft}</p>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 1000) * 100}%` }}
          transition={{ ease: "linear" }}
          className="h-full bg-blue-500"
        />
      </div>

      <h2 className="text-2xl font-bold mb-8 text-slate-900 leading-snug">
        {question.question}
      </h2>
      <div className="grid gap-4">
        {question.options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            className="w-full p-6 bg-slate-50 hover:bg-blue-600 hover:text-white transition-all rounded-3xl text-left font-bold text-lg border border-slate-100 shadow-sm"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);
