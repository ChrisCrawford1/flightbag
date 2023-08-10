import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  CloseButton,
  Tooltip,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Setup from './components/setup/Setup';
import Flightplan from './components/flightplan/Flightplan';
import { displayToast } from './utils/toast';

function App() {
  const [setupRequired, setSetupRequired] = useState<boolean>(true);

  const usernameExists = (): boolean => {
    return localStorage.getItem('u') !== null;
  };

  const logOut = (): void => {
    localStorage.removeItem('u');
    setSetupRequired(true);
    displayToast(
      'Logged out',
      'Your username has been deleted and you have been logged out!',
      'success'
    );
  };

  const setupCompleted = (): void => {
    setSetupRequired(false);
    displayToast(
      'Logged in',
      'Successfully stored your username, can be deleted at anytime.',
      'success'
    );
  };

  useEffect(() => {
    if (usernameExists()) {
      setSetupRequired(false);
    } else {
      setSetupRequired(true);
    }
  }, [setupRequired]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Grid display="flex" flexDirection="row" justifySelf="flex-end">
            <ColorModeSwitcher />
            {!setupRequired && (
              <Tooltip label="Remove username and log out">
                <CloseButton w={10} h={10} onClick={logOut} />
              </Tooltip>
            )}
          </Grid>

          {setupRequired ? (
            <Box>
              <VStack spacing={8}>
                {setupRequired && <Setup onComplete={setupCompleted} />}
              </VStack>
            </Box>
          ) : (
            <Flightplan />
          )}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
