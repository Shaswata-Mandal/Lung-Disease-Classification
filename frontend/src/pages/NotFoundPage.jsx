import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from '../components/UI';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl sm:text-8xl mb-6">🫁</div>
      <div className="font-display font-extrabold text-6xl sm:text-8xl text-violet-500/30 tracking-tight mb-4">404</div>
      <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-3">Page not found</h1>
      <p className="text-slate-400 text-sm sm:text-base max-w-sm leading-relaxed mb-8">
        The page you're looking for doesn't exist. Head back to the home page or try analyzing an X-ray.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <PrimaryBtn onClick={() => navigate('/')}>Go Home</PrimaryBtn>
        <button
          onClick={() => navigate('/predict')}
          className="text-sm text-slate-400 hover:text-white transition-colors px-6 py-3 border border-white/10 hover:border-white/20 rounded-full"
        >
          Analyze X-Ray
        </button>
      </div>
    </div>
  );
}
