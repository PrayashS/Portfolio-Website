import React from 'react';
import { Code, ExternalLink, Github } from 'lucide-react';

export default function Projects({ projects }) {
  return (
    <section id="projects" style={{ padding: '80px 20px', background: '#1e293b' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px', textAlign: 'center', color: '#e2e8f0' }}>Projects</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {projects.map(project => (
            <div key={project._id} style={{ background: '#0f172a', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Code size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#e2e8f0' }}>{project.name}</h3>
              {project.role && <div style={{ fontSize: '0.875rem', color: '#667eea', marginBottom: '12px', fontWeight: '600' }}>{project.role}</div>}
              <p style={{ color: '#94a3b8', marginBottom: '16px' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {project.technologies?.map((tech, idx) => (
                  <span key={idx} style={{ background: '#334155', padding: '6px 12px', borderRadius: '16px', fontSize: '0.875rem', color: '#cbd5e1' }}>
                    {tech}
                  </span>
                ))}
              </div>
              {(project.githubLink || project.liveLink) && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}