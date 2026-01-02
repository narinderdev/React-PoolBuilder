const OnboardingScreen = ({
  form,
  errors,
  state,
  onFieldChange,
  onPermissionToggle,
  onSubmit,
}) => (
  <section className="auth-pane">
    <header className="pane-header pane-header--left">
      <p className="pane-kicker">User onboarding</p>
      <h2 className="pane-title">Create new user accounts</h2>
      <p className="pane-subtitle">
        Create new user accounts and manage their access permissions.
      </p>
    </header>

    <form className="onboarding-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <div className="form-field">
          <label className="auth-label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Jane"
            className={`auth-input ${errors.firstName ? 'input-error' : ''}`}
            value={form.firstName}
            onChange={(event) => onFieldChange('firstName', event.target.value)}
          />
          {errors.firstName && (
            <p className="field-error">{errors.firstName}</p>
          )}
        </div>
        <div className="form-field">
          <label className="auth-label" htmlFor="lastName">
            Last Name (Optional)
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            className="auth-input"
            value={form.lastName}
            onChange={(event) => onFieldChange('lastName', event.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="auth-label" htmlFor="phoneNumber">
          Phone Number
        </label>
        <div className="phone-row">
          <div className="phone-code">+1</div>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            inputMode="numeric"
            placeholder="Enter 10-digit number"
            className={`auth-input ${errors.phoneNumber ? 'input-error' : ''}`}
            value={form.phoneNumber}
            onChange={(event) => onFieldChange('phoneNumber', event.target.value)}
          />
        </div>
        {errors.phoneNumber && (
          <p className="field-error">{errors.phoneNumber}</p>
        )}
      </div>

      <div className="form-field">
        <label className="auth-label" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Enter your address"
          className={`auth-input ${errors.address ? 'input-error' : ''}`}
          value={form.address}
          onChange={(event) => onFieldChange('address', event.target.value)}
        />
        {errors.address && <p className="field-error">{errors.address}</p>}
      </div>

      <div className="form-field">
        <label className="auth-label" htmlFor="jobTitle">
          Job Title (Optional)
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          placeholder="Enter job title"
          className="auth-input"
          value={form.jobTitle}
          onChange={(event) => onFieldChange('jobTitle', event.target.value)}
        />
      </div>

      <div className="permissions-panel">
        <h3>User Access & Permissions</h3>
        <div className="toggle-grid">
          <label className="toggle-row">
            <span>Sales & Marketing</span>
            <input
              type="checkbox"
              name="salesMarketing"
              checked={form.permissions.salesMarketing}
              onChange={() => onPermissionToggle('salesMarketing')}
            />
          </label>
          <label className="toggle-row">
            <span>Project Management</span>
            <input
              type="checkbox"
              name="projectManagement"
              checked={form.permissions.projectManagement}
              onChange={() => onPermissionToggle('projectManagement')}
            />
          </label>
          <label className="toggle-row">
            <span>Access to Other Users</span>
            <input
              type="checkbox"
              name="accessOtherUsers"
              checked={form.permissions.accessOtherUsers}
              onChange={() => onPermissionToggle('accessOtherUsers')}
            />
          </label>
          <label className="toggle-row">
            <span>View Information in Admin Panel</span>
            <input
              type="checkbox"
              name="viewAdminPanel"
              checked={form.permissions.viewAdminPanel}
              onChange={() => onPermissionToggle('viewAdminPanel')}
            />
          </label>
        </div>
        {errors.permissions && (
          <p className="field-error">{errors.permissions}</p>
        )}
      </div>

      {state.error && (
        <p className="form-message error" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="form-message success" role="status">
          {state.success}
        </p>
      )}

      <button
        className="auth-button auth-button--full"
        type="submit"
        disabled={state.loading}
      >
        {state.loading ? 'Saving...' : 'Create User Account'}
      </button>
      <p className="helper-text">
        Phone OTP is not required right now. Enter a 10-digit number and select
        at least one permission.
      </p>
    </form>
  </section>
)

export default OnboardingScreen
