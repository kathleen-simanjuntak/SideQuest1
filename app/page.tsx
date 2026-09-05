"use client";

import { useEffect, useState } from "react";
import {
  Aperture, Bike, BookOpen, Camera, Check, Clock3, Compass, Dices,
  DollarSign, Footprints, Home, Image, MapPin, Music2, Palette,
  Search, Sparkles, Star, Sun, Users, Utensils,
} from "lucide-react";

type Screen = "home" | "quest" | "generated" | "join" | "journal";

const joinQuests = [
  { id: 1, title: "Casual badminton", place: "1.2 km away", time: "6:00 PM today", players: "3/4 players", Icon: Aperture, tone: "coral" },
  { id: 2, title: "Street Art Quest", place: "CBD laneways", time: "4:30 PM today", players: "1/4 players", Icon: Palette, tone: "sage" },
  { id: 3, title: "Sunset Picnic", place: "2.3 km away", time: "5:00 PM today", players: "6/8 players", Icon: Sun, tone: "coral" },
];

const steps = [
  { text: "Find a snack nobody at the table has tried", Icon: Utensils },
  { text: "Recreate a movie poster on the street", Icon: Image },
  { text: "Walk to a mystery location (revealed on arrival)", Icon: Footprints },
  { text: "Solve a clue to unlock the next stop", Icon: Search },
  { text: "Finish at a sunset spot", Icon: Camera },
];

const memories = [
  ["Food Challenge", "4:02 PM · Verified", "memory-pink"],
  ["Photo Challenge", "4:35 PM · Verified", "memory-sage"],
  ["Street Art Quest", "5:10 PM · Verified", "memory-gold"],
  ["Sunset Picnic", "6:21 PM · Verified", "memory-lilac"],
];

function Decorations() {
  return <div className="decorations" aria-hidden="true">
    <Star className="d d1"/><Sparkles className="d d2"/><MapPin className="d d3"/>
    <Compass className="d d4"/><Star className="d d5"/><Sparkles className="d d6"/>
    <MapPin className="d d7"/><Star className="d d8"/>
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
      <Icon size={20}/><span>{label}</span>
    </button>)}
  </nav>;
}

function HomePage({ go }: { go: (screen: Screen) => void }) {
  return <main className="screen home-screen">
    <section className="home-copy">
      <div className="brand-mark"><Dices size={30}/></div>
      <p className="eyebrow"><Sun size={15}/> Hey, Jane!</p>
      <h1>Ready for today&apos;s<br/><em>plot twist?</em></h1>
      <button className="primary" onClick={() => go("quest")}><Dices size={17}/> Roll my quest</button>
      <button className="secondary" onClick={() => go("quest")}><Sparkles size={17}/> Mystery Plan</button>
    </section>
  </main>;
}

function Chip({ children, selected, onClick, Icon }: { children: React.ReactNode; selected?: boolean; onClick?: () => void; Icon?: React.ElementType }) {
  return <button className={`chip ${selected ? "selected" : ""}`} onClick={onClick}>{Icon && <Icon size={13}/>} {children}</button>;
}

function QuestGenerator({ go }: { go: (screen: Screen) => void }) {
  const [mood, setMood] = useState("Chaotic");
  const [interests, setInterests] = useState(["Food", "Photo"]);
  const toggle = (name: string) => setInterests(v => v.includes(name) ? v.filter(x => x !== name) : [...v, name]);
  return <main className="screen quest-generator">
    <section className="quest-content">
      <p className="eyebrow strong">Your Next Quest Awaits <Sparkles size={14}/></p>
      <div className="preference-shell">
        <div className="preference-card">
          <label>People &amp; time</label>
          <div className="summary-row"><span><Users/> 3 people</span><span><Clock3/> 2 hours</span><span><DollarSign/> $15</span></div>
          <label>Mood</label>
          <div className="chips">{["Chaotic","Chill","Competitive","Artsy"].map(x => <Chip key={x} selected={mood === x} onClick={() => setMood(x)}>{x}</Chip>)}</div>
          <label>Interests</label>
          <div className="chips">
            {[["Food",Utensils],["Photo",Camera],["Music",Music2],["Active",Bike]].map(([x,I]) => <Chip key={x as string} Icon={I as React.ElementType} selected={interests.includes(x as string)} onClick={() => toggle(x as string)}>{x}</Chip>)}
          </div>
        </div>
      </div>
      <button className="primary wide" onClick={() => go("generated")}><Dices size={17}/> Roll my quest</button>
    </section>
  </main>;
}

function GeneratedQuest({ active, start }: { active: boolean; start: () => void }) {
  return <main className="screen generated-screen">
    <section className="generated-content">
      <h1>QUEST #509</h1>
      <article className="generated-card">
        <p className="quest-label">QUEST #0417 — CHAOTIC · 2HR</p>
        <h2>The CBD Gauntlet</h2>
        <div className="divider"/>
        <ol>{steps.map(({text, Icon}, i) => <li key={text}><span className={`step-icon s${i}`}><Icon size={15}/></span><span>{text}</span></li>)}</ol>
      </article>
      <button className={`primary wide ${active ? "started" : ""}`} onClick={start}>{active ? <><Check size={17}/> QUEST ACTIVE</> : "START QUEST"}</button>
      {active && <p className="success-note">Your adventure is live — have fun out there!</p>}
    </section>
  </main>;
}

function JoinQuest({ joined, toggleJoin }: { joined: number[]; toggleJoin: (id: number) => void }) {
  return <main className="screen join-screen">
    <section className="join-content">
      <h1><span className="title-icon"><Users size={27}/></span> Join a Quest</h1>
      <div className="quest-list">{joinQuests.map(({id,title,place,time,players,Icon,tone}) => {
        const isJoined = joined.includes(id);
        return <article key={id} className={`join-card ${tone} ${isJoined ? "is-joined" : ""}`}>
          <div className="join-card-top"><Icon size={31}/><h2>{title}</h2></div>
          <p><MapPin size={13}/>{place}</p><p><Clock3 size={13}/>{time}</p>
          <div className="join-footer"><span>{players}</span><button onClick={() => toggleJoin(id)}>{isJoined ? <><Check size={14}/> Joined</> : "Join"}</button></div>
        </article>;
      })}</div>
    </section>
  </main>;
}

function Journal({ xp }: { xp: number }) {
  const pct = Math.min(100, Math.max(8, (xp / 1500) * 100));
  return <main className="screen journal-screen">
    <div className="journal-hero">
      <div className="brand-mark small"><Dices size={28}/></div>
      <h1>Explorer - {xp} XP</h1>
      <div className="xp-track"><span style={{width: `${pct}%`}}/></div>
      <div className="xp-labels"><span>Rookie<small>0 XP</small></span><span>Explorer<small>200 XP</small></span><span>Adventurer<small>1500 XP</small></span><span>Icon<small>6000 XP</small></span></div>
    </div>
    <section className="journal-body">
      <h2>Badge Collection</h2>
      <div className="badges">{[Star,Camera,Utensils,Palette,Sun,Compass].map((Icon,i) => <div className={i < 2 ? "earned" : ""} key={i}><Icon size={27}/></div>)}</div>
      <h2>Jane&apos;s Memory Lane</h2>
      <div className="memory-lane">{memories.map(([title,meta,tone],i) => <article className={tone} key={title}><div className="memory-art"><span>{i % 2 ? <Camera/> : <Utensils/>}</span></div><h3>{title}</h3><p>{meta}</p></article>)}</div>
    </section>
  </main>;
}

export default function SideQuestApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [joined, setJoined] = useState<number[]>([]);
  const [activeQuest, setActiveQuest] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { setJoined(JSON.parse(localStorage.getItem("sidequest-joined") || "[]")); setActiveQuest(localStorage.getItem("sidequest-active") === "true"); } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem("sidequest-joined", JSON.stringify(joined)); }, [joined, hydrated]);
  const toggleJoin = (id: number) => setJoined(v => v.includes(id) ? v.filter(x => x !== id) : [...v,id]);
  const start = () => { setActiveQuest(true); localStorage.setItem("sidequest-active", "true"); };
  const xp = 231 + joined.length * 35 + (activeQuest ? 50 : 0);

  return <div className="page-frame">
    <div className="phone-app">
      <Decorations/>
      {screen === "home" && <HomePage go={setScreen}/>}
      {screen === "quest" && <QuestGenerator go={setScreen}/>}
      {screen === "generated" && <GeneratedQuest active={activeQuest} start={start}/>}
      {screen === "join" && <JoinQuest joined={joined} toggleJoin={toggleJoin}/>}
      {screen === "journal" && <Journal xp={xp}/>}
      <BottomNav screen={screen} go={setScreen}/>
    </div>
  </div>;
}

