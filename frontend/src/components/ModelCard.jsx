import { Badge } from './UI';
 
export default function ModelCard({ model, selected, onSelect }) {
  const isSelected = selected === model.key;
 
  // Toggle: clicking selected model deselects it
  const handleClick = () => onSelect(isSelected ? null : model.key);
 
  return (
    <div
      onClick={handleClick}
      className={`relative rounded-2xl p-5 sm:p-6 cursor-pointer border-2 transition-all duration-200 flex flex-col gap-4
        ${isSelected
          ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_8px_32px_rgba(124,92,252,0.2)] -translate-y-0.5'
          : 'border-white/[0.07] bg-white/[0.03] hover:border-violet-500/40 hover:bg-white/[0.05] hover:-translate-y-0.5'
        }`}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center text-[10px] text-white font-bold z-10">
          ✓
        </div>
      )}
 
      {/* Header: icon + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-colors ${isSelected ? 'bg-violet-500/20' : 'bg-violet-500/10'}`}>
          {model.icon}
        </div>
        <Badge type={model.badgeType}>{model.badge}</Badge>
      </div>
 
      {/* Name + description */}
      <div>
        <div className="font-display font-bold text-base sm:text-lg mb-1.5">{model.name}</div>
        <div className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">{model.desc}</div>
      </div>
 
      {/* Stats row */}
      <div className="flex gap-4 pt-4 border-t border-white/[0.06] mt-auto">
        {[
          { label: 'Accuracy', val: model.accuracy },
          { label: 'F1-Score', val: model.f1 },
          { label: 'Params',   val: model.params   },
        ].map(s => (
          <div key={s.label}>
            <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-0.5">{s.label}</div>
            <div className={`font-display font-bold text-sm ${isSelected ? 'text-violet-300' : 'text-white'}`}>
              {s.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}