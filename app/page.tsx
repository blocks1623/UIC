'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
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
  "Healing & Health",
  "Guidance & Direction",
  "Thanksgiving & Praise",
  "Financial Breakthrough",
  "Relationships & Family",
  "Spiritual Growth",
  "Salvation for Loved Ones",
  "Protection & Safety",
  "Career & Purpose",
  "Other",
];

const PRAYER_WALL_ENTRIES = [
  { initials: "SM", name: "S.M", category: "Healing & Health",      text: "Praying for complete healing and restoration in my body. God is faithful.", time: "2h ago" },
  { initials: "TN", name: "T.N", category: "Financial Breakthrough", text: "Believing God for a financial miracle this season. His provision never fails.", time: "5h ago" },
  { initials: "AN", name: "Anonymous", category: "Guidance & Direction", text: "Standing at a crossroads. Trusting the Lord to order my steps clearly.", time: "1d ago" },
  { initials: "LD", name: "L.D", category: "Salvation for Loved Ones", text: "Interceding for my family to come to know the Lord. He is able to save!", time: "2d ago" },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

// Deterministic — safe for both SSR and client (no Math.random)
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const chr = seed.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
}

function getDailyIndex(listLength: number): number {
  return Math.floor(seededRandom(new Date().toDateString()) * listLength);
}

// Seeded daily shuffle — deterministic per day, avoids SSR/client mismatch
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

// ─────────────────────────────────────────────
// SPRING CONFIGS
// ─────────────────────────────────────────────
const SPRING      = { type: 'spring' as const, stiffness: 280, damping: 22 };
const SPRING_SOFT = { type: 'spring' as const, stiffness: 200, damping: 26 };

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0,  transition: SPRING },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0,  transition: SPRING },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,    transition: SPRING },
};

// ─────────────────────────────────────────────
// LAZY VIDEO CARD — only loads iframe when visible
// This is the key fix for scroll crashes on mobile
// ─────────────────────────────────────────────
interface VideoCardProps {
  video: { id: string; title: string; url: string };
  index: number;
}

function LazyVideoCard({ video, index }: VideoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="video-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -8, borderColor: 'var(--gold)', boxShadow: '0 24px 56px rgba(0,0,0,.55)' }}
    >
      <div className="video-wrapper">
        {isVisible ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            allowFullScreen
            loading="lazy"
            title={video.title}
          />
        ) : (
          // Placeholder shown before iframe loads — prevents layout shift
          <div style={{
            position: 'absolute', inset: 0, background: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(74,172,220,0.3)">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
      <div className="video-info">
        <div className="video-title">{video.title}</div>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-link">
          Watch on YouTube &#8594;
        </a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// WAVE RIPPLE
// ─────────────────────────────────────────────
interface WaveRippleProps { color: string; onComplete: () => void }
function WaveRipple({ color, onComplete }: WaveRippleProps) {
  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 99998, pointerEvents: 'none',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: 'clamp(14px,4vw,28px)',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0.85 }}
        animate={{ scale: 90, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={onComplete}
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: color,
          originX: '50%', originY: '50%',
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCRIPTURES SECTION
// ─────────────────────────────────────────────
function ScripturesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % SCRIPTURES.length), 8000);
    return () => clearInterval(t);
  }, []);
  const s = SCRIPTURES[activeIdx];
  return (
    <section id="scriptures" className="scriptures-section">
      {['10%', '90%', '50%'].map((left, i) => (
        <motion.div key={i} className="scripture-cross"
          style={{ left, top: i === 2 ? '80%' : '20%' }}
          animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        >✝</motion.div>
      ))}
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-lbl">Living Word</div>
        <h2 className="sec-title">Scripture of the <span>Day</span></h2>
        <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
          style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto 0' }} />
      </motion.div>
      <div className="scripture-stage">
        <AnimatePresence mode="wait">
          <motion.div key={activeIdx} className="scripture-card"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={SPRING_SOFT}
          >
            <motion.div className="scripture-glow"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="scripture-open-quote">&ldquo;</div>
            <p className="scripture-text">{s.verse}</p>
            <div className="scripture-ref">— {s.ref}</div>
          </motion.div>
        </AnimatePresence>
        <div className="scripture-dots">
          {SCRIPTURES.map((_, i) => (
            <motion.button key={i} className={`scripture-dot${i === activeIdx ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)} whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }} transition={SPRING} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PDF MODAL
// ─────────────────────────────────────────────
interface PdfModalProps {
  doc: { name: string; viewUrl: string } | null;
  onClose: () => void;
}
function PdfModal({ doc, onClose }: PdfModalProps) {
  useEffect(() => {
    if (doc) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [doc]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const shareDoc = () => {
    if (!doc) return;
    const text = `✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="pdf-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="pdf-modal-box"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={SPRING_SOFT}
          >
            <div className="pdf-modal-header">
              <div className="pdf-modal-title">{doc.name}</div>
              <motion.button className="pdf-modal-close" onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }} transition={SPRING}>✕</motion.button>
            </div>
            <div className="pdf-modal-body">
              <iframe
                src={getEmbedUrl(doc.viewUrl)}
                title={doc.name}
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none', minHeight: '520px' }}
              />
            </div>
            <div className="pdf-modal-footer">
              <motion.button className="pdf-btn pdf-btn-drive"
                onClick={() => window.open(doc.viewUrl, '_blank')}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING}
              >Open in Google Drive</motion.button>
              <motion.button className="pdf-btn pdf-btn-dl"
                onClick={() => window.open(getDownloadUrl(doc.viewUrl), '_blank')}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING}
              >Download PDF</motion.button>
              <motion.button className="pdf-btn pdf-btn-wa"
                onClick={shareDoc}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING}
              >Share on WhatsApp</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// DOCUMENTS SECTION
// ─────────────────────────────────────────────
function DocumentsSection() {
  const [search, setSearch] = useState('');
  const [openDoc, setOpenDoc] = useState<typeof DOCUMENTS[0] | null>(null);

  const filtered = DOCUMENTS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const shareDoc = (doc: typeof DOCUMENTS[0]) => {
    const text = `✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="documents">
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-lbl">Written Revelation</div>
        <h2 className="sec-title">Teaching <span>Notes</span></h2>
        <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
          style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto 16px' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(.88rem,1.5vw,1rem)', marginBottom: 'clamp(20px,3vw,32px)', lineHeight: '1.7' }}>
          Study materials from Prophet Jay Uriel. View online or download to study at your pace.
        </p>
        <div className="doc-search-wrap">
          <span className="doc-search-icon">&#9740;</span>
          <input
            className="doc-search-input"
            type="text"
            placeholder="Search teaching notes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="doc-search-clear" onClick={() => setSearch('')}>&#10005;</button>
          )}
        </div>
        {search && (
          <p className="doc-search-count" style={{ textAlign: 'center', marginTop: '10px' }}>
            {filtered.length === 0 ? 'No notes found' : `${filtered.length} of ${DOCUMENTS.length} notes`}
          </p>
        )}
      </motion.div>

      <div className="docs-grid">
        {filtered.length === 0 ? (
          <div className="doc-empty">No teaching notes match &ldquo;{search}&rdquo;</div>
        ) : (
          filtered.map((doc, i) => {
            const origIdx = DOCUMENTS.indexOf(doc);
            return (
              <motion.div
                className="doc-card-glass"
                key={doc.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ ...SPRING, delay: i * 0.055 }}
              >
                <div className="doc-glass-num">{String(origIdx + 1).padStart(2, '0')}</div>
                {doc.isNew && <div className="doc-glass-new">NEW</div>}
                <div className="doc-glass-icon">&#128196;</div>
                <div className="doc-glass-title">{doc.name}</div>
                <div className="doc-glass-actions">
                  <motion.button
                    className="doc-glass-btn doc-glass-view"
                    onClick={() => setOpenDoc(doc)}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SPRING}
                  >&#128065; View</motion.button>
                  <motion.button
                    className="doc-glass-btn doc-glass-wa"
                    onClick={() => shareDoc(doc)}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SPRING}
                  >&#8679; Share</motion.button>
                </div>
              </motion.div>
            );
          })
        )}
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
    <div className="prayer-wall-section">
      <div className="prayer-wall-header">
        <span className="prayer-wall-icon">&#9769;</span>
        <div className="prayer-wall-header-text">
          <div className="sec-lbl" style={{ margin: 0, fontSize: '.68rem' }}>Community Intercession</div>
          <h3 className="prayer-wall-title">Prayer Wall</h3>
        </div>
      </div>
      <p className="prayer-wall-sub">
        Join hands in prayer with fellow believers. Submit your request above and opt in to be added here.
      </p>
      <div className="prayer-wall-grid">
        {PRAYER_WALL_ENTRIES.map((entry, i) => (
          <motion.div
            key={i}
            className="prayer-wall-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: i * 0.08 }}
          >
            <div className="pw-card-top">
              <div className="pw-avatar">{entry.initials}</div>
              <div className="pw-info">
                <div className="pw-name">{entry.name}</div>
                <div className="pw-category">{entry.category}</div>
              </div>
              <div className="pw-time">{entry.time}</div>
            </div>
            <div className="pw-divider" />
            <p className="pw-text">{entry.text}</p>
            <div className="pw-pray-btn-wrap">
              <motion.button
                className="pw-pray-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={SPRING}
                onClick={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  if (!btn.disabled) {
                    btn.textContent = '✧ Praying…';
                    btn.disabled = true;
                    setTimeout(() => { btn.textContent = '✓ Prayed'; }, 1400);
                  }
                }}
              >
                &#10022; Pray for this
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PRAYER SECTION
// ─────────────────────────────────────────────
function PrayerSection() {
  const [isAnon, setIsAnon] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [addToWall, setAddToWall] = useState(false);
  const [category, setCategory] = useState('');

  const handlePrayer = () => {
    const name    = isAnon ? 'Anonymous' : ((document.getElementById('pName') as HTMLInputElement)?.value.trim() || '');
    const subject = (document.getElementById('pSubject') as HTMLInputElement)?.value.trim() || '';
    const msg     = (document.getElementById('pMessage') as HTMLTextAreaElement)?.value.trim() || '';

    if (!isAnon && !name) { alert('Please fill in your name or enable the anonymous option.'); return; }
    if (!msg) { alert('Please share your prayer request.'); return; }

    const cat = category || 'General';
    const wallNote = addToWall ? '\n\n✓ Approved to display on Prayer Wall (first name only)' : '';
    const anonNote = isAnon ? '\n🔒 Submitted anonymously' : '';
    const text = `✧ Prayer Request — United in Christ\n\nName: ${name}${anonNote}\n${subject ? `Subject: ${subject}\n` : ''}Category: ${cat}\n\nPrayer Request:\n${msg}${wallNote}`;

    window.open(`https://wa.me/27649842408?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setIsAnon(false);
      setExpanded(false);
      setAddToWall(false);
      setCategory('');
      ['pName', 'pSubject', 'pMessage'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
      });
    }, 6000);
  };

  return (
    <section id="prayer">
      <div className="prayer-wrap">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-lbl">Come Before God</div>
          <h2 className="sec-title">Submit a <span>Prayer Request</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto 24px' }} />
          <div className="prayer-scripture">
            <span className="prayer-scripture-icon">&#10022;</span>
            <em>&ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo; &mdash; Philippians 4:6</em>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(.88rem,1.5vw,1rem)', marginTop: '14px', lineHeight: '1.7' }}>
            We stand in agreement with you. Share your request and our team will pray for you.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              className="prayer-confirmation"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={SPRING_SOFT}
            >
              <div className="prayer-conf-icon">&#9769;</div>
              <h3 className="prayer-conf-title">Your request has been received</h3>
              <p className="prayer-conf-text">
                Our team is praying with you. The Lord hears every cry of the heart.
                <br />
                <em style={{ color: 'var(--gold)', fontSize: '.9em' }}>
                  &ldquo;The effectual fervent prayer of a righteous man availeth much.&rdquo; &mdash; James 5:16
                </em>
              </p>
              {addToWall && (
                <p className="prayer-conf-wall">&#10003; Your request will be added to the Prayer Wall</p>
              )}
            </motion.div>
          ) : (
            <motion.div key="form" className="prayer-form" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="prayer-anon-row">
                <span className="prayer-anon-lock">&#128274;</span>
                <label className="prayer-anon-label" htmlFor="anonToggle">
                  <strong>Submit anonymously</strong>
                  <span className="prayer-anon-note">Your identity will be kept completely private</span>
                </label>
                <button
                  id="anonToggle"
                  className={`prayer-toggle${isAnon ? ' active' : ''}`}
                  onClick={() => setIsAnon(!isAnon)}
                  type="button"
                  aria-pressed={isAnon}
                >
                  <span className="prayer-toggle-knob" />
                </button>
              </div>

              <AnimatePresence>
                {!isAnon && (
                  <motion.div
                    className="form-field-wrap"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="form-field-icon" style={{ fontSize: '13px', opacity: '.5' }}>&#9673;</span>
                    <input className="form-input form-input-icon" type="text" placeholder="Your Name *" id="pName" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-field-wrap">
                <span className="form-field-icon" style={{ fontSize: '12px', opacity: '.5' }}>&#9670;</span>
                <select
                  className="form-input form-input-icon form-select"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Select request category&hellip;</option>
                  {PRAYER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-field-wrap">
                <span className="form-field-icon" style={{ fontSize: '12px', opacity: '.5' }}>&#9671;</span>
                <input className="form-input form-input-icon" type="text" placeholder="Subject (optional)" id="pSubject" />
              </div>

              <div style={{ position: 'relative' }}>
                <span className="form-field-icon" style={{ top: '15px', position: 'absolute', left: '15px', fontSize: '13px', opacity: '.5', zIndex: 2 }}>&#10022;</span>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Share your prayer request here…"
                  id="pMessage"
                />
              </div>

              <motion.button
                className="prayer-expand-btn"
                onClick={() => setExpanded(!expanded)}
                whileHover={{ color: 'var(--gold)' }}
              >
                {expanded ? '▲ Less options' : '▾ More options (Prayer Wall, notifications)'}
              </motion.button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    className="prayer-expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="prayer-checkbox-row">
                      <input
                        type="checkbox"
                        id="wallConsent"
                        className="prayer-checkbox"
                        checked={addToWall}
                        onChange={e => setAddToWall(e.target.checked)}
                      />
                      <label htmlFor="wallConsent" className="prayer-checkbox-label">
                        <strong>Add to Prayer Wall</strong>
                        <span> &mdash; Display my request publicly (first name or anonymous) so others can join in prayer</span>
                      </label>
                    </div>
                    <div className="prayer-checkbox-row">
                      <input type="checkbox" id="notifyMe" className="prayer-checkbox" />
                      <label htmlFor="notifyMe" className="prayer-checkbox-label">
                        <strong>Prayer updates</strong>
                        <span> &mdash; Notify me via WhatsApp when someone prays for my request</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="prayer-privacy">
                <span style={{ fontSize: '14px', flexShrink: 0 }}>&#128274;</span>
                Your information is strictly confidential and will never be shared outside our prayer team.
              </div>

              <motion.button
                className="form-submit"
                onClick={handlePrayer}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 26px rgba(74,172,220,.3)' }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
              >
                &#10022; Send Prayer Request
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
// VERSE OF THE DAY
// ─────────────────────────────────────────────
function VerseOfTheDay() {
  const idx = getDailyIndex(SCRIPTURES.length);
  const s   = SCRIPTURES[idx];
  return (
    <motion.div className="verse-of-day"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={SPRING_SOFT}
    >
      <div className="vod-label">&#10022; Verse of the Day &#10022;</div>
      <p className="vod-text">&ldquo;{s.verse}&rdquo;</p>
      <div className="vod-ref">&mdash; {s.ref}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Home() {
  const [isDark, setIsDark]         = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ripple, setRipple]         = useState<{ color: string } | null>(null);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);

  // FIX: Use seeded (deterministic) shuffle so SSR and client match exactly.
  // Videos are shuffled by day, not randomly per render.
  const dailySeed = typeof window === 'undefined'
    ? new Date().toDateString()
    : new Date().toDateString();

  const videos = seededShuffle(VIDEOS, dailySeed);

  // FIX: videoOfTheDay must be stable — use seeded index, not Math.random()
  const videoOfTheDay = videos[getDailyIndex(videos.length)];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeToggle = () => {
    setRipple({ color: isDark ? '#EAF4FB' : '#020C14' });
  };
  const onRippleComplete = useCallback(() => {
    setIsDark(d => !d);
    setRipple(null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = 0, H = 0, animId = 0;
    type Star = { x:number;y:number;r:number;a:number;da:number;vx:number;vy:number };
    let stars: Star[] = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const initStars = () => {
      // FIX: Use seeded values for star positions so they match SSR.
      // We only animate them on the client so this is fine.
      stars = [];
      for (let i = 0; i < 90; i++) {
        const s1 = seededRandom(`star-x-${i}`);
        const s2 = seededRandom(`star-y-${i}`);
        const s3 = seededRandom(`star-r-${i}`);
        const s4 = seededRandom(`star-a-${i}`);
        const s5 = seededRandom(`star-da-${i}`);
        const s6 = seededRandom(`star-vx-${i}`);
        const s7 = seededRandom(`star-vy-${i}`);
        stars.push({
          x: s1 * W, y: s2 * H,
          r: s3 * 1.4 + 0.2,
          a: s4,
          da: (0.002 + s5 * 0.006) * (i % 2 === 0 ? 1 : -1),
          vx: (s6 - 0.5) * 0.15,
          vy: (s7 - 0.5) * 0.15,
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,172,220,${s.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    const onResize = () => { resize(); initStars(); };
    window.addEventListener('resize', onResize);
    resize(); initStars(); draw();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(animId); };
  }, []);

  // FIX: Add `layoutEffect: false` / clamp to reduce jank on mobile during fast scroll
  const { scrollY } = useScroll();
  const navPaddingY  = useTransform(scrollY, [0, 120], [13, 7]);
  const navLogoSize  = useTransform(scrollY, [0, 120], [48, 36]);
  // Softer spring = less thrashing on fast scroll
  const springNavPy  = useSpring(navPaddingY,  { stiffness: 80, damping: 20 });
  const springLogoSz = useSpring(navLogoSize,  { stiffness: 80, damping: 20 });

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

      <AnimatePresence>
        {ripple && <WaveRipple key="ripple" color={ripple.color} onComplete={onRippleComplete} />}
      </AnimatePresence>

      <motion.button className="theme-toggle" title="Toggle light/dark"
        onClick={handleThemeToggle}
        whileHover={{ scale: 1.12, rotate: 15 }} whileTap={{ scale: 0.9 }}
        transition={SPRING}
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        style={{ zIndex: 99999 }}
      >{isDark ? '☾' : '☀'}</motion.button>

      {/* ── NAV ── */}
      <motion.nav id="navbar"
        style={{ paddingTop: springNavPy, paddingBottom: springNavPy }}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        <a href="#" className="nav-logo">
          <motion.div className="nav-logo-img" style={{ width: springLogoSz, height: springLogoSz }}>
            <img src="/photos/united-in-christ-logo.png" alt="United in Christ" />
          </motion.div>
          <div>
            <div className="nav-logo-text">United in Christ</div>
            <div className="nav-logo-sub">Prophet Jay Uriel</div>
          </div>
        </a>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.href}>
              <motion.a href={item.href} whileHover={{ color: 'var(--gold)' }} transition={{ duration: 0.2 }}>{item.label}</motion.a>
            </li>
          ))}
        </ul>
        <motion.button className={`nav-hamburger${isMenuOpen ? ' open' : ''}`} aria-label="Open menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
          <span /><span /><span />
        </motion.button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul className="nav-mobile-menu open"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {navItems.map((item, i) => (
              <motion.li key={item.href}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
                transition={{ ...SPRING, delay: i * 0.06 }}
              >
                <a href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <motion.div className="hero-ornament"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.4 }}>
          Ministry of the Word
        </motion.div>
        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.55 }}>
          United in <span>Christ</span>
        </motion.h1>
        <motion.div className="hero-logo-wrap"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...SPRING, delay: 0.7 }}>
          <div className="hero-logo-ring" />
          <div className="hero-logo-ring-2" />
          <div className="hero-logo-circle">
            <img src="/photos/united-in-christ-logo.png" alt="Logo" />
          </div>
        </motion.div>
        <motion.p className="hero-tagline"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 0.9 }}>
          &ldquo;Proclaiming the Word of God with power, truth, and the spirit of prophecy&rdquo;
        </motion.p>
        <motion.div className="hero-cta"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING, delay: 1.05 }}>
          <motion.a href="#sermons" className="btn-gold"
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(74,172,220,.45)' }}
            whileTap={{ scale: 0.97 }} transition={SPRING}>
            Watch Sermons
          </motion.a>
          <motion.a href="#prayer" className="btn-outline"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
            <span>Submit Prayer</span>
          </motion.a>
        </motion.div>
      </section>

      {/* ── VIDEO OF THE DAY ── */}
      {/* FIX: suppressHydrationWarning on the date display to prevent mismatch */}
      <motion.section id="video-of-day"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
        <div className="sec-center" style={{ marginBottom: 'clamp(24px,4vw,44px)' }}>
          <div className="sec-lbl">Featured Today</div>
          <h2 className="sec-title">Video of the <span>Day</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto 0' }} />
        </div>
        <motion.div className="votd-card"
          whileHover={{ scale: 1.012, boxShadow: '0 32px 72px rgba(0,0,0,.6)' }} transition={SPRING_SOFT}>
          <div className="votd-badge" suppressHydrationWarning>
            &#9670; {new Date().toLocaleDateString('en-ZA', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoOfTheDay.id}`}
              allowFullScreen
              loading="lazy"
              title={videoOfTheDay.title}
            />
          </div>
          <div className="votd-info">
            <div className="video-title">{videoOfTheDay.title}</div>
            <a href={videoOfTheDay.url} target="_blank" rel="noopener noreferrer" className="video-link">
              Watch on YouTube &#8594;
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-grid">
          <motion.div className="about-img-wrap"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeLeft}>
            <div className="about-img-border" />
            <img className="about-img" src="/photos/jay-uriel.jpeg" alt="Prophet Jay Uriel"
              onError={(e) => { const t = e.target as HTMLImageElement; t.src = '/photos/jay-uriel.png'; t.onerror = null; }} />
            <div className="about-img-ring" />
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeRight}>
            <div className="sec-lbl">Our Leader &amp; Founder</div>
            <h2 className="sec-title" style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)' }}>
              Prophet <span>Jay Uriel</span>
            </h2>
            <motion.div initial={{ width: 0 }} whileInView={{ width: 70 }} transition={{ duration: 0.8 }}
              style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px 0' }} />
            <p style={{ margin: 'clamp(18px,3vw,32px) 0 clamp(18px,3vw,40px)', fontSize: 'clamp(.9rem,1.5vw,1.08rem)', lineHeight: '1.85', color: 'var(--white2)' }}>
              Prophet Jay Uriel is a consecrated vessel called by God &mdash; a bold prophetic voice raised for this generation.
              With deep revelation, anointed teaching, and the genuine gift of prophecy, he ministers the fullness of Christ with power, clarity, and compassion.
            </p>
            <div className="about-quote">
              &ldquo;The Spirit of the Lord is upon me to proclaim liberty, healing, and the knowledge of Christ.&rdquo;
            </div>
            <motion.a href="#saturday" className="btn-gold" style={{ padding: '17px 42px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(74,172,220,.4)' }}
              whileTap={{ scale: 0.97 }} transition={SPRING}>
              Join Us This Saturday
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── SATURDAY ── */}
      <section id="saturday">
        <motion.div className="sec-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-lbl">Every Saturday</div>
          <h2 className="sec-title">Saturday <span>Teachings</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto' }} />
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto clamp(28px,4vw,50px)', fontSize: 'clamp(.9rem,1.5vw,1.05rem)', lineHeight: '1.75' }}>
            Join us every Saturday for powerful anointed teachings with Prophet Jay Uriel. Come expecting an encounter with God.
          </p>
        </motion.div>
        <motion.div className="sat-img-wrap"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
          whileHover={{ scale: 1.008 }} transition={SPRING_SOFT}>
          <img src="/photos/IMG_4616.jpg" alt="Saturday Teachings - United in Christ" />
          <div className="sat-overlay" />
          <div className="sat-info">
            <div className="sat-info-time">
              <div className="day-label">Every Saturday</div>
              <div className="time-val">8:00 PM</div>
            </div>
            <div className="sat-divider" />
            <div className="sat-info-venue">
              <div className="venue-label">Venue</div>
              <div className="venue-val">El Roi Chambers</div>
            </div>
            <motion.a href="#prayer" className="btn-gold"
              style={{ whiteSpace: 'nowrap', padding: 'clamp(12px,2vw,16px) clamp(18px,3vw,36px)' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={SPRING}>
              I Want to Attend
            </motion.a>
          </div>
          <div className="sat-badge">United in Christ</div>
        </motion.div>
      </section>

      {/* ── SCRIPTURES ── */}
      <ScripturesSection />

      {/* ── ANNOUNCEMENTS & TESTIMONIALS ── */}
      <section id="announcements">
        <motion.div className="sec-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-lbl">Church Family</div>
          <h2 className="sec-title">Announcements &amp; <span>Testimonials</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto' }} />
        </motion.div>
        <div className="announce-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
            <div className="announce-col-header">
              <div className="announce-col-icon">&#9670;</div>
              <div>
                <div className="sec-lbl" style={{ margin: 0, fontSize: '.75rem' }}>Special Broadcast</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,3vw,1.65rem)', color: 'var(--white)', margin: 0 }}>
                  Word of Life &amp; The Prophetic
                </h3>
              </div>
            </div>
            <div className="announce-box">
              <img className="announce-img" src="/announcements/image.jpg" alt="Word of Life and The Prophetic" />
              <div style={{ padding: '0 clamp(4px,1vw,8px)' }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: '.85rem', letterSpacing: '.08em', color: 'var(--gold)', marginBottom: '8px' }}>
                  Coming Soon
                </div>
                <div style={{ fontSize: 'clamp(.95rem,1.8vw,1.1rem)', lineHeight: '1.4', color: 'var(--white)', fontWeight: 600, marginBottom: '16px' }}>
                  Host: Prophet Jay Uriel
                </div>
                <div className="announce-meta">
                  <div className="announce-meta-item">
                    <span className="announce-meta-label">Platform</span>
                    <span className="announce-meta-val">Google Meet</span>
                  </div>
                  <div className="meta-sep" />
                  <div className="announce-meta-item">
                    <span className="announce-meta-label">Time</span>
                    <span className="announce-meta-val gold">8:00 PM</span>
                  </div>
                  <div className="meta-sep" />
                  <div className="announce-meta-item">
                    <span className="announce-meta-label">Location</span>
                    <span className="announce-meta-val">El Roi Chambers</span>
                  </div>
                </div>
                <motion.a
                  href="https://wa.me/27649842408?text=I'm%20joining%20the%20Word%20of%20Life%20%26%20The%20Prophetic%20session%20tonight!"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ display: 'block', textAlign: 'center', marginTop: '22px', fontSize: '.68rem', padding: '14px 32px' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={SPRING}
                >
                  Join via WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
            <div className="announce-col-header">
              <div className="announce-col-icon">&#10022;</div>
              <div>
                <div className="sec-lbl" style={{ margin: 0, fontSize: '.75rem' }}>Lives Changed</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.3rem,3vw,1.65rem)', color: 'var(--white)', margin: 0 }}>
                  Testimonials
                </h3>
              </div>
            </div>
            {[
              { i: 'Y', name: 'Yolande Mokgosi',     loc: 'Gauteng',    text: '"Since joining the UIC, my prayer life has changed and the teachings and mentorship under the man of God has enlightened my understanding and I now understand my authority in Christ better."' },
              { i: 'M', name: 'Moyahabo Machethe',   loc: 'Mokopane',   text: '"Ever since I joined United in Christ my life completely changed for the better — I walked away from sin, I\'m blessed with twins, and I\'m at peace. Glory be to God!"' },
              { i: 'K', name: 'Koketso',             loc: 'Gauteng',    text: '"The group has opened my eyes to a lot of hidden knowledge about the kingdom. Principles that are the most effective for spiritual growth."' },
              { i: 'L', name: 'Lala Immaculate N.',  loc: 'Phalaborwa', text: '"My faith has grown and my spiritual life transformed from theoretical Christianity to practical, lived-out faith."' },
              { i: 'V', name: 'Vukona Nukeri',       loc: 'Polokwane',  text: '"I thank God for this fellowship — having a leader passionate about Christ has helped me stay in check with my identity in Him!"' },
            ].map((t, idx) => (
              <motion.div className="testimonial-card" key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ ...SPRING, delay: idx * 0.08 }}
                whileHover={{ borderColor: 'rgba(74,172,220,.45)', y: -4 }}
              >
                <div className="testimonial-quote-mark">&ldquo;</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.i}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">{t.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      {/* FIX: Each video card is now a LazyVideoCard that only mounts its iframe when scrolled into view */}
      <section id="sermons">
        <motion.div className="sec-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-lbl">Anointed Messages</div>
          <h2 className="sec-title">Sermons &amp; <span>Preachings</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto' }} />
        </motion.div>
        <div className="videos-container">
          <div className="videos-grid">
            {videos.map((v, idx) => (
              <LazyVideoCard key={v.id} video={v} index={idx} />
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(32px,5vw,60px)' }}>
          <motion.a href="https://www.youtube.com/@jayuriel" target="_blank" rel="noopener noreferrer"
            className="btn-gold" style={{ fontSize: '.75rem', padding: '16px 42px' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(74,172,220,.4)' }}
            whileTap={{ scale: 0.97 }} transition={SPRING}>
            View All Sermons &amp; Shorts on YouTube &#8594;
          </motion.a>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <DocumentsSection />

      {/* ── PRAYER ── */}
      <PrayerSection />

      {/* ── CONNECT ── */}
      <section id="connect">
        <motion.div className="sec-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-lbl">Stay Connected</div>
          <h2 className="sec-title">Follow &amp; <span>Connect</span></h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
            style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '20px auto' }} />
        </motion.div>
        <div className="social-grid">
          {[
            {
              href: 'https://www.facebook.com/josiasuriel28', name: 'Facebook', desc: '@josiasuriel28', delay: 0.05,
              svg: <svg viewBox="0 0 24 24" width="42" height="42" fill="#1877F2"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" /></svg>,
            },
            {
              href: 'https://youtube.com/@UJaymusic?si=NVlrgSRfXU7l_x1v', name: 'YouTube Music', desc: '@UJaymusic', delay: 0.15,
              svg: <svg viewBox="0 0 24 24" width="42" height="42" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>,
            },
            {
              href: 'https://youtube.com/@jayuriel?si=xzvvfhL49ksk0J77', name: 'YouTube Ministry', desc: '@jayuriel', delay: 0.25,
              svg: <svg viewBox="0 0 24 24" width="42" height="42" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>,
            },
            {
              href: 'http://tiktok.com/@jayuriel28?_t=8o1cEvqxSz7&_r=1', name: 'TikTok', desc: '@jayuriel28', delay: 0.35,
              svg: <svg viewBox="0 0 24 24" width="42" height="42" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" /></svg>,
            },
            {
              href: 'https://wa.me/27649842408', name: 'WhatsApp', desc: '0649842408', delay: 0.45,
              svg: <svg viewBox="0 0 24 24" width="42" height="42" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>,
            },
          ].map(s => (
            <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="soc-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ ...SPRING, delay: s.delay }}
              whileHover={{ y: -7, borderColor: 'var(--gold)', boxShadow: '0 18px 44px rgba(0,0,0,.4)' }}
            >
              <div className="soc-logo">{s.svg}</div>
              <div className="soc-name">{s.name}</div>
              <div className="soc-desc">{s.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── JOIN ── */}
      <motion.div className="join-sec"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-lbl">Be Part of the Family</div>
        <h2 className="sec-title" style={{ maxWidth: '560px', margin: '0 auto 16px' }}>
          Join Us <span>This Saturday</span>
        </h2>
        <motion.div initial={{ width: 0 }} whileInView={{ width: 55 }} transition={{ duration: 0.8 }}
          style={{ height: 2, background: 'linear-gradient(to right, var(--gold), transparent)', margin: '16px auto 24px' }} />
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 'clamp(.95rem,1.8vw,1.1rem)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>
          Come as you are. Leave transformed. Every Saturday, we gather to encounter the living God.
        </p>
        <motion.a href="#prayer" className="btn-gold"
          whileHover={{ scale: 1.06, boxShadow: '0 0 28px rgba(74,172,220,.45)' }}
          whileTap={{ scale: 0.97 }} transition={SPRING}>
          Connect With Us
        </motion.a>
      </motion.div>

      {/* ── FOOTER ── */}
      <footer>
        <VerseOfTheDay />
        <div className="footer-inner">
          <div>
            <div style={{ fontFamily: "'Cinzel',serif", color: 'var(--gold)', fontSize: 'clamp(.75rem,1.5vw,.85rem)', letterSpacing: '.12em', marginBottom: '8px' }}>
              United in Christ
            </div>
            <div style={{ fontSize: 'clamp(.7rem,1.2vw,.8rem)', color: 'var(--text-muted)' }}>
              Prophet Jay Uriel Ministry
            </div>
          </div>
          <div style={{ fontSize: 'clamp(.7rem,1.2vw,.78rem)', color: 'var(--text-muted)' }}>
            &copy; 2024 United in Christ. All rights reserved.
          </div>
        </div>

        <div className="built-by">
          <div className="built-by-beam" />
          <div className="built-by-inner">
            <span className="built-by-cross">&#10013;</span>
            <span className="built-by-text">Built with love by</span>
            <span className="built-by-name">Bonny Sithole</span>
            <span className="built-by-cross" style={{ animationDelay: '.8s' }}>&#10013;</span>
          </div>
        </div>
      </footer>
    </>
  );
}
