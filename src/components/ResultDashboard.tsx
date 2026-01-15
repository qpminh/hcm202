import { motion, AnimatePresence } from "framer-motion";
import { getTopPlayers } from "../services/excelService";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface ResultProps {
  user: { name: string; score: number };
}

export const ResultDashboard = ({ user }: ResultProps) => {
  const [todayPlayers, setTodayPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await getTopPlayers();
      setTodayPlayers(data);
      
      // Tìm thứ hạng của người chơi trong toàn bộ danh sách hôm nay
      const rankIndex = data.findIndex(
        (p: any) => p.name === user.name && Number(p.score) === user.score
      );
      if (rankIndex !== -1) setUserRank(rankIndex + 1);
      
      setLoading(false);

      // Bắn pháo hoa
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#fbbf24", "#ffffff"],
      });
    };
    loadLeaderboard();
  }, [user.name, user.score]);

  // Chỉ lấy Top 5 để hiển thị lên bảng bên phải
  const topFive = todayPlayers.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl px-4 z-10 py-10"
    >
      <div className="bg-white rounded-[4rem] shadow-2xl border border-white overflow-hidden">
        {/* Header Section */}
        <div className="bg-slate-900 p-12 text-center text-white relative">
          <motion.div className="text-blue-500 font-black tracking-[0.4em] text-xs mb-4 uppercase">
            Daily Golden Board
          </motion.div>
          <h2 className="text-6xl font-black italic tracking-tighter uppercase">BẢNG VÀNG</h2>
          <p className="text-slate-400 mt-2 font-bold italic opacity-80">
            Hôm nay: {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>

        <div className="p-8 md:p-14 grid lg:grid-cols-2 gap-12 bg-slate-50/50">
          {/* CỘT TRÁI: THỨ HẠNG CÁ NHÂN */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-10 bg-white rounded-[3.5rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Vị trí của bạn</p>
              
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-[9rem] font-black text-slate-900 leading-none tracking-tighter my-4"
              >
                {userRank || "..."}
              </motion.div>

              <div className="space-y-1">
                <p className="text-slate-500 font-bold uppercase text-sm italic">{user.name}</p>
                <p className="text-blue-600 font-black text-4xl tabular-nums">
                  {user.score.toLocaleString()} <span className="text-sm text-slate-400 font-bold">PTS</span>
                </p>
              </div>
            </div>

            {/* Thông điệp khích lệ */}
            <div className={`p-6 rounded-[2rem] text-center font-bold uppercase text-sm shadow-lg ${
              userRank && userRank <= 5 ? "bg-emerald-500 text-white" : "bg-blue-600 text-white"
            }`}>
              {userRank && userRank <= 5 
                ? "👑 Tuyệt vời! Bạn đang dẫn đầu hôm nay" 
                : "Hãy cố gắng để lọt vào Top 5 ngày hôm nay!"}
            </div>
          </div>

          {/* CỘT PHẢI: TOP 5 TODAY */}
          <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-100 flex flex-col">
            <h3 className="text-xl font-black mb-10 uppercase tracking-tight flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 bg-amber-400 text-slate-900 rounded-2xl flex items-center justify-center text-sm font-black">TOP 5</span>
                Anh hùng hôm nay
              </div>
              {loading && <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
            </h3>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [...Array(5)].map((_, i) => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-3xl" />)
                ) : (
                  topFive.map((player, index) => {
                    const isMe = player.name === user.name && Number(player.score) === user.score;
                    return (
                      <motion.div
                        key={`${player.name}-${index}`}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex justify-between items-center p-6 rounded-[2rem] transition-all ${
                          isMe ? "bg-blue-600 text-white shadow-2xl scale-105" : "bg-slate-50 text-slate-600 border border-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <span className={`text-2xl font-black w-8 ${index === 0 ? "text-amber-500" : isMe ? "text-blue-200" : "text-slate-300"}`}>
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-black uppercase text-sm tracking-tight truncate max-w-[120px]">{player.name}</span>
                            <span className={`text-[10px] font-bold opacity-60 ${isMe ? "text-blue-100" : ""}`}>
                               {player.date.split(',')[1]} {/* Hiện giờ chơi */}
                            </span>
                          </div>
                        </div>
                        <span className="font-black text-2xl tabular-nums">{Number(player.score).toLocaleString()}</span>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
              
              {!loading && topFive.length === 0 && (
                <div className="text-center py-20 text-slate-400 italic font-medium">Chưa có anh hùng nào xuất hiện hôm nay...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};