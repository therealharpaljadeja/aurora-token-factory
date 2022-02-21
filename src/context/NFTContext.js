import { Contract, providers } from "ethers";
import React, { useEffect, useContext, useState } from "react";
import { Web3Context } from "./Web3Context";
import NFT from "../abi/NFT.json";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const NFT_CONTRACT_ADDRESS = "0xe841477C55A8246EB5Fd318C72182f43075da097";

export const NFTContext = React.createContext(null);

export function NFTContextProvider({ children }) {
	const { wallet, account } = useContext(Web3Context);
	const toast = useToast();
	const [NFTContract, setNFTContract] = useState(null);
	const [deployingNFT, setDeployingNFT] = useState(false);

	useEffect(() => {
		async function initNFTContract() {
			const signer = await wallet.getSigner();
			setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
		}

		if (wallet !== null) {
			initNFTContract();
		}
	}, [wallet]);

	async function mintNFT(tokenURI) {
		setDeployingNFT(true);
		NFTContract.mint(tokenURI)
			.then(async (result) => {
				toast({
					title: "NFT Minted",
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
				setDeployingNFT(false);
			});
	}

	async function tokenBalance() {
		return await NFTContract.balanceOf(account);
	}

	async function getNFTs() {
		let balance = await tokenBalance();
		let result = Array.from({ length: balance.toString() }).map(
			(u, i) => i
		);
		console.log(result);
		for await (let i of result) {
			let tokenId = await NFTContract.tokenOfOwnerByIndex(account, i);
			let metadata = await NFTContract.tokenURI(tokenId);
			let response = axios.get(metadata);
			result[i] = {
				...(await response).data,
				tokenId: tokenId.toString(),
			};
		}
		return result;
	}

	async function approveNFT(to, tokenId) {
		NFTContract.approve(to, tokenId)
			.then(() => {
				toast({
					title: "NFT Approved",
					position: "bottom-right",
					variant: "left-accent",
					status: "success",
				});
			})
			.catch((error) => {
				toast({
					title: "Something went wrong",
					description: "Please make sure address is correct format",
					position: "bottom-right",
					variant: "left-accent",
					status: "error",
				});
			});
	}

	async function transferNFT(to, tokenId) {
		NFTContract.transferFrom(account, to, tokenId)
			.then(() => {
				toast({
					title: "NFT Transfer",
					description: "Refresh to see updated nfts",
					position: "bottom-right",
					variant: "left-accent",
					status: "success",
				});
			})
			.catch((error) => {
				console.log(error);
				toast({
					title: "Something went wrong",
					description:
						"Please make sure address is correct format and transfer is approved",
					position: "bottom-right",
					variant: "left-accent",
					status: "error",
				});
			});
	}

	return (
		<NFTContext.Provider
			value={{
				mintNFT,
				deployingNFT,
				tokenBalance,
				getNFTs,
				approveNFT,
				transferNFT,
			}}
		>
			{children}
		</NFTContext.Provider>
	);
}
