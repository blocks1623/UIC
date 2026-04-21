'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const VIDEOS = [
  { id: "0TS902WHcVc",   title: "Recent Sermon",                url: "https://youtu.be/0TS902WHcVc" },
  { id: "36V_GmO3050",   title: "Recent Sermon",                url: "https://youtu.be/36V_GmO3050" },
  { id: "MnnpCZcyYiI",   title: "The Power of Faith in Christ", url: "https://youtu.be/MnnpCZcyYiI" },
  { id: "yb0ykMTb_dE",   title: "Recent Sermon",                url: "https://youtu.be/yb0ykMTb_dE" },
  { id: "RvP9Mha5bTA",   title: "Recent Sermon",                url: "https://youtu.be/RvP9Mha5bTA" },
  { id: "_AZxY5wJ7Pk",   title: "Recent Sermon",                url: "https://youtu.be/_AZxY5wJ7Pk" },
  { id: "S-IFCaO4A4s",   title: "Walking in God's Grace",       url: "https://youtu.be/S-IFCaO4A4s" },
  { id: "y7glFO4EkNk",   title: "Recent Sermon",                url: "https://youtu.be/y7glFO4EkNk" },
  { id: "LkaIPh6m6pc",   title: "Recent Sermon",                url: "https://youtu.be/LkaIPh6m6pc" },
  { id: "vwsWuBSVxbs",   title: "The Kingdom Mindset",          url: "https://youtu.be/vwsWuBSVxbs" },
  { id: "ezxL__tQr8A",   title: "Recent Sermon",                url: "https://youtu.be/ezxL__tQr8A" },
  { id: "hEkVmrYH1qo",   title: "New Sermon",                   url: "https://youtu.be/hEkVmrYH1qo" },
  { id: "WVEzMYhRbGg",   title: "New Sermon",                   url: "https://youtu.be/WVEzMYhRbGg" },
  { id: "kEj4c_ayeDY",   title: "New Sermon",                   url: "https://youtu.be/kEj4c_ayeDY" },
  { id: "n1gOAHFANn4",   title: "New Sermon",                   url: "https://youtu.be/n1gOAHFANn4" },
  { id: "cxNfd6Hv_mY",   title: "Prophetic Short",              url: "https://youtube.com/shorts/cxNfd6Hv_mY" },
  { id: "53iDdjlSwNo",   title: "Short",                        url: "https://youtube.com/shorts/53iDdjlSwNo" },
  { id: "Xu4jocaFM0o",   title: "Short",                        url: "https://youtube.com/shorts/Xu4jocaFM0o" },
  { id: "XDoobxFlqzs",   title: "Short",                        url: "https://youtube.com/shorts/XDoobxFlqzs" },
  { id: "En2_4YOxrVw",   title: "Short",                        url: "https://youtube.com/shorts/En2_4YOxrVw" },
  { id: "WDrH3-Dtpto",   title: "Short",                        url: "https://youtube.com/shorts/WDrH3-Dtpto" },
  { id: "2EOVwlxiUwE",   title: "Short",                        url: "https://youtube.com/shorts/2EOVwlxiUwE" },
  { id: "pOIojhQPk18",   title: "Short",                        url: "https://youtube.com/shorts/pOIojhQPk18" },
  { id: "6IrDC-YlNEs",   title: "Short",                        url: "https://youtube.com/shorts/6IrDC-YlNEs" },
  { id: "vPBM6grfixs",   title: "Short",                        url: "https://youtube.com/shorts/vPBM6grfixs" },
  { id: "Wg-hVdQgc3E",   title: "Short",                        url: "https://youtube.com/shorts/Wg-hVdQgc3E" },
  { id: "cibFZGWUfd8",   title: "Short",                        url: "https://youtube.com/shorts/cibFZGWUfd8" },
  { id: "rfMnBltV3yI",   title: "Short",                        url: "https://youtube.com/shorts/rfMnBltV3yI" },
  { id: "DUuek5Gw-Vk",   title: "Short",                        url: "https://youtube.com/shorts/DUuek5Gw-Vk" },
  { id: "nk6PxjyQmZ8",   title: "Short",                        url: "https://youtube.com/shorts/nk6PxjyQmZ8" },
  { id: "90Kld0S63W8",   title: "Short",                        url: "https://youtube.com/shorts/90Kld0S63W8" },
  { id: "SlTpWuFmrCA",   title: "Short",                        url: "https://youtube.com/shorts/SlTpWuFmrCA" },
  { id: "lW0qJhO5ndU",   title: "Short",                        url: "https://youtube.com/shorts/lW0qJhO5ndU" },
  { id: "hkPPlXCecsE",   title: "Short",                        url: "https://youtube.com/shorts/hkPPlXCecsE" },
  { id: "c9pgcEJ2hio",   title: "Short",                        url: "https://youtube.com/shorts/c9pgcEJ2hio" },
  { id: "hQrsI7cl0GY",   title: "Short",                        url: "https://youtube.com/shorts/hQrsI7cl0GY" },
  { id: "yNykB7oRYGI",   title: "Short",                        url: "https://youtube.com/shorts/yNykB7oRYGI" },
  { id: "UfRlNhGwzzs",   title: "Short",                        url: "https://youtube.com/shorts/UfRlNhGwzzs" },
  { id: "ahqOtvzMmy0",   title: "Short",                        url: "https://youtube.com/shorts/ahqOtvzMmy0" },
  { id: "vLLWPQvj7Sg",   title: "Short",                        url: "https://youtube.com/shorts/vLLWPQvj7Sg" },
];

const DOCUMENTS = [
  { name: "Dominion & Royalty in Christ",        viewUrl: "https://drive.google.com/file/d/1RehRpaL6Yv2MmSr4zfxo9QCC3tKmDq3c/view", isNew: false },
  { name: "Gifts Impress But Fruit Proves",      viewUrl: "https://drive.google.com/file/d/19E-XcK4mRD-KgfpbTlQDCLvOqpr5wJiX/view", isNew: false },
  { name: "Kingdom Service (Ministry) Pt 1",     viewUrl: "https://drive.google.com/file/d/13zRAHkv8aygwHnUCIdzrbpxShhtDN4PA/view", isNew: false },
  { name: "Kingdom Service (Ministry) Pt 2",     viewUrl: "https://drive.google.com/file/d/1kuhbzAuftVih5WszZb5Tv3rH0Rvniiwq/view", isNew: false },
  { name: "New Creation Reality",                viewUrl: "https://drive.google.com/file/d/1y2sif6rLXgrQzuGA4d4AYaPCgoegtVe_/view", isNew: false },
  { name: "Righteousness",                       viewUrl: "https://drive.google.com/file/d/1M3QorBT5ijy_nFHZcmuDn8qu-52m4Hnn/view", isNew: false },
  { name: "Stillness",                           viewUrl: "https://drive.google.com/file/d/11h_pPNgf9bJNQLdBnYozE11FcEUfTP9D/view", isNew: false },
  { name: "The Mystery of Creative Power",       viewUrl: "https://drive.google.com/file/d/1rVCx1v2Wv9bAHen_WQoINkCU5lAxBT4I/view", isNew: true  },
  { name: "The Godly Anointing",                 viewUrl: "https://drive.google.com/file/d/11RVAKxQ91d7PpkoIRcNL-wCCkD8O6yH8/view", isNew: true  },
  { name: "The Revelation of the Inner Kingdom", viewUrl: "https://drive.google.com/file/d/1UjNiIJLxQs1NWeq1CPewLfphEqVTUuaA/view", isNew: false },
  { name: "The Christian Walk (UIC)",            viewUrl: "https://drive.google.com/file/d/1IXS0XzpkYtvjGRMA4cGj_lpRBWtj1ePl/view", isNew: true  },
];

const SCRIPTURES = [
  { verse: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { verse: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.", ref: "John 3:16" },
  { verse: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { verse: "Trust in the Lord with all your heart, and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { verse: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.", ref: "Matthew 6:33" },
  { verse: "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
  { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
];

const PRAYER_CATEGORIES = [
  "Healing & Health","Guidance & Direction","Thanksgiving & Praise",
  "Financial Breakthrough","Relationships & Family","Spiritual Growth",
  "Salvation for Loved Ones","Protection & Safety","Career & Purpose","Other",
];

const PRAYER_WALL_ENTRIES = [
  { initials: "SM", name: "S.M",       category: "Healing & Health",        text: "Praying for complete healing and restoration in my body. God is faithful.",            time: "2h ago" },
  { initials: "TN", name: "T.N",       category: "Financial Breakthrough",   text: "Believing God for a financial miracle this season. His provision never fails.",        time: "5h ago" },
  { initials: "AN", name: "Anonymous", category: "Guidance & Direction",     text: "Standing at a crossroads. Trusting the Lord to order my steps clearly.",              time: "1d ago" },
  { initials: "LD", name: "L.D",       category: "Salvation for Loved Ones", text: "Interceding for my family to come to know the Lord. He is able to save!",            time: "2d ago" },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
function getDailyVideoIndex(len: number): number {
  const now = new Date(); const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return ((now.getFullYear() * 1000) + day) % len;
}
function getDailyScriptureIndex(len: number): number {
  const now = new Date(); const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000) % len;
}
function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(31, h) + seed.charCodeAt(i) | 0; }
  return Math.abs(h) / 2147483647;
}
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getEmbedUrl(viewUrl: string): string {
  const m = viewUrl.match(/\/d\/([^/]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : viewUrl;
}
function getDownloadUrl(viewUrl: string): string {
  const m = viewUrl.match(/\/d\/([^/]+)/);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : viewUrl;
}
function sendAnonEmail(d: { category: string; subject: string; message: string; addToWall: boolean }) {
  const lines = [
    '🔒 ANONYMOUS PRAYER REQUEST — United in Christ', '',
    `Submitted: ${new Date().toLocaleString('en-ZA')}`,
    `Category: ${d.category || 'General'}`,
    d.subject ? `Subject: ${d.subject}` : null, '',
    'Prayer Request:', d.message, '',
    d.addToWall ? '✓ Consented to Prayer Wall display' : '✗ Private',
    '', '— Sent from United in Christ website',
  ].filter((l): l is string => l !== null).join('\n');
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = `mailto:jayuriel28@gmail.com?subject=${encodeURIComponent('🔒 Anonymous Prayer Request — United in Christ')}&body=${encodeURIComponent(lines)}`;
  document.body.appendChild(a); a.click();
  setTimeout(() => document.body.removeChild(a), 800);
}

// ─────────────────────────────────────────────
// SPRING / MOTION CONFIGS
// ─────────────────────────────────────────────
const SP     = { type: 'spring' as const, stiffness: 300, damping: 24 };
const SPsoft = { type: 'spring' as const, stiffness: 200, damping: 28 };
const blurUp = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { ...SPsoft, duration: 0.7 } },
};
const blurLeft = {
  hidden:  { opacity: 0, x: -40, filter: 'blur(12px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { ...SPsoft, duration: 0.7 } },
};
const blurRight = {
  hidden:  { opacity: 0, x: 40, filter: 'blur(12px)' },
  visible: { opacity: 1, x: 0,  filter: 'blur(0px)', transition: { ...SPsoft, duration: 0.7 } },
};
const pillReveal = {
  hidden:  { opacity: 0, scale: 0.92, borderRadius: '80px', filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1,    borderRadius: '20px', filter: 'blur(0px)',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.9,  filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: SPsoft },
};

// ─────────────────────────────────────────────
// WAVE RIPPLE
// ─────────────────────────────────────────────
function WaveRipple({ color, onComplete }: { color: string; onComplete: () => void }) {
  return (
    <motion.div style={{ position: 'fixed', inset: 0, zIndex: 99998, pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 'clamp(14px,4vw,28px)' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 90, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={onComplete}
        style={{ width: 50, height: 50, borderRadius: '50%', background: color }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAGNETIC PROPHET IMAGE
// ─────────────────────────────────────────────
function MagneticImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 18);
    y.set(((e.clientY - cy) / rect.height) * 18);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} className="about-img-wrap" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="about-ring" />
      <div className="about-ring-outer" />
      <motion.img
        className="about-img"
        src={src} alt={alt}
        style={{ x: springX, y: springY }}
        onError={(e) => { const t = e.target as HTMLImageElement; t.src = '/photos/jay-uriel.png'; t.onerror = null; }}
      />
      <div className="about-img-overlay" />
    </div>
  );
}

// ─────────────────────────────────────────────
// SCROLL PROGRESS LINE
// ─────────────────────────────────────────────
function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <motion.div
      className="scroll-progress-line"
      style={{ scaleY, transformOrigin: 'top' }}
    />
  );
}

// ─────────────────────────────────────────────
// VIRTUALIZED VIDEO CARD
// ─────────────────────────────────────────────
function VideoCard({ video, index }: { video: { id: string; title: string; url: string }; index: number }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  return (
    <motion.div
      className="vid-card"
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SP, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -6, borderColor: 'rgba(74,172,220,0.45)' }}
      style={{ willChange: 'transform' }}
    >
      <div className="vid-thumb-wrap" onClick={() => !playing && setPlaying(true)}>
        {playing ? (
          <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} allowFullScreen allow="autoplay; encrypted-media" title={video.title} loading="lazy" />
        ) : (
          <>
            <img src={thumb} alt={video.title} loading="lazy" />
            <div className="vid-play-btn" aria-label="Play video">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </>
        )}
      </div>
      <div className="vid-info">
        <span className="vid-title">{video.title}</span>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="vid-yt-link">YouTube →</a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCRIPTURES
// ─────────────────────────────────────────────
function ScripturesSection() {
  const [idx, setIdx] = useState(getDailyScriptureIndex(SCRIPTURES.length));
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SCRIPTURES.length), 8000);
    return () => clearInterval(t);
  }, []);
  const s = SCRIPTURES[idx];
  return (
    <section id="scriptures" className="scriptures-section">
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
        <div className="sec-eyebrow">Living Word</div>
        <h2 className="sec-title">Scripture of the <span>Day</span></h2>
        <div className="title-rule" />
      </motion.div>
      <div className="scripture-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="scripture-card"
            initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(8px)' }}
            transition={SPsoft}
          >
            <div className="scripture-quote">&ldquo;</div>
            <p className="scripture-text">{s.verse}</p>
            <div className="scripture-ref">— {s.ref}</div>
          </motion.div>
        </AnimatePresence>
        <div className="scripture-dots">
          {SCRIPTURES.map((_, i) => (
            <motion.button key={i} className={`s-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)}
              whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.7 }} transition={SP} aria-label={`Scripture ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PDF MODAL
// ─────────────────────────────────────────────
function PdfModal({ doc, onClose }: { doc: { name: string; viewUrl: string } | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = doc ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [doc]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn); return () => document.removeEventListener('keydown', fn);
  }, [onClose]);
  const shareDoc = () => {
    if (!doc) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(`✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`)}`,'_blank');
  };
  return (
    <AnimatePresence>
      {doc && (
        <motion.div className="pdf-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div className="pdf-box"
            initial={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(12px)' }}
            transition={SPsoft}>
            <div className="pdf-header">
              <div className="pdf-title">{doc.name}</div>
              <motion.button className="pdf-close" onClick={onClose} whileHover={{ rotate: 90, scale: 1.1 }} transition={SP}>✕</motion.button>
            </div>
            <div className="pdf-body">
              <iframe src={getEmbedUrl(doc.viewUrl)} title={doc.name} allowFullScreen style={{ width: '100%', height: '100%', border: 'none', minHeight: '480px' }} />
            </div>
            <div className="pdf-footer">
              <motion.button className="pdf-btn pdf-drive" onClick={() => window.open(doc.viewUrl, '_blank')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SP}>Open in Drive</motion.button>
              <motion.button className="pdf-btn pdf-dl" onClick={() => window.open(getDownloadUrl(doc.viewUrl), '_blank')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SP}>Download PDF</motion.button>
              <motion.button className="pdf-btn pdf-wa" onClick={shareDoc} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SP}>Share on WhatsApp</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// DOCUMENTS
// ─────────────────────────────────────────────
function DocumentsSection() {
  const [search, setSearch] = useState('');
  const [openDoc, setOpenDoc] = useState<typeof DOCUMENTS[0] | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = DOCUMENTS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true); }
      if (e.key === 'Escape') { setCmdOpen(false); setSearch(''); }
    };
    document.addEventListener('keydown', fn); return () => document.removeEventListener('keydown', fn);
  }, []);
  useEffect(() => { if (cmdOpen) setTimeout(() => inputRef.current?.focus(), 60); }, [cmdOpen]);
  const shareDoc = (doc: typeof DOCUMENTS[0]) =>
    window.open(`https://wa.me/?text=${encodeURIComponent(`✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`)}`,'_blank');
  return (
    <section id="documents">
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
        <div className="sec-eyebrow">Written Revelation</div>
        <h2 className="sec-title">Teaching <span>Notes</span></h2>
        <div className="title-rule" />
        <p className="sec-desc">Study materials from Prophet Jay Uriel. View online or download to study at your pace.</p>
        <motion.button className="cmd-trigger" onClick={() => setCmdOpen(true)}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(0,0,0,0.28)' }} whileTap={{ scale: 0.98 }} transition={SP}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Search teaching notes…
          <span className="cmd-kbd">⌘K</span>
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {cmdOpen && (
          <motion.div className="cmd-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }} onClick={e => { if (e.target === e.currentTarget) { setCmdOpen(false); setSearch(''); } }}>
            <motion.div className="cmd-palette"
              initial={{ opacity: 0, scale: 0.95, y: -16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, y: -16, filter: 'blur(8px)' }}
              transition={SPsoft}>
              <div className="cmd-search-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input ref={inputRef} className="cmd-input" type="text" placeholder="Search teaching notes…" value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="cmd-clear" onClick={() => setSearch('')}>✕</button>}
                <button className="cmd-esc" onClick={() => { setCmdOpen(false); setSearch(''); }}>Esc</button>
              </div>
              <div className="cmd-results">
                {search && filtered.length === 0 && <div className="cmd-empty">No notes matching &ldquo;{search}&rdquo;</div>}
                {(search ? filtered : DOCUMENTS).map(doc => (
                  <div key={doc.name} className="cmd-result-item" onClick={() => { setOpenDoc(doc); setCmdOpen(false); }}>
                    <span className="cmd-result-icon">📄</span>
                    <span className="cmd-result-name">{doc.name}</span>
                    {doc.isNew && <span className="cmd-result-new">NEW</span>}
                    <svg className="cmd-result-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                ))}
              </div>
              <div className="cmd-footer"><span>↵ to open</span><span>⌘K / Esc to close</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="docs-grid">
        {DOCUMENTS.map((doc, i) => (
          <motion.div className="doc-card" key={doc.name}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ ...SP, delay: i * 0.05 }}
            whileHover={{ y: -5 }} style={{ willChange: 'transform' }}>
            <div className="doc-num">{String(i + 1).padStart(2, '0')}</div>
            {doc.isNew && <div className="doc-badge">NEW</div>}
            <div className="doc-icon">📄</div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-actions">
              <motion.button className="doc-btn doc-view" onClick={() => setOpenDoc(doc)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SP}>👁 View</motion.button>
              <motion.button className="doc-btn doc-share" onClick={() => shareDoc(doc)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SP}>↑ Share</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      <PdfModal doc={openDoc} onClose={() => setOpenDoc(null)} />
    </section>
  );
}

// ─────────────────────────────────────────────
// PRAYER WALL
// ─────────────────────────────────────────────
function PrayerWall() {
  return (
    <div className="prayer-wall">
      <div className="pw-header">
        <span className="pw-cross">☩</span>
        <div>
          <div className="sec-eyebrow" style={{ margin: 0, fontSize: '.66rem' }}>Community Intercession</div>
          <h3 className="pw-title">Prayer Wall</h3>
        </div>
      </div>
      <p className="pw-sub">Join hands in prayer with fellow believers. Submit your request above and opt in to be added here.</p>
      <div className="pw-grid">
        {PRAYER_WALL_ENTRIES.map((entry, i) => (
          <motion.div key={i} className="pw-card"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ ...SP, delay: i * 0.08 }}>
            <div className="pw-top">
              <div className="pw-avatar">{entry.initials}</div>
              <div className="pw-meta">
                <div className="pw-name">{entry.name}</div>
                <div className="pw-cat">{entry.category}</div>
              </div>
              <div className="pw-time">{entry.time}</div>
            </div>
            <div className="pw-divider" />
            <p className="pw-text">{entry.text}</p>
            <motion.button className="pw-pray" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SP}
              onClick={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                if (!btn.disabled) { btn.textContent = '✧ Praying…'; btn.disabled = true; setTimeout(() => { btn.textContent = '✓ Prayed'; }, 1400); }
              }}>✦ Pray for this</motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PRAYER SECTION — Redesigned form
// ─────────────────────────────────────────────
function PrayerSection() {
  const [isAnon, setIsAnon] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [addToWall, setAddToWall] = useState(false);
  const [category, setCategory] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef  = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const handlePrayer = () => {
    const nameVal = isAnon ? 'Anonymous' : (nameRef.current?.value.trim() || '');
    const msgVal  = msgRef.current?.value.trim() || '';
    const notesVal = notesRef.current?.value.trim() || '';
    if (!isAnon && !nameVal) { alert('Please fill in your name or enable anonymous.'); return; }
    if (!msgVal) { alert('Please share your prayer request.'); return; }
    const cat = category || 'General';
    const combined = msgVal + (notesVal ? `\n\nAdditional context: ${notesVal}` : '');
    if (isAnon) {
      sendAnonEmail({ category: cat, subject: '', message: combined, addToWall });
      window.open(`https://wa.me/27649842408?text=${encodeURIComponent(`🔒 Anonymous Prayer Request — United in Christ\n\nCategory: ${cat}\n\nPrayer Request:\n${combined}${addToWall ? '\n\n✓ Consented to Prayer Wall display' : ''}`)}`,'_blank');
    } else {
      window.open(`https://wa.me/27649842408?text=${encodeURIComponent(`✧ Prayer Request — United in Christ\n\nName: ${nameVal}\nCategory: ${cat}\n\nPrayer Request:\n${combined}${addToWall ? '\n\n✓ Approved for Prayer Wall' : ''}`)}`,'_blank');
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false); setIsAnon(false); setShowNotes(false); setAddToWall(false); setCategory('');
      if (nameRef.current) nameRef.current.value = '';
      if (msgRef.current) msgRef.current.value = '';
      if (notesRef.current) notesRef.current.value = '';
    }, 6000);
  };

  return (
    <section id="prayer">
      <div className="prayer-wrap">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
          <div className="sec-eyebrow">Come Before God</div>
          <h2 className="sec-title">Submit a <span>Prayer Request</span></h2>
          <div className="title-rule" />
          <blockquote className="prayer-verse">
            &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo; — Philippians 4:6
          </blockquote>
          <p className="sec-desc">We stand in agreement with you. Share your request and our team will pray for you.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="conf" className="prayer-conf"
              initial={{ opacity: 0, scale: 0.93, y: 16, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.93, filter: 'blur(12px)' }} transition={SPsoft}>
              <div className="conf-icon">☩</div>
              <h3 className="conf-title">Your request has been received</h3>
              <p className="conf-body">
                Our team is praying with you. The Lord hears every cry of the heart.<br />
                <em style={{ color: 'var(--accent)', fontSize: '.88em' }}>&ldquo;The effectual fervent prayer of a righteous man availeth much.&rdquo; — James 5:16</em>
              </p>
              {addToWall && <p className="conf-wall">✓ Your request will be added to the Prayer Wall</p>}
            </motion.div>
          ) : (
            <motion.div key="form" className="prayer-form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
              {/* ── Identity row: Name toggle ── */}
              <div className="identity-row">
                <div className="identity-left">
                  <AnimatePresence mode="wait">
                    {isAnon ? (
                      <motion.div key="anon-label" className="identity-anon-state"
                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
                        <span className="anon-lock">🔒</span>
                        <span className="anon-active-label">Submitting anonymously</span>
                      </motion.div>
                    ) : (
                      <motion.div key="name-input" className="floating-field"
                        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}>
                        <input
                          ref={nameRef}
                          className="f-bare"
                          type="text"
                          id="pName"
                          placeholder=" "
                          onFocus={() => setNameFocused(true)}
                          onBlur={() => setNameFocused(false)}
                        />
                        <label htmlFor="pName" className="floating-label">Your Name *</label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="identity-toggle-wrap">
                  <span className="toggle-label-text">{isAnon ? 'Anonymous' : 'Show name'}</span>
                  <button className={`toggle${isAnon ? ' on' : ''}`} onClick={() => setIsAnon(!isAnon)} type="button" aria-pressed={isAnon}>
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>

              {/* ── Category ── */}
              <div className="floating-field">
                <select className="f-bare f-select" value={category} onChange={e => setCategory(e.target.value)} id="pCat">
                  <option value="">Select a category…</option>
                  {PRAYER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <label htmlFor="pCat" className={`floating-label${category ? ' elevated' : ''}`}>Prayer Category</label>
              </div>

              {/* ── Message ── */}
              <div className="message-field">
                <textarea
                  ref={msgRef}
                  className="f-bare-area"
                  rows={4}
                  placeholder="Share your prayer request here…"
                  onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
                />
              </div>

              {/* ── Optional notes ── */}
              <AnimatePresence>
                {showNotes && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <div className="message-field" style={{ marginTop: '4px' }}>
                      <textarea ref={notesRef} className="f-bare-area" rows={2} placeholder="Additional context (optional)…"
                        onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Controls row ── */}
              <div className="form-controls-row">
                <motion.button className="add-notes-btn" onClick={() => setShowNotes(!showNotes)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <span className="add-notes-icon">{showNotes ? '−' : '+'}</span>
                  {showNotes ? 'Remove notes' : 'Add context'}
                </motion.button>
                <label className="wall-check">
                  <input type="checkbox" className="f-check" checked={addToWall} onChange={e => setAddToWall(e.target.checked)} />
                  <span>Add to Prayer Wall</span>
                </label>
              </div>

              <div className="privacy-notice">
                <span>🔒</span> Your information is strictly confidential and will never be shared outside our prayer team.
              </div>

              <motion.button className="submit-btn" onClick={handlePrayer}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(74,172,220,0.32)' }}
                whileTap={{ scale: 0.98 }} transition={SP}>
                ✦ Send Prayer Request
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <PrayerWall />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// VERSE OF THE DAY (footer)
// ─────────────────────────────────────────────
function VerseOfTheDay() {
  const s = SCRIPTURES[getDailyScriptureIndex(SCRIPTURES.length)];
  return (
    <motion.div className="vod" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPsoft}>
      <div className="vod-label">✦ Verse of the Day ✦</div>
      <p className="vod-text">&ldquo;{s.verse}&rdquo;</p>
      <div className="vod-ref">— {s.ref}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// VOTD PLAYER
// ─────────────────────────────────────────────
function VotdPlayer({ id, title }: { id: string; title: string; url: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  if (!id) return null;
  return (
    <div className="votd-player-wrap" onClick={() => !playing && setPlaying(true)}>
      {playing ? (
        <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} allowFullScreen allow="autoplay; encrypted-media" title={title} />
      ) : (
        <>
          <img src={thumb} alt={title} loading="lazy" onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`; }} />
          <div className="votd-play" aria-label="Play video">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Home() {
  const [isDark,     setIsDark]     = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ripple,     setRipple]     = useState<{ color: string } | null>(null);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);
  const [vodIndex,     setVodIndex]     = useState(0);
  const [vodDateLong,  setVodDateLong]  = useState('');
  const [vodDateShort, setVodDateShort] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setVodIndex(getDailyVideoIndex(VIDEOS.length));
      setVodDateLong(now.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
      setVodDateShort(now.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const scheduleNextMidnight = (): ReturnType<typeof setTimeout> => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return setTimeout(() => { update(); scheduleNextMidnight(); }, tomorrow.getTime() - now.getTime());
    };
    const t = scheduleNextMidnight();
    return () => clearTimeout(t);
  }, []);

  const videoOfTheDay = VIDEOS[vodIndex];
  const dailySeed     = new Date().toDateString();
  const shuffled      = seededShuffle(VIDEOS, dailySeed);

  useEffect(() => { document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light'); }, [isDark]);
  const handleThemeToggle = () => setRipple({ color: isDark ? '#F0F4F8' : '#020408' });
  const onRippleComplete  = useCallback(() => { setIsDark(d => !d); setRipple(null); }, []);

  useEffect(() => { document.body.style.overflow = isMenuOpen ? 'hidden' : ''; }, [isMenuOpen]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', fn); return () => document.removeEventListener('keydown', fn);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let W = 0, H = 0, animId = 0;
    type Star = { x: number; y: number; r: number; a: number; da: number; vx: number; vy: number };
    let stars: Star[] = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const initStars = () => {
      stars = Array.from({ length: 80 }, (_, i) => ({
        x: seededRandom(`sx${i}`) * W, y: seededRandom(`sy${i}`) * H,
        r: seededRandom(`sr${i}`) * 1.4 + 0.3, a: seededRandom(`sa${i}`),
        da: (0.002 + seededRandom(`sda${i}`) * 0.004) * (i % 2 ? 1 : -1),
        vx: (seededRandom(`svx${i}`) - 0.5) * 0.08, vy: (seededRandom(`svy${i}`) - 0.5) * 0.08,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.da; if (s.a <= 0 || s.a >= 1) s.da *= -1;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,172,220,${s.a * 0.35})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', () => { resize(); initStars(); });
    resize(); initStars(); draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', () => {}); };
  }, []);

  const { scrollY } = useScroll();
  const navBg       = useTransform(scrollY, [0, 60], ['rgba(2,4,8,0)', 'rgba(2,4,8,0.96)']);
  const rawPy       = useTransform(scrollY, [0, 80], [22, 12]);
  const navPy       = useSpring(rawPy, { stiffness: 80, damping: 20 });

  const heroBrightness = useTransform(scrollY, [0, 400], [0.52, 0.22]);
  const heroBlur       = useTransform(scrollY, [0, 400], [0, 8]);

  const navItems = [
    { href: '#about',     label: 'About'     },
    { href: '#saturday',  label: 'Teachings' },
    { href: '#sermons',   label: 'Sermons'   },
    { href: '#documents', label: 'Notes'     },
    { href: '#prayer',    label: 'Prayer'    },
    { href: '#connect',   label: 'Connect'   },
  ];

  return (
    <>
      <canvas ref={canvasRef} id="particles" />
      <ScrollProgressLine />

      <AnimatePresence>
        {ripple && <WaveRipple key="ripple" color={ripple.color} onComplete={onRippleComplete} />}
      </AnimatePresence>

      {/* Theme toggle */}
      <motion.button className="theme-toggle" title="Toggle light/dark" onClick={handleThemeToggle}
        whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }} transition={SP}
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        style={{ willChange: 'transform' }}>{isDark ? '☾' : '☀'}</motion.button>

      {/* ── NAV — staggered blur-in ── */}
      <motion.nav id="navbar" style={{ paddingTop: navPy, paddingBottom: navPy, background: navBg }}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SP, delay: 0.1 }}>
        <a href="#" className="nav-logo">
          <div className="nav-logo-img"><img src="/photos/united-in-christ-logo.png" alt="United in Christ" /></div>
          <div>
            <div className="nav-logo-name">United in Christ</div>
            <div className="nav-logo-sub">Prophet Jay Uriel</div>
          </div>
        </a>
        <ul className="nav-links">
          {navItems.map((item, i) => (
            <motion.li key={item.href}
              initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...SP, delay: 0.18 + i * 0.07 }}>
              <motion.a href={item.href} className="nav-link" whileHover={{ color: 'var(--accent)' }} transition={{ duration: 0.18 }}>
                {item.label}
              </motion.a>
            </motion.li>
          ))}
        </ul>
        <div className="nav-right">
          <motion.a href="#prayer" className="nav-cta"
            initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ ...SP, delay: 0.7 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(74,172,220,.4)' }} whileTap={{ scale: 0.97 }}>
            Prayer Request
          </motion.a>
          <motion.button className={`hamburger${isMenuOpen ? ' open' : ''}`} aria-label="Open menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
            <span /><span /><span />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setIsMenuOpen(false)} />
            <motion.ul className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              {navItems.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ ...SP, delay: i * 0.05 }}>
                  <a href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ ...SP, delay: navItems.length * 0.05 }}>
                <a href="#prayer" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>Prayer Request</a>
              </motion.li>
            </motion.ul>
          </>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero">
        <motion.div className="hero-bg"
          style={{ filter: useTransform([heroBrightness, heroBlur] as any, ([b, bl]: number[]) => `brightness(${b}) saturate(0.65) blur(${bl}px)`) }} />
        <div className="hero-grad" />
        {/* Atmospheric glow orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: -16, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ...SP, delay: 0.4 }}>
            Ministry of the Word
          </motion.div>
          <motion.h1 className="hero-h1" initial={{ opacity: 0, y: -20, filter: 'blur(14px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ...SP, delay: 0.55 }}>
            United in <span>Christ</span>
          </motion.h1>
          <motion.p className="hero-tagline" initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ...SP, delay: 0.75 }}>
            Proclaiming the Word of God with power, truth, and the spirit of prophecy
          </motion.p>
          <motion.div className="hero-btns" initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ...SP, delay: 0.92 }}>
            <motion.a href="#sermons" className="btn-primary" whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(74,172,220,.35)' }} whileTap={{ scale: 0.97 }} transition={SP}>Watch Sermons</motion.a>
            <motion.a href="#prayer" className="btn-ghost" whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,.8)' }} whileTap={{ scale: 0.97 }} transition={SP}>Submit Prayer</motion.a>
          </motion.div>
          <motion.div className="hero-infobar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
            <div className="hero-info-item"><span className="hi-label">Every Saturday</span><span className="hi-val">8:00 PM — El Roi Chambers</span></div>
            <div className="hi-sep" />
            <div className="hero-info-item"><span className="hi-label">40+ Sermons</span><span className="hi-val">Free to Watch &amp; Share</span></div>
            <div className="hi-sep" />
            <div className="hero-info-item"><span className="hi-label">11 Teaching Notes</span><span className="hi-val">Download &amp; Study</span></div>
          </motion.div>
        </div>
        <motion.div className="hero-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <motion.div className="scroll-dot" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </section>

      {/* ── SCROLL BRIDGE: line connector between hero & VOTD ── */}
      <div className="scroll-bridge">
        <div className="bridge-line" />
        <div className="bridge-label">Featured Today</div>
        <div className="bridge-line" />
      </div>

      {/* ── VIDEO OF THE DAY — Pill reveal ── */}
      <motion.section id="video-of-day" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={blurUp}>
        <div className="sec-center" style={{ marginBottom: 'clamp(24px,3.5vw,44px)' }}>
          <div className="sec-eyebrow">Featured Today</div>
          <h2 className="sec-title">Video of the <span>Day</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">{vodDateLong ? `Today's message • ${vodDateLong}` : "Today's featured message"}</p>
        </div>
        <motion.div
          className="votd-card"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={pillReveal}
          whileHover={{ scale: 1.007, boxShadow: '0 40px 80px rgba(0,0,0,.65)' }}
          transition={SPsoft}
          style={{ willChange: 'transform, border-radius' }}>
          {vodDateShort && <div className="votd-badge">◆ {vodDateShort}</div>}
          <VotdPlayer id={videoOfTheDay?.id || ''} title={videoOfTheDay?.title || ''} url={videoOfTheDay?.url || ''} />
          <div className="votd-info">
            <div className="vid-title">{videoOfTheDay?.title}</div>
            <a href={videoOfTheDay?.url} target="_blank" rel="noopener noreferrer" className="vid-yt-link">Watch on YouTube →</a>
          </div>
        </motion.div>
      </motion.section>

      {/* ── ABOUT — Magnetic prophet image ── */}
      <section id="about">
        <div className="about-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={blurLeft}>
            <MagneticImage src="/photos/jay-uriel.jpeg" alt="Prophet Jay Uriel" />
          </motion.div>
          <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={blurRight}>
            <div className="sec-eyebrow">Our Leader &amp; Founder</div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.7rem,4.5vw,2.8rem)' }}>Prophet <span>Jay Uriel</span></h2>
            <div className="title-rule" style={{ margin: '16px 0 28px' }} />
            <p className="about-body">Prophet Jay Uriel is a consecrated vessel called by God — a bold prophetic voice raised for this generation. With deep revelation, anointed teaching, and the genuine gift of prophecy, he ministers the fullness of Christ with power, clarity, and compassion.</p>
            <ul className="about-list">
              {['Prophetic voice to this generation','Deep biblical revelation and teaching','Saturday gatherings at El Roi Chambers','Online ministry reaching Southern Africa'].map(pt => (
                <li key={pt}><span className="about-dot">✦</span>{pt}</li>
              ))}
            </ul>
            <div className="about-quote">&ldquo;The Spirit of the Lord is upon me to proclaim liberty, healing, and the knowledge of Christ.&rdquo;</div>
            <motion.a href="#saturday" className="btn-primary" style={{ display: 'inline-block', marginTop: '32px' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,172,220,.4)' }} whileTap={{ scale: 0.97 }} transition={SP}>
              Join Us This Saturday
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── SATURDAY — Typographic backdrop ── */}
      <section id="saturday">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
          <div className="sec-eyebrow">Every Saturday</div>
          <h2 className="sec-title">Saturday <span>Teachings</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">Join us every Saturday for powerful anointed teachings. Come expecting an encounter with God.</p>
        </motion.div>
        <div className="sat-outer">
          <div className="sat-typeback" aria-hidden="true">TEACHINGS</div>
          <motion.div className="sat-wrap" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
            whileHover={{ scale: 1.007 }} transition={SPsoft} style={{ willChange: 'transform' }}>
            <img src="/photos/IMG_4616.jpg" alt="Saturday Teachings" loading="lazy" />
            <div className="sat-grad" />
            <div className="sat-info">
              {[{ label: 'Day', val: 'Every Saturday' }, { label: 'Time', val: '8:00 PM' }, { label: 'Venue', val: 'El Roi Chambers' }].map((item, i) => (
                <div key={i} className="sat-block">
                  <div className="sat-label">{item.label}</div>
                  <div className="sat-val">{item.val}</div>
                </div>
              ))}
              <motion.a href="#prayer" className="btn-primary" style={{ whiteSpace: 'nowrap', fontSize: '.82rem' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={SP}>I Want to Attend</motion.a>
            </div>
            <div className="sat-badge">United in Christ</div>
          </motion.div>
        </div>
      </section>

      <ScripturesSection />

      {/* ── ANNOUNCEMENTS ── */}
      <section id="announcements">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
          <div className="sec-eyebrow">Church Family</div>
          <h2 className="sec-title">Announcements &amp; <span>Testimonials</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="announce-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurLeft}>
            <div className="ann-col-head">
              <div className="ann-icon">◆</div>
              <div>
                <div className="sec-eyebrow" style={{ margin: 0, fontSize: '.68rem' }}>Special Broadcast</div>
                <h3 className="ann-title">Word of Life &amp; The Prophetic</h3>
              </div>
            </div>
            <div className="ann-box">
              <img className="ann-img" src="/announcements/image.jpg" alt="Word of Life and The Prophetic" loading="lazy" />
              <div className="ann-body">
                <div className="ann-coming">Coming Soon</div>
                <div className="ann-host">Host: Prophet Jay Uriel</div>
                <div className="ann-meta">
                  {[{ l: 'Platform', v: 'Google Meet' }, { l: 'Time', v: '8:00 PM', accent: true }, { l: 'Location', v: 'El Roi Chambers' }].map((m, i) => (
                    <span key={i} className="ann-meta-item">
                      <span className="ann-meta-l">{m.l}</span>
                      <span className={`ann-meta-v${m.accent ? ' accent' : ''}`}>{m.v}</span>
                    </span>
                  ))}
                </div>
                <motion.a href="https://wa.me/27649842408?text=I'm%20joining%20the%20Word%20of%20Life%20%26%20The%20Prophetic%20session%20tonight!" target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '20px', fontSize: '.78rem' }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SP}>Join via WhatsApp</motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurRight}>
            <div className="ann-col-head">
              <div className="ann-icon">✦</div>
              <div>
                <div className="sec-eyebrow" style={{ margin: 0, fontSize: '.68rem' }}>Lives Changed</div>
                <h3 className="ann-title">Testimonials</h3>
              </div>
            </div>
            {[
              { i: 'Y', name: 'Yolande Mokgosi',    loc: 'Gauteng',    text: 'Since joining UIC, my prayer life has changed and the teachings under the man of God have enlightened my understanding of my authority in Christ.' },
              { i: 'M', name: 'Moyahabo Machethe',  loc: 'Mokopane',   text: "Ever since I joined United in Christ my life completely changed for the better — I walked away from sin, I'm blessed with twins, and I'm at peace. Glory be to God!" },
              { i: 'K', name: 'Koketso',            loc: 'Gauteng',    text: 'The group has opened my eyes to hidden knowledge about the kingdom — principles that are most effective for spiritual growth.' },
              { i: 'L', name: 'Lala Immaculate N.', loc: 'Phalaborwa', text: 'My faith has grown and my spiritual life transformed from theoretical Christianity to practical, lived-out faith.' },
              { i: 'V', name: 'Vukona Nukeri',      loc: 'Polokwane',  text: 'I thank God for this fellowship — having a leader passionate about Christ has helped me stay in check with my identity in Him!' },
            ].map((t, idx) => (
              <motion.div className="testi-card" key={t.name}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ ...SP, delay: idx * 0.08 }}
                whileHover={{ borderColor: 'rgba(74,172,220,.4)', y: -3 }}>
                <div className="testi-quote">&ldquo;</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.i}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-loc">{t.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      <section id="sermons">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
          <div className="sec-eyebrow">Anointed Messages</div>
          <h2 className="sec-title">Sermons &amp; <span>Preachings</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="sermons-wrap">
          <div className="sermons-grid">
            {shuffled.map((v, idx) => <VideoCard key={v.id} video={v} index={idx} />)}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(28px,4.5vw,56px)' }}>
          <motion.a href="https://www.youtube.com/@jayuriel" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '.82rem' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(74,172,220,.4)' }} whileTap={{ scale: 0.97 }} transition={SP}>
            View All Sermons on YouTube →
          </motion.a>
        </div>
      </section>

      <DocumentsSection />
      <PrayerSection />

      {/* ── CONNECT ── */}
      <section id="connect">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
          <div className="sec-eyebrow">Stay Connected</div>
          <h2 className="sec-title">Follow &amp; <span>Connect</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="social-grid">
          {[
            { href: 'https://www.facebook.com/josiasuriel28', name: 'Facebook', desc: '@josiasuriel28', delay: 0.05, svg: <svg viewBox="0 0 24 24" width="36" height="36" fill="#1877F2"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg> },
            { href: 'https://youtube.com/@UJaymusic?si=NVlrgSRfXU7l_x1v', name: 'YouTube Music', desc: '@UJaymusic', delay: 0.12, svg: <svg viewBox="0 0 24 24" width="36" height="36" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg> },
            { href: 'https://youtube.com/@jayuriel?si=xzvvfhL49ksk0J77', name: 'YouTube Ministry', desc: '@jayuriel', delay: 0.19, svg: <svg viewBox="0 0 24 24" width="36" height="36" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg> },
            { href: 'http://tiktok.com/@jayuriel28?_t=8o1cEvqxSz7&_r=1', name: 'TikTok', desc: '@jayuriel28', delay: 0.26, svg: <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg> },
            { href: 'https://wa.me/27649842408', name: 'WhatsApp', desc: '0649842408', delay: 0.33, svg: <svg viewBox="0 0 24 24" width="36" height="36" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
          ].map(s => (
            <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="soc-card"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ ...SP, delay: s.delay }}
              whileHover={{ y: -6, borderColor: 'var(--accent)' }}
              style={{ willChange: 'transform' }}>
              <div className="soc-logo">{s.svg}</div>
              <div className="soc-name">{s.name}</div>
              <div className="soc-desc">{s.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── JOIN ── */}
      <motion.div className="join-sec" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurUp}>
        <div className="sec-eyebrow">Be Part of the Family</div>
        <h2 className="sec-title" style={{ maxWidth: '540px', margin: '0 auto 14px', textWrap: 'balance' } as any}>Join Us <span>This Saturday</span></h2>
        <div className="title-rule" style={{ margin: '16px auto 24px' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(.9rem,1.7vw,1.05rem)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: '1.8', fontStyle: 'italic' }}>
          Come as you are. Leave transformed. Every Saturday, we gather to encounter the living God.
        </p>
        <motion.a href="#prayer" className="btn-primary" whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(74,172,220,.5)' }} whileTap={{ scale: 0.97 }} transition={SP}>
          Connect With Us
        </motion.a>
      </motion.div>

      {/* ── FOOTER ── */}
      <footer>
        <VerseOfTheDay />
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/photos/united-in-christ-logo.png" alt="UIC" className="footer-logo" />
            <div>
              <div className="footer-brand-name">United in Christ</div>
              <div className="footer-brand-sub">Prophet Jay Uriel Ministry</div>
            </div>
          </div>
          <div className="footer-copy">© 2024 United in Christ. All rights reserved.</div>
        </div>
        <div className="built-by">
          <span className="by-cross">✝</span>
          <span className="by-text">Built with love by</span>
          <span className="by-name">Bonny Sithole</span>
          <span className="by-cross">✝</span>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          GLOBAL STYLES — HIGH DEFINITION v2
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── FONTS ─────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700;800&family=Archivo+Black&display=swap');

        /* ── CSS VARIABLES ────────────────────── */
        :root {
          --radius: 16px;
          --radius-sm: 10px;
          --container: 1200px;
          --section-py: clamp(72px,9vw,120px);
          --gap: clamp(14px,2.2vw,24px);
        }

        /* ── DARK THEME ─────────────────────────── */
        [data-theme='dark'] {
          --bg:            #020408;
          --bg-mid:        #050A18;
          --surface:       rgba(6,10,22,0.88);
          --surface-solid: #060A16;
          --surface2:      rgba(10,16,34,0.92);
          --border:        rgba(255,255,255,0.07);
          --border-hover:  rgba(74,172,220,0.45);
          --accent:        #4AACDC;
          --accent-warm:   #6EC8F0;
          --accent-dim:    rgba(74,172,220,0.1);
          --accent-glow:   rgba(74,172,220,0.22);
          --text:          #EEF4FA;
          --text2:         #A8BEC9;
          --text-muted:    #4E6678;
          --shadow:        0 20px 60px rgba(0,0,0,0.7);
          --shadow-hover:  0 32px 80px rgba(0,0,0,0.8);
          --input-bg:      rgba(255,255,255,0.03);
          --input-border:  rgba(74,172,220,0.15);
          --glass-bg:      rgba(8,14,30,0.72);
          --glass-border:  rgba(255,255,255,0.08);
        }

        /* ── LIGHT THEME ─────────────────────────── */
        [data-theme='light'] {
          --bg:            #F0F2F7;
          --bg-mid:        #E8ECF4;
          --surface:       rgba(255,255,255,0.85);
          --surface-solid: #FFFFFF;
          --surface2:      rgba(240,242,250,0.9);
          --border:        rgba(0,0,0,0.07);
          --border-hover:  rgba(26,127,181,0.45);
          --accent:        #1A7EB5;
          --accent-warm:   #2596D8;
          --accent-dim:    rgba(26,126,181,0.08);
          --accent-glow:   rgba(26,126,181,0.18);
          --text:          #0D1117;
          --text2:         #2E3E4C;
          --text-muted:    #6A7D8C;
          --shadow:        0 4px 28px rgba(0,0,0,0.07);
          --shadow-hover:  0 12px 48px rgba(0,0,0,0.13);
          --input-bg:      rgba(0,0,0,0.025);
          --input-border:  rgba(26,126,181,0.2);
          --glass-bg:      rgba(255,255,255,0.72);
          --glass-border:  rgba(255,255,255,0.9);
        }

        /* ── RESET ─────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter Tight', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          transition: background 0.45s, color 0.45s;
        }

        /* ── RADIAL BACKGROUND GLOW ─────────────── */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(74,172,220,0.055) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 85%, rgba(74,172,220,0.04) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }
        [data-theme='light'] body::before {
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(26,126,181,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 85%, rgba(26,126,181,0.03) 0%, transparent 55%);
        }

        img { max-width: 100%; height: auto; display: block; }
        button { font-family: inherit; }

        /* ── SCROLL PROGRESS LINE ──────────────── */
        .scroll-progress-line {
          position: fixed;
          top: 0; left: 0;
          width: 2.5px;
          height: 100vh;
          background: linear-gradient(to bottom, var(--accent), rgba(74,172,220,0.2));
          z-index: 1002;
          transform-origin: top;
          pointer-events: none;
        }

        /* ── SECTIONS ──────────────────────────── */
        section, .join-sec {
          position: relative; z-index: 1;
          padding: var(--section-py) clamp(16px,5vw,52px);
          max-width: calc(var(--container) + 104px);
          margin: 0 auto;
        }
        section + section { border-top: 1px solid var(--border); }

        /* ── TYPOGRAPHY HELPERS ────────────────── */
        .sec-eyebrow {
          font-family: 'Inter Tight', sans-serif;
          font-size: clamp(.62rem,1vw,.74rem);
          font-weight: 800;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .sec-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(1.9rem,4.5vw,3.2rem);
          font-weight: 400;
          color: var(--text);
          line-height: 1.12;
          text-wrap: balance;
          letter-spacing: -0.01em;
        }
        .sec-title span { color: var(--accent); font-style: italic; }
        .sec-desc {
          color: var(--text2);
          font-size: clamp(.86rem,1.3vw,.98rem);
          line-height: 1.88;
          max-width: 600px;
          margin: 12px auto 0;
          font-weight: 400;
        }
        .sec-center { text-align: center; }
        .title-rule {
          width: 40px; height: 1.5px;
          background: linear-gradient(to right, var(--accent), transparent);
          margin: 18px auto 0;
        }

        /* ── BUTTONS ───────────────────────────── */
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: clamp(11px,1.8vw,15px) clamp(24px,3.5vw,42px);
          border-radius: 40px;
          background: var(--accent);
          color: #fff;
          font-family: 'Inter Tight', sans-serif;
          font-size: clamp(.78rem,1.2vw,.9rem);
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
          border: none; cursor: pointer;
          transition: background .2s;
          will-change: transform;
        }
        .btn-primary:hover { background: var(--accent-warm); }
        .btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: clamp(11px,1.8vw,15px) clamp(24px,3.5vw,42px);
          border-radius: 40px;
          background: transparent; color: #fff;
          font-family: 'Inter Tight', sans-serif;
          font-size: clamp(.78rem,1.2vw,.9rem);
          font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.35);
          cursor: pointer; transition: border-color .2s, background .2s;
          will-change: transform;
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.08); }

        /* ── PARTICLES ─────────────────────────── */
        #particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

        /* ── THEME TOGGLE ──────────────────────── */
        .theme-toggle {
          position: fixed; bottom: clamp(14px,3vw,24px); right: clamp(14px,3vw,24px);
          z-index: 1001; width: 46px; height: 46px; border-radius: 50%;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text); font-size: 1.05rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* ── NAVBAR ────────────────────────────── */
        #navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; gap: clamp(10px,2vw,24px);
          padding-left: clamp(16px,3vw,40px);
          padding-right: clamp(16px,3vw,40px);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nav-logo-img { width: 38px; height: 38px; border-radius: 50%; overflow: hidden; border: 1px solid var(--glass-border); flex-shrink: 0; }
        .nav-logo-img img { width: 100%; height: 100%; object-fit: cover; }
        .nav-logo-name { font-family: 'Instrument Serif', serif; font-size: clamp(.82rem,1.3vw,.96rem); font-weight: 400; color: var(--text); line-height: 1.2; }
        .nav-logo-sub { font-family: 'Inter Tight', sans-serif; font-size: clamp(.56rem,.85vw,.68rem); color: var(--accent); letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
        .nav-links { display: flex; list-style: none; gap: clamp(2px,1.2vw,18px); flex: 1; justify-content: center; }
        .nav-link {
          text-decoration: none; font-size: clamp(.72rem,.98vw,.84rem);
          font-weight: 600; color: var(--text2); letter-spacing: .04em; text-transform: uppercase;
          padding: 6px 10px; border-radius: 8px; transition: color .18s, background .18s;
        }
        .nav-link:hover { background: var(--accent-dim); }
        .nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nav-cta {
          display: inline-flex; align-items: center; padding: 8px 18px; border-radius: 40px;
          background: var(--accent); color: #fff;
          font-family: 'Inter Tight', sans-serif;
          font-size: clamp(.66rem,.92vw,.78rem); font-weight: 800; letter-spacing: .07em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap; transition: background .2s;
        }
        .nav-cta:hover { background: var(--accent-warm); }
        .hamburger { display: none; flex-direction: column; justify-content: space-between; width: 24px; height: 16px; background: none; border: none; cursor: pointer; padding: 0; }
        .hamburger span { display: block; height: 2px; background: var(--text); border-radius: 2px; transition: all .28s; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
        @media (max-width:860px) { .nav-links { display: none; } .nav-cta { display: none; } .hamburger { display: flex; } }

        /* ── MOBILE MENU ───────────────────────── */
        .mobile-overlay { position: fixed; inset: 0; z-index: 998; background: rgba(2,4,8,.7); backdrop-filter: blur(6px); }
        .mobile-menu {
          position: fixed; top: 0; right: 0;
          width: min(300px,88vw); height: 100dvh;
          background: var(--surface-solid);
          z-index: 999; list-style: none;
          padding: 80px 28px 32px;
          display: flex; flex-direction: column; gap: 4px;
          box-shadow: -12px 0 50px rgba(0,0,0,.5);
          overflow-y: auto;
          border-left: 1px solid var(--glass-border);
        }
        .mobile-menu a { display: block; padding: 14px 0; color: var(--text2); text-decoration: none; font-size: 1.05rem; font-weight: 600; border-bottom: 1px solid var(--border); transition: color .2s; }
        .mobile-menu a:hover { color: var(--accent); }
        .mobile-cta { margin-top: 12px !important; background: var(--accent) !important; color: #fff !important; text-align: center; border-radius: 40px; border: none !important; padding: 13px 0 !important; }

        /* ── HERO ──────────────────────────────── */
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; padding: 0; max-width: 100%; }
        .hero-bg { position: absolute; inset: 0; background: url('/photos/IMG_4616.jpg') center/cover no-repeat; transform: scale(1.04); z-index: 0; }
        .hero-grad { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, rgba(2,4,8,.5) 0%, rgba(2,4,8,.28) 35%, rgba(2,4,8,.72) 72%, rgba(2,4,8,1) 100%); }
        .hero-orb { position: absolute; border-radius: 50%; z-index: 1; pointer-events: none; }
        .hero-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(74,172,220,0.08) 0%, transparent 70%); top: 10%; left: -10%; }
        .hero-orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(74,172,220,0.06) 0%, transparent 70%); bottom: 15%; right: -8%; }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: 140px clamp(20px,6vw,60px) clamp(80px,12vw,120px); max-width: 820px; margin: 0 auto; }
        .hero-eyebrow { display: inline-block; font-family: 'Inter Tight', sans-serif; font-size: clamp(.62rem,1vw,.76rem); font-weight: 800; letter-spacing: .25em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; padding: 5px 16px; border: 1px solid rgba(74,172,220,.22); border-radius: 40px; background: rgba(74,172,220,.06); backdrop-filter: blur(8px); }
        .hero-h1 { font-family: 'Instrument Serif', serif; font-size: clamp(2.8rem,7.5vw,6rem); font-weight: 400; color: #fff; line-height: 1.06; letter-spacing: -0.02em; margin-bottom: clamp(14px,2.2vw,22px); text-wrap: balance; }
        .hero-h1 span { color: var(--accent); font-style: italic; }
        .hero-tagline { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(1rem,2vw,1.32rem); color: rgba(255,255,255,.76); line-height: 1.68; max-width: 560px; margin: 0 auto clamp(28px,4vw,44px); }
        .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: clamp(40px,7vw,70px); }
        .hero-infobar { display: flex; align-items: center; justify-content: center; gap: clamp(10px,2.5vw,28px); flex-wrap: wrap; padding: clamp(14px,2vw,20px) clamp(18px,3.5vw,36px); background: rgba(255,255,255,.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,.08); border-radius: var(--radius); max-width: 660px; margin: 0 auto; }
        .hero-info-item { text-align: center; }
        .hi-label { display: block; font-family: 'Inter Tight', sans-serif; font-size: clamp(.6rem,.9vw,.72rem); font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }
        .hi-val   { display: block; font-size: clamp(.78rem,1.1vw,.88rem); color: rgba(255,255,255,.76); }
        .hi-sep   { width: 1px; height: 30px; background: rgba(255,255,255,.1); flex-shrink: 0; }
        @media (max-width:540px) { .hi-sep { display: none; } .hero-infobar { gap: 12px; } .hero-info-item { width: 46%; } .hero-btns { flex-direction: column; align-items: center; } }
        .hero-scroll { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 2; width: 26px; height: 40px; border: 1.5px solid rgba(255,255,255,.18); border-radius: 13px; display: flex; align-items: flex-start; justify-content: center; padding-top: 6px; }
        .scroll-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.65); }

        /* ── SCROLL BRIDGE ─────────────────────── */
        .scroll-bridge {
          display: flex; align-items: center; justify-content: center; gap: 16px;
          padding: clamp(12px,2vw,20px) clamp(16px,5vw,52px);
          position: relative; z-index: 1;
        }
        .bridge-line { flex: 1; max-width: 120px; height: 1px; background: linear-gradient(to right, transparent, var(--border)); }
        .bridge-line:last-child { background: linear-gradient(to left, transparent, var(--border)); }
        .bridge-label { font-family: 'Inter Tight', sans-serif; font-size: .62rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }

        /* ── VIDEO OF THE DAY ──────────────────── */
        #video-of-day { padding-top: clamp(24px,4vw,48px); padding-bottom: var(--section-py); }
        .votd-card {
          max-width: var(--container); margin: 0 auto;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          overflow: hidden; position: relative;
          box-shadow: var(--shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: box-shadow .3s;
        }
        .votd-card:hover { box-shadow: var(--shadow-hover); }
        .votd-badge { position: absolute; top: 14px; left: 14px; z-index: 2; background: var(--accent); color: #fff; font-family: 'Inter Tight', sans-serif; font-size: .68rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; padding: 4px 13px; border-radius: 40px; }
        .votd-info { padding: clamp(14px,2.2vw,26px) clamp(18px,2.8vw,32px); display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; background: var(--glass-bg); }
        .vid-title { font-family: 'Inter Tight', sans-serif; font-size: clamp(.82rem,1.2vw,.92rem); font-weight: 700; color: var(--text); }
        .vid-yt-link { font-family: 'Inter Tight', sans-serif; font-size: .76rem; font-weight: 700; letter-spacing: .05em; color: var(--accent); text-decoration: none; transition: opacity .2s; text-transform: uppercase; }
        .vid-yt-link:hover { opacity: .7; }

        /* ── VIDEO CARDS ───────────────────────── */
        .sermons-wrap { max-width: calc(var(--container) + 32px); margin: 0 auto; }
        .sermons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px,27vw,340px),1fr)); gap: var(--gap); margin-top: clamp(28px,4vw,48px); }
        .vid-card {
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          border-radius: var(--radius); overflow: hidden;
          transition: border-color .25s, box-shadow .25s;
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .vid-card:hover { box-shadow: var(--shadow-hover); }
        .vid-thumb-wrap { position: relative; width: 100%; padding-top: 56.25%; cursor: pointer; overflow: hidden; background: var(--surface2); }
        .vid-thumb-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
        .vid-card:hover .vid-thumb-wrap img { transform: scale(1.05); }
        .vid-thumb-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .vid-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.22); transition: background .2s; }
        .vid-play-btn:hover { background: rgba(0,0,0,.4); }
        .vid-play-btn svg { width: 54px; height: 54px; fill: rgba(255,255,255,.92); filter: drop-shadow(0 2px 12px rgba(0,0,0,.5)); transition: transform .2s, fill .2s; }
        .vid-thumb-wrap:hover .vid-play-btn svg { transform: scale(1.12); fill: #fff; }
        .vid-info { padding: clamp(10px,1.6vw,16px) clamp(12px,1.8vw,18px); display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }

        /* ── ABOUT ─────────────────────────────── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,6vw,80px); align-items: center; max-width: var(--container); margin: 0 auto; }
        @media (max-width:768px) { .about-grid { grid-template-columns: 1fr; } }
        .about-img-wrap { position: relative; border-radius: var(--radius); overflow: hidden; cursor: none; }
        .about-img { width: 100%; height: clamp(340px,50vw,560px); object-fit: cover; object-position: top; border-radius: var(--radius); display: block; }
        .about-img-overlay { position: absolute; inset: 0; border-radius: var(--radius); background: linear-gradient(to bottom, transparent 60%, rgba(2,4,8,.35) 100%); pointer-events: none; }
        .about-ring { position: absolute; inset: -3px; border-radius: calc(var(--radius) + 3px); border: 1px solid var(--glass-border); pointer-events: none; z-index: 2; }
        .about-ring-outer { position: absolute; inset: -8px; border-radius: calc(var(--radius) + 8px); border: 1px solid rgba(74,172,220,0.08); pointer-events: none; z-index: 1; }
        .about-body { font-size: clamp(.88rem,1.3vw,1rem); line-height: 1.92; color: var(--text2); margin-bottom: 22px; }
        .about-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; font-size: clamp(.84rem,1.2vw,.96rem); color: var(--text2); line-height: 1.6; }
        .about-list li { display: flex; align-items: center; gap: 10px; }
        .about-dot { color: var(--accent); font-size: .62rem; flex-shrink: 0; }
        .about-quote { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.95rem,1.6vw,1.15rem); color: var(--text2); border-left: 2px solid var(--accent); padding: 14px 20px; background: var(--accent-dim); border-radius: 0 var(--radius) var(--radius) 0; line-height: 1.68; backdrop-filter: blur(8px); }

        /* ── SATURDAY + TYPOGRAPHIC BACKDROP ────── */
        .sat-outer { position: relative; max-width: var(--container); margin: clamp(24px,4vw,48px) auto 0; }
        .sat-typeback {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(80px,16vw,180px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(74,172,220,0.07);
          white-space: nowrap;
          pointer-events: none; z-index: 0;
          letter-spacing: .08em;
          user-select: none;
        }
        [data-theme='light'] .sat-typeback { -webkit-text-stroke: 1px rgba(26,126,181,0.06); }
        .sat-wrap { position: relative; border-radius: calc(var(--radius)*1.5); overflow: hidden; box-shadow: var(--shadow); cursor: pointer; z-index: 1; }
        .sat-wrap img { width: 100%; height: clamp(280px,44vw,500px); object-fit: cover; display: block; filter: brightness(.55) saturate(.75); transition: filter .45s; }
        .sat-wrap:hover img { filter: brightness(.68) saturate(.85); }
        .sat-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(2,4,8,.92) 0%, transparent 55%); }
        .sat-info { position: absolute; bottom: clamp(16px,3vw,36px); left: clamp(16px,3vw,40px); right: clamp(16px,3vw,40px); display: flex; align-items: center; gap: clamp(12px,2.5vw,28px); flex-wrap: wrap; }
        .sat-label { font-family: 'Inter Tight', sans-serif; font-size: .62rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }
        .sat-val { font-family: 'Instrument Serif', serif; font-size: clamp(.95rem,1.7vw,1.28rem); color: #fff; font-weight: 400; }
        .sat-badge { position: absolute; top: 16px; right: 16px; background: rgba(74,172,220,.12); backdrop-filter: blur(12px); border: 1px solid rgba(74,172,220,.22); color: var(--accent); font-family: 'Inter Tight', sans-serif; font-size: .66rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; padding: 5px 14px; border-radius: 40px; }
        @media (max-width:560px) { .sat-info { flex-direction: column; gap: 8px; } }

        /* ── SCRIPTURES ────────────────────────── */
        .scriptures-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px); }
        .scripture-stage { max-width: 760px; margin: clamp(32px,5vw,56px) auto 0; }
        .scripture-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: calc(var(--radius)*1.5); padding: clamp(28px,4vw,52px) clamp(24px,4vw,52px); text-align: center; position: relative; box-shadow: var(--shadow); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .scripture-quote { font-family: 'Instrument Serif', serif; font-size: clamp(3rem,7vw,5.5rem); line-height: .55; color: var(--accent); opacity: .15; margin-bottom: 8px; }
        .scripture-text { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(1.05rem,2.3vw,1.52rem); line-height: 1.75; color: var(--text); margin-bottom: 20px; }
        .scripture-ref { font-family: 'Inter Tight', sans-serif; font-size: clamp(.72rem,1vw,.86rem); font-weight: 800; letter-spacing: .12em; color: var(--accent); text-transform: uppercase; }
        .scripture-dots { display: flex; gap: 7px; justify-content: center; margin-top: 22px; }
        .s-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; transition: background .25s; }
        .s-dot.active { background: var(--accent); }

        /* ── COMMAND PALETTE ───────────────────── */
        .cmd-trigger { display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 40px; color: var(--text-muted); font-family: 'Inter Tight', sans-serif; font-size: clamp(.78rem,1.2vw,.88rem); font-weight: 600; cursor: pointer; margin-top: 28px; transition: border-color .2s, box-shadow .2s; min-width: min(320px, 90vw); justify-content: space-between; backdrop-filter: blur(16px); }
        .cmd-trigger:hover { border-color: var(--border-hover); color: var(--text); }
        .cmd-kbd { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); font-size: .66rem; font-weight: 700; padding: 2px 7px; border-radius: 5px; letter-spacing: .04em; flex-shrink: 0; }
        .cmd-backdrop { position: fixed; inset: 0; z-index: 3000; background: rgba(2,4,8,.7); backdrop-filter: blur(10px); display: flex; align-items: flex-start; justify-content: center; padding: max(80px, 12vh) 16px 32px; }
        .cmd-palette { background: var(--surface-solid); border: 1px solid var(--glass-border); border-radius: calc(var(--radius)*1.2); width: min(600px, 96vw); box-shadow: 0 40px 100px rgba(0,0,0,.6); overflow: hidden; }
        .cmd-search-row { display: flex; align-items: center; gap: 10px; padding: 16px 20px; border-bottom: 1px solid var(--border); }
        .cmd-search-row svg { color: var(--text-muted); flex-shrink: 0; }
        .cmd-input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 1rem; font-family: inherit; }
        .cmd-input::placeholder { color: var(--text-muted); }
        .cmd-clear { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: .85rem; transition: color .2s; }
        .cmd-clear:hover { color: var(--text); }
        .cmd-esc { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); font-size: .68rem; font-weight: 700; padding: 3px 9px; border-radius: 5px; cursor: pointer; letter-spacing: .04em; transition: background .2s; flex-shrink: 0; }
        .cmd-esc:hover { background: var(--border); color: var(--text); }
        .cmd-results { max-height: 360px; overflow-y: auto; }
        .cmd-result-item { display: flex; align-items: center; gap: 12px; padding: 13px 20px; cursor: pointer; transition: background .15s; border-bottom: 1px solid var(--border); }
        .cmd-result-item:last-child { border-bottom: none; }
        .cmd-result-item:hover { background: var(--accent-dim); }
        .cmd-result-icon { font-size: 1rem; flex-shrink: 0; }
        .cmd-result-name { flex: 1; font-size: .88rem; font-weight: 600; color: var(--text); }
        .cmd-result-new { background: var(--accent); color: #fff; font-size: .58rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; padding: 2px 8px; border-radius: 40px; flex-shrink: 0; }
        .cmd-result-arrow { color: var(--text-muted); flex-shrink: 0; }
        .cmd-empty { padding: 24px 20px; text-align: center; color: var(--text-muted); font-size: .86rem; }
        .cmd-footer { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; border-top: 1px solid var(--border); font-family: 'Inter Tight', sans-serif; font-size: .7rem; color: var(--text-muted); }

        /* ── DOC GRID ──────────────────────────── */
        .docs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(220px,22vw,290px),1fr)); gap: var(--gap); margin-top: clamp(28px,4vw,48px); max-width: var(--container); margin-left: auto; margin-right: auto; }
        .doc-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: clamp(18px,2.3vw,26px);
          position: relative;
          transition: border-color .25s, box-shadow .25s;
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .doc-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .doc-num { font-family: 'Inter Tight', sans-serif; font-size: .6rem; font-weight: 800; letter-spacing: .14em; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; }
        .doc-badge { position: absolute; top: 13px; right: 13px; background: var(--accent); color: #fff; font-family: 'Inter Tight', sans-serif; font-size: .56rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; padding: 3px 9px; border-radius: 40px; }
        .doc-icon { font-size: 1.5rem; margin-bottom: 10px; }
        .doc-name { font-family: 'Inter Tight', sans-serif; font-size: clamp(.82rem,1.15vw,.94rem); font-weight: 700; color: var(--text); line-height: 1.42; margin-bottom: 18px; }
        .doc-actions { display: flex; gap: 8px; }
        .doc-btn { flex: 1; padding: 9px 0; border-radius: var(--radius-sm); font-family: 'Inter Tight', sans-serif; font-size: .72rem; font-weight: 800; letter-spacing: .05em; cursor: pointer; border: none; transition: opacity .2s; text-transform: uppercase; }
        .doc-btn:hover { opacity: .82; }
        .doc-view  { background: var(--accent); color: #fff; }
        .doc-share { background: transparent; border: 1px solid var(--glass-border) !important; color: var(--text2); }

        /* ── PDF MODAL ─────────────────────────── */
        .pdf-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(2,4,8,.82); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .pdf-box { background: var(--surface-solid); border-radius: calc(var(--radius)*1.5); border: 1px solid var(--glass-border); width: 100%; max-width: 860px; max-height: 92dvh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,.7); }
        .pdf-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 22px; border-bottom: 1px solid var(--border); gap: 12px; }
        .pdf-title { font-family: 'Inter Tight', sans-serif; font-size: clamp(.84rem,1.3vw,.96rem); font-weight: 700; color: var(--text); }
        .pdf-close { background: transparent; border: 1px solid var(--border); color: var(--text); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: .8rem; display: flex; align-items: center; justify-content: center; transition: background .2s; }
        .pdf-close:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
        .pdf-body { flex: 1; overflow: hidden; }
        .pdf-footer { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 16px; border-top: 1px solid var(--border); }
        .pdf-btn { flex: 1; min-width: 110px; padding: 10px 12px; border-radius: var(--radius-sm); font-family: 'Inter Tight', sans-serif; font-size: .72rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; border: none; transition: opacity .2s; }
        .pdf-btn:hover { opacity: .82; }
        .pdf-drive { background: transparent; border: 1px solid var(--glass-border) !important; color: var(--text); }
        .pdf-dl  { background: var(--accent); color: #fff; }
        .pdf-wa  { background: #25D366; color: #fff; }

        /* ── PRAYER SECTION — Redesigned ──────── */
        .prayer-wrap { max-width: 660px; margin: 0 auto; }
        .prayer-verse { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.9rem,1.4vw,1.05rem); color: var(--text2); line-height: 1.74; padding: 16px 22px; border-left: 2px solid var(--accent); background: var(--accent-dim); border-radius: 0 var(--radius) var(--radius) 0; margin: 20px 0 0; text-align: left; backdrop-filter: blur(8px); }
        .prayer-form { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: calc(var(--radius)*1.4); padding: clamp(22px,3.5vw,42px); margin-top: 32px; display: flex; flex-direction: column; gap: 16px; box-shadow: var(--shadow); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }

        /* ── Identity row ── */
        .identity-row { display: flex; align-items: center; gap: 12px; min-height: 52px; }
        .identity-left { flex: 1; }
        .identity-anon-state { display: flex; align-items: center; gap: 9px; }
        .anon-lock { font-size: 1rem; }
        .anon-active-label { font-family: 'Inter Tight', sans-serif; font-size: .84rem; font-weight: 600; color: var(--text2); }
        .identity-toggle-wrap { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
        .toggle-label-text { font-family: 'Inter Tight', sans-serif; font-size: .74rem; font-weight: 600; color: var(--text-muted); letter-spacing: .04em; white-space: nowrap; }
        .toggle { width: 46px; height: 26px; border-radius: 13px; background: var(--surface2); border: 1px solid var(--glass-border); cursor: pointer; position: relative; transition: background .25s, border-color .25s; flex-shrink: 0; }
        .toggle.on { background: var(--accent); border-color: var(--accent); }
        .toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .28s cubic-bezier(.34,1.56,.64,1); box-shadow: 0 2px 6px rgba(0,0,0,.2); }
        .toggle.on .toggle-knob { transform: translateX(20px); }

        /* ── Floating label fields ── */
        .floating-field { position: relative; }
        .f-bare {
          width: 100%; padding: 18px 14px 6px;
          background: none; border: none; border-bottom: 1.5px solid var(--input-border);
          color: var(--text); font-family: 'Inter Tight', sans-serif; font-size: .92rem; outline: none;
          transition: border-color .2s;
        }
        .f-bare:focus { border-color: var(--accent); }
        .f-bare::placeholder { color: transparent; }
        .floating-label {
          position: absolute; top: 50%; left: 14px; transform: translateY(-50%);
          font-family: 'Inter Tight', sans-serif; font-size: .88rem; color: var(--text-muted);
          pointer-events: none; transition: all .2s; transform-origin: left top;
        }
        .f-bare:focus + .floating-label,
        .f-bare:not(:placeholder-shown) + .floating-label,
        .floating-label.elevated {
          transform: translateY(-120%) scale(.78);
          color: var(--accent);
        }
        .f-bare.f-select {
          padding: 14px 14px;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234E6678' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .f-bare.f-select option { background: var(--surface-solid); color: var(--text); }

        /* ── Borderless message textarea ── */
        .message-field {
          border-bottom: 1.5px solid var(--input-border);
          transition: border-color .2s;
        }
        .message-field:focus-within { border-color: var(--accent); }
        .f-bare-area {
          width: 100%; padding: 14px 14px;
          background: none; border: none; outline: none; resize: none; overflow: hidden;
          color: var(--text); font-family: 'Inter Tight', sans-serif; font-size: .92rem;
          line-height: 1.7; min-height: 80px;
          transition: none;
        }
        .f-bare-area::placeholder { color: var(--text-muted); }

        /* ── Form controls row ── */
        .form-controls-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .add-notes-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 1px solid var(--glass-border); color: var(--text-muted); font-family: 'Inter Tight', sans-serif; font-size: .78rem; font-weight: 700; letter-spacing: .04em; padding: 7px 14px; border-radius: 40px; cursor: pointer; transition: color .2s, border-color .2s; }
        .add-notes-btn:hover { color: var(--accent); border-color: var(--accent); }
        .add-notes-icon { font-size: 1rem; font-weight: 400; line-height: 1; }
        .wall-check { display: flex; align-items: center; gap: 7px; cursor: pointer; font-family: 'Inter Tight', sans-serif; font-size: .78rem; font-weight: 600; color: var(--text-muted); }
        .f-check { width: 15px; height: 15px; accent-color: var(--accent); cursor: pointer; flex-shrink: 0; }

        .privacy-notice { display: flex; align-items: flex-start; gap: 8px; font-family: 'Inter Tight', sans-serif; font-size: .72rem; color: var(--text-muted); line-height: 1.55; padding: 11px 16px; background: var(--accent-dim); border-radius: var(--radius-sm); border: 1px solid rgba(74,172,220,.1); }
        .submit-btn { padding: 15px 32px; border-radius: 40px; background: var(--accent); color: #fff; font-family: 'Inter Tight', sans-serif; font-size: .82rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; border: none; cursor: pointer; transition: background .2s; }
        .submit-btn:hover { background: var(--accent-warm); }
        .prayer-conf { background: var(--glass-bg); border: 1px solid rgba(74,172,220,.28); border-radius: calc(var(--radius)*1.4); padding: clamp(28px,4vw,52px); text-align: center; margin-top: 32px; box-shadow: 0 0 0 1px var(--accent-dim), var(--shadow); backdrop-filter: blur(20px); }
        .conf-icon { font-size: 2.4rem; margin-bottom: 14px; }
        .conf-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.1rem,2.2vw,1.5rem); color: var(--text); margin-bottom: 12px; font-weight: 400; }
        .conf-body { color: var(--text2); line-height: 1.75; font-size: .9rem; }
        .conf-wall { color: var(--accent); font-size: .78rem; margin-top: 12px; font-weight: 700; }

        /* ── PRAYER WALL ────────────────────────── */
        .prayer-wall { margin-top: clamp(36px,5vw,64px); }
        .pw-header { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
        .pw-cross { font-size: 1.7rem; color: var(--accent); }
        .pw-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.15rem,2.2vw,1.45rem); color: var(--text); font-weight: 400; }
        .pw-sub { font-family: 'Inter Tight', sans-serif; font-size: .84rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 22px; }
        .pw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%,280px),1fr)); gap: var(--gap); }
        .pw-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .pw-top { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 12px; }
        .pw-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(74,172,220,.25); color: var(--accent); font-weight: 700; font-size: .74rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Inter Tight', sans-serif; }
        .pw-meta { flex: 1; }
        .pw-name { font-family: 'Inter Tight', sans-serif; font-weight: 700; font-size: .82rem; color: var(--text); }
        .pw-cat  { font-family: 'Inter Tight', sans-serif; font-size: .68rem; color: var(--text-muted); margin-top: 2px; }
        .pw-time { font-family: 'Inter Tight', sans-serif; font-size: .66rem; color: var(--text-muted); white-space: nowrap; flex-shrink: 0; }
        .pw-divider { height: 1px; background: var(--border); margin: 0 0 11px; }
        .pw-text { font-family: 'Inter Tight', sans-serif; font-size: .82rem; color: var(--text2); line-height: 1.68; margin-bottom: 14px; }
        .pw-pray { padding: 7px 16px; border-radius: 40px; background: var(--accent-dim); border: 1px solid rgba(74,172,220,.22); color: var(--accent); font-family: 'Inter Tight', sans-serif; font-size: .74rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: background .2s, color .2s; }
        .pw-pray:hover { background: var(--accent); color: #fff; }
        .pw-pray:disabled { opacity: .55; cursor: default; }

        /* ── ANNOUNCEMENTS ─────────────────────── */
        .announce-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,4vw,56px); max-width: var(--container); margin: 0 auto; }
        @media (max-width:768px) { .announce-grid { grid-template-columns: 1fr; } }
        .ann-col-head { display: flex; align-items: center; gap: 13px; margin-bottom: 20px; }
        .ann-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(74,172,220,.22); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: .82rem; flex-shrink: 0; }
        .ann-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.05rem,2vw,1.4rem); color: var(--text); font-weight: 400; }
        .ann-box { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); backdrop-filter: blur(16px); }
        .ann-img { width: 100%; height: 200px; object-fit: cover; display: block; }
        .ann-body { padding: clamp(14px,2.2vw,22px); }
        .ann-coming { font-family: 'Inter Tight', sans-serif; font-size: .64rem; font-weight: 800; letter-spacing: .16em; color: var(--accent); text-transform: uppercase; margin-bottom: 6px; }
        .ann-host { font-family: 'Inter Tight', sans-serif; font-size: clamp(.88rem,1.3vw,.98rem); font-weight: 700; color: var(--text); margin-bottom: 14px; }
        .ann-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ann-meta-item { display: flex; flex-direction: column; gap: 2px; }
        .ann-meta-l { font-family: 'Inter Tight', sans-serif; font-size: .58rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); }
        .ann-meta-v { font-family: 'Inter Tight', sans-serif; font-size: .78rem; font-weight: 700; color: var(--text2); }
        .ann-meta-v.accent { color: var(--accent); }
        .testi-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: clamp(16px,2.2vw,24px); margin-bottom: 13px; box-shadow: var(--shadow); transition: border-color .25s, transform .25s, box-shadow .25s; backdrop-filter: blur(16px); }
        .testi-card:hover { box-shadow: var(--shadow-hover); }
        .testi-quote { font-family: 'Instrument Serif', serif; font-size: 2.6rem; line-height: .5; color: var(--accent); opacity: .18; margin-bottom: 8px; }
        .testi-text { font-family: 'Inter Tight', sans-serif; font-style: italic; color: var(--text2); font-size: clamp(.8rem,1.15vw,.91rem); line-height: 1.75; margin-bottom: 14px; }
        .testi-author { display: flex; align-items: center; gap: 9px; }
        .testi-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(74,172,220,.22); color: var(--accent); font-weight: 700; font-size: .7rem; display: flex; align-items: center; justify-content: center; font-family: 'Inter Tight', sans-serif; }
        .testi-name { font-family: 'Inter Tight', sans-serif; font-weight: 700; font-size: .82rem; color: var(--text); }
        .testi-loc  { font-family: 'Inter Tight', sans-serif; font-size: .68rem; color: var(--text-muted); }

        /* ── SOCIAL ────────────────────────────── */
        .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(140px,15vw,185px),1fr)); gap: var(--gap); max-width: var(--container); margin: clamp(28px,4vw,48px) auto 0; }
        .soc-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: clamp(18px,2.2vw,28px) 14px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 9px; box-shadow: var(--shadow); transition: border-color .25s, box-shadow .25s; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .soc-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-hover); }
        .soc-logo { display: flex; align-items: center; justify-content: center; }
        .soc-name { font-family: 'Inter Tight', sans-serif; font-weight: 700; font-size: .84rem; color: var(--text); }
        .soc-desc { font-family: 'Inter Tight', sans-serif; font-size: .72rem; color: var(--text-muted); }

        /* ── JOIN / CTA ────────────────────────── */
        .join-sec { text-align: center; background: var(--surface); border-top: 1px solid var(--border); padding: var(--section-py) clamp(20px,5vw,48px); backdrop-filter: blur(20px); }

        /* ── FOOTER ────────────────────────────── */
        footer { background: var(--surface-solid); border-top: 1px solid var(--border); }
        .vod { text-align: center; padding: clamp(32px,5vw,56px) clamp(20px,5vw,60px); border-bottom: 1px solid var(--border); max-width: 660px; margin: 0 auto; }
        .vod-label { font-family: 'Inter Tight', sans-serif; font-size: .64rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        .vod-text { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.98rem,1.9vw,1.28rem); color: var(--text); line-height: 1.75; margin-bottom: 12px; }
        .vod-ref  { font-family: 'Inter Tight', sans-serif; font-size: .76rem; font-weight: 700; color: var(--text-muted); letter-spacing: .08em; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px clamp(18px,5vw,56px); gap: 14px; flex-wrap: wrap; }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-logo  { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; }
        .footer-brand-name { font-family: 'Instrument Serif', serif; font-size: .9rem; font-weight: 400; color: var(--text); }
        .footer-brand-sub  { font-family: 'Inter Tight', sans-serif; font-size: .68rem; color: var(--text-muted); letter-spacing: .04em; }
        .footer-copy { font-family: 'Inter Tight', sans-serif; font-size: .68rem; color: var(--text-muted); }
        .built-by { text-align: center; padding: 13px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: center; gap: 7px; font-family: 'Inter Tight', sans-serif; font-size: .72rem; }
        .by-text { color: var(--text-muted); }
        .by-name { color: var(--accent); font-weight: 800; }
        .by-cross { color: var(--accent); opacity: .3; font-size: .66rem; }

        /* ── VOTD PLAYER ───────────────────────── */
        .votd-player-wrap { position: relative; width: 100%; padding-top: 56.25%; background: var(--surface2); cursor: pointer; overflow: hidden; }
        .votd-player-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .votd-player-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .votd-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.18); transition: background .2s; }
        .votd-play:hover { background: rgba(0,0,0,.38); }
        .votd-play svg { width: 76px; height: 76px; fill: rgba(255,255,255,.92); filter: drop-shadow(0 4px 20px rgba(0,0,0,.55)); transition: transform .22s; }
        .votd-player-wrap:hover .votd-play svg { transform: scale(1.09); }

        /* ── ACCESSIBILITY ─────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ── SCROLLBAR ─────────────────────────── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
      `}</style>
    </>
  );
}
