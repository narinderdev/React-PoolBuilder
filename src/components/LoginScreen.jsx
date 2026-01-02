const LoginScreen = ({ identifier, onIdentifierChange, otpRequestState, onSubmit }) => (
  <section className="auth-pane">
    <header className="pane-header">
      <p className="pane-kicker">Welcome back</p>
      <h2 className="pane-title">Log in to manage your account</h2>
      <p className="pane-subtitle">
        Enter your mobile number or email to receive a one-time password.
      </p>
    </header>

    <form className="auth-form" onSubmit={onSubmit}>
      <div className="form-field stagger">
        <label className="auth-label" htmlFor="identifier">
          Enter mobile number or email
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="you@example.com or +1 555 000 0000"
          autoComplete="username"
          value={identifier}
          onChange={onIdentifierChange}
          className="auth-input"
        />
      </div>

      {otpRequestState.error && (
        <p className="form-message error" role="alert">
          {otpRequestState.error}
        </p>
      )}
      {otpRequestState.success && (
        <p className="form-message success" role="status">
          {otpRequestState.success}
        </p>
      )}

      <button
        className="auth-button stagger"
        type="submit"
        disabled={otpRequestState.loading}
      >
        {otpRequestState.loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  </section>
)

export default LoginScreen
