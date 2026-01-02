import { useState } from 'react'

const PortalScreen = ({ onOpenUsers, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleToggleMenu = () => setShowMenu((prev) => !prev)
  const handleOpenUsers = () => {
    onOpenUsers()
    setShowMenu(false)
  }
  const handleRequestLogout = () => {
    setShowLogoutConfirm(true)
    setShowMenu(false)
  }
  const handleCancelLogout = () => setShowLogoutConfirm(false)
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false)
    onLogout()
  }

  return (
    <section className="portal-shell">
      <header className="portal-header">
        <div>
          <p className="portal-kicker">Homeowner Portal</p>
          <h2 className="portal-title">Project command center</h2>
          <p className="portal-subtitle">
            Track your pool build, review upgrades, and stay on schedule.
          </p>
        </div>
        <div className="profile-menu">
          <button
            type="button"
            className="avatar-button"
            onClick={handleToggleMenu}
          >
            <span className="avatar-initials">PB</span>
          </button>
          {showMenu && (
            <div className="menu-card">
              <button type="button" className="menu-item" onClick={handleOpenUsers}>
                Users
              </button>
              <button
                type="button"
                className="menu-item"
                onClick={handleRequestLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="portal-dashboard">
        <div className="portal-main">
          <section className="dashboard-card dashboard-card--welcome">
            <div className="dashboard-welcome">
              <div>
                <p className="dashboard-kicker">Welcome back, John</p>
                <h3 className="dashboard-title">Your backyard vision is coming alive</h3>
                <p className="dashboard-subtitle">
                  Your project is currently 65% complete. Next phase starts in 14
                  days.
                </p>
              </div>
              <div className="dashboard-chip">65% Complete</div>
            </div>
            <div className="progress-row">
              <span>Project progress</span>
              <span>65%</span>
            </div>
            <div className="progress-track">
              <span className="progress-fill" />
            </div>
          </section>

          <section className="dashboard-card">
            <div className="card-header">
              <div>
                <p className="card-kicker">On-demand concierge</p>
                <h3 className="card-title">Project concierge</h3>
                <p className="card-subtitle">
                  Get a personalized video update on your construction phase.
                </p>
              </div>
              <button className="dashboard-button" type="button">
                Start Concierge Zoom Call
              </button>
            </div>
            <div className="dashboard-metrics">
              <div className="metric-card">
                <p>Current Phase</p>
                <strong>Gunite &amp; Steel Installation</strong>
              </div>
              <div className="metric-card">
                <p>Crew On Site</p>
                <strong>5 Team Members</strong>
              </div>
              <div className="metric-card">
                <p>Materials Used</p>
                <strong>Shotcrete, Steel Rebar</strong>
              </div>
              <div className="metric-card">
                <p>Timeline</p>
                <strong>Dec 10 - Dec 27 (17 days)</strong>
              </div>
            </div>
            <div className="dashboard-list">
              <div className="dashboard-list-item">
                <span className="list-dot" />
                <div>
                  <h4>Available upgrade options this phase</h4>
                  <p>Add a travertine deck upgrade (25% off)</p>
                </div>
                <span className="list-chip">$2,650</span>
              </div>
              <div className="dashboard-list-item">
                <span className="list-dot" />
                <div>
                  <h4>Exterior lighting package</h4>
                  <p>4 LED uplights + accent lighting controls</p>
                </div>
                <span className="list-chip">$1,120</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card">
            <div className="card-header">
              <div>
                <p className="card-kicker">Interactive 3D</p>
                <h3 className="card-title">Pool rendering</h3>
                <p className="card-subtitle">
                  Tap on components to review details and customization options.
                </p>
              </div>
              <button className="dashboard-button dashboard-button--ghost" type="button">
                Preview Changes
              </button>
            </div>
            <div className="render-preview">
              <div className="render-pill">Decking Material</div>
              <div className="render-pill render-pill--mid">Lighting Layout</div>
              <div className="render-pill render-pill--right">Equipment Package</div>
            </div>
            <button className="dashboard-button dashboard-button--wide" type="button">
              Schedule a Designer Zoom Call
            </button>
          </section>

          <section className="dashboard-card">
            <div className="card-header">
              <div>
                <p className="card-kicker">Construction calendar</p>
                <h3 className="card-title">Interactive schedule</h3>
                <p className="card-subtitle">
                  Track milestones and upcoming inspections in one view.
                </p>
              </div>
              <button className="dashboard-button dashboard-button--ghost" type="button">
                View Full Calendar
              </button>
            </div>
            <div className="calendar-card">
              <div className="calendar-row">
                <div>
                  <p className="calendar-label">Current Phase</p>
                  <strong>Gunite &amp; Steel</strong>
                  <p className="calendar-note">December 10 - December 27, 2025</p>
                </div>
                <div className="calendar-next">
                  <p className="calendar-label">Next Phase</p>
                  <strong>Plumbing &amp; Electrical</strong>
                  <p className="calendar-note">Starts December 28, 2025</p>
                </div>
              </div>
              <div className="calendar-grid">
                <span className="calendar-day active">10</span>
                <span className="calendar-day active">11</span>
                <span className="calendar-day active">12</span>
                <span className="calendar-day active">13</span>
                <span className="calendar-day">14</span>
                <span className="calendar-day">15</span>
                <span className="calendar-day">16</span>
              </div>
              <div className="calendar-alert">
                Concrete crew scheduled. Ensure access to backyard is clear for pump
                truck.
              </div>
            </div>
          </section>
        </div>

        <aside className="portal-side">
          <section className="dashboard-card dashboard-card--compact">
            <h3 className="card-title">Upgrade opportunities</h3>
            <p className="card-subtitle">
              Add premium touches to your pool build.
            </p>
            <div className="insight-list">
              <div className="insight-item">
                <div>
                  <strong>Sun shelf loungers</strong>
                  <p>Add built-in loungers for resort lounging.</p>
                </div>
                <span className="list-chip">$1,200</span>
              </div>
              <div className="insight-item">
                <div>
                  <strong>Solar cover</strong>
                  <p>Reduces heat loss and chemical usage.</p>
                </div>
                <span className="list-chip">$850</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card dashboard-card--compact">
            <h3 className="card-title">Water features</h3>
            <p className="card-subtitle">
              Elevate the experience with motion and sound.
            </p>
            <div className="insight-list">
              <div className="insight-item">
                <div>
                  <strong>Sheer descents</strong>
                  <p>Includes two waterfalls with LED accents.</p>
                </div>
                <span className="list-chip">$1,500</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card dashboard-card--compact">
            <h3 className="card-title">Additional services</h3>
            <p className="card-subtitle">Keep everything running smoothly.</p>
            <div className="insight-list">
              <div className="insight-item">
                <div>
                  <strong>Landscape package</strong>
                  <p>New plantings + softscape enhancements.</p>
                </div>
                <span className="list-chip">$950</span>
              </div>
              <div className="insight-item">
                <div>
                  <strong>Safety cover</strong>
                  <p>Automatic cover that supports weight.</p>
                </div>
                <span className="list-chip">$1,800</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card dashboard-card--compact">
            <h3 className="card-title">Cost saving ideas</h3>
            <p className="card-subtitle">Keep the project on budget.</p>
            <div className="insight-list">
              <div className="insight-item">
                <div>
                  <strong>LED lighting</strong>
                  <p>Swapping to LEDs saves 75% on energy.</p>
                </div>
                <span className="list-chip">$620</span>
              </div>
              <div className="insight-item">
                <div>
                  <strong>Saltwater system</strong>
                  <p>Lower long-term chemical costs.</p>
                </div>
                <span className="list-chip">$780</span>
              </div>
            </div>
          </section>
        </aside>
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
            <p>You can log back in anytime to continue your project.</p>
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

export default PortalScreen
