import { useEffect, useMemo, useState } from 'react'
import LoginScreen from './components/LoginScreen'
import VerifyOtpScreen from './components/VerifyOtpScreen'
import OnboardingScreen from './components/OnboardingScreen'
import PortalScreen from './components/PortalScreen'
import PortalUsersScreen from './components/PortalUsersScreen'
import AdminScreen from './components/AdminScreen'
import './App.css'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000'

const ROUTES = {
  login: '/login',
  verify: '/verify',
  onboarding: '/onboarding',
  portal: '/portal',
  portalUsers: '/portal/users',
  admin: '/admin',
}

const AUTH_BLOCKED_ROUTES = new Set([ROUTES.login, ROUTES.verify])

const STEPS = [
  { label: 'Login', path: ROUTES.login },
  { label: 'OTP Verification', path: ROUTES.verify },
  { label: 'User Onboarding', path: ROUTES.onboarding },
]

const buildInitialOnboardingForm = () => ({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  jobTitle: '',
  permissions: {
    salesMarketing: false,
    projectManagement: false,
    accessOtherUsers: false,
    viewAdminPanel: false,
  },
})

const formatCountdown = (totalSeconds) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

const maskIdentifier = (value) => {
  if (!value) {
    return ''
  }
  const trimmed = value.trim()
  if (trimmed.includes('@')) {
    const [name, domain] = trimmed.split('@')
    if (!domain) {
      return trimmed
    }
    const visible = name.slice(0, 2)
    const hidden = '*'.repeat(Math.max(1, name.length - 2))
    return `${visible}${hidden}@${domain}`
  }
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length <= 4) {
    return trimmed
  }
  const hidden = '*'.repeat(Math.max(1, digits.length - 4))
  return `${digits.slice(0, 2)}${hidden}${digits.slice(-2)}`
}

function App() {
  const [route, setRoute] = useState(() => window.location.pathname)
  const [identifier, setIdentifier] = useState(() =>
    sessionStorage.getItem('otpIdentifier') || ''
  )
  const [otpTarget, setOtpTarget] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [expiresAt, setExpiresAt] = useState(null)
  const [countdown, setCountdown] = useState(0)
  const [otpRequestState, setOtpRequestState] = useState({
    loading: false,
    error: '',
    success: '',
  })
  const [otpVerifyState, setOtpVerifyState] = useState({
    loading: false,
    error: '',
    success: '',
  })
  const [otpVerified, setOtpVerified] = useState(false)
  const [userExists, setUserExists] = useState(null)
  const [accessToken, setAccessToken] = useState(
    () => sessionStorage.getItem('accessToken') || ''
  )
  const [refreshToken, setRefreshToken] = useState(
    () => sessionStorage.getItem('refreshToken') || ''
  )
  const [currentUserId, setCurrentUserId] = useState(() => {
    const stored = sessionStorage.getItem('userId')
    return stored ? Number(stored) : null
  })
  const [isAdmin, setIsAdmin] = useState(() => {
    const stored = sessionStorage.getItem('isAdmin')
    if (stored === 'true') {
      return true
    }
    if (stored === 'false') {
      return false
    }
    return null
  })
  const [onboardingForm, setOnboardingForm] = useState(
    buildInitialOnboardingForm
  )
  const [onboardingErrors, setOnboardingErrors] = useState({})
  const [onboardingState, setOnboardingState] = useState({
    loading: false,
    error: '',
    success: '',
  })
  const [portalUsers, setPortalUsers] = useState([])
  const [portalState, setPortalState] = useState({
    loading: false,
    error: '',
  })

  useEffect(() => {
    const allowedRoutes = new Set(Object.values(ROUTES))
    const path = window.location.pathname
    if (path === '/' || !allowedRoutes.has(path)) {
      window.history.replaceState({}, '', ROUTES.login)
      setRoute(ROUTES.login)
    }

    const handlePopState = () => {
      setRoute(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (identifier) {
      sessionStorage.setItem('otpIdentifier', identifier)
    } else {
      sessionStorage.removeItem('otpIdentifier')
    }
  }, [identifier])

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken)
    } else {
      sessionStorage.removeItem('accessToken')
    }
  }, [accessToken])

  useEffect(() => {
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken)
    } else {
      sessionStorage.removeItem('refreshToken')
    }
  }, [refreshToken])

  useEffect(() => {
    if (currentUserId) {
      sessionStorage.setItem('userId', String(currentUserId))
    } else {
      sessionStorage.removeItem('userId')
    }
  }, [currentUserId])

  useEffect(() => {
    if (isAdmin === null) {
      sessionStorage.removeItem('isAdmin')
    } else {
      sessionStorage.setItem('isAdmin', String(isAdmin))
    }
  }, [isAdmin])

  useEffect(() => {
    if (!expiresAt) {
      setCountdown(0)
      return
    }
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000))
      setCountdown(remaining)
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [expiresAt])

  useEffect(() => {
    if (
      (route.startsWith(ROUTES.portal) || route.startsWith(ROUTES.admin)) &&
      !accessToken &&
      !refreshToken
    ) {
      navigate(ROUTES.login)
    }
  }, [route, accessToken, refreshToken])

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      return
    }
    const lastAuthed =
      sessionStorage.getItem('lastAuthedRoute') || ROUTES.onboarding
    const blockedRoutes =
      lastAuthed.startsWith(ROUTES.portal) || lastAuthed.startsWith(ROUTES.admin)
      ? new Set([ROUTES.login, ROUTES.verify, ROUTES.onboarding])
      : AUTH_BLOCKED_ROUTES
    if (blockedRoutes.has(route)) {
      replaceRoute(lastAuthed)
    }
  }, [route, accessToken, refreshToken])

  useEffect(() => {
    if (
      route === ROUTES.onboarding ||
      route.startsWith(ROUTES.portal) ||
      route.startsWith(ROUTES.admin)
    ) {
      sessionStorage.setItem('lastAuthedRoute', route)
    }
  }, [route])

  useEffect(() => {
    if (route === ROUTES.login && otpRequestState.success) {
      setOtpRequestState((prev) => ({ ...prev, success: '' }))
    }
  }, [route, otpRequestState.success])

  const navigate = (path) => {
    if (window.location.pathname === path) {
      return
    }
    window.history.pushState({}, '', path)
    setRoute(path)
  }

  const replaceRoute = (path) => {
    if (window.location.pathname === path) {
      return
    }
    window.history.replaceState({}, '', path)
    setRoute(path)
  }

  const requestOtp = async (destination, { navigateToVerify = true } = {}) => {
    const trimmed = destination.trim()
    if (!trimmed) {
      setOtpRequestState({
        loading: false,
        error: 'Enter a mobile number or email to receive an OTP.',
        success: '',
      })
      return false
    }

    setOtpRequestState({ loading: true, error: '', success: '' })
    setOtpVerifyState({ loading: false, error: '', success: '' })
    setOtpVerified(false)
    setOtpCode('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, purpose: 'login' }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to send OTP')
      }
      setIdentifier(trimmed)
      setOtpTarget(trimmed)
      setOtpRequestState({
        loading: false,
        error: '',
        success: data.message || 'OTP sent successfully.',
      })
      if (data.expires_in_seconds) {
        setExpiresAt(Date.now() + data.expires_in_seconds * 1000)
      } else {
        setExpiresAt(null)
      }
      if (navigateToVerify) {
        navigate(ROUTES.verify)
      }
      return true
    } catch (error) {
      setOtpRequestState({
        loading: false,
        error: error.message || 'Unable to send OTP right now.',
        success: '',
      })
      return false
    }
  }

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value)
    if (otpRequestState.error) {
      setOtpRequestState((prev) => ({ ...prev, error: '' }))
    }
  }

  const handleOtpCodeChange = (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 6)
    setOtpCode(digits)
    if (otpVerifyState.error) {
      setOtpVerifyState((prev) => ({ ...prev, error: '' }))
    }
  }

  const handleRequestOtp = async (event) => {
    event.preventDefault()
    await requestOtp(identifier, { navigateToVerify: true })
  }

  const handleResendOtp = async () => {
    const destination = otpTarget || identifier
    await requestOtp(destination, { navigateToVerify: false })
  }

  const handleVerifyOtp = async (event) => {
    event.preventDefault()
    const trimmed = (otpTarget || identifier).trim()
    const code = otpCode.replace(/\D/g, '').slice(0, 6)

    if (!trimmed) {
      setOtpVerifyState({
        loading: false,
        error: 'Go back and enter your mobile number or email first.',
        success: '',
      })
      return
    }

    if (code.length !== 6) {
      setOtpVerifyState({
        loading: false,
        error: 'Enter the 6-digit OTP code from your message.',
        success: '',
      })
      return
    }

    setOtpVerifyState({ loading: true, error: '', success: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: trimmed, purpose: 'login', code }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.detail || 'Invalid or expired OTP')
      }
      setOtpVerifyState({
        loading: false,
        error: '',
        success: data.message || 'OTP verified.',
      })
      setOtpVerified(true)
      setUserExists(data.user_exists ?? null)
      const adminStatus =
        data.role === 'admin' || data.is_admin === true
      setIsAdmin(adminStatus)
      if (data.access_token) {
        setAccessToken(data.access_token)
      }
      if (data.refresh_token) {
        setRefreshToken(data.refresh_token)
      }
      if (data.user_id) {
        setCurrentUserId(data.user_id)
      }
      setExpiresAt(null)
      if (adminStatus) {
        sessionStorage.setItem('lastAuthedRoute', ROUTES.admin)
        navigate(ROUTES.admin)
        return
      }
      const isOnboarded = data.user_onboarded === true
      const nextRoute = isOnboarded ? ROUTES.portal : ROUTES.onboarding
      sessionStorage.setItem('lastAuthedRoute', nextRoute)
      navigate(nextRoute)
    } catch (error) {
      setOtpVerifyState({
        loading: false,
        error: error.message || 'Unable to verify OTP right now.',
        success: '',
      })
    }
  }

  const updateOnboardingField = (field, value) => {
    setOnboardingForm((prev) => ({ ...prev, [field]: value }))
    if (onboardingErrors[field]) {
      setOnboardingErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleOnboardingFieldChange = (field, value) => {
    if (field === 'phoneNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 10)
      updateOnboardingField(field, digits)
      return
    }
    updateOnboardingField(field, value)
  }

  const updatePermission = (field) => {
    setOnboardingForm((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: !prev.permissions[field],
      },
    }))
    if (onboardingErrors.permissions) {
      setOnboardingErrors((prev) => ({ ...prev, permissions: '' }))
    }
  }

  const validateOnboarding = () => {
    const errors = {}
    if (!onboardingForm.firstName.trim()) {
      errors.firstName = 'First name is required.'
    }
    const phoneDigits = onboardingForm.phoneNumber.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      errors.phoneNumber = 'Enter a valid 10-digit phone number.'
    }
    if (!onboardingForm.address.trim()) {
      errors.address = 'Address is required.'
    }
    if (!Object.values(onboardingForm.permissions).some(Boolean)) {
      errors.permissions = 'Select at least one permission.'
    }
    return { errors, phoneDigits }
  }

  const clearAuthState = () => {
    setAccessToken('')
    setRefreshToken('')
    setCurrentUserId(null)
    setIsAdmin(null)
    sessionStorage.removeItem('lastAuthedRoute')
  }

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      return ''
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to refresh session.')
      }
      if (data.access_token) {
        setAccessToken(data.access_token)
      }
      if (data.refresh_token) {
        setRefreshToken(data.refresh_token)
      }
      return data.access_token || ''
    } catch (error) {
      clearAuthState()
      navigate(ROUTES.login)
      return ''
    }
  }

  const authorizedFetch = async (url, options = {}) => {
    let token = accessToken
    if (!token) {
      token = await refreshAccessToken()
    }
    if (!token) {
      return null
    }
    const initialHeaders = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    }
    let response = await fetch(url, { ...options, headers: initialHeaders })
    if (response.status !== 401) {
      return response
    }
    const refreshed = await refreshAccessToken()
    if (!refreshed) {
      return response
    }
    const retryHeaders = {
      ...(options.headers || {}),
      Authorization: `Bearer ${refreshed}`,
    }
    response = await fetch(url, { ...options, headers: retryHeaders })
    return response
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    const { errors, phoneDigits } = validateOnboarding()
    setOnboardingErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }

    if (!accessToken && !refreshToken) {
      setOnboardingState({
        loading: false,
        error: 'Your session expired. Please log in again.',
        success: '',
      })
      navigate(ROUTES.login)
      return
    }

    setOnboardingState({ loading: true, error: '', success: '' })
    const payload = {
      first_name: onboardingForm.firstName.trim(),
      last_name: onboardingForm.lastName.trim() || null,
      phone_number: phoneDigits,
      address: onboardingForm.address.trim(),
      job_title: onboardingForm.jobTitle.trim() || null,
      permissions: {
        sales_marketing: onboardingForm.permissions.salesMarketing,
        project_management: onboardingForm.permissions.projectManagement,
        access_other_users: onboardingForm.permissions.accessOtherUsers,
        view_admin_panel: onboardingForm.permissions.viewAdminPanel,
      },
    }

    try {
      const response = await authorizedFetch(`${API_BASE_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response || response.status === 401) {
        clearAuthState()
        navigate(ROUTES.login)
        throw new Error('Your session expired. Please log in again.')
      }
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const detail =
          Array.isArray(data.detail) && data.detail.length > 0
            ? data.detail[0].msg
            : data.detail
        throw new Error(detail || 'Unable to create user account.')
      }
      setOnboardingState({
        loading: false,
        error: '',
        success: 'User account created successfully.',
      })
      setOnboardingForm(buildInitialOnboardingForm())
      setOnboardingErrors({})
      navigate(ROUTES.portal)
    } catch (error) {
      setOnboardingState({
        loading: false,
        error: error.message || 'Unable to create user account.',
        success: '',
      })
    }
  }

  const loadPortalUsers = async () => {
    if (!accessToken && !refreshToken) {
      return
    }
    setPortalState({ loading: true, error: '' })
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/api/users`)
      if (!response || response.status === 401) {
        clearAuthState()
        navigate(ROUTES.login)
        return
      }
      const data = await response.json().catch(() => [])
      if (!response.ok) {
        throw new Error(data.detail || 'Unable to load users.')
      }
      setPortalUsers(Array.isArray(data) ? data : [])
      setPortalState({ loading: false, error: '' })
    } catch (error) {
      setPortalState({
        loading: false,
        error: error.message || 'Unable to load users.',
      })
    }
  }

  const handleUpdateUser = async (userId, payload) => {
    if (!accessToken && !refreshToken) {
      throw new Error('Your session expired. Please log in again.')
    }
    try {
      const response = await authorizedFetch(
        `${API_BASE_URL}/api/users/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!response || response.status === 401) {
        clearAuthState()
        navigate(ROUTES.login)
        throw new Error('Your session expired. Please log in again.')
      }
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        const detail =
          Array.isArray(data.detail) && data.detail.length > 0
            ? data.detail[0].msg
            : data.detail
        throw new Error(detail || 'Unable to update user.')
      }
      setPortalUsers((prev) =>
        prev.map((user) => (user.id === data.id ? data : user))
      )
      return data
    } catch (error) {
      throw error
    }
  }

  const handleLogout = async () => {
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
      } catch (error) {
        // Ignore logout failures and clear locally.
      }
    }
    clearAuthState()
    setOtpRequestState({ loading: false, error: '', success: '' })
    setOtpVerifyState({ loading: false, error: '', success: '' })
    setOtpTarget('')
    setOtpCode('')
    setOtpVerified(false)
    setUserExists(null)
    setExpiresAt(null)
    setPortalUsers([])
    navigate(ROUTES.login)
  }

  useEffect(() => {
    if (route.startsWith(ROUTES.portal) || route.startsWith(ROUTES.admin)) {
      loadPortalUsers()
    }
  }, [route, accessToken, refreshToken])

  useEffect(() => {
    if (route.startsWith(ROUTES.admin) && isAdmin === false) {
      navigate(ROUTES.portal)
    }
  }, [route, isAdmin])


  const isAuthedView =
    route.startsWith(ROUTES.portal) || route.startsWith(ROUTES.admin)
  const isAdminView = route.startsWith(ROUTES.admin)
  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((step) => step.path === route)
  )
  const otpDestination = otpTarget || identifier
  const maskedDestination = useMemo(
    () => maskIdentifier(otpDestination),
    [otpDestination]
  )
  const currentUser = useMemo(
    () => portalUsers.find((user) => user.id === currentUserId) || null,
    [portalUsers, currentUserId]
  )
  const otpTimerText = otpDestination
    ? expiresAt
      ? countdown > 0
        ? `OTP expires in ${formatCountdown(countdown)}`
        : 'OTP expired. Request a new one.'
      : 'Request a new OTP if you need another code.'
    : ''

  return (
    <div
      className={`app-shell ${isAuthedView ? 'app-shell--portal' : ''} ${isAdminView ? 'app-shell--admin' : ''}`}
    >
      <div className="app-orb app-orb--one" />
      <div className="app-orb app-orb--two" />
      <main
        className={`auth-layout ${isAuthedView ? 'auth-layout--portal' : ''}`}
      >
        {isAuthedView ? (
          route === ROUTES.portalUsers ? (
            <PortalUsersScreen
              users={portalUsers}
              state={portalState}
              onBack={() => navigate(ROUTES.portal)}
              onUpdateUser={handleUpdateUser}
            />
          ) : route === ROUTES.admin ? (
            <AdminScreen
              users={portalUsers}
              state={portalState}
              currentUser={currentUser}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
            />
          ) : (
            <PortalScreen
              currentUser={currentUser}
              onOpenUsers={() => navigate(ROUTES.portalUsers)}
              onLogout={handleLogout}
            />
          )
        ) : (
          <div
            className={`auth-card ${route === ROUTES.onboarding ? 'auth-card--wide' : ''} ${route === ROUTES.login ? 'auth-card--tall' : ''}`}
          >
            {route === ROUTES.login && (
              <LoginScreen
                identifier={identifier}
                onIdentifierChange={handleIdentifierChange}
                otpRequestState={otpRequestState}
                onSubmit={handleRequestOtp}
              />
            )}

            {route === ROUTES.verify && (
              <VerifyOtpScreen
                otpDestination={otpDestination}
                maskedDestination={maskedDestination}
                otpCode={otpCode}
                onOtpCodeChange={handleOtpCodeChange}
                otpVerifyState={otpVerifyState}
                onSubmit={handleVerifyOtp}
                otpTimerText={otpTimerText}
                onResend={handleResendOtp}
                isResending={otpRequestState.loading}
                otpVerified={otpVerified}
                userExists={userExists}
                onContinueToOnboarding={() => navigate(ROUTES.onboarding)}
                onGoToLogin={() => navigate(ROUTES.login)}
              />
            )}

            {route === ROUTES.onboarding && (
              <OnboardingScreen
                form={onboardingForm}
                errors={onboardingErrors}
                state={onboardingState}
                onFieldChange={handleOnboardingFieldChange}
                onPermissionToggle={updatePermission}
                onSubmit={handleCreateUser}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
