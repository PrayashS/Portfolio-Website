import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gmail compose URL - ALWAYS WORKS!
    const subject = `Portfolio Contact: Message from ${formData.name}`;
    const body = `${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show confirmation
    alert('Gmail opened! Please click "Send" in the Gmail window to complete your message.');
    
    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  if (!profile) return null;

  return (
    <section id="contact" style={{ padding: '80px 20px', background: '#1e293b' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px', textAlign: 'center', color: '#e2e8f0' }}>
          Get In Touch
        </h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', marginBottom: '60px' }}>
          Let's work together
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#e2e8f0' }}>
              Contact Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '4px' }}>Email</div>
                  <a href={`mailto:${profile.email}`} style={{ color: '#e2e8f0', textDecoration: 'none' }}>
                    {profile.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '4px' }}>Phone</div>
                  <a href={`tel:${profile.phone}`} style={{ color: '#e2e8f0', textDecoration: 'none' }}>
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={20} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '4px' }}>Location</div>
                  <div style={{ color: '#e2e8f0' }}>{profile.location}</div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>Availability</div>
              <div style={{ color: '#e2e8f0', fontWeight: '600' }}>{profile.availability}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#e2e8f0' }}>
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '12px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '16px'
                }}
              />
              
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: '12px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '16px'
                }}
              />
              
              <textarea
                placeholder="Your Message"
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '12px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              
              <button
                type="submit"
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '16px'
                }}
              >
                <Send size={18} /> Send via Gmail
              </button>
            </form>

            <p style={{
              marginTop: '16px',
              fontSize: '0.875rem',
              color: '#94a3b8',
              textAlign: 'center'
            }}>
              Opens Gmail • You'll need to click "Send"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}