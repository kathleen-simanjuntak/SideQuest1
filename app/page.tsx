"use client";

import { useEffect, useState } from "react";
import {
  Aperture, BookOpen, Camera, Check, Clock3, Compass, Dices,
  Footprints, Home, Image, MapPin, Palette, RotateCcw,
  Search, Sparkles, Star, Sun, Users, Utensils, X,
} from "lucide-react";

type Screen = "home" | "quest" | "generated" | "join" | "journal";

const joinQuests = [
  { id: 1, title: "Casual Badminton", place: "1.2 km away", time: "6:00 PM today", players: "3/4", Icon: Aperture, tone: "coral" },
  { id: 2, title: "Street Art Quest", place: "CBD laneways", time: "4:30 PM today", players: "1/4", Icon: Palette, tone: "sage" },
  { id: 3, title: "Sunset Picnic", place: "2.3 km away", time: "5:00 PM today", players: "6/8", Icon: Sun, tone: "coral" },
  { id: 4, title: "Botanic Walk", place: "0.8 km away", time: "7:30 AM tomorrow", players: "2/6", Icon: Footprints, tone: "coral" },
  { id: 5, title: "Coffee & Sketch", place: "Riverfront", time: "10:00 AM Sat", players: "4/8", Icon: Palette, tone: "sage" },
  { id: 6, title: "Night Market", place: "Queen Victoria Market", time: "6:30 PM Sat", players: "8/12", Icon: Sparkles, tone: "coral" },
];

const steps = [
  { text: "Find a snack nobody at the table has tried", Icon: Utensils },
  { text: "Recreate a movie poster on the street", Icon: Image },
  { text: "Walk to a mystery location (revealed on arrival)", Icon: Footprints },
  { text: "Solve a clue to unlock the next stop", Icon: Search },
  { text: "Finish at a sunset spot", Icon: Camera },
];

const memories = [
  ["Sunset Hike", "2 days ago", "memory-pink"],
  ["Morning Coffee", "1 week ago", "memory-sage"],
  ["Street Art Quest", "2 weeks ago", "memory-gold"],
  ["Sunset Picnic", "1 month ago", "memory-lilac"],
];

function Decorations() {
  return <div className="decorations" aria-hidden="true">
    <Star className="d d1" /><Sparkles className="d d2" /><MapPin className="d d3" />
    <Compass className="d d4" /><Star className="d d5" /><Sparkles className="d d6" />
    <MapPin className="d d7" /><Star className="d d8" />
  </div>;
}

function BottomNav({ screen, go }: { screen: Screen; go: (screen: Screen) => void }) {
  const items = [
    ["home", "Home", Home], ["quest", "Quest", Compass],
    ["join", "Join", Users], ["journal", "Journal", BookOpen],
  ] as const;
  const active = screen === "generated" ? "quest" : screen;
  return <nav className="bottom-nav" aria-label="Main navigation">
    {items.map(([id, label, Icon]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)} aria-current={active === id ? "page" : undefined}>
      <Icon size={20} /><span>{label}</span>
    </button>)}
  </nav>;
}

function HomePage({ go }: { go: (screen: Screen) => void }) {
  const phrases = ["plot twist?", "side quest?", "adventure?", "me-time?", "new story?"];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex(index => (index + 1) % phrases.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [phrases.length]);

  return <main className="screen home-screen">
    <section className="home-copy">
      <div className="brand-mark"><Dices size={30} /></div>
      <p className="eyebrow"><Sun size={15} /> Hey, Jane!</p>
      <h1>Ready for today&apos;s<br /><em key={phrases[phraseIndex]}>{phrases[phraseIndex]}</em></h1>
      <button className="primary" onClick={() => go("quest")}><Dices size={17} /> Roll my quest</button>
    </section>
  </main>;
}

function Chip({ children, selected, onClick, Icon }: { children: React.ReactNode; selected?: boolean; onClick?: () => void; Icon?: React.ElementType }) {
  return <button className={`chip ${selected ? "selected" : ""}`} onClick={onClick}>{Icon && <Icon size={13} />} {children}</button>;
}

function QuestGenerator({ go }: { go: (screen: Screen) => void }) {
  const [mood, setMood] = useState("Adventurous");
  const [people, setPeople] = useState(["1-2 people", "30-60 min"]);
  const [interests, setInterests] = useState<string[]>([]);
  const togglePeople = (name: string) => setPeople(v => v.includes(name) ? v.filter(x => x !== name) : [...v, name]);
  const toggle = (name: string) => setInterests(v => v.includes(name) ? v.filter(x => x !== name) : [...v, name]);
  const reset = () => { setMood("Adventurous"); setPeople(["1-2 people", "30-60 min"]); setInterests([]); };
  return <main className="screen quest-generator">
    <section className="quest-content">
      <div className="quest-topbar">
        <button className="quest-home-button" onClick={() => go("home")} aria-label="Back to home"><Dices size={20} /></button>
        <button className="reset-button" onClick={reset}><RotateCcw size={13} /> Reset</button>
      </div>
      <h1 className="quest-heading">Your next adventure:</h1>
      <div className="preference-shell">
        <div className="preference-card">
          <div className="preference-section"><div className="preference-label"><span className="preference-label-title">People &amp; time</span><small>{people.length} selected</small></div><div className="chips">{["1-2 people", "30-60 min", "Any duration", "Solo", "3+ people"].map(x => <Chip key={x} selected={people.includes(x)} onClick={() => togglePeople(x)}>{x}</Chip>)}</div></div>
          <div className="preference-section"><div className="preference-label"><span className="preference-label-title">Mood</span><small>1 selected</small></div><div className="chips">{["Adventurous", "Chill", "Creative", "Social", "Spontaneous"].map(x => <Chip key={x} selected={mood === x} onClick={() => setMood(x)}>{x}</Chip>)}</div></div>
          <div className="preference-section"><div className="preference-label"><span className="preference-label-title">Interests</span><small>{interests.length} selected</small></div><div className="chips">{["Food", "Nature", "Games", "Art", "Music"].map(x => <Chip key={x} selected={interests.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</div></div>
        </div>
      </div>
      <button className="primary wide" onClick={() => go("generated")}><Dices size={17} /> Roll my quest</button>
    </section>
  </main>;
}

function GeneratedQuest({ active, start }: { active: boolean; start: () => void }) {
  return <main className="screen generated-screen">
    <section className="generated-content">
      <h1>QUEST #509</h1>
      <p className="generated-subtitle">The CBD Gauntlet</p>
      <article className="generated-card">
        <p className="quest-label">QUEST #0417 — CHAOTIC · 2HR</p>
        <h2>The CBD Gauntlet</h2>
        <div className="divider" />
        <ol>{steps.map(({ text, Icon }, i) => <li key={text}><span className={`step-icon s${i}`}><Icon size={15} /></span><span>{text}</span></li>)}</ol>
        <button className={`primary wide ${active ? "started" : ""}`} onClick={start}>{active ? <><Check size={17} /> QUEST ACTIVE</> : "START QUEST"}</button>
      </article>
      {active && <p className="success-note">Your adventure is live — have fun out there!</p>}
    </section>
  </main>;
}

function JoinQuest({ joined, toggleJoin }: { joined: number[]; toggleJoin: (id: number) => void }) {
  return <main className="screen join-screen">
    <section className="join-content">
      <header className="join-header"><span className="join-avatar">J</span><div><h1>Join a Quest</h1><p>Browse nearby adventures</p></div></header>
      <div className="quest-list">{joinQuests.map(({ id, title, place, time, players, tone }) => {
        const isJoined = joined.includes(id);
        return <article key={id} className={`join-card ${tone} ${isJoined ? "is-joined" : ""}`}>
          <div className="join-card-top"><h2>{title}</h2><button className="player-badge" onClick={() => toggleJoin(id)} aria-label={`${isJoined ? "Leave" : "Join"} ${title}`}>{players}</button></div>
          <p><MapPin size={13} />{place}</p><p><Clock3 size={13} />{time}</p>
        </article>;
      })}</div>
    </section>
  </main>;
}

function Journal({ xp }: { xp: number }) {
  const pct = Math.min(100, Math.max(8, (xp / 1500) * 100));
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  const selectedMemoryItem = memories.find(([title]) => title === selectedMemory);
  const selectedMemoryIndex = selectedMemory ? memories.findIndex(([title]) => title === selectedMemory) : -1;
  const badges = [
    [Sparkles, "First Quest"], [MapPin, "Explorer"], [Users, "Joiner"],
    [BookOpen, "Journalist"], [Compass, "Navigator"], [Star, "Starlight"],
  ] as const;
  return <main className="screen journal-screen">
    <div className="journal-hero">
      <div className="journal-profile"><span className="journal-avatar">J</span><div><h1>Jane</h1><p>Explorer · {xp} XP</p></div><span className="level-pill"><Sparkles size={13} /> Level 2</span></div>
      <div className="progress-heading"><strong>XP Progress</strong><span>{xp} / 2000</span></div>
      <div className="xp-track"><span style={{ width: `${pct}%` }} /></div>
      <div className="xp-labels"><span>Rookie<small>0 XP</small></span><span>Explorer<small>200 XP</small></span><span>Adventurer<small>1500 XP</small></span><span>Icon<small>6000 XP</small></span></div>
    </div>
    <section className="journal-body">
      <div className="journal-section-heading"><h2>Badge Collection</h2><span>2 earned</span></div>
      <div className="badges">{badges.map(([Icon, label], i) => <button className={`badge-card ${i < 2 ? "earned" : ""} ${selectedBadge === label ? "selected" : ""}`} key={label} onClick={() => setSelectedBadge(selectedBadge === label ? null : label)} aria-pressed={selectedBadge === label}><span><Icon size={22} /></span><strong>{label}</strong></button>)}</div>
      <div className="journal-section-heading"><h2>Jane&apos;s Memory Lane</h2><span>See all</span></div>
      <div className="memory-lane">{memories.map(([title, meta, tone], i) => <button className={`${tone} ${selectedMemory === title ? "selected" : ""}`} key={title} onClick={() => setSelectedMemory(selectedMemory === title ? null : title)} aria-pressed={selectedMemory === title}><div className="memory-art"><span>{i % 2 ? <Camera /> : <Utensils />}</span></div><div className="memory-caption"><h3>{title}</h3><p>{meta}</p></div></button>)}</div>
    </section>
    {selectedMemoryItem && <div className="memory-preview" role="dialog" aria-modal="true" aria-label={`${selectedMemoryItem[0]} preview`}>
      <button className="memory-preview-backdrop" onClick={() => setSelectedMemory(null)} aria-label="Close memory preview" />
      <div className={`memory-preview-card ${selectedMemoryItem[2]}`}>
        <button className="memory-preview-close" onClick={() => setSelectedMemory(null)} aria-label="Close memory preview"><X size={18} /></button>
        <div className="memory-preview-art"><span>{selectedMemoryIndex % 2 ? <Camera size={34} /> : <Utensils size={34} />}</span></div>
        <h2>{selectedMemoryItem[0]}</h2>
        <p>{selectedMemoryItem[1]}</p>
      </div>
    </div>}
  </main>;
}

export default function SideQuestApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [joined, setJoined] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("sidequest-joined") || "[]"); } catch { return []; }
  });
  const [activeQuest, setActiveQuest] = useState(false);
  useEffect(() => { localStorage.setItem("sidequest-joined", JSON.stringify(joined)); }, [joined]);
  const toggleJoin = (id: number) => setJoined(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  const start = () => setActiveQuest(true);
  const xp = 231 + joined.length * 35 + (activeQuest ? 50 : 0);

  return <div className="page-frame">
    <div className="phone-app">
      <Decorations />
      {screen === "home" && <HomePage go={setScreen} />}
      {screen === "quest" && <QuestGenerator go={setScreen} />}
      {screen === "generated" && <GeneratedQuest active={activeQuest} start={start} />}
      {screen === "join" && <JoinQuest joined={joined} toggleJoin={toggleJoin} />}
      {screen === "journal" && <Journal xp={xp} />}
      <BottomNav screen={screen} go={setScreen} />
    </div>
  </div>;
}

