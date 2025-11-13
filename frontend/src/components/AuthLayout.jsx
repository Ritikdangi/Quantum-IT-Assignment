import React from 'react'

export default function AuthLayout({ tabLabel, title, subtitle, children, footer, variant }) {
  return (
    <div className="auth-screen">
      <div className="auth-shell">
        <div className="auth-card" data-variant={variant || ''}>
          <div className="auth-tab">{tabLabel}</div>
          <div className="auth-header">
            <div className="auth-wave" aria-hidden="true" />
            <div className="auth-avatar">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12Z" fill="currentColor" opacity="0.85" />
                <path d="M20.998 21.405C20.913 17.613 17.875 15 12 15s-8.913 2.613-8.998 6.405C3.001 22.85 3.879 23.5 5.17 23.5h13.66c1.29 0 2.168-.65 2.168-2.095Z" fill="currentColor" opacity="0.65" />
              </svg>
            </div>
          </div>
          <div className="auth-body">
            {title ? <h1 className="auth-title">{title}</h1> : null}
            {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
            {children}
          </div>
          {footer ? <div className="auth-footer">{footer}</div> : null}
        </div>
      </div>
    </div>
  )
}
