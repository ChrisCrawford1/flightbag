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

const Airport = ({
  airportName,
  airportIcao,
  runwayInUse,
  transAlt,
  transLvl,
  metar,
  taf,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* TODO: Figure out a good reusable way to export this modal into its own component */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{airportName} Information</ModalHeader>
          <ModalCloseButton color="red.400" />
          <ModalBody>
            <Container maxW={'inherit'} mt={1}>
              <Grid
                display="flex"
                flexDirection="row"
                justifyContent={'space-evenly'}
                mb={4}
              >
                <Text>Transition Altitude {transAlt ?? '?'}</Text>
                <Text>Transition Level {transLvl ?? '?'}</Text>
              </Grid>
              <SimpleGrid
                columns={{ base: 1, md: 1, lg: 1 }}
                spacing={5}
                textAlign={'center'}
              >
                <Box>
                  <Text as="b">METAR</Text>
                  <Text>{metar}</Text>
                </Box>
                <Box>
                  <Text as="b">TAF</Text>
                  <Text>{taf}</Text>
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
      <Tooltip label={airportName ?? ''}>
        <Heading fontSize="2xl" style={{ cursor: 'pointer' }} onClick={onOpen}>
          {airportIcao}
          <Text fontSize="xs">({runwayInUse ?? '?'})</Text>
        </Heading>
      </Tooltip>
    </>
  );
};

export default Airport;
