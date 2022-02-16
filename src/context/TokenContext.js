import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Context } from "./Web3Context";
import ERC20 from "../abi/ERC20.json";
export const TokenContext = React.createContext(null);

export function TokenContextProvider({ children }) {
	const web3Context = useContext(Web3Context);
	const [tokenAddress, setTokenAddress] = useState();
	const [tokenContract, setTokenContract] = useState(null);
	const [tokenMetadata, setTokenMetadata] = useState(null);
	const { wallet, account } = web3Context;
	let Token = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode);

	useEffect(() => {
		async function initContract() {
			const signer = await wallet.getSigner();
			try {
				const contract = Token.attach(tokenAddress).connect(signer);
				setTokenContract(contract);
			} catch {
				setTokenContract(null);
			}
		}
		if (tokenAddress !== undefined) {
			initContract();
		}
	}, [tokenAddress]);

	useEffect(() => {
		async function getTokenMetadata(tokenContract) {
			console.log(tokenContract);
			let name = await tokenContract.name();
			let symbol = await tokenContract.symbol();
			let decimals = await tokenContract.decimals();
			let totalSupply = await tokenContract.totalSupply();
			let tokenMetadata = {
				name,
				symbol,
				decimals,
				totalSupply,
			};
			setTokenMetadata(tokenMetadata);
		}
		if (tokenContract !== null) {
			getTokenMetadata(tokenContract);
		}
	}, [tokenContract]);

	async function transfer() {}

	return (
		<TokenContext.Provider
			value={{
				tokenAddress,
				setTokenContract,
				setTokenAddress,
				tokenContract,
				tokenMetadata,
			}}
		>
			{children}
		</TokenContext.Provider>
	);
}
