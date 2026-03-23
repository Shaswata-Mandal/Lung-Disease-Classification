import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODELS, API_BASE } from '../data/constants';
import ModelCard from '../components/ModelCard';
import Footer from '../components/Footer';
import { SectionTag } from '../components/UI';
import useScrollLock from '../hooks/useScrollLock';
import logo from "../assets/logo.png";

// Sample images stored in src/assets/samples/
import normalImg from '../assets/samples/normal.jpeg';
import pneumoniaImg from '../assets/samples/pneumonia.jpeg';
import tbImg from '../assets/samples/tuberculosis.jpg';
import covidImg from '../assets/samples/covid.png';

const STEP_LABEL = {
  1: { title: 'Choose your model', hint: 'Click a card to select — click again to deselect' },
  2: { title: 'Upload chest X-ray', hint: 'PNG, JPG, JPEG · up to 10MB' },
};

const SAMPLE_IMAGES = [
  {
    label: 'Normal',
    emoji: '✅',
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/8',
    borderClass: 'border-emerald-400/20',
    src: normalImg,
    filename: 'sample_normal.jpg',
  },
  {
    label: 'Pneumonia',
    emoji: '🌡️',
    colorClass: 'text-yellow-400',
    bgClass: 'bg-yellow-400/8',
    borderClass: 'border-yellow-400/20',
    src: pneumoniaImg,
    filename: 'sample_pneumonia.jpg',
  },
  {
    label: 'Tuberculosis',
    emoji: '🔬',
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-400/8',
    borderClass: 'border-cyan-400/20',
    src: tbImg,
    filename: 'sample_tuberculosis.jpg',
  },
  {
    label: 'COVID-19',
    emoji: '🦠',
    colorClass: 'text-red-400',
    bgClass: 'bg-red-400/8',
    borderClass: 'border-red-400/20',
    src: covidImg,
    filename: 'sample_covid.jpg',
  },
];

export default function PredictPage() {

  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [samplesOpen, setSamplesOpen] = useState(false);
  const fileRef = useRef(null);

  useScrollLock(loading);

  const modelName = MODELS.find(m => m.key === selectedModel)?.name || selectedModel || '';

  const handleFile = (f) => {

    if (!f?.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG)');
      return;
    }

    setFile(f);
    setError(null);
    const reader = new FileReader();
    reader.onload = e => setImageUrl(e.target.result);
    reader.readAsDataURL(f);

  };

  // Use a sample
  const useSampleImage = async (sample) => {
    try {
      const res = await fetch(sample.src);
      const blob = await res.blob();
      const type = blob.type || 'image/jpeg';
      const syntheticFile = new File([blob], sample.filename, { type });
      handleFile(syntheticFile);
      setSamplesOpen(false); // collapse panel after selection
    } catch {
      setError('Failed to load sample image.');
    }
  };

  // Download: create a temp anchor pointing at the asset URL
  const downloadSample = (sample) => {
    const a = document.createElement('a');
    a.href = sample.src;
    a.download = sample.filename;
    a.click();
  };

  const runAnalysis = async () => {

    if (!selectedModel || !file) return;
    setLoading(true);
    setError(null);

    try {

      const form = new FormData();
      form.append('file', file);
      form.append('model_name', selectedModel);

      const res = await fetch(`${API_BASE}/predict`, { method: 'POST', body: form });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      navigate('/result', { state: { data, imageUrl, modelKey: selectedModel, modelName } });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };

  const canAnalyze = selectedModel && file && !loading;

  return (
    <div>

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="fixed inset-0 bg-[#06070e]/92 backdrop-blur-xl flex flex-col items-center justify-center z-[100] gap-5 animate-[fadeIn_0.2s_ease]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-[3px] border-violet-500/20 border-t-violet-500 animate-spin" />
            <div className="absolute w-8 h-8 rounded-full bg-violet-500/10 animate-pulse" />
            <span className="absolute text-xl"><img src={logo} className='w-7 h-7' /></span>
          </div>
          <div className="font-display font-bold text-lg sm:text-xl text-white">Running inference...</div>
          <div className="text-sm text-slate-500 text-center px-6 max-w-xs leading-relaxed">
            {selectedModel === 'compare'
              ? 'Running all 7 models simultaneously'
              : `Analyzing with ${modelName}`}
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-violet-500"
                style={{ animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <div className="relative text-center pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.08),transparent 70%)' }}
        />

        <div className="relative">

          <SectionTag>ML Inference Engine</SectionTag>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.04] mb-4">
            Select a model.<br />
            <span className="text-violet-400">Upload. Diagnose.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed font-light">
            Choose from 7 trained models or run all simultaneously for comparison.
          </p>

        </div>

      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex flex-col gap-10 sm:gap-14">

          {/* ── STEP 1: Model selection ── */}
          <div>

            <StepHeader
              num={1}
              title={STEP_LABEL[1].title}
              hint={selectedModel ? `Selected: ${modelName} · click again to deselect` : STEP_LABEL[1].hint}
              done={!!selectedModel}
            />

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MODELS.map(m => (
                <ModelCard key={m.key} model={m} selected={selectedModel} onSelect={setSelectedModel} />
              ))}
            </div>

          </div>

          {/* ── STEP 2: Upload ── */}
          <div>

            <StepHeader
              num={2}
              title={STEP_LABEL[2].title}
              hint={STEP_LABEL[2].hint}
              done={!!file}
            />

            {!file ? (

              <div className="flex flex-col gap-3 mt-2">

                {/* ── Collapsible sample images ── */}
                <div className="mt-2 mb-5 border border-white/[0.07] rounded-2xl overflow-hidden">

                  {/* Toggle header */}
                  <button
                    onClick={() => setSamplesOpen(p => !p)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-150 text-left"
                  >

                    <div className="flex items-center gap-3">
                      <span className="text-lg">🧪</span>
                      <div>
                        <div className="text-sm font-semibold">No X-ray? Try a sample image</div>
                        <div className="text-xs text-slate-500 mt-1">
                          4 labelled chest X-rays — use instantly or download
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <span className="hidden sm:inline text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-1 rounded-full font-bold tracking-widest uppercase">
                        Demo
                      </span>
                      {/* Chevron */}
                      <svg
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${samplesOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                  </button>

                  {/* Collapsible body */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${samplesOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >

                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {SAMPLE_IMAGES.map(s => (
                          <SampleCard
                            key={s.label}
                            sample={s}
                            onUse={useSampleImage}
                            onDownload={downloadSample}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-600 mt-5 text-center">
                        Images sourced from public domain / NIH chest X-ray dataset for demonstration only
                      </p>
                    </div>

                  </div>

                </div>

                {/* Drop zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200
                    ${dragOver
                      ? 'border-violet-500 bg-violet-500/5'
                      : 'border-white/[0.12] bg-white/[0.02] hover:border-violet-500/50 hover:bg-white/[0.04]'
                    }`}
                >
                  <div className="flex justify-center mb-4"><img src={logo} className='w-22 h-22' /></div>
                  <div className="font-semibold text-base sm:text-lg mb-1.5">
                    Drop your X-ray here, or click to browse
                  </div>
                  <div className="text-sm text-slate-500">PNG, JPG, JPEG — up to 10MB</div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFile(e.target.files[0])}
                  />
                </div>

              </div>

            ) : (

              /* File preview */
              <div className="flex flex-row items-start sm:items-center gap-4 mt-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 animate-[fadeUp_0.3s_ease_both]">

                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-xl border border-white/10 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate mb-1">{file.name}</div>
                  <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                </div>

                <button
                  onClick={() => { setFile(null); setImageUrl(null); setError(null); }}
                  className="flex-shrink-0 bg-red-400/10 border border-red-400/20 text-red-400 text-xs px-4 py-2 rounded-xl hover:bg-red-400/15 transition-colors"
                >
                  ✕ <span className='max-sm:hidden'>Remove</span>
                </button>

              </div>

            )}

          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-400/8 border border-red-400/20 rounded-xl px-5 py-3.5 text-sm text-red-400">
              ⚠️ {error}
            </div>
          )}

          {/* ── Analyze button ── */}
          <button
            onClick={runAnalysis}
            disabled={!canAnalyze}
            className={`w-full py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold tracking-wide transition-all duration-200
              ${canAnalyze
                ? 'bg-violet-600 hover:bg-violet-500 text-white hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,92,252,0.35)] cursor-pointer'
                : 'bg-white/[0.04] text-slate-600 border border-white/[0.07] cursor-not-allowed'
              }`}
          >
            {!selectedModel
              ? 'Select a model first'
              : !file
                ? 'Upload an X-ray image'
                : '🔍 Analyze X-Ray'}
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

/* ── Individual sample card ── */
function SampleCard({ sample, onUse, onDownload }) {
  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${sample.borderClass}`}>

      {/* Thumbnail */}
      <div className="aspect-square overflow-hidden bg-[#0c0e1a]">
        <img
          src={sample.src}
          alt={`${sample.label} X-ray`}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-200"
          loading="lazy"
        />
      </div>

      {/* Bottom bar: label + buttons */}
      <div className={`px-3 py-2.5 ${sample.bgClass}`}>
        {/* Label */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm">{sample.emoji}</span>
          <span className={`text-xs font-bold ${sample.colorClass}`}>{sample.label}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={() => onUse(sample)}
            className="flex-1 flex items-center justify-center gap-1 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Use
          </button>
          <button
            onClick={() => onDownload(sample)}
            className="flex items-center justify-center w-7 h-7 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer flex-shrink-0"
            title={`Download ${sample.label} sample`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}

function StepHeader({ num, title, hint, done }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-300
          ${done ? 'bg-emerald-500 text-white' : 'bg-violet-600 text-white'}`}
      >
        {done ? '✓' : num}
      </div>
      <div>
        <div className="font-display font-bold text-lg sm:text-xl">{title}</div>
        <div className="text-xs text-slate-500">{hint}</div>
      </div>
    </div>
  );
}