"use client";

import { useEffect, useState } from "react";

type Language = "th" | "en" | "zh";

const translations = {
  th: {
    name: "บริษัท นิวไดมอนด์ สตาร์ช จำกัด", nav: ["หน้าแรก", "ประวัติ", "สินค้า", "โรงงาน", "คุณภาพ", "ร่วมงาน", "ติดต่อ"],
    heroEyebrow: "ผู้ผลิตแป้งมันสำปะหลังชั้นแนวหน้าของประเทศไทย", heroTitle: "แป้งมันสำปะหลัง\nมาตรฐานสากล", heroIntro: "เราเป็นโรงงานผู้ผลิตแป้งมันสำปะหลังที่มีคุณภาพได้มาตรฐานสากล ด้วยประสบการณ์ในแวดวงอุตสาหกรรมเกษตรมากกว่า 50 ปี", aboutButton: "รู้จักเรา", productButton: "ดูสินค้า",
    stats: [["50+", "ปีแห่งประสบการณ์"], ["2011", "ปีที่ก่อตั้งบริษัท"], ["150,000", "กำลังการผลิต (ตันต่อปี)"], ["TH · GLOBAL", "ตลาดในและต่างประเทศ"]],
    aboutLabel: "", aboutTitle: "ประสบการณ์ที่ส่งต่อเป็นคุณภาพ", aboutP1: "บริษัท นิวไดมอนด์ สตาร์ช จำกัด", aboutP2: "เราเป็นโรงงานผู้ผลิตแป้งมันสำปะหลัง ที่มีคุณภาพได้มาตรฐานสากล ชั้นแนวหน้าของประเทศไทย ด้วยประสบการณ์ในแวดวงอุตสาหกรรมเกษตรมากว่า 50 ปี", aboutP3: "บริษัท นิวไดมอนด์ สตาร์ช จำกัด ก่อตั้งขึ้นในปี พ.ศ.2554 และเริ่มผลิตสินค้าคุณภาพส่งมอบให้ลูกค้าทั้งในและต่างประเทศ ด้วยวิสัยทัศน์และนโยบายที่ “มุ่งมั่นผลิตสินค้าที่มีคุณภาพได้มาตรฐานตามความต้องการของลูกค้า และสร้างความพึงพอใจสูงสุดในด้านคุณภาพและบริการ” ทำให้ได้รับความเชื่อมั่นและไว้วางใจจากลูกค้าเรื่อยมาจนถึงปัจจุบัน",
    videosLabel: "", videosTitle: "รู้จักนิวไดมอนด์ สตาร์ชให้มากขึ้น", videoLong: "เพื่อนๆ มาชมโรงงานของเรากันเลย", videoShort: "โรงงานมันสำปะหลัง New Diamond Starch",
    factoryLabel: "โรงงานของเรา", factoryTitle: "โรงงานและกระบวนการผลิต", factoryIntro: "ภาพจากโรงงาน บริษัท นิวไดมอนด์ สตาร์ช จำกัด", gallery: ["พื้นที่โรงงาน", "ตรวจสอบกระบวนการผลิต", "ระบบบรรจุสินค้า", "การเคลื่อนย้ายสินค้า", "ระบบบรรจุอัตโนมัติ", "ห้องปฏิบัติการ", "คลังสินค้า", "คลังสินค้า"],
    productsLabel: "สินค้า", productsTitle: "แป้งมันสำปะหลัง", productsIntro: "ผลิตภัณฑ์แป้งมันสำปะหลัง Food Grade และ Industrial Grade", grades: ["แป้งมันสำปะหลัง Food Grade.", "แป้งมันสำปะหลัง Industrial Grade."],
    qualityLabel: "", qualityTitle: "คุณภาพ มาตรฐานสากล ส่งออกกว่า 14 ประเทศทั่วโลก", qualityBody: "เราผลิตแป้งมันสำปะหลังที่มีคุณภาพได้มาตรฐานสากล และส่งมอบให้ลูกค้าทั้งในและต่างประเทศ",
    careerLabel: "ร่วมงานกับเรา", careerTitle: "เปิดรับสมัครบุคลากรที่มีความสามารถในด้านต่างๆ ดังต่อไปนี้", jobs: [["วิศวกรโรงงาน", "1 ตำแหน่ง", "วุฒิการศึกษา ปริญญาตรี วิศวกรรม อุตสาหการ หรือสาขาที่เกี่ยวข้อง"], ["วิศวกรไฟฟ้า", "1 ตำแหน่ง", "วุฒิการศึกษา ปริญญาตรี วิศวกรรม ไฟฟ้า หรือสาขาที่เกี่ยวข้อง"], ["นักวิจัย", "1 ตำแหน่ง", "วุฒิการศึกษา ปริญญาตรี วิทยาศาสตร์ สาขา เคมี, อาหาร หรือสาขาที่เกี่ยวข้อง"], ["ช่างกลโรงงาน", "2 ตำแหน่ง", "วุฒิการศึกษา ปวช. สาขา เครื่องกล หรืสาขาที่เกี่ยวข้อง"], ["นักบัญชี", "2 ตำแหน่ง", "วุฒิการศึกษา ปวช., ปวส., ปริญญาตรี สาขา บัญชี หรือสาขาที่เกี่ยวข้อง"], ["เจ้าหน้าที่ QC", "2 ตำแหน่ง", "วุฒิการศึกษา ปวช."]],
    contactLabel: "ติดต่อเรา", contactTitle: "บริษัท นิวไดมอนด์ สตาร์ช จำกัด", addressLabel: "ที่อยู่", address: "เลขที่ 99 หมู่ 8 ต.คลองขลุง อ.คลองขลุง จ.กำแพงเพชร ไปรษณีย์ 62120", phoneLabel: "โทร", mobileLabel: "มือถือ", faxLabel: "แฟกซ์", emailLabel: "อีเมล", map: "ดูแผนที่", rights: "© 2023 บริษัท นิวไดมอนด์ สตาร์ช จำกัด",
  },
  en: {
    name: "NEW DIAMOND STARCH CO., LTD.", nav: ["Home", "Profile", "Products", "Factory", "Quality", "Careers", "Contact"],
    heroEyebrow: "THAILAND'S LEADING TAPIOCA STARCH FACTORY", heroTitle: "INTERNATIONAL STANDARD\nTAPIOCA STARCH", heroIntro: "We produce cassava starch (tapioca starch) with international standards and 50 years of experience in the tapioca starch industry.", aboutButton: "Our profile", productButton: "Products",
    stats: [["50+", "Years experience"], ["2011", "Factory established"], ["150,000", "Production capacity (tons/year)"], ["TH · GLOBAL", "Domestic & international"]],
    aboutLabel: "PROFILE", aboutTitle: "New Diamond Starch Co., Ltd.", aboutP1: "Located at 99 moo 8 Khlongkhlung, Khlongkhlung, Khamphaengpet 62120, Thailand.", aboutP2: "We produce the cassava starch (tapioca starch) with the international standard. We are the leading of Thailand’s tapioca starch factory with the high experience about the tapioca starch for 50 years.", aboutP3: "New Diamond starch Co.,Ltd. factory established in 2011. We provide the tapioca starch both domestic market and international market. Our vision are to make the high quality tapioca starch and the best service to reach the satisfaction for our customer. This is the reason why our customer confident in our company until present.",
    videosLabel: "COMPANY VIDEOS", videosTitle: "Discover New Diamond Starch", videoLong: "Company film", videoShort: "Watch the short film",
    factoryLabel: "OUR FACTORY", factoryTitle: "Factory and production", factoryIntro: "Images from New Diamond Starch Co., Ltd. factory.", gallery: ["Factory area", "Production inspection", "Packing system", "Material handling", "Automated packing", "Laboratory", "Warehouse", "Warehouse"],
    productsLabel: "PRODUCTS", productsTitle: "Tapioca starch", productsIntro: "Tapioca starch Food Grade and Industrial Grade.", grades: ["Tapica starch Food Grade.", "Tapioca starch Industrial Grade."],
    qualityLabel: "QUALITY", qualityTitle: "International quality standards, exported to over 14 countries worldwide", qualityBody: "We produce the cassava starch (tapioca starch) with the international standard for domestic market and international market.",
    careerLabel: "CAREERS", careerTitle: "Recruiting talented personnel in various fields below.", jobs: [["Industrial Engineer", "1 position", "Bachelor’s Degree in Industrial Engineering or related field."], ["Electrical Engineer", "1 position", "Bachelor’s Degree in Electrical Engineering or related field."], ["Researcher", "1 position", "Bachelor of Science in Chemistry, Food Science or related field."], ["Mechanic", "2 position", "Vocational Certificate in mechanic or related field."], ["Accountant", "2 position", "Vocational Certificate in Accounting, Bachelor of Accounting or related field."], ["QC staff", "2 position", "Vocational Certificate."]],
    contactLabel: "CONTACT", contactTitle: "NEW DIAMOND STARCH CO., LTD.", addressLabel: "Address", address: "99 moo 8 Khlongkhlung, Khlongkhlung, Khamphaengpet 62120, Thailand.", phoneLabel: "Tel.", mobileLabel: "Mobile", faxLabel: "Fax", emailLabel: "Email", map: "View on map", rights: "© 2023 New Diamond Starch Co.,Ltd. All Right Reserved.",
  },
  zh: {
    name: "新钻石淀粉有限公司", nav: ["首页", "公司介绍", "产品", "工厂", "质量", "招聘", "联系"],
    heroEyebrow: "泰国领先的木薯淀粉生产商", heroTitle: "符合国际标准的\n木薯淀粉", heroIntro: "我们生产木薯淀粉达到泰国际标准，已经有了50年生产木薯淀粉的经验。", aboutButton: "公司介绍", productButton: "我们的产品",
    stats: [["50+", "年生产经验"], ["2011", "公司成立"], ["150,000", "产能（吨/年）"], ["TH · GLOBAL", "国内及国际市场"]],
    aboutLabel: "公司介绍书", aboutTitle: "新钻石淀粉有限公司", aboutP1: "地址 : 99 Moo 8 Khlongkhlung, Khlongkhlung, Kamphaengpet 62120, Thailand.", aboutP2: "我们生产木薯淀粉达到泰国际标准。我们是木薯淀粉界的先锋 ， 我们已经有了50 年生产木薯淀粉的经验。", aboutP3: "新钻石淀粉有限公司, 成立于 2011 年。我们供应的木薯有销售国内市场及销售国际市场。我们的愿望是打造高质量的木薯淀粉及给予最好的服务，以得到客户的满意。这就是我们客户为什么对我们公司一直以来都有信心的原因。",
    videosLabel: "公司视频", videosTitle: "进一步了解新钻石淀粉", videoLong: "公司介绍影片", videoShort: "观看短片",
    factoryLabel: "工厂", factoryTitle: "工厂及生产流程", factoryIntro: "新钻石淀粉有限公司工厂图片", gallery: ["工厂区域", "生产检查", "包装系统", "物料搬运", "自动包装", "实验室", "仓库", "仓库"],
    productsLabel: "我们的产品", productsTitle: "木薯淀粉", productsIntro: "原淀粉食品级及原淀粉工业级", grades: ["原淀粉食品级", "原淀粉工业级"],
    qualityLabel: "质量", qualityTitle: "国际品质标准，出口全球14多个国家", qualityBody: "我们生产木薯淀粉达到泰国际标准，供应国内市场及国际市场。",
    careerLabel: "招聘", careerTitle: "Recruiting talented personnel in various fields below.", jobs: [["Industrial Engineer", "1 position", "Bachelor’s Degree in Industrial Engineering or related field."], ["Electrical Engineer", "1 position", "Bachelor’s Degree in Electrical Engineering or related field."], ["Researcher", "1 position", "Bachelor of Science in Chemistry, Food Science or related field."], ["Mechanic", "2 position", "Vocational Certificate in mechanic or related field."], ["Accountant", "2 position", "Vocational Certificate in Accounting, Bachelor of Accounting or related field."], ["QC staff", "2 position", "Vocational Certificate."]],
    contactLabel: "联系我们", contactTitle: "新钻石淀粉有限公司", addressLabel: "地址", address: "99 moo 8 Khlongkhlung, Khlongkhlung, Khamphaengpet 62120, Thailand.", phoneLabel: "电话", mobileLabel: "手机", faxLabel: "传真", emailLabel: "Email", map: "查看地图", rights: "© 2023 新钻淀粉有限公司 版权所有 保留所有权利。",
  },
};

const galleryImages = ["p8.png", "p1.png", "p2.png", "p3.png", "p4.png", "p6.png", "p5.png", "p7.png"];
const productImages = ["bag-25.jpg", "bag-500.jpg", "bag-850.jpg"];
const productSizes = ["25 / 50", "500", "850"];

export function NewDiamondHome({ initialLanguage = "th" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [featuredVideoId, setFeaturedVideoId] = useState("e6EJ75hb8Cc");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeQr, setActiveQr] = useState<{ image: string; label: string } | null>(null);
  useEffect(() => {
    if (!activeQr) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveQr(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeQr]);
  const text = translations[language];
  const anchors = ["home", "about", "products", "factory", "quality", "careers", "contact"];
  const videoItems = [
    { id: "e6EJ75hb8Cc", title: "New Diamond Starch: The White Awakening", label: text.videoLong, duration: "10:08", image: "video-white-awakening.jpg" },
    { id: "-l6T1fynSOc", title: "NEW DIAMOND STARCH", label: text.videoShort, duration: "2:27", image: "video-company.jpg" },
  ];
  const orderedVideos = [...videoItems].sort((a, b) => Number(b.id === featuredVideoId) - Number(a.id === featuredVideoId));
  const selectVideo = (id: string) => {
    setFeaturedVideoId(id);
    setActiveVideo(id);
  };
  const changeLanguage = (next: Language) => {
    setLanguage(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
    window.history.replaceState(null, "", `/${next}${window.location.hash}`);
  };

  return <main>
    <section className="hero" id="home">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="New Diamond Starch"><img src="/images/logo.png" alt="New Diamond Starch" /><span><strong>NEW DIAMOND STARCH CO., LTD.</strong><small>新钻石淀粉有限公司</small></span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menu"><span/><span/><span/></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">{text.nav.map((item,index)=><a key={item} href={`#${anchors[index]}`} onClick={()=>setMenuOpen(false)}>{item}</a>)}</nav>
        <div className="languages" aria-label="Language selector">{(["th","en","zh"] as Language[]).map(code=><button key={code} className={language===code?"active":""} onClick={()=>changeLanguage(code)} aria-pressed={language===code}>{code==="th"?"TH":code==="en"?"EN":"中文"}</button>)}</div>
      </header>
      <div className="hero-content"><p className="eyebrow">{text.heroEyebrow}</p><h1>{text.heroTitle}</h1><p className="hero-intro">{text.heroIntro}</p><div className="hero-actions"><a className="button primary" href="#about">{text.aboutButton}</a><a className="button secondary" href="#products">{text.productButton}</a></div></div>
      <div className="hero-stats" aria-label="Company highlights">{text.stats.map(([value,label])=><article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
    </section>

    <section className="section about" id="about"><div className="section-grid about-grid"><div className="section-copy">{text.aboutLabel && <p className="section-label">{text.aboutLabel}</p>}<h2>{text.aboutTitle}</h2><p className="lead">{text.aboutP1}</p><p>{text.aboutP2}</p><p>{text.aboutP3}</p></div><div className="about-visual"><img src="/images/about-company.png" alt={text.factoryTitle}/><div className="experience-seal"><strong>50</strong><span>{text.stats[0][1]}</span></div></div></div></section>

    <section className="section videos-section" aria-labelledby="videos-title">
      <div className="section-heading center videos-heading"><div className="videos-heading-copy">{text.videosLabel && <p className="section-label">{text.videosLabel}</p>}<h2 id="videos-title">{text.videosTitle}</h2></div><img className="videos-mascot" src="/images/mascot-02.png" alt="New Diamond Starch mascot" /></div>
      <div className="videos-grid">
        {orderedVideos.map((video, index) => <article className={`video-card${index === 0 ? " featured" : ""}`} key={video.id}>
          <div className="video-frame">
            {activeVideo === video.id ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button className="video-poster" onClick={() => selectVideo(video.id)} aria-label={`${video.label}: ${video.title}`} style={{ backgroundImage: `linear-gradient(180deg,transparent 40%,rgba(2,20,15,.72)),url(/images/${video.image})` }}><span className="play-button">▶</span><small>{video.duration}</small></button>}
          </div>
          <div className="video-info"><p>{video.label}</p><button className="video-title-button" onClick={() => selectVideo(video.id)}>{video.title}</button><a className="youtube-icon-link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" aria-label="YouTube"><img src="/images/youtube.png" alt="YouTube"/></a></div>
        </article>)}
      </div>
    </section>

    <section className="section factory-section" id="factory"><div className="section-heading center"><h2>{text.factoryTitle}</h2></div><div className="interactive-gallery"><figure className="gallery-main"><img src={`/images/gallery-new/${galleryImages[activeGalleryIndex]}`} alt={text.gallery[activeGalleryIndex]}/><figcaption><span>{String(activeGalleryIndex+1).padStart(2,"0")}</span>{text.gallery[activeGalleryIndex]}</figcaption></figure><div className="gallery-thumbnails" aria-label={text.factoryTitle}>{galleryImages.map((image,index)=><button type="button" key={image} className={index===activeGalleryIndex?"active":""} onClick={()=>setActiveGalleryIndex(index)} aria-pressed={index===activeGalleryIndex} aria-label={`${String(index+1).padStart(2,"0")} ${text.gallery[index]}`}><img src={`/images/gallery-new/${image}`} alt=""/><span><strong>{String(index+1).padStart(2,"0")}</strong>{text.gallery[index]}</span></button>)}</div></div></section>

    <section className="section products-section" id="products"><div className="section-heading center"><h2>{text.productsTitle}</h2><p>{text.productsIntro}</p></div><div className="product-grid">{productImages.map((image,index)=><article className="product-card" key={image}><div className="product-image"><img src={`/images/${image}`} alt={`${productSizes[index]} kg`}/></div><div className="product-info"><h3>{productSizes[index]} <small>kg</small></h3><ul>{text.grades.map(grade=><li key={grade}>{grade}</li>)}</ul></div></article>)}</div></section>

    <section className="quality-section" id="quality"><div className="quality-copy">{text.qualityLabel && <p className="section-label light">{text.qualityLabel}</p>}<h2>{text.qualityTitle}</h2><p>{text.qualityBody}</p><img className="certificates" src="/images/certificates.png" alt={text.qualityTitle}/></div><div className="export-visual"><img src="/images/ship.png" alt={text.qualityBody}/></div></section>

    <section className="section careers-section" id="careers"><div className="section-heading"><p className="section-label">{text.careerLabel}</p><h2>{text.careerTitle}</h2></div><div className="jobs-grid">{text.jobs.map(([title,count,detail],index)=><article className="job-card" key={title}><span className="job-number">{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><strong>{count}</strong><p>{detail}</p></article>)}</div></section>

    <footer id="contact"><div className="footer-main"><div className="footer-brand"><img src="/images/logo.png" alt="New Diamond Starch"/><div><p className="section-label light">{text.contactLabel}</p><h2>{text.contactTitle}</h2></div></div><div className="contact-grid"><div><img className="contact-icon" src="/images/contact-icons/location.png" alt={text.addressLabel} title={text.addressLabel}/><p>{text.address}</p><a className="map-link" href="https://maps.google.com/?q=99+moo+8+Khlongkhlung+Kamphaengpet+62120" target="_blank" rel="noreferrer">{text.map} ↗</a></div><div><img className="contact-icon" src="/images/contact-icons/phone.png" alt={text.phoneLabel} title={text.phoneLabel}/><a href="tel:+6655741623">+66 55 741 623</a><small>{text.mobileLabel}</small><a href="tel:+66954492564">+66 95 449 2564</a><small>{text.faxLabel}</small><p>+66 55 741 624</p></div><div><img className="contact-icon" src="/images/contact-icons/mail.png" alt={text.emailLabel} title={text.emailLabel}/><a href="mailto:new_diamond_starch@hotmail.com">new_diamond_starch@hotmail.com</a><img className="contact-icon" src="/images/contact-icons/fb.png" alt="Facebook" title="Facebook"/><a href="https://www.facebook.com/newdiamondstarch/" target="_blank" rel="noreferrer">New Diamond Starch</a></div><div><button className="qr-trigger" type="button" onClick={()=>setActiveQr({image:"wechat.jpg",label:"WeChat"})} aria-label="Show WeChat QR code"><img className="contact-icon" src="/images/contact-icons/wchat.png" alt=""/></button><p>Bom6644</p><button className="qr-trigger" type="button" onClick={()=>setActiveQr({image:"line.jpg",label:"LINE"})} aria-label="Show LINE QR code"><img className="contact-icon" src="/images/contact-icons/line.png" alt=""/></button><p>uaychai88</p><button className="qr-trigger" type="button" onClick={()=>setActiveQr({image:"whatsapp.jpg",label:"WhatsApp"})} aria-label="Show WhatsApp QR code"><img className="contact-icon" src="/images/contact-icons/wapp.png" alt=""/></button><p>Bomss6644</p></div></div></div><div className="footer-bottom"><span>{text.rights}</span><div className="footer-languages"><button onClick={()=>changeLanguage("en")}>ENGLISH</button><button onClick={()=>changeLanguage("th")}>ไทย</button><button onClick={()=>changeLanguage("zh")}>中文 (中国)</button></div></div></footer>
    {activeQr && <div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-modal-title" onMouseDown={()=>setActiveQr(null)}><div className="qr-modal-card" onMouseDown={(event)=>event.stopPropagation()}><button className="qr-close" type="button" onClick={()=>setActiveQr(null)} aria-label="Close QR code">×</button><h2 id="qr-modal-title">{activeQr.label} QR Code</h2><img src={`/images/contact-qr/${activeQr.image}`} alt={`${activeQr.label} QR Code`}/></div></div>}
  </main>;
}

export default function Home() {
  return <NewDiamondHome initialLanguage="th" />;
}
