import { useEffect, useMemo, useRef, useState } from 'react'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

const COUNTRY_OPTIONS = (() => {
  const seen = new Set()
  const options = []
  getCountries().forEach((country) => {
    const code = `+${getCountryCallingCode(country)}`
    if (!seen.has(code)) {
      seen.add(code)
      options.push({ country, code })
    }
  })
  return options.sort(
    (a, b) => Number(a.code.replace('+', '')) - Number(b.code.replace('+', ''))
  )
})()

const OnboardingScreen = ({
  form,
  errors,
  state,
  otpState,
  onFieldChange,
  onPermissionToggle,
  onRequestOtp,
  onVerifyOtp,
  onSubmit,
}) => {
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const selectedOption = useMemo(
    () =>
      COUNTRY_OPTIONS.find((option) => option.code === form.countryCode) ||
      COUNTRY_OPTIONS[0],
    [form.countryCode]
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsCountryMenuOpen(false)
      }
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCountryMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const SelectedFlag =
    selectedOption?.country && flags[selectedOption.country]

  return (
    <section className="auth-pane">
      <form
        className="onboarding-form onboarding-form--flat"
        onSubmit={onSubmit}
      >
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
              onChange={(event) =>
                onFieldChange('firstName', event.target.value)
              }
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
            Phone Number (Optional)
          </label>
          <div className="phone-row">
            <div
              className={`country-picker ${
                isCountryMenuOpen ? 'is-open' : ''
              }`}
              ref={menuRef}
            >
              <button
                type="button"
                className="country-picker-toggle"
                onClick={() => setIsCountryMenuOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isCountryMenuOpen}
                aria-label="Select country code"
                disabled={otpState.verified}
              >
                {SelectedFlag && (
                  <SelectedFlag
                    title={selectedOption?.country}
                    className="country-flag"
                  />
                )}
                <span className="country-code">{selectedOption?.code}</span>
                <span className="country-picker-caret" aria-hidden="true" />
              </button>
              {isCountryMenuOpen && (
                <div className="country-picker-menu" role="listbox">
                  {COUNTRY_OPTIONS.map((option) => {
                    const OptionFlag = flags[option.country]
                    const isSelected = option.code === selectedOption?.code
                    return (
                      <button
                        type="button"
                        key={option.code}
                        className={`country-picker-option ${
                          isSelected ? 'is-selected' : ''
                        }`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          onFieldChange('countryCode', option.code)
                          setIsCountryMenuOpen(false)
                        }}
                      >
                        {OptionFlag && (
                          <OptionFlag
                            title={option.country}
                            className="country-flag"
                          />
                        )}
                        <span className="country-code">{option.code}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="input-with-icon">
              <img src="/phone.png" alt="" aria-hidden="true" />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                inputMode="numeric"
                placeholder="Enter 10-digit number"
                className={`auth-input ${
                  errors.phoneNumber ? 'input-error' : ''
                }`}
                value={form.phoneNumber}
                onChange={(event) =>
                  onFieldChange('phoneNumber', event.target.value)
                }
                disabled={otpState.verified}
              />
            </div>
            <button
              type="button"
              className="otp-button"
              onClick={onRequestOtp}
              disabled={otpState.loading || otpState.sent || otpState.verified}
            >
              {otpState.loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
          {errors.phoneNumber && (
            <p className="field-error">{errors.phoneNumber}</p>
          )}
          {otpState.error && !(otpState.sent || otpState.verified) && (
            <p className="field-error">{otpState.error}</p>
          )}
          {otpState.sentMessage && (
            <p className="form-message success" role="status">
              {otpState.sentMessage}
            </p>
          )}
        </div>

        {(otpState.sent || otpState.verified) && (
          <div className="form-field">
            <label className="auth-label" htmlFor="otpCode">
              OTP Code
            </label>
            <div className="otp-verify-row">
              <input
                id="otpCode"
                name="otpCode"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                className={`auth-input ${errors.otpCode ? 'input-error' : ''}`}
                value={form.otpCode}
                onChange={(event) => onFieldChange('otpCode', event.target.value)}
                disabled={otpState.verified}
              />
              <button
                type="button"
                className="otp-button"
                onClick={onVerifyOtp}
                disabled={
                  !otpState.sent ||
                  otpState.verifying ||
                  otpState.verified ||
                  form.otpCode.length !== 6
                }
              >
                {otpState.verified
                  ? 'Verified'
                  : otpState.verifying
                    ? 'Verifying...'
                    : 'Verify OTP'}
              </button>
            </div>
            {otpState.error && (otpState.sent || otpState.verified) && (
              <p className="field-error">{otpState.error}</p>
            )}
            {otpState.success && (
              <p className="form-message success" role="status">
                {otpState.success}
              </p>
            )}
            {errors.otpCode && <p className="field-error">{errors.otpCode}</p>}
          </div>
        )}

        <div className="form-field">
          <label className="auth-label" htmlFor="address">
            Address
          </label>
          <div className="input-with-icon">
            <img src="/address.png" alt="" aria-hidden="true" />
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              className={`auth-input ${errors.address ? 'input-error' : ''}`}
              value={form.address}
              onChange={(event) => onFieldChange('address', event.target.value)}
            />
          </div>
          {errors.address && <p className="field-error">{errors.address}</p>}
        </div>

        <div className="form-field">
          <label className="auth-label" htmlFor="jobTitle">
            Job Title (Optional)
          </label>
          <div className="input-with-icon">
            <img src="/job.png" alt="" aria-hidden="true" />
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
          Phone OTP is optional. If you enter a phone number, add the 6-digit OTP
          code to continue.
        </p>
      </form>
    </section>
  )
}

export default OnboardingScreen
