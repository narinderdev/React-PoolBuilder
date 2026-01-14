const LoginScreen = ({
  identifier,
  onIdentifierChange,
  onIdentifierClear,
  isPhoneIdentifier,
  countryCode,
  countries,
  onCountryChange,
  otpRequestState,
  onSubmit,
}) => (
  <section className="auth-pane">
    <header className="pane-header">
      <h2 className="pane-title">Welcome Back</h2>
      <p className="pane-subtitle">Log in to manage your account</p>
    </header>

    <form className="auth-form" onSubmit={onSubmit}>
      <div className="form-field stagger">
        <label className="auth-label" htmlFor="identifier">
          Enter mobile number or email
        </label>
        {isPhoneIdentifier ? (
          <div className="auth-phone-input">
            <div className="auth-phone-prefix">
              <select
                className="auth-phone-select"
                value={countryCode}
                onChange={onCountryChange}
                aria-label="Country code"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.dialCode}
                  </option>
                ))}
              </select>
            </div>
            <input
              id="identifier"
              name="identifier"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter your mobile number"
              autoComplete="tel"
              value={identifier}
              onChange={onIdentifierChange}
              className="auth-input auth-input--phone"
            />
            {identifier && (
              <button
                type="button"
                className="auth-phone-clear"
                onClick={onIdentifierClear}
                aria-label="Clear phone number"
              >
                x
              </button>
            )}
          </div>
        ) : (
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="Enter your mobile number or email"
            autoComplete="username"
            value={identifier}
            onChange={onIdentifierChange}
            className="auth-input"
          />
        )}
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
        {!otpRequestState.loading && (
          <span className="button-arrow" aria-hidden="true">
            &rarr;
          </span>
        )}
      </button>
    </form>
  </section>
)

export default LoginScreen
