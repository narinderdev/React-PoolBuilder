import { useMemo, useState } from 'react'
import PortalUsers from './PortalUsers'

const NAV_ITEMS = [
  { label: 'Leads', icon: '/lead.png' },
  { label: 'Contractors', icon: '/contractors.png' },
  { label: 'Sub Contractors', icon: '/subcontractors.png' },
  { label: 'Payments', icon: '/payment.png' },
  { label: 'Settings', icon: '/setting.png' },
]

const AdminScreen = ({ users, state, currentUser, onUpdateUser, onLogout }) => {
  const [activeItem, setActiveItem] = useState('Leads')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const leads = useMemo(
    () =>
      users.filter(
        (user) => user.onboarded_at && user.id !== currentUser?.id
      ),
    [users, currentUser]
  )
  const initials = useMemo(() => {
    const first = currentUser?.first_name?.trim() || ''
    const last = currentUser?.last_name?.trim() || ''
    const firstInitial = first ? first[0] : ''
    const lastInitial = last ? last[0] : ''
    const combined = `${firstInitial}${lastInitial}`.toUpperCase()
    return combined || 'AD'
  }, [currentUser])
  const handleRequestLogout = () => setShowLogoutConfirm(true)
  const handleCancelLogout = () => setShowLogoutConfirm(false)
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false)
    onLogout()
  }

  return (
    <section className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-logo" aria-hidden="true">
          <img src="/logo_admin.png" alt="" />
        </div>
        <div className="admin-topbar-brand">
          <h1>Pool Builder Portal</h1>
          <p>AI-Powered Pool Design &amp; Construction Management</p>
        </div>
        <div className="admin-topbar-actions">
          <button
            type="button"
            className="admin-icon-button"
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="admin-avatar-button"
            aria-label="Account menu"
          >
            <span>{initials}</span>
          </button>
        </div>
      </header>

      <div className="admin-shell">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`admin-nav-item ${activeItem === item.label ? 'active' : ''}`}
                onClick={() => setActiveItem(item.label)}
              >
                <span className="admin-nav-icon">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        <button
          type="button"
          className="admin-logout"
          onClick={handleRequestLogout}
        >
          <span className="admin-nav-icon">
            <img src="/logout.png" alt="" aria-hidden="true" />
          </span>
          <span>Log Out</span>
        </button>
      </aside>

        <div className="admin-main">
          <header className="admin-header">
          </header>

          {activeItem === 'Leads' ? (
            <PortalUsers
              users={leads}
              state={state}
              onUpdateUser={onUpdateUser}
            />
          ) : (
            <div className="portal-card">
              <p className="portal-empty">No data available yet.</p>
            </div>
          )}
        </div>
      </div>

      {showLogoutConfirm && (
        <>
          <button
            type="button"
            className="modal-backdrop"
            onClick={handleCancelLogout}
            aria-label="Close logout confirmation"
          />
          <div className="modal-card" role="dialog" aria-modal="true">
            <h3>Log out of Pool Builder?</h3>
            <p>You can log back in anytime to continue your work.</p>
            <div className="modal-actions">
              <button
                type="button"
                className="dashboard-button dashboard-button--ghost"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                type="button"
                className="dashboard-button"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default AdminScreen
