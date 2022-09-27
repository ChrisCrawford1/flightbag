import { ExternalLinkIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Container,
  Text,
  Stack,
  createStandaloneToast,
  Tooltip,
  Image,
  Collapse,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Airport from '../Airport';
import { openInNewTab } from '../../utils/redirect';
import { displayToast } from '../../utils/toast';

const GeneralDetails = ({
  origin,
  destination,
  general,
  skyvectorPlanLink,
  routeImageLink,
}) => {
  const [showRouteMap, setShowRouteMap] = useState(false);
  const copyToClipboard = e => {
    const { toast } = createStandaloneToast();
    navigator.clipboard.writeText(e.target.textContent);
    displayToast(
      'Text Copied',
      'Selected text has been copied to your clipboard.',
      'info'
    );
  };

  const openToSkyVector = () => {
    openInNewTab(skyvectorPlanLink);
  };

  const toggleRouteMap = () => {
    setShowRouteMap(!showRouteMap);
  };
  return (
    <Box p={2}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>
          Overview{' '}
          <Text
            fontSize={'sm'}
            textColor={'gray.600'}
          >{`${general['icao_airline']}${general['flight_number']}`}</Text>
        </Heading>
        <Grid display="flex" flexDirection="row" justifyContent="space-between">
          <Airport
            airportName={origin['name']}
            airportIcao={origin['icao_code']}
            runwayInUse={origin['plan_rwy']}
            transAlt={origin['trans_alt']}
            transLvl={origin['trans_level']}
            metar={origin['metar']}
            taf={origin['taf']}
          />
          <Text>{general['air_distance']}nm</Text>
          <Airport
            airportName={destination['name']}
            airportIcao={destination['icao_code']}
            runwayInUse={destination['plan_rwy']}
            transAlt={destination['trans_alt']}
            transLvl={destination['trans_level']}
            metar={destination['metar']}
            taf={destination['taf']}
          />
        </Grid>
        <Text>
          Route
          <SearchIcon
            ml={1}
            w={4}
            h={4}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleRouteMap()}
          />
          <ExternalLinkIcon
            ml={1}
            w={4}
            h={4}
            style={{ cursor: 'pointer' }}
            onClick={() => openToSkyVector()}
          />
        </Text>
        {showRouteMap && (
          <Collapse in={showRouteMap} animateOpacity>
            <Image src={routeImageLink} />
          </Collapse>
        )}

        <Tooltip label="Click to copy to clipboard">
          <Text
            color={'gray.600'}
            fontSize={'lg'}
            onClick={copyToClipboard}
            style={{ cursor: 'pointer' }}
          >
            {general['route']}
          </Text>
        </Tooltip>
      </Stack>

      <Container maxW={'4xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Stat>
            <StatLabel fontSize="md">Cruise Level</StatLabel>
            <StatNumber>FL{general['initial_altitude'] / 100}</StatNumber>
            <StatHelpText>
              {general['stepclimb_string'] !== '' ||
              general['stepclimb_string'] !== null
                ? 'Step Required'
                : 'No Step Required'}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Average Wind</StatLabel>
            <StatNumber>
              {general['avg_wind_dir']} / {general['avg_wind_spd']}
            </StatNumber>
            <StatHelpText>Cruise Level</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Cost Index</StatLabel>
            <StatNumber>{general['costindex']}</StatNumber>
            <StatHelpText>Recommended</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default GeneralDetails;
