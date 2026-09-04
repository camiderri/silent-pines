"use client";

import { useState, useEffect } from "react";
import { CloudRain, Thermometer, Eye, Users } from "lucide-react";export default function Home() {
  const instagramUrl = "#";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [tooltipPoint, setTooltipPoint] = useState(null);
  const [supportsHover, setSupportsHover] = useState(false);
  const [visitorId, setVisitorId] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    setSupportsHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    const storedVisitorId = localStorage.getItem("silentPinesVisitorId");
    if (storedVisitorId) {
      setVisitorId(storedVisitorId);
    }
  }, []);

  const generateVisitorId = () => {
    const storedVisitorId = localStorage.getItem("silentPinesVisitorId");
    if (storedVisitorId) {
      setVisitorId(storedVisitorId);
      return;
    }
    const newVisitorId = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
    localStorage.setItem("silentPinesVisitorId", newVisitorId);
    setVisitorId(newVisitorId);
  };

  const mapPoints = [
    {
      id: "point-schedule",
      left: "30%",
      top: "92%",
      image: "/images/door.jpg",
      title: "Bus Stop",
      caption: "Once a day. Last stop unmarked.",
    },
    {
      id: "point-phone",
      left: "25%",
      top: "40%",
      image: "/images/phone.jpg",
      title: "Payphone",
      caption: "Location approximate.",
    },
    {
      id: "point-road",
      left: "56%",
      top: "44%",
      image: "/images/road.jpg",
      title: "The Road",
      caption: "Stay on it after dark.",
    },
    {
      id: "point-services",
      left: "63%",
      top: "68%",
      image: "/images/gas.jpg",
      title: "Services",
      caption: "Availability varies.",
    },
  ];

  useEffect(() => {
    if (!activePoint) return;
    const timer = setTimeout(() => setActivePoint(null), 3000);
    return () => clearTimeout(timer);
  }, [activePoint]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest("[data-tooltip-card]")) {
        setTooltipPoint(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
    {/* Мобильное меню */}
    {menuOpen && (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#17201E] px-8 py-6 text-stone-200 md:hidden">
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-stone-300"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <nav className="mt-12 flex flex-col gap-6 text-sm tracking-widest">
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">ABOUT</a>
          <a href="#places" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">PLACES</a>
          <a href="#guide" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">VISITOR GUIDE</a>
          <a href="#map" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">MAP</a>
          <a href="#stay" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">PLAN YOUR STAY</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-stone-100">CONTACT</a>
        </nav>
      </div>
    )}

      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="text-sm font-semibold tracking-widest">
          SILENT PINES
          <span className="block text-xs font-normal tracking-wider text-stone-500">
            TOURISM OFFICE
          </span>
        </div>
        <nav className="hidden gap-6 text-xs tracking-wider text-stone-600 md:flex">
          <a href="#about" className="hover:text-stone-900">ABOUT</a>
          <a href="#places" className="hover:text-stone-900">PLACES</a>
          <a href="#guide" className="hover:text-stone-900">VISITOR GUIDE</a>
          <a href="#map" className="hover:text-stone-900">MAP</a>
          <a href="#stay" className="hover:text-stone-900">PLAN YOUR STAY</a>
          <a href="#contact" className="hover:text-stone-900">CONTACT</a>
        </nav>         {/* Кнопка-гамбургер — только на мобильном */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-stone-700 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-stone-700"></span>
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-700"></span>
          <span className="mt-1.5 block h-0.5 w-6 bg-stone-700"></span>
        </button>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="relative flex min-h-[80vh] items-center bg-cover bg-center px-8"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-xl">
          <h1 className="font-serif text-6xl tracking-widest text-stone-100">
            SILENT PINES
          </h1>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-stone-200">
            A quiet town surrounded by forest, fog and stories.
          </p>
          <button
            onClick={() => {
              generateVisitorId();
              setShowRegistration(true);
            }}
            className="mt-8 inline-flex items-center gap-2 border border-stone-200/70 bg-white/10 px-10 py-3 text-xs tracking-widest text-stone-100 backdrop-blur-sm transition hover:bg-white/20"
          >
            PLAN YOUR VISIT
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </section>

      {/* ===== VISITOR REGISTRATION ===== */}
      {showRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowRegistration(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm border border-stone-300 bg-[#f5f1e8] px-6 py-8 text-stone-800 shadow-sm sm:px-8"
          >
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-stone-500">
              Silent Pines Tourism Office
            </p>
            <h3 className="mt-1 text-center font-serif text-xl text-stone-800">
              Visitor Registration
            </h3>

            <p className="mt-6 text-center font-mono text-sm uppercase tracking-widest text-stone-700">
              Record No. {visitorId}
            </p>

            <div className="mt-6 space-y-2 border-y border-stone-300 py-4 font-mono text-xs uppercase tracking-wide text-stone-600">
              <div className="flex justify-between gap-4">
                <span>Status</span>
                <span className="text-red-800/70">Arrived</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Room</span>
                <span>Not Assigned</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Departure</span>
                <span>Not Recorded</span>
              </div>
            </div>

            <p className="mt-6 text-center font-serif text-sm italic leading-relaxed text-stone-600">
              Please keep this number.<br />
              The town will remember it.
            </p>

            <button
              onClick={() => {
                setShowRegistration(false);
                document.getElementById("about").scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 block w-full text-center text-xs tracking-widest text-stone-500 underline-offset-4 hover:text-stone-800 hover:underline"
            >
              ENTER SILENT PINES &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ===== ABOUT ===== */}
         <section id="about" className="px-8 pt-24 pb-16">
               <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1.4fr]">

          {/* Левая колонка — текст */}
          <div>
            <p className="text-xs tracking-[0.3em] text-stone-400">
              ABOUT SILENT PINES
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-800">
              A town that remembers<br />more than it says.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                The town has no official founding date. Records mention
                a logging stop, a railway — and then a long pause.
              </p>
              <p>
                Visitors come for the quiet. Most of them leave with
                the same feeling:
              </p>
            </div>
            <p className="mt-8 font-serif text-xl italic text-stone-500">
              the town was already waiting.
            </p>
          </div>

          {/* Правая колонка — картинка */}
          <div>
            <img
              src="/images/town.jpg"
              alt="A street in Silent Pines"
              className="w-full rounded-sm object-cover shadow-sm"
            />
          </div>

        </div>
      </section>       {/* ===== PLACES ===== */}
     <section id="places" className="px-8 py-12 md:py-24">
        <div className="mx-auto max-w-6xl">

          <p className="text-center text-xs tracking-[0.3em] text-stone-400">
            THINGS TO SEE
          </p>

                   <div className="mt-8 grid gap-8 md:grid-cols-3">

            {/* Карточка 1 — Pine Motel */}
            <div>
              <img
                src="/images/motel.jpg"
                alt="Pine Motel"
                               className="aspect-[4/3] w-full object-cover shadow-sm"
              />
              <h3 className="mt-4 font-serif text-xl text-stone-800">
                PINE MOTEL
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Warm rooms. Quiet nights.
              </p>
              <p className="mt-1 text-sm italic text-stone-400">
                Some guests return.
              </p>
            </div>

            {/* Карточка 2 — Blackwater Lake */}
            <div>
              <img
                src="/images/lake.jpg"
                alt="Blackwater Lake"
                               className="aspect-[4/3] w-full object-cover shadow-sm"
              />
              <h3 className="mt-4 font-serif text-xl text-stone-800">
                BLACKWATER LAKE
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Deep water. Persistent fog.
              </p>
              <p className="mt-1 text-sm italic text-stone-400">
                Do not look too long.
              </p>
            </div>

            {/* Карточка 3 — The Clearing */}
            <div>
              <img
                src="/images/clearing.jpg"
                alt="The Clearing"
                                className="aspect-[4/3] w-full object-cover shadow-sm"
              />
              <h3 className="mt-4 font-serif text-xl text-stone-800">
                THE CLEARING
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Lost things gather here.
              </p>
              <p className="mt-1 text-sm italic text-stone-400">
                They are rarely collected.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* ===== QUOTE ===== */}
    <section className="px-8 py-12 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.3fr]">

          {/* Левая колонка — картинка */}
          <div>
            <img
              src="/images/quiet.jpg"
              alt="A cup by a rainy window"
              className="aspect-[3/4] w-full object-cover shadow-sm"
            />
          </div>

          {/* Правая колонка — цитата и показатели */}
          <div>
            <h2 className="font-serif text-4xl leading-tight text-stone-800">
              Take your time.<br />
              Some places aren’t<br />meant to be rushed.
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-6 text-stone-600 sm:grid-cols-4">
              <div>
                <CloudRain className="h-6 w-6 text-stone-500" strokeWidth={1.5} />
                <p className="mt-2 text-xs tracking-widest text-stone-500">WEATHER</p>
                <p className="text-sm text-stone-700">Rain</p>
              </div>
              <div>
                <Thermometer className="h-6 w-6 text-stone-500" strokeWidth={1.5} />
                <p className="mt-2 text-xs tracking-widest text-stone-500">TEMPERATURE</p>
                <p className="text-sm text-stone-700">Unchanged</p>
              </div>
              <div>
                <Eye className="h-6 w-6 text-stone-500" strokeWidth={1.5} />
                <p className="mt-2 text-xs tracking-widest text-stone-500">VISIBILITY</p>
                <p className="text-sm text-stone-700">Poor</p>
              </div>
              <div>
                <Users className="h-6 w-6 text-stone-500" strokeWidth={1.5} />
                <p className="mt-2 text-xs tracking-widest text-stone-500">POPULATION</p>
                <p className="text-sm text-stone-700">Unknown</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ===== VISITOR GUIDE ===== */}
           <section id="guide" className="bg-[#17201E] px-8 py-16 md:py-24 text-stone-200">
        <div className="mx-auto max-w-6xl">

          <p className="text-center text-xs tracking-[0.3em] text-stone-500">
            VISITOR GUIDE
          </p>

               <div className="mt-12 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">

                 {/* GETTING AROUND */}
                 <div className="flex flex-col">
                   <img
                     src="/images/door.jpg"
                     alt="Getting around"
                     className="aspect-[3/4] w-full object-cover"
                   />
                   <h3 className="mt-4 text-sm tracking-widest text-stone-100">
                     GETTING AROUND
                   </h3>
                   <p className="mt-2 text-sm leading-relaxed text-stone-200">
                     Bus service runs once a day.
                   </p>
                   <p className="text-sm italic text-stone-400">
                     The last stop is not marked.
                   </p>
                  <a href="#map" onClick={(e) => { e.preventDefault(); setActivePoint("point-schedule"); document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-auto pt-3 inline-block text-xs tracking-widest text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline">
                     VIEW SCHEDULE &rarr;
                   </a>
                 </div>

                 {/* STAY CONNECTED */}
                 <div className="flex flex-col">
                   <img
                     src="/images/phone.jpg"
                     alt="Stay connected"
                     className="aspect-[3/4] w-full object-cover"
                   />
                   <h3 className="mt-4 text-sm tracking-widest text-stone-100">
                     STAY CONNECTED
                   </h3>
                   <p className="mt-2 text-sm leading-relaxed text-stone-200">
                     One public phone remains.
                   </p>
                   <p className="text-sm italic text-stone-400">
                     Reception is unreliable.
                   </p>
                   <a href="#map" onClick={(e) => { e.preventDefault(); setActivePoint("point-phone"); document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-auto pt-3 inline-block text-xs tracking-widest text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline">
                     FIND THE PHONE &rarr;
                   </a>
                 </div>

                 {/* SAFETY */}
                 <div className="flex flex-col">
                   <img
                     src="/images/road.jpg"
                     alt="Safety"
                     className="aspect-[3/4] w-full object-cover"
                   />
                   <h3 className="mt-4 text-sm tracking-widest text-stone-100">
                     SAFETY
                   </h3>
                   <p className="mt-2 text-sm leading-relaxed text-stone-200">
                     Stay on marked roads.
                   </p>
                   <p className="text-sm italic text-stone-400">
                     Avoid the forest after dark.
                   </p>
                   <a href="#map" onClick={(e) => { e.preventDefault(); setActivePoint("point-road"); document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-auto pt-3 inline-block text-xs tracking-widest text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline">
                     READ GUIDELINES &rarr;
                   </a>
                 </div>

                 {/* LOCAL SERVICES */}
                 <div className="flex flex-col">
                   <img
                     src="/images/gas.jpg"
                     alt="Local services"
                     className="aspect-[3/4] w-full object-cover"
                   />
                   <h3 className="mt-4 text-sm tracking-widest text-stone-100">
                     LOCAL SERVICES
                   </h3>
                   <div className="mt-2 space-y-1 text-sm text-stone-200">
                     <p>Gas station — Closed</p>
                     <p>General Store — Open</p>
                     <p>Motel — Always</p>
                   </div>
                   <a href="#map" onClick={(e) => { e.preventDefault(); setActivePoint("point-services"); document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-auto pt-3 inline-block text-xs tracking-widest text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline">
                     VIEW SERVICES &rarr;
                   </a>
                 </div>

          </div>
        </div>
      </section>
      {/* ===== MAP ===== */}
     <section id="map" className="px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">

          <p className="text-xs tracking-[0.3em] text-stone-400">
            MAP OF SILENT PINES
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-800">
            Find your way.<br />Or somewhere else.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-stone-600">
            Some areas remain unmapped.
          </p>
          <p className="font-serif text-lg italic text-stone-500">
            This is intentional.
          </p>

          {/* Карта с точками */}
          <div className="relative mt-10">
            <img
              src="/images/map.jpg"
              alt="Map of Silent Pines"
              className="w-full object-cover shadow-sm"
            />

            {mapPoints.map((point) => {
              const isRight = parseFloat(point.left) > 50;
              const isBottom = parseFloat(point.top) > 50;
              return (
                <div
                  key={point.id}
                  className="absolute"
                  style={{ left: point.left, top: point.top }}
                  onMouseEnter={supportsHover ? () => setTooltipPoint(point.id) : undefined}
                  onMouseLeave={supportsHover ? () => setTooltipPoint(null) : undefined}
                >
                  <span
                    id={point.id}
                    className={`map-point absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 cursor-pointer ${activePoint === point.id ? "scale-[1.6] border-stone-100 bg-red-700 shadow-[0_0_0_6px_rgba(185,28,28,0.25)]" : "border-stone-100 bg-stone-800/60 hover:bg-stone-800"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTooltipPoint(tooltipPoint === point.id ? null : point.id);
                    }}
                  ></span>

                  {tooltipPoint === point.id && supportsHover && (
                    <div
                      data-tooltip-card
                      className={`absolute z-10 w-40 rounded border border-stone-700 bg-[#17201E]/95 p-2 text-stone-200 shadow-lg backdrop-blur-sm ${isRight ? "right-0" : "left-0"} ${isBottom ? "bottom-3" : "top-3"}`}
                    >
                      <img
                        src={point.image}
                        alt=""
                        className="h-16 w-full rounded-sm object-cover"
                      />
                      <p className="mt-2 font-serif text-sm leading-snug text-stone-100">
                        {point.title}
                      </p>
                      {point.caption && (
                        <p className="mt-0.5 text-[11px] italic leading-snug text-stone-400">
                          {point.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {tooltipPoint === point.id && !supportsHover && (
                    <div
                      data-tooltip-card
                      className={`absolute z-10 w-32 rounded border border-stone-300 bg-white/95 px-2 py-1 text-[11px] leading-snug text-stone-700 shadow-lg backdrop-blur-sm ${isRight ? "right-0" : "left-0"} ${isBottom ? "bottom-3" : "top-3"}`}
                    >
                      {point.caption || point.title}
                    </div>
                  )}
                </div>
              );
            })}
                     </div>

                     {/* Мобильный реестр Tourism Office */}
                     <div className="mt-8 border border-stone-300 bg-stone-50 md:hidden">
                       <p className="border-b border-stone-300 px-4 py-3 font-mono text-xs uppercase tracking-widest text-stone-500">
                         Map Reference
                       </p>
                       <div className="divide-y divide-stone-300">
                         {mapPoints.map((point) => (
                           <button
                             key={point.id}
                             type="button"
                             onClick={() => {
                               setActivePoint(point.id);
                               document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "start" });
                             }}
                             className="flex w-full min-h-[44px] cursor-pointer flex-col items-start px-4 py-3 text-left"
                           >
                             <span className="font-serif text-sm text-stone-800">
                               {point.title}
                             </span>
                             {point.caption && (
                               <span className="mt-0.5 text-xs italic text-stone-500">
                                 {point.caption}
                               </span>
                             )}
                           </button>
                         ))}
                       </div>
                       <p className="border-t border-stone-300 px-4 py-2 font-mono text-[11px] italic uppercase tracking-wide text-red-800/70">
                         Locations are approximate.
                       </p>
                     </div>

                     <div className="mt-6 text-right"><a href="/images/map.jpg" target="_blank" rel="noopener noreferrer" className="inline-block text-xs tracking-widest text-stone-500 underline-offset-4 hover:text-stone-800 hover:underline">VIEW FULL MAP &rarr;</a></div>
                   </div>
                 </section>
      {/* ===== PLAN YOUR STAY ===== */}
      <section
        id="stay"
                        className="relative flex min-h-[75vh] items-center bg-cover bg-top px-8"
        style={{ backgroundImage: "url('/images/stay.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-xl">
          <p className="text-xs tracking-[0.3em] text-stone-400">
            PLAN YOUR STAY
          </p>
          <h2 className="font-serif text-5xl leading-tight text-stone-100">
            You've come this far.<br />You may as well stay.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-stone-300">
            A room has been kept for you.
          </p>
<a

    href="#contact"
    className="mt-8 inline-flex items-center gap-2 border border-stone-200/70 bg-white/10 px-8 py-3 text-xs tracking-widest text-stone-100 backdrop-blur-sm transition hover:bg-white/20"
  >
    REQUEST A ROOM
    <span aria-hidden="true">&rarr;</span>
  </a>
        </div>
      </section>
      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-[#17201E] px-8 py-12 text-stone-300">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">

          {/* Слева — название */}
          <div>
            <p className="text-sm tracking-widest text-stone-100">
              SILENT PINES TOURISM OFFICE
            </p>
            <p className="mt-2 text-xs tracking-wider text-stone-400">
              VISITOR INFORMATION
            </p>
          </div>

          {/* Центр — ссылки */}
          <div className="flex items-start gap-4 text-xs tracking-widest md:justify-center">
            <a href="#contact" className="text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline">
              CONTACT
            </a>
            <span className="text-stone-600">·</span>
<a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 underline-offset-4 hover:text-stone-100 hover:underline"
            >
                            INSTAGRAM
            </a>
          </div>

          {/* Справа — контакты */}
          <div className="space-y-1 text-sm text-stone-400 md:text-right">
                        <p className="mb-2 text-xs tracking-widest text-stone-500">CONTACT INFORMATION</p>
            <p>No phone.</p>
            <p>No address.</p>
            <p>Ask in town.</p>
          </div>

        </div>

        {/* Нижняя служебная строка */}
        <div className="mx-auto mt-10 max-w-6xl border-t border-stone-700 pt-8 text-xs tracking-wider text-stone-400">
          <p>© Silent Pines Tourism Office · Last updated: Unknown</p>
        </div>
      </footer>
    </main>
  );
}
