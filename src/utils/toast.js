import { createStandaloneToast } from "@chakra-ui/react";

export function displayToast(title, desc, status) {
    const { toast } = createStandaloneToast();
    toast({
        title: title,
        description: desc,
        status: status,
        duration: 9000,
        isClosable: true,
      });

}