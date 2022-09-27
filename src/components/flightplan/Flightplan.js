import { useEffect, useState } from 'react';
import GeneralDetails from './GeneralDetails';
import Weight from './Weight';
import axios from 'axios';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { displayToast } from '../../utils/toast';

const Flightplan = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [general, setGeneral] = useState(null);
  const [links, setLinks] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [generalWeights, setGeneralWeights] = useState(null);
  const [flightplanReady, setFlightplanReady] = useState(false);

  const fetchLatestFlightplan = async () => {
    const simbriefUsername = localStorage.getItem('u');
    try {
      const result = await axios(
        `https://www.simbrief.com/api/xml.fetcher.php?username=${simbriefUsername}&json=1`
      );
      setOrigin(result.data['origin']);
      setDestination(result.data['destination']);
      setGeneral(result.data['general']);
      setLinks(result.data['links']);
      setGeneralWeights(result.data['weights']);
      setFuel(result.data['fuel']);
      setFlightplanReady(true);
    } catch (err) {
      setFlightplanReady(false);
      displayToast(
        'Flightplan fetch error',
        err.response.data.fetch.status,
        'error'
      );
    }
  };
  useEffect(() => {
    fetchLatestFlightplan();
  }, []);

  return (
    <>
      {flightplanReady ? (
        <>
          <GeneralDetails
            origin={origin}
            destination={destination}
            general={general}
            skyvectorPlanLink={links['skyvector']}
          />
          <Weight generalWeights={generalWeights} fuel={fuel} />
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
