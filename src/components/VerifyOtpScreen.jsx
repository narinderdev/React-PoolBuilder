const VerifyOtpScreen = ({
  otpDestination,
  maskedDestination,
  otpCode,
  onOtpCodeChange,
  otpVerifyState,
  onSubmit,
  otpTimerText,
  onResend,
  isResending,
  otpVerified,
  userExists,
  onContinueToOnboarding,
  onGoToLogin,
}) => (
  <section className="auth-pane">
    <header className="pane-header">
      <p className="pane-kicker">OTP verification</p>
      <h2 className="pane-title">Enter the code we sent</h2>
      <p className="pane-subtitle">
        {otpDestination
          ? `Sent to ${maskedDestination || otpDestination}`
          : 'Enter your contact details first to receive an OTP.'}
      </p>
    </header>

    {otpDestination ? (
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="form-field stagger">
          <label className="auth-label" htmlFor="otpCode">
            Verification code
          </label>
          <input
            id="otpCode"
            name="otpCode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="------"
            value={otpCode}
            onChange={onOtpCodeChange}
            className="auth-input auth-input--otp"
          />
        </div>

        {otpVerifyState.error && (
          <p className="form-message error" role="alert">
            {otpVerifyState.error}
          </p>
        )}
        {otpVerifyState.success && (
          <p className="form-message success" role="status">
            {otpVerifyState.success}
          </p>
        )}

        <button
          className="auth-button stagger"
          type="submit"
          disabled={otpVerifyState.loading}
        >
          {otpVerifyState.loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    ) : (
      <div className="empty-state">
        <p>We need a phone number or email to verify your OTP.</p>
        <button type="button" className="auth-button" onClick={onGoToLogin}>
          Go to Login
        </button>
      </div>
    )}

    {otpDestination && (
      <>
        <div className="otp-meta">
          <span className="otp-timer">{otpTimerText}</span>
          <button
            className="link-button"
            type="button"
            onClick={onResend}
            disabled={isResending}
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      </>
    )}

    {otpVerified && (
      <div className="otp-success">
        <div>
          <h3>{userExists ? 'Welcome back!' : 'OTP verified'}</h3>
          <p>
            {userExists
              ? 'You can continue to your workspace.'
              : 'Continue to onboarding to finish your setup.'}
          </p>
        </div>
        <button
          type="button"
          className="auth-button"
          onClick={onContinueToOnboarding}
        >
          {userExists ? 'Continue' : 'Continue to Onboarding'}
        </button>
      </div>
    )}
  </section>
)

export default VerifyOtpScreen
