import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import { FaMoon, FaSun } from 'react-icons/fa';

interface ActionsProps {
  showDemoMode: boolean;
  onDemoModeToggle: () => void;
}

export const Actions = ({ showDemoMode, onDemoModeToggle }: ActionsProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const colourSwitcherTooltip = `Toggle ${
    text[0].toUpperCase() + text.slice(1).toLowerCase()
  } mode`;
  const demoModeTooltip = 'Toggle Demo Mode';

  return (
    <>
      {showDemoMode && (
        <Tooltip label={demoModeTooltip}>
          <IconButton
            size="md"
            fontSize="lg"
            variant="ghost"
            color="current"
            aria-label={`Toggle demo mode`}
            icon={<InfoIcon />}
            onClick={onDemoModeToggle}
          />
        </Tooltip>
      )}

      <Tooltip label={colourSwitcherTooltip}>
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          marginLeft="2"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
        />
      </Tooltip>
    </>
  );
};
