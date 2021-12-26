import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const Web3Context = React.createContext();

const validNetworkOptions = {
	chainId: "0x4e454153",
	chainName: "Aurora Testnet",
	nativeCurrency: { name: "aETH", symbol: "aETH", decimals: 18 },
	rpcUrls: ["https://testnet.aurora.dev/"],
	blockExplorerUrls: ["https://explorer.mainnet.aurora.dev/"],
};

function Web3ContextProvider({ children }) {
	const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(null);
	const [connectingAccount, setConnectingAccount] = useState(null);
	const [account, setAccount] = useState(null);
	const [chainId, setChainId] = useState(null);

	const toast = useToast();

	useEffect(() => {
		if (window.ethereum !== undefined) {
			setIsMetamaskInstalled(true);
			window.ethereum.on("chainChanged", (chainId) => {
				window.location.reload();
			});

			window.ethereum.on("accountsChanged", (accounts) => {
				window.location.reload();
			});
		} else {
			setIsMetamaskInstalled(false);
		}
	}, []);

	useEffect(() => {
		if (window.ethereum !== undefined && window.ethereum.chainId !== null) {
			setChainId(window.ethereum.chainId);
		}
	}, [window.ethereum?.networkVersion]);

	useEffect(() => {
		if (isMetamaskInstalled === true) {
			if (checkNetwork(window.ethereum, "1313161555") !== true) {
				requestNetworkChange(validNetworkOptions);
			}
		}
	}, [isMetamaskInstalled]);

	async function checkNetwork(provider, targetChainId) {
		return provider.networkVersion === targetChainId;
	}

	async function requestNetworkChange(networkConfig) {
		window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [networkConfig],
		});
	}

	async function connect() {
		if (isMetamaskInstalled === true) {
			setConnectingAccount(true);
			window.ethereum
				.request({
					method: "eth_requestAccounts",
				})
				.then((accounts) => {
					setConnectingAccount(false);
					setAccount(accounts[0]);
				})
				.catch((error) => {});
		}
	}

	return (
		<Web3Context.Provider value={{ isMetamaskInstalled, chainId, connect }}>
			{children}
		</Web3Context.Provider>
	);
}

export default Web3ContextProvider;
