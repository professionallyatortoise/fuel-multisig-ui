import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { FuelWeb3Wallet } from "@fuel-wallet/sdk";
import { useEffect } from "react";
import { Address, bn, NativeAssetId } from "fuels";
import { WalletConnectButton } from "./components/WalletConnectButton";
import { useFuelWallet } from "./packages/FuelWalletProvider/WalletContext";
import {
  MultisigContractAbi,
  MultisigContractAbi__factory,
} from "./types/contracts";

export const App = () => {
  const { wallet } = useFuelWallet();

  const [contract, setContract] = React.useState<
    MultisigContractAbi | undefined
  >(undefined);

  const [isContractOwner, setIsContractOwner] = React.useState<boolean>(false);

  useEffect(() => {
    if (wallet) {
      const contract = MultisigContractAbi__factory.connect(
        "0x8026e9bfb1c2ed455bf91f28534d3f9f5cf5c849f9cc7e6d3cd08cb25a925501",
        wallet
      );
      setContract(contract);
    }
  }, [wallet]);

  function isOwner() {
    if (wallet) {
      console.log("Checking if owner");
      contract?.functions
        .is_owner({ value: wallet.address.toString() })
        .call()
        .then((res) => {
          setIsContractOwner(res.value);
          console.log(res);
        });
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Flex justifyContent={"end"}>
            <WalletConnectButton />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>

          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hello Fuel
              {wallet?.address.toString()}
              {/* {account} {balance} */}
            </Link>
            <Button onClick={isOwner}>
              Is owner {isContractOwner ? "true" : "false"}
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
