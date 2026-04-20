import React, { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, Play, Pause, X, Send, Paperclip, Video, Phone, MessageCircle, FileText, UserCheck, Search, ChevronDown, ChevronRight, ChevronLeft, AlertCircle, TestTube, Filter, CheckCircle, XCircle, Camera } from 'lucide-react';

const SpecialistDashboardComplete = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('home');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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
    appointmentsToday: 8,
    completed: 3,
    upcoming: 5,
    pendingRequests: 6,
    satisfactionRate: 4.9,
  };

  const appointmentRequests = {
    referrals: [
      {
        id: 1,
        patientName: 'Sarah Johnson',
        age: 32,
        requestedDate: 'Jan 30, 2026',
        requestedTime: '10:00 AM',
        type: 'Video Call',
        referredBy: 'Dr. Patel (GP)',
        chiefComplaint: 'Persistent headaches with vision disturbances',
        referralReason: 'Suspected migraine with aura. Patient reports bilateral throbbing headaches, photophobia, and occasional visual disturbances over past 2 months.',
        urgency: 'Routine',
        requestedDaysAgo: '2 hours ago',
      },
      {
        id: 2,
        patientName: 'Michael Chen',
        age: 45,
        requestedDate: 'Jan 31, 2026',
        requestedTime: '2:30 PM',
        type: 'In-Person',
        referredBy: 'Dr. Kumar (GP)',
        chiefComplaint: 'Uncontrolled hypertension',
        referralReason: 'BP readings consistently 160/95 despite medication. Needs specialist evaluation and possible medication adjustment.',
        urgency: 'Urgent',
        requestedDaysAgo: '5 hours ago',
      },
    ],
    selfRequests: [
      {
        id: 3,
        patientName: 'Amara Okonkwo',
        age: 28,
        requestedDate: 'Feb 1, 2026',
        requestedTime: '11:00 AM',
        type: 'Video Call',
        reason: 'Chest pain and palpitations during exercise',
        previousVisits: 0,
        requestedDaysAgo: '1 day ago',
      },
      {
        id: 4,
        patientName: 'David Kamau',
        age: 38,
        requestedDate: 'Feb 2, 2026',
        requestedTime: '9:00 AM',
        type: 'Chat',
        reason: 'Follow-up for previous cardiac evaluation',
        previousVisits: 2,
        requestedDaysAgo: '2 days ago',
      },
    ],
  };

  const myPatients = [
    {
      id: 1,
      patientName: 'Emma Wilson',
      age: 52,
      nextAppointment: 'Today, 2:00 PM',
      type: 'Video Call',
      visitCount: 3,
      lastVisit: 'Jan 15, 2026',
      condition: 'Hypertension management',
    },
    {
      id: 2,
      patientName: 'John Smith',
      age: 41,
      nextAppointment: 'Tomorrow, 10:30 AM',
      type: 'In-Person',
      visitCount: 1,
      lastVisit: 'Jan 10, 2026',
      condition: 'Post-MI follow-up',
    },
  ];

  const todaysAppointments = [
    {
      id: 1,
      patientName: 'Emma Wilson',
      age: 52,
      time: '2:00 PM',
      duration: '30 min',
      type: 'video',
      status: 'scheduled',
      visitNumber: 3,
    },
    {
      id: 2,
      patientName: 'Robert Taylor',
      age: 35,
      time: '3:00 PM',
      duration: '30 min',
      type: 'video',
      status: 'scheduled',
      visitNumber: 1,
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

  // Header Component with Calendar
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
        {showBack && <span style={{ color: colors.primary, cursor: 'pointer' }}>←</span>}
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
        alignItems: 'center',
        color: colors.textSecondary,
        fontSize: '18px',
      }}>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: colors.primary,
          }}
        >
          <Calendar size={20} />
        </button>
        <span>🔔</span>
      </div>
    </div>
  );

  // Calendar Modal
  const CalendarModal = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = selectedMonth.getMonth();
    const currentYear = selectedMonth.getFullYear();
    
    // Generate calendar days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const unavailableDates = [15, 16, 22]; // Example unavailable dates
    const appointmentDates = [29, 30, 31]; // Example dates with appointments

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          background: colors.cardBg,
          borderRadius: '16px',
          padding: '20px',
          maxWidth: '340px',
          width: '100%',
        }}>
          {/* Calendar Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <button
              onClick={() => setSelectedMonth(new Date(currentYear, currentMonth - 1))}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.textPrimary,
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <h3 style={{
              color: colors.textPrimary,
              fontSize: '16px',
              fontWeight: '700',
            }}>
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={() => setSelectedMonth(new Date(currentYear, currentMonth + 1))}
              style={{
                background: 'transparent',
                border: 'none',
                color: colors.textPrimary,
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Labels */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            marginBottom: '8px',
          }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} style={{
                color: colors.textSecondary,
                fontSize: '12px',
                textAlign: 'center',
                fontWeight: '600',
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px',
            marginBottom: '20px',
          }}>
            {days.map((day, idx) => (
              <div
                key={idx}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: day ? 'pointer' : 'default',
                  background: 
                    day && unavailableDates.includes(day) ? '#E7454520' :
                    day && appointmentDates.includes(day) ? colors.primary + '20' :
                    day ? darkMode ? colors.screenBg : 'white' : 'transparent',
                  color: 
                    day && unavailableDates.includes(day) ? '#E74545' :
                    day && appointmentDates.includes(day) ? colors.primary :
                    day ? colors.textPrimary : 'transparent',
                  border: day ? `1px solid ${colors.borderColor}` : 'none',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px',
            fontSize: '11px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '4px',
                background: colors.primary + '20',
              }}></div>
              <span style={{ color: colors.textSecondary }}>Has Appointments</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '4px',
                background: '#E7454520',
              }}></div>
              <span style={{ color: colors.textSecondary }}>Unavailable</span>
            </div>
          </div>

          {/* Actions */}
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
                padding: '12px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Mark Unavailable
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              style={{
                flex: 1,
                background: darkMode ? colors.screenBg : 'white',
                color: colors.textSecondary,
                border: `1px solid ${colors.borderColor}`,
                borderRadius: '12px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Bottom Navigation (4 tabs: Dashboard, Requests, My Patients, Profile)
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
        { key: 'home', icon: '🏠', label: 'Dashboard' },
        { key: 'requests', icon: '📋', label: 'Requests' },
        { key: 'patients', icon: '👥', label: 'My Patients' },
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
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>
            {item.icon}
            {item.key === 'requests' && todayStats.pendingRequests > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '50%',
                marginRight: '-20px',
                background: '#E74545',
                color: 'white',
                borderRadius: '10px',
                padding: '2px 6px',
                fontSize: '9px',
                fontWeight: '700',
              }}>
                {todayStats.pendingRequests}
              </span>
            )}
          </div>
          <div style={{ fontWeight: activeTab === item.key ? '600' : '400' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );

  // HOME DASHBOARD SCREEN
  const HomeDashboard = () => (
    <>
      <StatusBar />
      <Header title="Specialist Dashboard" />
      {showCalendar && <CalendarModal />}
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        {/* Greeting */}
        <div style={{ padding: '20px 16px 16px' }}>
          <h2 style={{
            color: colors.textPrimary,
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '4px',
          }}>
            Good Morning, Dr. Martinez 👋
          </h2>
          <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
            Cardiology • {todayStats.appointmentsToday} appointments today
          </p>
        </div>

        {/* Daily Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '0 16px 16px',
        }}>
          {/* Today's Appointments */}
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
              <Calendar size={20} color={colors.primary} />
            </div>
            <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '4px' }}>
              Today's Schedule
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
            }}>
              <span style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700' }}>
                {todayStats.completed}
              </span>
              <span style={{ color: colors.textSecondary, fontSize: '16px' }}>/ {todayStats.appointmentsToday}</span>
            </div>
          </div>

          {/* Pending Requests */}
          <div 
            onClick={() => {
              setActiveTab('requests');
              setActiveScreen('requests');
            }}
            style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '16px',
              border: `1px solid ${colors.borderColor}`,
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {todayStats.pendingRequests > 0 && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#E74545',
                color: 'white',
                borderRadius: '12px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '700',
              }}>
                {todayStats.pendingRequests} New
              </div>
            )}
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
              <AlertCircle size={20} color={colors.accent} />
            </div>
            <div style={{ color: colors.textSecondary, fontSize: '12px', marginBottom: '4px' }}>
              Pending Requests
            </div>
            <div style={{ color: colors.textPrimary, fontSize: '28px', fontWeight: '700' }}>
              {todayStats.pendingRequests}
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
              Patient Rating
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

          {/* My Patients Link */}
          <div
            onClick={() => {
              setActiveTab('patients');
              setActiveScreen('patients');
            }}
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
              <Users size={20} color={colors.primary} />
            </div>
            <div style={{
              color: colors.textPrimary,
              fontSize: '13px',
              fontWeight: '600',
              textAlign: 'center',
            }}>
              My Patients
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div style={{ padding: '0 16px' }}>
          <h3 style={{
            color: colors.textPrimary,
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '12px',
          }}>
            Today's Appointments
          </h3>

          {todaysAppointments.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setActiveScreen('patient-detail')}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '12px',
                border: `1px solid ${colors.borderColor}`,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: colors.textPrimary,
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {apt.patientName}
                  </h4>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    {apt.age} years • {apt.time} • {apt.duration}
                  </p>
                </div>
                <span style={{
                  background: colors.accent + '20',
                  color: colors.accent,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  Visit #{apt.visitNumber}
                </span>
              </div>

              <button
                style={{
                  background: darkMode ? colors.screenBg : 'white',
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
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );

  // REQUEST FOR APPOINTMENT SCREEN
  const RequestsScreen = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    return (
      <>
        <StatusBar />
        <Header title="Appointment Requests" />
        {showCalendar && <CalendarModal />}
        <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
          <div style={{ padding: '16px' }}>
            {/* Filter Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}>
              {[
                { key: 'all', label: 'All', count: appointmentRequests.referrals.length + appointmentRequests.selfRequests.length },
                { key: 'referral', label: 'GP Referrals', count: appointmentRequests.referrals.length },
                { key: 'self', label: 'Direct Search', count: appointmentRequests.selfRequests.length },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  style={{
                    background: activeFilter === filter.key ? colors.primary : darkMode ? colors.cardBg : 'white',
                    color: activeFilter === filter.key ? 'white' : colors.textPrimary,
                    border: activeFilter === filter.key ? 'none' : `1px solid ${colors.borderColor}`,
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* GP Referrals */}
            {(activeFilter === 'all' || activeFilter === 'referral') && appointmentRequests.referrals.map((request) => (
              <div
                key={request.id}
                style={{
                  background: colors.cardBg,
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${colors.borderColor}`,
                }}
              >
                {/* Request Type Badge */}
                <div style={{
                  display: 'inline-block',
                  background: colors.primary + '20',
                  color: colors.primary,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '12px',
                }}>
                  GP REFERRAL
                </div>

                {/* Patient Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      color: colors.textPrimary,
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '4px',
                    }}>
                      {request.patientName}
                    </h4>
                    <p style={{
                      color: colors.textSecondary,
                      fontSize: '12px',
                    }}>
                      {request.age} years • Requested {request.requestedDaysAgo}
                    </p>
                  </div>
                  <span style={{
                    background: request.urgency === 'Urgent' ? '#E7454520' : colors.accent + '20',
                    color: request.urgency === 'Urgent' ? '#E74545' : colors.accent,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}>
                    {request.urgency}
                  </span>
                </div>

                {/* Appointment Details */}
                <div style={{
                  background: darkMode ? colors.screenBg : '#F8F9FA',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <div style={{
                        color: colors.textSecondary,
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        Requested Date
                      </div>
                      <div style={{
                        color: colors.textPrimary,
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        {request.requestedDate}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        color: colors.textSecondary,
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        Time
                      </div>
                      <div style={{
                        color: colors.textPrimary,
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        {request.requestedTime}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      color: colors.textSecondary,
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Consultation Type
                    </div>
                    <div style={{
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontWeight: '600',
                    }}>
                      {request.type}
                    </div>
                  </div>
                </div>

                {/* Referring Doctor */}
                <div style={{
                  background: darkMode ? colors.screenBg : '#F8F9FA',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: colors.primary + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}>
                    👨‍⚕️
                  </div>
                  <div>
                    <div style={{
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontWeight: '600',
                    }}>
                      {request.referredBy}
                    </div>
                    <div style={{
                      color: colors.textSecondary,
                      fontSize: '11px',
                    }}>
                      Referring Physician
                    </div>
                  </div>
                </div>

                {/* Referral Details */}
                <div style={{
                  background: darkMode ? colors.screenBg : '#F8F9FA',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    color: colors.textSecondary,
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                  }}>
                    Chief Complaint
                  </div>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '13px',
                    marginBottom: '12px',
                  }}>
                    {request.chiefComplaint}
                  </div>

                  <div style={{
                    color: colors.textSecondary,
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                  }}>
                    GP Referral Notes
                  </div>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    lineHeight: '1.5',
                  }}>
                    {request.referralReason}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}>
                  <button
                    onClick={() => {
                      setActiveTab('patients');
                      setActiveScreen('patients');
                    }}
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
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button
                    style={{
                      background: darkMode ? colors.cardBg : 'white',
                      color: '#E74545',
                      border: `1px solid #E74545`,
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
                    <XCircle size={16} />
                    Decline
                  </button>
                </div>
              </div>
            ))}

            {/* Self Requests */}
            {(activeFilter === 'all' || activeFilter === 'self') && appointmentRequests.selfRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  background: colors.cardBg,
                  borderRadius: '16px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: `1px solid ${colors.borderColor}`,
                }}
              >
                {/* Request Type Badge */}
                <div style={{
                  display: 'inline-block',
                  background: colors.accent + '20',
                  color: colors.accent,
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '12px',
                }}>
                  DIRECT SEARCH
                </div>

                {/* Patient Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      color: colors.textPrimary,
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '4px',
                    }}>
                      {request.patientName}
                    </h4>
                    <p style={{
                      color: colors.textSecondary,
                      fontSize: '12px',
                    }}>
                      {request.age} years • Requested {request.requestedDaysAgo}
                    </p>
                  </div>
                  {request.previousVisits > 0 && (
                    <span style={{
                      background: colors.primary + '20',
                      color: colors.primary,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}>
                      {request.previousVisits} Previous Visits
                    </span>
                  )}
                </div>

                {/* Appointment Details */}
                <div style={{
                  background: darkMode ? colors.screenBg : '#F8F9FA',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '12px',
                  }}>
                    <div>
                      <div style={{
                        color: colors.textSecondary,
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        Requested Date
                      </div>
                      <div style={{
                        color: colors.textPrimary,
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        {request.requestedDate}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        color: colors.textSecondary,
                        fontSize: '10px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}>
                        Time
                      </div>
                      <div style={{
                        color: colors.textPrimary,
                        fontSize: '13px',
                        fontWeight: '600',
                      }}>
                        {request.requestedTime}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      color: colors.textSecondary,
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Consultation Type
                    </div>
                    <div style={{
                      color: colors.textPrimary,
                      fontSize: '13px',
                      fontWeight: '600',
                    }}>
                      {request.type}
                    </div>
                  </div>
                </div>

                {/* Patient's Reason */}
                <div style={{
                  background: darkMode ? colors.screenBg : '#F8F9FA',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    color: colors.textSecondary,
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                  }}>
                    Patient's Reason
                  </div>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '12px',
                    lineHeight: '1.5',
                  }}>
                    {request.reason}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}>
                  <button
                    onClick={() => {
                      setActiveTab('patients');
                      setActiveScreen('patients');
                    }}
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
                    <CheckCircle size={16} />
                    Accept
                  </button>
                  <button
                    style={{
                      background: darkMode ? colors.cardBg : 'white',
                      color: '#E74545',
                      border: `1px solid #E74545`,
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
                    <XCircle size={16} />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </>
    );
  };

  // MY PATIENTS SCREEN
  const MyPatientsScreen = () => (
    <>
      <StatusBar />
      <Header title="My Patients" />
      {showCalendar && <CalendarModal />}
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        <div style={{ padding: '16px' }}>
          <p style={{
            color: colors.textSecondary,
            fontSize: '13px',
            marginBottom: '16px',
          }}>
            Patients you've accepted and their upcoming appointments
          </p>

          {myPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setActiveScreen('patient-detail')}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px',
                border: `1px solid ${colors.borderColor}`,
                cursor: 'pointer',
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
                  <h4 style={{
                    color: colors.textPrimary,
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                  }}>
                    {patient.patientName}
                  </h4>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    {patient.age} years • {patient.visitCount} total visits
                  </p>
                </div>
              </div>

              {/* Condition */}
              <div style={{
                background: darkMode ? colors.screenBg : '#F8F9FA',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
              }}>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '10px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  Current Condition
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '13px',
                }}>
                  {patient.condition}
                </div>
              </div>

              {/* Next Appointment */}
              <div style={{
                background: colors.primary + '15',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
                border: `1px solid ${colors.primary}`,
              }}>
                <div style={{
                  color: colors.primary,
                  fontSize: '10px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  Next Appointment
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  {patient.nextAppointment}
                </div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '12px',
                }}>
                  {patient.type}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                <button
                  style={{
                    background: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  View Details
                </button>
                <button
                  style={{
                    background: darkMode ? colors.screenBg : 'white',
                    color: colors.textPrimary,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );

  // PATIENT DETAIL SCREEN (from My Patients or Today's Appointments)
  const PatientDetailScreen = () => {
    const patient = myPatients[0];
    
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
          <button
            onClick={() => setActiveScreen('home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.primary,
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
          <h3 style={{
            color: colors.textPrimary,
            fontSize: '16px',
            fontWeight: '700',
          }}>
            Patient Details
          </h3>
          <div style={{ width: '24px' }}></div>
        </div>

        <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
          <div style={{ padding: '16px' }}>
            {/* Patient Info Card */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              border: `1px solid ${colors.borderColor}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: colors.primary + '30',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: colors.textPrimary,
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '4px',
                  }}>
                    {patient.patientName}
                  </h3>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '13px',
                  }}>
                    {patient.age} years • Female
                  </p>
                  <p style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    Total Visits: {patient.visitCount} • Last: {patient.lastVisit}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Appointment */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              border: `1px solid ${colors.borderColor}`,
            }}>
              <h4 style={{
                color: colors.textPrimary,
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                Next Appointment
              </h4>
              <div style={{
                background: darkMode ? colors.screenBg : '#F8F9FA',
                borderRadius: '12px',
                padding: '12px',
              }}>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  {patient.nextAppointment}
                </div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '13px',
                }}>
                  {patient.type}
                </div>
              </div>
            </div>

            {/* Condition */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              border: `1px solid ${colors.borderColor}`,
            }}>
              <h4 style={{
                color: colors.textPrimary,
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                Current Condition
              </h4>
              <div style={{
                background: darkMode ? colors.screenBg : '#F8F9FA',
                borderRadius: '12px',
                padding: '12px',
              }}>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '13px',
                }}>
                  {patient.condition}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px',
              border: `1px solid ${colors.borderColor}`,
            }}>
              <h4 style={{
                color: colors.textPrimary,
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                Quick Actions
              </h4>
              
              <button
                style={{
                  background: 'transparent',
                  color: colors.textPrimary,
                  border: `1px solid ${colors.borderColor}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '8px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>View Full Medical History</span>
                <ChevronRight size={16} color={colors.textSecondary} />
              </button>

              <button
                style={{
                  background: 'transparent',
                  color: colors.textPrimary,
                  border: `1px solid ${colors.borderColor}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '8px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>View All Medications</span>
                <ChevronRight size={16} color={colors.textSecondary} />
              </button>

              <button
                style={{
                  background: 'transparent',
                  color: colors.textPrimary,
                  border: `1px solid ${colors.borderColor}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>View Previous Consultations</span>
                <ChevronRight size={16} color={colors.textSecondary} />
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setActiveScreen('consultation')}
              style={{
                background: colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '12px',
              }}
            >
              Start Consultation
            </button>

            <button
              style={{
                background: 'transparent',
                color: colors.textPrimary,
                border: `1px solid ${colors.borderColor}`,
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Reschedule Appointment
            </button>
          </div>
        </div>
        <BottomNav />
      </>
    );
  };

  // CONSULTATION INTERFACE (Same as GP with equal-value buttons and No-Show)
  const ConsultationInterface = () => {
    const [rightPanelExpanded, setRightPanelExpanded] = useState(false);
    const [showPrescription, setShowPrescription] = useState(false);
    const [showReferral, setShowReferral] = useState(false);
    const [showLabOrder, setShowLabOrder] = useState(false);

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
              onClick={() => setActiveScreen('home')}
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
                Emma Wilson
              </div>
              <div style={{
                color: colors.textSecondary,
                fontSize: '11px',
              }}>
                52 years • Video Call • 12:35
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
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
            <button
              style={{
                background: '#E74545',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                color: 'white',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              No-Show
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: rightPanelExpanded || showPrescription || showReferral || showLabOrder ? '0fr 1fr' : '60% 40%',
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
            {!showPrescription && !showReferral && !showLabOrder ? (
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
                      Patient Context
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
                      {/* Visit Count */}
                      <div style={{
                        background: colors.primary + '20',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '12px',
                        border: `1px solid ${colors.primary}`,
                      }}>
                        <div style={{
                          color: colors.primary,
                          fontSize: '10px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}>
                          Patient Status
                        </div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '12px',
                        }}>
                          Visit #3 • Last visit: Jan 15, 2026
                        </div>
                      </div>

                      {/* Critical Info */}
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
                          CONDITION
                        </div>
                        <div style={{
                          color: colors.textPrimary,
                          fontSize: '13px',
                          marginBottom: '12px',
                        }}>
                          Hypertension management
                        </div>

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
                        }}>
                          Penicillin
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons - Bottom Half (ALL EQUAL VALUE) */}
                <div style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <button
                    onClick={() => setShowLabOrder(true)}
                    style={{
                      background: darkMode ? colors.screenBg : 'white',
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <TestTube size={18} />
                    Order Lab Tests
                  </button>

                  <button
                    onClick={() => setShowPrescription(true)}
                    style={{
                      background: darkMode ? colors.screenBg : 'white',
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '12px',
                      padding: '14px',
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
                      padding: '14px',
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
            ) : showLabOrder ? (
              // LAB ORDER FORM (shortened for space)
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
                    Order Lab Tests
                  </h3>
                  <button
                    onClick={() => setShowLabOrder(false)}
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

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '20px',
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
                    Send Lab Order
                  </button>
                  <button
                    onClick={() => setShowLabOrder(false)}
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
            ) : showPrescription ? (
              // PRESCRIPTION FORM (shortened)
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

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '20px',
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
              // REFERRAL FORM (shortened)
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
                    Refer to Specialist
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

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '20px',
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
      {showCalendar && <CalendarModal />}
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
              Dr. Sofia Martinez
            </h3>
            <p style={{
              color: colors.textSecondary,
              fontSize: '13px',
              marginBottom: '8px',
            }}>
              Cardiology Specialist
            </p>
            <div style={{
              display: 'inline-block',
              background: colors.primary + '20',
              color: colors.primary,
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              15 years experience
            </div>
            <p style={{
              color: colors.textSecondary,
              fontSize: '12px',
            }}>
              📍 Nairobi, Kenya
            </p>
          </div>

          {/* Certifications */}
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
              marginBottom: '12px',
            }}>
              Certifications & Licenses
            </h4>
            <div style={{
              background: darkMode ? colors.screenBg : 'white',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '8px',
            }}>
              <div style={{
                color: colors.textPrimary,
                fontSize: '13px',
                fontWeight: '600',
              }}>
                Medical License #MP-2010-45678
              </div>
              <div style={{
                color: colors.textSecondary,
                fontSize: '11px',
              }}>
                Valid until: Dec 2026
              </div>
            </div>
          </div>

          {/* Monthly Stats */}
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
              This Month's Stats
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
                  Consultations
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  124
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
                  4.9
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Lab Orders
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  87
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  Referrals Out
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '24px',
                  fontWeight: '700',
                }}>
                  22
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out */}
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
          Specialist Dashboard - Complete Design
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
              if (e.target.value === 'requests') setActiveTab('requests');
              if (e.target.value === 'patients') setActiveTab('patients');
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
            <option value="requests">Appointment Requests</option>
            <option value="patients">My Patients</option>
            <option value="patient-detail">Patient Detail</option>
            <option value="consultation">Consultation</option>
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
          {activeScreen === 'requests' && <RequestsScreen />}
          {activeScreen === 'patients' && <MyPatientsScreen />}
          {activeScreen === 'patient-detail' && <PatientDetailScreen />}
          {activeScreen === 'consultation' && <ConsultationInterface />}
          {activeScreen === 'profile' && <ProfileScreen />}
        </PhoneFrame>
      </div>
    </div>
  );
};

export default SpecialistDashboardComplete;
