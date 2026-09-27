"use client";

import { useEffect, useState } from "react";
import { activityTranslations, type ActivityLanguage } from "./translations";

const activityImages = Array.from({ length: 12 }, (_, index) =>
  `/images/activities/activity-${String(index + 1).padStart(2, "0")}.jpg`,
);

export function ActivityGallery({ language = "th" }: { language?: ActivityLanguage }) {
  const text = activityTranslations[language];
  const homePath = `/${language}`;
  useEffect(() => { document.documentElement.lang = language === "zh" ? "zh-CN" : language; }, [language]);
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
    <main className="activities-page" lang={language === "zh" ? "zh-CN" : language}>
      <section className="activities-hero" aria-label={text.title}>
        <div className="activities-hero-slideshow" aria-label={text.title}>
          {activityImages.map((image, index) => (
            <button
              className={`activities-hero-slide${index === activeIndex ? " active" : ""}`}
              type="button"
              key={image}
              onClick={() => setModalIndex(index)}
              aria-label={`${text.openPhoto} ${index + 1}`}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <img src={image} alt="" />
            </button>
          ))}
          <button className="slide-arrow previous" type="button" onClick={showPrevious} aria-label={text.previous}>‹</button>
          <button className="slide-arrow next" type="button" onClick={showNext} aria-label={text.next}>›</button>
          <div className="slide-status" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(activityImages.length).padStart(2, "0")}</span>
          </div>
          <div className="slide-dots" aria-label={text.slides}>
            {activityImages.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`${text.goTo} ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
        <div className="activities-hero-shade" />

        <header className="activities-header">
          <a className="activities-brand" href={homePath} aria-label={text.homeLabel}>
            <img src="/images/logo3.png" alt="New Diamond Starch" />
            <span>
              <strong>NEW DIAMOND STARCH CO., LTD.</strong>
              <small>{text.company}</small>
            </span>
          </a>
          <div className="activities-header-actions"><a className="activities-back" href={homePath}>← {text.back}</a><nav className="activities-languages" aria-label={text.languages}>{(["th", "en", "zh"] as const).map((code) => <a key={code} href={`/${code}/activities`} hrefLang={code === "zh" ? "zh-CN" : code} aria-current={language === code ? "page" : undefined}>{code === "th" ? "TH" : code === "en" ? "EN" : "中文"}</a>)}</nav></div>
        </header>

        <div className="activities-hero-content">
          <div className="activities-intro-copy">
            <h1>{text.title}</h1>
            <p className="activities-lead">{text.lead}</p>
            <p>{text.body}</p>
            <p>{text.closing}</p>
          </div>
        </div>

        <p className="activities-slide-signature">
          <strong>{text.brand}</strong>
          <span>{text.tagline}</span>
        </p>

      </section>

      <section className="activities-gallery-section" aria-labelledby="activities-gallery-title">
        <div className="activities-gallery-heading">
          <p>{text.galleryKicker}</p>
          <h2 id="activities-gallery-title">{text.galleryTitle}</h2>
          <span>{text.galleryIntro}</span>
        </div>
        <div className="activities-gallery">
          {activityImages.map((image, index) => (
            <button type="button" key={image} onClick={() => setModalIndex(index)} aria-label={`${text.enlargePhoto} ${index + 1}`}>
              <img src={image} alt={`${text.photo} ${index + 1}`} loading={index > 5 ? "lazy" : "eager"} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/images/logo3.png" alt="New Diamond Starch" />
            <p className="section-label light">{text.contact}</p>
          </div>
          <div className="contact-grid">
            <div>
              <img className="contact-icon" src="/images/contact-icons/location.png" alt={text.addressLabel} title={text.addressLabel} />
              <p>{text.address}</p>
              <a className="map-link" href="https://maps.google.com/?q=99+moo+8+Khlongkhlung+Kamphaengpet+62120" target="_blank" rel="noreferrer">{text.map} ↗</a>
            </div>
            <div>
              <img className="contact-icon" src="/images/contact-icons/phone.png" alt={text.phone} title={text.phone} />
              <a href="tel:+6655741623">+66 55 741 623</a>
              <small>{text.mobile}</small>
              <a href="tel:+66954492564">+66 95 449 2564</a>
              <small>{text.fax}</small>
              <p>+66 55 741 624</p>
            </div>
            <div>
              <img className="contact-icon" src="/images/contact-icons/mail.png" alt={text.email} title={text.email} />
              <a href="mailto:new_diamond_starch@hotmail.com">new_diamond_starch@hotmail.com</a>
              <img className="contact-icon" src="/images/contact-icons/fb.png" alt="Facebook" title="Facebook" />
              <a href="https://www.facebook.com/newdiamondstarch/" target="_blank" rel="noreferrer">New Diamond Starch</a>
            </div>
            <div>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "wechat.jpg", label: "WeChat" })} aria-label={`${text.showQr} WeChat`}><img className="contact-icon" src="/images/contact-icons/wchat.png" alt="" /></button>
              <p>Bom6644</p>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "line.jpg", label: "LINE" })} aria-label={`${text.showQr} LINE`}><img className="contact-icon" src="/images/contact-icons/line.png" alt="" /></button>
              <p>uaychai88</p>
              <button className="qr-trigger" type="button" onClick={() => setActiveQr({ image: "whatsapp.jpg", label: "WhatsApp" })} aria-label={`${text.showQr} WhatsApp`}><img className="contact-icon" src="/images/contact-icons/wapp.png" alt="" /></button>
              <p>Bomss6644</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {text.company}</span>
          <div className="footer-languages">
            <button type="button" onClick={() => { window.location.href = "/en/activities"; }}>ENGLISH</button>
            <button type="button" onClick={() => { window.location.href = "/th/activities"; }}>ไทย</button>
            <button type="button" onClick={() => { window.location.href = "/zh/activities"; }}>中文 (中国)</button>
          </div>
        </div>
      </footer>

      {modalIndex !== null && (
        <div className="activity-modal" role="dialog" aria-modal="true" aria-label={`${text.photo} ${modalIndex + 1}`} onMouseDown={() => setModalIndex(null)}>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="activity-modal-close" onClick={() => setModalIndex(null)} aria-label={text.close}>×</button>
            <img src={activityImages[modalIndex]} alt={`${text.photo} ${modalIndex + 1}`} />
            <figcaption>{text.title} · {text.photo} {modalIndex + 1} {text.of} {activityImages.length}</figcaption>
          </figure>
        </div>
      )}
      {activeQr && (
        <div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="activity-qr-modal-title" onMouseDown={() => setActiveQr(null)}>
          <div className="qr-modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <button className="qr-close" type="button" onClick={() => setActiveQr(null)} aria-label={text.closeQr}>×</button>
            <h2 id="activity-qr-modal-title">{activeQr.label} QR Code</h2>
            <img src={`/images/contact-qr/${activeQr.image}`} alt={`${activeQr.label} QR Code`} />
          </div>
        </div>
      )}
    </main>
  );
}
