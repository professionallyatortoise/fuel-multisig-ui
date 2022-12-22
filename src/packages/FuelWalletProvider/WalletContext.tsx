import React, { useState, FC, PropsWithChildren, useContext } from "react";
import { FuelWeb3Wallet } from "@fuel-wallet/sdk";

type Props = {
  children?: React.ReactNode;
};

interface IWalletContext {
  wallet: FuelWeb3Wallet | undefined;
  setWallet: (wallet: FuelWeb3Wallet | undefined) => void;
}

const defaultState = {
  wallet: undefined,
  setWallet: () => {},
};

const WalletContext = React.createContext<IWalletContext>(defaultState);

export const useFuelWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<PropsWithChildren<Props>> = (
  children: Props
) => {
  const [wallet, setWallet] = useState<FuelWeb3Wallet | undefined>(undefined);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children.children}
    </WalletContext.Provider>
  );
};
