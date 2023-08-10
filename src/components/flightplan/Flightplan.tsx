import { useEffect, useState } from 'react';
import Overview from './Overview';
import Weight from './Weight';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { displayToast } from '../../utils/toast';
import { FetchLatestFlightplan } from '../../utils/simbrief';
import { SimbriefFlightplan } from '../../types';

const Flightplan = () => {
  const [flightplanReady, setFlightplanReady] = useState(false);
  const [flightplan, setFlightplan] = useState<SimbriefFlightplan | null>(null);

  const getLatestFlightplan = async (): Promise<void> => {
    const simbriefUsername = localStorage.getItem('u');

    if (simbriefUsername === null) {
      displayToast(
        'Username not found',
        'We could not find a valid username in storage, please try logging in again!',
        'error'
      );
      return;
    }

    try {
      const flightplan = await FetchLatestFlightplan(simbriefUsername);
      setFlightplan(flightplan);
      setFlightplanReady(true);
    } catch (err) {
      setFlightplanReady(false);
      displayToast(
        'Flightplan fetch error',
        'There was an error fetching your flightplan, please try again!',
        'error'
      );
    }
  };

  useEffect(() => {
    getLatestFlightplan();
  }, []);

  return (
    <>
      {flightplanReady && flightplan ? (
        <>
          <Overview
            origin={flightplan.origin}
            destination={flightplan.destination}
            general={flightplan.general}
            images={flightplan.images}
            links={flightplan.links}
            aircraft={flightplan.aircraft}
          />
          <Weight weights={flightplan.weights} fuel={flightplan.fuel} />
        </>
      ) : (
        <Box textAlign="center" fontSize="xl">
          <Spinner size={'xl'} />
          <Text color={'gray.600'}>Fetching latest flightplan...</Text>
        </Box>
      )}
    </>
  );
};

export default Flightplan;
