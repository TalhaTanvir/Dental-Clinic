import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { DataTable, Button, Badge, Modal, ConfirmDialog } from '../components/ui';

const Messages = () => {
  const { success, error: showError } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let params = '';
      if (filter === 'unread') params = '?read=false';
      else if (filter === 'read') params = '?read=true';
      const response = await contactAPI.getAll(params);
      setMessages(response.data || []);
    } catch (err) {
      showError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (message) => {
    setSelectedMessage(message);
    setViewModalOpen(true);
    
    if (!message.read) {
      try {
        await contactAPI.markAsRead(message._id);
        fetchMessages();
      } catch (err) {
        // Silent fail for marking as read
      }
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await contactAPI.delete(selectedMessage._id);
      success('Message deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
    
    return d.toLocaleDateString();
  };

  const columns = [
    {
      key: 'name',
      label: 'From',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
            row.read ? 'bg-slate-400' : 'bg-gradient-to-br from-teal-400 to-teal-600'
          }`}>
            {value?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={`${row.read ? 'text-slate-600' : 'font-semibold text-slate-800'}`}>{value}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (value, row) => (
        <div>
          <p className={`${row.read ? 'text-slate-600' : 'font-medium text-slate-800'}`}>{value || 'No subject'}</p>
          <p className="text-sm text-slate-500 line-clamp-1">{row.message}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => value || '-',
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (value) => (
        <span className="text-slate-500">{formatDate(value)}</span>
      ),
    },
    {
      key: 'read',
      label: 'Status',
      render: (value) => (
        <Badge variant={value ? 'default' : 'primary'}>
          {value ? 'Read' : 'New'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            title="View"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <a
            href={`mailto:${row.email}?subject=Re: ${row.subject || 'Your message'}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Reply"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMessage(row);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Contact Messages</h2>
          <p className="text-slate-500 text-sm mt-1">Manage messages from the contact form</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'unread', 'read'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === status
                ? 'bg-teal-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={messages}
        loading={loading}
        emptyMessage="No messages found"
        onRowClick={handleView}
      />

      {/* View Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-lg">
                {selectedMessage.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 text-lg">{selectedMessage.name}</h3>
                <p className="text-slate-500">{selectedMessage.email}</p>
                {selectedMessage.phone && (
                  <p className="text-slate-500">{selectedMessage.phone}</p>
                )}
              </div>
              <div className="text-sm text-slate-400">
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
            </div>

            {selectedMessage.subject && (
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</label>
                <p className="text-slate-800 font-medium mt-1">{selectedMessage.subject}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Message</label>
              <div className="mt-2 p-4 bg-slate-50 rounded-xl">
                <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}
                className="flex-1"
              >
                <Button variant="primary" className="w-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Reply via Email
                </Button>
              </a>
              <Button
                variant="danger"
                onClick={() => {
                  setViewModalOpen(false);
                  setDeleteDialogOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Message"
        message={`Are you sure you want to delete the message from "${selectedMessage?.name}"?`}
        loading={submitting}
      />
    </div>
  );
};

export default Messages;
