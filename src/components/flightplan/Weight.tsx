import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { formatFloat } from '../../utils/number';
import { Fuel, Weights } from '../../types';

interface WeightsProps {
  weights: Weights;
  fuel: Fuel;
}

const Weight = ({ weights, fuel }: WeightsProps) => {
  const alternateFuel = (): number => {
    return (
      parseInt(fuel.alternate_burn) +
      parseInt(fuel.contingency) +
      parseInt(fuel.reserve)
    );
  };

  return (
    <Box p={4}>
      <Heading fontSize={'3xl'}>Weights</Heading>
      <Text fontSize={'md'} color={'gray.600'}>
        All weights in KG
      </Text>
      <Container maxW={'4xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Stat>
            <StatLabel fontSize="md">Takeoff Fuel</StatLabel>
            <StatNumber>{formatFloat(fuel.plan_takeoff)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Reserve Fuel</StatLabel>
            <StatNumber>{formatFloat(alternateFuel().toString())}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Landing Fuel</StatLabel>
            <StatNumber>{formatFloat(fuel.plan_landing)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Passengers</StatLabel>
            <StatNumber>{weights.pax_count}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Cargo</StatLabel>
            <StatNumber>{formatFloat(weights.cargo)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="md">Zero Fuel Weight</StatLabel>
            <StatNumber>{formatFloat(weights.est_zfw)}</StatNumber>
          </Stat>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Weight;
