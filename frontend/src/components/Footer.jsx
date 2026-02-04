import React from 'react';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer({ profile }) {
  if (!profile) return null;

  return (
    <footer style={{ background: '#0f172a', borderTop: '1px solid #334155', padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          
          {/* Gmail Link */}
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Email via Gmail"
            style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <Mail size={20} />
          </a>
          
          {/* LinkedIn */}
          <a 
            href={`https://${profile.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            <Linkedin size={20} />
          </a>
          
          {/* GitHub */}
          {profile.github && (
            <a 
              href={`https://${profile.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
              style={{ color: '#94a3b8', cursor: 'pointer', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <Github size={20} />
            </a>
          )}
        </div>
        
        <p style={{ color: '#94a3b8', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Made with <Heart size={16} color="#ef4444" /> by {profile.name}
        </p>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '8px' }}>
          © 2026 All rights reserved
        </p>
      </div>
    </footer>
  );
}