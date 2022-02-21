import {
	VStack,
	Heading,
	Text,
	Image,
	Grid,
	Button,
	HStack,
	Input,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { NFTContext } from "../context/NFTContext";
import { Web3Context } from "../context/Web3Context";

function InteractWithNFT() {
	const [nfts, setNFTs] = useState(null);
	const { account, wallet } = useContext(Web3Context);
	const { getNFTs, approveNFT, transferNFT } = useContext(NFTContext);

	const [interactState, setInteractState] = useState({
		approve: {},
		transfer: {},
	});

	async function fetchNFTs() {
		let nfts = await getNFTs();
		console.log(nfts);
		setNFTs(nfts);
	}

	useEffect(() => {
		if (account) {
			console.log(account);
			fetchNFTs();
		}
	}, [account]);

	async function handleApproveInputChange(e, index) {
		const { target } = e;
		let prevApprove = interactState.approve;
		prevApprove[index] = target.value;
		setInteractState({
			approve: {
				...prevApprove,
			},
			transfer: interactState["transfer"],
		});
	}
	async function handleTransferInputChange(e, index) {
		const { target } = e;
		console.log(interactState);
		let prevTransfer = interactState.transfer;
		prevTransfer[index] = target.value;
		setInteractState({
			transfer: {
				...prevTransfer,
			},
			approve: interactState["approve"],
		});
	}

	async function handleApprove(index, tokenId) {
		await approveNFT(interactState.approve[index], tokenId);
	}

	async function handleTransfer(index, tokenId) {
		await transferNFT(interactState.transfer[index], tokenId);
	}
	return (
		<VStack width="100%">
			<Heading>Interact With NFT</Heading>
			{nfts !== null ? (
				nfts.length !== 0 ? (
					<Grid
						width="100%"
						gridGap={5}
						templateColumns="repeat(5, 1fr)"
					>
						{nfts.map((nft, index) => {
							console.log(nft);
							return (
								<VStack alignItems="flex-start" key={index}>
									<Image
										borderRadius={4}
										width="100%"
										src={`https:ipfs.io/ipfs/${nft.image.substr(
											7
										)}`}
									/>
									<Text>{nft.name}</Text>
									<Text>{nft.description}</Text>
									<HStack>
										<Input
											value={
												interactState.approve[index] ===
												undefined
													? ""
													: interactState.approve[
															index
													  ]
											}
											onChange={(e) =>
												handleApproveInputChange(
													e,
													index
												)
											}
										/>
										<Button
											onClick={() =>
												handleApprove(nft.tokenId)
											}
										>
											Approve
										</Button>
									</HStack>
									<HStack>
										<Input
											value={
												interactState.transfer[
													index
												] === undefined
													? ""
													: interactState.transfer[
															index
													  ]
											}
											onChange={(e) =>
												handleTransferInputChange(
													e,
													index
												)
											}
										/>
										<Button
											onClick={() =>
												handleTransfer(
													index,
													nft.tokenId
												)
											}
										>
											Transfer
										</Button>
									</HStack>
								</VStack>
							);
						})}
					</Grid>
				) : (
					<Text textAlign="center">No NFTs</Text>
				)
			) : null}
		</VStack>
	);
}

export default InteractWithNFT;
