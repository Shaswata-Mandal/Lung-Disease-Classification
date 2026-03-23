import { useState, useEffect } from 'react';
import { STATS, DISEASES, MODELS } from '../data/constants';
import { useNavigate } from "react-router-dom";
import { SectionTag, SectionTitle, Reveal, PrimaryBtn, SecondaryBtn, Badge, Glow } from '../components/UI';
import Footer from '../components/Footer';
import logo from "../assets/logo.png";

/* ── Animated scan visual ── */
function HeroVisual() {

  const [scanY, setScanY] = useState(0);
  
  useEffect(() => {

    let frame;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      setScanY(((ts - start) % 2800) / 2800 * 100);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);

  }, []);

  return (
    <div className="bg-[#0c0e1a] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-[float_4s_ease-in-out_infinite]">

      {/* Titlebar */}
      <div className="bg-[#111426] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ background: c }} className="w-2.5 h-2.5 rounded-full" />
        ))}
        <span className="ml-2 text-xs text-slate-600">Pulmora · Analysis Engine</span>
      </div>

      {/* Scan */}
      <div className="p-4 sm:p-5">
        <div className="relative h-36 sm:h-44 bg-[#111426] rounded-xl mb-3.5 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '20px 20px' }}
          />
          <div
            className="absolute left-0 right-0 h-0.5"
            style={{
              top: scanY + '%',
              background: 'linear-gradient(90deg,transparent,#7c5cfc,#22d3ee,transparent)',
              transition: 'top 0.05s linear',
            }}
          />
          <span className="text-5xl sm:text-6xl z-10" style={{ filter: 'drop-shadow(0 0 16px #7c5cfc)' }}><img src={logo} className='w-22 h-22' /></span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Prediction', val: 'Normal', valClass: 'text-emerald-400', w: '92%' },
            { label: 'Confidence', val: '97.8%', valClass: 'text-violet-300', w: '78%' },
          ].map(c => (
            <div key={c.label} className="bg-[#13162b] border border-white/[0.06] rounded-xl p-3">
              <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{c.label}</div>
              <div className={`font-display font-bold text-lg ${c.valClass}`}>{c.val}</div>
              <div className="h-0.5 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                <div style={{ width: c.w, background: c.valClass.includes('emerald') ? '#10b981' : '#a78bfa' }} className="h-full rounded-full" />
              </div>
            </div>
          ))}
          <div className="col-span-2 bg-[#13162b] border border-white/[0.06] rounded-xl p-3 flex items-center gap-3">
            <span className="text-xl">🏆</span>
            <div>
              <div className="text-[10px] text-slate-600 uppercase tracking-widest">Best Model</div>
              <div className="text-sm font-semibold">ResNet50 · 98.03% Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Disease card ── */
function DiseaseCard({ d, delay }) {

  return (
    <Reveal delay={delay}>

      <div className={`flex gap-4 sm:gap-5 p-5 sm:p-7 rounded-2xl border ${d.borderColor} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5 cursor-default`}>

        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl ${d.bgColor}`}>
          {d.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-base sm:text-lg mb-1.5">{d.name}</div>
          <div className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">{d.desc}</div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${d.badgeClass}`}>{d.badge}</span>
            <span className="text-[10px] text-slate-600 px-2.5 py-1 rounded-full bg-white/[0.04] tracking-wide">{d.radiograph}</span>
          </div>
        </div>

      </div>

    </Reveal>
  );

}

/* ── Model leaderboard row ── */
function LeaderboardRow({ m, delay, rank }) {

  return (
    <Reveal delay={delay}>

      <div className="flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200">

        <div className='flex flex-1 gap-2'>
          <div className="text-sm font-display font-bold text-slate-600 w-5 text-center flex-shrink-0">{rank}</div>

        <span className="text-xl flex-shrink-0">{m.icon}</span>

        <div className="flex-1 w-full">
          <div className="text-sm font-semibold mb-1.5 truncate">{m.name}</div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"
              style={{ width: m.accNum + '%', transition: 'width 1.5s ease' }}
            />
          </div>
        </div>
        </div>

        <div>
          <div className="font-display font-extrabold text-xs sm:text-base text-violet-300 flex-shrink-0">{m.accuracy}</div>

        <div className="hidden sm:block flex-shrink-0"><Badge type={m.badgeType}>{m.badge}</Badge></div>
        </div>

      </div>

    </Reveal>
    
  );
}

export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center px-5 sm:px-6 lg:px-8 pt-20 pb-20 sm:pb-24 overflow-hidden w-full">

        {/* Ambient glows */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.1) 0%,transparent 70%)' }} />

        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(34,211,238,0.06) 0%,transparent 70%)' }} />

        <div className="max-w-7xl mx-auto w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div className="flex flex-col max-sm:items-center animate-[fadeUp_0.8s_ease_both]">

              <div className="inline-flex items-center max-w-fit gap-2 border border-violet-500/20 bg-violet-500/7 px-4 py-1.5 rounded-full text-xs text-violet-300 font-medium mb-7 tracking-wide">
                EPICS Project · VIT Bhopal University
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.02] mb-6">
                Clinical AI for<br />
                <span className="text-violet-400">Lung Disease</span><br />
                Detection.
              </h1>

              <p className="text-md sm:text-lg text-slate-400 leading-relaxed max-w-lg mb-8 font-light">
                7 deep learning ml models classifying chest X-rays into COVID-19, Pneumonia,
                Tuberculosis, and Normal with up to{' '}
                <strong className="text-white font-semibold">98.03% accuracy</strong>.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-10">
                <PrimaryBtn onClick={() => navigate('/predict')}>Analyze X-Ray</PrimaryBtn>
                <SecondaryBtn onClick={() => navigate('/research')}>Read the Paper</SecondaryBtn>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6 sm:gap-8">

                {[{ val: '7', label: 'Models' }, { val: '4', label: 'Classes' }, { val: '1,621', label: 'Test Images' }].map(s => (

                  <div key={s.label}>
                    <div className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">{s.val}</div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>

                ))}

              </div>

            </div>

            {/* Right visual */}
            <div className="animate-[fadeUp_0.8s_0.2s_ease_both] opacity-0 [animation-fill-mode:both]  rounded-2xl">
              <HeroVisual />
            </div>

          </div>

        </div>

      </section>

      {/* ── STATS STRIP ── */}
      <div className="border-y border-white/20 bg-[#0c0e1a]">

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/20">
            {STATS.map((s, i) => (
              <div className='flex justify-center w-full hover:bg-white/20 transition-colors cursor-default'>
                <div
                key={i}
                className="px-6 sm:px-8 py-8 sm:py-10"
              >
                <div className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl tracking-tight text-violet-300 mb-1">{s.num}{s.suffix}</div>
                <div className="text-sm font-semibold mb-0.5">{s.label}</div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── DISEASES ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionTag>Detection Classes</SectionTag>
            <SectionTitle>Four conditions.<br />One unified system.</SectionTitle>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed mb-10">
              Pulmora classifies chest X-ray images across four clinically meaningful categories,
              trained on a balanced multi-class dataset with standardized preprocessing.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DISEASES.map((d, i) => <DiseaseCard key={d.name} d={d} delay={i * 80} />)}
          </div>
        </div>

      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#0c0e1a] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

        <div className="max-w-7xl mx-auto">

          <Reveal>
            <SectionTag>Methodology</SectionTag>
            <SectionTitle>From X-ray to<br />diagnosis in seconds.</SectionTitle>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { num: '01', icon: '📤', title: 'Upload X-Ray', desc: 'Upload a chest X-ray image in JPEG or PNG format. Drag-and-drop supported.' },
              { num: '02', icon: '🧠', title: 'Select Model', desc: 'Choose from 7 specialized architectures or run all simultaneously in Compare mode.' },
              { num: '03', icon: '📊', title: 'Get Results', desc: 'Receive a prediction with class label, confidence score, and per-model breakdown in under 3 seconds.' },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div className="relative bg-white/5 border min-h-full border-white/[0.07] hover:border-violet-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <div className="absolute top-4 right-7 font-display font-extrabold text-5xl sm:text-6xl text-white/10 tracking-tight leading-none pointer-events-none group-hover:text-white/20 transition-colors">{s.num}</div>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-2xl mb-5">{s.icon}</div>
                  <div className="font-display font-bold text-lg mb-2">{s.title}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              </Reveal>
            ))}

          </div>

        </div>

      </section>

      {/* ── MODEL LEADERBOARD ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12  items-start">

            <Reveal>
              <div className="lg:sticky lg:top-24">
                <SectionTag>Model Leaderboard</SectionTag>
                <SectionTitle><span className='text-2xl sm:4xl'>Four Architectures.<br/>Seven Models.<br />One benchmark.</span></SectionTitle>
                <PrimaryBtn onClick={() => navigate('/predict')}>
                  Try All Models
                </PrimaryBtn>
              </div>
            </Reveal>

            <div className="flex flex-col gap-4">
              {[...MODELS]
                .filter(m => !m.isCompare)
                .sort((a, b) => b.accNum - a.accNum)
                .map((m, i) => (
                  <LeaderboardRow key={m.key} m={m} delay={i * 60} rank={i + 1} />
                ))}
            </div>

          </div>

        </div>

      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">

        <div className="max-w-7xl mx-auto">

          <Reveal>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#111426] to-[#13162b] border border-white/[0.07] px-6 sm:px-16 py-14 sm:py-20 text-center">
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.12),transparent 70%)' }} />
              <h2 className="relative font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
                Ready to analyze a chest X-ray?
              </h2>
              <p className="relative text-sm sm:text-base text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Select a model, upload an image, and get clinical-grade classification in few seconds.
              </p>
              <PrimaryBtn onClick={() => navigate('/predict')} className="relative">
                Start Analysis
              </PrimaryBtn>
            </div>
          </Reveal>

        </div>

      </section>

      <Footer />

    </div>
  );
}
