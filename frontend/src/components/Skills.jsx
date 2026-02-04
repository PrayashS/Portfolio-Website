import React from 'react';
import { TestTube, Code, Wrench } from 'lucide-react';

export default function Skills({ skills }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const icons = { Testing: TestTube, Programming: Code, Tools: Wrench };
  const colors = {
    Testing: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    Programming: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    Tools: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  };

  return (
    <section id="skills" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px', textAlign: 'center', color: '#e2e8f0' }}>Skills</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const Icon = icons[category] || Code;
            return (
              <div key={category} style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', background: colors[category], borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color="white" />
                  </div>
                  <h3 style={{ color: '#e2e8f0' }}>{category}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {categorySkills.map(skill => (
                    <div key={skill._id} style={{ background: '#334155', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9375rem', color: '#cbd5e1' }}>
                      {skill.name}
                      {skill.level === 'Learning' && <span style={{ fontSize: '0.75rem', background: '#f59e0b', padding: '2px 6px', borderRadius: '8px', marginLeft: '6px', color: '#0f172a' }}>Learning</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}