import React from 'react';
import { AppNotification } from '../types';
import { X, Bell, CheckCircle2, Clock, Award, FileText } from 'lucide-react';

interface NotificationModalProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkRead,
  onNavigateToTab
}) => {
  const iconTypeMap: Record<string, React.ReactNode> = {
    unlock: <Clock className="w-4 h-4 text-sky-700" />,
    evaluation: <FileText className="w-4 h-4 text-cyan-700" />,
    grading: <CheckCircle2 className="w-4 h-4 text-sky-700" />,
    certificate: <Award className="w-4 h-4 text-cyan-600" />,
    announcement: <Bell className="w-4 h-4 text-slate-700" />
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-sky-950 text-white p-5 flex items-center justify-between border-b border-cyan-500/30">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-cyan-300" />
            <h3 className="text-sm font-bold">Pusat Notifikasi Akademik</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-sky-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[65vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-500">
              Belum ada notifikasi baru saat ini.
            </p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all text-xs flex gap-3 cursor-pointer ${
                  !notif.read
                    ? 'bg-sky-50/70 border-sky-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {iconTypeMap[notif.type] || <Bell className="w-4 h-4 text-slate-600" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">{notif.title}</h4>
                    <span className="font-mono text-[10px] text-slate-400">
                      {new Date(notif.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
