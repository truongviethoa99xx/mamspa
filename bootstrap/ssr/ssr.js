import { jsx } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const blog$4 = {
  story: "Câu chuyện từ thiên nhiên",
  readArticle: "Đọc bài viết",
  readMore: "Đọc tiếp",
  loadMore: "Tải thêm",
  loading: "Đang tải...",
  empty: "Chưa có bài viết nào.",
  author: "Chuyên gia Mầm Spa",
  minRead: "{{count}} phút đọc",
  related: "Bài viết nổi bật",
  ctaEyebrow: "Trải nghiệm thực tế",
  ctaTitle: "Dịch vụ Head Spa",
  ctaDesc: "Đánh thức vẻ bóng khỏe của mái tóc với liệu trình gội thảo mộc chuyên sâu.",
  ctaButton: "Tìm hiểu thêm"
};
const bookingForm$4 = {
  eyebrow: "Reserve your moment of peace",
  title: "Đặt lịch trải nghiệm",
  thankYou: "Cảm ơn quý khách đã gửi yêu cầu. Đội ngũ Mầm Spa sẽ liên hệ trong thời gian sớm nhất để xác nhận lịch hẹn và chuẩn bị chu đáo cho trải nghiệm của quý khách.",
  sectionLocation: "Số khách & Dịch vụ",
  sectionDatetime: "Chọn ngày & Giờ trải nghiệm",
  sectionContact: "Thông tin liên hệ",
  guestCount: "Tổng số khách",
  guestTotal: "Tổng",
  people: "Người",
  male: "Nam",
  female: "Nữ",
  choosePerGuest: "Vui lòng chọn dịch vụ tương ứng cho từng khách:",
  guestMale: "Khách Nam",
  guestFemale: "Khách Nữ",
  chooseService: "Chọn dịch vụ",
  morning: "Buổi sáng",
  afternoon: "Buổi chiều",
  evening: "Buổi tối",
  pickDate: "Vui lòng chọn ngày để xem khung giờ.",
  noSlots: "Không có khung giờ trống cho ngày này.",
  timePlaceholder: "--:--",
  timeHint: "Mở cửa {{open}} - {{close}}",
  name: "Họ và tên",
  namePlaceholder: "Nhập tên của bạn",
  phone: "Số điện thoại",
  phonePlaceholder: "Nhập số điện thoại",
  email: "Email (Gmail)",
  emailPlaceholder: "Nhập Gmail của bạn",
  emailHint: "Nhận mail xác nhận booking qua email này",
  contactChannel: "Kênh liên hệ trực tuyến (Contact Method)",
  contactValuePlaceholder: "SĐT / ID Tài khoản",
  note: "Ghi chú cho Spa (Không bắt buộc)",
  notePlaceholder: "Tình trạng sức khỏe, yêu cầu KTV, lưu ý thai kỳ...",
  summaryTitle: "Tóm tắt đặt lịch",
  summaryPlace: "Địa điểm",
  summaryDatetime: "Thời gian",
  summaryCustomers: "Khách hàng",
  subtotal: "Tạm tính",
  voucher: "Khuyến mãi / Voucher",
  total: "Tổng cộng",
  confirm: "Xác nhận đặt lịch",
  processing: "Đang xử lý...",
  channelZalo: "Zalo",
  channelWhatsapp: "WhatsApp",
  channelPhone: "Điện thoại"
};
const nav$4 = {
  home: "Trang chủ",
  about: "Giới thiệu",
  services: "Dịch vụ",
  booking: "Đặt lịch",
  voucher: "Voucher",
  gallery: "Thư viện",
  blog: "Tin tức",
  contact: "Liên hệ",
  myBookings: "Lịch của tôi",
  login: "Đăng nhập",
  register: "Đăng ký",
  logout: "Đăng xuất",
  toggleMenu: "Mở menu",
  offers: "Ưu đãi",
  experience: "Trải nghiệm khách hàng"
};
const common$4 = {
  loading: "Đang tải...",
  submit: "Gửi",
  cancel: "Huỷ",
  save: "Lưu",
  back: "Quay lại",
  next: "Tiếp tục",
  viewMore: "Xem thêm",
  bookNow: "Đặt lịch ngay",
  readMore: "Đọc thêm",
  all: "Tất cả",
  processing: "Đang xử lý...",
  minute: "phút",
  closeBanner: "Đóng banner",
  chat: "Chat",
  apply: "Áp dụng",
  backToTop: "Lên đầu trang"
};
const home$4 = {
  hero: {
    eyebrow: "Rooted in Vietnamese Healing Traditions",
    title: "Hành trình cân bằng Thân - Tâm - Trí",
    heading: "Hành trình\nchữa lành từ thiên nhiên",
    body: "Gác lại những bộn bề của nhịp sống hối hả, mời bạn bước vào\nkhông gian Indochine tĩnh lặng để lắng nghe cơ thể và vỗ về tâm hồn.",
    explore: "Khám phá",
    subtitle: "Mầm Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng"
  }
};
const footer$4 = {
  tagline: "The Beginning of the Journey to Balance Body - Mind - Spirit",
  description: "Không gian trị liệu lấy cảm hứng từ y học cổ truyền Việt Nam — nơi cơ thể được chăm sóc và tâm trí được nghỉ ngơi trọn vẹn.",
  ctaLine1: "Dành một khoảng lặng",
  ctaLine2: "cho chính mình",
  bookNow: "Đặt lịch ngay",
  servicesTitle: "Dịch vụ",
  exploreTitle: "Khám phá",
  contact: "Liên hệ",
  follow: "Theo dõi chúng tôi",
  hotline: "Tổng đài đặt lịch",
  address: "Địa chỉ",
  hours: "Giờ đón khách",
  holiday: "(Mở cửa cả Lễ, Tết)",
  viewMap: "Xem bản đồ đường đi",
  privacy: "Chính sách bảo mật",
  terms: "Điều khoản dịch vụ",
  support: "Hỗ trợ khách hàng",
  rights: "© {{year}} Mầm Spa. All rights reserved.",
  paymentGuide: "Hướng dẫn thanh toán",
  guidelines: "Lưu ý dịch vụ"
};
const services$4 = {
  category: {
    all: "Tất cả",
    massage: "Body Massage",
    facial: "Facial",
    "head-spa": "Head Spa",
    "foot-spa": "Foot Spa",
    combo: "Combo"
  },
  empty: "Không có dịch vụ phù hợp.",
  ingredients: "Nguyên liệu"
};
const about$4 = {
  title: "Hành trình cân bằng",
  subtitle: "Một khoảng nghỉ nhỏ giữa Sài Gòn vội vã",
  features: {
    headSpa: "Thư giãn sâu, nuôi dưỡng da đầu.",
    bodyMassage: "Giảm căng cơ, phục hồi năng lượng.",
    herbal: "Thảo mộc tự nhiên, cân bằng thân – tâm.",
    tea: "Trà thảo mộc ấm nóng, kết thúc hành trình thư giãn."
  },
  story: {
    eyebrow: "Mầm Spa — Câu chuyện thương hiệu",
    heading: "Khởi nguồn hành trình chữa lành Thân – Tâm – Trí",
    p1: 'Xuất phát từ niềm tin vào sự kết nối sâu sắc giữa con người và thiên nhiên, Mầm Spa ra đời như một "khoảng nghỉ nhỏ giữa Sài Gòn vội vã". Đây là nơi mọi lo toan thường nhật tan biến để nhường chỗ cho sự bình yên sâu lắng.',
    p2: "Với hai không gian mang đậm dấu ấn: Lê Văn Sỹ mang hơi thở Sài Gòn xưa mộc mạc và Lê Thị Riêng hiện đại, riêng tư. Bằng sự tận tâm và tinh tế, Mầm hứa hẹn mang đến trải nghiệm phục hồi hoàn hảo qua từng điểm chạm."
  },
  vision: {
    title: "Tầm nhìn & Sứ mệnh",
    p1: 'Đi từ khát vọng tạo ra một không gian chữa lành đích thực giữa lòng thành phố nhộn nhịp, Mầm Spa hướng đến việc trở thành một "khoảng nghỉ nhỏ" lý tưởng cho những ai kiếm tìm sự an yên và phục hồi.',
    p2: "Chúng tôi tin rằng thư giãn không chỉ là giải tỏa mệt mỏi thể chất, mà còn là hành trình chăm sóc vẹn tròn Thân - Tâm - Trí, đưa bạn về lại trạng thái cân bằng tự nhiên nhất. Đến với Mầm, bạn có quyền lựa chọn sắc thái chữa lành phù hợp với chính mình:",
    b1: "Nơi giao thoa của nét mộc mạc Sài Gòn xưa, dành cho những ai yêu sự bình dị, ấm áp và kết nối.",
    b2: "Không gian tĩnh lặng, hiện đại với những trải nghiệm phục hồi chuyên sâu và mang tính cá nhân hoá cao.",
    eyebrow: "Rooted in Vietnamese Healing Traditions"
  },
  values: {
    title: "Giá trị cốt lõi",
    t1: "Tận tâm & Chuyên nghiệp",
    d1: "Đội ngũ kỹ thuật viên được đào tạo bài bản, am hiểu sâu sắc về huyệt đạo và các phương pháp trị liệu truyền thống, mang đến cho bạn sự an tâm tuyệt đối khi trải nghiệm.",
    t2: "Trải nghiệm Cá nhân hóa",
    d2: "Chúng tôi luôn lắng nghe cơ thể bạn. Mỗi liệu trình đều được tinh chỉnh linh hoạt để phù hợp với thể trạng và nhu cầu phục hồi riêng biệt của từng vị khách.",
    t3: "Tinh tế từng điểm chạm",
    d3: "Sự chỉn chu thể hiện qua từng chi tiết: từ tách trà ấm đón khách, hương thảo mộc thoang thoảng, cho đến không gian tĩnh lặng tách biệt hoàn toàn khỏi phố thị ồn ào.",
    eyebrow: "Rooted in Vietnamese Healing Traditions"
  },
  team: {
    eyebrow: "Những người trao gửi sự bình yên",
    title: "Đội ngũ chăm sóc tận tâm",
    m1Role: "Kỹ thuật viên Trưởng",
    m1Desc: "Hơn 10 năm kinh nghiệm trong các liệu pháp massage truyền thống và phục hồi chuyên sâu.",
    m2Role: "Chuyên gia Thảo mộc",
    m2Desc: "Tận tâm nghiên cứu, phát triển các công thức trà và tinh dầu thảo dược độc quyền của Mầm Spa.",
    m3Role: "Chuyên viên Head Spa",
    m3Desc: "Thấu hiểu sâu sắc về chăm sóc da đầu và kỹ thuật gội dưỡng sinh giúp bạn thư giãn hoàn toàn."
  },
  reviews: {
    eyebrow: "Chia sẻ từ những người thương",
    title: "Cảm nhận của khách hàng",
    videoCaption: "Trải nghiệm chữa lành tại Mầm",
    quote: "Một không gian thực sự bình yên giữa lòng Sài Gòn. Các bạn kỹ thuật viên làm rất có tâm, mình đã có một giấc ngủ thật ngon sau liệu trình massage và gội đầu. Cảm ơn Mầm Spa!",
    author: "Chị Vivian – Khách hàng thân thiết",
    like: "Yêu thích"
  },
  hero: {
    eyebrow: "A Vietnamese Healing Journey",
    retreat: "A retreat for body, mind & soul."
  },
  featureTitles: {
    headSpa: "Head Spa Therapy",
    bodyMassage: "Body Massage",
    herbal: "Herbal Therapy",
    tea: "Tea Ritual"
  }
};
const dichvu$4 = {
  eyebrow: "A journey to balance your body, mind & soul",
  title: "Menu dịch vụ",
  searchPlaceholder: "Tìm dịch vụ (VD: Gội đầu thảo mộc, Trị liệu cổ vai gáy...)",
  searchButton: "Tìm kiếm",
  combos: {
    eyebrow: "Hành trình chăm sóc vẹn tròn",
    title: "Các gói Mầm Combo",
    bestseller: "Bán chạy nhất"
  },
  results: {
    eyebrow: "Kết quả tìm kiếm",
    titleWithQuery: "Kết quả cho “{{query}}”",
    title: "Tất cả dịch vụ",
    count: "Tìm thấy {{count}} dịch vụ phù hợp",
    empty: "Không tìm thấy dịch vụ phù hợp. Vui lòng thử từ khoá khác.",
    clear: "Xoá bộ lọc"
  },
  category: {
    subcategoriesEyebrow: "Khám phá thêm",
    subcategoriesTitle: "Danh mục con",
    servicesEyebrow: "Dịch vụ nổi bật",
    servicesTitle: "Các gói dịch vụ"
  },
  massage: {
    title: "Dịch vụ Massage trị liệu",
    d1: "Giải toả căng thẳng, giảm đau nhức vùng cổ vai gáy hiệu quả.",
    d2: "Ấn huyệt lòng bàn chân, kích thích tuần hoàn máu và phục hồi sinh lực.",
    d3: "Trị liệu toàn thân chuyên sâu, xua tan mệt mỏi cơ bắp và thanh lọc tâm trí."
  },
  detail: {
    consult: "Nhận tư vấn",
    getOffer: "Nhận ưu đãi ngay",
    benefitsEyebrow: "Hiểu rõ cơ thể, chọn đúng liệu trình",
    benefitsTitle: "Lợi ích & đối tượng phù hợp",
    benefitsHeading: "Lợi ích liệu trình",
    idealHeading: "Đặc biệt khuyên dùng cho:",
    faqEyebrow: "Mầm giải đáp cùng bạn",
    faqTitle: "Câu hỏi thường gặp",
    relatedEyebrow: "Continue your healing journey",
    relatedTitle: "Tham khảo dịch vụ khác",
    stepsEyebrow: "Trải nghiệm từng bước",
    stepsTitle: "Quy trình liệu trình",
    experienceEyebrow: "Khoảnh khắc tại Mầm Spa",
    experienceTitle: "Hình ảnh trải nghiệm khách hàng",
    categoryServicesEyebrow: "Hành trình chăm sóc vẹn tròn"
  }
};
const booking$4 = {
  steps: {
    service: "Dịch vụ",
    datetime: "Ngày giờ",
    info: "Thông tin",
    confirm: "Xác nhận"
  },
  selectService: "Chọn dịch vụ",
  selectDateTime: "Chọn ngày & khung giờ",
  contactInfo: "Thông tin liên hệ",
  confirmTitle: "Xác nhận booking",
  field: {
    name: "Họ và tên",
    phone: "Số điện thoại",
    email: "Email",
    note: "Ghi chú",
    voucher: "Voucher",
    paymentMethod: "Phương thức thanh toán"
  },
  voucher: {
    apply: "Áp dụng",
    discount: "Giảm {{amount}}"
  },
  payment: {
    cash: "Thanh toán tại spa",
    vnpay: "VNPay",
    momo: "MoMo",
    card: "Thẻ Visa/Master"
  },
  summary: {
    service: "Dịch vụ",
    date: "Ngày",
    time: "Giờ",
    guest: "Khách",
    total: "Tổng cộng"
  },
  confirm: "Xác nhận đặt lịch",
  slotsAvailable: "{{available}}/{{capacity}} còn trống"
};
const bookingSuccess$4 = {
  title: "Đặt lịch thành công!",
  code: "Mã booking",
  emailSent: "Chúng tôi đã gửi email xác nhận cho bạn.",
  backHome: "Về trang chủ"
};
const myBookings$4 = {
  empty: "Bạn chưa có booking nào.",
  bookOne: "Đặt lịch ngay",
  confirmCancel: "Huỷ booking {{code}}?",
  payVnpay: "Thanh toán VNPay",
  cancelBooking: "Huỷ lịch",
  lookupTitle: "Tra cứu lịch đặt khác",
  lookupDesc: "Nhập số điện thoại và mã booking (có trong email/SMS xác nhận) để xem toàn bộ lịch đặt theo số điện thoại đó.",
  lookupPhonePlaceholder: "Số điện thoại",
  lookupCodePlaceholder: "Mã booking (vd. MSABC123)",
  lookupButton: "Tra cứu",
  status: {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Hoàn thành",
    cancelled: "Đã huỷ"
  }
};
const auth$4 = {
  login: "Đăng nhập",
  register: "Đăng ký",
  email: "Email",
  password: "Mật khẩu",
  passwordConfirm: "Nhập lại mật khẩu",
  name: "Họ tên",
  phone: "Số điện thoại",
  remember: "Ghi nhớ đăng nhập",
  orContinueWith: "Hoặc tiếp tục với",
  loginWithGoogle: "Đăng nhập bằng Google",
  noAccount: "Chưa có tài khoản?",
  haveAccount: "Đã có tài khoản?"
};
const contact$4 = {
  form: {
    name: "Họ tên",
    email: "Email",
    phone: "Số điện thoại",
    subject: "Chủ đề",
    message: "Nội dung",
    title: "Gửi lời nhắn",
    subtitle: "Mầm sẽ phản hồi bạn trong thời gian sớm nhất."
  }
};
const blocks$4 = {
  services: {
    eyebrow: "Healing in every detail"
  },
  testimonial: {
    eyebrow: "Lắng nghe những trải nghiệm chân thực",
    title: "Đánh giá từ khách hàng",
    ratingLabel: "Xuất sắc",
    basedOn: "Dựa trên {{count}} đánh giá",
    readMore: "Xem thêm",
    video: "Video review khách hàng"
  },
  bookingForm: {
    title: "Yêu cầu đặt lịch",
    name: "Tên khách hàng",
    namePlaceholder: "Nhập tên của bạn",
    phone: "Số điện thoại",
    phonePlaceholder: "Nhập số điện thoại",
    phoneCountrySearchPlaceholder: "Tìm quốc gia hoặc mã vùng...",
    phoneCountryEmpty: "Không tìm thấy quốc gia",
    email: "Email (Gmail)",
    emailPlaceholder: "example@gmail.com",
    channel: "Kênh liên hệ trực tuyến",
    channelPlaceholder: "SĐT / ID Tài khoản",
    date: "Ngày",
    time: "Thời gian",
    timeSearchPlaceholder: "Tìm khung giờ...",
    timeSearchEmpty: "Không tìm thấy khung giờ",
    guests: "Tổng số khách",
    total: "Tổng",
    people: "Người",
    male: "Nam",
    female: "Nữ",
    chooseService: "Chọn dịch vụ cho từng khách",
    guestMale: "Khách Nam",
    guestFemale: "Khách Nữ",
    servicePlaceholder: "Chọn dịch vụ",
    serviceSearchPlaceholder: "Tìm dịch vụ...",
    serviceEmpty: "Không tìm thấy dịch vụ",
    serviceRequired: "Vui lòng chọn dịch vụ cho từng khách.",
    note: "Ghi chú thêm (Không bắt buộc)",
    notePlaceholder: "Tình trạng sức khỏe, yêu cầu kỹ thuật viên, hoặc bất kỳ lưu ý nào...",
    submit: "Gửi yêu cầu đặt lịch",
    success: {
      title: "Yêu cầu đã được gửi!",
      message: "Cảm ơn quý khách đã gửi yêu cầu đặt lịch. Đội ngũ Mầm Spa sẽ liên hệ trong thời gian sớm nhất để xác nhận lịch hẹn và chuẩn bị chu đáo cho trải nghiệm của quý khách.",
      codeLabel: "Mã yêu cầu của bạn",
      home: "Trở về trang chủ"
    }
  },
  menu: {
    title: "Menu dịch vụ",
    book: "Đặt lịch",
    minute: "Phút",
    cat: {
      combo: "Signature Combo",
      massage: "Massage Therapies",
      "head-spa": "Head Spa",
      facial: "Facial Treatments",
      "foot-spa": "Others"
    }
  },
  whyUs: {
    eyebrow: "Vì sao chọn Mầm Spa"
  },
  gallery: {
    eyebrow: "Thư viện ảnh",
    viewMore: "Xem thêm hình ảnh"
  }
};
const paymentGuide$1 = {
  eyebrow: "Mầm Spa",
  title: "Hướng dẫn thanh toán",
  subtitle: "Những lưu ý nhỏ về thanh toán, để hành trình tại Mầm luôn nhẹ nhàng và trọn vẹn.",
  metaDescription: "Hướng dẫn các phương thức thanh toán tại Mầm Spa: tiền mặt, chuyển khoản, thẻ Visa/Mastercard/JCB, ví điện tử MoMo/VNPay/ZaloPay và xuất hóa đơn VAT.",
  sections: {
    methods: {
      title: "Phương thức thanh toán",
      p1: "Để khoảnh khắc thư thái của bạn trọn vẹn đến tận khi rời đi, Mầm chuẩn bị nhiều cách thanh toán để bạn thật thong thả lựa chọn.",
      p2: "Bạn có thể thanh toán bằng tiền mặt, chuyển khoản ngân hàng, thẻ hoặc ví điện tử — tùy theo điều khiến bạn thấy thuận tiện nhất.",
      p3: "Mọi giao dịch đều được thực hiện nhẹ nhàng, rõ ràng ngay tại quầy lễ tân."
    },
    cards: {
      title: "Thẻ & Ví điện tử",
      p1: "Mầm trân trọng đón nhận hầu hết các loại thẻ quốc tế: Visa, Mastercard, JCB, American Express, UnionPay và Apple Pay.",
      p2: "Với những ai quen dùng ví điện tử, Mầm cũng sẵn sàng với MoMo, VNPay và ZaloPay.",
      p3: "Chỉ một chạm, phần thanh toán khép lại để bạn giữ trọn cảm giác an yên mang về."
    },
    transfer: {
      title: "Chuyển khoản ngân hàng",
      p1: "Nếu bạn muốn chuyển khoản, lễ tân sẽ gửi bạn thông tin tài khoản của Mầm một cách chu đáo.",
      p2: "Bạn chỉ cần ghi rõ tên và số điện thoại đặt lịch trong nội dung chuyển khoản, để Mầm đối soát thật nhanh.",
      p3: "Khi giao dịch hoàn tất, Mầm sẽ xác nhận lại để bạn hoàn toàn yên tâm."
    },
    invoice: {
      title: "Hóa đơn (VAT)",
      p1: "Mầm luôn sẵn lòng xuất hóa đơn VAT mỗi khi bạn cần.",
      p2: "Bạn chỉ cần chia sẻ thông tin xuất hóa đơn trước khi thanh toán, để Mầm chuẩn bị thật chính xác và trọn vẹn."
    },
    fees: {
      title: "Phụ phí & Hoàn tiền",
      p1: "Mầm mong mọi điều thật minh bạch, nên không có bất kỳ phụ phí nào cho các phương thức thanh toán.",
      p2: "Vào những dịp Quốc lễ, đôi khi có một khoản phụ thu nhỏ — Mầm sẽ luôn thông báo trước để bạn an tâm.",
      p3: "Với những trường hợp cần hoàn tiền, xin bạn nhắn với lễ tân — Mầm sẽ lắng nghe và hỗ trợ bạn một cách chu đáo nhất."
    }
  }
};
const notFound$4 = {
  title: "Không tìm thấy trang",
  heading: "404",
  description: "Xin lỗi, trang bạn tìm không tồn tại hoặc đã được di chuyển.",
  backHome: "Về trang chủ",
  suggestionsTitle: "Có thể bạn đang tìm:",
  exploreServices: "Khám phá dịch vụ",
  contact: "Liên hệ với Mầm"
};
const vi = {
  blog: blog$4,
  bookingForm: bookingForm$4,
  nav: nav$4,
  common: common$4,
  home: home$4,
  footer: footer$4,
  services: services$4,
  about: about$4,
  dichvu: dichvu$4,
  booking: booking$4,
  bookingSuccess: bookingSuccess$4,
  myBookings: myBookings$4,
  auth: auth$4,
  contact: contact$4,
  blocks: blocks$4,
  paymentGuide: paymentGuide$1,
  notFound: notFound$4
};
const blog$3 = {
  story: "Stories from nature",
  readArticle: "Read article",
  readMore: "Read more",
  loadMore: "Load more",
  loading: "Loading...",
  empty: "No posts yet.",
  author: "Mầm Spa Expert",
  minRead: "{{count}} min read",
  related: "Featured articles",
  ctaEyebrow: "Real experience",
  ctaTitle: "Head Spa Service",
  ctaDesc: "Awaken your hair's healthy shine with our in-depth herbal scalp treatment.",
  ctaButton: "Learn more"
};
const bookingForm$3 = {
  eyebrow: "Reserve your moment of peace",
  title: "Book Your Experience",
  thankYou: "Thank you for your booking request. Our team will contact you shortly to confirm your reservation and ensure every detail of your experience is thoughtfully prepared.",
  sectionLocation: "Guests & Services",
  sectionDatetime: "Choose Date & Time",
  sectionContact: "Contact Information",
  guestCount: "Total guests",
  guestTotal: "Total",
  people: "Guests",
  male: "Male",
  female: "Female",
  choosePerGuest: "Please choose a service for each guest:",
  guestMale: "Male guest",
  guestFemale: "Female guest",
  chooseService: "Choose a service",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  pickDate: "Please pick a date to see available times.",
  noSlots: "No available time slots for this date.",
  timePlaceholder: "--:--",
  timeHint: "Open hours: {{open}} - {{close}}",
  name: "Full name",
  namePlaceholder: "Enter your name",
  phone: "Phone number",
  phonePlaceholder: "Enter your phone number",
  email: "Email (Gmail)",
  emailPlaceholder: "Enter your Gmail",
  emailHint: "Get your booking confirmation by email",
  contactChannel: "Online contact method",
  contactValuePlaceholder: "Phone / Account ID",
  note: "Note for the spa (optional)",
  notePlaceholder: "Health conditions, therapist requests, pregnancy notes...",
  summaryTitle: "Booking summary",
  summaryPlace: "Location",
  summaryDatetime: "Time",
  summaryCustomers: "Customers",
  subtotal: "Subtotal",
  voucher: "Promotion / Voucher",
  total: "Total",
  confirm: "Confirm booking",
  processing: "Processing...",
  channelZalo: "Zalo",
  channelWhatsapp: "WhatsApp",
  channelPhone: "Phone"
};
const nav$3 = {
  home: "Home",
  about: "About",
  services: "Services",
  booking: "Book Now",
  voucher: "Voucher",
  gallery: "Gallery",
  blog: "Blog",
  contact: "Contact",
  myBookings: "My Bookings",
  login: "Sign In",
  register: "Sign Up",
  logout: "Sign Out",
  toggleMenu: "Toggle menu",
  offers: "Offers",
  experience: "Customer Experience"
};
const common$3 = {
  loading: "Loading...",
  submit: "Submit",
  cancel: "Cancel",
  save: "Save",
  back: "Back",
  next: "Next",
  viewMore: "View more",
  bookNow: "Book now",
  readMore: "Read more",
  all: "All",
  processing: "Processing...",
  minute: "min",
  closeBanner: "Close banner",
  chat: "Chat",
  apply: "Apply",
  backToTop: "Back to top"
};
const home$3 = {
  hero: {
    eyebrow: "Rooted in Vietnamese Healing Traditions",
    title: "The Journey to Balance Body - Mind - Spirit",
    heading: "A healing journey\nrooted in nature",
    body: "Set aside the rush of everyday life and step into a serene\nIndochine space to listen to your body and soothe your soul.",
    explore: "Explore",
    subtitle: "Mầm Spa — Traditional Vietnamese spa experience in Da Nang"
  }
};
const footer$3 = {
  tagline: "The Beginning of the Journey to Balance Body - Mind - Spirit",
  description: "A therapy space inspired by traditional Vietnamese medicine — where the body is cared for and the mind rests completely.",
  ctaLine1: "Take a quiet moment",
  ctaLine2: "just for yourself",
  bookNow: "Book now",
  servicesTitle: "Services",
  exploreTitle: "Explore",
  contact: "Contact",
  follow: "Follow us",
  hotline: "Booking hotline",
  address: "Address",
  hours: "Opening hours",
  holiday: "(Open on holidays & Tet)",
  viewMap: "View directions",
  privacy: "Privacy policy",
  terms: "Terms of service",
  support: "Customer support",
  rights: "© {{year}} Mầm Spa. All rights reserved.",
  paymentGuide: "Payment Guide",
  guidelines: "Service Guidelines"
};
const services$3 = {
  category: {
    all: "All",
    massage: "Body Massage",
    facial: "Facial",
    "head-spa": "Head Spa",
    "foot-spa": "Foot Spa",
    combo: "Combo"
  },
  empty: "No matching services.",
  ingredients: "Ingredients"
};
const about$3 = {
  title: "A journey to balance",
  subtitle: "A small pause amid the rush of Saigon",
  features: {
    headSpa: "Deep relaxation, nourishing the scalp.",
    bodyMassage: "Relieve tension, restore energy.",
    herbal: "Natural herbs, balancing body & mind.",
    tea: "Warm herbal tea to end the relaxing journey."
  },
  story: {
    eyebrow: "Mầm Spa — Brand story",
    heading: "The origin of a Body – Mind – Spirit healing journey",
    p1: 'Born from a belief in the deep connection between people and nature, Mầm Spa was created as a "small pause amid the rush of Saigon" — a place where everyday worries dissolve into profound calm.',
    p2: "With two distinctive spaces — Lê Văn Sỹ echoing the rustic charm of old Saigon, and Lê Thị Riêng modern and private — Mầm promises a perfect restorative experience through every touchpoint, with dedication and finesse."
  },
  vision: {
    title: "Vision & Mission",
    p1: 'Born from the aspiration to create a true healing space in the heart of a bustling city, Mầm Spa strives to be an ideal "small pause" for those seeking calm and restoration.',
    p2: "We believe relaxation is not only about easing physical fatigue, but a journey of complete Body - Mind - Spirit care that returns you to your most natural balance. At Mầm, you are free to choose the healing mood that suits you:",
    b1: "Where the rustic charm of old Saigon meets — for those who love simplicity, warmth and connection.",
    b2: "A serene, modern space with deeply restorative, highly personalised experiences.",
    eyebrow: "Rooted in Vietnamese Healing Traditions"
  },
  values: {
    title: "Core values",
    t1: "Dedication & Professionalism",
    d1: "Our therapists are rigorously trained, with deep knowledge of acupressure and traditional healing methods, giving you complete peace of mind.",
    t2: "Personalised experience",
    d2: "We always listen to your body. Every treatment is flexibly tailored to each guest's condition and unique recovery needs.",
    t3: "Refined in every touch",
    d3: "Care shows in every detail — from the warm welcome tea and subtle herbal scent to the serene space entirely apart from the noisy city.",
    eyebrow: "Rooted in Vietnamese Healing Traditions"
  },
  team: {
    eyebrow: "The people who deliver serenity",
    title: "A dedicated care team",
    m1Role: "Lead Therapist",
    m1Desc: "Over 10 years of experience in traditional massage and deep-recovery therapies.",
    m2Role: "Herbal Specialist",
    m2Desc: "Devoted to researching and developing Mầm Spa's exclusive tea and herbal oil formulas.",
    m3Role: "Head Spa Specialist",
    m3Desc: "A deep understanding of scalp care and wellness hair-washing techniques for complete relaxation."
  },
  reviews: {
    eyebrow: "Words from those we cherish",
    title: "What our guests say",
    videoCaption: "A healing experience at Mầm",
    quote: "A truly peaceful space in the heart of Saigon. The therapists are so dedicated — I had the best sleep after the massage and hair wash. Thank you, Mầm Spa!",
    author: "Ms. Vivian – Loyal customer",
    like: "Like"
  },
  hero: {
    eyebrow: "A Vietnamese Healing Journey",
    retreat: "A retreat for body, mind & soul."
  },
  featureTitles: {
    headSpa: "Head Spa Therapy",
    bodyMassage: "Body Massage",
    herbal: "Herbal Therapy",
    tea: "Tea Ritual"
  }
};
const dichvu$3 = {
  eyebrow: "A journey to balance your body, mind & soul",
  title: "Service Menu",
  searchPlaceholder: "Search a service (e.g. Herbal head spa, Neck & shoulder therapy...)",
  searchButton: "Search",
  combos: {
    eyebrow: "A complete care journey",
    title: "Mầm Combo packages",
    bestseller: "Best seller"
  },
  results: {
    eyebrow: "Search results",
    titleWithQuery: "Results for “{{query}}”",
    title: "All services",
    count: "Found {{count}} matching services",
    empty: "No matching services found. Try a different keyword.",
    clear: "Clear filters"
  },
  category: {
    subcategoriesEyebrow: "Explore more",
    subcategoriesTitle: "Sub-categories",
    servicesEyebrow: "Featured services",
    servicesTitle: "Service packages"
  },
  massage: {
    title: "Therapeutic massage services",
    d1: "Effectively releases tension and relieves neck-and-shoulder pain.",
    d2: "Foot reflexology that stimulates circulation and restores vitality.",
    d3: "Deep full-body therapy that melts muscle fatigue and clears the mind."
  },
  detail: {
    consult: "Get a consultation",
    getOffer: "Claim the offer",
    benefitsEyebrow: "Understand your body, choose the right therapy",
    benefitsTitle: "Benefits & who it's for",
    benefitsHeading: "Treatment benefits",
    idealHeading: "Especially recommended for:",
    faqEyebrow: "Mầm answers your questions",
    faqTitle: "Frequently asked questions",
    relatedEyebrow: "Continue your healing journey",
    relatedTitle: "Explore other services",
    stepsEyebrow: "A step-by-step experience",
    stepsTitle: "Treatment process",
    experienceEyebrow: "Moments at Mầm Spa",
    experienceTitle: "Customer experience gallery",
    categoryServicesEyebrow: "A complete care journey"
  }
};
const booking$3 = {
  steps: {
    service: "Service",
    datetime: "Date & time",
    info: "Your info",
    confirm: "Confirm"
  },
  selectService: "Select a service",
  selectDateTime: "Pick date & time",
  contactInfo: "Contact information",
  confirmTitle: "Confirm your booking",
  field: {
    name: "Full name",
    phone: "Phone number",
    email: "Email",
    note: "Note",
    voucher: "Voucher",
    paymentMethod: "Payment method"
  },
  voucher: {
    apply: "Apply",
    discount: "Discount {{amount}}"
  },
  payment: {
    cash: "Pay at the spa",
    vnpay: "VNPay",
    momo: "MoMo",
    card: "Visa/Master card"
  },
  summary: {
    service: "Service",
    date: "Date",
    time: "Time",
    guest: "Guest",
    total: "Total"
  },
  confirm: "Confirm booking",
  slotsAvailable: "{{available}}/{{capacity}} available"
};
const bookingSuccess$3 = {
  title: "Booking successful!",
  code: "Booking code",
  emailSent: "A confirmation email has been sent.",
  backHome: "Back to home"
};
const myBookings$3 = {
  empty: "You have no bookings yet.",
  bookOne: "Book now",
  confirmCancel: "Cancel booking {{code}}?",
  payVnpay: "Pay with VNPay",
  cancelBooking: "Cancel",
  lookupTitle: "Look up another booking",
  lookupDesc: "Enter your phone number and booking code (from your confirmation email/SMS) to see all bookings under that phone number.",
  lookupPhonePlaceholder: "Phone number",
  lookupCodePlaceholder: "Booking code (e.g. MSABC123)",
  lookupButton: "Look up",
  status: {
    pending: "Pending",
    confirmed: "Confirmed",
    completed: "Completed",
    cancelled: "Cancelled"
  }
};
const auth$3 = {
  login: "Sign In",
  register: "Sign Up",
  email: "Email",
  password: "Password",
  passwordConfirm: "Confirm password",
  name: "Name",
  phone: "Phone",
  remember: "Remember me",
  orContinueWith: "Or continue with",
  loginWithGoogle: "Sign in with Google",
  noAccount: "No account yet?",
  haveAccount: "Already have an account?"
};
const contact$3 = {
  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    title: "Send us a message",
    subtitle: "Mầm will get back to you as soon as possible."
  }
};
const blocks$3 = {
  services: {
    eyebrow: "Healing in every detail"
  },
  testimonial: {
    eyebrow: "Hear real experiences",
    title: "Customer reviews",
    ratingLabel: "Excellent",
    basedOn: "Based on {{count}} reviews",
    readMore: "Read more",
    video: "Customer video review"
  },
  bookingForm: {
    title: "Booking request",
    name: "Customer name",
    namePlaceholder: "Enter your name",
    phone: "Phone number",
    phonePlaceholder: "Enter phone number",
    phoneCountrySearchPlaceholder: "Search country or dial code...",
    phoneCountryEmpty: "No country found",
    email: "Email (Gmail)",
    emailPlaceholder: "example@gmail.com",
    channel: "Online contact channel",
    channelPlaceholder: "Phone / Account ID",
    date: "Date",
    time: "Time",
    timeSearchPlaceholder: "Search time slot...",
    timeSearchEmpty: "No time slot found",
    guests: "Number of guests",
    total: "Total",
    people: "People",
    male: "Male",
    female: "Female",
    chooseService: "Choose a service for each guest",
    guestMale: "Male guest",
    guestFemale: "Female guest",
    servicePlaceholder: "Select a service",
    serviceSearchPlaceholder: "Search services...",
    serviceEmpty: "No services found",
    serviceRequired: "Please choose a service for each guest.",
    note: "Additional note (optional)",
    notePlaceholder: "Health conditions, therapist requests, or any notes...",
    submit: "Complete booking",
    success: {
      title: "Your request has been sent!",
      message: "Thank you for your booking request. Our team will contact you shortly to confirm your reservation and ensure every detail of your experience is thoughtfully prepared.",
      codeLabel: "Your request code",
      home: "Back to home"
    }
  },
  menu: {
    title: "Service Menu",
    book: "Book now",
    minute: "Min",
    cat: {
      combo: "Signature Combo",
      massage: "Massage Therapies",
      "head-spa": "Head Spa",
      facial: "Facial Treatments",
      "foot-spa": "Others"
    }
  },
  whyUs: {
    eyebrow: "Why Mầm Spa"
  },
  gallery: {
    eyebrow: "Gallery",
    viewMore: "View more photos"
  }
};
const paymentGuide = {
  eyebrow: "Mầm Spa",
  title: "Payment Guide",
  subtitle: "A few gentle notes on payment, so your journey at Mầm stays light and complete.",
  metaDescription: "Payment guide at Mầm Spa: cash, bank transfer, Visa/Mastercard/JCB cards, MoMo/VNPay/ZaloPay e-wallets and VAT invoices.",
  sections: {
    methods: {
      title: "Payment methods",
      p1: "So your moment of calm stays whole until you leave, Mầm offers several ways to pay — at your own ease.",
      p2: "You may pay by cash, bank transfer, card or e-wallet — whichever feels most convenient to you.",
      p3: "Every transaction is handled gently and clearly, right at the reception."
    },
    cards: {
      title: "Cards & E-wallets",
      p1: "Mầm warmly welcomes most international cards: Visa, Mastercard, JCB, American Express, UnionPay and Apple Pay.",
      p2: "For those who prefer e-wallets, Mầm is also ready with MoMo, VNPay and ZaloPay.",
      p3: "Just one tap and payment is done, so you keep that feeling of calm to carry home."
    },
    transfer: {
      title: "Bank transfer",
      p1: "If you'd like to transfer, our reception will kindly share Mầm's account details with you.",
      p2: "Simply note your name and booking phone number in the transfer, so Mầm can reconcile it quickly.",
      p3: "Once the transfer is complete, Mầm will confirm with you so you can be fully at ease."
    },
    invoice: {
      title: "VAT invoice",
      p1: "Mầm is always happy to issue a VAT invoice whenever you need one.",
      p2: "Just share your invoicing details before payment, so Mầm can prepare everything accurately and completely."
    },
    fees: {
      title: "Surcharges & Refunds",
      p1: "Mầm wishes everything to be transparent, so there is no surcharge for any payment method.",
      p2: "On public holidays there may be a small surcharge — Mầm will always let you know in advance.",
      p3: "If a refund is ever needed, please let our reception know — Mầm will listen and help you with the utmost care."
    }
  }
};
const notFound$3 = {
  title: "Page not found",
  heading: "404",
  description: "Sorry, the page you're looking for doesn't exist or has been moved.",
  backHome: "Back to home",
  suggestionsTitle: "You might be looking for:",
  exploreServices: "Explore services",
  contact: "Contact Mầm Spa"
};
const en = {
  blog: blog$3,
  bookingForm: bookingForm$3,
  nav: nav$3,
  common: common$3,
  home: home$3,
  footer: footer$3,
  services: services$3,
  about: about$3,
  dichvu: dichvu$3,
  booking: booking$3,
  bookingSuccess: bookingSuccess$3,
  myBookings: myBookings$3,
  auth: auth$3,
  contact: contact$3,
  blocks: blocks$3,
  paymentGuide,
  notFound: notFound$3
};
const blog$2 = {
  story: "自然からの物語",
  readArticle: "記事を読む",
  readMore: "続きを読む",
  loadMore: "もっと見る",
  loading: "読み込み中...",
  empty: "まだ投稿がありません。",
  author: "Mầm Spa スペシャリスト",
  minRead: "約{{count}}分で読めます",
  related: "注目の記事",
  ctaEyebrow: "実際の体験",
  ctaTitle: "ヘッドスパサービス",
  ctaDesc: "本格的なハーブ頭皮トリートメントで髪の健やかなツヤを呼び覚まします。",
  ctaButton: "詳しく見る"
};
const bookingForm$2 = {
  eyebrow: "Reserve your moment of peace",
  title: "ご予約",
  thankYou: "ご予約リクエストありがとうございます。Mầm Spa のスタッフがまもなくご連絡し、ご予約の確認と最高の体験のための準備をいたします。",
  sectionLocation: "店舗とサービスの選択",
  sectionDatetime: "日付と時間の選択",
  sectionContact: "連絡先情報",
  selectBranch: "店舗を選択",
  guestCount: "合計人数",
  guestTotal: "合計",
  people: "名",
  male: "男性",
  female: "女性",
  choosePerGuest: "各ゲストのサービスをお選びください：",
  guestMale: "男性ゲスト",
  guestFemale: "女性ゲスト",
  chooseService: "サービスを選択",
  morning: "午前",
  afternoon: "午後",
  evening: "夜",
  pickDate: "日付を選択すると空き時間が表示されます。",
  noSlots: "この日に空き時間はありません。",
  name: "お名前",
  namePlaceholder: "お名前を入力",
  phone: "電話番号",
  phonePlaceholder: "電話番号を入力",
  email: "メール (Gmail)",
  emailPlaceholder: "Gmail を入力",
  emailHint: "このメールで予約確認メールを受け取ります",
  contactChannel: "オンライン連絡方法",
  contactValuePlaceholder: "電話 / アカウントID",
  note: "スパへのご要望（任意）",
  notePlaceholder: "健康状態、セラピストのご希望、妊娠中の注意点など…",
  summaryTitle: "予約内容",
  summaryPlace: "店舗",
  summaryDatetime: "日時",
  summaryCustomers: "お客様",
  subtotal: "小計",
  voucher: "プロモーション / バウチャー",
  total: "合計",
  confirm: "予約を確定する",
  processing: "処理中...",
  channelZalo: "Zalo",
  channelMessenger: "Messenger",
  channelWhatsapp: "WhatsApp",
  channelPhone: "電話"
};
const nav$2 = {
  home: "ホーム",
  about: "について",
  services: "サービス",
  booking: "予約する",
  voucher: "バウチャー",
  gallery: "ギャラリー",
  blog: "ブログ",
  contact: "お問い合わせ",
  myBookings: "予約履歴",
  login: "ログイン",
  register: "新規登録",
  logout: "ログアウト",
  toggleMenu: "メニュー"
};
const common$2 = {
  loading: "読み込み中...",
  submit: "送信",
  cancel: "キャンセル",
  save: "保存",
  back: "戻る",
  next: "次へ",
  viewMore: "もっと見る",
  bookNow: "今すぐ予約",
  readMore: "続きを読む",
  all: "すべて",
  processing: "処理中...",
  minute: "分",
  closeBanner: "閉じる",
  chat: "チャット",
  apply: "適用"
};
const home$2 = {
  hero: {
    eyebrow: "Rooted in Vietnamese Healing Traditions",
    title: "身体・心・精神のバランスへの旅",
    heading: "自然がもたらす癒やしの旅",
    body: "慌ただしい日常を離れ、静かなインドシナ空間で身体に耳を傾け、心をやさしく癒やすひとときへ。",
    explore: "探索",
    subtitle: "マハスパ — ダナンで体験するベトナム伝統スパ"
  }
};
const footer$2 = {
  tagline: "身体・心・精神のバランスへの旅の始まり",
  branches: "店舗",
  contact: "お問い合わせ",
  follow: "フォローする",
  hotline: "予約ホットライン",
  address: "住所",
  hours: "営業時間",
  holiday: "（祝日・テト営業）",
  viewMap: "地図・ルートを見る",
  privacy: "プライバシーポリシー",
  terms: "利用規約",
  support: "カスタマーサポート",
  rights: "© {{year}} Mầm Spa. 無断転載禁止。"
};
const services$2 = {
  category: {
    all: "すべて",
    massage: "ボディマッサージ",
    facial: "フェイシャル",
    "head-spa": "ヘッドスパ",
    "foot-spa": "フットスパ",
    combo: "コンボ"
  },
  allBranches: "全店舗",
  empty: "該当するサービスがありません。",
  ingredients: "使用素材"
};
const about$2 = {
  title: "バランスへの旅",
  subtitle: "慌ただしいサイゴンの中の小さな休息",
  features: {
    headSpa: "深いリラックスと頭皮ケア。",
    bodyMassage: "コリをほぐし、エネルギーを回復。",
    herbal: "天然ハーブで心身を整える。",
    tea: "温かいハーブティーで癒やしの締めくくり。"
  },
  story: {
    eyebrow: "Mầm Spa — ブランドストーリー",
    heading: "心・身体・精神を癒やす旅のはじまり",
    p1: "人と自然の深いつながりへの信念から生まれた Mầm Spa は、「慌ただしいサイゴンの中の小さな休息」として誕生しました。日常の悩みが消え、深い安らぎに満たされる場所です。",
    p2: "個性豊かな2つの空間——古きサイゴンの素朴さを宿すレ・ヴァン・シー店と、モダンでプライベートなレ・ティ・リエン店。Mầm は真心と繊細さで、一つひとつの瞬間に完璧な回復体験をお届けします。"
  },
  vision: {
    title: "ビジョンとミッション",
    p1: "賑やかな街の中心に本物の癒やしの空間をつくりたいという想いから、Mầm Spa は安らぎと回復を求める人のための理想の「小さな休息」を目指します。",
    p2: "リラクゼーションは身体の疲れを癒やすだけでなく、心・身体・精神を丸ごと整え、最も自然なバランスへと導く旅だと私たちは信じています。Mầm では、自分に合った癒やしのスタイルを選べます：",
    b1: "古きサイゴンの素朴さが交わる場所。素朴さ、温もり、つながりを愛する方へ。",
    b2: "静かでモダンな空間。深く、高度にパーソナライズされた回復体験を。",
    eyebrow: "ベトナムの伝統的な癒しに根ざして"
  },
  values: {
    title: "コアバリュー",
    t1: "誠心と専門性",
    d1: "当店のセラピストは入念な研修を受け、経穴や伝統的な施術法に精通。安心してお寛ぎいただけます。",
    t2: "パーソナライズ体験",
    d2: "お客様の身体に常に耳を傾けます。各施術は体調と回復ニーズに合わせて柔軟に調整します。",
    t3: "細部まで繊細に",
    d3: "温かいウェルカムティー、ほのかなハーブの香り、街の喧騒から離れた静寂な空間まで、細部に心を込めて。",
    eyebrow: "ベトナムの伝統的な癒しに根ざして"
  },
  team: {
    eyebrow: "安らぎを届ける人々",
    title: "心を込めたケアチーム",
    m1Role: "チーフセラピスト",
    m1Desc: "伝統的なマッサージと深部回復療法において10年以上の経験。",
    m2Role: "ハーブスペシャリスト",
    m2Desc: "Mầm Spa 独自のお茶とハーブオイルの処方を研究・開発。",
    m3Role: "ヘッドスパスペシャリスト",
    m3Desc: "頭皮ケアと養生シャンプー技術に精通し、完全なリラックスへ導きます。"
  },
  reviews: {
    eyebrow: "大切な方々からの声",
    title: "お客様の声",
    videoCaption: "Mầm での癒やし体験",
    quote: "サイゴンの中心とは思えない、本当に穏やかな空間。セラピストの方々がとても丁寧で、マッサージとヘッドスパの後はぐっすり眠れました。Mầm Spa さん、ありがとう！",
    author: "Vivian 様 – 常連のお客様",
    like: "いいね"
  },
  hero: {
    eyebrow: "ベトナムの癒しの旅",
    retreat: "身体・心・精神のためのリトリート。"
  },
  featureTitles: {
    headSpa: "ヘッドスパセラピー",
    bodyMassage: "ボディマッサージ",
    herbal: "ハーブセラピー",
    tea: "ティーセレモニー"
  }
};
const dichvu$2 = {
  eyebrow: "A journey to balance your body, mind & soul",
  title: "サービスメニュー",
  searchPlaceholder: "サービスを検索（例：ハーブヘッドスパ、首・肩の施術…）",
  searchButton: "検索",
  combos: {
    eyebrow: "まるごと癒やしの旅",
    title: "Mầm コンボパッケージ",
    bestseller: "人気No.1"
  },
  massage: {
    title: "セラピーマッサージ",
    d1: "首・肩のこりと痛みを効果的に和らげます。",
    d2: "足裏のツボ押しで血行を促進し、活力を回復。",
    d3: "全身の深部ケアで筋肉の疲れを溶かし、心を整えます。"
  },
  detail: {
    consult: "相談する",
    getOffer: "今すぐ特典を受け取る",
    benefitsEyebrow: "身体を理解し、最適な施術を選ぶ",
    benefitsTitle: "効果と対象となる方",
    benefitsHeading: "施術の効果",
    idealHeading: "特におすすめの方：",
    faqEyebrow: "Mầm がお答えします",
    faqTitle: "よくある質問",
    relatedEyebrow: "癒しの旅を続ける",
    relatedTitle: "他のサービスを見る",
    stepsEyebrow: "ステップごとの体験",
    stepsTitle: "施術の流れ",
    experienceEyebrow: "Mầm Spa での瞬間",
    experienceTitle: "お客様の体験ギャラリー",
    categoryServicesEyebrow: "満ち足りたケアの旅"
  },
  category: {
    servicesEyebrow: "おすすめサービス",
    servicesTitle: "サービスパッケージ"
  }
};
const booking$2 = {
  steps: {
    branch: "店舗",
    service: "サービス",
    datetime: "日時",
    info: "お客様情報",
    confirm: "確認"
  },
  selectBranch: "店舗を選択",
  selectService: "サービスを選択",
  selectDateTime: "日時を選択",
  contactInfo: "連絡先情報",
  confirmTitle: "予約内容の確認",
  field: {
    name: "お名前",
    phone: "電話番号",
    email: "メールアドレス",
    note: "備考",
    voucher: "バウチャー",
    paymentMethod: "支払い方法"
  },
  voucher: {
    apply: "適用",
    discount: "割引 {{amount}}"
  },
  payment: {
    cash: "店舗でのお支払い",
    vnpay: "VNPay",
    momo: "MoMo",
    card: "Visa/マスターカード"
  },
  summary: {
    branch: "店舗",
    service: "サービス",
    date: "日付",
    time: "時間",
    guest: "お客様",
    total: "合計"
  },
  confirm: "予約を確定する",
  slotsAvailable: "{{available}}/{{capacity}} 空き"
};
const bookingSuccess$2 = {
  title: "予約が完了しました！",
  code: "予約コード",
  emailSent: "確認メールを送信しました。",
  backHome: "ホームに戻る"
};
const myBookings$2 = {
  empty: "予約履歴がありません。",
  bookOne: "今すぐ予約",
  confirmCancel: "予約 {{code}} をキャンセルしますか？",
  payVnpay: "VNPayで支払う",
  cancelBooking: "予約をキャンセル",
  lookupTitle: "他の予約を検索",
  lookupDesc: "電話番号と予約コード（確認メール/SMSに記載）を入力すると、その電話番号のすべての予約を確認できます。",
  lookupPhonePlaceholder: "電話番号",
  lookupCodePlaceholder: "予約コード（例：MSABC123）",
  lookupButton: "検索",
  status: {
    pending: "保留中",
    confirmed: "確認済み",
    completed: "完了",
    cancelled: "キャンセル済み"
  }
};
const auth$2 = {
  login: "ログイン",
  register: "新規登録",
  email: "メールアドレス",
  password: "パスワード",
  passwordConfirm: "パスワード確認",
  name: "お名前",
  phone: "電話番号",
  remember: "ログイン状態を保持",
  orContinueWith: "または次で続ける",
  loginWithGoogle: "Googleでログイン",
  noAccount: "アカウントをお持ちでない方",
  haveAccount: "すでにアカウントをお持ちの方"
};
const contact$2 = {
  form: {
    name: "お名前",
    email: "メールアドレス",
    phone: "電話番号",
    subject: "件名",
    message: "メッセージ",
    title: "メッセージを送る",
    subtitle: "Mầm よりできるだけ早くご返信いたします。"
  }
};
const blocks$2 = {
  services: {
    eyebrow: "Healing in every detail"
  },
  testimonial: {
    eyebrow: "お客様の生の声",
    title: "お客様の口コミ",
    ratingLabel: "非常に良い",
    basedOn: "{{count}} 件のレビューに基づく",
    readMore: "続きを読む"
  },
  bookingForm: {
    title: "ご予約リクエスト",
    branch: "Mầm Spa 店舗",
    branchPlaceholder: "店舗を選択",
    name: "お客様のお名前",
    namePlaceholder: "お名前を入力",
    phone: "電話番号",
    phonePlaceholder: "電話番号を入力",
    phoneCountrySearchPlaceholder: "国名または国番号を検索...",
    phoneCountryEmpty: "該当する国が見つかりません",
    email: "メール (Gmail)",
    emailPlaceholder: "example@gmail.com",
    channel: "オンライン連絡手段",
    channelPlaceholder: "電話番号 / アカウントID",
    date: "日付",
    time: "時間",
    guests: "ご来店人数",
    total: "合計",
    people: "名",
    male: "男性",
    female: "女性",
    chooseService: "各お客様のサービスを選択",
    guestMale: "男性のお客様",
    guestFemale: "女性のお客様",
    servicePlaceholder: "サービスを選択",
    serviceSearchPlaceholder: "サービスを検索...",
    serviceEmpty: "サービスが見つかりません",
    serviceRequired: "各お客様のサービスを選択してください。",
    note: "備考（任意）",
    notePlaceholder: "健康状態、セラピストのご希望、その他ご要望など...",
    submit: "予約を完了する",
    success: {
      title: "リクエストを送信しました！",
      message: "ありがとうございます。Mầm Spa のスタッフが、ご予約の確認と最高の体験のご準備のため、まもなくご連絡いたします。",
      codeLabel: "お客様のリクエストコード",
      home: "ホームに戻る"
    }
  },
  menu: {
    title: "サービスメニュー",
    book: "予約する",
    minute: "分",
    cat: {
      combo: "Signature Combo",
      massage: "Massage Therapies",
      "head-spa": "Head Spa",
      facial: "Facial Treatments",
      "foot-spa": "Others"
    }
  },
  branches: {
    title: "Mầm Spa の空間を巡る",
    eyebrow: "A retreat for body, mind & soul",
    subheading: "癒やしの空間",
    heading: "古きサイゴンの趣。",
    p1: "レ・ヴァン・シー店に足を踏み入れると、希少な静寂のひとときへ。温かみのある木材、自然光、ほのかなハーブの香りが、伝統建築の素朴な趣をそのままに残しています。",
    p2: "慌ただしい日常を離れ、深くリラックスし、自分自身とつながり直すための理想的な場所です。",
    cta: "詳しく見る"
  }
};
const notFound$2 = {
  title: "ページが見つかりません",
  heading: "404",
  description: "申し訳ございません。お探しのページは存在しないか、移動された可能性があります。",
  backHome: "ホームに戻る",
  suggestionsTitle: "こちらもご覧ください：",
  exploreServices: "サービスを見る",
  contact: "お問い合わせ"
};
const ja = {
  blog: blog$2,
  bookingForm: bookingForm$2,
  nav: nav$2,
  common: common$2,
  home: home$2,
  footer: footer$2,
  services: services$2,
  about: about$2,
  dichvu: dichvu$2,
  booking: booking$2,
  bookingSuccess: bookingSuccess$2,
  myBookings: myBookings$2,
  auth: auth$2,
  contact: contact$2,
  blocks: blocks$2,
  notFound: notFound$2
};
const blog$1 = {
  story: "자연에서 온 이야기",
  readArticle: "기사 읽기",
  readMore: "더 읽기",
  loadMore: "더 보기",
  loading: "불러오는 중...",
  empty: "아직 게시물이 없습니다.",
  author: "Mầm Spa 전문가",
  minRead: "{{count}}분 분량",
  related: "주요 게시물",
  ctaEyebrow: "실제 경험",
  ctaTitle: "헤드 스파 서비스",
  ctaDesc: "심층 허브 두피 케어로 모발의 건강한 윤기를 깨워보세요.",
  ctaButton: "자세히 보기"
};
const bookingForm$1 = {
  eyebrow: "Reserve your moment of peace",
  title: "예약하기",
  thankYou: "예약 요청해 주셔서 감사합니다. Mầm Spa 팀이 곧 연락드려 예약을 확인하고 최고의 경험을 위해 세심하게 준비하겠습니다.",
  sectionLocation: "지점 및 서비스 선택",
  sectionDatetime: "날짜 및 시간 선택",
  sectionContact: "연락처 정보",
  selectBranch: "지점 선택",
  guestCount: "총 인원",
  guestTotal: "합계",
  people: "명",
  male: "남성",
  female: "여성",
  choosePerGuest: "각 고객의 서비스를 선택해 주세요:",
  guestMale: "남성 고객",
  guestFemale: "여성 고객",
  chooseService: "서비스 선택",
  morning: "오전",
  afternoon: "오후",
  evening: "저녁",
  pickDate: "날짜를 선택하면 가능한 시간이 표시됩니다.",
  noSlots: "이 날짜에는 예약 가능한 시간이 없습니다.",
  name: "성함",
  namePlaceholder: "이름을 입력하세요",
  phone: "전화번호",
  phonePlaceholder: "전화번호를 입력하세요",
  email: "이메일 (Gmail)",
  emailPlaceholder: "Gmail을 입력하세요",
  emailHint: "이 이메일로 예약 확인 메일을 받습니다",
  contactChannel: "온라인 연락 방법",
  contactValuePlaceholder: "전화 / 계정 ID",
  note: "스파 요청 사항 (선택)",
  notePlaceholder: "건강 상태, 테라피스트 요청, 임신 관련 사항 등...",
  summaryTitle: "예약 요약",
  summaryPlace: "지점",
  summaryDatetime: "시간",
  summaryCustomers: "고객",
  subtotal: "소계",
  voucher: "프로모션 / 바우처",
  total: "총액",
  confirm: "예약 확정",
  processing: "처리 중...",
  channelZalo: "Zalo",
  channelMessenger: "Messenger",
  channelWhatsapp: "WhatsApp",
  channelPhone: "전화"
};
const nav$1 = {
  home: "홈",
  about: "소개",
  services: "서비스",
  booking: "예약하기",
  voucher: "바우처",
  gallery: "갤러리",
  blog: "블로그",
  contact: "문의",
  myBookings: "예약 내역",
  login: "로그인",
  register: "회원가입",
  logout: "로그아웃",
  toggleMenu: "메뉴"
};
const common$1 = {
  loading: "로딩 중...",
  submit: "제출",
  cancel: "취소",
  save: "저장",
  back: "뒤로",
  next: "다음",
  viewMore: "더 보기",
  bookNow: "지금 예약",
  readMore: "더 읽기",
  all: "전체",
  processing: "처리 중...",
  minute: "분",
  closeBanner: "닫기",
  chat: "채팅",
  apply: "적용"
};
const home$1 = {
  hero: {
    eyebrow: "Rooted in Vietnamese Healing Traditions",
    title: "몸·마음·정신의 균형을 찾는 여정",
    heading: "자연에서 시작되는 치유의 여정",
    body: "분주한 일상을 잠시 내려놓고, 고요한 인도차이나 공간에서 몸의 소리에 귀 기울이며 마음을 어루만지는 시간을 누려보세요.",
    explore: "둘러보기",
    subtitle: "마하 스파 — 다낭에서 경험하는 베트남 전통 스파"
  }
};
const footer$1 = {
  tagline: "몸·마음·정신의 균형을 찾는 여정의 시작",
  branches: "지점",
  contact: "문의",
  follow: "팔로우",
  hotline: "예약 전화",
  address: "주소",
  hours: "영업 시간",
  holiday: "(공휴일·뗏 연휴 영업)",
  viewMap: "길찾기 보기",
  privacy: "개인정보 처리방침",
  terms: "이용약관",
  support: "고객 지원",
  rights: "© {{year}} Mầm Spa. 모든 권리 보유."
};
const services$1 = {
  category: {
    all: "전체",
    massage: "바디 마사지",
    facial: "페이셜",
    "head-spa": "헤드 스파",
    "foot-spa": "풋 스파",
    combo: "콤보"
  },
  allBranches: "전체 지점",
  empty: "해당 서비스가 없습니다.",
  ingredients: "재료"
};
const about$1 = {
  title: "균형을 찾는 여정",
  subtitle: "분주한 사이공 속 작은 쉼표",
  features: {
    headSpa: "깊은 휴식, 두피 영양 케어.",
    bodyMassage: "근육 이완, 에너지 회복.",
    herbal: "천연 허브로 몸과 마음의 균형.",
    tea: "따뜻한 허브티로 마무리하는 힐링."
  },
  story: {
    eyebrow: "Mầm Spa — 브랜드 스토리",
    heading: "몸·마음·정신을 치유하는 여정의 시작",
    p1: "사람과 자연의 깊은 연결에 대한 믿음에서 출발한 Mầm Spa는 '분주한 사이공 속 작은 쉼표'로 탄생했습니다. 일상의 근심이 사라지고 깊은 평온이 자리하는 공간입니다.",
    p2: "개성 있는 두 공간 — 옛 사이공의 소박함을 담은 레 반 시 지점과 모던하고 프라이빗한 레 티 리엥 지점. Mầm은 정성과 섬세함으로 모든 순간마다 완벽한 회복의 경험을 선사합니다."
  },
  vision: {
    title: "비전과 미션",
    p1: "번화한 도심 속에 진정한 치유의 공간을 만들고자 하는 열망에서 출발하여, Mầm Spa는 평온과 회복을 찾는 이들을 위한 이상적인 '작은 쉼표'를 지향합니다.",
    p2: "휴식은 단순히 신체 피로를 푸는 것이 아니라, 몸·마음·정신을 온전히 돌보아 가장 자연스러운 균형으로 되돌리는 여정이라 믿습니다. Mầm에서는 자신에게 맞는 치유의 결을 선택할 수 있습니다:",
    b1: "옛 사이공의 소박함이 어우러진 곳. 소박함과 따뜻함, 연결을 사랑하는 분들을 위해.",
    b2: "고요하고 모던한 공간. 깊이 있고 고도로 개인화된 회복 경험을.",
    eyebrow: "베트남 전통 치유에 뿌리를 두다"
  },
  values: {
    title: "핵심 가치",
    t1: "정성과 전문성",
    d1: "체계적으로 훈련된 테라피스트들이 경혈과 전통 치료법에 정통하여 안심하고 경험하실 수 있습니다.",
    t2: "맞춤형 경험",
    d2: "언제나 당신의 몸에 귀 기울입니다. 모든 트리트먼트는 각 고객의 컨디션과 회복 니즈에 맞춰 유연하게 조정됩니다.",
    t3: "디테일까지 섬세하게",
    d3: "따뜻한 환영 차, 은은한 허브 향, 도시의 소음에서 완전히 벗어난 고요한 공간까지 — 모든 디테일에 정성을 담았습니다.",
    eyebrow: "베트남 전통 치유에 뿌리를 두다"
  },
  team: {
    eyebrow: "평온을 전하는 사람들",
    title: "정성을 다하는 케어 팀",
    m1Role: "수석 테라피스트",
    m1Desc: "전통 마사지와 심부 회복 요법에서 10년 이상의 경력.",
    m2Role: "허브 전문가",
    m2Desc: "Mầm Spa만의 차와 허브 오일 포뮬러를 연구·개발합니다.",
    m3Role: "헤드 스파 전문가",
    m3Desc: "두피 케어와 양생 샴푸 기법에 정통하여 완전한 휴식을 선사합니다."
  },
  reviews: {
    eyebrow: "소중한 분들의 이야기",
    title: "고객의 후기",
    videoCaption: "Mầm에서의 힐링 경험",
    quote: "사이공 한복판이라고 믿기 힘든 정말 평온한 공간. 테라피스트분들이 정성스러워서 마사지와 헤드 스파 후 정말 깊이 잤어요. Mầm Spa 감사합니다!",
    author: "Vivian 님 – 단골 고객",
    like: "좋아요"
  },
  hero: {
    eyebrow: "베트남 힐링 여정",
    retreat: "몸과 마음, 영혼을 위한 휴식."
  },
  featureTitles: {
    headSpa: "헤드스파 테라피",
    bodyMassage: "보디 마사지",
    herbal: "허브 테라피",
    tea: "티 리추얼"
  }
};
const dichvu$1 = {
  eyebrow: "A journey to balance your body, mind & soul",
  title: "서비스 메뉴",
  searchPlaceholder: "서비스 검색 (예: 허브 헤드스파, 목·어깨 치료…)",
  searchButton: "검색",
  combos: {
    eyebrow: "완벽한 케어 여정",
    title: "Mầm 콤보 패키지",
    bestseller: "베스트셀러"
  },
  massage: {
    title: "테라피 마사지 서비스",
    d1: "목·어깨의 긴장과 통증을 효과적으로 완화합니다.",
    d2: "발바닥 지압으로 혈액 순환을 촉진하고 활력을 회복합니다.",
    d3: "전신 심부 케어로 근육 피로를 풀고 마음을 맑게 합니다."
  },
  detail: {
    consult: "상담 받기",
    getOffer: "지금 혜택 받기",
    benefitsEyebrow: "몸을 이해하고 알맞은 케어를 선택하세요",
    benefitsTitle: "효과 & 추천 대상",
    benefitsHeading: "케어 효과",
    idealHeading: "특히 이런 분께 추천:",
    faqEyebrow: "Mầm이 답해 드립니다",
    faqTitle: "자주 묻는 질문",
    relatedEyebrow: "힐링 여정을 이어가세요",
    relatedTitle: "다른 서비스 둘러보기",
    stepsEyebrow: "단계별 경험",
    stepsTitle: "케어 과정",
    experienceEyebrow: "Mầm Spa에서의 순간",
    experienceTitle: "고객 경험 갤러리",
    categoryServicesEyebrow: "온전한 케어 여정"
  },
  category: {
    servicesEyebrow: "주요 서비스",
    servicesTitle: "서비스 패키지"
  }
};
const booking$1 = {
  steps: {
    branch: "지점",
    service: "서비스",
    datetime: "날짜 및 시간",
    info: "고객 정보",
    confirm: "확인"
  },
  selectBranch: "지점 선택",
  selectService: "서비스 선택",
  selectDateTime: "날짜 및 시간 선택",
  contactInfo: "연락처 정보",
  confirmTitle: "예약 확인",
  field: {
    name: "이름",
    phone: "전화번호",
    email: "이메일",
    note: "메모",
    voucher: "바우처",
    paymentMethod: "결제 방법"
  },
  voucher: {
    apply: "적용",
    discount: "할인 {{amount}}"
  },
  payment: {
    cash: "현장 결제",
    vnpay: "VNPay",
    momo: "MoMo",
    card: "Visa/마스터카드"
  },
  summary: {
    branch: "지점",
    service: "서비스",
    date: "날짜",
    time: "시간",
    guest: "고객",
    total: "합계"
  },
  confirm: "예약 확정",
  slotsAvailable: "{{available}}/{{capacity}} 가능"
};
const bookingSuccess$1 = {
  title: "예약이 완료되었습니다!",
  code: "예약 코드",
  emailSent: "확인 이메일이 발송되었습니다.",
  backHome: "홈으로 돌아가기"
};
const myBookings$1 = {
  empty: "예약 내역이 없습니다.",
  bookOne: "지금 예약하기",
  confirmCancel: "예약 {{code}}을 취소하시겠습니까?",
  payVnpay: "VNPay로 결제",
  cancelBooking: "예약 취소",
  lookupTitle: "다른 예약 조회",
  lookupDesc: "전화번호와 예약 코드(확인 이메일/SMS에 있음)를 입력하면 해당 전화번호의 모든 예약을 볼 수 있습니다.",
  lookupPhonePlaceholder: "전화번호",
  lookupCodePlaceholder: "예약 코드 (예: MSABC123)",
  lookupButton: "조회",
  status: {
    pending: "대기 중",
    confirmed: "확인됨",
    completed: "완료",
    cancelled: "취소됨"
  }
};
const auth$1 = {
  login: "로그인",
  register: "회원가입",
  email: "이메일",
  password: "비밀번호",
  passwordConfirm: "비밀번호 확인",
  name: "이름",
  phone: "전화번호",
  remember: "로그인 상태 유지",
  orContinueWith: "또는 다음으로 계속",
  loginWithGoogle: "Google로 로그인",
  noAccount: "계정이 없으신가요?",
  haveAccount: "이미 계정이 있으신가요?"
};
const contact$1 = {
  form: {
    name: "이름",
    email: "이메일",
    phone: "전화번호",
    subject: "제목",
    message: "메시지",
    title: "메시지 보내기",
    subtitle: "Mầm이 최대한 빨리 답변드리겠습니다."
  }
};
const blocks$1 = {
  services: {
    eyebrow: "Healing in every detail"
  },
  testimonial: {
    eyebrow: "생생한 경험을 들어보세요",
    title: "고객 리뷰",
    ratingLabel: "매우 우수",
    basedOn: "{{count}}개의 리뷰 기준",
    readMore: "더 보기"
  },
  bookingForm: {
    title: "예약 요청",
    branch: "Mầm Spa 지점",
    branchPlaceholder: "지점 선택",
    name: "고객 이름",
    namePlaceholder: "이름을 입력하세요",
    phone: "전화번호",
    phonePlaceholder: "전화번호를 입력하세요",
    phoneCountrySearchPlaceholder: "국가 또는 국가번호 검색...",
    phoneCountryEmpty: "일치하는 국가가 없습니다",
    email: "이메일 (Gmail)",
    emailPlaceholder: "example@gmail.com",
    channel: "온라인 연락 수단",
    channelPlaceholder: "전화번호 / 계정 ID",
    date: "날짜",
    time: "시간",
    guests: "동행 인원수",
    total: "총",
    people: "명",
    male: "남성",
    female: "여성",
    chooseService: "고객별 서비스 선택",
    guestMale: "남성 고객",
    guestFemale: "여성 고객",
    servicePlaceholder: "서비스 선택",
    serviceSearchPlaceholder: "서비스 검색...",
    serviceEmpty: "서비스를 찾을 수 없습니다",
    serviceRequired: "각 고객의 서비스를 선택해 주세요.",
    note: "추가 메모 (선택 사항)",
    notePlaceholder: "건강 상태, 테라피스트 요청, 기타 참고 사항 등...",
    submit: "예약 완료",
    success: {
      title: "요청이 전송되었습니다!",
      message: "감사합니다. Mầm Spa 팀이 예약 확인과 완벽한 경험 준비를 위해 곧 연락드리겠습니다.",
      codeLabel: "고객님의 요청 코드",
      home: "홈으로 돌아가기"
    }
  },
  menu: {
    title: "서비스 메뉴",
    book: "예약하기",
    minute: "분",
    cat: {
      combo: "Signature Combo",
      massage: "Massage Therapies",
      "head-spa": "Head Spa",
      facial: "Facial Treatments",
      "foot-spa": "Others"
    }
  },
  branches: {
    title: "Mầm Spa 공간 둘러보기",
    eyebrow: "A retreat for body, mind & soul",
    subheading: "치유의 공간",
    heading: "옛 사이공의 아름다움.",
    p1: "레 반 시 지점에 들어서면 보기 드문 고요한 순간으로 돌아갑니다. 따뜻한 원목, 자연 채광, 은은한 허브 향이 전통 건축의 소박한 멋을 고스란히 간직하고 있습니다.",
    p2: "분주한 삶을 잠시 내려놓고 깊이 휴식하며 자신과 다시 연결되기에 이상적인 곳입니다.",
    cta: "자세히 보기"
  }
};
const notFound$1 = {
  title: "페이지를 찾을 수 없습니다",
  heading: "404",
  description: "죄송합니다. 찾으시는 페이지가 존재하지 않거나 이동되었습니다.",
  backHome: "홈으로 돌아가기",
  suggestionsTitle: "이런 페이지는 어떠세요?",
  exploreServices: "서비스 둘러보기",
  contact: "문의하기"
};
const ko = {
  blog: blog$1,
  bookingForm: bookingForm$1,
  nav: nav$1,
  common: common$1,
  home: home$1,
  footer: footer$1,
  services: services$1,
  about: about$1,
  dichvu: dichvu$1,
  booking: booking$1,
  bookingSuccess: bookingSuccess$1,
  myBookings: myBookings$1,
  auth: auth$1,
  contact: contact$1,
  blocks: blocks$1,
  notFound: notFound$1
};
const blog = {
  story: "来自自然的故事",
  readArticle: "阅读文章",
  readMore: "阅读更多",
  loadMore: "加载更多",
  loading: "加载中...",
  empty: "暂无文章。",
  author: "Mầm Spa 专家",
  minRead: "阅读约 {{count}} 分钟",
  related: "精选文章",
  ctaEyebrow: "真实体验",
  ctaTitle: "头部水疗服务",
  ctaDesc: "用深层草本头皮护理唤醒秀发的健康光泽。",
  ctaButton: "了解更多"
};
const bookingForm = {
  eyebrow: "Reserve your moment of peace",
  title: "预约体验",
  thankYou: "感谢您的预约请求。Mầm Spa 团队将尽快与您联系，确认预约并为您精心准备每一处体验细节。",
  sectionLocation: "选择门店与服务",
  sectionDatetime: "选择日期与时间",
  sectionContact: "联系信息",
  selectBranch: "选择门店",
  guestCount: "总客数",
  guestTotal: "总计",
  people: "位",
  male: "男",
  female: "女",
  choosePerGuest: "请为每位客人选择相应的服务：",
  guestMale: "男宾",
  guestFemale: "女宾",
  chooseService: "选择服务",
  morning: "上午",
  afternoon: "下午",
  evening: "晚上",
  pickDate: "请选择日期以查看可预约时段。",
  noSlots: "该日期暂无可预约时段。",
  name: "姓名",
  namePlaceholder: "请输入您的姓名",
  phone: "电话号码",
  phonePlaceholder: "请输入电话号码",
  email: "邮箱 (Gmail)",
  emailPlaceholder: "请输入 Gmail",
  emailHint: "将通过此邮箱接收预约确认邮件",
  contactChannel: "在线联系方式",
  contactValuePlaceholder: "电话 / 账号 ID",
  note: "给水疗中心的备注（选填）",
  notePlaceholder: "健康状况、技师要求、孕期注意事项……",
  summaryTitle: "预约摘要",
  summaryPlace: "门店",
  summaryDatetime: "时间",
  summaryCustomers: "客户",
  subtotal: "小计",
  voucher: "优惠 / 代金券",
  total: "总计",
  confirm: "确认预约",
  processing: "处理中...",
  channelZalo: "Zalo",
  channelMessenger: "Messenger",
  channelWhatsapp: "WhatsApp",
  channelPhone: "电话"
};
const nav = {
  home: "首页",
  about: "关于我们",
  services: "服务项目",
  booking: "立即预约",
  voucher: "优惠券",
  gallery: "图片展示",
  blog: "博客",
  contact: "联系我们",
  myBookings: "我的预约",
  login: "登录",
  register: "注册",
  logout: "退出登录",
  toggleMenu: "菜单"
};
const common = {
  loading: "加载中...",
  submit: "提交",
  cancel: "取消",
  save: "保存",
  back: "返回",
  next: "下一步",
  viewMore: "查看更多",
  bookNow: "立即预约",
  readMore: "阅读更多",
  all: "全部",
  processing: "处理中...",
  minute: "分钟",
  closeBanner: "关闭",
  chat: "聊天",
  apply: "应用"
};
const home = {
  hero: {
    eyebrow: "Rooted in Vietnamese Healing Traditions",
    title: "开启身心灵平衡的旅程",
    heading: "源于自然的疗愈之旅",
    body: "放下匆忙的生活节奏，步入静谧的印支风情空间，聆听身体的声音，抚慰心灵。",
    explore: "探索",
    subtitle: "Mầm Spa — 在岘港体验越南传统水疗"
  }
};
const footer = {
  tagline: "开启身心灵平衡旅程的起点",
  branches: "门店",
  contact: "联系我们",
  follow: "关注我们",
  hotline: "预约热线",
  address: "地址",
  hours: "营业时间",
  holiday: "（节假日及春节照常营业）",
  viewMap: "查看路线",
  privacy: "隐私政策",
  terms: "服务条款",
  support: "客户支持",
  rights: "© {{year}} Mầm Spa. 版权所有。"
};
const services = {
  category: {
    all: "全部",
    massage: "全身按摩",
    facial: "面部护理",
    "head-spa": "头部水疗",
    "foot-spa": "足部水疗",
    combo: "套餐组合"
  },
  allBranches: "全部门店",
  empty: "暂无相关服务。",
  ingredients: "使用原料"
};
const about = {
  title: "平衡之旅",
  subtitle: "繁忙西贡中的小憩",
  features: {
    headSpa: "深度放松，滋养头皮。",
    bodyMassage: "舒缓肌肉，恢复活力。",
    herbal: "天然草本，平衡身心。",
    tea: "温热草本茶，为放松之旅画上句点。"
  },
  story: {
    eyebrow: "Mầm Spa — 品牌故事",
    heading: "身·心·灵疗愈之旅的起点",
    p1: '源于对人与自然深层联结的信念，Mầm Spa 应运而生，成为"繁忙西贡中的小憩"。在这里，日常烦忧消散，只余深沉的宁静。',
    p2: "两处各具特色的空间——黎文士店承载旧西贡的质朴气息，黎氏Riêng店现代而私密。Mầm 以用心与细致，在每一处触点呈现完美的修复体验。"
  },
  vision: {
    title: "愿景与使命",
    p1: '源于在繁华都市中心打造一处真正疗愈空间的渴望，Mầm Spa 致力于成为追寻安宁与修复之人理想的"小憩之所"。',
    p2: "我们相信，放松不仅是缓解身体疲惫，更是身·心·灵全方位呵护的旅程，让你回归最自然的平衡。在 Mầm，你可以选择最适合自己的疗愈格调：",
    b1: "旧西贡质朴气息交汇之地，献给热爱朴素、温暖与联结的你。",
    b2: "静谧而现代的空间，带来深度且高度个性化的修复体验。",
    eyebrow: "根植于越南传统疗愈"
  },
  values: {
    title: "核心价值",
    t1: "用心与专业",
    d1: "技师团队经过系统培训，深谙穴位与传统疗法，让您体验时倍感安心。",
    t2: "个性化体验",
    d2: "我们始终聆听您的身体。每个疗程都灵活调整，契合每位客人的体质与独特的修复需求。",
    t3: "细致入微的体验",
    d3: "用心体现在每个细节：从迎客的暖茶、淡淡草本香，到完全远离都市喧嚣的静谧空间。",
    eyebrow: "根植于越南传统疗愈"
  },
  team: {
    eyebrow: "传递宁静的人",
    title: "用心呵护的团队",
    m1Role: "首席技师",
    m1Desc: "拥有十余年传统按摩与深度修复疗法经验。",
    m2Role: "草本专家",
    m2Desc: "潜心研发 Mầm Spa 独家的茶饮与草本精油配方。",
    m3Role: "头部SPA专家",
    m3Desc: "深谙头皮护理与养生洗护技法，助您彻底放松。"
  },
  reviews: {
    eyebrow: "挚爱之人的分享",
    title: "顾客感言",
    videoCaption: "在 Mầm 的疗愈体验",
    quote: "西贡市中心难得的宁静空间。技师们非常用心，做完按摩和洗头后我睡得特别香。谢谢 Mầm Spa！",
    author: "Vivian 女士 – 忠实顾客",
    like: "喜欢"
  },
  hero: {
    eyebrow: "越南疗愈之旅",
    retreat: "身心灵的疗愈之所。"
  },
  featureTitles: {
    headSpa: "头皮水疗",
    bodyMassage: "全身按摩",
    herbal: "草本疗法",
    tea: "茶道仪式"
  }
};
const dichvu = {
  eyebrow: "A journey to balance your body, mind & soul",
  title: "服务菜单",
  searchPlaceholder: "搜索服务（例：草本头部SPA、颈肩理疗…）",
  searchButton: "搜索",
  combos: {
    eyebrow: "全方位呵护之旅",
    title: "Mầm 套餐组合",
    bestseller: "热销"
  },
  massage: {
    title: "理疗按摩服务",
    d1: "有效缓解颈肩紧张与酸痛。",
    d2: "足底穴位按压，促进血液循环、恢复活力。",
    d3: "全身深度理疗，消除肌肉疲劳、净化身心。"
  },
  detail: {
    consult: "获取咨询",
    getOffer: "立即领取优惠",
    benefitsEyebrow: "了解身体，选择合适的疗程",
    benefitsTitle: "功效与适合人群",
    benefitsHeading: "疗程功效",
    idealHeading: "特别推荐给：",
    faqEyebrow: "Mầm 为您解答",
    faqTitle: "常见问题",
    relatedEyebrow: "继续您的疗愈之旅",
    relatedTitle: "探索其他服务",
    stepsEyebrow: "逐步体验",
    stepsTitle: "护理流程",
    experienceEyebrow: "Mầm Spa 的时刻",
    experienceTitle: "顾客体验照片",
    categoryServicesEyebrow: "完整的呵护之旅"
  },
  category: {
    servicesEyebrow: "精选服务",
    servicesTitle: "服务套餐"
  }
};
const booking = {
  steps: {
    branch: "选择门店",
    service: "选择服务",
    datetime: "选择时间",
    info: "填写信息",
    confirm: "确认预约"
  },
  selectBranch: "请选择门店",
  selectService: "请选择服务",
  selectDateTime: "请选择日期和时间",
  contactInfo: "联系方式",
  confirmTitle: "确认您的预约",
  field: {
    name: "姓名",
    phone: "手机号码",
    email: "电子邮件",
    note: "备注",
    voucher: "优惠券",
    paymentMethod: "支付方式"
  },
  voucher: {
    apply: "使用",
    discount: "优惠 {{amount}}"
  },
  payment: {
    cash: "到店付款",
    vnpay: "VNPay",
    momo: "MoMo",
    card: "Visa/万事达卡"
  },
  summary: {
    branch: "门店",
    service: "服务",
    date: "日期",
    time: "时间",
    guest: "客户",
    total: "总计"
  },
  confirm: "确认预约",
  slotsAvailable: "剩余 {{available}}/{{capacity}}"
};
const bookingSuccess = {
  title: "预约成功！",
  code: "预约编号",
  emailSent: "确认邮件已发送至您的邮箱。",
  backHome: "返回首页"
};
const myBookings = {
  empty: "暂无预约记录。",
  bookOne: "立即预约",
  confirmCancel: "确定取消预约 {{code}}？",
  payVnpay: "使用VNPay支付",
  cancelBooking: "取消预约",
  lookupTitle: "查询其他预约",
  lookupDesc: "输入电话号码和预约码（在确认邮件/短信中）即可查看该电话号码下的所有预约。",
  lookupPhonePlaceholder: "电话号码",
  lookupCodePlaceholder: "预约码（例如 MSABC123）",
  lookupButton: "查询",
  status: {
    pending: "待确认",
    confirmed: "已确认",
    completed: "已完成",
    cancelled: "已取消"
  }
};
const auth = {
  login: "登录",
  register: "注册",
  email: "电子邮件",
  password: "密码",
  passwordConfirm: "确认密码",
  name: "姓名",
  phone: "手机号码",
  remember: "记住我",
  orContinueWith: "或继续使用",
  loginWithGoogle: "使用 Google 登录",
  noAccount: "还没有账号？",
  haveAccount: "已有账号？"
};
const contact = {
  form: {
    name: "姓名",
    email: "电子邮件",
    phone: "手机号码",
    subject: "主题",
    message: "留言内容",
    title: "给我们留言",
    subtitle: "Mầm 会尽快回复您。"
  }
};
const blocks = {
  services: {
    eyebrow: "Healing in every detail"
  },
  testimonial: {
    eyebrow: "聆听真实体验",
    title: "客户评价",
    ratingLabel: "非常好",
    basedOn: "基于 {{count}} 条评价",
    readMore: "查看更多"
  },
  bookingForm: {
    title: "预约申请",
    branch: "Mầm Spa 门店",
    branchPlaceholder: "选择门店",
    name: "客户姓名",
    namePlaceholder: "请输入您的姓名",
    phone: "电话号码",
    phonePlaceholder: "请输入电话号码",
    phoneCountrySearchPlaceholder: "搜索国家或区号...",
    phoneCountryEmpty: "未找到匹配的国家",
    email: "邮箱 (Gmail)",
    emailPlaceholder: "example@gmail.com",
    channel: "在线联系方式",
    channelPlaceholder: "电话 / 账号 ID",
    date: "日期",
    time: "时间",
    guests: "同行人数",
    total: "合计",
    people: "人",
    male: "男",
    female: "女",
    chooseService: "为每位客户选择服务",
    guestMale: "男性客户",
    guestFemale: "女性客户",
    servicePlaceholder: "选择服务",
    serviceSearchPlaceholder: "搜索服务...",
    serviceEmpty: "未找到服务",
    serviceRequired: "请为每位客人选择服务。",
    note: "备注（选填）",
    notePlaceholder: "健康状况、技师要求或任何注意事项…",
    submit: "完成预约",
    success: {
      title: "申请已发送！",
      message: "感谢您的预约。Mầm Spa 团队将尽快与您联系，确认预约并为您精心准备每一处体验细节。",
      codeLabel: "您的申请编号",
      home: "返回首页"
    }
  },
  menu: {
    title: "服务菜单",
    book: "预约",
    minute: "分钟",
    cat: {
      combo: "Signature Combo",
      massage: "Massage Therapies",
      "head-spa": "Head Spa",
      facial: "Facial Treatments",
      "foot-spa": "Others"
    }
  },
  branches: {
    title: "探索 Mầm Spa 空间",
    eyebrow: "A retreat for body, mind & soul",
    subheading: "疗愈空间",
    heading: "旧西贡之美。",
    p1: "步入黎文士门店，仿佛回到难得的宁静天地。这里完整保留了传统建筑的质朴韵味，温润木材、自然光线与淡淡草本清香交织其间。",
    p2: "是暂别忙碌生活、深度放松、重新与自我连接的理想之地。",
    cta: "查看详情"
  }
};
const notFound = {
  title: "找不到页面",
  heading: "404",
  description: "抱歉，您访问的页面不存在或已被移动。",
  backHome: "返回首页",
  suggestionsTitle: "您可能在寻找：",
  exploreServices: "探索服务",
  contact: "联系我们"
};
const zh = {
  blog,
  bookingForm,
  nav,
  common,
  home,
  footer,
  services,
  about,
  dichvu,
  booking,
  bookingSuccess,
  myBookings,
  auth,
  contact,
  blocks,
  notFound
};
function unflatten(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const parts = k.split(".");
    let curr = out;
    for (let i = 0; i < parts.length - 1; i++) {
      curr[parts[i]] = curr[parts[i]] ?? {};
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = v;
  }
  return out;
}
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ja: { translation: ja },
    ko: { translation: ko },
    zh: { translation: zh }
  },
  fallbackLng: "vi",
  supportedLngs: ["vi", "en", "ja", "ko", "zh"],
  interpolation: { escapeValue: false },
  detection: {
    order: ["querystring", "localStorage", "navigator"],
    lookupQuerystring: "lang",
    caches: ["localStorage"]
  }
});
async function loadRemoteTranslations(lang) {
  try {
    const res = await fetch(`/i18n/${lang}/`, { headers: { Accept: "application/json" } });
    if (!res.ok) return;
    const flat = await res.json();
    i18n.addResourceBundle(lang, "translation", unflatten(flat), true, true);
  } catch {
  }
}
if (typeof window !== "undefined") {
  void loadRemoteTranslations("vi");
  void loadRemoteTranslations("en");
  void loadRemoteTranslations("ja");
  void loadRemoteTranslations("ko");
  void loadRemoteTranslations("zh");
}
const appName = "Mầm Spa";
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => data += chunk);
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}
async function main() {
  const input = await readStdin();
  const page = JSON.parse(input);
  const result = await createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => title ? `${title} — ${appName}` : appName,
    resolve: (name) => resolvePageComponent(
      `./Pages/${name}.tsx`,
      /* @__PURE__ */ Object.assign({ "./Pages/Blog/Index.tsx": () => import("./assets/Index-Bk25upiY.js"), "./Pages/Blog/Show.tsx": () => import("./assets/Show-DWwnJYd2.js"), "./Pages/Booking.tsx": () => import("./assets/Booking-Di5I7KJ7.js"), "./Pages/ChinhSach/Show.tsx": () => import("./assets/Show-C-hKGcsV.js"), "./Pages/Contact.tsx": () => import("./assets/Contact-rQI69-V9.js"), "./Pages/CustomPage/Show.tsx": () => import("./assets/Show-B_pIU9uT.js"), "./Pages/CustomerExperience.tsx": () => import("./assets/CustomerExperience-D9lzKbeQ.js"), "./Pages/DichVu.tsx": () => import("./assets/DichVu-DtI-2eIb.js"), "./Pages/DichVuCategory.tsx": () => import("./assets/DichVuCategory-FGkRahwy.js"), "./Pages/DichVuDetail.tsx": () => import("./assets/DichVuDetail-f4XCaiqz.js"), "./Pages/Gallery.tsx": () => import("./assets/Gallery-buY3zjUE.js"), "./Pages/GioiThieu.tsx": () => import("./assets/GioiThieu-4XNvkArj.js"), "./Pages/Home.tsx": () => import("./assets/Home-DI9rmyog.js"), "./Pages/Menu.tsx": () => import("./assets/Menu-a9b31n6-.js"), "./Pages/MyBookings.tsx": () => import("./assets/MyBookings-BESu3jk9.js"), "./Pages/NotFound.tsx": () => import("./assets/NotFound-DZKO9COk.js"), "./Pages/Offers.tsx": () => import("./assets/Offers-CUCB_aj6.js") })
    ),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  });
  process.stdout.write(JSON.stringify(result));
}
main().catch((error) => {
  process.stderr.write(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});
