import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Sparkles, Copy, Check, Cake, Compass } from 'lucide-react';

export const AgeCalculatorTool: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(todayStr);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate + 'T00:00:00');
    const target = new Date(targetDate + 'T00:00:00');

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) {
      return { error: 'Birth date cannot be in the future of the comparison date.' };
    }

    // Exact years, months, days calculation
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total milliseconds elapsed
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    const totalMonths = years * 12 + months;

    // Next Birthday calculation
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const diffNextBdayMs = nextBday.getTime() - target.getTime();
    const daysUntilNextBday = Math.ceil(diffNextBdayMs / (1000 * 60 * 60 * 24));
    const nextBdayWeekday = nextBday.toLocaleDateString(undefined, { weekday: 'long' });

    // Astrological Sign
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    let zodiac = 'Aries';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = 'Aries ♈';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = 'Taurus ♉';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = 'Gemini ♊';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = 'Cancer ♋';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = 'Leo ♌';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = 'Virgo ♍';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = 'Libra ♎';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = 'Scorpio ♏';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = 'Sagittarius ♐';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = 'Capricorn ♑';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = 'Aquarius ♒';
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiac = 'Pisces ♓';

    // Chinese Zodiac
    const chineseZodiacs = ['Rat 🐀', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇', 'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐', 'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖'];
    const chineseZodiac = chineseZodiacs[(birth.getFullYear() - 4) % 12];

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilNextBday,
      nextBdayWeekday,
      zodiac,
      chineseZodiac
    };
  }, [birthDate, targetDate]);

  const handleCopySummary = () => {
    if (!result || 'error' in result) return;
    const summary = `Age Breakdown:
- Chronological Age: ${result.years} years, ${result.months} months, ${result.days} days
- Total Days Lived: ${result.totalDays.toLocaleString()} days
- Next Birthday: in ${result.daysUntilNextBday} days (${result.nextBdayWeekday})
- Western Zodiac: ${result.zodiac}
- Chinese Zodiac: ${result.chineseZodiac}
Calculated via ToolNest.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Calculate Age As Of
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {result && 'error' in result ? (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          {result.error}
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Main Primary Age Hero */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 block mb-1">
                  Chronological Age
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  {result.years} <span className="text-xl sm:text-2xl font-medium text-blue-200">Years</span> {result.months} <span className="text-xl sm:text-2xl font-medium text-blue-200">Months</span> {result.days} <span className="text-xl sm:text-2xl font-medium text-blue-200">Days</span>
                </div>
              </div>

              <button
                onClick={handleCopySummary}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Summary Copied' : 'Copy Summary'}</span>
              </button>
            </div>
          </div>

          {/* Birthday and Signs Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3">
              <Cake className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Next Birthday</span>
                <div className="text-base font-bold text-amber-950 dark:text-amber-100 mt-0.5">
                  {result.daysUntilNextBday === 0 ? 'Today! 🎂' : `in ${result.daysUntilNextBday} days`}
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Falls on a {result.nextBdayWeekday}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/50 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-purple-800 dark:text-purple-300">Western Zodiac</span>
                <div className="text-base font-bold text-purple-950 dark:text-purple-100 mt-0.5">
                  {result.zodiac}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex items-start gap-3">
              <Compass className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">Chinese Zodiac</span>
                <div className="text-base font-bold text-emerald-950 dark:text-emerald-100 mt-0.5">
                  {result.chineseZodiac}
                </div>
              </div>
            </div>
          </div>

          {/* Deep Cumulative Time Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Life Lived in Numbers
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Months</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {result.totalMonths.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Weeks</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {result.totalWeeks.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Days</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {result.totalDays.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 block">Total Hours</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {result.totalHours.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block">Total Minutes</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {result.totalMinutes.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
