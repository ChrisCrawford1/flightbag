import React from 'react';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const tooltipText = `Toggle ${
    text[0].toUpperCase() + text.slice(1).toLowerCase()
  } mode`;

  return (
    <Tooltip label={tooltipText}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...props}
      />
    </Tooltip>
  );
};
