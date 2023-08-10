import { Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface SetupProps {
  onComplete: () => void;
}

const Setup = ({ onComplete }: SetupProps) => {
  const [userName, setUserName] = useState<string>('');
  const saveUsername = () => {
    localStorage.setItem('u', userName);
    onComplete();
  };
  return (
    <div>
      <VStack spacing={2}>
        <Heading>Flightbag</Heading>
        <Heading as="h6" size="xs">
          Enter your simbrief username to get started!
          <Text color={'red.500'}>For flight simulation use only!</Text>
        </Heading>
        <Input
          placeholder="JohnDoe, BestPilot etc..."
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
        {userName.length > 0 && (
          <Button colorScheme="green" onClick={saveUsername}>
            Save Username
          </Button>
        )}
      </VStack>
    </div>
  );
};

export default Setup;
