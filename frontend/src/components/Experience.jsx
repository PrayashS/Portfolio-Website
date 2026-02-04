import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export default function Experience({ experiences }) {
  return (
    <section id="experience" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px', textAlign: 'center', color: '#e2e8f0' }}>Work Experience</h2>

        {experiences.map(exp => (
          <div key={exp._id} style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', borderLeft: '4px solid #667eea', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#e2e8f0' }}>{exp.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#667eea', marginBottom: '8px' }}>
              <Briefcase size={18} />
              <span style={{ fontWeight: '600' }}>{exp.company}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.9375rem', marginBottom: '16px' }}>
              <Calendar size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {exp.startDate} - {exp.endDate || 'Present'} • {exp.location}
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {exp.achievements?.map((achievement, idx) => (
                <li key={idx} style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative', color: '#cbd5e1' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', background: '#667eea', borderRadius: '50%' }}></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}