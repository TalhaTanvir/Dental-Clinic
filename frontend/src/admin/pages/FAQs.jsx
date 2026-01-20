import { useState, useEffect } from 'react';
import { faqsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { DataTable, Button, Badge, Modal, Input, Select, Textarea, ConfirmDialog } from '../components/ui';

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'services', label: 'Services' },
  { value: 'appointments', label: 'Appointments' },
  { value: 'insurance', label: 'Insurance & Payment' },
  { value: 'emergency', label: 'Emergency Care' },
];

const FAQs = () => {
  const { success, error: showError } = useToast();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, [filter]);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? `?category=${filter}` : '';
      const response = await faqsAPI.getAll(params);
      setFaqs(response.data || []);
    } catch (err) {
      showError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (faq = null) => {
    if (faq) {
      setSelectedFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || 'general',
        order: faq.order || 0,
        active: faq.active !== false,
      });
    } else {
      setSelectedFaq(null);
      setFormData({
        question: '',
        answer: '',
        category: 'general',
        order: faqs.length,
        active: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedFaq) {
        await faqsAPI.update(selectedFaq._id, formData);
        success('FAQ updated successfully');
      } else {
        await faqsAPI.create(formData);
        success('FAQ created successfully');
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await faqsAPI.delete(selectedFaq._id);
      success('FAQ deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedFaq(null);
      fetchFaqs();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryBadge = (category) => {
    const variants = {
      general: 'default',
      services: 'primary',
      appointments: 'info',
      insurance: 'warning',
      emergency: 'danger',
    };
    return <Badge variant={variants[category] || 'default'}>{category}</Badge>;
  };

  const columns = [
    {
      key: 'question',
      label: 'Question',
      render: (value) => (
        <p className="font-medium text-slate-800 max-w-md">{value}</p>
      ),
    },
    {
      key: 'answer',
      label: 'Answer',
      render: (value) => (
        <p className="text-slate-600 line-clamp-2 max-w-md">{value}</p>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => getCategoryBadge(value),
    },
    {
      key: 'active',
      label: 'Status',
      render: (value) => (
        <Badge variant={value !== false ? 'success' : 'default'}>
          {value !== false ? 'Active' : 'Inactive'}
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
              openModal(row);
            }}
            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFaq(row);
              setDeleteDialogOpen(true);
            }}
            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          <h2 className="text-xl font-semibold text-slate-800">Manage FAQs</h2>
          <p className="text-slate-500 text-sm mt-1">Add and manage frequently asked questions</p>
        </div>
        <Button onClick={() => openModal()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add FAQ
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          All
        </button>
        {categoryOptions.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === cat.value
                ? 'bg-teal-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={faqs}
        loading={loading}
        emptyMessage="No FAQs found"
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedFaq ? 'Edit FAQ' : 'Add FAQ'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            required
          />
          <Textarea
            label="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            rows={5}
            required
          />
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categoryOptions}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500"
            />
            <label htmlFor="active" className="text-sm text-slate-700">
              FAQ is active
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {selectedFaq ? 'Update' : 'Create'} FAQ
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
        loading={submitting}
      />
    </div>
  );
};

export default FAQs;
