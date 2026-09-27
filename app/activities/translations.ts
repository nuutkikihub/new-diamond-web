export type ActivityLanguage = "th" | "en" | "zh";

export const activityTranslations = {
  th: {
    title: "กิจกรรมสาธารณประโยชน์", description: "กิจกรรมสาธารณประโยชน์ของบริษัท นิว ไดมอนด์ สตาร์ช จำกัด เพื่อสังคม สิ่งแวดล้อม เกษตรกร และเยาวชน",
    company: "บริษัท นิวไดมอนด์ สตาร์ช จำกัด", brand: "นิว ไดมอนด์ สตาร์ช", back: "กลับหน้าหลัก", homeLabel: "กลับหน้าเว็บไซต์หลัก", languages: "เลือกภาษา",
    kicker: "OUR SOCIAL RESPONSIBILITY", lead: "นิว ไดมอนด์ สตาร์ช เราเชื่อว่าการเติบโตที่แท้จริง คือการเติบโตไปพร้อมกับสังคม",
    body: "เรามุ่งมั่นร่วมสนับสนุนกิจกรรมสาธารณประโยชน์ ไม่ว่าจะเป็นการดูแลสิ่งแวดล้อม การส่งเสริมอาชีพให้ชาวไร่ หรือการมอบโอกาสทางการศึกษาให้กับเยาวชน",
    closing: "เพราะพวกเราคือครอบครัวเดียวกัน และเราจะสร้างรอยยิ้มที่ยั่งยืนไปด้วยกันครับ!", tagline: "แป้งมันคุณภาพ เพื่อชีวิตที่ยั่งยืน",
    galleryKicker: "PHOTO GALLERY", galleryTitle: "ภาพกิจกรรมของเรา", galleryIntro: "ร่วมสร้างคุณค่าและรอยยิ้มที่ยั่งยืนไปพร้อมกับชุมชน",
    photo: "ภาพกิจกรรม", openPhoto: "เปิดภาพกิจกรรม", enlargePhoto: "ขยายภาพกิจกรรม", previous: "ภาพก่อนหน้า", next: "ภาพถัดไป", slides: "เลือกภาพสไลด์", goTo: "ไปยังภาพที่", close: "ปิดภาพ", of: "จาก",
    contact: "ติดต่อเรา", addressLabel: "ที่อยู่", address: "เลขที่ 99 หมู่ 8 ต.คลองขลุง อ.คลองขลุง จ.กำแพงเพชร ไปรษณีย์ 62120", map: "ดูแผนที่", phone: "โทร", mobile: "มือถือ", fax: "แฟกซ์", email: "อีเมล", showQr: "แสดง QR Code", closeQr: "ปิด QR Code",
  },
  en: {
    title: "Community Activities", description: "New Diamond Starch's community activities supporting society, the environment, farmers, and young people.",
    company: "New Diamond Starch Co., Ltd.", brand: "New Diamond Starch", back: "Back to home", homeLabel: "Return to the main website", languages: "Select language",
    kicker: "OUR SOCIAL RESPONSIBILITY", lead: "At New Diamond Starch, we believe that true growth means growing together with our community.",
    body: "We support community initiatives through environmental care, opportunities for farmers, and educational opportunities for young people.",
    closing: "We are one family, working together to create lasting smiles!", tagline: "Quality tapioca starch for a sustainable life",
    galleryKicker: "PHOTO GALLERY", galleryTitle: "Our Activities", galleryIntro: "Creating lasting value and smiles together with our community",
    photo: "Activity photo", openPhoto: "Open activity photo", enlargePhoto: "Enlarge activity photo", previous: "Previous photo", next: "Next photo", slides: "Choose a slide", goTo: "Go to photo", close: "Close photo", of: "of",
    contact: "Contact us", addressLabel: "Address", address: "99 Moo 8, Khlong Khlung, Khlong Khlung, Kamphaeng Phet 62120, Thailand", map: "View map", phone: "Phone", mobile: "Mobile", fax: "Fax", email: "Email", showQr: "Show QR code", closeQr: "Close QR code",
  },
  zh: {
    title: "社会公益活动", description: "新钻石淀粉有限公司开展社会公益活动，支持社区、环境保护、农民及青少年。",
    company: "新钻石淀粉有限公司", brand: "新钻石淀粉", back: "返回首页", homeLabel: "返回主网站", languages: "选择语言",
    kicker: "我们的社会责任", lead: "新钻石淀粉相信，真正的成长是与社会共同成长。",
    body: "我们积极支持社会公益活动，包括保护环境、支持农民的职业发展，以及为青少年提供教育机会。",
    closing: "我们是一家人，将携手创造持久的笑容！", tagline: "优质木薯淀粉，共创可持续生活",
    galleryKicker: "活动相册", galleryTitle: "我们的活动照片", galleryIntro: "与社区携手创造持久的价值与笑容",
    photo: "活动照片", openPhoto: "打开活动照片", enlargePhoto: "放大活动照片", previous: "上一张照片", next: "下一张照片", slides: "选择幻灯片", goTo: "转到照片", close: "关闭照片", of: "/",
    contact: "联系我们", addressLabel: "地址", address: "泰国甘烹碧府空昆县空昆镇第8村99号，邮编62120", map: "查看地图", phone: "电话", mobile: "手机", fax: "传真", email: "电子邮箱", showQr: "显示二维码", closeQr: "关闭二维码",
  },
};

export function activityMetadata(language: ActivityLanguage) {
  const text = activityTranslations[language];
  return {
    title: `${text.title} | New Diamond Starch`,
    description: text.description,
    alternates: {
      canonical: `/${language}/activities`,
      languages: { th: "/th/activities", en: "/en/activities", "zh-CN": "/zh/activities", "x-default": "/activities" },
    },
  };
}
