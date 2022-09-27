import { Button, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const Setup = ({ onComplete }) => {
  const [userName, setUserName] = useState('');
  const saveUsername = e => {
    localStorage.setItem('u', userName);
    onComplete();
  };
  return (
    <div>
      <VStack spacing={2}>
        <Heading>Flightbag</Heading>
        <Heading as="h6" size="xs">
          Enter your simbrief username to get started!
        </Heading>
        <Input
          placeholder="JohnDoe, BestPilot etc..."
          onChange={e => {
            setUserName(e.target.value);
          }}
        />
        {userName.length > 0 ? (
          <Button colorScheme="green" onClick={saveUsername}>
            Save Username
          </Button>
        ) : (
          ''
        )}
      </VStack>
    </div>
  );
};

export default Setup;
