import React from 'react';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

export default function About({ profile }) {
  if (!profile) return null;

  return (
    <section id="about" style={{ padding: '80px 20px', background: '#1e293b' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px', textAlign: 'center', color: '#e2e8f0' }}>About Me</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Briefcase size={28} color="white" />
            </div>
            <h3 style={{ marginBottom: '8px', color: '#e2e8f0' }}>2 Years Experience</h3>
            <p style={{ color: '#94a3b8' }}>Professional QA Engineer</p>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <GraduationCap size={28} color="white" />
            </div>
            <h3 style={{ marginBottom: '8px', color: '#e2e8f0' }}>MSc Student</h3>
            <p style={{ color: '#94a3b8' }}>Computing & Technology</p>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Code size={28} color="white" />
            </div>
            <h3 style={{ marginBottom: '8px', color: '#e2e8f0' }}>Learning</h3>
            <p style={{ color: '#94a3b8' }}>Java & Selenium</p>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#cbd5e1', textAlign: 'center' }}>
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
}