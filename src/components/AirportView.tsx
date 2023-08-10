import {
  Heading,
  Tooltip,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Grid,
  Container,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { Airport } from '../types';

interface AirportProps {
  airport: Airport;
}

const AirportView = ({ airport }: AirportProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{airport.name} Information</ModalHeader>
          <ModalCloseButton color="red.400" />
          <ModalBody>
            <Container maxW={'inherit'} mt={1}>
              <Grid
                display="flex"
                flexDirection="row"
                justifyContent={'space-evenly'}
                mb={4}
              >
                <Text>Transition Altitude {airport.trans_alt ?? '?'}</Text>
                <Text>Transition Level {airport.trans_level ?? '?'}</Text>
              </Grid>
              <SimpleGrid
                columns={{ base: 1, md: 1, lg: 1 }}
                spacing={5}
                textAlign={'center'}
              >
                <Box>
                  <Text as="b">METAR</Text>
                  <Text>{airport.metar}</Text>
                </Box>
                <Box>
                  <Text as="b">TAF</Text>
                  <Text>{airport.taf}</Text>
                </Box>
              </SimpleGrid>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} color="green.400">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tooltip label={airport.name ?? ''}>
        <Heading fontSize="2xl" style={{ cursor: 'pointer' }} onClick={onOpen}>
          {airport.icao_code}
          <Text fontSize="xs">({airport.plan_rwy ?? '?'})</Text>
        </Heading>
      </Tooltip>
    </>
  );
};

export default AirportView;
