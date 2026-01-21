
import React, { useState } from 'react';
import { FormStep, FormData } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FormStep.YOU);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    contact: '',
    moment: '',
    pains: [],
    otherPains: '',
    successGoal: '',
    brandVibe: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePainToggle = (pain: string) => {
    setFormData(prev => ({
      ...prev,
      pains: prev.pains.includes(pain)
        ? prev.pains.filter(p => p !== pain)
        : [...prev.pains, pain]
    }));
  };

  const nextStep = () => {
    if (step === FormStep.YOU && (!formData.name || !formData.businessName || !formData.contact)) {
      alert("Por favor, preencha todos os campos desta etapa.");
      return;
    }
    if (step === FormStep.BUSINESS && !formData.moment) {
      alert("Selecione como está seu momento atual.");
      return;
    }
    setStep(prev => (prev < 3 ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(prev => (prev > 1 ? prev - 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const FORMSPREE_ID = "xzddovdl";
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("Houve um erro no envio. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 animate-step">
        <div className="glass p-10 md:p-16 rounded-[2.5rem] max-w-2xl w-full text-center border-[#00FF00]/30 shadow-[0_0_50px_rgba(0,255,0,0.1)]">
          <div className="w-20 h-20 bg-[#00FF00]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-check text-[#00FF00] text-3xl"></i>
          </div>
          <h2 className="font-heading text-4xl font-extrabold mb-6 text-white uppercase tracking-tight">Diagnóstico Recebido</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Sua visão já está em nosso radar. Em breve, um especialista da <span className="text-[#00FF00] font-mono">VM_SOLUTIONS</span> entrará em contato para apresentar sua engenharia digital.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center space-x-3 mx-auto font-mono text-sm text-[#00FF00] hover:neon-text-shadow transition-all"
          >
            <span>[ REINICIALIZAR_SISTEMA ]</span>
            <i className="fas fa-arrow-rotate-right group-hover:rotate-180 transition-transform duration-500"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00FF00]/5 border border-[#00FF00]/20 font-mono text-[10px] text-[#00FF00] tracking-[0.3em] uppercase">
          Digital Engineering Unit // Premium Technology
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
          Vamos <span className="text-[#00FF00] neon-text-shadow">Evoluir</span> seu Negócio?
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-light">
          Conte um pouco sobre sua visão. A gente cuida da engenharia digital.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="w-full max-w-2xl mb-12 relative px-4">
        <div className="flex justify-between items-center relative z-10">
          {[
            { label: 'Identidade', icon: 'fa-user' },
            { label: 'Negócio', icon: 'fa-briefcase' },
            { label: 'Objetivos', icon: 'fa-rocket' }
          ].map((item, idx) => {
            const stepNum = idx + 1;
            const isActive = step >= stepNum;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 
                  ${isActive ? 'border-[#00FF00] bg-[#00FF00]/10 shadow-[0_0_15px_rgba(0,255,0,0.2)]' : 'border-gray-800 bg-[#1a1a1a] text-gray-600'}`}>
                  <i className={`fas ${item.icon} ${isActive ? 'text-[#00FF00]' : ''}`}></i>
                </div>
                <span className={`mt-3 font-mono text-[9px] uppercase tracking-widest ${isActive ? 'text-[#00FF00]' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-6 left-8 right-8 h-[2px] bg-gray-800 -z-0">
          <div 
            className="h-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-700 ease-in-out" 
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl glass p-8 md:p-12 rounded-[2.5rem] relative">
        
        {step === FormStep.YOU && (
          <div className="animate-step space-y-8">
            <div className="mb-10">
              <h3 className="font-mono text-[#00FF00] text-xs mb-2 uppercase tracking-[0.2em] font-bold">ETAPA_01 // O_BÁSICO</h3>
              <p className="text-2xl font-bold text-white">Como podemos te identificar?</p>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-2 tracking-widest uppercase">NOME_PESSOAL</label>
                <div className="relative">
                  <i className="fas fa-signature absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00FF00] transition-colors"></i>
                  <input 
                    required type="text" name="name" value={formData.name} onChange={handleInputChange}
                    placeholder="Como prefere ser chamado?"
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-lg text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-2 tracking-widest uppercase">NOME_MARCA_OU_EMPRESA</label>
                <div className="relative">
                  <i className="fas fa-building absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00FF00] transition-colors"></i>
                  <input 
                    required type="text" name="businessName" value={formData.businessName} onChange={handleInputChange}
                    placeholder="Nome do seu negócio"
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-lg text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-2 tracking-widest uppercase">CONTATO_DIRETO</label>
                <div className="relative">
                  <i className="fas fa-comments absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00FF00] transition-colors"></i>
                  <input 
                    required type="text" name="contact" value={formData.contact} onChange={handleInputChange}
                    placeholder="Seu melhor WhatsApp ou E-mail"
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-lg text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === FormStep.BUSINESS && (
          <div className="animate-step space-y-10">
            <div>
              <h3 className="font-mono text-[#00FF00] text-xs mb-2 uppercase tracking-[0.2em] font-bold">ETAPA_02 // DIAGNÓSTICO</h3>
              <p className="text-2xl font-bold text-white">Qual fase descreve melhor seu momento?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'zero', title: 'Tudo Novo', desc: 'Estou começando do zero.' },
                { id: 'reforma', title: 'Reforma', desc: 'Já existo, mas o digital parou.' },
                { id: 'aceleracao', title: 'Aceleração', desc: 'Venda estável, quero escala.' },
                { id: 'resgate', title: 'Resgate', desc: 'Ajuda urgente com vendas.' }
              ].map(opt => (
                <label 
                  key={opt.id}
                  className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 ${formData.moment === opt.id ? 'border-[#00FF00] bg-[#00FF00]/5 ring-1 ring-[#00FF00]/30' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                >
                  <input 
                    type="radio" name="moment" value={opt.id} checked={formData.moment === opt.id} onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full border border-white/20 absolute top-4 right-4 flex items-center justify-center ${formData.moment === opt.id ? 'border-[#00FF00] bg-[#00FF00]' : ''}`}>
                    {formData.moment === opt.id && <div className="w-1 h-1 bg-black rounded-full"></div>}
                  </div>
                  <span className={`block text-lg font-bold mb-1 transition-colors ${formData.moment === opt.id ? 'text-[#00FF00]' : 'text-white'}`}>{opt.title}</span>
                  <span className="text-xs text-gray-500 leading-snug">{opt.desc}</span>
                </label>
              ))}
            </div>

            <div>
              <p className="text-xl font-bold text-white mb-6">O que mais te incomoda hoje?</p>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {[
                  "Meu site é lento ou amador",
                  "Posto muito e vendo pouco",
                  "Ninguém me acha no Google",
                  "Minha marca não passa confiança"
                ].map((pain) => (
                  <label 
                    key={pain}
                    className={`flex items-center space-x-4 p-5 rounded-2xl cursor-pointer transition-all border ${formData.pains.includes(pain) ? 'border-[#00FF00]/30 bg-[#00FF00]/5' : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all border ${formData.pains.includes(pain) ? 'bg-[#00FF00] border-[#00FF00]' : 'border-white/20'}`}>
                      {formData.pains.includes(pain) && <i className="fas fa-check text-[10px] text-black font-bold"></i>}
                    </div>
                    <input 
                      type="checkbox" className="sr-only" checked={formData.pains.includes(pain)}
                      onChange={() => handlePainToggle(pain)}
                    />
                    <span className="text-gray-300 text-sm font-medium">{pain}</span>
                  </label>
                ))}
              </div>

              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-3 tracking-widest uppercase">OUTRAS_DORES // ADICIONAL</label>
                <textarea 
                  name="otherPains" value={formData.otherPains} onChange={handleInputChange}
                  rows={2}
                  placeholder="Algo específico que não listamos acima?"
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08] resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {step === FormStep.FUTURE && (
          <div className="animate-step space-y-10">
            <div>
              <h3 className="font-mono text-[#00FF00] text-xs mb-2 uppercase tracking-[0.2em] font-bold">ETAPA_03 // VISÃO</h3>
              <p className="text-2xl font-bold text-white">Daqui a 1 ano, o que seria "sucesso"?</p>
            </div>

            <div className="space-y-8">
              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-3 tracking-widest uppercase">META_PRINCIPAL</label>
                <textarea 
                  required name="successGoal" value={formData.successGoal} onChange={handleInputChange}
                  rows={4}
                  placeholder="Ex: Ter a agenda cheia de clientes qualificados ou faturar R$ 50k/mês no digital..."
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-lg text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08] resize-none"
                ></textarea>
              </div>

              <div className="group">
                <label className="block text-gray-500 text-[10px] font-mono mb-3 tracking-widest uppercase">BRAND_VIBE (ESTILO)</label>
                <div className="relative">
                  <i className="fas fa-palette absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00FF00]"></i>
                  <input 
                    type="text" name="brandVibe" value={formData.brandVibe} onChange={handleInputChange}
                    placeholder="Ex: Descontraída como um bar ou sofisticada como um bistrô premium?"
                    className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-lg text-white transition-all outline-none focus:border-[#00FF00]/50 focus:bg-white/[0.08]"
                  />
                </div>
                <p className="mt-3 text-[10px] text-gray-600 italic">Imagine se sua marca fosse um ambiente físico de prestígio...</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex flex-col md:flex-row items-center gap-6">
          {step > 1 && (
            <button 
              type="button" onClick={prevStep}
              className="w-full md:w-auto px-10 py-5 font-mono text-sm text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-2xl"
            >
              <i className="fas fa-chevron-left mr-3 text-xs"></i> [ VOLTAR ]
            </button>
          )}
          
          {step < 3 ? (
            <button 
              type="button" onClick={nextStep}
              className="w-full flex-1 bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all border border-white/10 flex items-center justify-center space-x-3 group"
            >
              <span>PRÓXIMA ETAPA</span>
              <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
          ) : (
            <button 
              type="submit" disabled={isSubmitting}
              className={`w-full flex-1 bg-[#00FF00] text-[#121212] font-heading font-black py-6 px-10 rounded-2xl text-xl transition-all shadow-[0_0_30px_rgba(0,255,0,0.2)] ${isSubmitting ? 'opacity-50 cursor-wait' : 'hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,255,0,0.4)] active:scale-95'}`}
            >
              {isSubmitting ? 'ENVIANDO_DADOS...' : 'INICIALIZAR DIAGNÓSTICO >_'}
            </button>
          )}
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></span>
            <span>SYSTEM_ONLINE</span>
          </div>
          <p className="text-center italic text-gray-500">Prometemos não usar "agencês" complicado na nossa conversa.</p>
        </div>
      </form>

      <footer className="mt-20 mb-12 flex flex-col items-center">
        <div className="flex items-center space-x-6 text-gray-700 font-mono text-[10px] tracking-[0.4em] uppercase">
          <a href="https://wa.me/5511917477832" target="_blank" className="hover:text-[#00FF00] transition-colors">WhatsApp</a>
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span>VM_SOLUTIONS</span>
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span>SP_GLOBAL</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
