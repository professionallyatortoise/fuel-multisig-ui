import { Button } from "@chakra-ui/react";
import { FuelWeb3Wallet } from "@fuel-wallet/sdk";
import { Address, bn, NativeAssetId } from "fuels";
import React, { useEffect } from "react";
import { useFuelWallet } from "../packages/FuelWalletProvider/WalletContext";

export const WalletConnectButton = () => {
  const { wallet, setWallet } = useFuelWallet();
  const [account, setAccount] = React.useState<string>("");
  const [balance, setBalance] = React.useState<string | undefined>("");

  async function connect() {
    window.FuelWeb3?.connect();
    const accounts = await window.FuelWeb3?.accounts();

    if (accounts) {
      setAccount(accounts[0]);
      const wallet = await window.FuelWeb3?.getWallet(accounts[0]);
      const balance = await wallet?.getBalance();

      setWallet(wallet);
      setBalance(balance?.toString());
    }
  }

  async function disconnect() {
    await window.FuelWeb3?.disconnect();
    setWallet(undefined);
    setAccount("");
    setBalance("");
  }

  async function sendTokens() {
    console.log("Sending tokens");
    const amount = bn.parseUnits("0.1");
    const toAddress = Address.fromString(account);
    const response = await wallet?.transfer(toAddress, amount, NativeAssetId, {
      gasPrice: 1,
    });
    console.log(response);
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <Button onClick={account !== "" ? disconnect : connect}>
      {" "}
      {account !== "" ? account.slice(0, 8) + "..." : "Connect Wallet"}{" "}
    </Button>
  );
};
