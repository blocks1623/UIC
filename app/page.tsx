'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const VIDEOS = [
  {
    id: "0TS902WHcVc",
    title: "Voices",
    url: "https://youtu.be/0TS902WHcVc",
    summary: "Jay Uriel emphasizes the importance of holding onto the voice of God above all else. He explains that while the world is full of various voices and sounds, each carries a message that can impact our lives. He warns that many believers lack the discernment to distinguish the spirit behind these voices, which can lead to confusion and destruction. To be free from such confusion, one must shut out the world's voice and listen to the Holy Spirit within."
  },
  {
    id: "36V_GmO3050",
    title: "The Imagination",
    url: "https://youtu.be/36V_GmO3050",
    summary: "This video explores the imagination as the 'seat of perception' and the 'womb of creation.' Uriel teaches that sight equals possession—what you can see yourself becoming in God determines what you can possess. He stresses that creative power isn't just about hours of prayer but about having a soul in harmony with the Spirit, allowing the Spirit of God to 'hover' over one's life before speaking things into being."
  },
  {
    id: "MnnpCZcyYiI",
    title: "In Truth And In Spirit",
    url: "https://youtu.be/MnnpCZcyYiI",
    summary: "Uriel discusses the true nature of worship, defining it as heart-felt adoration rather than just singing songs. He explains that worshiping in truth means your heart and words are in perfect harmony. He also highlights the need to be 'emotionally invested' in God, noting that if we can feel deep emotions for movies or sports but not for God, our priorities may be misplaced."
  },
  {
    id: "yb0ykMTb_dE",
    title: "The Wilderness",
    url: "https://youtu.be/yb0ykMTb_dE",
    summary: "Drawing from Luke 4, Uriel explains that being in a 'dry place' or 'wilderness' doesn't mean God has forgotten you. Instead, the wilderness is where destinies are birthed and visions mature. Just as Jesus returned from the wilderness in the power of the Spirit, our difficult seasons are intended to refine us and build the strength necessary to sustain future greatness."
  },
  {
    id: "RvP9Mha5bTA",
    title: "Wisdom",
    url: "https://youtu.be/RvP9Mha5bTA",
    summary: "Uriel teaches that wisdom cannot be found in books or on earth—it is a person, specifically Jesus Christ. He explains that having Christ means having the wisdom of God, but accessing it requires a relationship. The practical steps to walking in wisdom are twofold: having a 'fear of the Lord' and choosing to 'depart from evil.'"
  },
  {
    id: "_AZxY5wJ7Pk",
    title: "What Is Faith? How to Grow in Faith?",
    url: "https://youtu.be/_AZxY5wJ7Pk",
    summary: "Defining faith as 'substance and evidence' (Hebrews 11:1), Uriel describes it as trusting God's character even when we can't see the full picture. He provides three ways to grow in faith: through the Word of God, through prayer, and through trials. He encourages viewers to start small, keep a journal of God's faithfulness, and surround themselves with a community of believers."
  },
  {
    id: "S-IFCaO4A4s",
    title: "Freedom In Jesus",
    url: "https://youtu.be/S-IFCaO4A4s",
    summary: "This message focuses on the idea that while some situations are impossible for men, they are possible with God (Matthew 19:26). Uriel explains that you cannot set yourself free if you are bound; you need Jesus, who is 'full of freedom.' True liberty is found only where the Spirit of the Lord is present."
  },
  {
    id: "y7glFO4EkNk",
    title: "The Kingdom of God Is Within You",
    url: "https://youtu.be/y7glFO4EkNk",
    summary: "Challenging the view that the Kingdom is strictly an afterlife destination, Uriel points to Luke 17 to show it is currently located within every believer. He teaches that seeking the Kingdom is an internal search for the ideas, revelations, and heavenly treasures God has already deposited inside of us."
  },
  {
    id: "LkaIPh6m6pc",
    title: "The Lordship Of Jesus",
    url: "https://youtu.be/LkaIPh6m6pc",
    summary: "Based on Romans 10:9, Uriel defines 'Lord' as a Master with absolute ownership rights. He explains that confessing Jesus as Lord is an agreement to submit one's will and authority to Him. True lordship is proven when a believer stops walking in their own ways and begins to do exactly what Jesus commands."
  },
  {
    id: "vwsWuBSVxbs",
    title: "The Kingdom Mindset",
    url: "https://youtu.be/vwsWuBSVxbs",
    summary: "Using Romans 12:2, Uriel discusses the 'renewing of the mind' as a requirement for transformation. He teaches that believers must intentionally permit the mind of Christ to dwell in them by replacing old, wrong information with the Word of God. Transformation happens from the inside out when one chooses to meditate on things that are pure, lovely, and of good report."
  },
  {
    id: "ezxL__tQr8A",
    title: "What's Next, Since You Received Christ?",
    url: "https://youtu.be/ezxL__tQr8A",
    summary: "For those new to the faith, Uriel outlines the process of sanctification—being set apart from the world into righteousness. He emphasizes the importance of prayer for conquering temptation and the Word for cleansing the mind. He recommends starting a spiritual journey by reading the Book of John to understand the image of Christ."
  },
  {
    id: "hEkVmrYH1qo",
    title: "State of Elevation",
    url: "https://youtu.be/hEkVmrYH1qo",
    summary: "Examining the Sermon on the Mount, Uriel explains why Jesus ascended a mountain to teach: it was a 'superior position' of authority. He applies this to life and business, suggesting that to be extraordinary, one must separate themselves from the 'multitude' and operate from a higher level of knowledge and understanding."
  },
  {
    id: "WVEzMYhRbGg",
    title: "True And Proper Worship",
    url: "https://youtu.be/WVEzMYhRbGg",
    summary: "Referencing Romans 12:1, Uriel teaches that 'true and proper worship' is the act of offering one's body as a living sacrifice. He defines worship as adoration proven by obedience to God's commandments. Singing is only true worship when it flows from a heart that has fully surrendered its life and plan to God."
  },
  {
    id: "kEj4c_ayeDY",
    title: "How To Access The Kingdom Of God",
    url: "https://youtu.be/kEj4c_ayeDY",
    summary: "Uriel explains that because of 'Free Will,' God does not force entry into His Kingdom. Access is a personal choice made by believing in and receiving Jesus Christ. He reminds viewers that while humans are inherently weak, God's strength is made perfect in that weakness when we rely on His grace."
  },
  {
    id: "n1gOAHFANn4",
    title: "By This Shall All Men Know...",
    url: "https://youtu.be/n1gOAHFANn4",
    summary: "Focused on John 13:34-35, Uriel argues that love is the primary mark of a disciple—more significant than preaching or the demonstration of power. He teaches that walking in love resembles the very nature of Christ and requires a mind transformed by the Word to manifest consistently."
  },
  { id: "cxNfd6Hv_mY", title: "Prophetic Short", url: "https://youtube.com/shorts/cxNfd6Hv_mY", summary: "" },
  { id: "53iDdjlSwNo", title: "Short", url: "https://youtube.com/shorts/53iDdjlSwNo", summary: "" },
  { id: "Xu4jocaFM0o", title: "Short", url: "https://youtube.com/shorts/Xu4jocaFM0o", summary: "" },
  { id: "XDoobxFlqzs", title: "Short", url: "https://youtube.com/shorts/XDoobxFlqzs", summary: "" },
  { id: "En2_4YOxrVw", title: "Short", url: "https://youtube.com/shorts/En2_4YOxrVw", summary: "" },
  { id: "WDrH3-Dtpto", title: "Short", url: "https://youtube.com/shorts/WDrH3-Dtpto", summary: "" },
  { id: "2EOVwlxiUwE", title: "Short", url: "https://youtube.com/shorts/2EOVwlxiUwE", summary: "" },
  { id: "pOIojhQPk18", title: "Short", url: "https://youtube.com/shorts/pOIojhQPk18", summary: "" },
  { id: "6IrDC-YlNEs", title: "Short", url: "https://youtube.com/shorts/6IrDC-YlNEs", summary: "" },
  { id: "vPBM6grfixs", title: "Short", url: "https://youtube.com/shorts/vPBM6grfixs", summary: "" },
  { id: "Wg-hVdQgc3E", title: "Short", url: "https://youtube.com/shorts/Wg-hVdQgc3E", summary: "" },
  { id: "cibFZGWUfd8", title: "Short", url: "https://youtube.com/shorts/cibFZGWUfd8", summary: "" },
  { id: "rfMnBltV3yI", title: "Short", url: "https://youtube.com/shorts/rfMnBltV3yI", summary: "" },
  { id: "DUuek5Gw-Vk", title: "Short", url: "https://youtube.com/shorts/DUuek5Gw-Vk", summary: "" },
  { id: "nk6PxjyQmZ8", title: "Short", url: "https://youtube.com/shorts/nk6PxjyQmZ8", summary: "" },
  { id: "90Kld0S63W8", title: "Short", url: "https://youtube.com/shorts/90Kld0S63W8", summary: "" },
  { id: "SlTpWuFmrCA", title: "Short", url: "https://youtube.com/shorts/SlTpWuFmrCA", summary: "" },
  { id: "lW0qJhO5ndU", title: "Short", url: "https://youtube.com/shorts/lW0qJhO5ndU", summary: "" },
  { id: "hkPPlXCecsE", title: "Short", url: "https://youtube.com/shorts/hkPPlXCecsE", summary: "" },
  { id: "c9pgcEJ2hio", title: "Short", url: "https://youtube.com/shorts/c9pgcEJ2hio", summary: "" },
  { id: "hQrsI7cl0GY", title: "Short", url: "https://youtube.com/shorts/hQrsI7cl0GY", summary: "" },
  { id: "yNykB7oRYGI", title: "Short", url: "https://youtube.com/shorts/yNykB7oRYGI", summary: "" },
  { id: "UfRlNhGwzzs", title: "Short", url: "https://youtube.com/shorts/UfRlNhGwzzs", summary: "" },
  { id: "ahqOtvzMmy0", title: "Short", url: "https://youtube.com/shorts/ahqOtvzMmy0", summary: "" },
  { id: "vLLWPQvj7Sg", title: "Short", url: "https://youtube.com/shorts/vLLWPQvj7Sg", summary: "" },
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

const SEVERE_KEYWORDS = [
  'suicid','hopeless','give up','can\'t go on','end my life','no reason to live',
  'severe','desperate','crisis','breaking','destroyed','fallen apart','unbearable',
  'dying inside','lost everything','rock bottom','alone','abandoned',
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
function detectSevere(text: string): boolean {
  const lower = text.toLowerCase();
  return SEVERE_KEYWORDS.some(kw => lower.includes(kw));
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

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { ...SPsoft, duration: 0.6 } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0,   transition: { ...SPsoft, duration: 0.6 } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0,  transition: { ...SPsoft, duration: 0.6 } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,    transition: SPsoft },
};

// ─────────────────────────────────────────────
// ELECTRIC RIPPLE — theme transition
// ─────────────────────────────────────────────
function ElectricRipple({ x, y, toLight, onComplete }: {
  x: number; y: number; toLight: boolean; onComplete: () => void;
}) {
  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 99998, pointerEvents: 'none',
        background: toLight ? '#F0F4F8' : '#0D0D0D',
        clipPath: `circle(0% at ${x}px ${y}px)`,
      }}
      animate={{ clipPath: `circle(200% at ${x}px ${y}px)` }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onComplete}
    />
  );
}

// ─────────────────────────────────────────────
// SUMMARY MODAL
// ─────────────────────────────────────────────
function SummaryModal({ video, onClose }: {
  video: typeof VIDEOS[0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = video ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [video]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  // Animate words one by one
  const [visibleWords, setVisibleWords] = useState(0);
  const words = video?.summary?.split(' ') ?? [];
  useEffect(() => {
    if (!video) { setVisibleWords(0); return; }
    setVisibleWords(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleWords(i);
      if (i >= words.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [video?.id]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="summary-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="summary-box"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={SPsoft}
          >
            {/* Header */}
            <div className="summary-header">
              <div className="summary-header-left">
                <div className="summary-eyebrow">Sermon Summary</div>
                <div className="summary-title">{video.title}</div>
              </div>
              <motion.button
                className="summary-close"
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={SP}
              >✕</motion.button>
            </div>

            {/* Thumbnail */}
            <div className="summary-thumb">
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
              />
              <div className="summary-thumb-overlay" />
              <div className="summary-play-hint">▶ Click thumbnail to watch</div>
            </div>

            {/* Animated summary text */}
            <div className="summary-body">
              {video.summary ? (
                <p className="summary-text">
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      className="summary-word"
                      initial={{ opacity: 0, y: 6 }}
                      animate={i < visibleWords ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </p>
              ) : (
                <p className="summary-no-text">No summary available for this video.</p>
              )}
            </div>

            {/* Footer actions */}
            <div className="summary-footer">
              <motion.a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="summary-btn summary-btn-watch"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={SP}
              >
                ▶ Watch on YouTube
              </motion.a>
              <motion.a
                href={`https://wa.me/?text=${encodeURIComponent(`✦ Watch: ${video.title} — United in Christ\n\n${video.url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="summary-btn summary-btn-share"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={SP}
              >
                ↑ Share
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
    <motion.div className="scroll-progress-line" style={{ scaleY, transformOrigin: 'top' }} />
  );
}

// ─────────────────────────────────────────────
// VIDEO CARD — with Summary button
// ─────────────────────────────────────────────
function VideoCard({
  video,
  index,
  onSummary,
}: {
  video: typeof VIDEOS[0];
  index: number;
  onSummary: (v: typeof VIDEOS[0]) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  const hasSummary = !!video.summary;

  return (
    <motion.div
      className="vid-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SP, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -5, borderColor: 'rgba(0,229,255,0.45)' }}
      style={{ willChange: 'transform' }}
    >
      <div className="vid-thumb-wrap" onClick={() => !playing && setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            allowFullScreen
            allow="autoplay; encrypted-media"
            title={video.title}
            loading="lazy"
          />
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
        <div className="vid-actions">
          {hasSummary && (
            <motion.button
              className="vid-summary-btn"
              onClick={() => onSummary(video)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={SP}
              title="View sermon summary"
            >
              ✦ Summary
            </motion.button>
          )}
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="vid-yt-link">
            YouTube →
          </a>
        </div>
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
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-eyebrow">Living Word</div>
        <h2 className="sec-title">Scripture of the <span>Day</span></h2>
        <div className="title-rule" />
      </motion.div>
      <div className="scripture-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="scripture-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
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
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
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
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-eyebrow">Written Revelation</div>
        <h2 className="sec-title">Teaching <span>Notes</span></h2>
        <div className="title-rule" />
        <p className="sec-desc">Study materials from Prophet Jay Uriel. View online or download to study at your pace.</p>

        {isMobile ? (
          <motion.button className="search-btn-mobile" onClick={() => setCmdOpen(true)}
            whileTap={{ scale: 0.97 }} transition={SP}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search Teaching Notes
          </motion.button>
        ) : (
          <motion.button className="cmd-trigger" onClick={() => setCmdOpen(true)}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(0,0,0,0.28)' }} whileTap={{ scale: 0.98 }} transition={SP}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search teaching notes…
            <span className="cmd-kbd">⌘K</span>
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {cmdOpen && (
          <motion.div className="cmd-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }} onClick={e => { if (e.target === e.currentTarget) { setCmdOpen(false); setSearch(''); } }}>
            <motion.div className="cmd-palette"
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ ...SP, delay: i * 0.04 }}
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
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
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
// DUAL-PURPOSE PRAYER & CONNECT SECTION
// ─────────────────────────────────────────────
function PrayerSection() {
  const [mode, setMode] = useState<'prayer' | 'connect'>('prayer');
  const [isAnon, setIsAnon] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [addToWall, setAddToWall] = useState(false);
  const [notifyWhenPrayed, setNotifyWhenPrayed] = useState(false);
  const [category, setCategory] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp'|'email'|'call'>('whatsapp');
  const [isSevere, setIsSevere] = useState(false);
  const [connectTopic, setConnectTopic] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const msgRef  = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleMsgChange = () => {
    const val = msgRef.current?.value || '';
    setIsSevere(detectSevere(val));
  };

  const resetForm = () => {
    setSubmitted(false); setIsAnon(false); setShowNotes(false);
    setAddToWall(false); setNotifyWhenPrayed(false); setCategory('');
    setIsSevere(false); setConnectTopic('');
    if (nameRef.current) nameRef.current.value = '';
    if (msgRef.current) msgRef.current.value = '';
    if (notesRef.current) notesRef.current.value = '';
    if (phoneRef.current) phoneRef.current.value = '';
  };

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
    setTimeout(resetForm, 6000);
  };

  const handleConnect = () => {
    const nameVal = nameRef.current?.value.trim() || '';
    const msgVal  = msgRef.current?.value.trim() || '';
    const phoneVal = phoneRef.current?.value.trim() || '';
    if (!nameVal) { alert('Please enter your name.'); return; }
    if (!msgVal) { alert('Please share what you would like to connect about.'); return; }
    const contactInfo = phoneVal ? `\nContact: ${phoneVal} (${contactMethod})` : '';
    const fullMsg = `✧ Connect Request — United in Christ\n\nName: ${nameVal}${contactInfo}\nTopic: ${connectTopic || 'General'}\n\nMessage:\n${msgVal}${notifyWhenPrayed ? '\n\n✓ Notify me when prayed over' : ''}`;
    if (contactMethod === 'whatsapp') {
      window.open(`https://wa.me/27649842408?text=${encodeURIComponent(fullMsg)}`, '_blank');
    } else {
      window.open(`mailto:jayuriel28@gmail.com?subject=${encodeURIComponent('Connect Request — United in Christ')}&body=${encodeURIComponent(fullMsg)}`, '_blank');
    }
    setSubmitted(true);
    setTimeout(resetForm, 6000);
  };

  return (
    <section id="prayer">
      <div className="prayer-wrap">
        <motion.div className="prayer-mode-toggle" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <button className={`pmt-btn${mode === 'prayer' ? ' active' : ''}`} onClick={() => { setMode('prayer'); resetForm(); }}>✦ Prayer Request</button>
          <button className={`pmt-btn${mode === 'connect' ? ' active' : ''}`} onClick={() => { setMode('connect'); resetForm(); }}>✉ Connect With Us</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === 'prayer' ? (
            <motion.div key="prayer-header" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={SPsoft}>
              <div className="sec-center" style={{ marginBottom: '24px' }}>
                <div className="sec-eyebrow">Come Before God</div>
                <h2 className="sec-title">Submit a <span>Prayer Request</span></h2>
                <div className="title-rule" />
                <blockquote className="prayer-verse">
                  &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo; — Philippians 4:6
                </blockquote>
                <p className="sec-desc">We stand in agreement with you. Share your request and our team will pray for you.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="connect-header" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={SPsoft}>
              <div className="sec-center" style={{ marginBottom: '24px' }}>
                <div className="sec-eyebrow">Reach Out</div>
                <h2 className="sec-title">Connect <span>With Us</span></h2>
                <div className="title-rule" />
                <p className="sec-desc">Have questions, need spiritual support, or want to get involved? We&apos;d love to hear from you.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="conf" className="prayer-conf"
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93 }} transition={SPsoft}>
              <div className="conf-icon">☩</div>
              <h3 className="conf-title">{mode === 'prayer' ? 'Your request has been received' : 'Message sent!'}</h3>
              <p className="conf-body">
                {mode === 'prayer'
                  ? <>Our team is praying with you. The Lord hears every cry of the heart.<br /><em style={{ color: 'var(--accent)', fontSize: '.88em' }}>&ldquo;The effectual fervent prayer of a righteous man availeth much.&rdquo; — James 5:16</em></>
                  : <>We will be in touch soon. Thank you for reaching out to United in Christ.</>}
              </p>
              {addToWall && mode === 'prayer' && <p className="conf-wall">✓ Your request will be added to the Prayer Wall</p>}
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {mode === 'prayer' ? (
                <motion.div key="prayer-form" className="prayer-form"
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={SPsoft}>

                  <AnimatePresence>
                    {isSevere && (
                      <motion.div className="severe-banner"
                        initial={{ opacity: 0, y: -12, scaleY: 0.8 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -12, scaleY: 0.8 }}
                        transition={SPsoft}>
                        <div className="severe-icon">☩</div>
                        <div>
                          <div className="severe-title">You are not alone.</div>
                          <div className="severe-verse">&ldquo;The Lord is close to the brokenhearted and saves those who are crushed in spirit.&rdquo; — Psalm 34:18</div>
                          <div className="severe-note">Our team will personally intercede for you with urgency.</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                            <input className="f-bare" type="text" id="pName" ref={nameRef} placeholder=" " />
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

                  <div className="floating-field">
                    <select className="f-bare f-select" value={category} onChange={e => setCategory(e.target.value)} id="pCat">
                      <option value="">Select a category…</option>
                      {PRAYER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <label htmlFor="pCat" className={`floating-label${category ? ' elevated' : ''}`}>Prayer Category</label>
                  </div>

                  <div className="message-field">
                    <textarea
                      ref={msgRef}
                      className="f-bare-area"
                      rows={4}
                      placeholder="Share your prayer request here…"
                      onChange={handleMsgChange}
                      onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
                    />
                  </div>

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

                  <label className="wall-check" style={{ gap: '10px' }}>
                    <input type="checkbox" className="f-check" checked={notifyWhenPrayed} onChange={e => setNotifyWhenPrayed(e.target.checked)} />
                    <span>Notify me via WhatsApp when my request is prayed over</span>
                  </label>

                  <div className="privacy-notice">
                    <span>🔒</span> Your information is strictly confidential and will never be shared outside our prayer team.
                  </div>

                  <motion.button className="submit-btn" onClick={handlePrayer}
                    whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,229,255,0.28)' }}
                    whileTap={{ scale: 0.98 }} transition={SP}>
                    ✦ Send Prayer Request
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="connect-form" className="prayer-form"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={SPsoft}>

                  <div className="floating-field">
                    <input className="f-bare" type="text" id="cName" ref={nameRef} placeholder=" " />
                    <label htmlFor="cName" className="floating-label">Your Name *</label>
                  </div>

                  <div className="contact-method-row">
                    <div className="cm-label">Preferred contact method</div>
                    <div className="cm-options">
                      {(['whatsapp', 'email', 'call'] as const).map(m => (
                        <motion.button key={m} className={`cm-btn${contactMethod === m ? ' active' : ''}`}
                          onClick={() => setContactMethod(m)} whileTap={{ scale: 0.96 }} transition={SP}>
                          {m === 'whatsapp' ? '💬 WhatsApp' : m === 'email' ? '✉ Email' : '📞 Call'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {(contactMethod === 'whatsapp' || contactMethod === 'call') && (
                    <div className="floating-field">
                      <input className="f-bare" type="tel" id="cPhone" ref={phoneRef} placeholder=" " />
                      <label htmlFor="cPhone" className="floating-label">Phone / WhatsApp Number</label>
                    </div>
                  )}

                  <div className="floating-field">
                    <select className="f-bare f-select" value={connectTopic} onChange={e => setConnectTopic(e.target.value)} id="cTopic">
                      <option value="">What is this about?</option>
                      <option value="Joining the Ministry">Joining the Ministry</option>
                      <option value="Spiritual Counselling">Spiritual Counselling</option>
                      <option value="Saturday Teachings">Saturday Teachings</option>
                      <option value="Media & Collaboration">Media & Collaboration</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    <label htmlFor="cTopic" className={`floating-label${connectTopic ? ' elevated' : ''}`}>Topic</label>
                  </div>

                  <div className="message-field">
                    <textarea ref={msgRef} className="f-bare-area" rows={4} placeholder="What would you like to share or ask?"
                      onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }} />
                  </div>

                  <label className="wall-check" style={{ gap: '10px' }}>
                    <input type="checkbox" className="f-check" checked={notifyWhenPrayed} onChange={e => setNotifyWhenPrayed(e.target.checked)} />
                    <span>Notify me when my message is received &amp; prayed over</span>
                  </label>

                  <div className="privacy-notice">
                    <span>🔒</span> Your details are confidential and used only to respond to your enquiry.
                  </div>

                  <motion.button className="submit-btn" onClick={handleConnect}
                    whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,229,255,0.28)' }}
                    whileTap={{ scale: 0.98 }} transition={SP}>
                    ✉ Send Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
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
    <motion.div className="vod" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPsoft}>
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
  const [ripple,     setRipple]     = useState<{ x: number; y: number; toLight: boolean } | null>(null);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);
  const [vodIndex,     setVodIndex]     = useState(0);
  const [vodDateLong,  setVodDateLong]  = useState('');
  const [vodDateShort, setVodDateShort] = useState('');
  const [summaryVideo, setSummaryVideo] = useState<typeof VIDEOS[0] | null>(null);

  // ── Theme: read from localStorage on mount, persist on change ──
  useEffect(() => {
    const saved = localStorage.getItem('uic-theme');
    if (saved === 'light') setIsDark(false);
    else setIsDark(true);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('uic-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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

  // Electric ripple toggle
  const handleThemeToggle = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setRipple({ x, y, toLight: isDark });
  };
  const onRippleComplete = useCallback(() => {
    setIsDark(d => !d);
    setRipple(null);
  }, []);

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
        ctx.fillStyle = `rgba(0,229,255,${s.a * 0.3})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', () => { resize(); initStars(); });
    resize(); initStars(); draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', () => {}); };
  }, []);

  const { scrollY } = useScroll();
  const navBg       = useTransform(scrollY, [0, 60], ['rgba(13,13,13,0)', 'rgba(13,13,13,0.97)']);
  const rawPy       = useTransform(scrollY, [0, 80], [22, 12]);
  const navPy       = useSpring(rawPy, { stiffness: 80, damping: 20 });

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
      {/* FOUC prevention: inline script sets theme before paint */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          try {
            var t = localStorage.getItem('uic-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
          } catch(e){}
        })();
      `}} />

      <canvas ref={canvasRef} id="particles" />
      <ScrollProgressLine />

      <AnimatePresence>
        {ripple && (
          <ElectricRipple key="ripple" x={ripple.x} y={ripple.y} toLight={ripple.toLight} onComplete={onRippleComplete} />
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <SummaryModal video={summaryVideo} onClose={() => setSummaryVideo(null)} />

      {/* Theme toggle */}
      <motion.button
        className="theme-toggle"
        title="Toggle light/dark"
        onClick={handleThemeToggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        transition={SP}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ willChange: 'transform' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'dark' : 'light'}
            initial={{ y: 8, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -8, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block' }}
          >
            {isDark ? '☾' : '☀'}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── NAV ── */}
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
            <motion.li key={item.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SP, delay: 0.18 + i * 0.07 }}>
              <motion.a href={item.href} className="nav-link" whileHover={{ color: 'var(--accent)' }} transition={{ duration: 0.18 }}>{item.label}</motion.a>
            </motion.li>
          ))}
        </ul>
        <div className="nav-right">
          <motion.a href="#prayer" className="nav-cta"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ ...SP, delay: 0.7 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0,229,255,.5)' }} whileTap={{ scale: 0.97 }}>
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
        <div className="hero-bg" />
        <div className="hero-grad" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-content">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SP, delay: 0.4 }}>Ministry of the Word</motion.div>
          <motion.h1 className="hero-h1" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SP, delay: 0.55 }}>
            United in <span>Christ</span>
          </motion.h1>
          <motion.p className="hero-tagline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SP, delay: 0.75 }}>
            Proclaiming the Word of God with power, truth, and the spirit of prophecy
          </motion.p>
          <motion.div className="hero-btns" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SP, delay: 0.92 }}>
            <motion.a href="#sermons" className="btn-primary" whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,229,255,.4)' }} whileTap={{ scale: 0.97 }} transition={SP}>Watch Sermons</motion.a>
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

      {/* ── SCROLL BRIDGE ── */}
      <div className="scroll-bridge">
        <div className="bridge-line" />
        <div className="bridge-label">Featured Today</div>
        <div className="bridge-line" />
      </div>

      {/* ── VIDEO OF THE DAY ── */}
      <motion.section id="video-of-day" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
        <div className="sec-center" style={{ marginBottom: 'clamp(24px,3.5vw,44px)' }}>
          <div className="sec-eyebrow">Featured Today</div>
          <h2 className="sec-title">Video of the <span>Day</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">{vodDateLong ? `Today's message • ${vodDateLong}` : "Today's featured message"}</p>
        </div>
        <motion.div
          className="votd-card"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={scaleIn}
          whileHover={{ scale: 1.007, boxShadow: '0 40px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(0,229,255,.15)' }}
          transition={SPsoft}
          style={{ willChange: 'transform' }}>
          {vodDateShort && <div className="votd-badge">◆ {vodDateShort}</div>}
          <VotdPlayer id={videoOfTheDay?.id || ''} title={videoOfTheDay?.title || ''} url={videoOfTheDay?.url || ''} />
          <div className="votd-info">
            <div className="vid-title">{videoOfTheDay?.title}</div>
            <div className="votd-info-actions">
              {videoOfTheDay?.summary && (
                <motion.button
                  className="vid-summary-btn"
                  onClick={() => setSummaryVideo(videoOfTheDay)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SP}
                >
                  ✦ Summary
                </motion.button>
              )}
              <a href={videoOfTheDay?.url} target="_blank" rel="noopener noreferrer" className="vid-yt-link">Watch on YouTube →</a>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeLeft}>
            <MagneticImage src="/photos/jay-uriel.jpeg" alt="Prophet Jay Uriel" />
          </motion.div>
          <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeRight}>
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
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(0,229,255,.4)' }} whileTap={{ scale: 0.97 }} transition={SP}>
              Join Us This Saturday
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── SATURDAY ── */}
      <section id="saturday">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
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
              <motion.a href="#prayer" className="btn-primary" style={{ whiteSpace: 'nowrap', fontSize: '.82rem', minHeight: '48px', display: 'inline-flex', alignItems: 'center' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={SP}>I Want to Attend</motion.a>
            </div>
            <div className="sat-badge">United in Christ</div>
          </motion.div>
        </div>
      </section>

      <ScripturesSection />

      {/* ── ANNOUNCEMENTS ── */}
      <section id="announcements">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-eyebrow">Church Family</div>
          <h2 className="sec-title">Announcements &amp; <span>Testimonials</span></h2>
          <div className="title-rule" />
        </motion.div>
        <div className="announce-grid">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
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
                  className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '20px', fontSize: '.78rem', minHeight: '48px', lineHeight: '1' }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SP}>Join via WhatsApp</motion.a>
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
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
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SP, delay: idx * 0.08 }}
                whileHover={{ borderColor: 'rgba(0,229,255,.4)', y: -3 }}>
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
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="sec-eyebrow">Anointed Messages</div>
          <h2 className="sec-title">Sermons &amp; <span>Preachings</span></h2>
          <div className="title-rule" />
          <p className="sec-desc">Click <strong style={{ color: 'var(--accent)' }}>✦ Summary</strong> on any sermon to read a full breakdown of the message.</p>
        </motion.div>
        <div className="sermons-wrap">
          <div className="sermons-grid">
            {shuffled.map((v, idx) => (
              <VideoCard key={v.id} video={v} index={idx} onSummary={setSummaryVideo} />
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'clamp(28px,4.5vw,56px)' }}>
          <motion.a href="https://www.youtube.com/@jayuriel" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '.82rem' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(0,229,255,.4)' }} whileTap={{ scale: 0.97 }} transition={SP}>
            View All Sermons on YouTube →
          </motion.a>
        </div>
      </section>

      <DocumentsSection />
      <PrayerSection />

      {/* ── CONNECT ── */}
      <section id="connect">
        <motion.div className="sec-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
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
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ ...SP, delay: s.delay }} whileHover={{ y: -6, borderColor: 'var(--accent)' }} style={{ willChange: 'transform' }}>
              <div className="soc-logo">{s.svg}</div>
              <div className="soc-name">{s.name}</div>
              <div className="soc-desc">{s.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── JOIN ── */}
      <motion.div className="join-sec" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="sec-eyebrow">Be Part of the Family</div>
        <h2 className="sec-title" style={{ maxWidth: '540px', margin: '0 auto 14px', textWrap: 'balance' } as any}>Join Us <span>This Saturday</span></h2>
        <div className="title-rule" style={{ margin: '16px auto 24px' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(.9rem,1.7vw,1.05rem)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: '1.8', fontStyle: 'italic' }}>
          Come as you are. Leave transformed. Every Saturday, we gather to encounter the living God.
        </p>
        <motion.a href="#prayer" className="btn-primary" whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(0,229,255,.5)' }} whileTap={{ scale: 0.97 }} transition={SP}>
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
      </footer>

      {/* ══════════════════════════════════════════
          GLOBAL STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700;800&family=Archivo+Black&display=swap');

        /* ── FLASH-OF-UNSTYLED-CONTENT prevention ──
           Applied by the inline script above before React hydrates.
           These rules kick in immediately. */
        html[data-theme='light'] body { background-color: #F0F2F7 !important; }
        html[data-theme='dark']  body { background-color: #0D0D0D !important; }

        :root {
          --radius: 16px;
          --radius-sm: 10px;
          --container: 1200px;
          --section-py: clamp(72px,9vw,120px);
          --gap: clamp(14px,2.2vw,24px);

          /* GPU-accelerated theme transition — only background-color and color, not 'all' */
          --theme-transition: 0.42s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ── ELECTRIC DARK ── */
        [data-theme='dark'] {
          --bg:            #0D0D0D;
          --bg-mid:        #111114;
          --surface:       rgba(14,14,20,0.90);
          --surface-solid: #0E0E14;
          --surface2:      rgba(18,18,28,0.94);
          --border:        rgba(255,255,255,0.06);
          --border-hover:  rgba(0,229,255,0.5);
          --accent:        #00E5FF;
          --accent-warm:   #33EEFF;
          --accent-dim:    rgba(0,229,255,0.08);
          --accent-glow:   rgba(0,229,255,0.22);
          --text:          #EEF4FA;
          --text2:         #A8BEC9;
          --text-muted:    #4E6678;
          --shadow:        0 20px 60px rgba(0,0,0,0.8);
          --shadow-hover:  0 32px 80px rgba(0,0,0,0.88);
          --input-bg:      rgba(255,255,255,0.03);
          --input-border:  rgba(0,229,255,0.18);
          --glass-bg:      rgba(10,10,18,0.75);
          --glass-border:  rgba(0,229,255,0.1);
          --electric-glow: 0 0 18px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.12);
        }

        /* ── LIGHT THEME ── */
        [data-theme='light'] {
          --bg:            #F0F2F7;
          --bg-mid:        #E8ECF4;
          --surface:       rgba(255,255,255,0.85);
          --surface-solid: #FFFFFF;
          --surface2:      rgba(240,242,250,0.9);
          --border:        rgba(0,0,0,0.07);
          --border-hover:  rgba(0,150,200,0.45);
          --accent:        #007ACC;
          --accent-warm:   #009AE6;
          --accent-dim:    rgba(0,122,204,0.08);
          --accent-glow:   rgba(0,122,204,0.18);
          --text:          #0D1117;
          --text2:         #2E3E4C;
          --text-muted:    #6A7D8C;
          --shadow:        0 4px 28px rgba(0,0,0,0.07);
          --shadow-hover:  0 12px 48px rgba(0,0,0,0.13);
          --input-bg:      rgba(0,0,0,0.025);
          --input-border:  rgba(0,122,204,0.22);
          --glass-bg:      rgba(255,255,255,0.72);
          --glass-border:  rgba(255,255,255,0.9);
          --electric-glow: none;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body {
          background-color: var(--bg);
          color: var(--text);
          font-family: 'Inter Tight', 'Helvetica Neue', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          /* Only transition the properties that matter — avoids GPU thrash */
          transition:
            background-color var(--theme-transition),
            color var(--theme-transition);
          will-change: background-color, color;
        }

        body::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(0,229,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 85%, rgba(0,229,255,0.03) 0%, transparent 55%);
          pointer-events: none; z-index: 0;
        }
        [data-theme='light'] body::before { background: none; }

        img { max-width: 100%; height: auto; display: block; }
        button { font-family: inherit; }

        .scroll-progress-line {
          position: fixed; top: 0; left: 0;
          width: 2.5px; height: 100vh;
          background: linear-gradient(to bottom, var(--accent), rgba(0,229,255,0.15));
          z-index: 1002; transform-origin: top; pointer-events: none;
        }

        /* ── SECTIONS ── */
        section, .join-sec {
          position: relative; z-index: 1;
          padding: var(--section-py) clamp(16px,5vw,52px);
          max-width: calc(var(--container) + 104px);
          margin: 0 auto;
        }
        section + section { border-top: 1px solid var(--border); }

        .sec-eyebrow {
          font-size: clamp(.62rem,1vw,.74rem); font-weight: 800;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 10px;
        }
        .sec-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(1.9rem,4.5vw,3.2rem);
          font-weight: 400; color: var(--text);
          line-height: 1.12; letter-spacing: -0.01em;
        }
        .sec-title span { color: var(--accent); font-style: italic; }
        .sec-desc {
          color: var(--text2);
          font-size: clamp(.86rem,1.3vw,.98rem);
          line-height: 1.88; max-width: 600px;
          margin: 12px auto 0;
        }
        .sec-center { text-align: center; }
        .title-rule {
          width: 40px; height: 1.5px;
          background: linear-gradient(to right, var(--accent), transparent);
          margin: 18px auto 0;
        }

        /* ── BUTTONS ── */
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: clamp(13px,1.8vw,15px) clamp(24px,3.5vw,42px);
          min-height: 48px;
          border-radius: 40px;
          background-color: var(--accent);
          color: #0D0D0D;
          font-size: clamp(.78rem,1.2vw,.9rem);
          font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: background-color .2s;
          will-change: transform;
        }
        [data-theme='dark'] .btn-primary { color: #0D0D0D; }
        .btn-primary:hover { background-color: var(--accent-warm); }
        .btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: clamp(12px,1.8vw,15px) clamp(24px,3.5vw,42px);
          min-height: 48px;
          border-radius: 40px;
          background: transparent; color: #fff;
          font-size: clamp(.78rem,1.2vw,.9rem);
          font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.35);
          cursor: pointer; will-change: transform;
          backdrop-filter: blur(8px);
        }

        #particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

        /* ── THEME TOGGLE ── */
        .theme-toggle {
          position: fixed; bottom: clamp(14px,3vw,24px); right: clamp(14px,3vw,24px);
          z-index: 1001; width: 46px; height: 46px; border-radius: 50%;
          background-color: var(--glass-bg);
          border: 1.5px solid var(--accent);
          color: var(--accent); font-size: 1.05rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          /* Only shadow transitions — avoids layout recalc */
          box-shadow: var(--electric-glow), var(--shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        /* ── NAVBAR ── */
        #navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; gap: clamp(10px,2vw,24px);
          padding-left: clamp(16px,3vw,40px);
          padding-right: clamp(16px,3vw,40px);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,229,255,0.08);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nav-logo-img { width: 38px; height: 38px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--accent); flex-shrink: 0; box-shadow: 0 0 10px rgba(0,229,255,.25); }
        .nav-logo-img img { width: 100%; height: 100%; object-fit: cover; }
        .nav-logo-name { font-family: 'Instrument Serif', serif; font-size: clamp(.82rem,1.3vw,.96rem); font-weight: 400; color: var(--text); line-height: 1.2; }
        .nav-logo-sub { font-size: clamp(.56rem,.85vw,.68rem); color: var(--accent); letter-spacing: .08em; text-transform: uppercase; font-weight: 700; }
        .nav-links { display: flex; list-style: none; gap: clamp(2px,1.2vw,18px); flex: 1; justify-content: center; }
        .nav-link {
          text-decoration: none; font-size: clamp(.72rem,.98vw,.84rem);
          font-weight: 600; color: var(--text2); letter-spacing: .04em; text-transform: uppercase;
          padding: 6px 10px; border-radius: 8px; transition: color .18s, background-color .18s;
        }
        .nav-link:hover { background-color: var(--accent-dim); }
        .nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nav-cta {
          display: inline-flex; align-items: center; padding: 9px 18px;
          min-height: 40px;
          border-radius: 40px; background-color: var(--accent); color: #0D0D0D;
          font-size: clamp(.66rem,.92vw,.78rem); font-weight: 800; letter-spacing: .07em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: background-color .2s;
          box-shadow: 0 0 12px rgba(0,229,255,.2);
        }
        .nav-cta:hover { background-color: var(--accent-warm); }
        .hamburger { display: none; flex-direction: column; justify-content: space-between; width: 24px; height: 16px; background: none; border: none; cursor: pointer; padding: 0; }
        .hamburger span { display: block; height: 2px; background: var(--text); border-radius: 2px; transition: all .28s; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
        @media (max-width:860px) { .nav-links { display: none; } .nav-cta { display: none; } .hamburger { display: flex; } }

        /* ── MOBILE MENU ── */
        .mobile-overlay { position: fixed; inset: 0; z-index: 998; background: rgba(13,13,13,.82); backdrop-filter: blur(6px); }
        .mobile-menu {
          position: fixed; top: 0; right: 0;
          width: min(300px,88vw); height: 100dvh;
          background: var(--surface-solid);
          z-index: 999; list-style: none;
          padding: 80px 28px 32px;
          display: flex; flex-direction: column; gap: 4px;
          box-shadow: -12px 0 50px rgba(0,0,0,.6);
          overflow-y: auto;
          border-left: 1px solid rgba(0,229,255,.12);
        }
        .mobile-menu a { display: flex; padding: 16px 0; min-height: 52px; align-items: center; color: var(--text2); text-decoration: none; font-size: 1.05rem; font-weight: 600; border-bottom: 1px solid var(--border); transition: color .2s; }
        .mobile-menu a:hover { color: var(--accent); }
        .mobile-cta { margin-top: 12px !important; background-color: var(--accent) !important; color: #0D0D0D !important; text-align: center; border-radius: 40px; border: none !important; padding: 13px 0 !important; justify-content: center !important; }

        /* ── HERO ── */
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; padding: 0; max-width: 100%; }
        .hero-bg { position: absolute; inset: 0; background: url('/photos/IMG_4616.jpg') center/cover no-repeat; transform: scale(1.04); z-index: 0; filter: brightness(0.42) saturate(0.55); }
        .hero-grad { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, rgba(13,13,13,.5) 0%, rgba(13,13,13,.18) 35%, rgba(13,13,13,.72) 72%, rgba(13,13,13,1) 100%); }
        .hero-orb { position: absolute; border-radius: 50%; z-index: 1; pointer-events: none; }
        .hero-orb-1 { width: clamp(300px,50vw,600px); height: clamp(300px,50vw,600px); background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%); top: 8%; left: -10%; }
        .hero-orb-2 { width: clamp(240px,40vw,500px); height: clamp(240px,40vw,500px); background: radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%); bottom: 12%; right: -8%; }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: 140px clamp(20px,6vw,60px) clamp(80px,12vw,120px); max-width: 820px; margin: 0 auto; width: 100%; }
        .hero-eyebrow { display: inline-block; font-size: clamp(.62rem,1vw,.76rem); font-weight: 800; letter-spacing: .25em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; padding: 5px 16px; border: 1px solid rgba(0,229,255,.25); border-radius: 40px; background: rgba(0,229,255,.06); backdrop-filter: blur(8px); box-shadow: 0 0 12px rgba(0,229,255,.1); }
        .hero-h1 { font-family: 'Instrument Serif', serif; font-size: clamp(2.8rem,7.5vw,6rem); font-weight: 400; color: #fff; line-height: 1.06; letter-spacing: -0.02em; margin-bottom: clamp(14px,2.2vw,22px); }
        .hero-h1 span { color: var(--accent); font-style: italic; text-shadow: 0 0 40px rgba(0,229,255,.4); }
        .hero-tagline { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(1rem,2vw,1.32rem); color: rgba(255,255,255,.76); line-height: 1.68; max-width: 560px; margin: 0 auto clamp(28px,4vw,44px); }
        .hero-btns { display: flex; gap: clamp(10px,2vw,14px); justify-content: center; flex-wrap: wrap; margin-bottom: clamp(40px,7vw,70px); }
        .hero-infobar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center; justify-items: center;
          gap: clamp(8px,2vw,20px);
          padding: clamp(14px,2vw,20px) clamp(16px,3vw,32px);
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,229,255,.12); border-radius: var(--radius);
          max-width: 660px; margin: 0 auto;
          box-shadow: 0 0 24px rgba(0,229,255,.05);
        }
        .hero-info-item { text-align: center; min-width: 0; }
        .hi-label { display: block; font-size: clamp(.58rem,.9vw,.72rem); font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; white-space: nowrap; }
        .hi-val   { display: block; font-size: clamp(.72rem,1vw,.84rem); color: rgba(255,255,255,.76); word-break: break-word; }
        .hi-sep   { width: 1px; height: 28px; background: rgba(0,229,255,.15); flex-shrink: 0; }
        @media (max-width:480px) { .hero-infobar { grid-template-columns: 1fr 1fr 1fr; column-gap: 6px; } .hi-sep { display: none; } }
        @media (max-width:360px) { .hero-infobar { grid-template-columns: 1fr 1fr; } }
        .hero-scroll { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 2; width: 26px; height: 40px; border: 1.5px solid rgba(255,255,255,.18); border-radius: 13px; display: flex; align-items: flex-start; justify-content: center; padding-top: 6px; }
        .scroll-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.65); }

        /* ── SCROLL BRIDGE ── */
        .scroll-bridge { display: flex; align-items: center; justify-content: center; gap: 16px; padding: clamp(12px,2vw,20px) clamp(16px,5vw,52px); position: relative; z-index: 1; }
        .bridge-line { flex: 1; max-width: 120px; height: 1px; background: linear-gradient(to right, transparent, var(--border)); }
        .bridge-line:last-child { background: linear-gradient(to left, transparent, var(--border)); }
        .bridge-label { font-size: .62rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }

        /* ── VIDEO OF THE DAY ── */
        #video-of-day { padding-top: clamp(24px,4vw,48px); padding-bottom: var(--section-py); }
        .votd-card {
          max-width: var(--container); margin: 0 auto;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          overflow: hidden; position: relative;
          box-shadow: var(--shadow);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-radius: calc(var(--radius)*1.2);
        }
        .votd-badge { position: absolute; top: 14px; left: 14px; z-index: 2; background-color: var(--accent); color: #0D0D0D; font-size: .68rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; padding: 4px 13px; border-radius: 40px; }
        .votd-info { padding: clamp(14px,2.2vw,26px) clamp(18px,2.8vw,32px); display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; background: var(--glass-bg); }
        .votd-info-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .vid-title { font-size: clamp(.82rem,1.2vw,.92rem); font-weight: 700; color: var(--text); }
        .vid-yt-link { font-size: .76rem; font-weight: 700; letter-spacing: .05em; color: var(--accent); text-decoration: none; text-transform: uppercase; }
        .vid-yt-link:hover { opacity: .7; }

        /* ── SUMMARY BUTTON ── */
        .vid-summary-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 13px; min-height: 32px;
          border-radius: 40px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,229,255,.3);
          color: var(--accent);
          font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
          cursor: pointer; white-space: nowrap;
          transition: background-color .2s, color .2s;
        }
        .vid-summary-btn:hover { background-color: var(--accent); color: #0D0D0D; }

        /* ── VIDEO CARDS ── */
        .sermons-wrap { max-width: calc(var(--container) + 32px); margin: 0 auto; }
        .sermons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(260px,27vw,340px),1fr)); gap: var(--gap); margin-top: clamp(28px,4vw,48px); }
        .vid-card {
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          border-radius: var(--radius); overflow: hidden;
          transition: border-color .25s;
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
        }
        .vid-thumb-wrap { position: relative; width: 100%; padding-top: 56.25%; cursor: pointer; overflow: hidden; background: var(--surface2); }
        .vid-thumb-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
        .vid-card:hover .vid-thumb-wrap img { transform: scale(1.05); }
        .vid-thumb-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .vid-play-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.22); transition: background .2s; }
        .vid-play-btn svg { width: 54px; height: 54px; fill: rgba(255,255,255,.92); filter: drop-shadow(0 2px 12px rgba(0,0,0,.5)); transition: transform .2s; }
        .vid-thumb-wrap:hover .vid-play-btn svg { transform: scale(1.12); }
        .vid-info { padding: clamp(10px,1.6vw,16px) clamp(12px,1.8vw,18px); display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
        .vid-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

        /* ── SUMMARY MODAL ── */
        .summary-overlay {
          position: fixed; inset: 0; z-index: 2500;
          background: rgba(13,13,13,.92);
          backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .summary-box {
          background: var(--surface-solid);
          border: 1px solid rgba(0,229,255,.2);
          border-radius: calc(var(--radius)*1.5);
          width: 100%; max-width: 580px;
          max-height: 90dvh;
          display: flex; flex-direction: column;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,.85), 0 0 50px rgba(0,229,255,.08);
        }
        .summary-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; padding: 20px 22px 16px;
          border-bottom: 1px solid var(--border);
        }
        .summary-header-left { flex: 1; min-width: 0; }
        .summary-eyebrow { font-size: .6rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); margin-bottom: 5px; }
        .summary-title { font-family: 'Instrument Serif', serif; font-size: clamp(1rem,2.2vw,1.32rem); color: var(--text); font-weight: 400; line-height: 1.3; }
        .summary-close {
          background: transparent; border: 1px solid var(--border);
          color: var(--text); width: 32px; height: 32px; border-radius: 50%;
          cursor: pointer; font-size: .8rem; display: flex; align-items: center; justify-content: center;
          transition: background-color .2s, color .2s; flex-shrink: 0;
        }
        .summary-close:hover { background-color: var(--accent); color: #0D0D0D; border-color: var(--accent); }
        .summary-thumb {
          position: relative; width: 100%; padding-top: 40%;
          overflow: hidden; flex-shrink: 0;
        }
        .summary-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .summary-thumb-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(13,13,13,.7) 100%); }
        .summary-play-hint {
          position: absolute; bottom: 12px; left: 16px;
          font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.6);
        }
        .summary-body { flex: 1; overflow-y: auto; padding: 22px 22px 8px; }
        .summary-text {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(.94rem,1.5vw,1.06rem);
          line-height: 1.85; color: var(--text2);
          font-style: italic;
        }
        .summary-word { display: inline; }
        .summary-no-text { color: var(--text-muted); font-style: italic; font-size: .9rem; }
        .summary-footer {
          display: flex; gap: 8px; flex-wrap: wrap;
          padding: 16px 22px 20px;
          border-top: 1px solid var(--border);
        }
        .summary-btn {
          flex: 1; min-width: 110px;
          padding: 11px 16px; min-height: 44px;
          border-radius: var(--radius-sm);
          font-size: .76rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; border: none; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center;
          transition: opacity .2s;
        }
        .summary-btn-watch { background-color: var(--accent); color: #0D0D0D; }
        .summary-btn-watch:hover { opacity: .88; }
        .summary-btn-share { background: transparent; border: 1px solid var(--glass-border) !important; color: var(--text2); }
        .summary-btn-share:hover { border-color: var(--accent) !important; color: var(--accent); }

        /* ── ABOUT ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,6vw,80px); align-items: center; max-width: var(--container); margin: 0 auto; }
        @media (max-width:768px) { .about-grid { grid-template-columns: 1fr; } }
        .about-img-wrap { position: relative; border-radius: var(--radius); overflow: hidden; cursor: none; }
        .about-img { width: 100%; height: clamp(340px,50vw,560px); object-fit: cover; object-position: top; border-radius: var(--radius); display: block; }
        .about-img-overlay { position: absolute; inset: 0; border-radius: var(--radius); background: linear-gradient(to bottom, transparent 60%, rgba(13,13,13,.35) 100%); pointer-events: none; }
        .about-ring { position: absolute; inset: -3px; border-radius: calc(var(--radius) + 3px); border: 1.5px solid rgba(0,229,255,.3); pointer-events: none; z-index: 2; box-shadow: 0 0 16px rgba(0,229,255,.15); }
        .about-ring-outer { position: absolute; inset: -8px; border-radius: calc(var(--radius) + 8px); border: 1px solid rgba(0,229,255,.08); pointer-events: none; z-index: 1; }
        .about-body { font-size: clamp(.88rem,1.3vw,1rem); line-height: 1.92; color: var(--text2); margin-bottom: 22px; }
        .about-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; font-size: clamp(.84rem,1.2vw,.96rem); color: var(--text2); }
        .about-list li { display: flex; align-items: center; gap: 10px; }
        .about-dot { color: var(--accent); font-size: .62rem; flex-shrink: 0; }
        .about-quote { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.95rem,1.6vw,1.15rem); color: var(--text2); border-left: 2px solid var(--accent); padding: 14px 20px; background: var(--accent-dim); border-radius: 0 var(--radius) var(--radius) 0; line-height: 1.68; box-shadow: -2px 0 12px rgba(0,229,255,.08); }

        /* ── SATURDAY ── */
        .sat-outer { position: relative; max-width: var(--container); margin: clamp(24px,4vw,48px) auto 0; }
        .sat-typeback {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(48px,10vw,160px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,229,255,0.05);
          white-space: nowrap; pointer-events: none; z-index: 0;
          letter-spacing: .06em; user-select: none;
          overflow: hidden; max-width: 100%;
        }
        [data-theme='light'] .sat-typeback { -webkit-text-stroke: 1px rgba(0,100,160,0.04); }
        .sat-wrap { position: relative; border-radius: calc(var(--radius)*1.5); overflow: hidden; box-shadow: var(--shadow); cursor: pointer; z-index: 1; }
        .sat-wrap img { width: 100%; height: clamp(280px,44vw,500px); object-fit: cover; filter: brightness(.5) saturate(.65); transition: filter .45s; }
        .sat-wrap:hover img { filter: brightness(.65) saturate(.8); }
        .sat-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,13,.95) 0%, transparent 55%); }
        .sat-info {
          position: absolute; bottom: clamp(14px,3vw,36px); left: clamp(14px,3vw,40px); right: clamp(14px,3vw,40px);
          display: flex; align-items: center; gap: clamp(10px,2vw,22px); flex-wrap: wrap;
        }
        .sat-label { font-size: .62rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }
        .sat-val { font-family: 'Instrument Serif', serif; font-size: clamp(.9rem,1.6vw,1.28rem); color: #fff; }
        .sat-badge { position: absolute; top: 16px; right: 16px; background: rgba(0,229,255,.1); backdrop-filter: blur(12px); border: 1px solid rgba(0,229,255,.25); color: var(--accent); font-size: .66rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; padding: 5px 14px; border-radius: 40px; }

        /* ── SCRIPTURES ── */
        .scriptures-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); backdrop-filter: blur(20px); }
        .scripture-stage { max-width: 760px; margin: clamp(32px,5vw,56px) auto 0; }
        .scripture-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: calc(var(--radius)*1.5); padding: clamp(28px,4vw,52px) clamp(24px,4vw,52px); text-align: center; position: relative; box-shadow: var(--shadow), 0 0 30px rgba(0,229,255,.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .scripture-quote { font-family: 'Instrument Serif', serif; font-size: clamp(3rem,7vw,5.5rem); line-height: .55; color: var(--accent); opacity: .15; margin-bottom: 8px; }
        .scripture-text { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(1.05rem,2.3vw,1.52rem); line-height: 1.75; color: var(--text); margin-bottom: 20px; }
        .scripture-ref { font-size: clamp(.72rem,1vw,.86rem); font-weight: 800; letter-spacing: .12em; color: var(--accent); text-transform: uppercase; }
        .scripture-dots { display: flex; gap: 7px; justify-content: center; margin-top: 22px; }
        .s-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; transition: background-color .25s; }
        .s-dot.active { background-color: var(--accent); box-shadow: 0 0 8px rgba(0,229,255,.5); }

        /* ── DOCUMENTS ── */
        .search-btn-mobile {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; min-height: 48px;
          background: var(--glass-bg); border: 1.5px solid var(--glass-border);
          border-radius: 40px; color: var(--text2);
          font-size: .88rem; font-weight: 600; cursor: pointer;
          margin-top: 24px;
          transition: border-color .2s, color .2s;
        }
        .search-btn-mobile:hover { border-color: var(--accent); color: var(--text); }
        .cmd-trigger { display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 40px; color: var(--text-muted); font-size: clamp(.78rem,1.2vw,.88rem); font-weight: 600; cursor: pointer; margin-top: 28px; transition: border-color .2s; min-width: min(320px, 90vw); justify-content: space-between; backdrop-filter: blur(16px); }
        .cmd-trigger:hover { border-color: var(--accent); color: var(--text); }
        .cmd-kbd { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); font-size: .66rem; font-weight: 700; padding: 2px 7px; border-radius: 5px; }
        .cmd-backdrop { position: fixed; inset: 0; z-index: 3000; background: rgba(13,13,13,.8); backdrop-filter: blur(10px); display: flex; align-items: flex-start; justify-content: center; padding: max(80px, 12vh) 16px 32px; }
        .cmd-palette { background: var(--surface-solid); border: 1px solid rgba(0,229,255,.15); border-radius: calc(var(--radius)*1.2); width: min(600px, 96vw); box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(0,229,255,.05); overflow: hidden; }
        .cmd-search-row { display: flex; align-items: center; gap: 10px; padding: 16px 20px; border-bottom: 1px solid var(--border); }
        .cmd-search-row svg { color: var(--text-muted); flex-shrink: 0; }
        .cmd-input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 1rem; font-family: inherit; }
        .cmd-input::placeholder { color: var(--text-muted); }
        .cmd-clear { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: .85rem; }
        .cmd-esc { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); font-size: .68rem; font-weight: 700; padding: 3px 9px; border-radius: 5px; cursor: pointer; flex-shrink: 0; }
        .cmd-results { max-height: 360px; overflow-y: auto; }
        .cmd-result-item { display: flex; align-items: center; gap: 12px; padding: 13px 20px; cursor: pointer; transition: background-color .15s; border-bottom: 1px solid var(--border); }
        .cmd-result-item:hover { background-color: var(--accent-dim); }
        .cmd-result-icon { font-size: 1rem; flex-shrink: 0; }
        .cmd-result-name { flex: 1; font-size: .88rem; font-weight: 600; color: var(--text); }
        .cmd-result-new { background-color: var(--accent); color: #0D0D0D; font-size: .58rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; padding: 2px 8px; border-radius: 40px; }
        .cmd-result-arrow { color: var(--text-muted); }
        .cmd-empty { padding: 24px 20px; text-align: center; color: var(--text-muted); font-size: .86rem; }
        .cmd-footer { display: flex; justify-content: space-between; padding: 10px 20px; border-top: 1px solid var(--border); font-size: .7rem; color: var(--text-muted); }
        .docs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(220px,22vw,290px),1fr)); gap: var(--gap); margin-top: clamp(28px,4vw,48px); max-width: var(--container); margin-left: auto; margin-right: auto; }
        .doc-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: clamp(18px,2.3vw,26px); position: relative; transition: border-color .25s; box-shadow: var(--shadow); backdrop-filter: blur(16px); }
        .doc-card:hover { border-color: rgba(0,229,255,.4); }
        .doc-num { font-size: .6rem; font-weight: 800; letter-spacing: .14em; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; }
        .doc-badge { position: absolute; top: 13px; right: 13px; background-color: var(--accent); color: #0D0D0D; font-size: .56rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; padding: 3px 9px; border-radius: 40px; }
        .doc-icon { font-size: 1.5rem; margin-bottom: 10px; }
        .doc-name { font-size: clamp(.82rem,1.15vw,.94rem); font-weight: 700; color: var(--text); line-height: 1.42; margin-bottom: 18px; }
        .doc-actions { display: flex; gap: 8px; }
        .doc-btn { flex: 1; padding: 10px 0; min-height: 40px; border-radius: var(--radius-sm); font-size: .72rem; font-weight: 800; letter-spacing: .05em; cursor: pointer; border: none; transition: opacity .2s; text-transform: uppercase; }
        .doc-view  { background-color: var(--accent); color: #0D0D0D; }
        .doc-share { background: transparent; border: 1px solid var(--glass-border) !important; color: var(--text2); }

        /* ── PDF MODAL ── */
        .pdf-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(13,13,13,.88); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .pdf-box { background: var(--surface-solid); border-radius: calc(var(--radius)*1.5); border: 1px solid rgba(0,229,255,.18); width: 100%; max-width: 860px; max-height: 92dvh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,.8), 0 0 40px rgba(0,229,255,.06); }
        .pdf-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 22px; border-bottom: 1px solid var(--border); gap: 12px; }
        .pdf-title { font-size: clamp(.84rem,1.3vw,.96rem); font-weight: 700; color: var(--text); }
        .pdf-close { background: transparent; border: 1px solid var(--border); color: var(--text); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: .8rem; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .pdf-close:hover { background-color: var(--accent); color: #0D0D0D; border-color: var(--accent); }
        .pdf-body { flex: 1; overflow: hidden; }
        .pdf-footer { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 16px; border-top: 1px solid var(--border); }
        .pdf-btn { flex: 1; min-width: 110px; padding: 10px 12px; min-height: 40px; border-radius: var(--radius-sm); font-size: .72rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; border: none; transition: opacity .2s; }
        .pdf-drive { background: transparent; border: 1px solid var(--glass-border) !important; color: var(--text); }
        .pdf-dl  { background-color: var(--accent); color: #0D0D0D; }
        .pdf-wa  { background: #25D366; color: #fff; }

        /* ── PRAYER MODE TOGGLE ── */
        .prayer-mode-toggle {
          display: flex; gap: 8px;
          background: var(--surface2);
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          padding: 5px;
          margin-bottom: 32px;
          max-width: 360px;
        }
        .pmt-btn {
          flex: 1; padding: 11px 16px; min-height: 44px;
          border-radius: 40px; border: none; cursor: pointer;
          font-size: .78rem; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
          color: var(--text-muted); background: transparent;
          transition: all .3s cubic-bezier(.4,0,.2,1);
        }
        .pmt-btn.active { background-color: var(--accent); color: #0D0D0D; box-shadow: 0 0 16px rgba(0,229,255,.35); }

        /* ── PRAYER SECTION ── */
        .prayer-wrap { max-width: 660px; margin: 0 auto; }
        .prayer-verse { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.9rem,1.4vw,1.05rem); color: var(--text2); line-height: 1.74; padding: 16px 22px; border-left: 2px solid var(--accent); background: var(--accent-dim); border-radius: 0 var(--radius) var(--radius) 0; margin: 20px 0 0; text-align: left; }
        .prayer-form { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: calc(var(--radius)*1.4); padding: clamp(22px,3.5vw,42px); margin-top: 32px; display: flex; flex-direction: column; gap: 16px; box-shadow: var(--shadow); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .severe-banner { display: flex; gap: 14px; align-items: flex-start; background: linear-gradient(135deg, rgba(0,229,255,.08), rgba(0,229,255,.04)); border: 1.5px solid rgba(0,229,255,.35); border-radius: var(--radius); padding: 18px 20px; box-shadow: 0 0 24px rgba(0,229,255,.1); }
        .severe-icon { font-size: 1.6rem; color: var(--accent); flex-shrink: 0; line-height: 1; margin-top: 2px; }
        .severe-title { font-weight: 800; color: var(--accent); font-size: .96rem; margin-bottom: 6px; letter-spacing: .04em; }
        .severe-verse { font-family: 'Instrument Serif', serif; font-style: italic; color: var(--text2); font-size: .9rem; line-height: 1.65; margin-bottom: 8px; }
        .severe-note { font-size: .76rem; color: var(--accent); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
        .identity-row { display: flex; align-items: center; gap: 12px; min-height: 52px; }
        .identity-left { flex: 1; }
        .identity-anon-state { display: flex; align-items: center; gap: 9px; }
        .anon-lock { font-size: 1rem; }
        .anon-active-label { font-size: .84rem; font-weight: 600; color: var(--text2); }
        .identity-toggle-wrap { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
        .toggle-label-text { font-size: .74rem; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
        .toggle { width: 46px; height: 26px; border-radius: 13px; background: var(--surface2); border: 1px solid var(--glass-border); cursor: pointer; position: relative; transition: background-color .25s; flex-shrink: 0; }
        .toggle.on { background-color: var(--accent); border-color: var(--accent); }
        .toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .28s cubic-bezier(.34,1.56,.64,1); box-shadow: 0 2px 6px rgba(0,0,0,.2); }
        .toggle.on .toggle-knob { transform: translateX(20px); }
        .contact-method-row { display: flex; flex-direction: column; gap: 8px; }
        .cm-label { font-size: .78rem; font-weight: 700; color: var(--text-muted); letter-spacing: .06em; text-transform: uppercase; }
        .cm-options { display: flex; gap: 8px; flex-wrap: wrap; }
        .cm-btn { flex: 1; min-width: 100px; padding: 10px 14px; min-height: 44px; border-radius: var(--radius-sm); border: 1px solid var(--glass-border); background: var(--surface2); color: var(--text-muted); font-size: .78rem; font-weight: 700; cursor: pointer; transition: all .2s; }
        .cm-btn.active { background-color: var(--accent-dim); color: var(--accent); border-color: rgba(0,229,255,.4); box-shadow: 0 0 12px rgba(0,229,255,.1); }
        .floating-field { position: relative; }
        .f-bare { width: 100%; padding: 18px 14px 6px; background: none; border: none; border-bottom: 1.5px solid var(--input-border); color: var(--text); font-size: .92rem; outline: none; transition: border-color .2s; }
        .f-bare:focus { border-color: var(--accent); }
        .f-bare::placeholder { color: transparent; }
        .floating-label { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); font-size: .88rem; color: var(--text-muted); pointer-events: none; transition: all .2s; transform-origin: left top; }
        .f-bare:focus + .floating-label, .f-bare:not(:placeholder-shown) + .floating-label, .floating-label.elevated { transform: translateY(-120%) scale(.78); color: var(--accent); }
        .f-bare.f-select { padding: 14px 14px; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234E6678' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; cursor: pointer; }
        .f-bare.f-select option { background: var(--surface-solid); color: var(--text); }
        .message-field { border-bottom: 1.5px solid var(--input-border); transition: border-color .2s; }
        .message-field:focus-within { border-color: var(--accent); }
        .f-bare-area { width: 100%; padding: 14px 14px; background: none; border: none; outline: none; resize: none; overflow: hidden; color: var(--text); font-size: .92rem; line-height: 1.7; min-height: 80px; }
        .f-bare-area::placeholder { color: var(--text-muted); }
        .form-controls-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .add-notes-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 1px solid var(--glass-border); color: var(--text-muted); font-size: .78rem; font-weight: 700; letter-spacing: .04em; padding: 9px 14px; min-height: 40px; border-radius: 40px; cursor: pointer; transition: color .2s, border-color .2s; }
        .add-notes-btn:hover { color: var(--accent); border-color: var(--accent); }
        .add-notes-icon { font-size: 1rem; line-height: 1; }
        .wall-check { display: flex; align-items: center; gap: 7px; cursor: pointer; font-size: .78rem; font-weight: 600; color: var(--text-muted); }
        .f-check { width: 15px; height: 15px; accent-color: var(--accent); cursor: pointer; }
        .privacy-notice { display: flex; align-items: flex-start; gap: 8px; font-size: .72rem; color: var(--text-muted); line-height: 1.55; padding: 11px 16px; background: var(--accent-dim); border-radius: var(--radius-sm); border: 1px solid rgba(0,229,255,.1); }
        .submit-btn { padding: 15px 32px; min-height: 52px; border-radius: 40px; background-color: var(--accent); color: #0D0D0D; font-size: .82rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; border: none; cursor: pointer; transition: background-color .2s; width: 100%; }
        .submit-btn:hover { background-color: var(--accent-warm); }
        .prayer-conf { background: var(--glass-bg); border: 1px solid rgba(0,229,255,.3); border-radius: calc(var(--radius)*1.4); padding: clamp(28px,4vw,52px); text-align: center; margin-top: 32px; box-shadow: 0 0 40px rgba(0,229,255,.08), var(--shadow); backdrop-filter: blur(20px); }
        .conf-icon { font-size: 2.4rem; margin-bottom: 14px; }
        .conf-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.1rem,2.2vw,1.5rem); color: var(--text); margin-bottom: 12px; }
        .conf-body { color: var(--text2); line-height: 1.75; font-size: .9rem; }
        .conf-wall { color: var(--accent); font-size: .78rem; margin-top: 12px; font-weight: 700; }

        /* ── PRAYER WALL ── */
        .prayer-wall { margin-top: clamp(36px,5vw,64px); }
        .pw-header { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
        .pw-cross { font-size: 1.7rem; color: var(--accent); text-shadow: 0 0 12px rgba(0,229,255,.4); }
        .pw-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.15rem,2.2vw,1.45rem); color: var(--text); }
        .pw-sub { font-size: .84rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 22px; }
        .pw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%,280px),1fr)); gap: var(--gap); }
        .pw-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); backdrop-filter: blur(16px); }
        .pw-top { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 12px; }
        .pw-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(0,229,255,.3); color: var(--accent); font-weight: 700; font-size: .74rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pw-meta { flex: 1; }
        .pw-name { font-weight: 700; font-size: .82rem; color: var(--text); }
        .pw-cat  { font-size: .68rem; color: var(--text-muted); margin-top: 2px; }
        .pw-time { font-size: .66rem; color: var(--text-muted); white-space: nowrap; flex-shrink: 0; }
        .pw-divider { height: 1px; background: var(--border); margin: 0 0 11px; }
        .pw-text { font-size: .82rem; color: var(--text2); line-height: 1.68; margin-bottom: 14px; }
        .pw-pray { padding: 8px 16px; min-height: 38px; border-radius: 40px; background: var(--accent-dim); border: 1px solid rgba(0,229,255,.25); color: var(--accent); font-size: .74rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; transition: background-color .2s, color .2s; }
        .pw-pray:hover { background-color: var(--accent); color: #0D0D0D; box-shadow: 0 0 12px rgba(0,229,255,.3); }
        .pw-pray:disabled { opacity: .55; cursor: default; }

        /* ── ANNOUNCEMENTS ── */
        .announce-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,4vw,56px); max-width: var(--container); margin: 0 auto; }
        @media (max-width:768px) { .announce-grid { grid-template-columns: 1fr; } }
        .ann-col-head { display: flex; align-items: center; gap: 13px; margin-bottom: 20px; }
        .ann-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(0,229,255,.25); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: .82rem; flex-shrink: 0; }
        .ann-title { font-family: 'Instrument Serif', serif; font-size: clamp(1.05rem,2vw,1.4rem); color: var(--text); }
        .ann-box { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); backdrop-filter: blur(16px); }
        .ann-img { width: 100%; height: 200px; object-fit: cover; }
        .ann-body { padding: clamp(14px,2.2vw,22px); }
        .ann-coming { font-size: .64rem; font-weight: 800; letter-spacing: .16em; color: var(--accent); text-transform: uppercase; margin-bottom: 6px; }
        .ann-host { font-size: clamp(.88rem,1.3vw,.98rem); font-weight: 700; color: var(--text); margin-bottom: 14px; }
        .ann-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ann-meta-item { display: flex; flex-direction: column; gap: 2px; }
        .ann-meta-l { font-size: .58rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); }
        .ann-meta-v { font-size: .78rem; font-weight: 700; color: var(--text2); }
        .ann-meta-v.accent { color: var(--accent); }
        .testi-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: clamp(16px,2.2vw,24px); margin-bottom: 13px; box-shadow: var(--shadow); transition: border-color .25s, transform .25s; backdrop-filter: blur(16px); }
        .testi-quote { font-family: 'Instrument Serif', serif; font-size: 2.6rem; line-height: .5; color: var(--accent); opacity: .18; margin-bottom: 8px; }
        .testi-text { font-style: italic; color: var(--text2); font-size: clamp(.8rem,1.15vw,.91rem); line-height: 1.75; margin-bottom: 14px; }
        .testi-author { display: flex; align-items: center; gap: 9px; }
        .testi-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--accent-dim); border: 1px solid rgba(0,229,255,.25); color: var(--accent); font-weight: 700; font-size: .7rem; display: flex; align-items: center; justify-content: center; }
        .testi-name { font-weight: 700; font-size: .82rem; color: var(--text); }
        .testi-loc  { font-size: .68rem; color: var(--text-muted); }

        /* ── SOCIAL ── */
        .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(clamp(140px,15vw,185px),1fr)); gap: var(--gap); max-width: var(--container); margin: clamp(28px,4vw,48px) auto 0; }
        .soc-card { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius); padding: clamp(18px,2.2vw,28px) 14px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 9px; box-shadow: var(--shadow); transition: border-color .25s; backdrop-filter: blur(16px); }
        .soc-card:hover { border-color: var(--accent); }
        .soc-name { font-weight: 700; font-size: .84rem; color: var(--text); }
        .soc-desc { font-size: .72rem; color: var(--text-muted); }

        /* ── JOIN ── */
        .join-sec { text-align: center; background: var(--surface); border-top: 1px solid var(--border); padding: var(--section-py) clamp(20px,5vw,48px); backdrop-filter: blur(20px); }

        /* ── FOOTER ── */
        footer { background: var(--surface-solid); border-top: 1px solid var(--border); }
        .vod { text-align: center; padding: clamp(32px,5vw,56px) clamp(20px,5vw,60px); border-bottom: 1px solid var(--border); max-width: 660px; margin: 0 auto; }
        .vod-label { font-size: .64rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        .vod-text { font-family: 'Instrument Serif', serif; font-style: italic; font-size: clamp(.98rem,1.9vw,1.28rem); color: var(--text); line-height: 1.75; margin-bottom: 12px; }
        .vod-ref  { font-size: .76rem; font-weight: 700; color: var(--text-muted); letter-spacing: .08em; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px clamp(18px,5vw,56px); gap: 14px; flex-wrap: wrap; }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-logo  { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1.5px solid rgba(0,229,255,.25); }
        .footer-brand-name { font-family: 'Instrument Serif', serif; font-size: .9rem; color: var(--text); }
        .footer-brand-sub  { font-size: .68rem; color: var(--text-muted); letter-spacing: .04em; }
        .footer-copy { font-size: .68rem; color: var(--text-muted); }

        /* ── VOTD PLAYER ── */
        .votd-player-wrap { position: relative; width: 100%; padding-top: 56.25%; background: var(--surface2); cursor: pointer; overflow: hidden; }
        .votd-player-wrap img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .votd-player-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
        .votd-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.18); transition: background .2s; }
        .votd-play svg { width: 76px; height: 76px; fill: rgba(255,255,255,.92); filter: drop-shadow(0 4px 20px rgba(0,0,0,.55)); transition: transform .22s; }
        .votd-player-wrap:hover .votd-play svg { transform: scale(1.09); }

        /* ── MOBILE SPECIFICS ── */
        @media (max-width:390px) {
          .hero-btns { flex-direction: column; align-items: center; gap: 12px; }
          .btn-primary, .btn-ghost { width: 100%; max-width: 280px; justify-content: center; }
          .prayer-mode-toggle { max-width: 100%; }
          .sat-typeback { font-size: clamp(40px,9vw,80px); }
          .docs-grid { grid-template-columns: 1fr 1fr; }
          .social-grid { grid-template-columns: 1fr 1fr; }
          .cm-options { flex-direction: column; }
          .cm-btn { min-width: unset; }
          .summary-thumb { padding-top: 52%; }
        }
        @media (max-width:640px) {
          .hero-btns { flex-wrap: wrap; justify-content: center; }
          .pdf-footer { flex-direction: column; }
          .pdf-btn { width: 100%; }
          .sat-info { flex-direction: column; align-items: flex-start; gap: 10px; }
          .summary-footer { flex-direction: column; }
          .summary-btn { width: 100%; }
        }

        /* ── ACCESSIBILITY ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,229,255,.4); }
      `}</style>
    </>
  );
}
