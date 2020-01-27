import React from 'react';

export const ProgressBar = ({ value, className }) => (
  <progress
    className={className}
    max="100"
    value={value}
  ></progress>
)

ProgressBar.defaultProps = {
  className: null,
}
