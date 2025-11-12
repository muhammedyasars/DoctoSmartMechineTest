import React from 'react';

// Minimal, non-JSX fallback to test build parsing
export default function LoginPage() {
  return React.createElement('div', { className: 'auth-container' },
    React.createElement('div', { className: 'auth-card' },
      React.createElement('h1', null, 'Login'),
      React.createElement('p', null, 'Login page placeholder')
    )
  );
}
