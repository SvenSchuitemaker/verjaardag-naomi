import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Heart, Sparkles, LockKeyhole, Check, Coffee, Flower2, Luggage, X, MapPin, Footprints, RotateCcw } from 'lucide-react';
import './style.css';

const chapters = [
  { title: "Plan een sportdag", subtitle: "Plan een dag dat we samen gaan sporten.", label: "SAMEN SPORTEN", gift: "Een Nespresso-koffiebeker", message: "Voor je favoriete koffie. Onderweg, na het sporten of gewoon lekker samen op de bank.", question: "Plan een dag dat we samen gaan sporten. Pak onze agenda’s erbij en kies samen met mij een dag. 💪", codeHash: "483d004fa89ac9c902600c9f2f3edd6a97ff112c7b0be4dfe08afac166c674b1", icon: Footprints, giftIcon: Coffee },
  { title: "Plan een avond uit eten", subtitle: "Plan een avond dat we samen uit eten gaan.", label: "SAMEN UIT ETEN", gift: "Een heerlijk parfum", message: "Een cadeautje helemaal voor jou. Voor een avond samen en alle mooie momenten die nog komen.", question: "Plan een avond dat we samen uit eten gaan. Kies samen met mij een avond voor een gezellige tafel voor twee. 🍽️", codeHash: "8fb5f8da2a26a21813f02dd7310230910bf89b0fa8bebf59fa3e05adcacbcda7", icon: Heart, giftIcon: Flower2 },
  { title: "Plan een weekend weg", subtitle: "Plan een weekend weg met z’n tweeën.", label: "EEN WEEKEND SAMEN", gift: "Een weekend weg met z’n tweeën", message: "Tijd voor ons. Een tas inpakken, samen op pad en even helemaal niets moeten. De bestemming? Die houden we nog even spannend…", question: "Plan een weekend weg met z’n tweeën. Kijk samen met mij wanneer we allebei vrij zijn en zet het in onze agenda’s. ❤️", codeHash: "5146a9f720543cf9d79ccfe766076d381be7d2fadccb4d24d2b50e270bb1eab4", icon: MapPin, giftIcon: Luggage },
];
const key = 'naomi-birthday-activities-v2';
function readProgress() { try { const n = Number(localStorage.getItem(key)); return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0; } catch { return 0; } }
function App() {
 const [progress, setProgress] = useState(readProgress);
 const [active, setActive] = useState<number | null>(null);
 const [revealed, setRevealed] = useState(false);
 const [answer, setAnswer] = useState('');
 const [error, setError] = useState('');
 const [checking, setChecking] = useState(false);
 const [reset, setReset] = useState(false);
 function open(i: number) { setActive(i); setRevealed(i < progress); setAnswer(''); setError(''); }
 async function solve(value: string) {
  if (active === null || checking) return;
  const current = active;
  setChecking(true); setError('');
  try {
   const normalized = value.toLowerCase().replace(/[\s-]/g, '');
   const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized));
   const hash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
   if (hash !== chapters[current].codeHash) { setError('Deze code klopt nog niet. Gebruik de code die je na het plannen van Sven krijgt.'); return; }
   const next = Math.max(progress, current + 1); setProgress(next);
   try { localStorage.setItem(key, String(next)); } catch { /* Activities remain available without storage. */ }
   setRevealed(true);
  } catch { setError('De code kon niet worden gecontroleerd. Probeer het opnieuw.'); }
  finally { setChecking(false); }
 }
 const previousFocus = useRef<HTMLElement | null>(null);
 useEffect(() => {
  if (active === null && !reset) return;
  previousFocus.current = document.activeElement as HTMLElement;
  const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
  const onKey = (e: KeyboardEvent) => {
   if (e.key === 'Escape') { setActive(null); setReset(false); }
   if (e.key === 'Tab') {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[role=dialog] button:not(:disabled), [role=dialog] input'));
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
   }
  };
  document.addEventListener('keydown', onKey);
  return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); previousFocus.current?.focus(); };
 }, [active, reset]);
 const chapter = active === null ? null : chapters[active];
 return <>
  <header><a className="brand" href="#"><Heart size={19} fill="currentColor"/> voor Naomi<span>MET LIEFDE GEMAAKT</span></a><span className="header-note">Een verjaardag om te onthouden <Sparkles size={15}/></span></header>
  <main>
   <section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> VANDAAG DRAAIT ALLES OM JOU</div><h1>Lieve Naomi,<br/>dit is jouw <em>avontuur.</em></h1><p>Drie verrassingen. Kleine uitdagingen.<br/>En heel veel mooie momenten met z’n tweeën.</p><p className="small-copy">Ik heb iets voor je verstopt. Plan onze momenten samen. Zodra we een datum hebben afgesproken, krijg je van mij een geheime code voor jouw verrassing.</p><button className="primary" onClick={() => open(Math.min(progress, 2))}>{progress === 3 ? 'Bekijk je verrassingen' : progress ? 'Verder met ons avontuur' : 'Begin jouw avontuur'}<ArrowRight size={18}/></button><div className="love-note"><Heart size={14}/> Voor jou, van Sven</div></div><div className="hero-art" aria-label="Drie cadeaus speciaal voor Naomi"><span className="art-star one">✧</span><span className="art-star two">✦</span><span className="art-word">a little adventure<br/><i>for my favourite person</i></span><div className="orbit"/><div className="gift-box"><div className="ribbon vertical"/><div className="ribbon horizontal"/><div className="bow left"/><div className="bow right"/><div className="gift-tag">Voor jou ♡</div></div><div className="ticket"><Heart size={17}/><span>JIJ + IK<br/><b>de mooiste combinatie</b></span></div><span className="art-bottom">3 verrassingen, speciaal voor jou</span></div></section>
   <section className="journey" aria-labelledby="journey-title"><div className="section-top"><div><div className="eyebrow">STAP VOOR STAP, VERRASSING VOOR VERRASSING</div><h2 id="journey-title">Er wacht iets moois op je.</h2></div><div className="progress"><span>{progress} van 3 ontdekt</span><div className="progress-dots">{chapters.map((_, i) => <span className={i < progress ? 'done' : ''} key={i}/>)}</div></div></div><div className="planning-steps">{chapters.map((c, i) => {
 const locked = i > progress; const done = i < progress; const Icon = c.icon;
 return <article className={`planning-pair card-${i}`} key={c.title}>
  <button className={`card planning-task ${locked ? 'locked' : ''}`} disabled={locked} onClick={() => open(i)}>
   <div className="card-top"><span>OPDRACHT 0{i + 1}</span><span className="status">{done ? <Check size={14}/> : locked ? <LockKeyhole size={13}/> : <Sparkles size={14}/>} {done ? 'Gepland' : locked ? 'Straks aan de beurt' : 'Samen plannen'}</span></div>
   <div className="planning-task-body"><div className="card-icon"><Icon size={30} strokeWidth={1.35}/></div><div><h3>{c.title}</h3><p>{c.subtitle}</p></div></div>
   <div className="card-bottom">{done ? 'Bekijk jouw verrassing' : locked ? `Open eerst cadeau 0${i}` : 'Bekijk jouw opdracht'}{locked ? <LockKeyhole size={16}/> : <ArrowRight size={18}/>}</div>
  </button>
  <div className="planning-connector" aria-hidden="true"/>
  <button className={`locked-gift ${done ? 'gift-open' : ''}`} disabled={locked} onClick={() => open(i)} aria-label={done ? `Bekijk cadeau ${i + 1}` : `Cadeau ${i + 1} op slot${locked ? '' : ', vul je code in'}`}>
   <span className="gift-lock-icon">{done ? <Check size={23}/> : <LockKeyhole size={23}/>}</span>
   <span><span className="gift-label">CADEAU 0{i + 1}</span><strong>{done ? 'Jouw verrassing is geopend' : 'Cadeau op slot'}</strong><span className="gift-description">{done ? 'Bekijk jouw cadeau nog eens.' : 'Wat het is? Dat blijft nog even geheim.'}</span></span>
   {!locked && <ArrowRight size={18}/>}
  </button>
 </article>;
})}</div><p className="journey-note"><LockKeyhole size={13}/> Datum afgesproken? Sven geeft je de code voor jouw verrassing.</p></section>
   <section className="bottom-note"><Heart size={23} strokeWidth={1.4}/><p>Het mooiste cadeau is tijd met jou.</p><span>Maar deze verrassingen komen aardig in de buurt.</span></section>
  </main><footer><span>Gemaakt met liefde, speciaal voor Naomi ♡</span><button onClick={() => setReset(true)} aria-label="Voortgang opnieuw beginnen"><RotateCcw size={13}/> Opnieuw beginnen</button></footer>
  {chapter && active !== null && <div className="modal-backdrop" onClick={() => setActive(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={revealed ? 'Jouw cadeau' : chapter.title} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setActive(null); }}><button className="close" autoFocus onClick={() => setActive(null)} aria-label="Sluiten"><X/></button><div className="modal-icon">{revealed ? <chapter.giftIcon size={40}/> : <chapter.icon size={40}/>}</div><div className="eyebrow">{revealed ? 'VERRASSING VOOR JOU' : `HOOFDSTUK 0${active + 1} · ${chapter.label}`}</div><h2>{revealed ? chapter.gift : chapter.title}</h2><p>{revealed ? chapter.message : chapter.question}</p>{!revealed && <><div className="hint"><p>Hebben we samen een datum afgesproken? Dan krijg je van mij een geheime code. Tot die tijd blijft jouw cadeau nog even een verrassing. ♡</p></div><form onSubmit={e => { e.preventDefault(); void solve(answer); }}><label htmlFor="answer">Geheime code van Sven</label><input id="answer" value={answer} onChange={e => { setAnswer(e.target.value); setError(''); }} placeholder="Vul hier je code in" autoComplete="off" spellCheck={false} required disabled={checking}/><button className="primary" type="submit" disabled={checking}>{checking ? 'Even controleren…' : 'Open mijn verrassing'} <Sparkles size={17}/></button></form>{error && <p className="error" role="alert">{error}</p>}</>}{revealed && <><div className="gift-confirmation"><Check size={16}/> Dit cadeau is voor jou, lieve Naomi.</div><button className="primary" onClick={() => active < 2 ? open(active + 1) : setActive(null)}>{active < 2 ? 'Op naar de volgende' : 'Ons avontuur is pas begonnen'}<ArrowRight size={17}/></button></>}</section></div>}
  {reset && <div className="modal-backdrop"><section className="modal" role="dialog" aria-modal="true" aria-label="Opnieuw beginnen"><h2>Nog een keer spelen?</h2><p>Je voortgang en de geopende cadeaus worden op dit apparaat teruggezet.</p><button className="primary" onClick={() => { try { localStorage.removeItem(key); } catch {} setProgress(0); setReset(false); }}>Ja, opnieuw beginnen</button><button className="hint-button" autoFocus onClick={() => setReset(false)}>Bewaar mijn voortgang</button></section></div>}
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
