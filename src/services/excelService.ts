const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQ_wexPGcZUhHcYd5Kv9zZS8JZzoJh3xkmUm3_T6ocl8ySYLBugyIhBXqdADrCCCf-/exec";

export const saveQuizResult = async (name: string, score: number, reward: string | null) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // Quan trọng: Google Script yêu cầu gửi dưới dạng text/plain để tránh lỗi CORS phức tạp
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: name,
        Score: score,
        Reward: reward || "N/A",
        Date: new Date().toLocaleString("vi-VN"), // Định dạng ngày Việt Nam
      }),
    });

    // Vì dùng mode: 'no-cors' nên response.ok sẽ luôn trả về false 
    // ngay cả khi thành công. Bạn có thể mặc định trả về true.
    return true;
  } catch (error) {
    console.error("Google Sheets Save Error:", error);
    return false;
  }
};

export const getTopPlayers = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();
    return data; // Trả về mảng [{name, score, ...}, ...]
  } catch (error) {
    console.error("Lỗi lấy bảng xếp hạng:", error);
    return [];
  }
};