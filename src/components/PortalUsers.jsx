const PERMISSION_LABELS = {
  sales_marketing: 'Sales & Marketing',
  project_management: 'Project Management',
  access_other_users: 'Access to Other Users',
  view_admin_panel: 'View Info in Admin Panel',
}

const formatPermissionLabels = (permissions = {}) =>
  Object.entries(PERMISSION_LABELS)
    .filter(([key]) => permissions[key])
    .map(([, label]) => label)

const buildDisplayName = (user) => {
  const parts = [user.first_name, user.last_name].filter(Boolean)
  return parts.length ? parts.join(' ') : 'Unassigned'
}

const PortalUsers = ({ users, state }) => (
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
            <span>ID</span>
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Address</span>
            <span>Job Title</span>
            <span>Permissions</span>
          </div>
          {users.map((user) => {
            const permissionLabels = formatPermissionLabels(
              user.permissions || {}
            )
            return (
              <div key={user.id} className="portal-row">
                <span>{user.id}</span>
                <span>{buildDisplayName(user)}</span>
                <span>{user.email || '-'}</span>
                <span>{user.phone_number || '-'}</span>
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
              </div>
            )
          })}
        </div>
      </div>
    )}
  </div>
)

export default PortalUsers
