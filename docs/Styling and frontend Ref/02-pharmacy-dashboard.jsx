import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const PharmacyDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [orderNumber, setOrderNumber] = useState('');

  const theme = {
    dark: {
      screenBg: '#121826',
      frameBg: '#0B0F14',
      cardBg: '#1E293B',
      borderColor: '#1E293B',
      textPrimary: '#FFFFFF',
      textSecondary: '#A0AEC0',
      primary: '#3498DB',
    },
    light: {
      screenBg: '#FFFFFF',
      frameBg: '#F8F9FA',
      cardBg: '#FAFAFA',
      borderColor: '#E0E0E0',
      textPrimary: '#1A1A1A',
      textSecondary: '#666666',
      primary: '#3498DB',
    }
  };

  const colors = darkMode ? theme.dark : theme.light;

  const recentOrders = [
    { id: 'RX-2024-001', patient: 'Sarah Johnson', status: 'Completed', date: 'Today, 10:30 AM' },
    { id: 'RX-2024-002', patient: 'Michael Chen', status: 'Completed', date: 'Today, 11:45 AM' },
    { id: 'RX-2024-003', patient: 'Emma Wilson', status: 'In Progress', date: 'Today, 2:15 PM' },
  ];

  const PhoneFrame = ({ children }) => (
    <div style={{ margin: '20px' }}>
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

  const Header = ({ title }) => (
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
        {title}
      </div>
      <span style={{ fontSize: '18px' }}>🔔</span>
    </div>
  );

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
        { key: 'profile', icon: '👤', label: 'Profile' },
      ].map((item) => (
        <div
          key={item.key}
          onClick={() => setActiveTab(item.key)}
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

  const HomeScreen = () => (
    <>
      <StatusBar />
      <Header title="Pharmacy Partner" />
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          {/* Icon */}
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💊</div>
          
          {/* Title */}
          <h2 style={{
            color: colors.textPrimary,
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '8px',
          }}>
            Scan Prescription
          </h2>
          <p style={{
            color: colors.textSecondary,
            fontSize: '14px',
            marginBottom: '32px',
          }}>
            Enter prescription code or scan QR
          </p>

          {/* Search Box with Camera Icon */}
          <div style={{
            background: darkMode ? colors.cardBg : 'white',
            border: `2px solid ${colors.primary}`,
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter prescription code..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: colors.textPrimary,
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <button style={{
              width: '48px',
              height: '48px',
              background: colors.primary,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
            }}>
              <Camera size={24} color="white" />
            </button>
          </div>

          {/* Process Button */}
          <button
            style={{
              width: '100%',
              background: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Process Prescription
          </button>

          {/* Info */}
          <div style={{
            marginTop: '32px',
            padding: '16px',
            background: darkMode ? colors.cardBg : '#E8F5E9',
            borderRadius: '12px',
            textAlign: 'left',
          }}>
            <div style={{
              color: colors.textPrimary,
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              ℹ️ How it works:
            </div>
            <ul style={{
              color: colors.textSecondary,
              fontSize: '12px',
              lineHeight: '1.6',
              paddingLeft: '20px',
            }}>
              <li>Patient shows prescription QR code</li>
              <li>Scan or enter the code above</li>
              <li>Verify prescription details</li>
              <li>Dispense medication</li>
              <li>Mark as completed in profile</li>
            </ul>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );

  const ProfileScreen = () => (
    <>
      <StatusBar />
      <Header title="Profile" />
      <div style={{ paddingBottom: '80px', overflowY: 'auto', maxHeight: '640px' }}>
        <div style={{ padding: '16px' }}>
          {/* Business Info */}
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
              💊
            </div>
            <h3 style={{
              color: colors.textPrimary,
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '4px',
            }}>
              HealthCare Pharmacy
            </h3>
            <p style={{
              color: colors.textSecondary,
              fontSize: '13px',
              marginBottom: '4px',
            }}>
              Partner Pharmacy
            </p>
            <p style={{
              color: colors.textSecondary,
              fontSize: '12px',
            }}>
              📍 Nairobi, Kenya
            </p>
          </div>

          {/* Today's Stats */}
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
              marginBottom: '16px',
            }}>
              Today's Summary
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
                  Prescriptions Filled
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '28px',
                  fontWeight: '700',
                }}>
                  24
                </div>
              </div>
              <div>
                <div style={{
                  color: colors.textSecondary,
                  fontSize: '11px',
                  marginBottom: '4px',
                }}>
                  In Progress
                </div>
                <div style={{
                  color: colors.textPrimary,
                  fontSize: '28px',
                  fontWeight: '700',
                }}>
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
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
              marginBottom: '16px',
            }}>
              Recent Orders
            </h4>

            {recentOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: darkMode ? colors.screenBg : 'white',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{
                    color: colors.textPrimary,
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    {order.id}
                  </div>
                  <div style={{
                    color: colors.textSecondary,
                    fontSize: '12px',
                  }}>
                    {order.patient} • {order.date}
                  </div>
                </div>
                <span style={{
                  background: order.status === 'Completed' ? colors.primary + '20' : colors.accent + '20',
                  color: order.status === 'Completed' ? colors.primary : colors.accent,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  {order.status}
                </span>
              </div>
            ))}
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          Pharmacy Partner Dashboard
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          Simple Scan & Process Interface
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? '#3498DB' : '#34495E',
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
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
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
            <option value="home">Home</option>
            <option value="profile">Profile</option>
          </select>
        </div>
      </div>

      <PhoneFrame>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </PhoneFrame>
    </div>
  );
};

export default PharmacyDashboard;
