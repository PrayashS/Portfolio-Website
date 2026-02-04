import React from 'react';
import { Mail, Linkedin, Github, Download, ArrowDown } from 'lucide-react';

export default function Hero({ profile }) {
  if (!profile) return null;

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)', zIndex: 0 }}></div>

      <div style={{ maxWidth: '1200px', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '1.125rem', color: '#667eea', marginBottom: '16px', fontWeight: '600', letterSpacing: '2px' }}>
          HELLO, I'M
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '800', marginBottom: '24px', color: '#e2e8f0' }}>
          {profile.name}
        </h1>
        
        <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#94a3b8', marginBottom: '16px' }}>
          {profile.title}
        </p>
        
        <p style={{ fontSize: '1.125rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          {profile.summary}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '12px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={18} /> Contact Me
          </a>
          
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', color: '#667eea', padding: '12px 32px', borderRadius: '8px', border: '2px solid #667eea', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={18} /> Download CV
            </a>
          )}
        </div>

        {/* Social Icons - FIXED */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Email me via Gmail"
            style={{ 
              padding: '12px', 
              borderRadius: '50%', 
              background: '#1e293b', 
              color: '#94a3b8', 
              display: 'inline-flex',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <Mail size={24} />
          </a>
          
          <a 
            href={`https://${profile.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            style={{ 
              padding: '12px', 
              borderRadius: '50%', 
              background: '#1e293b', 
              color: '#94a3b8', 
              display: 'inline-flex',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0077b5';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <Linkedin size={24} />
          </a>
          
          {profile.github && (
            <a 
              href={`https://${profile.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub Profile"
              style={{ 
                padding: '12px', 
                borderRadius: '50%', 
                background: '#1e293b', 
                color: '#94a3b8', 
                display: 'inline-flex',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1e293b';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <Github size={24} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}