import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Predict', path: '/predict' },
  { label: 'About', path: '/about' },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/60 bg-[#0c0e1a] px-5 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col justify-center sm:flex-row gap-10 sm:gap-16 mb-10">

          {/* Brand */}
          <div className="flex flex-col max-sm:items-center flex-1 min-w-0">
            
            <div className="flex gap-2 font-display font-extrabold text-lg tracking-wide mb-3">
              <span className='flex items-center'><img src={logo} className='h-6 w-6' alt="" /></span>
              <div>
                <span>Pulmora</span>
                <span className="text-violet-400">.ml</span>
              </div>
            </div>

            <p className="text-sm max-sm:text-center text-slate-500 leading-relaxed">
              Engineering Project in Community Service<br />
              Lung Disease Classification · VIT Bhopal University
            </p>

          </div>

          <div className='flex flex-wrap gap-10 justify-center'>

            {/* Navigate */}
            <div className=''>
              <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-500 mb-4">Navigate</h4>
              <ul className="flex flex-col gap-2.5">
                {NAV.map(l => (
                  <li key={l.label}>
                    <button
                      onClick={() => navigate(l.path)}
                      className="cursor-pointer text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project */}
            <div>

              <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-500 mb-4">
                Project
              </h4>

              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'Dataset', url: 'https://www.kaggle.com/datasets/shaswatam/epics-lung-disease-dataset' },
                  { name: 'GitHub', url: 'https://github.com/Shaswata-Mandal/Lung-Disease-Classification' },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

            </div>

          </div>

        </div>

        <div className="pt-6 border-t border-white/50 max-sm:items-center flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 EPICS Project · VIT Bhopal University</span>
          <span>Built with ❤️ by Team Pulmora.ml</span>
        </div>
      </div>
    </footer>
  );
}
