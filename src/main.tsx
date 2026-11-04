import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Heart, Sparkles, LockKeyhole, Check, Coffee, Flower2, Luggage, X, MapPin, Footprints, RotateCcw } from 'lucide-react';
import './style.css';

const chapters = [
  { title: 'Een frisse start', subtitle: 'Een beetje beweging, een beetje magie.', label: 'KOM IN BEWEGING', icon: Footprints, giftIcon: Coffee, gift: 'Een Nespresso-koffiebeker', message: 'Voor je favoriete koffie. Onderweg, na het sporten of gewoon lekker samen op de bank.', question: 'Even je hoofd leegmaken. Wat neem je mee voor een rondje sporten?', options: ['Sportschoenen, energie & een glimlach', 'Een dekbed en drie kussens', 'Een koffer voor drie weken'], answer: 0, hint: 'Je hoeft vandaag geen marathon te lopen. Kies wat bij bewegen past.' },
  { title: 'Een avond voor ons', subtitle: 'Het beste ingrediënt? Jij tegenover mij.', label: 'SCHUIF MAAR AAN', icon: Heart, giftIcon: Flower2, gift: 'Een heerlijk parfum', message: 'Een cadeautje helemaal voor jou. Voor een avond samen en alle mooie momenten die nog komen.', question: 'Los de anagram op. Waar neem ik je graag mee naartoe? Het woord is: T E U I T E N', word: 'uiteten', hint: 'Twee woorden: buiten de deur samen genieten van iets lekkers.' },
  { title: 'Even helemaal weg', subtitle: 'Nieuwe plekken. Nieuwe herinneringen. Samen.', label: 'HET AVONTUUR ROEPT', icon: MapPin, giftIcon: Luggage, gift: 'Een weekend weg met z’n tweeën', message: 'Tijd voor ons. Een tas inpakken, samen op pad en even helemaal niets moeten. De bestemming? Die houden we nog even spannend…', question: 'Van de Martinitoren tot de gezellige straatjes: in welke stad kunnen we samen op avontuur?', word: 'groningen', hint: 'De stad waar er niets boven gaat.' }
];
const key = 'naomi-birthday-progress-v1';
function readProgress() { try { const n = Number(localStorage.getItem(key)); return Number.isInteger(n) && n >= 0 && n <= 3 ? n : 0; } catch { return 0; } }
function App() {
 const [progress, setProgress] = useState(readProgress);
 const [active, setActive] = useState<number | null>(null);
 const [revealed, setRevealed] = useState(false);
 const [answer, setAnswer] = useState('');
 const [error, setError] = useState('');
 const [hint, setHint] = useState(false);
 const [reset, setReset] = useState(false);
 function open(i: number) { setActive(i); setRevealed(i < progress); setAnswer(''); setError(''); setHint(false); }
 function solve(value: string) {
  if (active === null) return;
  const c = chapters[active];
  const correct = c.options ? Number(value) === c.answer : value.toLowerCase().replace(/\s/g, '') === c.word;
  if (!correct) { setError('Bijna! Probeer het nog eens. Je mag zo vaak raden als je wilt.'); return; }
  const next = Math.max(progress, active + 1); setProgress(next); try { localStorage.setItem(key, String(next)); } catch { /* Play remains available without storage. */ } setRevealed(true);
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
   <section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> VANDAAG DRAAIT ALLES OM JOU</div><h1>Lieve Naomi,<br/>dit is jouw <em>avontuur.</em></h1><p>Drie verrassingen. Kleine uitdagingen.<br/>En heel veel mooie momenten met z’n tweeën.</p><p className="small-copy">Ik heb iets voor je verstopt. Volg de aanwijzingen, los de puzzels op en ontdek wat er op je wacht.</p><button className="primary" onClick={() => open(Math.min(progress, 2))}>{progress === 3 ? 'Bekijk je verrassingen' : progress ? 'Verder met ons avontuur' : 'Begin jouw avontuur'}<ArrowRight size={18}/></button><div className="love-note"><Heart size={14}/> Voor jou, van Sven</div></div><div className="hero-art" aria-label="Drie cadeaus speciaal voor Naomi"><span className="art-star one">✧</span><span className="art-star two">✦</span><span className="art-word">a little adventure<br/><i>for my favourite person</i></span><div className="orbit"/><div className="gift-box"><div className="ribbon vertical"/><div className="ribbon horizontal"/><div className="bow left"/><div className="bow right"/><div className="gift-tag">Voor jou ♡</div></div><div className="ticket"><Heart size={17}/><span>JIJ + IK<br/><b>de mooiste combinatie</b></span></div><span className="art-bottom">3 verrassingen, speciaal voor jou</span></div></section>
   <section className="journey" aria-labelledby="journey-title"><div className="section-top"><div><div className="eyebrow">STAP VOOR STAP, VERRASSING VOOR VERRASSING</div><h2 id="journey-title">Er wacht iets moois op je.</h2></div><div className="progress"><span>{progress} van 3 ontdekt</span><div className="progress-dots">{chapters.map((_, i) => <span className={i < progress ? 'done' : ''} key={i}/>)}</div></div></div><div className="cards">{chapters.map((c, i) => { const locked = i > progress; const done = i < progress; const Icon = c.icon; return <button className={`card card-${i} ${locked ? 'locked' : ''}`} disabled={locked} key={c.title} onClick={() => open(i)}><div className="card-top"><span>HOOFDSTUK 0{i + 1}</span><span className="status">{done ? <Check size={14}/> : locked ? <LockKeyhole size={13}/> : <Sparkles size={14}/>} {done ? 'Ontdekt' : locked ? 'Nog even geduld' : 'Klaar voor jou'}</span></div><div className="card-icon"><Icon size={34} strokeWidth={1.35}/></div><h3>{c.title}</h3><p>{c.subtitle}</p><div className="card-bottom">{done ? 'Bekijk jouw cadeau' : locked ? `Ontgrendel eerst hoofdstuk 0${i}` : 'Ontdek de eerste verrassing'}{locked ? <LockKeyhole size={16}/> : <ArrowRight size={18}/>}</div></button>; })}</div><p className="journey-note"><LockKeyhole size={13}/> Elke voltooide uitdaging opent een nieuwe verrassing. Neem lekker de tijd.</p></section>
   <section className="bottom-note"><Heart size={23} strokeWidth={1.4}/><p>Het mooiste cadeau is tijd met jou.</p><span>Maar deze verrassingen komen aardig in de buurt.</span></section>
  </main><footer><span>Gemaakt met liefde, speciaal voor Naomi ♡</span><button onClick={() => setReset(true)} aria-label="Voortgang opnieuw beginnen"><RotateCcw size={13}/> Opnieuw beginnen</button></footer>
  {chapter && active !== null && <div className="modal-backdrop" onClick={() => setActive(null)}><section className="modal" role="dialog" aria-modal="true" aria-label={revealed ? 'Jouw cadeau' : chapter.title} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') setActive(null); }}><button className="close" autoFocus onClick={() => setActive(null)} aria-label="Sluiten"><X/></button><div className="modal-icon">{revealed ? <chapter.giftIcon size={40}/> : <chapter.icon size={40}/>}</div><div className="eyebrow">{revealed ? 'VERRASSING VOOR JOU' : `HOOFDSTUK 0${active + 1} · ${chapter.label}`}</div><h2>{revealed ? chapter.gift : chapter.title}</h2><p>{revealed ? chapter.message : chapter.question}</p>{!revealed && <>{chapter.options ? <div className="options">{chapter.options.map((o, i) => <button key={o} onClick={() => solve(String(i))}>{o}<ArrowRight size={16}/></button>)}</div> : <form onSubmit={e => { e.preventDefault(); solve(answer); }}><label htmlFor="answer">Jouw antwoord</label><input id="answer" value={answer} onChange={e => { setAnswer(e.target.value); setError(''); }} placeholder="Ik denk dat het…" autoComplete="off" required/><button className="primary" type="submit">Onthul mijn cadeau <Sparkles size={17}/></button></form>}{error && <p className="error" role="alert">{error}</p>}<button className="hint-button" onClick={() => setHint(!hint)}>{hint ? 'Verberg de hint' : 'Een klein duwtje nodig?'}</button>{hint && <p className="hint">{chapter.hint}</p>}</>}{revealed && <><div className="gift-confirmation"><Check size={16}/> Dit cadeau is voor jou, lieve Naomi.</div><button className="primary" onClick={() => active < 2 ? open(active + 1) : setActive(null)}>{active < 2 ? 'Op naar de volgende' : 'Ons avontuur is pas begonnen'}<ArrowRight size={17}/></button></>}</section></div>}
  {reset && <div className="modal-backdrop"><section className="modal" role="dialog" aria-modal="true" aria-label="Opnieuw beginnen"><h2>Nog een keer spelen?</h2><p>Je voortgang en de geopende cadeaus worden op dit apparaat teruggezet.</p><button className="primary" onClick={() => { try { localStorage.removeItem(key); } catch {} setProgress(0); setReset(false); }}>Ja, opnieuw beginnen</button><button className="hint-button" autoFocus onClick={() => setReset(false)}>Bewaar mijn voortgang</button></section></div>}
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
