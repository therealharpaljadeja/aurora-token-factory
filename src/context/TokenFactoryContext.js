import { ethers, BigNumber } from "ethers";
import React, { useState, useContext } from "react";
import { Web3Context } from "./Web3Context";
import ERC20 from "./../abi/ERC20.json";
import { createStandaloneToast } from "@chakra-ui/react";

export const TokenFactoryContext = React.createContext(null);

export function TokenFactoryContextProvider({ children }) {
	const web3Context = useContext(Web3Context);

	const [deployingToken, setDeployingToken] = useState(false);
	const [tokenMetadata, setTokenMetadata] = useState(null);
	const toast = createStandaloneToast();
	const { wallet } = web3Context;
	async function deployToken(tokenMetadata) {
		setDeployingToken(true);
		const signer = await wallet.getSigner();
		const TokenFactory = new ethers.ContractFactory(
			ERC20.abi,
			ERC20.bytecode,
			signer
		);
		const { tokenName, tokenSymbol, tokenTotalSupply, tokenDecimals } =
			tokenMetadata;

		await TokenFactory.deploy(
			tokenName,
			tokenSymbol,
			BigNumber.from(tokenTotalSupply).mul(
				BigNumber.from("10").pow(BigNumber.from(tokenDecimals))
			),
			tokenDecimals
		)
			.then(async (result) => {
				console.log(result);
				let name = await result.name();
				let symbol = await result.symbol();
				let totalSupply = await result.totalSupply();
				let decimals = await result.decimals();
				let tokenMetadata = {
					name,
					symbol,
					totalSupply,
					decimals,
					address: result.address,
				};
				console.log(tokenMetadata);
				setTokenMetadata(tokenMetadata);
				toast({
					title: "Token Created",
					position: "bottom-right",
					variant: "left-accent",
					status: "success",
				});
			})
			.catch((error) => {
				toast({
					title: "User rejected",
					description: "User rejected token transaction",
					position: "bottom-right",
					variant: "left-accent",
					status: "error",
				});
				console.log(error);
			})
			.finally(() => {
				setDeployingToken(false);
			});
	}

	return (
		<TokenFactoryContext.Provider
			value={{
				deployToken,
				deployingToken,
				tokenMetadata,
				setTokenMetadata,
			}}
		>
			{children}
		</TokenFactoryContext.Provider>
	);
}
