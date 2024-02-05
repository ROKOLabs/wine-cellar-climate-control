import { Tooltip, TooltipProps } from '@mantine/core';
import { ReactNode } from 'react';

type NavbarTooltipProps = TooltipProps & {
  children: ReactNode;
};

export const IconTooltip = (props: NavbarTooltipProps) => (
  <Tooltip
    offset={10}
    position="right"
    openDelay={500}
    closeDelay={100}
    transitionProps={{ duration: 300 }}
    {...props}
  />
);
