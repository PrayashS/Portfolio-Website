import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileAPI, experienceAPI, projectAPI, skillAPI } from '../services/api';
import { LogOut, Save, Plus, Trash2, Upload, FileText, Download, Edit, X, AlertCircle } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // Security enhancements
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // Edit modals
  const [editingExp, setEditingExp] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (isAuthenticated) {
        inactivityTimer = setTimeout(() => {
          handleLogout();
          alert('Session expired due to inactivity. Please login again.');
        }, 30 * 60 * 1000); // 30 minutes
      }
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated]);

  // Check for existing token and verify it
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      // This will throw an error if token is invalid/expired
      await profileAPI.get();
      setIsAuthenticated(true);
      fetchData();
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check if locked out
    if (isLocked) {
      return;
    }
    
    // Check if too many failed attempts
    if (loginAttempts >= 5) {
      setLoginError('Too many failed attempts. Please wait 5 minutes.');
      setIsLocked(true);
      setTimeout(() => {
        setLoginAttempts(0);
        setLoginError('');
        setIsLocked(false);
      }, 5 * 60 * 1000); // 5 minutes lockout
      return;
    }

    try {
      const res = await profileAPI.login(password);
      localStorage.setItem('adminToken', res.data.token);
      setIsAuthenticated(true);
      setLoginAttempts(0);
      setLoginError('');
      setPassword('');
      fetchData();
      alert('Login successful!');
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      const remaining = 5 - (loginAttempts + 1);
      
      if (remaining <= 0) {
        setLoginError('Too many failed attempts. Locked for 5 minutes.');
        setIsLocked(true);
        setTimeout(() => {
          setLoginAttempts(0);
          setLoginError('');
          setIsLocked(false);
        }, 5 * 60 * 1000);
      } else {
        setLoginError(
          `Invalid password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`
        );
      }
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

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
      // If unauthorized, logout
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const updateProfile = async () => {
    try {
      await profileAPI.update(profile);
      alert('Profile updated successfully!');
      fetchData();
    } catch (error) {
      alert('Error updating profile');
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB');
      return;
    }

    setUploading(true);
    try {
      await profileAPI.uploadResume(file);
      alert('Resume uploaded successfully!');
      fetchData();
    } catch (error) {
      alert('Error uploading: ' + error.message);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteResume = async () => {
    if (window.confirm('Delete resume?')) {
      try {
        await profileAPI.deleteResume();
        alert('Resume deleted');
        fetchData();
      } catch (error) {
        alert('Error deleting');
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    }
  };

  // EXPERIENCE FUNCTIONS
  const addExperience = () => {
    setEditingExp({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      achievements: ['']
    });
  };

  const saveExperience = async () => {
    try {
      const cleanedExp = {
        ...editingExp,
        achievements: editingExp.achievements.filter(a => a.trim() !== '')
      };

      if (editingExp._id) {
        await experienceAPI.update(editingExp._id, cleanedExp);
        alert('Experience updated!');
      } else {
        await experienceAPI.create(cleanedExp);
        alert('Experience added!');
      }
      setEditingExp(null);
      fetchData();
    } catch (error) {
      alert('Error saving experience');
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const deleteExperience = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await experienceAPI.delete(id);
        fetchData();
      } catch (error) {
        alert('Error deleting');
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    }
  };

  // PROJECT FUNCTIONS
  const addProject = () => {
    setEditingProject({
      name: '',
      description: '',
      role: '',
      technologies: [],
      highlights: [''],
      githubLink: '',
      liveLink: ''
    });
  };

  const saveProject = async () => {
    try {
      const cleanedProj = {
        ...editingProject,
        highlights: editingProject.highlights.filter(h => h.trim() !== '')
      };

      if (editingProject._id) {
        await projectAPI.update(editingProject._id, cleanedProj);
        alert('Project updated!');
      } else {
        await projectAPI.create(cleanedProj);
        alert('Project added!');
      }
      setEditingProject(null);
      fetchData();
    } catch (error) {
      alert('Error saving project');
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await projectAPI.delete(id);
        fetchData();
      } catch (error) {
        alert('Error deleting');
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    }
  };

  // SKILL FUNCTIONS
  const addSkill = () => {
    setEditingSkill({
      category: 'Programming',
      name: '',
      level: 'Learning'
    });
  };

  const saveSkill = async () => {
    try {
      if (editingSkill._id) {
        await skillAPI.update(editingSkill._id, editingSkill);
        alert('Skill updated!');
      } else {
        await skillAPI.create(editingSkill);
        alert('Skill added!');
      }
      setEditingSkill(null);
      fetchData();
    } catch (error) {
      alert('Error saving skill');
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const deleteSkill = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await skillAPI.delete(id);
        fetchData();
      } catch (error) {
        alert('Error deleting');
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div style={{ background: '#1e293b', padding: '40px', borderRadius: '12px', maxWidth: '400px', width: '100%', border: '1px solid #334155' }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center', color: '#e2e8f0' }}>Admin Login</h2>
          
          {loginError && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid #ef4444', 
              borderRadius: '8px', 
              padding: '12px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#fca5a5'
            }}>
              <AlertCircle size={16} />
              <span style={{ fontSize: '0.875rem' }}>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLocked}
              style={{ 
                width: '100%', 
                padding: '12px', 
                marginBottom: '16px', 
                background: '#0f172a', 
                border: '1px solid #334155', 
                borderRadius: '8px', 
                color: '#e2e8f0', 
                fontSize: '16px',
                opacity: isLocked ? 0.5 : 1,
                cursor: isLocked ? 'not-allowed' : 'text'
              }}
            />
            <button 
              type="submit" 
              disabled={isLocked}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: isLocked ? '#64748b' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                border: 'none', 
                borderRadius: '8px', 
                color: 'white', 
                fontSize: '16px', 
                fontWeight: '600', 
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1
              }}
            >
              {isLocked ? 'Locked - Wait 5 Minutes' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginBottom: '4px' }}>
              🔒 Secured with bcrypt + JWT authentication
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
              Max 5 attempts • 30 min session timeout
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '20px', background: '#1e293b', borderRadius: '12px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ color: '#e2e8f0' }}>Admin Dashboard</h1>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {['profile', 'experience', 'projects', 'skills'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 24px', background: activeTab === tab ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#1e293b', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', textTransform: 'capitalize', fontWeight: '600' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: '#1e293b', padding: '32px', borderRadius: '12px', border: '1px solid #334155' }}>
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && profile && (
            <div>
              <h2 style={{ marginBottom: '24px', color: '#e2e8f0' }}>Edit Profile</h2>
              
              {/* Resume Upload Section */}
              <div style={{ background: '#0f172a', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '2px dashed #334155' }}>
                <h3 style={{ color: '#e2e8f0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} /> Resume/CV Upload
                </h3>
                
                {profile.resumeFileName && (
                  <div style={{ padding: '16px', background: '#1e293b', borderRadius: '8px', marginBottom: '16px', border: '1px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ color: '#10b981', fontWeight: '600', fontSize: '0.875rem' }}>
                      ✓ Current: {profile.resumeFileName}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: '#667eea', borderRadius: '6px', color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Download size={14} /> View
                      </a>
                      <button onClick={handleDeleteResume} style={{ padding: '8px 16px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                )}
                
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px', background: '#1e293b', border: '2px dashed #667eea', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer' }}>
                  <Upload size={20} color="#667eea" />
                  <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{uploading ? 'Uploading...' : 'Click to Upload New Resume'}</span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={uploading} style={{ display: 'none' }} />
                </label>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '12px', textAlign: 'center' }}>
                  PDF, DOC, DOCX • Max 5MB
                </p>
              </div>

              {/* Profile Form Fields */}
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Full Name</label>
                  <input type="text" placeholder="Name" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Professional Title</label>
                  <input type="text" placeholder="Title" value={profile.title || ''} onChange={(e) => setProfile({ ...profile, title: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Email</label>
                    <input type="email" placeholder="Email" value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Phone</label>
                    <input type="text" placeholder="Phone" value={profile.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Location</label>
                  <input type="text" placeholder="Location" value={profile.location || ''} onChange={(e) => setProfile({ ...profile, location: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>LinkedIn</label>
                    <input type="text" placeholder="LinkedIn URL" value={profile.linkedin || ''} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>GitHub</label>
                    <input type="text" placeholder="GitHub URL" value={profile.github || ''} onChange={(e) => setProfile({ ...profile, github: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Professional Summary</label>
                  <textarea placeholder="Summary" value={profile.summary || ''} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} rows="5" style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Availability</label>
                    <input type="text" placeholder="e.g., Up to 20 hours/week" value={profile.availability || ''} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '0.875rem' }}>Graduation Date</label>
                    <input type="text" placeholder="e.g., September 2026" value={profile.graduationDate || ''} onChange={(e) => setProfile({ ...profile, graduationDate: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <button onClick={updateProfile} style={saveButtonStyle}>
                  <Save size={18} /> Save Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ color: '#e2e8f0' }}>Manage Experience</h2>
                <button onClick={addExperience} style={addButtonStyle}>
                  <Plus size={18} /> Add New Experience
                </button>
              </div>

              {experiences.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
                  No experiences yet. Click "Add New Experience" to add your first job!
                </p>
              ) : (
                experiences.map(exp => (
                  <div key={exp._id} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#e2e8f0', marginBottom: '4px' }}>{exp.title}</h3>
                        <p style={{ color: '#667eea', fontWeight: '600', marginBottom: '4px' }}>{exp.company}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                          {exp.startDate} - {exp.endDate || 'Present'} • {exp.location}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <button onClick={() => setEditingExp(exp)} style={{ padding: '8px 12px', background: '#667eea', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: '600' }}>
                          <Edit size={16} /> Edit
                        </button>
                        <button onClick={() => deleteExperience(exp._id)} style={{ padding: '8px 12px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: '600' }}>
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                    <ul style={{ marginTop: '12px', paddingLeft: '20px', margin: 0 }}>
                      {exp.achievements?.map((ach, idx) => (
                        <li key={idx} style={{ color: '#cbd5e1', marginBottom: '6px', fontSize: '0.9375rem' }}>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              {/* EXPERIENCE EDIT MODAL */}
              {editingExp && (
                <div style={modalOverlay} onClick={() => setEditingExp(null)}>
                  <div style={modalContent} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                      <h3 style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>
                        {editingExp._id ? 'Edit Experience' : 'Add New Experience'}
                      </h3>
                      <button onClick={() => setEditingExp(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={24} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Job Title *</label>
                        <input type="text" placeholder="e.g., Quality Assurance Engineer" value={editingExp.title} onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })} style={inputStyle} required />
                      </div>

                      <div>
                        <label style={labelStyle}>Company Name *</label>
                        <input type="text" placeholder="e.g., Virtuosway Pvt. Ltd" value={editingExp.company} onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })} style={inputStyle} required />
                      </div>

                      <div>
                        <label style={labelStyle}>Location</label>
                        <input type="text" placeholder="e.g., Kathmandu, Nepal" value={editingExp.location || ''} onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })} style={inputStyle} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={labelStyle}>Start Date *</label>
                          <input type="text" placeholder="e.g., Jan 2023" value={editingExp.startDate} onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })} style={inputStyle} required />
                        </div>
                        <div>
                          <label style={labelStyle}>End Date</label>
                          <input type="text" placeholder="Leave empty for Present" value={editingExp.endDate || ''} onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })} style={inputStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Achievements / Responsibilities</label>
                        {editingExp.achievements?.map((ach, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              type="text" 
                              placeholder={`Achievement ${idx + 1}`} 
                              value={ach} 
                              onChange={(e) => {
                                const newAch = [...editingExp.achievements];
                                newAch[idx] = e.target.value;
                                setEditingExp({ ...editingExp, achievements: newAch });
                              }} 
                              style={{ ...inputStyle, marginBottom: 0 }} 
                            />
                            {editingExp.achievements.length > 1 && (
                              <button 
                                onClick={() => {
                                  const newAch = editingExp.achievements.filter((_, i) => i !== idx);
                                  setEditingExp({ ...editingExp, achievements: newAch });
                                }} 
                                style={{ padding: '8px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', flexShrink: 0 }}
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          onClick={() => setEditingExp({ ...editingExp, achievements: [...(editingExp.achievements || []), ''] })} 
                          style={{ padding: '8px 16px', background: '#334155', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '0.875rem', marginTop: '8px', fontWeight: '600' }}
                        >
                          + Add Achievement
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button onClick={saveExperience} style={{ ...saveButtonStyle, flex: 1 }}>
                          <Save size={18} /> Save Experience
                        </button>
                        <button onClick={() => setEditingExp(null)} style={{ padding: '12px 24px', background: '#64748b', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ color: '#e2e8f0' }}>Manage Projects</h2>
                <button onClick={addProject} style={addButtonStyle}>
                  <Plus size={18} /> Add New Project
                </button>
              </div>

              {projects.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
                  No projects yet. Click "Add New Project" to showcase your work!
                </p>
              ) : (
                projects.map(proj => (
                  <div key={proj._id} style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#e2e8f0', marginBottom: '4px' }}>{proj.name}</h3>
                        <p style={{ color: '#667eea', fontSize: '0.875rem', marginBottom: '8px', fontWeight: '600' }}>{proj.role}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>{proj.description}</p>
                        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {proj.technologies?.map((tech, idx) => (
                            <span key={idx} style={{ background: '#334155', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', color: '#cbd5e1' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <button onClick={() => setEditingProject(proj)} style={{ padding: '8px 12px', background: '#667eea', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: '600' }}>
                          <Edit size={16} /> Edit
                        </button>
                        <button onClick={() => deleteProject(proj._id)} style={{ padding: '8px 12px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: '600' }}>
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* PROJECT EDIT MODAL */}
              {editingProject && (
                <div style={modalOverlay} onClick={() => setEditingProject(null)}>
                  <div style={modalContent} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                      <h3 style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>
                        {editingProject._id ? 'Edit Project' : 'Add New Project'}
                      </h3>
                      <button onClick={() => setEditingProject(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={24} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Project Name *</label>
                        <input type="text" placeholder="e.g., SWIFTED" value={editingProject.name} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} style={inputStyle} required />
                      </div>

                      <div>
                        <label style={labelStyle}>Your Role</label>
                        <input type="text" placeholder="e.g., Frontend Developer, Tester" value={editingProject.role || ''} onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })} style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>Description *</label>
                        <textarea placeholder="Project description" value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} rows="3" style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }} required />
                      </div>

                      <div>
                        <label style={labelStyle}>Technologies (comma separated)</label>
                        <input type="text" placeholder="e.g., React, JavaScript, Node.js" value={editingProject.technologies?.join(', ') || ''} onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) })} style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>Highlights</label>
                        {editingProject.highlights?.map((highlight, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              type="text" 
                              placeholder={`Highlight ${idx + 1}`} 
                              value={highlight} 
                              onChange={(e) => {
                                const newHighlights = [...editingProject.highlights];
                                newHighlights[idx] = e.target.value;
                                setEditingProject({ ...editingProject, highlights: newHighlights });
                              }} 
                              style={{ ...inputStyle, marginBottom: 0 }} />
                            {editingProject.highlights.length > 1 && (
                              <button 
                                onClick={() => {
                                  const newHighlights = editingProject.highlights.filter((_, i) => i !== idx);
                                  setEditingProject({ ...editingProject, highlights: newHighlights });
                                }} 
                                style={{ padding: '8px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', flexShrink: 0 }}
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          onClick={() => setEditingProject({ ...editingProject, highlights: [...(editingProject.highlights || []), ''] })} 
                          style={{ padding: '8px 16px', background: '#334155', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '0.875rem', marginTop: '8px', fontWeight: '600' }}
                        >
                          + Add Highlight
                        </button>
                      </div>

                      <div>
                        <label style={labelStyle}>GitHub Link (optional)</label>
                        <input type="text" placeholder="https://github.com/..." value={editingProject.githubLink || ''} onChange={(e) => setEditingProject({ ...editingProject, githubLink: e.target.value })} style={inputStyle} />
                      </div>

                      <div>
                        <label style={labelStyle}>Live Demo Link (optional)</label>
                        <input type="text" placeholder="https://..." value={editingProject.liveLink || ''} onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })} style={inputStyle} />
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button onClick={saveProject} style={{ ...saveButtonStyle, flex: 1 }}>
                          <Save size={18} /> Save Project
                        </button>
                        <button onClick={() => setEditingProject(null)} style={{ padding: '12px 24px', background: '#64748b', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ color: '#e2e8f0' }}>Manage Skills</h2>
                <button onClick={addSkill} style={addButtonStyle}>
                  <Plus size={18} /> Add New Skill
                </button>
              </div>

              {skills.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px' }}>
                  No skills yet. Click "Add New Skill" to add your first skill!
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                  {skills.map(skill => (
                    <div key={skill._id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                      <div>
                        <div style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '4px' }}>{skill.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {skill.category} • {skill.level}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => setEditingSkill(skill)} style={{ padding: '6px', background: '#667eea', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>
                          <Edit size={14} />
                        </button>
                        <button onClick={() => deleteSkill(skill._id)} style={{ padding: '6px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SKILL EDIT MODAL */}
              {editingSkill && (
                <div style={modalOverlay} onClick={() => setEditingSkill(null)}>
                  <div style={{ ...modalContent, maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                      <h3 style={{ color: '#e2e8f0', fontSize: '1.5rem' }}>
                        {editingSkill._id ? 'Edit Skill' : 'Add New Skill'}
                      </h3>
                      <button onClick={() => setEditingSkill(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={24} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Skill Name *</label>
                        <input type="text" placeholder="e.g., Java, Selenium, Postman" value={editingSkill.name} onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })} style={inputStyle} required />
                      </div>

                      <div>
                        <label style={labelStyle}>Category *</label>
                        <select value={editingSkill.category} onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })} style={inputStyle} required>
                          <option value="Testing">Testing & QA</option>
                          <option value="Programming">Programming</option>
                          <option value="Tools">Tools & Technologies</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>Skill Level *</label>
                        <select value={editingSkill.level} onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })} style={inputStyle} required>
                          <option value="Learning">Learning (Currently studying)</option>
                          <option value="Basic">Basic (Can use with help)</option>
                          <option value="Intermediate">Intermediate (Comfortable)</option>
                          <option value="Advanced">Advanced (Expert level)</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button onClick={saveSkill} style={{ ...saveButtonStyle, flex: 1 }}>
                          <Save size={18} /> Save Skill
                        </button>
                        <button onClick={() => setEditingSkill(null)} style={{ padding: '12px 24px', background: '#64748b', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// STYLES
const inputStyle = {
  width: '100%',
  padding: '12px',
  background: '#0f172a',
  border: '1px solid #334155',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: '16px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#94a3b8',
  fontSize: '0.875rem',
  fontWeight: '500'
};

const saveButtonStyle = {
  padding: '14px 28px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
};

const addButtonStyle = {
  padding: '10px 20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const cardStyle = {
  background: '#0f172a',
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #334155',
  marginBottom: '16px'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.85)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '20px',
  backdropFilter: 'blur(4px)'
};

const modalContent = {
  background: '#1e293b',
  borderRadius: '12px',
  padding: '32px',
  maxWidth: '700px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  border: '1px solid #334155',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
};