import { useState } from 'react'

const PERMISSION_LABELS = {
  sales_marketing: 'Sales & Marketing',
  project_management: 'Project Management',
  access_other_users: 'Access to Other Users',
  view_admin_panel: 'View Info in Admin Panel',
}

const PERMISSION_FIELDS = [
  {
    key: 'sales_marketing',
    formKey: 'salesMarketing',
    label: 'Sales & Marketing',
  },
  {
    key: 'project_management',
    formKey: 'projectManagement',
    label: 'Project Management',
  },
  {
    key: 'access_other_users',
    formKey: 'accessOtherUsers',
    label: 'Access to Other Users',
  },
  {
    key: 'view_admin_panel',
    formKey: 'viewAdminPanel',
    label: 'View Information in Admin Panel',
  },
]

const formatPermissionLabels = (permissions = {}) =>
  Object.entries(PERMISSION_LABELS)
    .filter(([key]) => permissions[key])
    .map(([, label]) => label)

const buildDisplayName = (user) => {
  const parts = [user.first_name, user.last_name].filter(Boolean)
  return parts.length ? parts.join(' ') : 'Unassigned'
}

const buildPermissionState = (permissions = {}) => ({
  salesMarketing: Boolean(permissions.sales_marketing),
  projectManagement: Boolean(permissions.project_management),
  accessOtherUsers: Boolean(permissions.access_other_users),
  viewAdminPanel: Boolean(permissions.view_admin_panel),
})

const buildEditForm = (user = {}) => ({
  firstName: user.first_name || '',
  lastName: user.last_name || '',
  countryCode: user.country_code || '+1',
  phoneNumber: user.phone_number || '',
  address: user.address || '',
  jobTitle: user.job_title || '',
  permissions: buildPermissionState(user.permissions),
})

const validateEditForm = (form) => {
  const errors = {}
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required.'
  }
  const phoneDigits = form.phoneNumber.replace(/\D/g, '')
  if (phoneDigits.length > 0 && phoneDigits.length !== 10) {
    errors.phoneNumber = 'Enter a valid 10-digit phone number.'
  } else if (phoneDigits.length === 10 && phoneDigits.startsWith('0')) {
    errors.phoneNumber = 'Phone number cannot start with 0.'
  }
  if (!form.address.trim()) {
    errors.address = 'Address is required.'
  }
  if (!Object.values(form.permissions).some(Boolean)) {
    errors.permissions = 'Select at least one permission.'
  }
  return { errors, phoneDigits }
}

const buildUpdatePayload = (form, phoneDigits) => ({
  first_name: form.firstName.trim(),
  last_name: form.lastName.trim() || null,
  country_code: phoneDigits ? form.countryCode : null,
  phone_number: phoneDigits || null,
  address: form.address.trim(),
  job_title: form.jobTitle.trim() || null,
  permissions: {
    sales_marketing: form.permissions.salesMarketing,
    project_management: form.permissions.projectManagement,
    access_other_users: form.permissions.accessOtherUsers,
    view_admin_panel: form.permissions.viewAdminPanel,
  },
})

const PortalUsers = ({ users, state, onUpdateUser }) => {
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState(buildEditForm())
  const [editErrors, setEditErrors] = useState({})
  const [editState, setEditState] = useState({ loading: false, error: '' })

  const handleOpenEdit = (user) => {
    setEditingUser(user)
    setEditForm(buildEditForm(user))
    setEditErrors({})
    setEditState({ loading: false, error: '' })
  }

  const handleCloseEdit = () => {
    setEditingUser(null)
  }

  const handleEditFieldChange = (field, value) => {
    if (field === 'phoneNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setEditForm((prev) => ({ ...prev, [field]: digits }))
    } else {
      setEditForm((prev) => ({ ...prev, [field]: value }))
    }
    if (editErrors[field]) {
      setEditErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handlePermissionToggle = (field) => {
    setEditForm((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: !prev.permissions[field],
      },
    }))
    if (editErrors.permissions) {
      setEditErrors((prev) => ({ ...prev, permissions: '' }))
    }
  }

  const handleSubmitEdit = async (event) => {
    event.preventDefault()
    if (!editingUser || !onUpdateUser) {
      return
    }
    const { errors, phoneDigits } = validateEditForm(editForm)
    setEditErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
    setEditState({ loading: true, error: '' })
    try {
      await onUpdateUser(
        editingUser.id,
        buildUpdatePayload(editForm, phoneDigits)
      )
      setEditState({ loading: false, error: '' })
      setEditingUser(null)
    } catch (error) {
      setEditState({
        loading: false,
        error: error.message || 'Unable to update user.',
      })
    }
  }

  return (
    <div className="portal-card portal-card--users">
      {state.error && (
        <p className="form-message error" role="alert">
          {state.error}
        </p>
      )}

      {state.loading ? (
        <p className="portal-loading">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="portal-empty">No users to display yet.</p>
      ) : (
        <div className="portal-table-wrapper">
          <div className="portal-table">
            <div className="portal-row portal-row--header">
              {/* <span>ID</span> */}
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Address</span>
              <span>Job Title</span>
              <span>Permissions</span>
              <span>Actions</span>
            </div>
            {users.map((user) => {
              const permissionLabels = formatPermissionLabels(
                user.permissions || {}
              )
              return (
                <div key={user.id} className="portal-row">
                  {/* <span>{user.id}</span> */}
                  <span>{buildDisplayName(user)}</span>
                  <span>{user.email || '-'}</span>
                  <span>
                    {user.phone_number
                      ? `${user.country_code || ''} ${user.phone_number}`.trim()
                      : '-'}
                  </span>
                  <span>{user.address || '-'}</span>
                  <span>{user.job_title || '-'}</span>
                  <span className="portal-permissions">
                    {permissionLabels.length > 0 ? (
                      permissionLabels.map((label) => (
                        <span key={label} className="tag">
                          {label}
                        </span>
                      ))
                    ) : (
                      <span className="tag tag--muted">None</span>
                    )}
                  </span>
                  <span className="portal-actions">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleOpenEdit(user)}
                      aria-label={`Edit ${buildDisplayName(user)}`}
                      title="Edit user"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fill="currentColor"
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                        />
                        <path
                          fill="currentColor"
                          d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {editingUser && (
        <>
          <button
            type="button"
            className="modal-backdrop"
            onClick={handleCloseEdit}
            aria-label="Close edit user modal"
          />
          <div className="modal-card modal-card--form" role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <p className="modal-kicker">Edit user</p>
                <h3>Update {buildDisplayName(editingUser)}</h3>
                <p>Adjust profile details and access permissions.</p>
              </div>
            </div>

            <form className="onboarding-form" onSubmit={handleSubmitEdit}>
              <div className="field-grid">
                <div className="form-field">
                  <label className="auth-label" htmlFor="editFirstName">
                    First Name
                  </label>
                  <input
                    id="editFirstName"
                    name="editFirstName"
                    type="text"
                    placeholder="Jane"
                    className={`auth-input ${editErrors.firstName ? 'input-error' : ''}`}
                    value={editForm.firstName}
                    onChange={(event) =>
                      handleEditFieldChange('firstName', event.target.value)
                    }
                  />
                  {editErrors.firstName && (
                    <p className="field-error">{editErrors.firstName}</p>
                  )}
                </div>
                <div className="form-field">
                  <label className="auth-label" htmlFor="editLastName">
                    Last Name (Optional)
                  </label>
                  <input
                    id="editLastName"
                    name="editLastName"
                    type="text"
                    placeholder="Doe"
                    className="auth-input"
                    value={editForm.lastName}
                    onChange={(event) =>
                      handleEditFieldChange('lastName', event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="auth-label" htmlFor="editPhoneNumber">
                  Phone Number
                </label>
                <div className="phone-row">
                  <div className="phone-code">
                    {editForm.countryCode || '+1'}
                  </div>
                  <input
                    id="editPhoneNumber"
                    name="editPhoneNumber"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit number"
                    className={`auth-input ${editErrors.phoneNumber ? 'input-error' : ''}`}
                    value={editForm.phoneNumber}
                    onChange={(event) =>
                      handleEditFieldChange('phoneNumber', event.target.value)
                    }
                  />
                </div>
                {editErrors.phoneNumber && (
                  <p className="field-error">{editErrors.phoneNumber}</p>
                )}
              </div>

              <div className="form-field">
                <label className="auth-label" htmlFor="editAddress">
                  Address
                </label>
                <input
                  id="editAddress"
                  name="editAddress"
                  type="text"
                  placeholder="Enter your address"
                  className={`auth-input ${editErrors.address ? 'input-error' : ''}`}
                  value={editForm.address}
                  onChange={(event) =>
                    handleEditFieldChange('address', event.target.value)
                  }
                />
                {editErrors.address && (
                  <p className="field-error">{editErrors.address}</p>
                )}
              </div>

              <div className="form-field">
                <label className="auth-label" htmlFor="editJobTitle">
                  Job Title (Optional)
                </label>
                <input
                  id="editJobTitle"
                  name="editJobTitle"
                  type="text"
                  placeholder="Enter job title"
                  className="auth-input"
                  value={editForm.jobTitle}
                  onChange={(event) =>
                    handleEditFieldChange('jobTitle', event.target.value)
                  }
                />
              </div>

              <div className="permissions-panel">
                <h3>User Access & Permissions</h3>
                <div className="toggle-grid">
                  {PERMISSION_FIELDS.map((permission) => (
                    <label key={permission.key} className="toggle-row">
                      <span>{permission.label}</span>
                      <input
                        type="checkbox"
                        name={permission.formKey}
                        checked={editForm.permissions[permission.formKey]}
                        onChange={() =>
                          handlePermissionToggle(permission.formKey)
                        }
                      />
                    </label>
                  ))}
                </div>
                {editErrors.permissions && (
                  <p className="field-error">{editErrors.permissions}</p>
                )}
              </div>

              {editState.error && (
                <p className="form-message error" role="alert">
                  {editState.error}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="dashboard-button dashboard-button--ghost"
                  onClick={handleCloseEdit}
                  disabled={editState.loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="dashboard-button"
                  disabled={editState.loading}
                >
                  {editState.loading ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default PortalUsers
