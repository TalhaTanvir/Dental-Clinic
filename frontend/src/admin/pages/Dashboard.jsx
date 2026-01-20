import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appointmentsAPI, servicesAPI, teamAPI, testimonialsAPI, contactAPI } from '../services/api';
import { Card, Badge } from '../components/ui';

const StatCard = ({ title, value, icon, trend, color, link }) => {
  const colorClasses = {
    teal: 'from-teal-500 to-teal-600 shadow-teal-500/25',
    violet: 'from-violet-500 to-violet-600 shadow-violet-500/25',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    rose: 'from-rose-500 to-rose-600 shadow-rose-500/25',
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
  };

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    appointments: { total: 0, pending: 0, confirmed: 0, completed: 0 },
    services: 0,
    team: 0,
    testimonials: { total: 0, pending: 0 },
    messages: { total: 0, unread: 0 },
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointmentsRes, servicesRes, teamRes, testimonialsRes, contactRes] = await Promise.all([
          appointmentsAPI.getStats(),
          servicesAPI.getAll(),
          teamAPI.getAll(),
          testimonialsAPI.getAll(),
          contactAPI.getAll(),
        ]);

        // Parse appointment stats from array format
        const statusStats = appointmentsRes.data?.statusStats || [];
        const appointmentStats = {
          total: 0,
          pending: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0,
        };
        
        statusStats.forEach(stat => {
          if (stat._id && stat.count) {
            appointmentStats[stat._id] = stat.count;
            appointmentStats.total += stat.count;
          }
        });

        setStats({
          appointments: appointmentStats,
          services: servicesRes.count || servicesRes.data?.length || 0,
          team: teamRes.count || teamRes.data?.length || 0,
          testimonials: {
            total: testimonialsRes.count || testimonialsRes.data?.length || 0,
            pending: testimonialsRes.data?.filter(t => !t.approved)?.length || 0,
          },
          messages: {
            total: contactRes.count || contactRes.data?.length || 0,
            unread: contactRes.data?.filter(m => !m.read)?.length || 0,
          },
        });

        // Get recent appointments
        const recentRes = await appointmentsAPI.getAll('?limit=5&sort=-createdAt');
        setRecentAppointments(recentRes.data || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      completed: 'success',
      cancelled: 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-teal-100">Here's what's happening at your dental clinic today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Appointments"
          value={stats.appointments.total}
          color="teal"
          link="/admin/appointments"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Pending Appointments"
          value={stats.appointments.pending}
          color="amber"
          link="/admin/appointments?status=pending"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Active Services"
          value={stats.services}
          color="violet"
          link="/admin/services"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
        />
        <StatCard
          title="Team Members"
          value={stats.team}
          color="blue"
          link="/admin/team"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          title="Pending Testimonials"
          value={stats.testimonials.pending}
          color="rose"
          link="/admin/testimonials"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
        />
        <StatCard
          title="Unread Messages"
          value={stats.messages.unread}
          color="emerald"
          link="/admin/messages"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Recent appointments */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Recent Appointments</h3>
          <Link to="/admin/appointments" className="text-teal-500 hover:text-teal-600 text-sm font-medium">
            View all →
          </Link>
        </div>
        
        {recentAppointments.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No appointments yet</p>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{appointment.name}</p>
                        <p className="text-sm text-slate-500">{appointment.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{appointment.service || '-'}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {appointment.preferredDate ? new Date(appointment.preferredDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{appointment.preferredTime || '-'}</td>
                    <td className="px-6 py-4">{getStatusBadge(appointment.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Add Service', path: '/admin/services', icon: '🦷' },
          { title: 'Add Team Member', path: '/admin/team', icon: '👨‍⚕️' },
          { title: 'Review Testimonials', path: '/admin/testimonials', icon: '⭐' },
          { title: 'Check Messages', path: '/admin/messages', icon: '📧' },
        ].map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-teal-200 transition-all group"
          >
            <span className="text-2xl mb-2 block">{action.icon}</span>
            <span className="text-slate-700 font-medium group-hover:text-teal-600 transition-colors">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
