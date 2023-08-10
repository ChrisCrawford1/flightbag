import { createStandaloneToast } from '@chakra-ui/react';

type ToastStatus =
  | 'info'
  | 'warning'
  | 'success'
  | 'error'
  | 'loading'
  | undefined;

export function displayToast(
  title: string,
  desc: string,
  status: ToastStatus
): void {
  const { toast } = createStandaloneToast();
  toast({
    title: title,
    description: desc,
    status: status,
    duration: 5000,
    isClosable: true,
  });
}
