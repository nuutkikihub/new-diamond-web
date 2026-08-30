"use client";

import { useEffect, useState } from "react";

const activityImages = Array.from({ length: 12 }, (_, index) =>
  `/images/activities/activity-${String(index + 1).padStart(2, "0")}.jpg`,
);

export function ActivityGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [activeQr, setActiveQr] = useState<{ image: string; label: string } | null>(null);

  useEffect(() => {
    if (modalIndex !== null || activeQr !== null) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % activityImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [modalIndex, activeQr]);

  useEffect(() => {
    if (modalIndex === null && activeQr === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalIndex(null);
        setActiveQr(null);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalIndex, activeQr]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + activityImages.length) % activityImages.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % activityImages.length);
  };

  return (
    <main className="activities-page">
      <section className="activities-hero" aria-label="กิจกรรมสาธารณประโยชน์">
        <div className="activities-hero-slideshow" aria-label="ภาพกิจกรรมสาธารณประโยชน์">
          {activityImages.map((image, index) => (
            <button
              className={`activities-hero-slide${index === activeIndex ? " active" : ""}`}
              type="button"
              key={image}
              onClick={() => setModalIndex(index)}
              aria-label={`เปิดภาพกิจกรรม ${index + 1}`}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <img src={image} alt="" />
            </button>
          ))}
          <button className="slide-arrow previous" type="button" onClick={showPrevious} aria-label="ภาพก่อนหน้า">‹</button>
          <button className="slide-arrow next" type="button" onClick={showNext} aria-label="ภาพถัดไป">›</button>
          <div className="slide-status" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(activityImages.length).padStart(2, "0")}</span>
          </div>
          <div className="slide-dots" aria-label="เลือกภาพสไลด์">
            {activityImages.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`ไปยังภาพที่ ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
        <div className="activities-hero-shade" />

        <header className="activities-header">
          <a className="activities-brand" href="/" aria-label="กลับหน้าเว็บไซต์หลัก">
            <img src="/images/logo3.png" alt="New Diamond Starch" />
            <span>
              <strong>NEW DIAMOND STARCH CO., LTD.</strong>
              <small>บริษัท นิวไดมอนด์ สตาร์ช จำกัด</small>
            </span>
          </a>
          <a className="activities-back" href="/">← กลับหน้าหลัก</a>
        </header>

        <div className="activities-hero-content">
          <div className="activities-intro-copy">
            <p className="activities-kicker">OUR SOCIAL RESPONSIBILITY</p>
            <h1>กิจกรรมสาธารณประโยชน์</h1>
            <p className="activities-lead">
              นิว ไดมอนด์ สตาร์ช เราเชื่อว่าการเติบโตที่แท้จริง คือการเติบโตไปพร้อมกับสังคม
            </p>
            <p>
              เรามุ่งมั่นร่วมสนับสนุนกิจกรรมสาธารณประโยชน์ ไม่ว่าจะเป็นการดูแลสิ่งแวดล้อม
              การส่งเสริมอาชีพให้ชาวไร่ หรือการมอบโอกาสทางการศึกษาให้กับเยาวชน
            </p>
            <p>
              เพราะพวกเราคือครอบครัวเดียวกัน และเราจะสร้างรอยยิ้มที่ยั่งยืนไปด้วยกันครับ!
            </p>
          </div>
        </div>

        <p className="activities-slide-signature">
          <strong>นิว ไดมอนด์ สตาร์ช</strong>
          <span>แป้งมันคุณภาพ เพื่อชีวิตที่ยั่งยืน</span>
        </p>

      </section>

      <section className="activities-gallery-section" aria-labelledby="activities-gallery-title">
        <div className="activities-gallery-heading">
          <p>PHOTO GALLERY</p>
          <h2 id="activities-gallery-title">ภาพกิจกรรมของเรา</h2>
          <span>ร่วมสร้างคุณค่าและรอยยิ้มที่ยั่งยืนไปพร้อมกับชุมชน</span>
        </div>
        <div className="activities-gallery">
          {activityImages.map((image, index) => (
            <button type="button" key={image} onClick={() => setModalIndex(index)} aria-label={`ขยายภาพกิจกรรม ${index + 1}`}>
              <img src={image} alt={`กิจกรรมสาธารณประโยชน์ ภาพที่ ${index + 1}`} loading={index > 5 ? "lazy" : "eager"} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/images/logo3.png" alt="New Diamond Starch" />
            <p className="section-label light">ติดต่อเรา</p>
          </div>
          <div className="contact-grid">
            <div>
              <img className="contact-icon" src="/images/contact-icons/location.png" alt="ที่อยู่" title="ที่อยู่" />
              <p>เลขที่ 99 หมู่ 8 ต.คลองขลุง อ.คลองขลุง จ.กำแพงเพชร ไปรษณีย์ 62120</p>
              <a className="map-link" href="https://maps.google.com/?q=99+moo+8+Khlongkhlung+Kamphaengpet+62120" target="_blank" rel="noreferrer">ดูแผนที่ ↗</a>
            </div>
            <div>
              <img className="contact-icon" src="/images/contact-icons/phone.png" alt="โทร" title="โทร" />
              <a href="tel:+6655741623">+66 55 741 623</a>
              <small>มือถือ</small>
              <a href="tel:+66954492564">+66 95 449 2564</a>
              <small>แฟกซ์</small>
              <p>+66 55 741 624</p>
            </div>
            <div>
              <img className="contact-icon" src="/images/contact-icons/mail.png" alt="อีเมล" title="อีเมล" />
              <a href="mailto:new_diamond_starch@hotmail.com">new_diamond_starch@hotmail.com</a>
              <img className="contact-icon" src="/images/contact-icons/fb.png" alt="Facebook" title="Facebook" />
              <a href="https://www.facebook.com/newdiamondstarch/" target="_blank" rel="noreferrer">New Diamond Starch</a>
            </div>
            <div>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "wechat.jpg", label: "WeChat" })} aria-label="แสดง QR Code WeChat"><img className="contact-icon" src="/images/contact-icons/wchat.png" alt="" /></button>
              <p>Bom6644</p>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "line.jpg", label: "LINE" })} aria-label="แสดง QR Code LINE"><img className="contact-icon" src="/images/contact-icons/line.png" alt="" /></button>
              <p>uaychai88</p>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "whatsapp.jpg", label: "WhatsApp" })} aria-label="แสดง QR Code WhatsApp"><img className="contact-icon" src="/images/contact-icons/wapp.png" alt="" /></button>
              <p>Bomss6644</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2023 บริษัท นิวไดมอนด์ สตาร์ช จำกัด</span>
          <div className="footer-languages">
            <button type="button" onClick={() => { window.location.href = "/en"; }}>ENGLISH</button>
            <button type="button" onClick={() => { window.location.href = "/th"; }}>ไทย</button>
            <button type="button" onClick={() => { window.location.href = "/zh"; }}>中文 (中国)</button>
          </div>
        </div>
      </footer>

      {modalIndex !== null && (
        <div className="activity-modal" role="dialog" aria-modal="true" aria-label={`ภาพกิจกรรม ${modalIndex + 1}`} onMouseDown={() => setModalIndex(null)}>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="activity-modal-close" onClick={() => setModalIndex(null)} aria-label="ปิดภาพ">×</button>
            <img src={activityImages[modalIndex]} alt={`กิจกรรมสาธารณประโยชน์ ภาพที่ ${modalIndex + 1}`} />
            <figcaption>กิจกรรมสาธารณประโยชน์ · ภาพที่ {modalIndex + 1} จาก {activityImages.length}</figcaption>
          </figure>
        </div>
      )}
      {activeQr && (
        <div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="activity-qr-modal-title" onMouseDown={() => setActiveQr(null)}>
          <div className="qr-modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <button className="qr-close" type="button" onClick={() => setActiveQr(null)} aria-label="ปิด QR Code">×</button>
            <h2 id="activity-qr-modal-title">{activeQr.label} QR Code</h2>
            <img src={`/images/contact-qr/${activeQr.image}`} alt={`${activeQr.label} QR Code`} />
          </div>
        </div>
      )}
    </main>
  );
}
