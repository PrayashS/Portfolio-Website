import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { profileAPI, experienceAPI, projectAPI, skillAPI } from '../services/api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    fetchData();
    
    const timer = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, expRes, projRes, skillRes] = await Promise.all([
        profileAPI.get(),
        experienceAPI.getAll(),
        projectAPI.getAll(),
        skillAPI.getAll()
      ]);

      setProfile(profileRes.data);
      setExperiences(expRes.data);
      setProjects(projRes.data);
      setSkills(skillRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#0f172a',
        color: '#e2e8f0',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #1e293b',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '32px'
        }}></div>
        
        <h2 style={{ 
          fontSize: '1.75rem', 
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>
          Loading Portfolio...
        </h2>
        
        <div style={{
          maxWidth: '500px',
          background: 'rgba(102, 126, 234, 0.1)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          marginBottom: '16px'
        }}>
          <p style={{ 
            color: '#cbd5e1', 
            lineHeight: '1.7',
            marginBottom: '12px'
          }}>
            {loadingTime < 10 
              ? "Connecting to server..."
              : "Backend is waking up. Usually takes 30-60 seconds on first visit. ☕"
            }
          </p>
          <p style={{ 
            color: '#94a3b8',
            fontSize: '0.875rem'
          }}>
            ⏱️ {loadingTime} seconds
          </p>
        </div>

        {loadingTime > 20 && (
          <p style={{
            color: '#94a3b8',
            fontSize: '0.9375rem',
            maxWidth: '400px'
          }}>
            Almost there! Might take a moment to start. Thanks for your patience! 🙏
          </p>
        )}
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div id="home">
        <Hero profile={profile} />
      </div>
      <div id="about">
        <About profile={profile} />
      </div>
      <div id="experience">
        <Experience experiences={experiences} />
      </div>
      <div id="projects">
        <Projects projects={projects} />
      </div>
      <div id="skills">
        <Skills skills={skills} />
      </div>
      <div id="contact">
        <Contact profile={profile} />
      </div>
      <Footer profile={profile} />
    </div>
  );
}