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
  Tooltip,
  Image,
  Button,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AirportView from '../AirportView';
import { openInNewTab } from '../../utils/redirect';
import { displayToast } from '../../utils/toast';
import { General, Airport, Images, Links, Aircraft, Prefile } from '../../types';

interface OverviewProps {
  origin: Airport;
  destination: Airport;
  general: General;
  images: Images;
  links: Links;
  aircraft: Aircraft;
  prefile: Prefile;
}

const Overview = ({
  origin,
  destination,
  general,
  images,
  links,
  aircraft,
  prefile,
}: OverviewProps) => {
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [routeImageLink, setRouteImageLink] = useState<string>('');

  const copyToClipboard = (e: any) => {
    navigator.clipboard.writeText(e.target.textContent);
    displayToast(
      'Text Copied',
      'Selected text has been copied to your clipboard.',
      'info'
    );
  };

  const openToSkyVector = (): void => {
    openInNewTab(links.skyvector);
  };

  const toggleRouteMap = (): void => {
    setShowRouteMap(!showRouteMap);
  };

  const parseRouteImages = (images: Images): void => {
    if (images.map.length > 0) {
      const baseUrl = images.directory;
      const link = images.map[0].link;
      setRouteImageLink(`${baseUrl}${link}`);
    }
  };

  useEffect(() => {
    parseRouteImages(images);
  }, []);

  return (
    <Box p={2}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>
          Overview{' '}
          <Text
            fontSize={'sm'}
            textColor={'gray.600'}
          >{`${general?.icao_airline}${general?.flight_number}`}</Text>
          <Text fontSize={'xs'} textColor={'gray.600'}>
            {aircraft.name}
          </Text>
        </Heading>
        <Grid display="flex" flexDirection="row" justifyContent="space-between">
          <AirportView airport={origin} />
          <Text>{general.air_distance}nm</Text>
          <AirportView airport={destination} />
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
        {showRouteMap && 
        <>
        <Text fontSize="md">
          Network Prefile
        </Text>
        <Grid display="flex" justifyContent="space-around">
          <Link href={prefile.vatsim.link} fontSize="sm" isExternal>
            Vatsim <ExternalLinkIcon mx='2px' />
          </Link>
          
          <Link href={prefile.ivao.link} fontSize="sm" isExternal>
            IVAO <ExternalLinkIcon mx='2px' />
          </Link>
          
          <Link href={prefile.pilotedge.link} fontSize="sm" isExternal>
            PilotEdge <ExternalLinkIcon mx='2px' />
          </Link>
        </Grid>
          <Image src={routeImageLink} />
        </>
        }

        <Tooltip label="Click to copy to clipboard">
          <Text
            color={'gray.600'}
            fontSize={'lg'}
            onClick={copyToClipboard}
            style={{ cursor: 'pointer' }}
          >
            {general?.route}
          </Text>
        </Tooltip>
      </Stack>

      <Container maxW={'4xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Stat>
            <StatLabel fontSize="md">Cruise Level</StatLabel>
            <StatNumber>
              FL{parseInt(general.initial_altitude) / 100}
            </StatNumber>
            <StatHelpText>
              {general?.stepclimb_string !== ''
                ? 'Step Required'
                : 'No Step Required'}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Average Wind</StatLabel>
            <StatNumber>
              {general.avg_wind_dir} / {general.avg_wind_spd} kts
            </StatNumber>
            <StatHelpText>Cruise Level</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Cost Index</StatLabel>
            <StatNumber>{general.costindex}</StatNumber>
            <StatHelpText>Recommended</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Overview;
