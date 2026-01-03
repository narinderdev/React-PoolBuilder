import PortalUsers from './PortalUsers'

const PortalUsersScreen = ({ users, state, onBack, onUpdateUser }) => (
  <section className="portal-shell">
    <header className="portal-header">
      <div>
        <p className="portal-kicker">Users</p>
        <h2 className="portal-title">User directory</h2>
        <p className="portal-subtitle">
          Review every user profile and permission from one place.
        </p>
      </div>
      <button
        type="button"
        className="dashboard-button dashboard-button--ghost"
        onClick={onBack}
      >
        Back to Portal
      </button>
    </header>

    <PortalUsers users={users} state={state} onUpdateUser={onUpdateUser} />
  </section>
)

export default PortalUsersScreen
