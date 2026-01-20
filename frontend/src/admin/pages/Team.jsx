import { useState, useEffect } from 'react';
import { teamAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { DataTable, Button, Badge, Modal, Input, Textarea, ConfirmDialog } from '../components/ui';

const Team = () => {
  const { success, error: showError } = useToast();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    specialization: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    social: { linkedin: '', twitter: '', facebook: '' },
    active: true,
    order: 0,
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      setTeam(response.data || []);
    } catch (err) {
      showError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setSelectedMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        specialization: member.specialization || '',
        bio: member.bio || '',
        image: member.image || '',
        email: member.email || '',
        phone: member.phone || '',
        education: member.education || '',
        experience: member.experience || '',
        social: member.social || { linkedin: '', twitter: '', facebook: '' },
        active: member.active !== false,
        order: member.order || 0,
      });
    } else {
      setSelectedMember(null);
      setFormData({
        name: '',
        role: '',
        specialization: '',
        bio: '',
        image: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        social: { linkedin: '', twitter: '', facebook: '' },
        active: true,
        order: team.length,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedMember) {
        await teamAPI.update(selectedMember._id, formData);
        success('Team member updated successfully');
      } else {
        await teamAPI.create(formData);
        success('Team member added successfully');
      }
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await teamAPI.delete(selectedMember._id);
      success('Team member removed successfully');
      setDeleteDialogOpen(false);
      setSelectedMember(null);
      fetchTeam();
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Member',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img
              src={row.image}
              alt={value}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
              {value?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-slate-800">{value}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', label: 'Role' },
    { key: 'specialization', label: 'Specialization', render: (value) => value || '-' },
    { key: 'experience', label: 'Experience', render: (value) => value || '-' },
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
              setSelectedMember(row);
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
          <h2 className="text-xl font-semibold text-slate-800">Manage Team</h2>
          <p className="text-slate-500 text-sm mt-1">Add and manage team members</p>
        </div>
        <Button onClick={() => openModal()}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={team}
        loading={loading}
        emptyMessage="No team members found"
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedMember ? 'Edit Team Member' : 'Add Team Member'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Dental Surgeon"
              required
            />
            <Input
              label="Specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Orthodontics"
            />
            <Input
              label="Experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 10+ years"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
          />
          <Input
            label="Education"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            placeholder="e.g., DDS, Harvard Dental School"
          />
          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="LinkedIn URL"
              value={formData.social.linkedin}
              onChange={(e) => setFormData({
                ...formData,
                social: { ...formData.social, linkedin: e.target.value },
              })}
            />
            <Input
              label="Twitter URL"
              value={formData.social.twitter}
              onChange={(e) => setFormData({
                ...formData,
                social: { ...formData.social, twitter: e.target.value },
              })}
            />
            <Input
              label="Facebook URL"
              value={formData.social.facebook}
              onChange={(e) => setFormData({
                ...formData,
                social: { ...formData.social, facebook: e.target.value },
              })}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-teal-500 rounded border-slate-300 focus:ring-teal-500"
            />
            <label htmlFor="active" className="text-sm text-slate-700">
              Member is active
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {selectedMember ? 'Update' : 'Add'} Member
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Remove Team Member"
        message={`Are you sure you want to remove "${selectedMember?.name}" from the team?`}
        loading={submitting}
      />
    </div>
  );
};

export default Team;
