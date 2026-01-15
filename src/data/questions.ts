export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const quizData: Question[] = [
  {
    id: 1,
    question: "Theo Hồ Chí Minh, mục tiêu cốt lõi và 'mộc mạc' nhất của chủ nghĩa xã hội là gì?",
    options: [
      "Xây dựng nền công nghiệp hiện đại và nông nghiệp tập thể hóa.",
      "Làm cho nhân dân lao động thoát nạn bần cùng, có công ăn việc làm, ấm no và hạnh phúc.",
      "Thiết lập chuyên chính vô sản và xóa bỏ hoàn toàn tư hữu.",
      "Đưa Việt Nam trở thành một cường quốc kinh tế sánh vai với các nước phương Tây."
    ],
    answer: "Làm cho nhân dân lao động thoát nạn bần cùng, có công ăn việc làm, ấm no và hạnh phúc."
  },
  {
    id: 2,
    question: "Hồ Chí Minh quan niệm như thế nào về mối quan hệ giữa lợi ích cá nhân và lợi ích tập thể trong chế độ XHCN?",
    options: [
      "Lợi ích cá nhân hoàn toàn tách biệt và độc lập với lợi ích tập thể.",
      "Lợi ích cá nhân phải bị xóa bỏ để tập trung toàn bộ cho lợi ích tập thể.",
      "Lợi ích cá nhân nằm trong lợi ích tập thể và là một bộ phận của lợi ích tập thể.",
      "Lợi ích tập thể chỉ là phương tiện để thỏa mãn mọi tham vọng cá nhân."
    ],
    answer: "Lợi ích cá nhân nằm trong lợi ích tập thể và là một bộ phận của lợi ích tập thể."
  },
  {
    id: 3,
    question: "Theo tài liệu, điểm khác biệt cơ bản giữa giai đoạn thấp (CNXH) và giai đoạn cao (Cộng sản chủ nghĩa) là gì?",
    options: [
      "Giai đoạn thấp đã có sức sản xuất phát triển cao, giai đoạn cao thì chưa.",
      "Giai đoạn thấp còn chút ít vết tích xã hội cũ, giai đoạn cao thì hoàn toàn không còn.",
      "Giai đoạn thấp vẫn còn giai cấp bóc lột, giai đoạn cao mới xóa bỏ hoàn toàn.",
      "Giai đoạn thấp tư liệu sản xuất là của chung, giai đoạn cao là của nhà nước."
    ],
    answer: "Giai đoạn thấp còn chút ít vết tích xã hội cũ, giai đoạn cao thì hoàn toàn không còn."
  },
  {
    id: 4,
    question: "Hồ Chí Minh khẳng định tính tất yếu của việc tiến lên CNXH dựa trên học thuyết nào?",
    options: [
      "Học thuyết về giá trị thặng dư của C.Mác.",
      "Học thuyết về hình thái kinh tế - xã hội của C.Mác.",
      "Học thuyết về nhà nước và cách mạng của Lenin.",
      "Học thuyết về dân tộc tự quyết của Woodrow Wilson."
    ],
    answer: "Học thuyết về hình thái kinh tế - xã hội của C.Mác."
  },
  {
    id: 5,
    question: "Trong tư tưởng Hồ Chí Minh, phương thức tiến lên CNXH của Việt Nam có đặc điểm gì?",
    options: [
      "Đi thẳng lên CNXH như Liên Xô mà không cần trải qua giai đoạn nào.",
      "Phải trải qua giai đoạn phát triển tư bản chủ nghĩa đầy đủ rồi mới lên CNXH.",
      "Kinh qua chế độ dân chủ mới, rồi tiến lên CNXH, bỏ qua giai đoạn tư bản chủ nghĩa.",
      "Chờ đợi cuộc cách mạng vô sản bùng nổ đồng loạt trên toàn thế giới."
    ],
    answer: "Kinh qua chế độ dân chủ mới, rồi tiến lên CNXH, bỏ qua giai đoạn tư bản chủ nghĩa."
  },
  {
    id: 6,
    question: "Đặc trưng về mặt chính trị của xã hội XHCN theo Hồ Chí Minh là gì?",
    options: [
      "Là xã hội do Đảng Cộng sản quản lý toàn diện mọi mặt đời sống.",
      "Là xã hội có chế độ dân chủ, do nhân dân làm chủ dưới sự lãnh đạo của Đảng.",
      "Là xã hội thực hiện chế độ đa đảng đối lập để giám sát quyền lực.",
      "Là xã hội mà mọi quyết định đều được trưng cầu dân ý trực tiếp hàng ngày."
    ],
    answer: "Là xã hội có chế độ dân chủ, do nhân dân làm chủ dưới sự lãnh đạo của Đảng."
  },
  {
    id: 7,
    question: "Về mặt kinh tế, Hồ Chí Minh xác định CNXH dựa trên nền tảng nào?",
    options: [
      "Lực lượng sản xuất thô sơ và chế độ tư hữu tư liệu sản xuất.",
      "Lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu.",
      "Nền kinh tế thị trường tự do hoàn toàn không có sự can thiệp của nhà nước.",
      "Ưu tiên phát triển thủ công nghiệp và nông nghiệp tự cấp tự túc."
    ],
    answer: "Lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu."
  },
  {
    id: 8,
    question: "Nguyên tắc phân phối thu nhập trong xã hội XHCN được Hồ Chí Minh nêu là gì?",
    options: [
      "Phân phối bình quân cho tất cả mọi người không phân biệt đóng góp.",
      "Làm nhiều hưởng nhiều, làm ít hưởng ít, không làm không hưởng.",
      "Ưu tiên phân phối cho cán bộ, đảng viên trước rồi mới đến nhân dân.",
      "Phân phối theo nhu cầu cá nhân bất kể khả năng lao động."
    ],
    answer: "Làm nhiều hưởng nhiều, làm ít hưởng ít, không làm không hưởng."
  },
  {
    id: 9,
    question: "Theo Hồ Chí Minh, mục tiêu về văn hóa của CNXH ở Việt Nam phải có tính chất gì?",
    options: [
      "Mang tính chất dân tộc, khoa học và đại chúng.",
      "Loại bỏ hoàn toàn truyền thống cũ để xây dựng văn hóa mới từ đầu.",
      "Chỉ tập trung tiếp thu văn hóa của các nước xã hội chủ nghĩa anh em.",
      "Mang tính chất hàn lâm, bác học để nâng cao vị thế dân tộc."
    ],
    answer: "Mang tính chất dân tộc, khoa học và đại chúng."
  },
  {
    id: 10,
    question: "Động lực nào được Hồ Chí Minh đánh giá là quan trọng nhất, giữ vai trò quyết định trong xây dựng CNXH?",
    options: [
      "Nguồn lực viện trợ và hỗ trợ kỹ thuật từ quốc tế.",
      "Nội lực dân tộc, sức mạnh của nhân dân và sự đoàn kết toàn dân.",
      "Các chính sách kinh tế khắt khe và chế tài xử phạt của pháp luật.",
      "Sự phát triển tự phát của các thành phần kinh tế tư nhân."
    ],
    answer: "Nội lực dân tộc, sức mạnh của nhân dân và sự đoàn kết toàn dân."
  },
  {
    id: 11,
    question: "Để xây dựng CNXH, Hồ Chí Minh khẳng định cần phải có 'con người xã hội chủ nghĩa'. Đó là những người như thế nào?",
    options: [
      "Những người có trình độ chuyên môn cao nhưng không cần quan tâm đến chính trị.",
      "Những người có ý thức làm chủ, tinh thần tập thể, cần kiệm xây dựng nước nhà.",
      "Những người tuyệt đối tuân lệnh cấp trên mà không cần tư duy sáng tạo.",
      "Những người có lối sống hưởng thụ để kích thích nhu cầu tiêu dùng xã hội."
    ],
    answer: "Những người có ý thức làm chủ, tinh thần tập thể, cần kiệm xây dựng nước nhà."
  },
  {
    id: 12,
    question: "Đặc điểm lớn nhất của thời kỳ quá độ lên CNXH ở Việt Nam được Hồ Chí Minh xác định là gì?",
    options: [
      "Từ một nước tư bản phát triển trung bình tiến thẳng lên CNXH.",
      "Từ một nước nông nghiệp lạc hậu tiến thẳng lên CNXH, không qua giai đoạn tư bản chủ nghĩa.",
      "Từ một nước thuộc địa nửa phong kiến tiến lên tư bản chủ nghĩa rồi mới lên CNXH.",
      "Từ một nước công nghiệp hiện đại đang trong tình trạng khủng hoảng kinh tế."
    ],
    answer: "Từ một nước nông nghiệp lạc hậu tiến thẳng lên CNXH, không qua giai đoạn tư bản chủ nghĩa."
  },
  {
    id: 13,
    question: "Trong thời kỳ quá độ, giữa 'cải tạo' xã hội cũ và 'xây dựng' xã hội mới, Hồ Chí Minh xác định nhiệm vụ nào là trọng tâm, lâu dài?",
    options: [
      "Cải tạo xã hội cũ là nhiệm vụ then chốt nhất.",
      "Xây dựng các yếu tố mới là nhiệm vụ chủ chốt và lâu dài.",
      "Hai nhiệm vụ có vai trò ngang nhau trong mọi giai đoạn.",
      "Chỉ cần cải tạo xã hội cũ, xã hội mới sẽ tự động hình thành."
    ],
    answer: "Xây dựng các yếu tố mới là nhiệm vụ chủ chốt và lâu dài."
  },
  {
    id: 14,
    question: "Hồ Chí Minh nhắc nhở cán bộ phải chống lại 'kẻ địch bên trong' nào để xây dựng CNXH thành công?",
    options: [
      "Những người có ý kiến khác biệt trong các cuộc họp.",
      "Chủ nghĩa cá nhân, tham ô, lãng phí và quan liêu.",
      "Sự thâm nhập của các trào lưu văn hóa phương Tây.",
      "Những người lao động có trình độ tay nghề thấp."
    ],
    answer: "Chủ nghĩa cá nhân, tham ô, lãng phí và quan liêu."
  },
  {
    id: 15,
    question: "Nguyên tắc 'đoàn kết, học tập kinh nghiệm của các nước anh em' trong tư tưởng Hồ Chí Minh yêu cầu điều gì?",
    options: [
      "Sao chép nguyên văn mô hình xây dựng của Liên Xô và Trung Quốc.",
      "Chỉ học tập các nước có điều kiện địa lý và lịch sử giống hệt Việt Nam.",
      "Học tập kinh nghiệm nhưng không áp đặt máy móc, phải vận dụng sáng tạo.",
      "Tuyệt đối không học tập bất cứ điều gì để giữ gìn bản sắc dân tộc."
    ],
    answer: "Học tập kinh nghiệm nhưng không áp đặt máy móc, phải vận dụng sáng tạo."
  }
];

export const rewards = [
  "Thưởng +500",
  "Nhân đôi x2",
  "Siêu cấp +1000",
  "May mắn x1.5",
  "Khích lệ +200"
];