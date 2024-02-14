import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ActionTooltip } from 'components/ActionTooltip';

interface StyledNavLinkProps {
  to: string;
  isActive: boolean;
  colorScheme: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  tooltipLabel?: string;
  disabled?: boolean;
}

export const StyledNavLink: React.FC<StyledNavLinkProps> = ({
  to,
  isActive,
  colorScheme,
  children,
  style,
  tooltipLabel,
  disabled = false,
  ...rest
}) => {
  const activeStyle = {
    backgroundColor: isActive ? 'rgba(128, 128, 128, 0.2)' : 'transparent',
    color: colorScheme === 'dark' ? 'white' : 'black',
    textDecoration: 'none',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    ...style,
  };

  const disabledStyle = {
    ...activeStyle,
    color: 'grey',
    cursor: 'not-allowed',
  };

  if (disabled) {
    return (
      <div style={disabledStyle} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <>
      {tooltipLabel ? (
        <ActionTooltip label={tooltipLabel}>
          <NavLink to={to} style={activeStyle} {...rest}>
            {children}
          </NavLink>
        </ActionTooltip>
      ) : (
        <NavLink to={to} style={activeStyle} {...rest}>
          {children}
        </NavLink>
      )}
    </>
  );
};

StyledNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  colorScheme: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  tooltipLabel: PropTypes.string,
};
