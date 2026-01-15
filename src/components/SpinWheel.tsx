import { motion } from "framer-motion";
import { rewards } from "../data/questions";
import { useMemo, useRef, useState, useEffect } from "react";

interface SpinWheelProps {
  isSpinning: boolean;
  rewardResult: string | null;
}

export const SpinWheel = ({ isSpinning, rewardResult }: SpinWheelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Ép kích thước cố định để tính toán chính xác
  const CARD_WIDTH = 140;
  const GAP = 16;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Tạo danh sách phần thưởng dài để quay mượt
  const displayRewards = useMemo(
    () => [...rewards, ...rewards, ...rewards, ...rewards, ...rewards],
    []
  );

  // TÍNH TOÁN VỊ TRÍ DỪNG CHUẨN XÁC ĐẾN TỪNG PIXEL
  const stopX = useMemo(() => {
    if (!rewardResult || containerWidth === 0) return 0;

    // Lấy index của phần thưởng trong mảng gốc
    const baseIndex = rewards.indexOf(rewardResult);

    // Chúng ta sẽ dừng ở cụm phần thưởng thứ 2 (để đảm bảo dải băng dài 2 đầu)
    const targetIndex = rewards.length + baseIndex;

    // 1. Khoảng cách từ đầu dải băng đến mép trái ô mục tiêu
    const offsetLeft = targetIndex * (CARD_WIDTH + GAP);

    // 2. Điểm chính giữa của container
    const centerOfContainer = containerWidth / 2;

    // 3. Điểm chính giữa của ô mục tiêu
    const centerOfCard = CARD_WIDTH / 2;

    // CÔNG THỨC: Điểm giữa khung - (Vị trí ô + nửa ô)
    // Phải cộng thêm 16px (GAP) nếu dải băng bắt đầu bằng một khoảng Gap
    return centerOfContainer - offsetLeft - centerOfCard;
  }, [rewardResult, containerWidth]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl px-4">
      <div
        ref={containerRef}
        className="relative w-full h-40 bg-slate-950 rounded-3xl border-4 border-slate-700 overflow-hidden flex items-center shadow-[inner_0_0_40px_rgba(0,0,0,0.8)]"
      >
        {/* Kim chỉ trung tâm (Indicator) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-yellow-400 z-30 shadow-[0_0_15px_#facc15]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-yellow-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-yellow-400" />
        </div>

        {/* Dải băng quà tặng */}
        <motion.div
          className="flex items-center"
          style={{
            gap: `${GAP}px`,
            width: "max-content",
            paddingLeft: "0px", // Đảm bảo không có padding làm lệch toán học
          }}
          initial={{ x: 0 }}
          animate={
            isSpinning
              ? { x: [0, -(rewards.length * (CARD_WIDTH + GAP))] }
              : { x: stopX }
          }
          transition={
            isSpinning
              ? { repeat: Infinity, duration: 0.8, ease: "linear" }
              : { type: "spring", stiffness: 40, damping: 15, mass: 1 }
          }
        >
          {displayRewards.map((r, i) => (
            <div
              key={i}
              style={{ minWidth: `${CARD_WIDTH}px`, width: `${CARD_WIDTH}px` }}
              className={`h-28 rounded-2xl flex flex-col items-center justify-center p-4 border-2 transition-all duration-500
                ${
                  !isSpinning && rewardResult === r
                    ? "bg-yellow-500 border-white text-slate-900 scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                    : "bg-slate-900 border-slate-700 text-slate-500 opacity-40"
                }`}
            >
              <span className="text-[10px] uppercase font-black tracking-tighter opacity-70 mb-1">
                Thưởng
              </span>
              <span className="text-sm font-black text-center leading-tight uppercase">
                {r}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Lớp phủ Gradient mờ 2 bên */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-20" />
      </div>

      {/* Hiển thị kết quả dưới vòng quay */}
      <div className="h-12 mt-4">
        {!isSpinning && rewardResult && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-400 px-6 py-1 rounded-full shadow-lg shadow-yellow-400/20"
          >
            <span className="text-slate-900 font-black text-lg uppercase tracking-widest">
              {rewardResult}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
