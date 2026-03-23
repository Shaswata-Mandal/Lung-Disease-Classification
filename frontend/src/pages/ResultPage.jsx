import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getDiseaseStyle } from '../data/constants';
import { ConfBar, SectionTag, PrimaryBtn, SecondaryBtn } from '../components/UI';
import Footer from '../components/Footer';

/* ── Single model result ── */
function SingleResult({ data, imageUrl, modelName }) {

  const { color, emoji } = getDiseaseStyle(data.prediction);
  const conf = Math.round((data.confidence || 0) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 animate-[fadeUp_0.5s_ease_both]">

      {/* X-ray */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col items-center gap-5">
        <img
          src={imageUrl}
          alt="X-Ray"
          className="w-full max-h-64 object-cover rounded-xl border border-white/10"
        />
        <div className="text-[10px] text-slate-600 uppercase tracking-widest">Uploaded Chest X-Ray</div>
      </div>

      {/* Output */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 sm:p-7 flex flex-col gap-5">

        {/* Verdict row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-white/[0.07]">

          <span className="text-5xl text-end sm:text-6xl">{emoji}</span>
          <div className="flex-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Diagnosis</div>
            <div className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tight ${color}`}>
              {data.prediction}
            </div>
          </div>

          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3 text-center self-start sm:self-auto">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
            <div className="font-display font-extrabold text-2xl text-violet-300 tracking-tight">{conf}%</div>
          </div>

        </div>

        {/* Bar */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Model Confidence</span>
            <span className="font-semibold text-violet-300">{conf}%</span>
          </div>
          <ConfBar value={conf} />
        </div>

        {/* Model tag */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/[0.03] rounded-xl px-4 py-3">
          <span>🤖</span>
          <span>Analyzed by </span>
          <span className="text-violet-400 font-semibold">{data.model || modelName}</span>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-400/5 border border-yellow-400/15 rounded-xl px-4 py-3 text-xs text-yellow-400/70 leading-relaxed">
          ⚠️ This is an AI-assisted research tool. Results should be confirmed by a qualified medical
          professional before any clinical use.
        </div>

      </div>

    </div>
  );
}

/* ── Compare result grid ── */
function CompareResult({ data }) {

  const results = data.results || [];
  const winner = data.best_model;

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">
      {winner && (
        <div className="flex items-center gap-3 bg-emerald-400/8 border border-emerald-400/20 rounded-2xl px-5 py-4 mb-5">
          <span className="text-xl">⭐</span>
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Most Confident</div>
            <div className="text-sm font-semibold">{winner}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((r, i) => {
          if (r.error) return (
            <div key={r.model} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <div className="text-sm font-semibold mb-2 text-slate-400">{r.model}</div>
              <div className="text-xs text-red-400">Error loading model</div>
            </div>
          );

          const conf = Math.round((r.confidence || 0) * 100);
          const { color, emoji } = getDiseaseStyle(r.prediction);
          const isWinner = r.model === winner;

          return (
            <div
              key={r.model}
              className={`rounded-xl p-4 border-2 transition-all duration-200
                ${isWinner
                  ? 'border-emerald-400/40 bg-emerald-400/5 shadow-[0_0_0_1px_rgba(52,211,153,0.2)]'
                  : 'border-white/[0.07] bg-white/[0.03]'
                }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-300">{r.model}</span>
                {isWinner && (
                  <span className="text-[10px] bg-emerald-400/15 text-emerald-400 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                    Top
                  </span>
                )}
              </div>
              <div className={`flex items-center gap-2 font-display font-bold text-base mb-2 ${color}`}>
                <span>{emoji}</span>{r.prediction}
              </div>
              <div className="mb-1.5">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-500">Confidence</span>
                  <span className={`font-semibold ${isWinner ? 'text-emerald-400' : 'text-violet-300'}`}>{conf}%</span>
                </div>
                <ConfBar
                  value={conf}
                  colorClass={isWinner ? 'from-emerald-500 to-emerald-400' : 'from-violet-600 to-violet-400'}
                  delay={i * 100}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 bg-yellow-400/5 border border-yellow-400/15 rounded-xl px-4 py-3 text-xs text-yellow-400/70 leading-relaxed">
        ⚠️ AI research tool only. Consult a qualified medical professional before clinical use.
      </div>
    </div>
  );
}

/* ── Result Page ── */
export default function ResultPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // If someone lands on /result directly without state, redirect to /predict
  useEffect(() => {
    if (!state?.data) {
      navigate('/predict', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.data) return null;

  const { data, imageUrl, modelKey, modelName } = state;
  const isCompare = modelKey === 'compare';

  return (
    <div>

      {/* Hero */}
      <div className="relative pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 overflow-hidden">

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.07),transparent 70%)' }}
        />

        <div className="max-sm:flex max-sm:flex-col items-center max-w-7xl mx-auto relative">

          <SectionTag>Analysis Complete</SectionTag>

          <div className="flex flex-col text-center sm:flex-row sm:items-center justify-between gap-4">

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              {isCompare ? 'Model Comparison' : 'Diagnosis Result'}
            </h1>

            <div className="flex gap-3 justify-center flex-wrap">
              <SecondaryBtn
                onClick={() => navigate('/predict')}
                className="!text-sm !px-5 !py-2.5"
              >
                New Analysis
              </SecondaryBtn>
              <PrimaryBtn
                onClick={() => navigate('/predict')}
                className="!text-sm !px-5 !py-2.5"
              >
                Try Another Model
              </PrimaryBtn>
            </div>

          </div>

        </div>

      </div>

      {/* Result content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {isCompare
          ? <CompareResult data={data} />
          : <SingleResult data={data} imageUrl={imageUrl} modelName={modelName} />
        }

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#111426] to-[#13162b] border border-white/[0.07] rounded-2xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          <div>
            <div className="font-display font-bold text-lg sm:text-xl mb-1">Want to try another model?</div>
            <div className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Go back to the prediction page to upload a new image or compare all 7 models simultaneously.
            </div>
          </div>

          <div className="flex gap-3 flex-wrap flex-shrink-0">
            <SecondaryBtn onClick={() => navigate('/predict')} className="!text-sm !px-5 !py-2.5">
              Back
            </SecondaryBtn>
            <PrimaryBtn onClick={() => navigate('/predict')} className="!text-sm !px-5 !py-2.5">
              New Analysis
            </PrimaryBtn>
          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}
