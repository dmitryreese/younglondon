import React from 'react';

export const Button = ({ onClick, disabled, children }) => (
  <button
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
)

Button.defaultProps = {
  onClick: null,
  disabled: false,
}
