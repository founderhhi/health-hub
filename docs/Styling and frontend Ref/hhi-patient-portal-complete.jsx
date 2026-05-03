import React, { useState } from 'react';
import { 
  Home, Calendar, FileText, User, Video, Stethoscope, Award, Pill, 
  TestTube, Plane, Heart, Bell, Search, ChevronRight, ChevronLeft,
  Lock, Clock, Star, MapPin, Download, Upload, Play, X, Check,
  MessageCircle, Phone, Camera, Send, Menu, Settings, LogOut,
  Activity, BookOpen, Shield, AlertCircle, Info, TrendingUp,
  Droplet, Thermometer, Weight, Clipboard, QrCode, Map, Filter,
  Share, Eye, EyeOff, Mail, ArrowRight, Users, Building
} from 'lucide-react';

// ==================== HHI DESIGN SYSTEM ====================
const colors = {
  emerald: '#2ECC71',
  emeraldHover: '#27AE60',
  bioLime: '#AEEA00',
  darkBg: '#0B0F14',
  cardBg: '#121826',
  cardBorder: '#1E293B',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  charcoal: '#34495E',
  warning: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
  info: '#3B82F6',
};

// ==================== COMMON COMPONENTS ====================
const StatusBar = () => (
  <div className="flex justify-between items-center px-4 py-2 text-xs" style={{ color: colors.textSecondary }}>
    <span>9:41</span>
    <div className="flex gap-1 items-center">
      <span>100%</span>
      <div className="w-4 h-2 border rounded-sm" style={{ borderColor: colors.textSecondary }}>
        <div className="w-3 h-1 m-0.5 rounded-sm" style={{ backgroundColor: colors.emerald }}></div>
      </div>
    </div>
  </div>
);

const BottomNav = ({ active, onNavigate }) => {
  const navItems = [
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'records', icon: FileText, label: 'Records' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-around border-t" 
         style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="flex flex-col items-center gap-1 cursor-pointer transition-all"
        >
          <item.icon size={20} color={active === item.id ? colors.emerald : colors.textSecondary} />
          <span className="text-xs" style={{ color: active === item.id ? colors.emerald : colors.textSecondary }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const Header = ({ title, onBack, actions }) => (
  <div className="px-4 py-3 flex justify-between items-center border-b" 
       style={{ borderColor: colors.cardBorder }}>
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={24} color={colors.textPrimary} />
        </button>
      )}
      <h1 className="text-xl font-semibold" style={{ color: colors.textPrimary }}>{title}</h1>
    </div>
    {actions && <div className="flex gap-3">{actions}</div>}
  </div>
);

const Button = ({ children, variant = 'primary', icon: Icon, onClick, disabled, fullWidth }) => {
  const styles = {
    primary: { backgroundColor: colors.emerald, color: 'white' },
    secondary: { backgroundColor: colors.cardBg, color: colors.textPrimary, border: `1px solid ${colors.emerald}` },
    outline: { backgroundColor: 'transparent', color: colors.textPrimary, border: `1px solid ${colors.cardBorder}` },
    danger: { backgroundColor: colors.error, color: 'white' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${fullWidth ? 'w-full' : ''}`}
      style={{ ...styles[variant], opacity: disabled ? 0.5 : 1 }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const ServiceCard = ({ icon: Icon, title, description, locked, color, onClick }) => (
  <button
    onClick={!locked ? onClick : undefined}
    className="p-4 rounded-xl text-left transition-all hover:scale-105 relative"
    style={{ 
      backgroundColor: colors.cardBg, 
      border: `1px solid ${colors.cardBorder}`,
      opacity: locked ? 0.6 : 1,
      cursor: locked ? 'not-allowed' : 'pointer'
    }}
  >
    {locked && (
      <div className="absolute top-3 right-3">
        <Lock size={16} color={colors.textSecondary} />
      </div>
    )}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" 
         style={{ backgroundColor: `${color}20` }}>
      <Icon size={24} color={color} />
    </div>
    <h3 className="text-base font-semibold mb-1" style={{ color: colors.textPrimary }}>{title}</h3>
    <p className="text-sm" style={{ color: colors.textSecondary }}>{description}</p>
  </button>
);

// ==================== ONBOARDING SCREENS ====================
const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  
  const screens = [
    {
      icon: Stethoscope,
      title: "Quality Healthcare, Anytime",
      description: "Connect with certified doctors 24/7 from the comfort of your home",
      color: colors.emerald
    },
    {
      icon: Shield,
      title: "Your Health, Secured",
      description: "Bank-level encryption keeps your medical records safe and private",
      color: colors.info
    },
    {
      icon: Users,
      title: "Complete Care Ecosystem",
      description: "From GP consultations to specialist care, pharmacy, and diagnostics—all in one place",
      color: colors.bioLime
    }
  ];

  const current = screens[step];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      
      {/* Skip button */}
      <div className="px-4 py-3 flex justify-end">
        <button onClick={onComplete} className="text-sm" style={{ color: colors.emerald }}>
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-8" 
             style={{ backgroundColor: `${current.color}20` }}>
          <current.icon size={64} color={current.color} />
        </div>
        
        <h1 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          {current.title}
        </h1>
        <p className="text-base" style={{ color: colors.textSecondary }}>
          {current.description}
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {screens.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{ 
              backgroundColor: i === step ? colors.emerald : colors.cardBorder,
              width: i === step ? '24px' : '8px'
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        {step < screens.length - 1 ? (
          <Button fullWidth onClick={() => setStep(step + 1)}>
            Next
          </Button>
        ) : (
          <Button fullWidth onClick={onComplete}>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};

// ==================== HOME DASHBOARD (OPTION B STYLE) ====================
const HomeScreen = ({ onNavigate }) => {
  const services = [
    {
      id: 'gp',
      icon: Stethoscope,
      title: 'GP Consultation',
      description: 'Connect with a general practitioner in minutes. Available 24/7 for all your health concerns.',
      color: colors.emerald,
      badge: 'Most Popular',
      active: true
    },
    {
      id: 'specialist',
      icon: Award,
      title: 'Specialist Consultation',
      description: 'Book appointments with certified specialists. Currently available through GP referrals.',
      color: '#8B5CF6',
      active: true
    },
    {
      id: 'healwell',
      icon: Video,
      title: 'Heal Well at Home',
      description: 'Access our library of health videos covering common conditions, nutrition, and preventive care.',
      color: '#3B82F6',
      active: true
    },
    {
      id: 'pharmacy',
      icon: Pill,
      title: 'Pharmacy Services',
      description: 'Order medicines from verified pharmacies. QR-code enabled for secure prescription fulfillment.',
      color: '#EC4899',
      active: true
    },
    {
      id: 'diagnostics',
      icon: TestTube,
      title: 'Diagnostics & Lab Tests',
      description: 'Book home sample collection or visit diagnostic centers. Get results directly in your Health Locker.',
      color: '#F59E0B',
      active: true
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel & Insurance',
      description: 'Medical travel assistance and insurance coordination services',
      color: '#6B7280',
      locked: true,
      badge: 'Coming Soon'
    },
    {
      id: 'community',
      icon: Heart,
      title: 'Community Health',
      description: 'Join health initiatives and preventive care programs in your area',
      color: '#6B7280',
      locked: true,
      badge: 'Coming Soon'
    },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: colors.emerald }}>
            <span className="text-white text-sm font-bold">HH</span>
          </div>
          <div>
            <p className="text-xs" style={{ color: colors.textSecondary }}>Good morning</p>
            <h1 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>Sarah 👋</h1>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button className="relative">
            <Bell size={20} color={colors.textSecondary} />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" 
                 style={{ backgroundColor: colors.error }}></div>
          </button>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="mx-4 p-4 rounded-xl mb-4" 
           style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.emerald}20` }}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Your Health Summary</h3>
          <button className="text-xs" style={{ color: colors.emerald }}>View All</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: colors.emerald }}>4</p>
            <p className="text-xs" style={{ color: colors.textSecondary }}>Consultations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: colors.info }}>2</p>
            <p className="text-xs" style={{ color: colors.textSecondary }}>Prescriptions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: colors.warning }}>1</p>
            <p className="text-xs" style={{ color: colors.textSecondary }}>Upcoming</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold" style={{ color: colors.textPrimary }}>Our Services</h2>
        </div>
        
        <div className="space-y-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => !service.locked && onNavigate(service.id)}
              className="w-full p-4 rounded-xl text-left transition-all relative"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                opacity: service.locked ? 0.6 : 1
              }}
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: `${service.color}20` }}>
                  <service.icon size={24} color={service.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold" style={{ color: colors.textPrimary }}>
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span className="text-xs px-2 py-0.5 rounded" 
                            style={{ 
                              backgroundColor: service.locked ? colors.cardBorder : `${colors.emerald}20`,
                              color: service.locked ? colors.textSecondary : colors.emerald
                            }}>
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {service.description}
                  </p>
                </div>
                {service.locked ? (
                  <Lock size={20} color={colors.textSecondary} className="flex-shrink-0" />
                ) : (
                  <ChevronRight size={20} color={colors.textSecondary} className="flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
};

// ==================== GP CONSULTATION FLOW ====================
const GPConsultationFlow = ({ onBack, onNavigate }) => {
  const [screen, setScreen] = useState('entry'); // entry, intake, waiting, active, summary

  // Entry Screen
  if (screen === 'entry') {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
        <StatusBar />
        <Header title="GP Consultation" onBack={onBack} />
        
        <div className="flex-1 overflow-auto px-4 py-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" 
                 style={{ backgroundColor: `${colors.emerald}20` }}>
              <Stethoscope size={48} color={colors.emerald} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
              Talk to a Doctor Now
            </h1>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Connect with a certified GP in under 5 minutes
            </p>
          </div>

          {/* How it Works */}
          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
            <h3 className="text-base font-semibold mb-3" style={{ color: colors.textPrimary }}>
              How it works
            </h3>
            <div className="space-y-3">
              {[
                { step: 1, text: "Tell us about your symptoms", icon: MessageCircle },
                { step: 2, text: "Connect with a GP via video/chat", icon: Video },
                { step: 3, text: "Get prescription & care plan", icon: Clipboard }
              ].map(item => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: colors.emerald }}>
                    <span className="text-white text-sm font-bold">{item.step}</span>
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.emerald}10`, border: `1px solid ${colors.emerald}30` }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs mb-1" style={{ color: colors.emerald }}>Consultation Fee</p>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>₹299</p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: colors.textSecondary }}>or</p>
                <p className="text-sm font-semibold" style={{ color: colors.emerald }}>Free for Premium</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button fullWidth onClick={() => setScreen('intake')}>
              Start AI Symptom Check
            </Button>
            <Button variant="secondary" fullWidth>
              <Phone size={18} />
              Call Support Instead
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // AI Intake Screen
  if (screen === 'intake') {
    return <AIIntakeScreen onNext={() => setScreen('waiting')} onBack={() => setScreen('entry')} />;
  }

  // Waiting Room
  if (screen === 'waiting') {
    return <WaitingRoomScreen onStart={() => setScreen('active')} onBack={() => setScreen('intake')} />;
  }

  // Active Consultation
  if (screen === 'active') {
    return <ActiveConsultScreen onEnd={() => setScreen('summary')} onBack={() => setScreen('waiting')} />;
  }

  // Consultation Summary
  if (screen === 'summary') {
    return <ConsultSummaryScreen onHome={() => onNavigate('home')} onNavigate={onNavigate} />;
  }
};

// AI Symptom Intake Screen
const AIIntakeScreen = ({ onNext, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'chief_complaint',
      question: "What's bothering you today?",
      type: 'text',
      placeholder: "E.g., headache, fever, cough..."
    },
    {
      id: 'duration',
      question: "How long have you had these symptoms?",
      type: 'options',
      options: ['Less than 24 hours', '1-3 days', '4-7 days', 'More than a week']
    },
    {
      id: 'severity',
      question: "How would you rate the severity?",
      type: 'scale',
      min: 1,
      max: 10,
      labels: ['Mild', 'Moderate', 'Severe']
    },
    {
      id: 'additional',
      question: "Any other symptoms or concerns?",
      type: 'textarea',
      placeholder: "Tell us more about how you're feeling..."
    }
  ];

  const currentQ = questions[step];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Symptom Assessment" onBack={onBack} />
      
      {/* Progress */}
      <div className="px-4 py-4">
        <div className="flex justify-between text-xs mb-2" style={{ color: colors.textSecondary }}>
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.cardBg }}>
          <div 
            className="h-full rounded-full transition-all" 
            style={{ 
              backgroundColor: colors.emerald,
              width: `${((step + 1) / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: colors.textPrimary }}>
          {currentQ.question}
        </h2>

        {currentQ.type === 'text' && (
          <input
            type="text"
            placeholder={currentQ.placeholder}
            className="w-full px-4 py-3 rounded-xl text-base"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary
            }}
            value={answers[currentQ.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
          />
        )}

        {currentQ.type === 'textarea' && (
          <textarea
            placeholder={currentQ.placeholder}
            rows={5}
            className="w-full px-4 py-3 rounded-xl text-base"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary
            }}
            value={answers[currentQ.id] || ''}
            onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
          />
        )}

        {currentQ.type === 'options' && (
          <div className="space-y-3">
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [currentQ.id]: option })}
                className="w-full p-4 rounded-xl text-left transition-all"
                style={{ 
                  backgroundColor: answers[currentQ.id] === option ? `${colors.emerald}20` : colors.cardBg,
                  border: `2px solid ${answers[currentQ.id] === option ? colors.emerald : colors.cardBorder}`,
                  color: colors.textPrimary
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'scale' && (
          <div>
            <div className="flex justify-between mb-4">
              {currentQ.labels.map((label, i) => (
                <span key={i} className="text-sm" style={{ color: colors.textSecondary }}>
                  {label}
                </span>
              ))}
            </div>
            <input
              type="range"
              min={currentQ.min}
              max={currentQ.max}
              value={answers[currentQ.id] || currentQ.min}
              onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
              className="w-full"
            />
            <div className="text-center mt-4">
              <span className="text-4xl font-bold" style={{ color: colors.emerald }}>
                {answers[currentQ.id] || currentQ.min}
              </span>
              <span className="text-xl" style={{ color: colors.textSecondary }}>/{currentQ.max}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 py-4 flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ChevronLeft size={18} />
            Back
          </Button>
        )}
        <Button 
          fullWidth 
          onClick={() => step < questions.length - 1 ? setStep(step + 1) : onNext()}
        >
          {step < questions.length - 1 ? 'Next' : 'Complete Assessment'}
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};

// Waiting Room Screen
const WaitingRoomScreen = ({ onStart, onBack }) => {
  const [position, setPosition] = useState(3);

  React.useEffect(() => {
    const timer = setTimeout(() => setPosition(0), 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (position === 0) {
      const autoStart = setTimeout(() => onStart(), 2000);
      return () => clearTimeout(autoStart);
    }
  }, [position, onStart]);

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Connecting..." onBack={onBack} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse" 
               style={{ backgroundColor: `${colors.emerald}20` }}>
            <Stethoscope size={64} color={colors.emerald} />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: colors.emerald }}>
            <Clock size={24} color="white" />
          </div>
        </div>

        {/* Status Message */}
        <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: colors.textPrimary }}>
          {position === 0 ? 'Doctor is ready!' : 'Finding you a doctor...'}
        </h2>
        <p className="text-base text-center mb-8" style={{ color: colors.textSecondary }}>
          {position === 0 
            ? 'Starting your consultation now' 
            : `You are #${position} in queue. Estimated wait: ${position * 2} min`}
        </p>

        {/* Queue Position */}
        {position > 0 && (
          <div className="w-full max-w-xs">
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: colors.cardBg }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Queue Position</span>
                <span className="text-2xl font-bold" style={{ color: colors.emerald }}>#{position}</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.cardBorder }}>
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ 
                    backgroundColor: colors.emerald,
                    width: `${(1 - position / 5) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="w-full max-w-xs p-4 rounded-xl" 
             style={{ backgroundColor: `${colors.info}10`, border: `1px solid ${colors.info}30` }}>
          <div className="flex items-start gap-3">
            <Info size={20} color={colors.info} className="flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                Did you know?
              </h4>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                Drinking water before meals can aid digestion and help with weight management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Active Consultation Screen
const ActiveConsultScreen = ({ onEnd, onBack }) => {
  const [messages, setMessages] = useState([
    { role: 'doctor', text: "Hello Sarah, I've reviewed your symptoms. Can you tell me more about when the headache started?" },
    { role: 'patient', text: "It started yesterday morning and has been getting worse." },
    { role: 'doctor', text: "I see. Are you experiencing any sensitivity to light or nausea?" }
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      
      {/* Doctor Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b" 
           style={{ borderColor: colors.cardBorder, backgroundColor: colors.cardBg }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ChevronLeft size={24} color={colors.textPrimary} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">DR</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Dr. Anjali Sharma</h3>
            <p className="text-xs" style={{ color: colors.emerald }}>● Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full" style={{ backgroundColor: colors.emerald }}>
            <Video size={20} color="white" />
          </button>
          <button className="p-2 rounded-full" style={{ backgroundColor: colors.cardBorder }}>
            <Phone size={20} color={colors.textPrimary} />
          </button>
        </div>
      </div>

      {/* Timer & Info */}
      <div className="px-4 py-2 flex justify-between items-center border-b" 
           style={{ borderColor: colors.cardBorder, backgroundColor: `${colors.warning}10` }}>
        <div className="flex items-center gap-2">
          <Clock size={16} color={colors.warning} />
          <span className="text-xs" style={{ color: colors.textSecondary }}>12:34 elapsed</span>
        </div>
        <span className="text-xs" style={{ color: colors.warning }}>3 min remaining</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className="max-w-[70%] px-4 py-3 rounded-2xl"
              style={{ 
                backgroundColor: msg.role === 'patient' ? colors.emerald : colors.cardBg,
                color: msg.role === 'patient' ? 'white' : colors.textPrimary
              }}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t" style={{ borderColor: colors.cardBorder, backgroundColor: colors.cardBg }}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-sm"
            style={{ 
              backgroundColor: colors.darkBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary
            }}
          />
          <button className="p-3 rounded-xl" style={{ backgroundColor: colors.emerald }}>
            <Send size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Consultation Summary Screen
const ConsultSummaryScreen = ({ onHome, onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Consultation Summary" />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* Success Message */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" 
               style={{ backgroundColor: colors.success }}>
            <Check size={40} color="white" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Consultation Complete
          </h2>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Your prescription and care plan are ready
          </p>
        </div>

        {/* Doctor Info */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold">DR</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Dr. Anjali Sharma</h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>MBBS, General Medicine • 8 years exp</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} fill={colors.warning} color={colors.warning} />
              <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>4.8</span>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>Diagnosis</h3>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
            Tension headache with mild dehydration
          </p>
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.info}10` }}>
            <p className="text-xs" style={{ color: colors.textSecondary }}>
              <strong style={{ color: colors.info }}>Advice:</strong> Increase water intake to 8 glasses daily. 
              Take prescribed medication for 3 days. Rest in a dark, quiet room when headache occurs.
            </p>
          </div>
        </div>

        {/* Prescription */}
        <div className="p-4 rounded-xl mb-4" 
             style={{ backgroundColor: `${colors.emerald}10`, border: `2px solid ${colors.emerald}` }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
              Prescription Ready
            </h3>
            <Pill size={20} color={colors.emerald} />
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span style={{ color: colors.textSecondary }}>Ibuprofen 400mg</span>
              <span style={{ color: colors.textPrimary }}>2x daily, 3 days</span>
            </div>
          </div>
          <Button fullWidth onClick={() => onNavigate('pharmacy')}>
            Order from Pharmacy
          </Button>
        </div>

        {/* Follow-up */}
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <div className="flex items-start gap-3">
            <Calendar size={20} color={colors.warning} className="mt-1" />
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                Follow-up Recommended
              </h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                If symptoms persist after 3 days, book another consultation or visit a specialist.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth variant="secondary" onClick={() => onNavigate('records')}>
            <FileText size={18} />
            Save to Health Records
          </Button>
          <Button fullWidth onClick={onHome}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== SPECIALIST SCREEN ====================
const SpecialistScreen = ({ onBack, onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Specialist Consultation" onBack={onBack} />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* Info Banner - GP Referral Required */}
        <div className="p-4 rounded-xl mb-6" 
             style={{ backgroundColor: `${colors.info}10`, border: `1px solid ${colors.info}30` }}>
          <div className="flex items-start gap-3">
            <Info size={20} color={colors.info} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                Currently Available via GP Referral
              </h3>
              <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>
                Specialist consultations are currently available through GP referrals to ensure proper diagnosis and care coordination.
              </p>
              <p className="text-xs font-semibold" style={{ color: colors.info }}>
                ✨ Coming Soon: Self-service specialist bookings will be available directly through the app!
              </p>
            </div>
          </div>
        </div>

        {/* How to Access */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3" style={{ color: colors.textPrimary }}>
            How to Access Specialists
          </h3>
          <div className="space-y-3">
            {[
              { step: 1, title: "Consult a GP", desc: "Start with a general practitioner consultation" },
              { step: 2, title: "Get Referral", desc: "GP will refer you to appropriate specialist if needed" },
              { step: 3, title: "Book Appointment", desc: "Choose from recommended specialists and book" }
            ].map(item => (
              <div key={item.step} className="flex gap-3 p-3 rounded-xl" 
                   style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: colors.emerald }}>
                  <span className="text-white text-sm font-bold">{item.step}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                    {item.title}
                  </h4>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Specialties Preview */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3" style={{ color: colors.textPrimary }}>
            Available Specialties
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Cardiology', icon: Activity, color: colors.error },
              { name: 'Dermatology', icon: Shield, color: colors.warning },
              { name: 'Pediatrics', icon: Heart, color: colors.info },
              { name: 'Orthopedics', icon: Award, color: colors.success },
              { name: 'Psychiatry', icon: Activity, color: '#8B5CF6' },
              { name: 'Gynecology', icon: Heart, color: '#EC4899' },
            ].map((specialty, i) => (
              <div key={i} className="p-4 rounded-xl text-center" 
                   style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2" 
                     style={{ backgroundColor: `${specialty.color}20` }}>
                  <specialty.icon size={24} color={specialty.color} />
                </div>
                <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                  {specialty.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button fullWidth onClick={() => onNavigate('gp')}>
          <Stethoscope size={18} />
          Consult GP for Referral
        </Button>
      </div>
    </div>
  );
};

// ==================== HEAL WELL AT HOME ====================
const HealWellAtHomeScreen = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'aches',
      name: 'Common Aches',
      icon: Activity,
      color: colors.error,
      videos: 12,
      description: 'Relief for headaches, back pain, joint pain'
    },
    {
      id: 'diseases',
      name: 'Common Diseases',
      icon: Shield,
      color: colors.warning,
      videos: 18,
      description: 'Manage diabetes, hypertension, asthma'
    },
    {
      id: 'nutrition',
      name: 'Nutrition & Diet',
      icon: Heart,
      color: colors.success,
      videos: 24,
      description: 'Healthy eating, meal planning, recipes'
    },
    {
      id: 'chronic',
      name: 'Chronic Disease Management',
      icon: Activity,
      color: colors.info,
      videos: 15,
      description: 'Long-term care for chronic conditions'
    },
    {
      id: 'preventive',
      name: 'Preventive Care',
      icon: Shield,
      color: '#8B5CF6',
      videos: 20,
      description: 'Stay healthy, prevent illness'
    },
  ];

  if (!selectedCategory) {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
        <StatusBar />
        <Header title="Heal Well at Home" onBack={onBack} />
        
        <div className="flex-1 overflow-auto px-4 py-6">
          {/* Hero */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
              Your Health Education Library
            </h2>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Expert-curated videos to help you stay healthy
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} color={colors.textSecondary} />
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                color: colors.textPrimary
              }}
            />
          </div>

          {/* Categories */}
          <h3 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Browse by Category
          </h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className="w-full p-4 rounded-xl text-left transition-all hover:scale-105"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.cardBorder}`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: `${category.color}20` }}>
                    <category.icon size={28} color={category.color} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold mb-1" style={{ color: colors.textPrimary }}>
                      {category.name}
                    </h4>
                    <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>
                      {category.description}
                    </p>
                    <span className="text-xs px-2 py-1 rounded" 
                          style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                      {category.videos} videos
                    </span>
                  </div>
                  <ChevronRight size={20} color={colors.textSecondary} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <BottomNav active="home" />
      </div>
    );
  }

  // Video List within Category
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header 
        title={selectedCategory.name} 
        onBack={() => setSelectedCategory(null)} 
      />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden" 
                 style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
              {/* Thumbnail */}
              <div className="relative h-40" style={{ backgroundColor: colors.cardBorder }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${selectedCategory.color}40` }}>
                    <Play size={32} color="white" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-semibold" 
                     style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white' }}>
                  8:42
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h4 className="text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Managing Headaches: Natural Remedies
                </h4>
                <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>
                  Learn effective home remedies to relieve headache pain without medication
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: colors.textSecondary }}>
                    Dr. Sarah Johnson
                  </span>
                  <div className="flex items-center gap-3 text-xs" style={{ color: colors.textSecondary }}>
                    <span>2.3k views</span>
                    <span>•</span>
                    <span>3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== PHARMACY ====================
const PharmacyScreen = ({ onBack, onNavigate }) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Anjali Sharma',
      date: 'Jan 28, 2026',
      status: 'Active',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '2x daily', duration: '3 days', quantity: 6 }
      ]
    },
    {
      id: 2,
      doctor: 'Dr. Rajesh Kumar',
      date: 'Jan 20, 2026',
      status: 'Fulfilled',
      medicines: [
        { name: 'Vitamin D3', dosage: '1x daily', duration: '30 days', quantity: 30 }
      ]
    }
  ];

  if (!selectedPrescription) {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
        <StatusBar />
        <Header title="Pharmacy Services" onBack={onBack} />
        
        <div className="flex-1 overflow-auto px-4 py-6">
          {/* Info Banner */}
          <div className="p-4 rounded-xl mb-6" 
               style={{ backgroundColor: `${colors.emerald}10`, border: `1px solid ${colors.emerald}30` }}>
            <div className="flex items-center gap-3">
              <QrCode size={24} color={colors.emerald} />
              <div>
                <h3 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                  QR-Code Enabled Prescriptions
                </h3>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Show QR code at any verified pharmacy for secure fulfillment
                </p>
              </div>
            </div>
          </div>

          {/* My Prescriptions */}
          <h3 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
            My Prescriptions
          </h3>
          
          <div className="space-y-3 mb-6">
            {prescriptions.map((rx) => (
              <button
                key={rx.id}
                onClick={() => setSelectedPrescription(rx)}
                className="w-full p-4 rounded-xl text-left transition-all"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.cardBorder}`
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                      {rx.doctor}
                    </h4>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {rx.date}
                    </p>
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: rx.status === 'Active' ? `${colors.emerald}20` : `${colors.textSecondary}20`,
                      color: rx.status === 'Active' ? colors.emerald : colors.textSecondary
                    }}
                  >
                    {rx.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.textPrimary }}>
                    {rx.medicines.length} medicine(s)
                  </span>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </div>
              </button>
            ))}
          </div>

          {/* Find Pharmacy */}
          <Button fullWidth variant="secondary" icon={Map}>
            Find Verified Pharmacies
          </Button>
        </div>

        <BottomNav active="home" onNavigate={onNavigate} />
      </div>
    );
  }

  // Prescription Detail with QR Code
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header 
        title="Prescription Detail" 
        onBack={() => setSelectedPrescription(null)}
        actions={
          <button>
            <Download size={20} color={colors.textPrimary} />
          </button>
        }
      />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="w-48 h-48 rounded-xl flex items-center justify-center mx-auto mb-4" 
               style={{ backgroundColor: 'white' }}>
            <QrCode size={180} color={colors.charcoal} />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
            Show this QR code at pharmacy
          </p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Valid until Feb 5, 2026
          </p>
        </div>

        {/* Prescription Details */}
        <div className="p-4 rounded-xl mb-4" 
             style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
            Prescribed Medicines
          </h3>
          {selectedPrescription.medicines.map((med, i) => (
            <div key={i} className="py-3 border-b last:border-b-0" 
                 style={{ borderColor: colors.cardBorder }}>
              <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                {med.name}
              </h4>
              <div className="flex justify-between text-xs" style={{ color: colors.textSecondary }}>
                <span>Dosage: {med.dosage}</span>
                <span>Duration: {med.duration}</span>
              </div>
              <div className="mt-2 text-xs" style={{ color: colors.textSecondary }}>
                Quantity: {med.quantity} tablets
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Info */}
        <div className="p-4 rounded-xl mb-4" 
             style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>Prescribed by</p>
              <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                {selectedPrescription.doctor}
              </p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {selectedPrescription.date}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth icon={Map}>
            Find Nearby Pharmacy
          </Button>
          <Button fullWidth variant="secondary" icon={Download}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== MY APPOINTMENTS ====================
const AppointmentsScreen = ({ onNavigate }) => {
  const [tab, setTab] = useState('upcoming');

  const upcoming = [
    {
      id: 1,
      type: 'Specialist',
      doctor: 'Dr. Priya Reddy',
      specialty: 'Cardiologist',
      date: 'Feb 2, 2026',
      time: '10:00 AM',
      mode: 'Video Call',
      status: 'Confirmed'
    }
  ];

  const past = [
    {
      id: 2,
      type: 'GP',
      doctor: 'Dr. Anjali Sharma',
      specialty: 'General Practitioner',
      date: 'Jan 28, 2026',
      time: '2:30 PM',
      mode: 'Video Call',
      status: 'Completed'
    },
    {
      id: 3,
      type: 'GP',
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'General Practitioner',
      date: 'Jan 20, 2026',
      time: '11:00 AM',
      mode: 'Video Call',
      status: 'Completed'
    }
  ];

  const appointments = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="My Appointments" />
      
      {/* Tabs */}
      <div className="px-4 py-3 flex gap-2 border-b" style={{ borderColor: colors.cardBorder }}>
        <button
          onClick={() => setTab('upcoming')}
          className="flex-1 py-2 px-4 rounded-lg font-medium transition-all"
          style={{ 
            backgroundColor: tab === 'upcoming' ? colors.emerald : colors.cardBg,
            color: tab === 'upcoming' ? 'white' : colors.textSecondary
          }}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          onClick={() => setTab('past')}
          className="flex-1 py-2 px-4 rounded-lg font-medium transition-all"
          style={{ 
            backgroundColor: tab === 'past' ? colors.emerald : colors.cardBg,
            color: tab === 'past' ? 'white' : colors.textSecondary
          }}
        >
          Past ({past.length})
        </button>
      </div>

      <div className="flex-1 overflow-auto px-4 py-6">
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} color={colors.textSecondary} className="mx-auto mb-4" />
            <p className="text-sm mb-2" style={{ color: colors.textPrimary }}>
              No {tab} appointments
            </p>
            <p className="text-xs mb-4" style={{ color: colors.textSecondary }}>
              Book a consultation to get started
            </p>
            <Button onClick={() => onNavigate('gp')}>
              <Stethoscope size={18} />
              Consult a Doctor
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div 
                key={appt.id}
                className="p-4 rounded-xl"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${tab === 'upcoming' ? colors.emerald : colors.cardBorder}`
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs px-2 py-1 rounded" 
                          style={{ backgroundColor: `${colors.info}20`, color: colors.info }}>
                      {appt.type}
                    </span>
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: appt.status === 'Confirmed' ? `${colors.emerald}20` : `${colors.textSecondary}20`,
                      color: appt.status === 'Confirmed' ? colors.emerald : colors.textSecondary
                    }}
                  >
                    {appt.status}
                  </span>
                </div>

                <h3 className="text-base font-semibold mb-1" style={{ color: colors.textPrimary }}>
                  {appt.doctor}
                </h3>
                <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                  {appt.specialty}
                </p>

                <div className="flex items-center gap-4 text-xs mb-3" style={{ color: colors.textSecondary }}>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video size={14} />
                    <span>{appt.mode}</span>
                  </div>
                </div>

                {tab === 'upcoming' && (
                  <div className="flex gap-2">
                    <Button fullWidth variant="secondary">
                      Reschedule
                    </Button>
                    <Button fullWidth>
                      Join Call
                    </Button>
                  </div>
                )}

                {tab === 'past' && (
                  <Button fullWidth variant="outline" onClick={() => onNavigate('records')}>
                    View Records
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="appointments" onNavigate={onNavigate} />
    </div>
  );
};

// ==================== HEALTH RECORDS ====================
const HealthRecordsScreen = ({ onNavigate }) => {
  const [section, setSection] = useState('overview');

  const sections = [
    { id: 'overview', icon: Activity, label: 'Overview' },
    { id: 'consultations', icon: Stethoscope, label: 'Consultations' },
    { id: 'prescriptions', icon: Pill, label: 'Prescriptions' },
    { id: 'tests', icon: TestTube, label: 'Lab Results' },
    { id: 'documents', icon: FileText, label: 'Documents' },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Health Records" />
      
      {/* Section Tabs */}
      <div className="px-4 py-3 overflow-x-auto border-b" style={{ borderColor: colors.cardBorder }}>
        <div className="flex gap-2">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setSection(sec.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all"
              style={{ 
                backgroundColor: section === sec.id ? colors.emerald : colors.cardBg,
                color: section === sec.id ? 'white' : colors.textSecondary
              }}
            >
              <sec.icon size={16} />
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-6">
        {section === 'overview' && (
          <div className="space-y-4">
            {/* Health Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg }}>
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope size={16} color={colors.emerald} />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>Consultations</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>4</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg }}>
                <div className="flex items-center gap-2 mb-2">
                  <Pill size={16} color={colors.info} />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>Prescriptions</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>2</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg }}>
                <div className="flex items-center gap-2 mb-2">
                  <TestTube size={16} color={colors.warning} />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>Lab Tests</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>3</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg }}>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} color={colors.success} />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>Documents</span>
                </div>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>8</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-base font-semibold mb-3" style={{ color: colors.textPrimary }}>
                Recent Activity
              </h3>
              <div className="space-y-2">
                {[
                  { type: 'Consultation', doctor: 'Dr. Anjali Sharma', date: 'Jan 28', icon: Stethoscope, color: colors.emerald },
                  { type: 'Lab Result', doctor: 'CBC Test', date: 'Jan 25', icon: TestTube, color: colors.warning },
                  { type: 'Prescription', doctor: 'Dr. Rajesh Kumar', date: 'Jan 20', icon: Pill, color: colors.info }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" 
                       style={{ backgroundColor: colors.cardBg }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                         style={{ backgroundColor: `${item.color}20` }}>
                      <item.icon size={20} color={item.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                        {item.type}
                      </p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        {item.doctor}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'documents' && (
          <div>
            <Button fullWidth variant="secondary" icon={Upload} className="mb-4">
              Upload Document
            </Button>
            <p className="text-center text-sm" style={{ color: colors.textSecondary }}>
              No documents uploaded yet
            </p>
          </div>
        )}
      </div>

      <BottomNav active="records" onNavigate={onNavigate} />
    </div>
  );
};

// ==================== PROFILE ====================
const ProfileScreen = ({ onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title="Profile" />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">S</span>
          </div>
          <h2 className="text-xl font-bold mb-1" style={{ color: colors.textPrimary }}>
            Sarah Johnson
          </h2>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            sarah.j@email.com
          </p>
        </div>

        {/* Subscription */}
        <div className="p-4 rounded-xl mb-6" 
             style={{ backgroundColor: `${colors.emerald}10`, border: `1px solid ${colors.emerald}` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs mb-1" style={{ color: colors.emerald }}>Current Plan</p>
              <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>Premium</p>
            </div>
            <Button variant="secondary">Manage</Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {[
            { icon: User, label: 'Personal Information', value: '' },
            { icon: Shield, label: 'Privacy & Security', value: '' },
            { icon: Bell, label: 'Notifications', value: 'On' },
            { icon: Settings, label: 'App Settings', value: '' },
            { icon: Heart, label: 'Family Members', value: '2' },
            { icon: Info, label: 'Help & Support', value: '' },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full p-4 rounded-xl flex items-center justify-between transition-all"
              style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} color={colors.textSecondary} />
                <span style={{ color: colors.textPrimary }}>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    {item.value}
                  </span>
                )}
                <ChevronRight size={16} color={colors.textSecondary} />
              </div>
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button fullWidth variant="danger" icon={LogOut} className="mt-6">
          Logout
        </Button>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
};

// ==================== COMING SOON PAGE ====================
const ComingSoonScreen = ({ title, description, features, onBack, onNavigate }) => {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.darkBg }}>
      <StatusBar />
      <Header title={title} onBack={onBack} />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" 
               style={{ backgroundColor: `${colors.bioLime}20` }}>
            <Plane size={48} color={colors.bioLime} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Coming Soon!
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {description}
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4" style={{ color: colors.textPrimary }}>
            Upcoming Features
          </h3>
          <div className="space-y-3">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" 
                   style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" 
                     style={{ backgroundColor: `${colors.bioLime}20` }}>
                  <Check size={20} color={colors.bioLime} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                    {feature.title}
                  </h4>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notify Me Form */}
        <div className="p-4 rounded-xl mb-4" 
             style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
            Get notified when available
          </h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl text-sm mb-3"
            style={{ 
              backgroundColor: colors.darkBg,
              border: `1px solid ${colors.cardBorder}`,
              color: colors.textPrimary
            }}
          />
          <Button fullWidth>
            <Bell size={18} />
            Notify Me
          </Button>
        </div>

        <Button fullWidth variant="outline" onClick={() => onNavigate('home')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
export default function HHIPatientPortal() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    if (!isAuthenticated && currentScreen === 'onboarding') {
      return <OnboardingScreen onComplete={() => setIsAuthenticated(true)} />;
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      
      case 'gp':
        return <GPConsultationFlow onBack={() => navigate('home')} onNavigate={navigate} />;
      
      case 'specialist':
        return <SpecialistScreen onBack={() => navigate('home')} onNavigate={navigate} />;
      
      case 'healwell':
        return <HealWellAtHomeScreen onBack={() => navigate('home')} />;
      
      case 'pharmacy':
        return <PharmacyScreen onBack={() => navigate('home')} onNavigate={navigate} />;
      
      case 'appointments':
        return <AppointmentsScreen onNavigate={navigate} />;
      
      case 'records':
        return <HealthRecordsScreen onNavigate={navigate} />;
      
      case 'profile':
        return <ProfileScreen onNavigate={navigate} />;
      
      case 'travel':
        return (
          <ComingSoonScreen 
            title="Travel & Insurance"
            description="We're building comprehensive travel and insurance services to support your medical journey."
            features={[
              { title: 'Flight Booking', description: 'Book flights for medical travel with special assistance' },
              { title: 'Hotel Accommodation', description: 'Partner hotels near medical facilities' },
              { title: 'Travel Insurance', description: 'Comprehensive coverage for medical trips' },
              { title: 'Insurance Claims', description: 'Seamless coordination with your insurance provider' }
            ]}
            onBack={() => navigate('home')}
            onNavigate={navigate}
          />
        );
      
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#000000' }}>
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-[375px] h-[812px] rounded-[3rem] overflow-hidden shadow-2xl relative" 
             style={{ backgroundColor: colors.darkBg, border: '8px solid #1a1a1a' }}>
          {renderScreen()}
        </div>
        
        {/* Screen Indicator */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-sm text-gray-400">
            Current: <span className="text-emerald-400 font-semibold">{currentScreen}</span>
          </p>
        </div>
      </div>

      {/* Navigation Buttons (for demo) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-2xl p-4 shadow-2xl">
        <p className="text-xs text-gray-400 mb-2 text-center">Quick Navigation (Demo)</p>
        <div className="flex flex-wrap gap-2 max-w-md">
          {['home', 'gp', 'specialist', 'healwell', 'pharmacy', 'appointments', 'records', 'profile', 'travel'].map(screen => (
            <button
              key={screen}
              onClick={() => navigate(screen)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
              style={{ 
                backgroundColor: currentScreen === screen ? colors.emerald : colors.cardBg,
                color: currentScreen === screen ? 'white' : colors.textSecondary
              }}
            >
              {screen}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
