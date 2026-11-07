import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService';
import { generateAll90Days, ASSESSMENTS } from './data/curriculumData';
import { UserProfile, ProgramConfig, CurriculumDay, Assessment, Certificate, ReflectionJournal, SubjectId } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SubjectShowcase } from './components/SubjectShowcase';
import { CurriculumOverview } from './components/CurriculumOverview';
import { LessonViewer } from './components/LessonViewer';
import { AssessmentRunner } from './components/AssessmentRunner';
import { CertificateView } from './components/CertificateView';
import { VerificationPage } from './components/VerificationPage';
import { DashboardPeserta } from './components/DashboardPeserta';
import { DashboardPembimbing } from './components/DashboardPembimbing';
import { DashboardAdmin } from './components/DashboardAdmin';
import { LibraryView } from './components/LibraryView';
import { JournalModal } from './components/JournalModal';
import { NotificationModal } from './components/NotificationModal';
import { AboutProgram } from './components/AboutProgram';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal } from './components/LoginModal';
import { HelpCenter } from './components/HelpCenter';
import { Footer } from './components/Footer';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [allDays] = useState<CurriculumDay[]>(() => generateAll90Days());
  const [assessments] = useState<Assessment[]>(ASSESSMENTS);
  const [config, setConfig] = useState<ProgramConfig>(() => StorageService.getConfig());
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => StorageService.getUsers());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => StorageService.getCurrentUser());
  const [currentDay, setCurrentDay] = useState<number>(() => StorageService.getCurrentDayNumber());

  // Navigation & views
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeLessonDay, setActiveLessonDay] = useState<number | null>(null);
  const [activeAssessmentId, setActiveAssessmentId] = useState<string | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [verificationToken, setVerificationToken] = useState<string>('');
  const [journalModalDay, setJournalModalDay] = useState<number | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');

  // Trigger state refresh helper
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Sync current user & day on change
  useEffect(() => {
    setCurrentDay(StorageService.getCurrentDayNumber());
  }, [config, refreshKey]);

  // Check URL params for quick verification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setVerificationToken(token);
      setActiveTab('verify');
    }
  }, []);

  const handleSelectUser = (userId: string) => {
    const updated = StorageService.setCurrentUser(userId);
    setCurrentUser(updated);
    setRefreshKey(prev => prev + 1);

    // Auto-navigate to respective dashboard
    if (updated.role === 'peserta') setActiveTab('dashboard_peserta');
    else if (updated.role === 'pembimbing') setActiveTab('dashboard_pembimbing');
    else setActiveTab('dashboard_admin');
  };

  const handleUpdateConfig = (newConfig: Partial<ProgramConfig>) => {
    const updated = StorageService.updateConfig(newConfig, currentUser.fullName);
    setConfig(updated);
    setCurrentDay(StorageService.getCurrentDayNumber());
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenLesson = (dayNumber: number) => {
    setActiveLessonDay(dayNumber);
    setActiveTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = (assessmentId: string) => {
    setActiveAssessmentId(assessmentId);
    setActiveTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCertificate = (certOrParticipantId?: Certificate | string) => {
    if (typeof certOrParticipantId === 'object' && certOrParticipantId) {
      setActiveCertificate(certOrParticipantId);
    } else {
      const pId = typeof certOrParticipantId === 'string' ? certOrParticipantId : currentUser.id;
      const certs = StorageService.getCertificates().filter(c => c.participantId === pId);
      if (certs.length > 0) {
        setActiveCertificate(certs[0]);
      }
    }
    setActiveTab('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkDayComplete = (dayNum: number, score: number) => {
    StorageService.markDayComplete(currentUser.id, dayNum, score);
    setRefreshKey(prev => prev + 1);
  };

  const handleSaveJournal = (journalData: Omit<ReflectionJournal, 'id' | 'createdAt' | 'updatedAt'>) => {
    StorageService.saveJournal(journalData);
    setRefreshKey(prev => prev + 1);
  };

  const notifications = StorageService.getNotifications(currentUser.id);
  const unreadCount = notifications.filter(n => !n.read).length;
  const progress = StorageService.getProgress(currentUser.id);
  const participants = allUsers.filter(u => u.role === 'peserta');

  const selectedDayData = activeLessonDay ? allDays.find(d => d.dayNumber === activeLessonDay) : null;
  const selectedAssessmentData = activeAssessmentId ? assessments.find(a => a.id === activeAssessmentId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] font-sans-body selection:bg-amber-100 selection:text-amber-950 pb-16 md:pb-0">
      
      {/* PWA Install Notification Bar */}
      <PWAInstallBanner />

      {/* 3-Zone Standard Top Navigation */}
      <Navbar
        currentUser={currentUser}
        allUsers={allUsers}
        onSelectUser={handleSelectUser}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentDay={currentDay}
        unreadNotifsCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenRegister={() => setRegistrationModalOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 bg-[#FBF9F5]">
        
        {/* Tab: Home */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              currentDay={currentDay}
              onExploreCurriculum={() => {
                setActiveTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenTodayLesson={() => handleOpenLesson(currentDay)}
            />

            <SubjectShowcase
              onSelectSubjectFilter={(subId) => {
                setSubjectFilter(subId);
                setActiveTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Curriculum Invitation with Editorial Typography */}
            <div className="py-16 bg-[#FFFFFF] border-t border-[#E7E5E4]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#B4863A] font-bold font-sans-body">
                  Bimbingan Menuju Husnul Khatimah
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-medium text-[#0A192F]">
                  Siap Memulai Perjalanan Menata Hidup?
                </h3>
                <p className="text-sm sm:text-base text-[#44403C] max-w-2xl mx-auto leading-relaxed font-sans-body">
                  Ikuti bimbingan bertahap dari hari ke-1 hingga hari ke-90. Buka modul materi harian, amalkan tugas praktik, dan evaluasi diri dengan jujur di hadapan Allah.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                  <button
                    onClick={() => setRegistrationModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#122A4E] text-[#FBF9F5] font-semibold text-xs tracking-wide transition-all shadow-md cursor-pointer border border-[#0A192F]"
                  >
                    Daftar Sebagai Peserta Baru
                  </button>
                  <button
                    onClick={() => {
                      if (currentUser.role === 'peserta') setActiveTab('dashboard_peserta');
                      else if (currentUser.role === 'pembimbing') setActiveTab('dashboard_pembimbing');
                      else setActiveTab('dashboard_admin');
                    }}
                    className="px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F2EB] text-[#0A192F] font-semibold text-xs transition-colors shadow-sm border border-[#D6CEBE] cursor-pointer"
                  >
                    Masuk ke Dashboard ({currentUser.fullName.split(' ')[0]}) →
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-transparent hover:bg-[#F5F2EB] text-[#44403C] hover:text-[#0A192F] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Pelajari Manhaj & Silabus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Curriculum */}
        {activeTab === 'curriculum' && (
          <CurriculumOverview
            days={allDays}
            currentDay={currentDay}
            completedProgress={progress}
            onSelectDay={handleOpenLesson}
            filterSubject={subjectFilter}
          />
        )}

        {/* Tab: Subjects */}
        {activeTab === 'subjects' && (
          <div className="py-6">
            <SubjectShowcase
              onSelectSubjectFilter={(subId) => {
                setSubjectFilter(subId);
                setActiveTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Tab: Library */}
        {activeTab === 'library' && (
          <LibraryView />
        )}

        {/* Tab: About Program */}
        {activeTab === 'about' && (
          <AboutProgram
            onRegisterClick={() => setRegistrationModalOpen(true)}
            onExploreCurriculum={() => {
              setActiveTab('curriculum');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab: Verify Certificate */}
        {activeTab === 'verify' && (
          <VerificationPage
            initialToken={verificationToken}
            onOpenCertificateView={(cert) => {
              setActiveCertificate(cert);
              setActiveTab('certificate');
            }}
          />
        )}

        {/* Tab: Help Center */}
        {activeTab === 'help' && (
          <HelpCenter />
        )}

        {/* Tab: Lesson Viewer */}
        {activeTab === 'lesson' && selectedDayData && (
          <LessonViewer
            day={selectedDayData}
            isCompleted={progress.some(p => p.dayNumber === selectedDayData.dayNumber && p.completed)}
            participantId={currentUser.id}
            onBack={() => setActiveTab('curriculum')}
            onMarkComplete={(score) => handleMarkDayComplete(selectedDayData.dayNumber, score)}
            onOpenJournal={() => setJournalModalDay(selectedDayData.dayNumber)}
            onNextDay={() => {
              if (selectedDayData.dayNumber < 90) {
                handleOpenLesson(selectedDayData.dayNumber + 1);
              }
            }}
            onPrevDay={() => {
              if (selectedDayData.dayNumber > 1) {
                handleOpenLesson(selectedDayData.dayNumber - 1);
              }
            }}
            hasNext={selectedDayData.dayNumber < 90 && StorageService.isDayUnlocked(selectedDayData.dayNumber + 1)}
            hasPrev={selectedDayData.dayNumber > 1}
          />
        )}

        {/* Tab: Assessment Runner */}
        {activeTab === 'assessment' && selectedAssessmentData && (
          <AssessmentRunner
            assessment={selectedAssessmentData}
            participantId={currentUser.id}
            onBack={() => setActiveTab('dashboard_peserta')}
            onSubmitAttempt={() => setRefreshKey(prev => prev + 1)}
            existingAttempt={StorageService.getAssessmentAttempts(currentUser.id).find(a => a.assessmentId === selectedAssessmentData.id)}
          />
        )}

        {/* Tab: Certificate View */}
        {activeTab === 'certificate' && activeCertificate && (
          <CertificateView
            certificate={activeCertificate}
            onBack={() => setActiveTab('dashboard_peserta')}
            onNavigateToVerify={(token) => {
              setVerificationToken(token);
              setActiveTab('verify');
            }}
          />
        )}

        {/* Tab: Dashboard Peserta */}
        {activeTab === 'dashboard_peserta' && (
          <DashboardPeserta
            currentUser={currentUser}
            currentDay={currentDay}
            allDays={allDays}
            assessments={assessments}
            onOpenLesson={handleOpenLesson}
            onOpenAssessment={handleOpenAssessment}
            onOpenCertificate={() => handleOpenCertificate()}
            onOpenJournalModal={(dayNum) => setJournalModalDay(dayNum)}
          />
        )}

        {/* Tab: Dashboard Pembimbing */}
        {activeTab === 'dashboard_pembimbing' && (
          <DashboardPembimbing
            currentUser={currentUser}
            participants={participants}
            assessments={assessments}
            onOpenCertificate={(pId) => handleOpenCertificate(pId)}
          />
        )}

        {/* Tab: Dashboard Admin */}
        {activeTab === 'dashboard_admin' && (
          <DashboardAdmin
            currentUser={currentUser}
            config={config}
            onUpdateConfig={handleUpdateConfig}
            participants={participants}
            allDays={allDays}
          />
        )}

      </main>

      {/* Global Modals */}
      {journalModalDay !== null && (
        <JournalModal
          dayNumber={journalModalDay}
          lessonTheme={allDays.find(d => d.dayNumber === journalModalDay)?.theme || 'Muhasabah Harian'}
          participantId={currentUser.id}
          existingJournal={StorageService.getJournals(currentUser.id).find(j => j.dayNumber === journalModalDay)}
          onClose={() => setJournalModalDay(null)}
          onSave={handleSaveJournal}
        />
      )}

      {notificationsOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setNotificationsOpen(false)}
          onMarkRead={(id) => {
            StorageService.markNotificationRead(id);
            setRefreshKey(prev => prev + 1);
          }}
          onNavigateToTab={(tab) => {
            setActiveTab(tab);
            setNotificationsOpen(false);
          }}
        />
      )}

      {registrationModalOpen && (
        <RegistrationModal
          onClose={() => setRegistrationModalOpen(false)}
          onRegistered={(newUser) => {
            setAllUsers(StorageService.getUsers());
            setCurrentUser(newUser);
            setActiveTab('dashboard_peserta');
            setRefreshKey(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {loginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onLoginSuccess={(user) => {
            setAllUsers(StorageService.getUsers());
            handleSelectUser(user.id);
            setRefreshKey(prev => prev + 1);
          }}
          onOpenRegister={() => setRegistrationModalOpen(true)}
        />
      )}

      {/* Standard Quiet Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Mobile Ergonomic Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentDay={currentDay}
        userRole={currentUser.role}
      />

    </div>
  );
}
