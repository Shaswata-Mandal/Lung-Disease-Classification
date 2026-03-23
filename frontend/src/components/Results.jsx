import { getDiseaseStyle } from '../data/constants';
import { ConfBar, SecondaryBtn } from './UI';

function SingleResult({ data, imageUrl, modelName }) {
  const { color, emoji, hex } = getDiseaseStyle(data.prediction);
  const conf = Math.round((data.confidence || 0) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 animate-[fadeUp_0.5s_ease_both]">

      {/* X-ray card */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col items-center gap-3">
        <img src={imageUrl} alt="X-Ray" className="w-full max-h-52 object-cover rounded-xl border border-white/10" />
        <div className="text-[10px] text-slate-600 uppercase tracking-widest">Uploaded Chest X-Ray</div>
      </div>

      {/* Result card */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 sm:p-7 flex flex-col gap-5">

        {/* Verdict */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-white/[0.07]">

          <span className="text-4xl sm:text-5xl">{emoji}</span>

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
          ⚠️ This is an AI-assisted research tool. Results should be confirmed by a qualified medical professional before clinical use.
        </div>

      </div>

    </div>
  );
}

function CompareResult({ data }) {
  const results = data.results || [];
  const winner = data.best_model;

  return (
    <div className="animate-[fadeUp_0.5s_ease_both]">

      {winner && (
        <div className="flex items-center gap-3 bg-emerald-400/8 border border-emerald-400/20 rounded-2xl px-5 py-3.5 mb-5">
          <span className="text-xl">⭐</span>
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Most Confident</div>
            <div className="text-sm font-semibold">{winner}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

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
                  <span className="text-[10px] bg-emerald-400/15 text-emerald-400 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">Top</span>
                )}
              </div>

              <div className={`flex items-center gap-2 font-display font-bold text-base mb-2 ${color}`}>
                <span>{emoji}</span> {r.prediction}
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

      <div className="mt-4 bg-yellow-400/5 border border-yellow-400/15 rounded-xl px-4 py-3 text-xs text-yellow-400/70 leading-relaxed">
        ⚠️ AI research tool only. Consult a qualified medical professional before clinical use.
      </div>

    </div>
  );
}

export default function Results({ data, imageUrl, modelKey, onReset }) {
  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">Analysis Results</h2>
        <SecondaryBtn onClick={onReset} className="self-start sm:self-auto text-sm !px-5 !py-2.5">
          New Analysis
        </SecondaryBtn>
      </div>

      {modelKey === 'compare'
        ? <CompareResult data={data} />
        : <SingleResult data={data} imageUrl={imageUrl} modelName={modelKey} />
      }
      
    </div>
  );
}
