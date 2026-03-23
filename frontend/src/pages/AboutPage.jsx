import { useNavigate } from 'react-router-dom';
import { TEAM } from '../data/constants';
import { SectionTag, SectionTitle, Reveal, PrimaryBtn } from '../components/UI';
import Footer from '../components/Footer';
 
// Social icon assets — place linkedin.png and github.png in src/assets/social/
import linkedinIcon from '../assets/socials/linkedin.png';
import githubIcon   from '../assets/socials/github.png';
 
/* ── Team member card with social links ── */
function TeamCard({ member }) {

  const socialLinks = [
    member.linkedin && { href: member.linkedin, icon: linkedinIcon, label: 'LinkedIn' },
    member.github   && { href: member.github,   icon: githubIcon,   label: 'GitHub'   },
  ].filter(Boolean);
 
  return (
    <div className="group min-h-full bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-center hover:border-white/[0.14] hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200">

      {/* Avatar */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#111426] border-2 border-white/[0.08] flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3">
        {member.emoji}
      </div>
 
      {/* Name + role + dept */}
      <div className="font-display font-bold text-lg sm:text-xl mb-1">{member.name}</div>
      <div className="text-md text-violet-400 font-semibold mb-0.5">{member.role}</div>
      <div className="text-xs text-slate-600 mb-3">{member.dept}</div>
 
      {/* Social links */}
      {socialLinks.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.12] transition-all duration-150 hover:scale-110"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={link.icon}
                alt={link.label}
                className="w-6 h-6 invert object-contain group-hover:opacity-90 transition-opacity"
              />
            </a>
          ))}
        </div>
      )}

    </div>
  );
}
 
export default function AboutPage() {

  const navigate = useNavigate();

  return (
    <div>

      {/* Hero */}
      <div className="relative text-center pt-25 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.07),transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative flex flex-col items-center">

          <SectionTag>About the Project</SectionTag>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.04] mb-5">
            Engineering Project<br />
            <span className="text-violet-400">in Community Service.</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-400 max-w-xl leading-relaxed font-light">
            EPICS is a year-long academic project at VIT Bhopal University 
            that provides students with the opportunity to develop projects in collaboration with a team, aimed at benefiting the community.
          </p>

        </div>

      </div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 flex flex-col gap-16 sm:gap-20">
 
        {/* Mission */}
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#111426] to-[#13162b] border border-white/[0.07] rounded-2xl sm:rounded-3xl px-6 sm:px-16 py-14 sm:py-20 text-center">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.1),transparent 70%)' }} />
            <div className="relative">
              <div className="text-5xl mb-5">🎯</div>
              <SectionTag>Our Mission</SectionTag>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4 max-w-2xl mx-auto">
                Building the future of autonomous lung diagnostics.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                Born from the need to make AI actionable in healthcare — not just experimental. Pulmora bridges the gap
                between research-grade deep learning and real-world clinical screening workflows, particularly in
                resource-constrained settings where TB, Pneumonia, and COVID-19 continue to be major health burdens.
              </p>
            </div>
          </div>
        </Reveal>
 
        {/* The Problem */}
        <div>

          <Reveal>
            <SectionTag>The Problem</SectionTag>
            <SectionTitle className="!text-2xl sm:!text-3xl lg:!text-4xl">Why chest X-ray AI matters.</SectionTitle>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

            {[
              { icon: '🌍', title: 'Global Burden', desc: 'Lung diseases rank among the highest causes of illness and death worldwide. Millions in lower-income nations lack timely access to specialist radiologists for diagnosis.' },
              { icon: '📡', title: 'Accessibility Gap', desc: 'Chest X-rays are low-cost and widely available. But accurate interpretation requires expertise that is unevenly distributed — AI can help bridge this gap at scale.' },
              { icon: '🧪', title: 'Research Gap', desc: 'Many existing studies focus on binary classification or a single architecture. A systematic multi-class, multi-architecture comparison on a balanced dataset was needed.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 sm:p-8 hover:border-white/[0.12] hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className="font-display font-bold text-base sm:text-lg mb-2">{item.title}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </Reveal>
            ))}

          </div>

        </div>
 
        {/* Four Approaches */}
        <div>

          <Reveal>
            <SectionTag>Our Approach</SectionTag>
            <SectionTitle className="!text-2xl sm:!text-3xl lg:!text-4xl">Four strategies. One benchmark.</SectionTitle>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              Rather than proposing a single architecture, Pulmora systematically evaluates four distinct modeling
              strategies to understand tradeoffs and identify the best approach.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { num: '01', icon: '🏗️', title: 'Custom CNN (Baseline)', desc: 'Designed and trained from scratch with multiple conv blocks, progressive filter expansion, ReLU activations, max-pooling, batch norm, and dropout. Establishes performance baseline without pretraining.' },
              { num: '02', icon: '🔄', title: 'Transfer Learning', desc: 'MobileNetV3, EfficientNetB4, ResNet50, Xception pretrained on ImageNet. Uniform 2-phase training: frozen backbone, then selective fine-tuning. Identical classification head for fair comparison.' },
              { num: '03', icon: '🧬', title: 'Hybrid Attention CNN', desc: 'Custom architecture with CBAM (Convolutional Block Attention Module). Sequential channel and spatial attention focuses on disease-relevant regions. No pretrained weights — pure architectural innovation.' },
              { num: '04', icon: '⚖️', title: 'Ensemble Learning', desc: 'Soft-voting aggregation over Custom CNN + MobileNetV3 + EfficientNetB4 outputs. Leverages complementary feature representations from heterogeneous architectures to reduce individual model biases.' },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-white/[0.02] border-l-[3px] border-violet-800 hover:border-violet-500 border border-white/[0.07] rounded-2xl p-6 sm:p-7 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Approach {item.num}</div>
                      <div className="font-display font-bold text-base sm:text-lg">{item.title}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
 
        {/* Key Findings */}
        <div>

          <Reveal>
            <SectionTag>Key Findings</SectionTag>
            <SectionTitle className="!text-2xl sm:!text-3xl lg:!text-4xl">What the research revealed.</SectionTitle>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {[
              { color: 'text-emerald-400', hex: '#10b981', icon: '🏆', stat: '98.03%', label: 'ResNet50 Accuracy', desc: 'Highest individual model performance. Near-perfect COVID-19 and TB identification. Confusion only between Normal and Pneumonia — clinically justifiable.' },
              { color: 'text-violet-300', hex: '#a78bfa', icon: '⚖️', stat: '97.66%', label: 'Ensemble Accuracy', desc: 'Most reliable overall. TB recall of 1.00 — no tuberculosis cases missed. High inter-model alignment confirms ensemble stability.' },
              { color: 'text-cyan-400', hex: '#22d3ee', icon: '🧬', stat: '96.18%', label: 'Hybrid Attention', desc: 'Strong performance without pretrained weights. CBAM attention filters background noise and focuses on pathological regions.' },
              { color: 'text-yellow-400', hex: '#fbbf24', icon: '⚡', stat: 'κ = 0.94 - 0.98', label: 'Inter-model Agreement', desc: "Transfer learning models show very high Cohen's Kappa agreement, generating consistent and reliable predictions across test samples." },
            ].map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 sm:p-6 hover:border-white/[0.12] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl"
                      style={{ background: `${f.hex}18` }}>{f.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-0.5 ${f.color}`}>{f.stat}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest my-2">{f.label}</div>
                      <div className="text-sm text-slate-400 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

          </div>

        </div>
 
        {/* Future Work */}
        <Reveal>
          <div className="bg-[#0c0e1a] border border-white/[0.07] rounded-2xl p-6 sm:p-10">
            <SectionTag>Future Work</SectionTag>
            <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-6">Where we go from here.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: '🔍', text: 'Explainable AI (Grad-CAM, LIME) for better clinical interpretability of model decisions' },
                { icon: '📊', text: 'Validation on larger, multi-institution datasets across different patient populations' },
                { icon: '🏥', text: 'Multimodal fusion — combining X-ray images with patient metadata and clinical history' },
                { icon: '📱', text: 'Mobile deployment via quantization and pruning for edge devices in low-resource settings' },
              ].map((f, i) => (
                <div key={i} className="flex gap-3 p-4 bg-violet-500/6 border border-violet-500/10 rounded-xl">
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div className="text-sm text-slate-300 leading-relaxed">{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
 
        {/* Team */}
        <div>

          <Reveal>
            <SectionTag>The Team</SectionTag>
            <SectionTitle className="!text-2xl sm:!text-3xl lg:!text-4xl">Built by researchers<br />at VIT Bhopal.</SectionTitle>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>

        </div>
 
        {/* CTA */}
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#111426] to-[#13162b] border border-white/[0.07] rounded-2xl px-6 sm:px-16 py-12 sm:py-16 text-center">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(124,92,252,0.1),transparent 70%)' }} />
            <h2 className="relative font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-3">
              Ready to see it in action?
            </h2>
            <p className="relative text-sm text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
              Upload a chest X-ray and get clinical-grade classification in seconds.
            </p>
            <PrimaryBtn onClick={() => navigate('/predict')} className="relative">
              Analyze X-Ray →
            </PrimaryBtn>
          </div>
        </Reveal>

      </div>
 
      <Footer />

    </div>
  );

}