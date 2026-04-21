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
  "Healing & Health","Guidance & Direction","Thanksgiving & Praise",
  "Financial Breakthrough","Relationships & Family","Spiritual Growth",
  "Salvation for Loved Ones","Protection & Safety","Career & Purpose","Other",
];

const PRAYER_WALL_ENTRIES = [
  { initials: "SM", name: "S.M",      category: "Healing & Health",       text: "Praying for complete healing and restoration in my body. God is faithful.",                        time: "2h ago" },
  { initials: "TN", name: "T.N",      category: "Financial Breakthrough",  text: "Believing God for a financial miracle this season. His provision never fails.",                    time: "5h ago" },
  { initials: "AN", name: "Anonymous",category: "Guidance & Direction",    text: "Standing at a crossroads. Trusting the Lord to order my steps clearly.",                          time: "1d ago" },
  { initials: "LD", name: "L.D",      category: "Salvation for Loved Ones",text: "Interceding for my family to come to know the Lord. He is able to save!",                        time: "2d ago" },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
function getDailyVideoIndex(listLength: number): number {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return ((year * 1000) + dayOfYear) % listLength;
}

function getDailyScriptureIndex(listLength: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return dayOfYear % listLength;
}

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const chr = seed.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
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

function sendAnonEmail(details: { category: string; subject: string; message: string; addToWall: boolean; }) {
  const lines = [
    '🔒 ANONYMOUS PRAYER REQUEST — United in Christ', '',
    `Submitted: ${new Date().toLocaleString('en-ZA')}`,
    `Category: ${details.category || 'General'}`,
    details.subject ? `Subject: ${details.subject}` : null, '',
    'Prayer Request:', details.message, '',
    details.addToWall ? '✓ Consented to Prayer Wall display' : '✗ Private — do not display on Prayer Wall', '',
    '— Sent automatically from the United in Christ website',
  ].filter((l): l is string => l !== null).join('\n');

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = `mailto:jayuriel28@gmail.com`
    + `?subject=${encodeURIComponent('🔒 Anonymous Prayer Request — United in Christ')}`
    + `&body=${encodeURIComponent(lines)}`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 800);
}

// ─────────────────────────────────────────────
// SPRING CONFIGS
// ─────────────────────────────────────────────
const SPRING      = { type: 'spring' as const, stiffness: 280, damping: 22 };
const SPRING_SOFT = { type: 'spring' as const, stiffness: 200, damping: 26 };
const fadeUp    = { hidden: { opacity:0, y:36   }, visible: { opacity:1, y:0,  transition: SPRING } };
const fadeLeft  = { hidden: { opacity:0, x:-44  }, visible: { opacity:1, x:0,  transition: SPRING } };
const fadeRight = { hidden: { opacity:0, x:44   }, visible: { opacity:1, x:0,  transition: SPRING } };
const scaleIn   = { hidden: { opacity:0, scale:0.88 }, visible: { opacity:1, scale:1, transition: SPRING } };

// ─────────────────────────────────────────────
// LAZY VIDEO CARD
// ─────────────────────────────────────────────
function LazyVideoCard({ video, index }: { video:{id:string;title:string;url:string}; index:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { rootMargin:'200px' });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} className="video-card"
      initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ ...SPRING, delay: Math.min(index*0.04, 0.4) }}
      whileHover={{ y:-6, boxShadow:'0 20px 48px rgba(0,0,0,.5)' }}
    >
      <div className="video-wrapper">
        {isVisible
          ? <iframe src={`https://www.youtube.com/embed/${video.id}`} allowFullScreen loading="lazy" title={video.title} />
          : <div style={{ position:'absolute',inset:0,background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'var(--radius)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(74,172,220,0.3)"><path d="M8 5v14l11-7z"/></svg>
            </div>
        }
      </div>
      <div className="video-info">
        <div className="video-title">{video.title}</div>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-link">Watch on YouTube →</a>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// WAVE RIPPLE
// ─────────────────────────────────────────────
function WaveRipple({ color, onComplete }: { color:string; onComplete:()=>void }) {
  return (
    <motion.div style={{ position:'fixed',inset:0,zIndex:99998,pointerEvents:'none',display:'flex',alignItems:'flex-end',justifyContent:'flex-end',padding:'clamp(14px,4vw,28px)' }}>
      <motion.div initial={{ scale:0,opacity:0.85 }} animate={{ scale:90,opacity:0 }}
        transition={{ duration:1.4,ease:[0.16,1,0.3,1] }} onAnimationComplete={onComplete}
        style={{ width:54,height:54,borderRadius:'50%',background:color,originX:'50%',originY:'50%' }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCRIPTURES SECTION
// ─────────────────────────────────────────────
function ScripturesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i+1) % SCRIPTURES.length), 8000);
    return () => clearInterval(t);
  }, []);
  const s = SCRIPTURES[activeIdx];
  return (
    <section id="scriptures" className="scriptures-section">
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
        <div className="sec-eyebrow">Living Word</div>
        <h2 className="sec-title">Scripture of the <span>Day</span></h2>
        <div className="title-rule" />
      </motion.div>
      <div className="scripture-stage">
        <AnimatePresence mode="wait">
          <motion.div key={activeIdx} className="scripture-card"
            initial={{ opacity:0, y:30, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-24, scale:0.97 }} transition={SPRING_SOFT}
          >
            <div className="scripture-open-quote">&ldquo;</div>
            <p className="scripture-text">{s.verse}</p>
            <div className="scripture-ref">— {s.ref}</div>
          </motion.div>
        </AnimatePresence>
        <div className="scripture-dots">
          {SCRIPTURES.map((_,i) => (
            <motion.button key={i} className={`scripture-dot${i===activeIdx?' active':''}`}
              onClick={() => setActiveIdx(i)} whileHover={{ scale:1.4 }} whileTap={{ scale:0.8 }} transition={SPRING} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PDF MODAL
// ─────────────────────────────────────────────
function PdfModal({ doc, onClose }: { doc:{name:string;viewUrl:string}|null; onClose:()=>void }) {
  useEffect(() => {
    if (doc) document.body.style.overflow='hidden'; else document.body.style.overflow='';
    return () => { document.body.style.overflow=''; };
  }, [doc]);
  useEffect(() => {
    const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};
    document.addEventListener('keydown',fn); return ()=>document.removeEventListener('keydown',fn);
  }, [onClose]);
  const shareDoc=()=>{ if(!doc)return; window.open(`https://wa.me/?text=${encodeURIComponent(`✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`)}`,'_blank'); };
  return (
    <AnimatePresence>
      {doc && (
        <motion.div className="pdf-modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }} onClick={(e)=>{if(e.target===e.currentTarget)onClose();}}>
          <motion.div className="pdf-modal-box" initial={{ opacity:0,scale:0.93,y:24 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.93,y:24 }} transition={SPRING_SOFT}>
            <div className="pdf-modal-header">
              <div className="pdf-modal-title">{doc.name}</div>
              <motion.button className="pdf-modal-close" onClick={onClose} whileHover={{ rotate:90,scale:1.1 }} transition={SPRING}>✕</motion.button>
            </div>
            <div className="pdf-modal-body">
              <iframe src={getEmbedUrl(doc.viewUrl)} title={doc.name} allowFullScreen style={{ width:'100%',height:'100%',border:'none',minHeight:'520px' }} />
            </div>
            <div className="pdf-modal-footer">
              <motion.button className="pdf-btn pdf-btn-drive" onClick={()=>window.open(doc.viewUrl,'_blank')} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} transition={SPRING}>Open in Drive</motion.button>
              <motion.button className="pdf-btn pdf-btn-dl" onClick={()=>window.open(getDownloadUrl(doc.viewUrl),'_blank')} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} transition={SPRING}>Download PDF</motion.button>
              <motion.button className="pdf-btn pdf-btn-wa" onClick={shareDoc} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} transition={SPRING}>Share on WhatsApp</motion.button>
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
  const [openDoc, setOpenDoc] = useState<typeof DOCUMENTS[0]|null>(null);
  const filtered = DOCUMENTS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const shareDoc=(doc:typeof DOCUMENTS[0])=>window.open(`https://wa.me/?text=${encodeURIComponent(`✦ Teaching Note from Prophet Jay Uriel\n\n✧ ${doc.name}\n\n↓ View Online: ${doc.viewUrl}`)}`,'_blank');
  return (
    <section id="documents">
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
        <div className="sec-eyebrow">Written Revelation</div>
        <h2 className="sec-title">Teaching <span>Notes</span></h2>
        <div className="title-rule" />
        <p className="sec-desc">Study materials from Prophet Jay Uriel. View online or download to study at your pace.</p>
        <div className="doc-search-wrap">
          <span className="doc-search-icon">⌕</span>
          <input className="doc-search-input" type="text" placeholder="Search teaching notes…" value={search} onChange={e=>setSearch(e.target.value)} />
          {search && <button className="doc-search-clear" onClick={()=>setSearch('')}>✕</button>}
        </div>
        {search && <p className="doc-search-count">{filtered.length===0?'No notes found':`${filtered.length} of ${DOCUMENTS.length} notes`}</p>}
      </motion.div>
      <div className="docs-grid">
        {filtered.length===0
          ? <div className="doc-empty">No teaching notes match &ldquo;{search}&rdquo;</div>
          : filtered.map((doc,i) => {
            const origIdx = DOCUMENTS.indexOf(doc);
            return (
              <motion.div className="doc-card-glass" key={doc.name}
                initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true,margin:'-30px' }}
                transition={{ ...SPRING,delay:i*0.055 }}
                whileHover={{ y:-4, boxShadow:'0 16px 40px rgba(0,0,0,.4)' }}
              >
                <div className="doc-glass-num">{String(origIdx+1).padStart(2,'0')}</div>
                {doc.isNew && <div className="doc-glass-new">NEW</div>}
                <div className="doc-glass-icon">📄</div>
                <div className="doc-glass-title">{doc.name}</div>
                <div className="doc-glass-actions">
                  <motion.button className="doc-glass-btn doc-glass-view" onClick={()=>setOpenDoc(doc)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} transition={SPRING}>👁 View</motion.button>
                  <motion.button className="doc-glass-btn doc-glass-wa" onClick={()=>shareDoc(doc)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} transition={SPRING}>↑ Share</motion.button>
                </div>
              </motion.div>
            );
          })
        }
      </div>
      <PdfModal doc={openDoc} onClose={()=>setOpenDoc(null)} />
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
        <span className="prayer-wall-icon">☩</span>
        <div>
          <div className="sec-eyebrow" style={{ margin:0,fontSize:'.68rem' }}>Community Intercession</div>
          <h3 className="prayer-wall-title">Prayer Wall</h3>
        </div>
      </div>
      <p className="prayer-wall-sub">Join hands in prayer with fellow believers. Submit your request above and opt in to be added here.</p>
      <div className="prayer-wall-grid">
        {PRAYER_WALL_ENTRIES.map((entry,i)=>(
          <motion.div key={i} className="prayer-wall-card"
            initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true }} transition={{ ...SPRING,delay:i*0.08 }}
          >
            <div className="pw-card-top">
              <div className="pw-avatar">{entry.initials}</div>
              <div className="pw-info"><div className="pw-name">{entry.name}</div><div className="pw-category">{entry.category}</div></div>
              <div className="pw-time">{entry.time}</div>
            </div>
            <div className="pw-divider" />
            <p className="pw-text">{entry.text}</p>
            <div className="pw-pray-btn-wrap">
              <motion.button className="pw-pray-btn" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} transition={SPRING}
                onClick={(e)=>{ const btn=e.currentTarget as HTMLButtonElement; if(!btn.disabled){btn.textContent='✧ Praying…';btn.disabled=true;setTimeout(()=>{btn.textContent='✓ Prayed';},1400);} }}
              >✦ Pray for this</motion.button>
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
  const [isAnon,    setIsAnon]    = useState(false);
  const [expanded,  setExpanded]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [addToWall, setAddToWall] = useState(false);
  const [category,  setCategory]  = useState('');

  const handlePrayer = () => {
    const nameVal    = isAnon ? 'Anonymous' : ((document.getElementById('pName') as HTMLInputElement)?.value.trim()||'');
    const subjectVal = (document.getElementById('pSubject') as HTMLInputElement)?.value.trim()||'';
    const msgVal     = (document.getElementById('pMessage') as HTMLTextAreaElement)?.value.trim()||'';
    if (!isAnon && !nameVal) { alert('Please fill in your name or enable the anonymous option.'); return; }
    if (!msgVal) { alert('Please share your prayer request.'); return; }
    const cat = category || 'General';
    if (isAnon) {
      sendAnonEmail({ category: cat, subject: subjectVal, message: msgVal, addToWall });
      const wallNote = addToWall ? '\n\n✓ Consented to Prayer Wall display' : '';
      const waText   = `🔒 Anonymous Prayer Request — United in Christ\n\nCategory: ${cat}${subjectVal?`\nSubject: ${subjectVal}`:''}\n\nPrayer Request:\n${msgVal}${wallNote}`;
      window.open(`https://wa.me/27649842408?text=${encodeURIComponent(waText)}`,'_blank');
    } else {
      const wallNote = addToWall ? '\n\n✓ Approved to display on Prayer Wall (first name only)' : '';
      const text     = `✧ Prayer Request — United in Christ\n\nName: ${nameVal}\n${subjectVal?`Subject: ${subjectVal}\n`:''}Category: ${cat}\n\nPrayer Request:\n${msgVal}${wallNote}`;
      window.open(`https://wa.me/27649842408?text=${encodeURIComponent(text)}`,'_blank');
    }
    setSubmitted(true);
    setTimeout(()=>{
      setSubmitted(false); setIsAnon(false); setExpanded(false); setAddToWall(false); setCategory('');
      ['pName','pSubject','pMessage'].forEach(id=>{ const el=document.getElementById(id) as HTMLInputElement; if(el)el.value=''; });
    }, 6000);
  };

  return (
    <section id="prayer">
      <div className="prayer-wrap">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div className="sec-eyebrow">Come Before God</div>
          <h2 className="sec-title">Submit a <span>Prayer Request</span></h2>
          <div className="title-rule" />
          <div className="prayer-scripture">
            <em>&ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo; — Philippians 4:6</em>
          </div>
          <p className="sec-desc">We stand in agreement with you. Share your request and our team will pray for you.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="confirmation" className="prayer-confirmation"
              initial={{ opacity:0,scale:0.92,y:20 }} animate={{ opacity:1,scale:1,y:0 }}
              exit={{ opacity:0,scale:0.92 }} transition={SPRING_SOFT}
            >
              <div className="prayer-conf-icon">☩</div>
              <h3 className="prayer-conf-title">Your request has been received</h3>
              <p className="prayer-conf-text">
                Our team is praying with you. The Lord hears every cry of the heart.<br />
                <em style={{ color:'var(--accent)',fontSize:'.9em' }}>&ldquo;The effectual fervent prayer of a righteous man availeth much.&rdquo; — James 5:16</em>
              </p>
              {addToWall && <p className="prayer-conf-wall">✓ Your request will be added to the Prayer Wall</p>}
            </motion.div>
          ) : (
            <motion.div key="form" className="prayer-form" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
              <div className="prayer-anon-row">
                <span className="prayer-anon-lock">🔒</span>
                <label className="prayer-anon-label" htmlFor="anonToggle">
                  <strong>Submit anonymously</strong>
                  <span className="prayer-anon-note">Your identity will be kept completely private</span>
                </label>
                <button id="anonToggle" className={`prayer-toggle${isAnon?' active':''}`} onClick={()=>setIsAnon(!isAnon)} type="button" aria-pressed={isAnon}>
                  <span className="prayer-toggle-knob" />
                </button>
              </div>

              <AnimatePresence>
                {!isAnon && (
                  <motion.div className="form-field-wrap" initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }} exit={{ opacity:0,height:0 }} transition={{ duration:0.3 }}>
                    <input className="form-input" type="text" placeholder="Your Name *" id="pName" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-field-wrap">
                <select className="form-input form-select" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option value="">Select request category…</option>
                  {PRAYER_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-field-wrap">
                <input className="form-input" type="text" placeholder="Subject (optional)" id="pSubject" />
              </div>

              <textarea className="form-textarea" rows={5} placeholder="Share your prayer request here…" id="pMessage" />

              <motion.button className="prayer-expand-btn" onClick={()=>setExpanded(!expanded)} whileHover={{ color:'var(--accent)' }}>
                {expanded ? '▲ Less options' : '▾ More options (Prayer Wall, notifications)'}
              </motion.button>

              <AnimatePresence>
                {expanded && (
                  <motion.div className="prayer-expanded" initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }} exit={{ opacity:0,height:0 }} transition={{ duration:0.35 }}>
                    <div className="prayer-checkbox-row">
                      <input type="checkbox" id="wallConsent" className="prayer-checkbox" checked={addToWall} onChange={e=>setAddToWall(e.target.checked)} />
                      <label htmlFor="wallConsent" className="prayer-checkbox-label">
                        <strong>Add to Prayer Wall</strong>
                        <span> — Display my request publicly so others can join in prayer</span>
                      </label>
                    </div>
                    <div className="prayer-checkbox-row">
                      <input type="checkbox" id="notifyMe" className="prayer-checkbox" />
                      <label htmlFor="notifyMe" className="prayer-checkbox-label">
                        <strong>Prayer updates</strong>
                        <span> — Notify me via WhatsApp when someone prays for my request</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="prayer-privacy">
                <span style={{ fontSize:'14px',flexShrink:0 }}>🔒</span>
                Your information is strictly confidential and will never be shared outside our prayer team.
              </div>

              <motion.button className="form-submit" onClick={handlePrayer}
                whileHover={{ scale:1.02,boxShadow:'0 10px 26px rgba(74,172,220,.3)' }} whileTap={{ scale:0.98 }} transition={SPRING}>
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
// VERSE OF THE DAY (Footer)
// ─────────────────────────────────────────────
function VerseOfTheDay() {
  const idx = getDailyScriptureIndex(SCRIPTURES.length);
  const s   = SCRIPTURES[idx];
  return (
    <motion.div className="verse-of-day" initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={SPRING_SOFT}>
      <div className="vod-label">✦ Verse of the Day ✦</div>
      <p className="vod-text">&ldquo;{s.verse}&rdquo;</p>
      <div className="vod-ref">— {s.ref}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Home() {
  const [isDark,     setIsDark]     = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ripple,     setRipple]     = useState<{color:string}|null>(null);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);

  const [vodIndex,     setVodIndex]     = useState(0);
  const [vodDateLong,  setVodDateLong]  = useState('');
  const [vodDateShort, setVodDateShort] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setVodIndex(getDailyVideoIndex(VIDEOS.length));
      setVodDateLong(now.toLocaleDateString('en-ZA', { weekday:'long',day:'numeric',month:'long',year:'numeric' }));
      setVodDateShort(now.toLocaleDateString('en-ZA', { weekday:'short',month:'short',day:'numeric' }));
    };
    update();
    const scheduleNextMidnight = (): ReturnType<typeof setTimeout> => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const msToMidnight = tomorrow.getTime() - now.getTime();
      return setTimeout(() => { update(); scheduleNextMidnight(); }, msToMidnight);
    };
    const timer = scheduleNextMidnight();
    return () => clearTimeout(timer);
  }, []);

  const videoOfTheDay = VIDEOS[vodIndex];
  const dailySeed = new Date().toDateString();
  const videos    = seededShuffle(VIDEOS, dailySeed);

  useEffect(() => { document.documentElement.setAttribute('data-theme', isDark?'dark':'light'); }, [isDark]);
  const handleThemeToggle = () => setRipple({ color: isDark?'#F0F4F8':'#060F18' });
  const onRippleComplete  = useCallback(() => { setIsDark(d=>!d); setRipple(null); }, []);

  useEffect(() => { document.body.style.overflow = isMenuOpen?'hidden':''; }, [isMenuOpen]);
  useEffect(() => {
    const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setIsMenuOpen(false);};
    document.addEventListener('keydown',fn); return ()=>document.removeEventListener('keydown',fn);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    let W=0,H=0,animId=0;
    type Star={x:number;y:number;r:number;a:number;da:number;vx:number;vy:number};
    let stars:Star[]=[];
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    const initStars=()=>{
      stars=[];
      for(let i=0;i<80;i++){
        stars.push({
          x:seededRandom(`sx${i}`)*W, y:seededRandom(`sy${i}`)*H,
          r:seededRandom(`sr${i}`)*1.3+0.2, a:seededRandom(`sa${i}`),
          da:(0.002+seededRandom(`sda${i}`)*0.005)*(i%2===0?1:-1),
          vx:(seededRandom(`svx${i}`)-0.5)*0.12, vy:(seededRandom(`svy${i}`)-0.5)*0.12,
        });
      }
    };
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      stars.forEach(s=>{
        s.a+=s.da; if(s.a<=0||s.a>=1)s.da*=-1;
        s.x+=s.vx; s.y+=s.vy;
        if(s.x<0)s.x=W; if(s.x>W)s.x=0; if(s.y<0)s.y=H; if(s.y>H)s.y=0;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(74,172,220,${s.a*0.45})`; ctx.fill();
      });
      animId=requestAnimationFrame(draw);
    };
    const onResize=()=>{resize();initStars();};
    window.addEventListener('resize',onResize);
    resize(); initStars(); draw();
    return ()=>{window.removeEventListener('resize',onResize);cancelAnimationFrame(animId);};
  },[]);

  const { scrollY }  = useScroll();
  const navBg        = useTransform(scrollY,[0,60],['rgba(6,15,24,0)','rgba(6,15,24,0.96)']);
  const navPaddingY  = useTransform(scrollY,[0,80],[20,12]);
  const springNavPy  = useSpring(navPaddingY,{stiffness:80,damping:20});

  const navItems=[
    {href:'#about',label:'About'},
    {href:'#saturday',label:'Teachings'},
    {href:'#sermons',label:'Sermons'},
    {href:'#documents',label:'Notes'},
    {href:'#prayer',label:'Prayer'},
    {href:'#connect',label:'Connect'},
  ];

  return (
    <>
      <canvas ref={canvasRef} id="particles" style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }} />

      <AnimatePresence>
        {ripple && <WaveRipple key="ripple" color={ripple.color} onComplete={onRippleComplete} />}
      </AnimatePresence>

      {/* ── THEME TOGGLE ── */}
      <motion.button className="theme-toggle" title="Toggle light/dark"
        onClick={handleThemeToggle} whileHover={{ scale:1.12 }} whileTap={{ scale:0.9 }}
        transition={SPRING} initial={{ opacity:0,scale:0 }} animate={{ opacity:1,scale:1 }}
      >{isDark?'☾':'☀'}</motion.button>

      {/* ── NAV — Elevation-style: clean, glassy, search-centered ── */}
      <motion.nav id="navbar"
        style={{ paddingTop:springNavPy, paddingBottom:springNavPy, background:navBg }}
        initial={{ y:-80,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ ...SPRING,delay:0.1 }}
      >
        {/* Logo */}
        <a href="#" className="nav-logo">
          <div className="nav-logo-img">
            <img src="/photos/united-in-christ-logo.png" alt="United in Christ" />
          </div>
          <div>
            <div className="nav-logo-text">United in Christ</div>
            <div className="nav-logo-sub">Prophet Jay Uriel</div>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {navItems.map(item=>(
            <li key={item.href}>
              <motion.a href={item.href} className="nav-link-item"
                whileHover={{ color:'var(--accent)' }} transition={{ duration:0.18 }}
              >{item.label}</motion.a>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="nav-right">
          <motion.a href="#prayer" className="nav-cta-btn"
            whileHover={{ scale:1.04, boxShadow:'0 0 20px rgba(74,172,220,.4)' }}
            whileTap={{ scale:0.97 }} transition={SPRING}
          >Prayer Request</motion.a>
          <motion.button className={`nav-hamburger${isMenuOpen?' open':''}`} aria-label="Open menu" onClick={()=>setIsMenuOpen(!isMenuOpen)} whileTap={{ scale:0.9 }}>
            <span /><span /><span />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul className="nav-mobile-menu open" initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'spring',stiffness:300,damping:30 }}>
            {navItems.map((item,i)=>(
              <motion.li key={item.href} initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:40 }} transition={{ ...SPRING,delay:i*0.06 }}>
                <a href={item.href} onClick={()=>setIsMenuOpen(false)}>{item.label}</a>
              </motion.li>
            ))}
            <motion.li initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:40 }} transition={{ ...SPRING,delay:navItems.length*0.06 }}>
              <a href="#prayer" className="nav-cta-btn" style={{ display:'block',textAlign:'center',marginTop:'12px' }} onClick={()=>setIsMenuOpen(false)}>Prayer Request</a>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ── HERO — Full-bleed image with overlaid text + dual CTAs ── */}
      <section className="hero">
        {/* Background image */}
        <div className="hero-bg-img" />
        {/* Gradient overlay */}
        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING,delay:0.4 }}>
            Ministry of the Word
          </motion.div>

          <motion.h1 className="hero-title" initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING,delay:0.55 }}>
            United in <span>Christ</span>
          </motion.h1>

          <motion.p className="hero-tagline" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING,delay:0.75 }}>
            Proclaiming the Word of God with power, truth, and the spirit of prophecy
          </motion.p>

          <motion.div className="hero-cta-row" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ ...SPRING,delay:0.95 }}>
            <motion.a href="#sermons" className="btn-primary"
              whileHover={{ scale:1.04, boxShadow:'0 0 28px rgba(255,255,255,.25)' }}
              whileTap={{ scale:0.97 }} transition={SPRING}
            >Watch Sermons</motion.a>
            <motion.a href="#prayer" className="btn-ghost"
              whileHover={{ scale:1.04, borderColor:'rgba(255,255,255,.8)' }}
              whileTap={{ scale:0.97 }} transition={SPRING}
            >Submit Prayer</motion.a>
          </motion.div>

          {/* Bottom info bar — replaces cluttered stat cards */}
          <motion.div className="hero-info-bar" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.15 }}>
            <div className="hero-info-item">
              <span className="info-label">Every Saturday</span>
              <span className="info-val">8:00 PM — El Roi Chambers</span>
            </div>
            <div className="info-sep" />
            <div className="hero-info-item">
              <span className="info-label">40+ Sermons</span>
              <span className="info-val">Free to Watch & Share</span>
            </div>
            <div className="info-sep" />
            <div className="hero-info-item">
              <span className="info-label">11 Teaching Notes</span>
              <span className="info-val">Download & Study</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="hero-scroll" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
          <motion.div className="scroll-dot" animate={{ y:[0,8,0] }} transition={{ duration:1.4,repeat:Infinity,ease:'easeInOut' }} />
        </motion.div>
      </section>

      {/* ── VIDEO OF THE DAY ── */}
      <motion.section id="video-of-day" initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={fadeUp}>
        <div className="sec-center" style={{ marginBottom:'clamp(22px,3.8vw,44px)' }}>
          <div className="sec-eyebrow">Featured Today</div>
          <h2 className="sec-title">Video of the <span>Day</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">{vodDateLong ? `Today's message • ${vodDateLong}` : "Today's featured message"}</p>
        </div>
        <motion.div className="votd-card"
          whileHover={{ scale:1.008,boxShadow:'0 28px 64px rgba(0,0,0,.55)' }}
          transition={SPRING_SOFT}
        >
          {vodDateShort && <div className="votd-badge">◆ {vodDateShort}</div>}
          <div className="video-wrapper">
            <iframe src={`https://www.youtube.com/embed/${videoOfTheDay.id}`} allowFullScreen loading="lazy" title={videoOfTheDay.title} />
          </div>
          <div className="votd-info">
            <div className="video-title">{videoOfTheDay.title}</div>
            <a href={videoOfTheDay.url} target="_blank" rel="noopener noreferrer" className="video-link">Watch on YouTube →</a>
          </div>
        </motion.div>
      </motion.section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-grid">
          <motion.div className="about-img-wrap" initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={fadeLeft}>
            <div className="about-img-border" />
            <img className="about-img" src="/photos/jay-uriel.jpeg" alt="Prophet Jay Uriel"
              onError={(e)=>{const t=e.target as HTMLImageElement;t.src='/photos/jay-uriel.png';t.onerror=null;}} />
            <div className="about-img-ring" />
          </motion.div>
          <motion.div className="about-text-col" initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={fadeRight}>
            <div className="sec-eyebrow">Our Leader & Founder</div>
            <h2 className="sec-title" style={{ fontSize:'clamp(1.7rem,4.5vw,2.8rem)' }}>Prophet <span>Jay Uriel</span></h2>
            <div className="title-rule" style={{ margin:'18px 0 28px' }} />
            <p className="about-body">
              Prophet Jay Uriel is a consecrated vessel called by God — a bold prophetic voice raised for this generation. With deep revelation, anointed teaching, and the genuine gift of prophecy, he ministers the fullness of Christ with power, clarity, and compassion.
            </p>
            <ul className="about-points">
              <li><span className="about-bullet">✦</span> Prophetic voice to this generation</li>
              <li><span className="about-bullet">✦</span> Deep biblical revelation and teaching</li>
              <li><span className="about-bullet">✦</span> Saturday gatherings at El Roi Chambers</li>
              <li><span className="about-bullet">✦</span> Online ministry reaching Southern Africa</li>
            </ul>
            <div className="about-quote">&ldquo;The Spirit of the Lord is upon me to proclaim liberty, healing, and the knowledge of Christ.&rdquo;</div>
            <motion.a href="#saturday" className="btn-primary" style={{ display:'inline-block',marginTop:'32px' }}
              whileHover={{ scale:1.04,boxShadow:'0 0 24px rgba(74,172,220,.4)' }} whileTap={{ scale:0.97 }} transition={SPRING}
            >Join Us This Saturday</motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── SATURDAY ── */}
      <section id="saturday">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div className="sec-eyebrow">Every Saturday</div>
          <h2 className="sec-title">Saturday <span>Teachings</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">Join us every Saturday for powerful anointed teachings with Prophet Jay Uriel. Come expecting an encounter with God.</p>
        </motion.div>
        <motion.div className="sat-img-wrap" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={scaleIn} whileHover={{ scale:1.006 }} transition={SPRING_SOFT}>
          <img src="/photos/IMG_4616.jpg" alt="Saturday Teachings" loading="lazy" />
          <div className="sat-overlay" />
          <div className="sat-info">
            <div className="sat-info-block">
              <div className="sat-info-label">Day</div>
              <div className="sat-info-val">Every Saturday</div>
            </div>
            <div className="sat-divider" />
            <div className="sat-info-block">
              <div className="sat-info-label">Time</div>
              <div className="sat-info-val">8:00 PM</div>
            </div>
            <div className="sat-divider" />
            <div className="sat-info-block">
              <div className="sat-info-label">Venue</div>
              <div className="sat-info-val">El Roi Chambers</div>
            </div>
            <motion.a href="#prayer" className="btn-primary" style={{ whiteSpace:'nowrap' }}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} transition={SPRING}
            >I Want to Attend</motion.a>
          </div>
          <div className="sat-badge">United in Christ</div>
        </motion.div>
      </section>

      <ScripturesSection />

      {/* ── ANNOUNCEMENTS ── */}
      <section id="announcements">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div className="sec-eyebrow">Church Family</div>
          <h2 className="sec-title">Announcements &amp; <span>Testimonials</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="announce-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeLeft}>
            <div className="announce-col-header">
              <div className="announce-col-icon">◆</div>
              <div>
                <div className="sec-eyebrow" style={{ margin:0,fontSize:'.7rem' }}>Special Broadcast</div>
                <h3 className="announce-col-title">Word of Life & The Prophetic</h3>
              </div>
            </div>
            <div className="announce-box">
              <img className="announce-img" src="/announcements/image.jpg" alt="Word of Life and The Prophetic" loading="lazy" />
              <div className="announce-box-body">
                <div className="announce-coming">Coming Soon</div>
                <div className="announce-host">Host: Prophet Jay Uriel</div>
                <div className="announce-meta">
                  <div className="announce-meta-item"><span className="announce-meta-label">Platform</span><span className="announce-meta-val">Google Meet</span></div>
                  <div className="meta-sep" />
                  <div className="announce-meta-item"><span className="announce-meta-label">Time</span><span className="announce-meta-val accent">8:00 PM</span></div>
                  <div className="meta-sep" />
                  <div className="announce-meta-item"><span className="announce-meta-label">Location</span><span className="announce-meta-val">El Roi Chambers</span></div>
                </div>
                <motion.a href="https://wa.me/27649842408?text=I'm%20joining%20the%20Word%20of%20Life%20%26%20The%20Prophetic%20session%20tonight!" target="_blank" rel="noopener noreferrer"
                  className="btn-primary" style={{ display:'block',textAlign:'center',marginTop:'22px',fontSize:'.75rem' }}
                  whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} transition={SPRING}
                >Join via WhatsApp</motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeRight}>
            <div className="announce-col-header">
              <div className="announce-col-icon">✦</div>
              <div>
                <div className="sec-eyebrow" style={{ margin:0,fontSize:'.7rem' }}>Lives Changed</div>
                <h3 className="announce-col-title">Testimonials</h3>
              </div>
            </div>
            {[
              {i:'Y',name:'Yolande Mokgosi',   loc:'Gauteng',   text:'Since joining the UIC, my prayer life has changed and the teachings and mentorship under the man of God has enlightened my understanding and I now understand my authority in Christ better.'},
              {i:'M',name:'Moyahabo Machethe', loc:'Mokopane',  text:"Ever since I joined United in Christ my life completely changed for the better — I walked away from sin, I'm blessed with twins, and I'm at peace. Glory be to God!"},
              {i:'K',name:'Koketso',           loc:'Gauteng',   text:'The group has opened my eyes to a lot of hidden knowledge about the kingdom. Principles that are the most effective for spiritual growth.'},
              {i:'L',name:'Lala Immaculate N.',loc:'Phalaborwa',text:'My faith has grown and my spiritual life transformed from theoretical Christianity to practical, lived-out faith.'},
              {i:'V',name:'Vukona Nukeri',     loc:'Polokwane', text:'I thank God for this fellowship — having a leader passionate about Christ has helped me stay in check with my identity in Him!'},
            ].map((t,idx)=>(
              <motion.div className="testimonial-card" key={t.name}
                initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
                transition={{ ...SPRING,delay:idx*0.08 }}
                whileHover={{ borderColor:'rgba(74,172,220,.4)',y:-3,boxShadow:'0 12px 32px rgba(0,0,0,.35)' }}
              >
                <div className="testimonial-quote-mark">&ldquo;</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.i}</div>
                  <div><div className="testimonial-name">{t.name}</div><div className="testimonial-loc">{t.loc}</div></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERMONS ── */}
      <section id="sermons">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div className="sec-eyebrow">Anointed Messages</div>
          <h2 className="sec-title">Sermons &amp; <span>Preachings</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="videos-container">
          <div className="videos-grid">
            {videos.map((v,idx)=><LazyVideoCard key={v.id} video={v} index={idx} />)}
          </div>
        </div>
        <div style={{ textAlign:'center',marginTop:'clamp(28px,4.5vw,56px)' }}>
          <motion.a href="https://www.youtube.com/@jayuriel" target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ fontSize:'.8rem' }}
            whileHover={{ scale:1.04,boxShadow:'0 0 24px rgba(74,172,220,.4)' }} whileTap={{ scale:0.97 }} transition={SPRING}
          >View All Sermons on YouTube →</motion.a>
        </div>
      </section>

      <DocumentsSection />
      <PrayerSection />

      {/* ── CONNECT ── */}
      <section id="connect">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
          <div className="sec-eyebrow">Stay Connected</div>
          <h2 className="sec-title">Follow &amp; <span>Connect</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="social-grid">
          {[
            {href:'https://www.facebook.com/josiasuriel28',name:'Facebook',desc:'@josiasuriel28',delay:0.05,svg:<svg viewBox="0 0 24 24" width="40" height="40" fill="#1877F2"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>},
            {href:'https://youtube.com/@UJaymusic?si=NVlrgSRfXU7l_x1v',name:'YouTube Music',desc:'@UJaymusic',delay:0.15,svg:<svg viewBox="0 0 24 24" width="40" height="40" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>},
            {href:'https://youtube.com/@jayuriel?si=xzvvfhL49ksk0J77',name:'YouTube Ministry',desc:'@jayuriel',delay:0.25,svg:<svg viewBox="0 0 24 24" width="40" height="40" fill="#FF0000"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>},
            {href:'http://tiktok.com/@jayuriel28?_t=8o1cEvqxSz7&_r=1',name:'TikTok',desc:'@jayuriel28',delay:0.35,svg:<svg viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>},
            {href:'https://wa.me/27649842408',name:'WhatsApp',desc:'0649842408',delay:0.45,svg:<svg viewBox="0 0 24 24" width="40" height="40" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>},
          ].map(s=>(
            <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="soc-card"
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              transition={{ ...SPRING,delay:s.delay }}
              whileHover={{ y:-6, borderColor:'var(--accent)', boxShadow:'0 16px 40px rgba(0,0,0,.4)' }}
            >
              <div className="soc-logo">{s.svg}</div>
              <div className="soc-name">{s.name}</div>
              <div className="soc-desc">{s.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── JOIN ── */}
      <motion.div className="join-sec" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}>
        <div className="sec-eyebrow">Be Part of the Family</div>
        <h2 className="sec-title" style={{ maxWidth:'540px',margin:'0 auto 14px' }}>Join Us <span>This Saturday</span></h2>
        <div className="title-rule" style={{ margin:'16px auto 24px' }} />
        <p style={{ color:'var(--text-muted)',fontSize:'clamp(.9rem,1.7vw,1.1rem)',maxWidth:'480px',margin:'0 auto 32px',lineHeight:'1.75',fontStyle:'italic' }}>
          Come as you are. Leave transformed. Every Saturday, we gather to encounter the living God.
        </p>
        <motion.a href="#prayer" className="btn-primary"
          whileHover={{ scale:1.05,boxShadow:'0 0 28px rgba(74,172,220,.45)' }}
          whileTap={{ scale:0.97 }} transition={SPRING}
        >Connect With Us</motion.a>
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
          <div className="built-by-inner">
            <span className="built-by-cross">✝</span>
            <span className="built-by-text">Built with love by</span>
            <span className="built-by-name">Bonny Sithole</span>
            <span className="built-by-cross">✝</span>
          </div>
        </div>
      </footer>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        /* ── FAVICON ──────────────────────────────── */
        /* Set in <head> via next/head or layout.tsx:  */
        /* <link rel="icon" href="/photos/united-in-christ-logo.png" /> */

        /* ── CSS VARIABLES ────────────────────────── */
        :root {
          --radius: 14px;
          --container: 1200px;
          --section-py: clamp(64px, 9vw, 110px);
          --gap: clamp(16px, 2.5vw, 28px);
        }

        [data-theme='dark'] {
          --bg:           #060F18;
          --surface:      #0C1A27;
          --surface2:     #111F2E;
          --border:       rgba(74,172,220,0.12);
          --accent:       #4AACDC;
          --accent-dim:   rgba(74,172,220,0.18);
          --gold:         #4AACDC;
          --white:        #F0F6FB;
          --white2:       #C8DCE8;
          --text-muted:   #7A9CB4;
          --nav-bg:       rgba(6,15,24,0.95);
          --input-bg:     rgba(255,255,255,0.04);
          --input-border: rgba(74,172,220,0.18);
        }

        [data-theme='light'] {
          --bg:           #F0F4F8;
          --surface:      #FFFFFF;
          --surface2:     #EBF2F7;
          --border:       rgba(74,172,220,0.2);
          --accent:       #1A7FB5;
          --accent-dim:   rgba(26,127,181,0.1);
          --gold:         #1A7FB5;
          --white:        #111820;
          --white2:       #2A3A48;
          --text-muted:   #5A7A90;
          --nav-bg:       rgba(240,244,248,0.96);
          --input-bg:     rgba(0,0,0,0.04);
          --input-border: rgba(26,127,181,0.2);
        }

        /* ── RESET ────────────────────────────────── */
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body {
          background: var(--bg);
          color: var(--white);
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          transition: background .4s, color .4s;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@600;700&family=Cormorant+Garamond:ital,wght@1,400;0,600&display=swap');

        /* ── SECTIONS ─────────────────────────────── */
        section, .join-sec {
          position: relative;
          z-index: 1;
          padding: var(--section-py) clamp(16px, 5vw, 48px);
          max-width: calc(var(--container) + 96px);
          margin: 0 auto;
        }
        section + section { border-top: 1px solid var(--border); }

        /* ── TYPOGRAPHY HELPERS ───────────────────── */
        .sec-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.68rem, 1.1vw, .78rem);
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }
        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: var(--white);
          line-height: 1.15;
        }
        .sec-title span { color: var(--accent); }
        .sec-desc {
          color: var(--white2);
          font-size: clamp(.9rem, 1.4vw, 1.05rem);
          line-height: 1.8;
          max-width: 620px;
          margin: 12px auto 0;
        }
        .sec-center { text-align: center; }
        .title-rule {
          width: 52px;
          height: 2px;
          background: linear-gradient(to right, var(--accent), transparent);
          margin: 18px auto 0;
        }

        /* ── NAV ──────────────────────────────────── */
        #navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 28px);
          padding-left: clamp(16px, 3vw, 40px);
          padding-right: clamp(16px, 3vw, 40px);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(74,172,220,0.07);
          transition: border-color .3s;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid var(--border);
          flex-shrink: 0;
        }
        .nav-logo-img img { width:100%; height:100%; object-fit:cover; }
        .nav-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(.8rem, 1.4vw, 1rem);
          font-weight: 700;
          color: var(--white);
          line-height: 1.2;
        }
        .nav-logo-sub {
          font-size: clamp(.6rem, 1vw, .72rem);
          color: var(--accent);
          letter-spacing: .06em;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: clamp(4px, 1.5vw, 24px);
          flex: 1;
          justify-content: center;
        }
        .nav-link-item {
          text-decoration: none;
          font-size: clamp(.78rem, 1.1vw, .92rem);
          font-weight: 500;
          color: var(--white2);
          letter-spacing: .03em;
          padding: 6px 10px;
          border-radius: 8px;
          transition: color .18s, background .18s;
        }
        .nav-link-item:hover { background: var(--accent-dim); }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          padding: 9px 20px;
          border-radius: 40px;
          background: var(--accent);
          color: #fff;
          font-size: clamp(.72rem, 1vw, .82rem);
          font-weight: 600;
          letter-spacing: .04em;
          text-decoration: none;
          transition: background .2s, box-shadow .2s;
          white-space: nowrap;
        }
        .nav-cta-btn:hover { background: #5bbfe8; }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 26px; height: 18px;
          background: none; border: none;
          cursor: pointer; padding: 0;
        }
        .nav-hamburger span {
          display: block;
          height: 2px;
          background: var(--white);
          border-radius: 2px;
          transition: all .3s;
        }
        .nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,6px); }
        .nav-hamburger.open span:nth-child(2) { opacity:0; }
        .nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-6px); }

        .nav-mobile-menu {
          position: fixed;
          top: 0; right: 0;
          width: min(300px, 88vw);
          height: 100vh;
          background: var(--surface);
          z-index: 999;
          list-style: none;
          padding: 80px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: -8px 0 40px rgba(0,0,0,.5);
        }
        .nav-mobile-menu a {
          display: block;
          padding: 14px 0;
          color: var(--white2);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          border-bottom: 1px solid var(--border);
          transition: color .2s;
        }
        .nav-mobile-menu a:hover { color: var(--accent); }

        @media (max-width: 860px) {
          .nav-links { display: none; }
          .nav-cta-btn { display: none; }
          .nav-hamburger { display: flex; }
        }

        /* ── THEME TOGGLE ─────────────────────────── */
        .theme-toggle {
          position: fixed;
          bottom: clamp(14px, 3vw, 24px);
          right: clamp(14px, 3vw, 24px);
          z-index: 1001;
          width: 46px; height: 46px;
          border-radius: 50%;
          background: var(--surface2);
          border: 1.5px solid var(--border);
          color: var(--white);
          font-size: 1.1rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,.3);
        }

        /* ── HERO ─────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0;
          max-width: 100%;
        }

        .hero-bg-img {
          position: absolute;
          inset: 0;
          background: url('/photos/IMG_4616.jpg') center/cover no-repeat;
          transform: scale(1.04);
          filter: saturate(.7) brightness(.55);
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(6,15,24,0.45) 0%,
            rgba(6,15,24,0.35) 40%,
            rgba(6,15,24,0.75) 80%,
            rgba(6,15,24,1) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 140px clamp(20px,6vw,60px) clamp(80px,12vw,130px);
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-eyebrow {
          display: inline-block;
          font-size: clamp(.68rem,1.1vw,.8rem);
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 18px;
          padding: 6px 16px;
          border: 1px solid rgba(74,172,220,0.25);
          border-radius: 40px;
          background: rgba(74,172,220,0.06);
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -.01em;
          margin-bottom: clamp(16px, 2.5vw, 24px);
        }
        .hero-title span { color: var(--accent); }

        .hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 2vw, 1.35rem);
          color: rgba(255,255,255,0.82);
          line-height: 1.6;
          max-width: 580px;
          margin: 0 auto clamp(28px, 4vw, 44px);
        }

        .hero-cta-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: clamp(40px, 7vw, 70px);
        }

        .hero-info-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 3vw, 32px);
          flex-wrap: wrap;
          padding: clamp(14px, 2.5vw, 20px) clamp(18px, 4vw, 40px);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius);
          max-width: 680px;
          margin: 0 auto;
        }
        .hero-info-item { text-align: center; }
        .info-label {
          display: block;
          font-size: clamp(.68rem,1vw,.76rem);
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 3px;
        }
        .info-val {
          display: block;
          font-size: clamp(.82rem, 1.2vw, .92rem);
          color: rgba(255,255,255,0.82);
        }
        .info-sep {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
        }

        .hero-scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 26px;
          height: 40px;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 13px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6px;
        }
        .scroll-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
        }

        @media (max-width: 560px) {
          .info-sep { display: none; }
          .hero-info-bar { gap: 12px; }
          .hero-info-item { width: 45%; }
        }

        /* ── BUTTONS ──────────────────────────────── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px,1.8vw,16px) clamp(24px,3.5vw,44px);
          border-radius: 40px;
          background: var(--accent);
          color: #fff;
          font-size: clamp(.82rem, 1.2vw, .95rem);
          font-weight: 600;
          letter-spacing: .04em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background .2s, transform .15s, box-shadow .2s;
        }
        .btn-primary:hover { background: #5bbfe8; }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px,1.8vw,16px) clamp(24px,3.5vw,44px);
          border-radius: 40px;
          background: transparent;
          color: #fff;
          font-size: clamp(.82rem, 1.2vw, .95rem);
          font-weight: 600;
          letter-spacing: .04em;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.4);
          cursor: pointer;
          transition: border-color .2s, background .2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.08); }

        /* ── VIDEO OF THE DAY ─────────────────────── */
        #video-of-day {
          padding-top: var(--section-py);
          padding-bottom: var(--section-py);
        }

        .votd-card {
          max-width: var(--container);
          margin: 0 auto;
          background: var(--surface);
          border-radius: calc(var(--radius)*1.5);
          border: 1px solid var(--border);
          overflow: hidden;
          position: relative;
          transition: box-shadow .3s;
        }
        .votd-badge {
          position: absolute;
          top: 16px; left: 16px;
          z-index: 2;
          background: var(--accent);
          color: #fff;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .1em;
          padding: 5px 14px;
          border-radius: 40px;
        }
        .video-wrapper {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
        }
        .video-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .votd-info {
          padding: clamp(16px, 2.5vw, 28px) clamp(20px, 3vw, 36px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* ── VIDEO CARDS ──────────────────────────── */
        .videos-container { max-width: calc(var(--container) + 32px); margin: 0 auto; }
        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(260px, 28vw, 340px), 1fr));
          gap: var(--gap);
          padding: 0 clamp(4px, 1vw, 16px);
        }
        .video-card {
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: box-shadow .25s, transform .25s, border-color .25s;
        }
        .video-card:hover { border-color: var(--accent); }
        .video-info {
          padding: clamp(12px, 1.8vw, 18px) clamp(14px, 2vw, 20px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .video-title {
          font-size: clamp(.82rem, 1.2vw, .9rem);
          font-weight: 600;
          color: var(--white);
        }
        .video-link {
          font-size: .75rem;
          color: var(--accent);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity .2s;
        }
        .video-link:hover { opacity: .75; }

        /* ── ABOUT ────────────────────────────────── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: center;
          max-width: var(--container);
          margin: 0 auto;
        }
        @media (max-width:768px) { .about-grid { grid-template-columns:1fr; } }

        .about-img-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
        }
        .about-img {
          width: 100%;
          height: clamp(340px, 50vw, 560px);
          object-fit: cover;
          object-position: top;
          display: block;
          border-radius: var(--radius);
        }
        .about-img-border {
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          pointer-events: none;
          z-index: 1;
        }
        .about-img-ring {
          position: absolute;
          inset: -4px;
          border-radius: calc(var(--radius) + 4px);
          border: 1.5px solid rgba(74,172,220,0.12);
          pointer-events: none;
        }

        .about-text-col { }
        .about-body {
          font-size: clamp(.92rem, 1.4vw, 1.05rem);
          line-height: 1.85;
          color: var(--white2);
          margin-bottom: 24px;
        }
        .about-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
          font-size: clamp(.88rem, 1.3vw, 1rem);
          color: var(--white2);
          line-height: 1.6;
        }
        .about-points li { display: flex; align-items: center; gap: 10px; }
        .about-bullet { color: var(--accent); font-size: .7rem; flex-shrink:0; }
        .about-quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1rem, 1.7vw, 1.2rem);
          color: var(--white2);
          border-left: 3px solid var(--accent);
          padding: 12px 18px;
          background: var(--accent-dim);
          border-radius: 0 var(--radius) var(--radius) 0;
          line-height: 1.6;
          margin-top: 8px;
        }

        /* ── SATURDAY ─────────────────────────────── */
        .sat-img-wrap {
          position: relative;
          border-radius: calc(var(--radius)*1.5);
          overflow: hidden;
          max-width: var(--container);
          margin: 0 auto;
          cursor: pointer;
        }
        .sat-img-wrap img {
          width: 100%;
          height: clamp(280px, 45vw, 520px);
          object-fit: cover;
          display: block;
          filter: brightness(.6) saturate(.8);
          transition: filter .4s, transform .4s;
        }
        .sat-img-wrap:hover img { filter: brightness(.7) saturate(.9); }
        .sat-overlay {
          position: absolute; inset:0;
          background: linear-gradient(to top, rgba(6,15,24,.85) 0%, transparent 55%);
        }
        .sat-info {
          position: absolute;
          bottom: clamp(16px,3vw,36px);
          left: clamp(16px,3vw,40px);
          right: clamp(16px,3vw,40px);
          display: flex;
          align-items: center;
          gap: clamp(12px, 2.5vw, 32px);
          flex-wrap: wrap;
        }
        .sat-info-block { }
        .sat-info-label {
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 3px;
        }
        .sat-info-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(.95rem, 1.8vw, 1.3rem);
          color: #fff;
          font-weight: 600;
        }
        .sat-divider { width:1px; height:36px; background:rgba(255,255,255,.18); }
        .sat-badge {
          position: absolute;
          top: 18px; right: 18px;
          background: rgba(74,172,220,0.18);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(74,172,220,0.3);
          color: var(--accent);
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 40px;
        }

        /* ── SCRIPTURES ───────────────────────────── */
        .scriptures-section {
          position: relative;
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .scripture-stage {
          max-width: 780px;
          margin: clamp(32px,5vw,56px) auto 0;
        }
        .scripture-card {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: calc(var(--radius)*1.5);
          padding: clamp(28px, 4vw, 52px) clamp(24px, 4vw, 56px);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .scripture-open-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: .6;
          color: var(--accent);
          opacity: .2;
          margin-bottom: 8px;
        }
        .scripture-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.55rem);
          font-style: italic;
          line-height: 1.7;
          color: var(--white);
          margin-bottom: 20px;
        }
        .scripture-ref {
          font-size: clamp(.8rem, 1.2vw, .92rem);
          font-weight: 600;
          letter-spacing: .1em;
          color: var(--accent);
          text-transform: uppercase;
        }
        .scripture-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 24px;
        }
        .scripture-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background .25s;
        }
        .scripture-dot.active { background: var(--accent); }

        /* ── DOCUMENTS ────────────────────────────── */
        .doc-search-wrap {
          position: relative;
          max-width: 440px;
          margin: 28px auto 0;
        }
        .doc-search-icon {
          position: absolute;
          left: 16px;
          top: 50%; transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1.1rem;
          pointer-events: none;
        }
        .doc-search-input {
          width: 100%;
          padding: 13px 44px 13px 42px;
          background: var(--input-bg);
          border: 1.5px solid var(--input-border);
          border-radius: 40px;
          color: var(--white);
          font-size: .92rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .doc-search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
        .doc-search-input::placeholder { color: var(--text-muted); }
        .doc-search-clear {
          position: absolute;
          right: 14px;
          top: 50%; transform: translateY(-50%);
          background: none; border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: .9rem;
          transition: color .2s;
        }
        .doc-search-clear:hover { color: var(--white); }
        .doc-search-count { text-align:center; margin-top:10px; font-size:.82rem; color:var(--text-muted); }
        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(240px, 26vw, 310px), 1fr));
          gap: var(--gap);
          margin-top: clamp(28px, 4vw, 48px);
          max-width: var(--container);
          margin-left: auto;
          margin-right: auto;
        }
        .doc-card-glass {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: clamp(20px,2.5vw,28px);
          position: relative;
          transition: box-shadow .25s, border-color .25s;
        }
        .doc-card-glass:hover { border-color: var(--accent); }
        .doc-glass-num {
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .12em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .doc-glass-new {
          position: absolute;
          top: 14px; right: 14px;
          background: var(--accent);
          color: #fff;
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .12em;
          padding: 3px 9px;
          border-radius: 40px;
        }
        .doc-glass-icon { font-size: 1.6rem; margin-bottom: 10px; }
        .doc-glass-title {
          font-size: clamp(.88rem, 1.3vw, 1rem);
          font-weight: 600;
          color: var(--white);
          line-height: 1.4;
          margin-bottom: 18px;
        }
        .doc-glass-actions { display: flex; gap: 8px; }
        .doc-glass-btn {
          flex: 1;
          padding: 9px 0;
          border-radius: 8px;
          font-size: .78rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: opacity .2s, transform .15s;
        }
        .doc-glass-btn:hover { opacity:.85; }
        .doc-glass-view {
          background: var(--accent);
          color: #fff;
        }
        .doc-glass-wa {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--white);
        }
        .doc-empty { color: var(--text-muted); text-align: center; padding: 32px; grid-column: 1/-1; }

        /* ── PDF MODAL ────────────────────────────── */
        .pdf-modal-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,.75);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .pdf-modal-box {
          background: var(--surface);
          border-radius: calc(var(--radius)*1.5);
          border: 1px solid var(--border);
          width: 100%; max-width: 860px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .pdf-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border);
          gap: 12px;
        }
        .pdf-modal-title { font-size: clamp(.9rem, 1.4vw, 1.05rem); font-weight: 600; color: var(--white); }
        .pdf-modal-close {
          background: var(--surface2); border: 1px solid var(--border); color: var(--white);
          width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: .85rem;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .pdf-modal-close:hover { background: var(--accent); }
        .pdf-modal-body { flex: 1; overflow: hidden; }
        .pdf-modal-footer {
          display: flex; gap: 10px; flex-wrap: wrap;
          padding: 14px 18px;
          border-top: 1px solid var(--border);
        }
        .pdf-btn {
          flex: 1; min-width: 120px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: .78rem; font-weight: 600;
          cursor: pointer; border: none;
          transition: opacity .2s;
        }
        .pdf-btn:hover { opacity: .82; }
        .pdf-btn-drive { background: var(--surface2); border: 1px solid var(--border); color: var(--white); }
        .pdf-btn-dl    { background: var(--accent); color: #fff; }
        .pdf-btn-wa    { background: #25D366; color: #fff; }

        /* ── PRAYER SECTION ───────────────────────── */
        .prayer-wrap { max-width: 720px; margin: 0 auto; }
        .prayer-scripture {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(.95rem, 1.5vw, 1.1rem);
          color: var(--white2);
          line-height: 1.7;
          padding: 18px 22px;
          border-left: 3px solid var(--accent);
          background: var(--accent-dim);
          border-radius: 0 var(--radius) var(--radius) 0;
          margin: 20px 0 0;
          text-align: left;
        }
        .prayer-form {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: calc(var(--radius)*1.5);
          padding: clamp(24px, 4vw, 44px);
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .prayer-anon-row {
          display: flex; align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: var(--radius);
        }
        .prayer-anon-lock { font-size: 1.1rem; flex-shrink:0; margin-top:2px; }
        .prayer-anon-label { flex:1; cursor:pointer; }
        .prayer-anon-label strong { display:block; color:var(--white); font-size:.9rem; margin-bottom:3px; }
        .prayer-anon-note { font-size:.78rem; color:var(--text-muted); }
        .prayer-toggle {
          width: 44px; height: 24px;
          border-radius: 12px;
          background: var(--surface2);
          border: 1.5px solid var(--border);
          cursor: pointer;
          position: relative;
          transition: background .25s, border-color .25s;
          flex-shrink: 0;
        }
        .prayer-toggle.active { background: var(--accent); border-color: var(--accent); }
        .prayer-toggle-knob {
          position: absolute;
          top: 2px; left: 2px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform .25s;
        }
        .prayer-toggle.active .prayer-toggle-knob { transform: translateX(20px); }

        .form-field-wrap { display: flex; flex-direction: column; }
        .form-input {
          padding: 13px 16px;
          background: var(--input-bg);
          border: 1.5px solid var(--input-border);
          border-radius: var(--radius);
          color: var(--white);
          font-size: .92rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          font-family: inherit;
          width: 100%;
        }
        .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
        .form-input::placeholder { color: var(--text-muted); }
        .form-select { cursor: pointer; }
        option { background: var(--surface2); }
        .form-textarea {
          width: 100%;
          padding: 13px 16px;
          background: var(--input-bg);
          border: 1.5px solid var(--input-border);
          border-radius: var(--radius);
          color: var(--white);
          font-size: .92rem;
          outline: none;
          resize: vertical;
          font-family: inherit;
          line-height: 1.6;
          transition: border-color .2s, box-shadow .2s;
        }
        .form-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
        .form-textarea::placeholder { color: var(--text-muted); }

        .prayer-expand-btn {
          background: none; border: none;
          color: var(--text-muted);
          font-size: .82rem;
          cursor: pointer;
          text-align: left;
          padding: 0;
          transition: color .2s;
          font-family: inherit;
        }
        .prayer-expanded { overflow: hidden; display: flex; flex-direction: column; gap: 10px; }
        .prayer-checkbox-row { display: flex; align-items: flex-start; gap: 10px; }
        .prayer-checkbox { width:16px; height:16px; accent-color:var(--accent); cursor:pointer; flex-shrink:0; margin-top:2px; }
        .prayer-checkbox-label { font-size:.85rem; color:var(--white2); line-height:1.5; cursor:pointer; }
        .prayer-checkbox-label strong { color:var(--white); }
        .prayer-privacy {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: .78rem;
          color: var(--text-muted);
          line-height: 1.5;
          padding: 12px 16px;
          background: var(--input-bg);
          border-radius: 8px;
          border: 1px solid var(--input-border);
        }
        .form-submit {
          padding: 15px 32px;
          border-radius: 40px;
          background: var(--accent);
          color: #fff;
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .05em;
          border: none;
          cursor: pointer;
          transition: background .2s, box-shadow .2s;
          font-family: inherit;
        }
        .form-submit:hover { background: #5bbfe8; }

        .prayer-confirmation {
          background: var(--surface);
          border: 1px solid var(--accent);
          border-radius: calc(var(--radius)*1.5);
          padding: clamp(28px,4vw,52px);
          text-align: center;
          margin-top: 36px;
        }
        .prayer-conf-icon { font-size: 2.5rem; margin-bottom: 16px; }
        .prayer-conf-title { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2.5vw,1.6rem); color:var(--white); margin-bottom:12px; }
        .prayer-conf-text { color:var(--white2); line-height:1.7; font-size:.95rem; }
        .prayer-conf-wall { color:var(--accent); font-size:.82rem; margin-top:12px; font-weight:600; }

        /* ── PRAYER WALL ──────────────────────────── */
        .prayer-wall-section { margin-top: clamp(36px,5vw,64px); }
        .prayer-wall-header {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 10px;
        }
        .prayer-wall-icon { font-size: 1.8rem; color: var(--accent); }
        .prayer-wall-title { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2.5vw,1.5rem); color:var(--white); }
        .prayer-wall-sub { font-size:.88rem; color:var(--text-muted); line-height:1.6; margin-bottom:24px; }
        .prayer-wall-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 290px), 1fr));
          gap: var(--gap);
        }
        .prayer-wall-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
        }
        .pw-card-top { display:flex; align-items:flex-start; gap:12px; margin-bottom:14px; }
        .pw-avatar {
          width:38px; height:38px; border-radius:50%;
          background:var(--accent-dim); border:1.5px solid var(--accent);
          color:var(--accent); font-weight:700; font-size:.8rem;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
        }
        .pw-info { flex:1; }
        .pw-name { font-weight:600; font-size:.85rem; color:var(--white); }
        .pw-category { font-size:.72rem; color:var(--text-muted); margin-top:2px; }
        .pw-time { font-size:.7rem; color:var(--text-muted); white-space:nowrap; flex-shrink:0; }
        .pw-divider { height:1px; background:var(--border); margin:0 0 12px; }
        .pw-text { font-size:.85rem; color:var(--white2); line-height:1.65; margin-bottom:14px; }
        .pw-pray-btn-wrap { display:flex; }
        .pw-pray-btn {
          padding: 8px 18px;
          border-radius: 40px;
          background: var(--accent-dim);
          border: 1px solid var(--accent);
          color: var(--accent);
          font-size: .78rem;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s;
          font-family: inherit;
        }
        .pw-pray-btn:hover { background: var(--accent); color: #fff; }

        /* ── ANNOUNCEMENTS ────────────────────────── */
        .announce-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          max-width: var(--container);
          margin: 0 auto;
        }
        @media (max-width:768px) { .announce-grid { grid-template-columns:1fr; } }

        .announce-col-header {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 24px;
        }
        .announce-col-icon {
          width: 40px; height: 40px;
          background: var(--accent-dim);
          border: 1px solid var(--accent);
          color: var(--accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem;
          flex-shrink: 0;
        }
        .announce-col-title {
          font-family: 'Playfair Display',serif;
          font-size: clamp(1.1rem,2.2vw,1.5rem);
          color: var(--white);
          margin: 0;
        }
        .announce-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .announce-img { width:100%; height:200px; object-fit:cover; display:block; }
        .announce-box-body { padding: clamp(16px,2.5vw,24px); }
        .announce-coming { font-size:.7rem; font-weight:700; letter-spacing:.14em; color:var(--accent); text-transform:uppercase; margin-bottom:6px; }
        .announce-host { font-size:clamp(.92rem,1.4vw,1.05rem); font-weight:600; color:var(--white); margin-bottom:16px; }
        .announce-meta { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .announce-meta-item { }
        .announce-meta-label { display:block; font-size:.64rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:2px; }
        .announce-meta-val { font-size:.82rem; font-weight:600; color:var(--white2); }
        .announce-meta-val.accent { color:var(--accent); }
        .meta-sep { width:1px; height:28px; background:var(--border); }

        .testimonial-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: clamp(18px,2.5vw,26px);
          margin-bottom: 14px;
          position: relative;
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .testimonial-quote-mark {
          font-family: 'Playfair Display',serif;
          font-size: 3rem;
          line-height: .5;
          color: var(--accent);
          opacity: .2;
          margin-bottom: 8px;
        }
        .testimonial-text {
          font-style: italic;
          color: var(--white2);
          font-size: clamp(.84rem,1.2vw,.95rem);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .testimonial-author { display:flex; align-items:center; gap:10px; }
        .testimonial-avatar {
          width:36px; height:36px; border-radius:50%;
          background:var(--accent-dim); border:1.5px solid var(--accent);
          color:var(--accent); font-weight:700; font-size:.75rem;
          display:flex; align-items:center; justify-content:center;
        }
        .testimonial-name { font-weight:600; font-size:.85rem; color:var(--white); }
        .testimonial-loc { font-size:.72rem; color:var(--text-muted); }

        /* ── SOCIAL ───────────────────────────────── */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(160px,18vw,200px),1fr));
          gap: var(--gap);
          max-width: var(--container);
          margin: clamp(28px,4vw,48px) auto 0;
        }
        .soc-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: clamp(20px,2.5vw,28px) 16px;
          text-align: center;
          text-decoration: none;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .soc-logo { display:flex; align-items:center; justify-content:center; }
        .soc-name { font-weight:600; font-size:.88rem; color:var(--white); }
        .soc-desc { font-size:.76rem; color:var(--text-muted); }

        /* ── JOIN SECTION ─────────────────────────── */
        .join-sec {
          text-align: center;
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: var(--section-py) clamp(20px,5vw,48px);
        }

        /* ── FOOTER ───────────────────────────────── */
        footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 0;
        }
        .verse-of-day {
          text-align: center;
          padding: clamp(32px,5vw,56px) clamp(20px,5vw,60px);
          border-bottom: 1px solid var(--border);
          max-width: 680px;
          margin: 0 auto;
        }
        .vod-label {
          font-size: .7rem; font-weight:700; letter-spacing:.16em;
          text-transform: uppercase; color:var(--accent); margin-bottom:12px;
        }
        .vod-text {
          font-family: 'Cormorant Garamond',serif;
          font-style: italic;
          font-size: clamp(1rem,2vw,1.3rem);
          color: var(--white);
          line-height: 1.7;
          margin-bottom: 12px;
        }
        .vod-ref { font-size:.8rem; font-weight:600; color:var(--text-muted); letter-spacing:.06em; }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px clamp(20px,5vw,60px);
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer-brand {
          display: flex; align-items: center; gap: 12px;
        }
        .footer-logo { width:36px; height:36px; border-radius:50%; object-fit:cover; }
        .footer-brand-name { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:var(--white); }
        .footer-brand-sub { font-size:.72rem; color:var(--text-muted); }
        .footer-copy { font-size:.72rem; color:var(--text-muted); }

        .built-by {
          text-align: center;
          padding: 16px;
          border-top: 1px solid var(--border);
        }
        .built-by-inner {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .76rem;
        }
        .built-by-text { color:var(--text-muted); }
        .built-by-name { color:var(--accent); font-weight:600; }
        .built-by-cross { color:var(--accent); opacity:.4; font-size:.7rem; }

        /* ── PARTICLE CANVAS ──────────────────────── */
        #particles {
          position: fixed; inset:0; z-index:0; pointer-events:none;
        }

        /* ── RESPONSIVE ───────────────────────────── */
        @media (max-width:600px) {
          .sat-info { flex-direction:column; gap:8px; }
          .sat-divider { display:none; }
          .hero-info-bar { flex-direction:column; gap:12px; }
          .info-sep { display:none; }
          .pdf-modal-footer { flex-direction:column; }
          .hero-cta-row { flex-direction:column; align-items:center; }
        }
      `}</style>
    </>
  );
}
