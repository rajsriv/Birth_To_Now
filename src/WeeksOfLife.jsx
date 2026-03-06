import { useState } from 'react';

const TRANSLATIONS = {
  "en-US": {
    "pageTitle": "Life in weeks",
    "pageSubtitle": "A simple visualization to reflect on the passage of time",
    "birthDateQuestion": "Enter a birthdate",
    "visualizeButton": "Visualize your time",
    "startOverButton": "Start over",
    "lifeInWeeksTitle": "Your life in weeks",
    "weekHoverPast": " A week from your past",
    "weekHoverCurrent": " Your current week",
    "weekHoverFuture": " A week in your potential future",
    "legendPast": "Past",
    "legendPresent": "Present",
    "legendFuture": "Future",
    "lifeHighlightsTitle": "Life highlights",
    "lifeHighlightsWeeks": "You've lived",
    "lifeHighlightsWeeksEnd": "weeks, which is",
    "lifeHighlightsPercent": "of a full life.",
    "lifeHighlightsDays": "That's",
    "lifeHighlightsDaysEnd": "days of experience and approximately",
    "lifeHighlightsSeasonsEnd": "seasons observed.",
    "lifeHighlightsHeartbeats": "Your heart has beaten approximately",
    "lifeHighlightsHeartbeatsEnd": "times.",
    "lifeHighlightsBreaths": "You've taken around",
    "lifeHighlightsBreathsMiddle": "breaths and slept about",
    "lifeHighlightsBreathsEnd": "hours.",
    "societalContextTitle": "Societal context",
    "societalPopulation": "During your lifetime, humanity's population has grown from",
    "societalPopulationEnd": "to over",
    "societalPopulationFinal": "billion people.",
    "societalMeetings": "The average person will meet around",
    "societalMeetingsMiddle": "people in their lifetime. You've likely already met approximately",
    "societalMeetingsEnd": "individuals.",
    "societalBirthsDeaths": "Since your birth, humanity has collectively experienced approximately",
    "societalBirthsMiddle": "births and",
    "societalDeathsEnd": "deaths.",
    "cosmicPerspectiveTitle": "Cosmic perspective",
    "cosmicEarthTravel": "Since your birth, Earth has traveled approximately",
    "cosmicEarthTravelEnd": "kilometers through space around the Sun.",
    "cosmicUniverse": "The observable universe is about",
    "cosmicUniverseMiddle": "billion light-years across, meaning light takes",
    "cosmicUniverseMiddle2": "billion years to cross it. Your entire lifespan is just",
    "cosmicUniverseEnd": "of the universe's age.",
    "cosmicSolarSystem": "During your lifetime, our solar system has moved about",
    "cosmicSolarSystemEnd": "kilometers through the Milky Way galaxy.",
    "naturalWorldTitle": "Natural world",
    "naturalLunarCycles": "You've experienced approximately",
    "naturalLunarMiddle": "lunar cycles and",
    "naturalLunarEnd": "trips around the Sun.",
    "naturalSequoia": "A giant sequoia tree can live over 3,000 years. Your current age is",
    "naturalSequoiaEnd": "of its potential lifespan.",
    "naturalCells": "During your lifetime, your body has replaced most of its cells several times. You are not made of the same atoms you were born with."
  },
  /* LOCALE_PLACEHOLDER_START */
  "es-ES": {
    "pageTitle": "La vida en semanas",
    "pageSubtitle": "Una visualización simple para reflexionar sobre el paso del tiempo",
    "birthDateQuestion": "Ingresa una fecha de nacimiento",
    "visualizeButton": "Visualizar tu tiempo",
    "startOverButton": "Empezar de nuevo",
    "lifeInWeeksTitle": "Tu vida en semanas",
    "weekHoverPast": " Una semana de tu pasado",
    "weekHoverCurrent": " Tu semana actual",
    "weekHoverFuture": " Una semana en tu futuro potencial",
    "legendPast": "Pasado",
    "legendPresent": "Presente",
    "legendFuture": "Futuro",
    "lifeHighlightsTitle": "Aspectos destacados de la vida",
    "lifeHighlightsWeeks": "Has vivido",
    "lifeHighlightsWeeksEnd": "semanas, que es el",
    "lifeHighlightsPercent": "de una vida completa.",
    "lifeHighlightsDays": "Eso son",
    "lifeHighlightsDaysEnd": "días de experiencia y aproximadamente",
    "lifeHighlightsSeasonsEnd": "estaciones observadas.",
    "lifeHighlightsHeartbeats": "Tu corazón ha latido aproximadamente",
    "lifeHighlightsHeartbeatsEnd": "veces.",
    "lifeHighlightsBreaths": "Has tomado alrededor de",
    "lifeHighlightsBreathsMiddle": "respiraciones y has dormido aproximadamente",
    "lifeHighlightsBreathsEnd": "horas.",
    "societalContextTitle": "Contexto social",
    "societalPopulation": "Durante tu vida, la población de la humanidad ha crecido de",
    "societalPopulationEnd": "a más de",
    "societalPopulationFinal": "mil millones de personas.",
    "societalMeetings": "La persona promedio conocerá alrededor de",
    "societalMeetingsMiddle": "personas en su vida. Probablemente ya has conocido aproximadamente",
    "societalMeetingsEnd": "individuos.",
    "societalBirthsDeaths": "Desde tu nacimiento, la humanidad ha experimentado colectivamente aproximadamente",
    "societalBirthsMiddle": "nacimientos y",
    "societalDeathsEnd": "muertes.",
    "cosmicPerspectiveTitle": "Perspectiva cósmica",
    "cosmicEarthTravel": "Desde tu nacimiento, la Tierra ha viajado aproximadamente",
    "cosmicEarthTravelEnd": "kilómetros a través del espacio alrededor del Sol.",
    "cosmicUniverse": "El universo observable tiene aproximadamente",
    "cosmicUniverseMiddle": "mil millones de años luz de diámetro, lo que significa que la luz tarda",
    "cosmicUniverseMiddle2": "mil millones de años en cruzarlo. Toda tu vida es solo el",
    "cosmicUniverseEnd": "de la edad del universo.",
    "cosmicSolarSystem": "Durante tu vida, nuestro sistema solar se ha movido aproximadamente",
    "cosmicSolarSystemEnd": "kilómetros a través de la galaxia Vía Láctea.",
    "naturalWorldTitle": "Mundo natural",
    "naturalLunarCycles": "Has experimentado aproximadamente",
    "naturalLunarMiddle": "ciclos lunares y",
    "naturalLunarEnd": "viajes alrededor del Sol.",
    "naturalSequoia": "Una secuoya gigante puede vivir más de 3,000 años. Tu edad actual es el",
    "naturalSequoiaEnd": "de su vida potencial.",
    "naturalCells": "Durante tu vida, tu cuerpo ha reemplazado la mayoría de sus células varias veces. No estás hecho de los mismos átomos con los que naciste."
  }
  /* LOCALE_PLACEHOLDER_END */
};

const appLocale = '{{APP_LOCALE}}';
const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
const findMatchingLocale = (locale) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};
const locale = (appLocale !== '{{APP_LOCALE}}') ? findMatchingLocale(appLocale) : findMatchingLocale(browserLocale);
const t = (key) => TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;

export default function WeeksOfLife() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [stats, setStats] = useState(null);
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);
  
  const calculateStats = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    
    // Calculate weeks lived
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((today - birthDate) / msInWeek);
    
    // Assuming average lifespan of ~80 years (4160 weeks)
    const totalWeeks = 4160;
    const weeksRemaining = totalWeeks - weeksLived;
    const percentageLived = Math.round((weeksLived / totalWeeks) * 100);
    
    // Calculate days lived
    const msInDay = 1000 * 60 * 60 * 24;
    const daysLived = Math.floor((today - birthDate) / msInDay);
    
    // Calculate hours slept (assuming 8 hours per day)
    const hoursSlept = Math.floor(daysLived * 8);
    
    // Calculate heartbeats (average 70 bpm)
    const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
    
    // Calculate breaths (average 16 breaths per minute)
    const breaths = Math.floor(daysLived * 24 * 60 * 16);

    // Calculate seasons experienced
    const seasons = Math.floor(daysLived / 91.25);
    
    return {
      weeksLived,
      totalWeeks,
      weeksRemaining,
      percentageLived,
      daysLived,
      hoursSlept,
      heartbeats,
      breaths,
      seasons,
      birthYear
    };
  };
  
  // Helper functions for contextual statistics
  const getPopulationAtYear = (year) => {
    // World population estimates by year (in billions)
    const populationData = {
      1950: 2.5,
      1960: 3.0,
      1970: 3.7,
      1980: 4.4,
      1990: 5.3,
      2000: 6.1,
      2010: 6.9,
      2020: 7.8,
      2025: 8.1
    };
    
    // Find the closest year in our data
    const years = Object.keys(populationData).map(Number);
    const closestYear = years.reduce((prev, curr) => 
      Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    );
    
    return Math.round(populationData[closestYear] * 1000000000);
  };
  
  const getAverageBirthsPerDay = () => {
    // Approximately 385,000 births per day globally (as of 2023)
    return 385000;
  };
  
  const getAverageDeathsPerDay = () => {
    // Approximately 166,000 deaths per day globally (as of 2023)
    return 166000;
  };

  const handleSubmit = () => {
    setStats(calculateStats(birthdate));
    setStep(2);
  };

  const getFormattedNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const renderWeekGrid = () => {
    if (!stats) return null;
    
    const rows = [];
    const weeksPerRow = 52;
    const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);
    
    for (let row = 0; row < totalRows; row++) {
      const weekCells = [];
      for (let col = 0; col < weeksPerRow; col++) {
        const weekNumber = row * weeksPerRow + col;
        if (weekNumber < stats.totalWeeks) {
          const isPast = weekNumber < stats.weeksLived;
          const isCurrent = weekNumber === stats.weeksLived;
          
          let cellClass = "w-2 h-2 m-0.5 rounded-sm transition-all border border-black/10 shadow-sm ";
          if (isPast) {
            cellClass += "bg-[#4a3020] ";
          } else if (isCurrent) {
            cellClass += "border-2 border-[#8b5a2b] bg-[#d2a679] animate-pulse ";
          } else {
            cellClass += "bg-[#e2ceb5] ";
          }
          
          weekCells.push(
            <div 
              key={weekNumber}
              className={cellClass}
              onMouseEnter={() => {
                setHoverWeek(weekNumber);
                setShowHoverData(true);
              }}
              onMouseLeave={() => setShowHoverData(false)}
            />
          );
        }
      }
      
      rows.push(
        <div key={row} className="flex">
          {weekCells}
        </div>
      );
    }
    
    return (
      <div className="mt-8 bg-transparent p-6 rounded-none border-t-4 border-b-4 border-double border-[var(--color-ink-dark)] shadow-none">
        <h2 className="text-3xl font-bold mb-4 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] tracking-wider uppercase text-center border-b border-[var(--color-ink-dark)] pb-2">{t('lifeInWeeksTitle')}</h2>
        <div className="flex flex-col">
          {rows}
        </div>
        
        {showHoverData && (
          <div className="mt-4 text-sm text-gray-600">
            Week {hoverWeek + 1}: 
            {hoverWeek < stats.weeksLived ? 
              t('weekHoverPast') : 
              hoverWeek === stats.weeksLived ? 
              t('weekHoverCurrent') : 
              t('weekHoverFuture')}
          </div>
        )}
        
        <div className="flex mt-6 text-sm justify-center gap-6 font-bold uppercase tracking-widest text-[var(--color-ink-dark)] border-t border-[var(--color-ink-dark)] pt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#4a3020] border border-black/10 mr-2 shadow-sm rounded-sm"></div>
            <span>{t('legendPast')}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-[#8b5a2b] bg-[#d2a679] mr-2 shadow-sm rounded-sm"></div>
            <span>{t('legendPresent')}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#e2ceb5] border border-black/10 mr-2 shadow-sm rounded-sm"></div>
            <span>{t('legendFuture')}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    if (!stats) return null;
    
    return (
      <div className="mt-8 space-y-6">
        <div className="bg-transparent border border-[var(--color-ink-dark)] p-6 shadow-[4px_4px_0_0_var(--color-ink-dark)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] border-b border-dashed border-[var(--color-ink-dark)] pb-2">{t('lifeHighlightsTitle')}</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              <span className="font-bold text-xl float-left mr-2 mt-1 leading-none">{t('lifeHighlightsWeeks').charAt(0)}</span>{t('lifeHighlightsWeeks').slice(1)} <span className="font-bold">{getFormattedNumber(stats.weeksLived)}</span> {t('lifeHighlightsWeeksEnd')} <span className="font-bold">{stats.percentageLived}%</span> {t('lifeHighlightsPercent')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('lifeHighlightsDays')} <span className="font-bold">{getFormattedNumber(stats.daysLived)}</span> {t('lifeHighlightsDaysEnd')} <span className="font-bold">{getFormattedNumber(stats.seasons)}</span> {t('lifeHighlightsSeasonsEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('lifeHighlightsHeartbeats')} <span className="font-bold">{getFormattedNumber(stats.heartbeats)}</span> {t('lifeHighlightsHeartbeatsEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('lifeHighlightsBreaths')} <span className="font-bold">{getFormattedNumber(stats.breaths)}</span> {t('lifeHighlightsBreathsMiddle')} <span className="font-bold">{getFormattedNumber(stats.hoursSlept)}</span> {t('lifeHighlightsBreathsEnd')}
            </p>
          </div>
        </div>
        
        <div className="bg-transparent border border-[var(--color-ink-dark)] p-6 shadow-[4px_4px_0_0_var(--color-ink-dark)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] border-b border-dashed border-[var(--color-ink-dark)] pb-2">{t('societalContextTitle')}</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('societalPopulation')} {stats.birthYear ? <span className="font-bold">{getFormattedNumber(getPopulationAtYear(stats.birthYear))}</span> : ""} {t('societalPopulationEnd')} <span className="font-bold">8</span> {t('societalPopulationFinal')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('societalMeetings')} <span className="font-bold">80,000</span> {t('societalMeetingsMiddle')} <span className="font-bold">{getFormattedNumber(Math.round(80000 * (stats.percentageLived/100)))}</span> {t('societalMeetingsEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('societalBirthsDeaths')} <span className="font-bold">{getFormattedNumber(Math.round(stats.daysLived * getAverageBirthsPerDay()))}</span> {t('societalBirthsMiddle')} <span className="font-bold">{getFormattedNumber(Math.round(stats.daysLived * getAverageDeathsPerDay()))}</span> {t('societalDeathsEnd')}
            </p>
          </div>
        </div>
        
        <div className="bg-transparent border border-[var(--color-ink-dark)] p-6 shadow-[4px_4px_0_0_var(--color-ink-dark)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] border-b border-dashed border-[var(--color-ink-dark)] pb-2">{t('cosmicPerspectiveTitle')}</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('cosmicEarthTravel')} <span className="font-bold">{getFormattedNumber(Math.round(stats.daysLived * 1.6 * 1000000))}</span> {t('cosmicEarthTravelEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('cosmicUniverse')} <span className="font-bold">93</span> {t('cosmicUniverseMiddle')} <span className="font-bold">93</span> {t('cosmicUniverseMiddle2')} <span className="font-bold">{(80/13800000000 * 100).toFixed(10)}%</span> {t('cosmicUniverseEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('cosmicSolarSystem')} <span className="font-bold">{getFormattedNumber(Math.round(stats.daysLived * 24 * 828000))}</span> {t('cosmicSolarSystemEnd')}
            </p>
          </div>
        </div>
        
        <div className="bg-transparent border border-[var(--color-ink-dark)] p-6 shadow-[4px_4px_0_0_var(--color-ink-dark)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] border-b border-dashed border-[var(--color-ink-dark)] pb-2">{t('naturalWorldTitle')}</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('naturalLunarCycles')} <span className="font-bold">{getFormattedNumber(Math.round(stats.daysLived / 29.53))}</span> {t('naturalLunarMiddle')} <span className="font-bold">{getFormattedNumber(Math.floor(stats.daysLived / 365.25))}</span> {t('naturalLunarEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed">
              {t('naturalSequoia')} <span className="font-bold">{((stats.daysLived / 365.25) / 3000 * 100).toFixed(2)}%</span> {t('naturalSequoiaEnd')}
            </p>
            <p className="text-[var(--color-ink-dark)] leading-relaxed italic border-l-4 border-[var(--color-mocha-accent)] pl-4 my-4">
              {t('naturalCells')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const handleReset = () => {
    setBirthdate('');
    setStats(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen p-6 pt-16 relative bg-transparent">
      {/* Decorative Borders */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-[var(--color-ink-dark)] pointer-events-none"></div>
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-dashed border-[var(--color-ink-dark)] pointer-events-none opacity-50"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <header className="text-center mb-12 border-b-4 border-double border-[var(--color-ink-dark)] pb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-ink-dark)] mb-4 font-[var(--font-serif-heading)] tracking-tighter uppercase">{t('pageTitle')}</h1>
          <p className="text-lg md:text-xl text-[var(--color-mocha-accent)] italic font-[var(--font-serif-body)] max-w-xl mx-auto">{t('pageSubtitle')}</p>
        </header>
        
        {step === 1 ? (
          <div className="bg-transparent border border-[var(--color-ink-dark)] p-8 shadow-[6px_6px_0_0_var(--color-ink-dark)] max-w-md mx-auto mt-16 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-paper-bg)] px-4 text-[var(--color-ink-dark)] font-bold text-sm tracking-widest uppercase">
              Application Form
            </div>
            <h2 className="text-2xl font-bold mb-6 text-[var(--color-ink-dark)] font-[var(--font-serif-heading)] text-center">{t('birthDateQuestion')}</h2>
            <div className="space-y-6">
              <input
                type="date"
                className="w-full p-4 border-2 border-[var(--color-ink-dark)] bg-[var(--color-paper-bg)] text-[var(--color-ink-dark)] font-bold focus:outline-none focus:ring-2 focus:ring-[var(--color-mocha-accent)] focus:border-transparent transition-all"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-[var(--color-ink-dark)] text-[#f4ebd0] py-4 font-bold tracking-widest uppercase hover:bg-[var(--color-mocha-accent)] transition-all border-2 border-[var(--color-ink-dark)] active:translate-y-1"
                disabled={!birthdate}
              >
                {t('visualizeButton')}
              </button>
            </div>
          </div>
        ) : (
          <>
            {renderWeekGrid()}
            {renderStats()}
            <button
              onClick={handleReset}
              className="mt-12 w-full max-w-md mx-auto block bg-transparent text-[var(--color-ink-dark)] py-4 font-bold tracking-widest uppercase hover:bg-[var(--color-mocha-accent)] hover:text-[#f4ebd0] transition-all border-2 border-[var(--color-ink-dark)] shadow-[4px_4px_0_0_var(--color-ink-dark)] active:translate-y-1 active:shadow-none"
            >
              {t('startOverButton')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}