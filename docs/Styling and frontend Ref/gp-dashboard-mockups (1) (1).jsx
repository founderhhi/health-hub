import React, { useState } from 'react';
import { Heart, Clock, Users, TrendingUp, Play, Pause, X, Send, Paperclip, Video, Phone, MessageCircle, FileText, UserCheck, Search, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';

const GPDashboardMockups = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('home');

  // Theme colors - EXACT from HHI brand guidelines
  const theme = {
    dark: {
      screenBg: '#121826',
      frameBg: '#0B0F14',
      cardBg: '#1E293B',
      borderColor: '#1E293B',
      textPrimary: '#FFFFFF',
      textSecondary: '#A0AEC0',
      primary: '#2ECC71',
      accent: '#AEEA00',
      charcoal: '#34495E',
    },
    light: {
      screenBg: '#FFFFFF',
      frameBg: '#F8F9FA',
      cardBg: '#FAFAFA',
      borderColor: '#E0E0E0',
      textPrimary: '#1A1A1A',
      textSecondary: '#666666',
      primary: '#2ECC71',
      accent: '#AEEA00',
      charcoal: '#34495E',
    }
  };

  const colors = darkMode ? theme.dark : theme.light;

  // Sample Data
  const todayStats = {
    consultationsCompleted: 12,
    shiftTiming: '9:00 AM - 5:00 PM',
    patientsInQueue: 1,
    satisfactionRate: 4.8,
  };

  const waitingPatients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 32,
      chiefComplaint: 'Persistent headache for 3 days',
      severity: 'Medium',
      waitTime: '12 min',
      isPrevious: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      chiefComplaint: 'High fever and body aches',
      severity: 'High',
      waitTime: '8 min',
      isPrevious: true,
    },
    {
      id: 3,
      name: 'Amara Okonkwo',
      age: 28,
      chiefComplaint: 'Skin rash on arms',
      severity: 'Low',
      waitTime: '15 min',
      isPrevious: false,
    },
  ];

  const activeAppointments = [
    {
      id: 1,
      name: 'David Kamau',
      age: 38,
      type: 'video',
      status: 'active',
      duration: '8:45',
      chiefComplaint: 'Chest pain and shortness of breath',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      type: 'chat',
      status: 'queued',
      chiefComplaint: 'Persistent headache for 3 days',
    },
  ];

  // Phone Frame Component
  const PhoneFrame = ({ children, label }) => (
    <div style={{ margin: '20px' }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: '12px',
        textAlign: 'center',
      }}>
        {label}
      </div>
      <div style={{
        background: colors.frameBg,
        borderRadius: '24px',
        padding: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        maxWidth: '380px',
        margin: '0 auto',
      }}>
        <div style={{
          background: colors.screenBg,
          borderRadius: '16px',
          minHeight: '700px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {children}
        </div>
      </div>
    </div>
  );

  // Status Bar Component
  const StatusBar = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
      fontSize: '12px',
      color: colors.textPrimary,
    }}>
      <span>9:41</span>
      <span>📶 🔋</span>
    </div>
  );

  // Header Component
  const Header = ({ title, showBack = false }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${colors.borderColor}`,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        {showBack && <span style={{ color: colors.primary }}>←</span>}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: colors.primary,
          fontWeight: '700',
          fontSize: '16px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: colors.primary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>
            🌳
          </div>
          {title || 'Health Hub'}
        </div>
      </div>
      <div style={{
        display: 'flex',
        gap: '12px',
        color: colors.textSecondary,
        fontSize: '18px',
      }}>
        <span>🔔</span>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '12px 0',
      background: darkMode ? colors.frameBg : colors.cardBg,
      borderTop: `1px solid ${colors.borderColor}`,
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
    }}>
      {[
        { key: 'home', icon: '🏠', label: 'Home' },
        { key: 'appointments', icon: '📋', label: 'Active' },
        { key: 'profile', icon: '👤', label: 'Profile' },
      ].map((item) => (
        <div
          key={item.key}
          onClick={() => {
            setActiveTab(item.key);
            setActiveScreen(item.key);
          }}
          style={{
            textAlign: 'center',
            color: activeTab === item.key ? colors.primary : colors.textSecondary,
            fontSize: '10px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
          <div style={{ fontWeight: activeTab === item.key ? '600' : '400' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );

  // HOME DASHBOARD SCREEN
  const HomeDashboard = () => (
    <>
      <StatusBar />
      <Header title="GP Dashboard" />
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        {/* Greeting */}
        <div style={{ padding: '20px 16px 16px' }}>
          <h2 style={{
            color: colors.textPrimary,
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '4px',
          }}>
            Good Morning, Dr. Patel 👋
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
            {todayStats.shiftTiming} • {todayStats.consultationsCompleted} consultations today
          </p>
        </div>

        {/* Daily Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '0 16px 16px',
        }}>
          {/* Consultations */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${colors.borderColor}`,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.primary + '20',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <Heart size={20} color={colors.primary} />
            </div>
            <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '4px' }}>
              Completed Today
            </div>
            <div style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700' }}>
              {todayStats.consultationsCompleted}
            </div>
          </div>

          {/* Queue */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${colors.borderColor}`,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.accent + '20',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <Users size={20} color={colors.accent} />
            </div>
            <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '4px' }}>
              In My Queue
            </div>
            <div style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700' }}>
              {todayStats.patientsInQueue}
            </div>
          </div>

          {/* Satisfaction */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${colors.borderColor}`,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.primary + '20',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <TrendingUp size={20} color={colors.primary} />
            </div>
            <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '4px' }}>
              Satisfaction
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
            }}>
              <span style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700' }}>
                {todayStats.satisfactionRate}
              </span>
              <span style={{ color: colors.textSecondary, fontSize: '16px' }}>/5</span>
            </div>
          </div>

          {/* History Link */}
          <div
            onClick={() => setActiveScreen('profile')}
            style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '16px',
              border: `1px solid ${colors.borderColor}`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: colors.primary + '20',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Clock size={20} color={colors.primary} />
            </div>
            <div style={{
              color: colors.textPrimary,
              fontSize: '13px',
              fontWeight: '600',
              textAlign: 'center',
            }}>
              View History
            </div>
          </div>
        </div>

        {/* Waiting Patients Section */}
        <div style={{ padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}>
            <h3 style={{
              color: colors.textPrimary,
              fontSize: '18px',
              fontWeight: '700',
            }}>
              Patients Waiting
            </h3>
            <span style={{
              background: colors.primary + '20',
              color: colors.primary,
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {waitingPatients.length} Available
            </span>
          </div>

          {/* Patient Cards */}
          {waitingPatients.map((patient) => (
            <div
              key={patient.id}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                border: `1px solid ${colors.borderColor}`,
              }}
            >
              {/* Patient Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{
                      color: colors.textPrimary,
                      fontSize: '16px',
                      fontWeight: '600',
                    }}>
                      {patient.name}
                    </h4>
                    {patient.isPrevious && (
                      <span style={{
                        background: colors.accent + '20',
                        color: colors.accent,
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '600',
                      }}>
                        Previous Patient
                      </span>
                    )}
                  </div>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    {patient.age} years • Waiting: {patient.waitTime}
                  </p>
                </div>
                <span style={{
                  background: patient.severity === 'High' ? '#E7454520' :
                    patient.severity === 'Medium' ? colors.accent + '20' :
                    colors.textSecondary + '20',
                  color: patient.severity === 'High' ? '#E74545' :
                    patient.severity === 'Medium' ? colors.accent :
                    colors.textSecondary,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  {patient.severity}
                </span>
              </div>

              {/* Chief Complaint */}
              <div style={{
                background: darkMode ? colors.screenBg : '#F8F9FA',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
              }}>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                }}>
                  Chief Complaint
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '13px',
                  lineHeight: '1.4',
                }}>
                  {patient.chiefComplaint}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                <button
                  onClick={() => setActiveScreen('consultation')}
                  style={{
                    background: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Play size={14} />
                  Accept & Talk
                </button>
                <button
                  onClick={() => {
                    setActiveTab('appointments');
                    setActiveScreen('appointments');
                  }}
                  style={{
                    background: darkMode ? colors.cardBg : '#E8F5E9',
                    color: colors.primary,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Add to Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );

  // ACTIVE APPOINTMENTS SCREEN
  const ActiveAppointments = () => (
    <>
      <StatusBar />
      <Header title="Active Appointments" />
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        <div style={{ padding: '16px' }}>
          {/* Active Consultation */}
          {activeAppointments.filter(a => a.status === 'active').map((appointment) => (
            <div
              key={appointment.id}
              style={{
                background: colors.primary + '15',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px',
                border: `2px solid ${colors.primary}`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <span style={{
                  background: colors.primary,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  ● ACTIVE NOW
                </span>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '16px',
                  fontWeight: '700',
                }}>
                  {appointment.duration}
                </div>
              </div>

              <h3 style={{
                color: colors.textPrimary,
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                {appointment.name}
              </h3>
              <p style={{
                color: colors.textSecondary,
                fontSize: '13px',
                marginBottom: '12px',
              }}>
                {appointment.age} years • {appointment.type === 'video' ? 'Video Call' : 'Chat Consultation'}
              </p>

              <div style={{
                background: darkMode ? colors.screenBg : 'white',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
              }}>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  Chief Complaint
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '13px',
                }}>
                  {appointment.chiefComplaint}
                </div>
              </div>

              <button
                onClick={() => setActiveScreen('consultation')}
                style={{
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Continue Consultation →
              </button>
            </div>
          ))}

          {/* Queued Patients */}
          <div style={{
            color: colors.textSecondary,
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            marginTop: '24px',
          }}>
            Next in Queue
          </div>

          {activeAppointments.filter(a => a.status === 'queued').map((appointment) => (
            <div
              key={appointment.id}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                border: `1px solid ${colors.borderColor}`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <div>
                  <h4 style={{
                    color: colors.textPrimary,
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {appointment.name}
                  </h4>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    {appointment.age} years • {appointment.type === 'chat' ? 'Chat' : 'Video'}
                  </p>
                </div>
                <span style={{
                  background: colors.accent + '20',
                  color: colors.accent,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  NEXT
                </span>
              </div>

              <div style={{
                background: darkMode ? colors.screenBg : '#F8F9FA',
                borderRadius: '12px',
                padding: '10px',
                marginBottom: '12px',
              }}>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '12px',
                }}>
                  {appointment.chiefComplaint}
                </div>
              </div>

              <button
                onClick={() => setActiveScreen('consultation')}
                style={{
                  background: darkMode ? colors.cardBg : 'white',
                  color: colors.primary,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Start Consultation
              </button>
            </div>
          ))}

          {/* Empty State */}
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: colors.textSecondary,
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <p style={{ fontSize: '14px' }}>No more patients in queue</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );

  // CONSULTATION INTERFACE SCREEN
  const ConsultationInterface = () => {
    const [rightPanelExpanded, setRightPanelExpanded] = useState(false);
    const [showPrescription, setShowPrescription] = useState(false);
    const [showReferral, setShowReferral] = useState(false);

    return (
      <>
        <StatusBar />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: `1px solid ${colors.borderColor}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setActiveScreen('appointments')}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.primary,
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ←
            </button>
            <div>
              <div style={{
                color: colors.textPrimary,
                fontSize: '16px',
                fontWeight: '700',
              }}>
                David Kamau
              </div>
              <div style={{
                color: colors.textSecondary,
                fontSize: '11px',
              }}>
                38 years • Video Call • 9:23
              </div>
            </div>
          </div>
          <button
            style={{
              background: colors.primary,
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              color: 'white',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Pause size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Pause
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: rightPanelExpanded || showPrescription || showReferral ? '0fr 1fr' : '60% 40%',
          height: 'calc(100% - 120px)',
          transition: 'grid-template-columns 0.3s',
        }}>
          {/* LEFT PANEL - Interaction */}
          <div style={{
            background: colors.screenBg,
            borderRight: `1px solid ${colors.borderColor}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Video Area */}
            <div style={{
              flex: 1,
              background: '#1a1a2e',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Patient Video */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '48px',
              }}>
                👤
              </div>

              {/* Doctor Self View (PiP) */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                width: '80px',
                height: '100px',
                background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
                borderRadius: '12px',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
              }}>
                👨‍⚕️
              </div>
            </div>

            {/* Video Controls */}
            <div style={{
              padding: '16px',
              background: darkMode ? colors.frameBg : colors.cardBg,
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
            }}>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.cardBg,
                border: `1px solid ${colors.borderColor}`,
                color: colors.textPrimary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Video size={20} />
              </button>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.cardBg,
                border: `1px solid ${colors.borderColor}`,
                color: colors.textPrimary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Phone size={20} />
              </button>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: colors.cardBg,
                border: `1px solid ${colors.borderColor}`,
                color: colors.textSecondary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.4,
              }}>
                <MessageCircle size={20} />
              </button>
              <button style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#E74545',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - Patient Info & Actions */}
          <div style={{
            background: colors.cardBg,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {!showPrescription && !showReferral ? (
              <>
                {/* Patient Context - Upper Half */}
                <div style={{
                  flex: rightPanelExpanded ? 0 : 1,
                  padding: '16px',
                  overflowY: 'auto',
                  borderBottom: `1px solid ${colors.borderColor}`,
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <h4 style={{
                      color: colors.textPrimary,
                      fontSize: '14px',
                      fontWeight: '700',
                    }}>
                      Patient Information
                    </h4>
                    <button
                      onClick={() => setRightPanelExpanded(!rightPanelExpanded)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: colors.textSecondary,
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      {rightPanelExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  </div>

                  {!rightPanelExpanded && (
                    <>
                      <div style={{ marginBottom: '12px' }}>
                        <span style={{
                          background: colors.accent + '20',
                          color: colors.accent,
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: '600',
                        }}>
                          Previous Patient
                        </span>
                      </div>

                      {/* Critical Fields */}
                      <div style={{
                        background: darkMode ? colors.screenBg : 'white',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          color: colors.textSecondary,
                          fontSize: '11px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}>
                          CHIEF COMPLAINT
                        </div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '13px',
                          marginBottom: '12px',
                        }}>
                          Chest pain and shortness of breath for 2 hours
                        </div>

                        <div style={{
                          color: colors.textSecondary,
                          fontSize: '11px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}>
                          SEVERITY & DURATION
                        </div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '13px',
                        }}>
                          High • Started 2 hours ago
                        </div>
                      </div>

                      {/* Medical History Quick View */}
                      <div style={{
                        background: darkMode ? colors.screenBg : 'white',
                        borderRadius: '12px',
                        padding: '12px',
                      }}>
                        <div style={{
                          color: colors.textSecondary,
                          fontSize: '11px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}>
                          ALLERGIES
                        </div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '12px',
                          marginBottom: '8px',
                        }}>
                          Penicillin
                        </div>

                        <button
                          style={{
                            background: 'transparent',
                            border: `1px solid ${colors.primary}`,
                            color: colors.primary,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          View Previous Consultations
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons - Bottom Half */}
                <div style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <button
                    onClick={() => setShowPrescription(true)}
                    style={{
                      background: colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <FileText size={18} />
                    Write Prescription
                  </button>

                  <button
                    onClick={() => setShowReferral(true)}
                    style={{
                      background: darkMode ? colors.screenBg : 'white',
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <UserCheck size={18} />
                    Create Referral
                  </button>
                </div>
              </>
            ) : showPrescription ? (
              // PRESCRIPTION FORM
              <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <h3 style={{
                    color: colors.textPrimary,
                    fontSize: '18px',
                    fontWeight: '700',
                  }}>
                    Write Prescription
                  </h3>
                  <button
                    onClick={() => setShowPrescription(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: colors.textSecondary,
                      cursor: 'pointer',
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Medication 1 */}
                <div style={{
                  background: darkMode ? colors.screenBg : 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${colors.borderColor}`,
                }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    MEDICATION 1
                  </div>

                  <input
                    type="text"
                    placeholder="Drug name"
                    style={{
                      width: '100%',
                      background: darkMode ? colors.cardBg : '#F8F9FA',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '8px',
                      padding: '10px',
                      marginBottom: '8px',
                      color: colors.textPrimary,
                      fontSize: '13px',
                    }}
                  />

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    marginBottom: '8px',
                  }}>
                    <input
                      type="text"
                      placeholder="Dosage"
                      style={{
                        background: darkMode ? colors.cardBg : '#F8F9FA',
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: '8px',
                        padding: '10px',
                        color: colors.textPrimary,
                        fontSize: '13px',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      style={{
                        background: darkMode ? colors.cardBg : '#F8F9FA',
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: '8px',
                        padding: '10px',
                        color: colors.textPrimary,
                        fontSize: '13px',
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Duration (e.g., 7 days)"
                    style={{
                      width: '100%',
                      background: darkMode ? colors.cardBg : '#F8F9FA',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '8px',
                      padding: '10px',
                      marginBottom: '8px',
                      color: colors.textPrimary,
                      fontSize: '13px',
                    }}
                  />

                  <textarea
                    placeholder="Instructions (e.g., Take with food)"
                    rows="2"
                    style={{
                      width: '100%',
                      background: darkMode ? colors.cardBg : '#F8F9FA',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '8px',
                      padding: '10px',
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontFamily: 'Inter',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Add More Button */}
                <button
                  style={{
                    background: 'transparent',
                    border: `2px dashed ${colors.borderColor}`,
                    borderRadius: '12px',
                    padding: '12px',
                    color: colors.textSecondary,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    marginBottom: '16px',
                  }}
                >
                  + Add Another Medication
                </button>

                {/* Notes */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    ADDITIONAL NOTES
                  </div>
                  <textarea
                    placeholder="Any additional instructions or advice..."
                    rows="3"
                    style={{
                      width: '100%',
                      background: darkMode ? colors.screenBg : 'white',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '8px',
                      padding: '12px',
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontFamily: 'Inter',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                }}>
                  <button
                    style={{
                      flex: 1,
                      background: colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Generate Rx
                  </button>
                  <button
                    onClick={() => setShowPrescription(false)}
                    style={{
                      flex: 1,
                      background: darkMode ? colors.screenBg : 'white',
                      color: colors.textSecondary,
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // REFERRAL FORM
              <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <h3 style={{
                    color: colors.textPrimary,
                    fontSize: '18px',
                    fontWeight: '700',
                  }}>
                    Create Referral
                  </h3>
                  <button
                    onClick={() => setShowReferral(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: colors.textSecondary,
                      cursor: 'pointer',
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Referral Reason */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    REASON FOR REFERRAL *
                  </div>
                  <textarea
                    placeholder="Why does this patient need a specialist? Include relevant symptoms, findings, and concerns..."
                    rows="4"
                    style={{
                      width: '100%',
                      background: darkMode ? colors.screenBg : 'white',
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '8px',
                      padding: '12px',
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontFamily: 'Inter',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Referral Type */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    REFERRAL TYPE *
                  </div>

                  <div style={{
                    background: darkMode ? colors.screenBg : 'white',
                    borderRadius: '12px',
                    padding: '12px',
                    marginBottom: '8px',
                    border: `2px solid ${colors.primary}`,
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'white',
                        }}></div>
                      </div>
                      <div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '13px',
                          fontWeight: '600',
                        }}>
                          Specialty Only
                        </div>
                        <div style={{
                          color: colors.textSecondary,
                          fontSize: '11px',
                        }}>
                          Patient chooses specialist
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: darkMode ? colors.screenBg : 'white',
                    borderRadius: '12px',
                    padding: '12px',
                    border: `1px solid ${colors.borderColor}`,
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: `2px solid ${colors.borderColor}`,
                      }}></div>
                      <div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '13px',
                          fontWeight: '600',
                        }}>
                          Recommend Doctors
                        </div>
                        <div style={{
                          color: colors.textSecondary,
                          fontSize: '11px',
                        }}>
                          Select 3-5 specialists
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialty Selection */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    SPECIALTY REQUIRED *
                  </div>
                  <div style={{ position: 'relative' }}>
                    <select
                      style={{
                        width: '100%',
                        background: darkMode ? colors.screenBg : 'white',
                        border: `1px solid ${colors.borderColor}`,
                        borderRadius: '8px',
                        padding: '12px',
                        color: colors.textPrimary,
                        fontSize: '13px',
                        appearance: 'none',
                      }}
                    >
                      <option>Select specialty...</option>
                      <option>Cardiology</option>
                      <option>Dermatology</option>
                      <option>Neurology</option>
                      <option>Orthopedics</option>
                      <option>Pediatrics</option>
                    </select>
                    <ChevronDown
                      size={16}
                      color={colors.textSecondary}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}>
                    URGENCY
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                  }}>
                    {['Routine', 'Urgent', 'Emergency'].map((level, idx) => (
                      <button
                        key={level}
                        style={{
                          background: idx === 1 ? colors.accent + '20' : darkMode ? colors.screenBg : 'white',
                          border: idx === 1 ? `2px solid ${colors.accent}` : `1px solid ${colors.borderColor}`,
                          borderRadius: '8px',
                          padding: '10px',
                          color: idx === 1 ? colors.accent : colors.textPrimary,
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                }}>
                  <button
                    style={{
                      flex: 1,
                      background: colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Create Referral
                  </button>
                  <button
                    onClick={() => setShowReferral(false)}
                    style={{
                      flex: 1,
                      background: darkMode ? colors.screenBg : 'white',
                      color: colors.textSecondary,
                      border: `1px solid ${colors.borderColor}`,
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // PROFILE SCREEN
  const ProfileScreen = () => (
    <>
      <StatusBar />
      <Header title="Profile" />
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        <div style={{ padding: '16px' }}>
          {/* Doctor Profile Card */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            border: `1px solid ${colors.borderColor}`,
            textAlign: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: colors.primary,
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}>
              👨‍⚕️
            </div>
            <h3 style={{
              color: colors.textPrimary,
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '4px',
            }}>
              Dr. Rajesh Patel
            </h3>
            <p style={{
              color: colors.textSecondary,
              fontSize: '13px',
              marginBottom: '8px',
            }}>
              General Practitioner
            </p>
            <div style={{
              display: 'inline-block',
              background: colors.primary + '20',
              color: colors.primary,
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
            }}>
              License: MP/2015/12345
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            border: `1px solid ${colors.borderColor}`,
          }}>
            <h4 style={{
              color: colors.textPrimary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '16px',
            }}>
              This Week's Performance
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Total Consultations
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  47
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Avg. Rating
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  4.8
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Prescriptions
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  38
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Referrals
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  12
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div style={{
            background: colors.cardBg,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            border: `1px solid ${colors.borderColor}`,
          }}>
            <h4 style={{
              color: colors.textPrimary,
              fontSize: '14px',
              fontWeight: '700',
              marginBottom: '16px',
            }}>
              Recent Consultations
            </h4>
            {[
              { patient: 'David Kamau', date: 'Today, 2:30 PM', status: 'Completed' },
              { patient: 'Sarah Johnson', date: 'Today, 11:45 AM', status: 'Completed' },
              { patient: 'Michael Chen', date: 'Yesterday, 4:15 PM', status: 'Completed' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: darkMode ? colors.screenBg : 'white',
                  borderRadius: '8px',
                  marginBottom: idx < 2 ? '8px' : '0',
                }}
              >
                <div>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '13px',
                    fontWeight: '600',
                  }}>
                    {item.patient}
                  </div>
                  <div style={{
                    color: colors.textSecondary,
                    fontSize: '11px',
                  }}>
                    {item.date}
                  </div>
                </div>
                <span style={{
                  background: colors.primary + '20',
                  color: colors.primary,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Settings/Logout */}
          <button
            style={{
              width: '100%',
              background: darkMode ? colors.cardBg : 'white',
              color: '#E74545',
              border: `1px solid #E74545`,
              borderRadius: '12px',
              padding: '14px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      <BottomNav />
    </>
  );

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '40px 20px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          Health Hub International
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          GP Dashboard Mockups - Complete Design System
        </p>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? '#2ECC71' : '#34495E',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>

          <select
            value={activeScreen}
            onChange={(e) => {
              setActiveScreen(e.target.value);
              if (e.target.value === 'home') setActiveTab('home');
              if (e.target.value === 'appointments') setActiveTab('appointments');
              if (e.target.value === 'profile') setActiveTab('profile');
            }}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <option value="home">Home Dashboard</option>
            <option value="appointments">Active Appointments</option>
            <option value="consultation">Consultation Interface</option>
            <option value="profile">Profile</option>
          </select>
        </div>
      </div>

      {/* Mockup Display */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '40px',
      }}>
        <PhoneFrame label={`${darkMode ? 'Dark' : 'Light'} Mode`}>
          {activeScreen === 'home' && <HomeDashboard />}
          {activeScreen === 'appointments' && <ActiveAppointments />}
          {activeScreen === 'consultation' && <ConsultationInterface />}
          {activeScreen === 'profile' && <ProfileScreen />}
        </PhoneFrame>
      </div>

      {/* Design Notes */}
      <div style={{
        maxWidth: '800px',
        margin: '40px auto 0',
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '16px',
        }}>
          📋 Design System Notes
        </h2>
        <ul style={{
          color: '#666',
          fontSize: '14px',
          lineHeight: '1.8',
          paddingLeft: '20px',
        }}>
          <li><strong>Colors:</strong> Emerald Green (#2ECC71), Bio-Lime (#AEEA00), Soft Charcoal (#34495E)</li>
          <li><strong>Typography:</strong> Inter font family, 700 weight for headers, 400 for body</li>
          <li><strong>Layout:</strong> Mobile-first responsive design, 380px max width for phone frame</li>
          <li><strong>Navigation:</strong> 3-tab bottom navigation (Home, Active, Profile)</li>
          <li><strong>Consultation:</strong> Reusable split-panel interface (60/40) for all consultation types</li>
          <li><strong>States:</strong> Waiting, Queued, Active, Paused with clear visual indicators</li>
          <li><strong>Actions:</strong> Accept & Talk (immediate), Add to Queue (max 2), Pause, End</li>
          <li><strong>Forms:</strong> Prescription and Referral forms expand to cover right panel</li>
        </ul>
      </div>
    </div>
  );
};

export default GPDashboardMockups;
