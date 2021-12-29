import React, { useEffect, useState } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { providers } from "ethers";

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
	const [wallet, setWallet] = useState(null);

	const toast = createStandaloneToast();

	useEffect(() => {
		if (window.ethereum !== undefined) {
			setIsMetamaskInstalled(true);
			setWallet(new providers.Web3Provider(window.ethereum));

			window.ethereum.on("chainChanged", (chainId) => {
				window.location.reload();
			});

			window.ethereum.on("accountsChanged", (accounts) => {
				setAccount(accounts[0]);
				setWallet(new providers.Web3Provider(window.ethereum));
			});
		} else {
			setIsMetamaskInstalled(false);
		}
	}, []);

	useEffect(() => {
		async function requestChainId() {
			const chainId = await window.ethereum.request({
				method: "net_version",
			});
			setChainId(chainId);
		}
		if (window.ethereum !== undefined) {
			requestChainId();
		}
	}, []);

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

	async function addTokenToWallet(tokenMetadata) {
		await window.ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: tokenMetadata.address,
					name: tokenMetadata.name,
					symbol: tokenMetadata.symbol,
					decimals: tokenMetadata.decimals,
				},
			},
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
					setAccount(accounts[0]);
				})
				.catch((error) => {
					toast({
						title: "User rejected",
						description: "User rejected connection",
						status: "error",
						position: "bottom-right",
						variant: "left-accent",
						isClosable: true,
					});
				})
				.finally(() => {
					setConnectingAccount(false);
				});
		}
	}

	return (
		<Web3Context.Provider
			value={{
				isMetamaskInstalled,
				chainId,
				connect,
				connectingAccount,
				account,
				addTokenToWallet,
				wallet,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
}

export default Web3ContextProvider;
