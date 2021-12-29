import { useState, useContext } from "react";
import {
	FormControl,
	FormLabel,
	Heading,
	VStack,
	Input,
	Text,
	Box,
	Button,
	createStandaloneToast,
} from "@chakra-ui/react";
import { TokenContext } from "../context/TokenContext";
import { BigNumber } from "ethers";

function InteractTokenForm() {
	const toast = createStandaloneToast();
	const tokenContext = useContext(TokenContext);
	const { tokenAddress, setTokenAddress, tokenContract, tokenMetadata } =
		tokenContext;

	const [transferTokenTo, setTransferTokenTo] = useState();
	const [transferTokenAmount, setTransferTokenAmount] = useState();
	const [approveTokenTo, setApproveTokenTo] = useState();
	const [approveTokenAmount, setApproveTokenAmount] = useState();
	const [transferFromFrom, setTransferFromFrom] = useState();
	const [transferFromTo, setTransferFromTo] = useState();
	const [transferFromAmount, setTransferFromAmount] = useState();
	const [checkAllowanceOwner, setCheckAllowanceOwner] = useState();
	const [checkAllowanceSpender, setCheckAllowanceSpender] = useState();

	const handleChange = (target, setter) => {
		setter(target.value);
	};

	const handleContractAddressChange = ({ target }) => {
		setTokenAddress(target.value);
	};

	async function transferToken() {
		if (tokenMetadata !== null) {
			try {
				await tokenContract.transfer(
					transferTokenTo,
					numToWei(transferTokenAmount)
				);
				toast({
					title: `Transaction Success`,
					status: "success",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			} catch (error) {
				toast({
					title: "User rejected",
					description: "User rejected connection",
					status: "error",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			}
		}
	}

	function numToWei(num) {
		return BigNumber.from(num).mul(
			BigNumber.from("10").pow(BigNumber.from(tokenMetadata.decimals))
		);
	}
	async function approveToken() {
		if (tokenMetadata !== null) {
			try {
				await tokenContract.approve(
					approveTokenTo,
					numToWei(approveTokenAmount)
				);
				toast({
					title: `Transaction Success`,
					status: "success",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			} catch (error) {
				toast({
					title: "User rejected",
					description: "User rejected connection",
					status: "error",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			}
		}
	}

	async function checkAllowance() {
		if (tokenMetadata !== null) {
			let allowance = await tokenContract.allowance(
				checkAllowanceOwner,
				checkAllowanceSpender
			);
			toast({
				title: `Allowance is ${allowance}`,
				status: "success",
				position: "bottom-right",
				variant: "left-accent",
				isClosable: true,
			});
		}
	}

	async function transferFromToken() {
		if (tokenMetadata !== null) {
			try {
				await tokenContract.transferFrom(
					transferFromFrom,
					transferFromTo,
					numToWei(transferFromAmount)
				);
				toast({
					title: `Transaction Success`,
					status: "success",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			} catch (error) {
				toast({
					title: "User rejected",
					description: "User rejected connection",
					status: "error",
					position: "bottom-right",
					variant: "left-accent",
					isClosable: true,
				});
			}
		}
	}

	return (
		<VStack width="100%">
			<Box mb={5} textAlign="center">
				<Heading>Interact With Token</Heading>
				<Text>
					Note: We don't know if the address you provided is a valid
					token.
				</Text>
			</Box>
			<FormControl>
				<FormLabel htmlFor="address">Contract Address</FormLabel>
				<Input
					type="text"
					id="address"
					name="address"
					onChange={handleContractAddressChange}
					placeholder="Contract Address"
				/>
			</FormControl>
			{tokenAddress !== undefined && tokenContract !== null ? (
				<VStack spacing="40px" marginTop="20px !important" width="100%">
					<VStack alignItems="flex-start" width="100%">
						<Heading size="md">Transfer Token</Heading>
						<Text>Transfer to another account</Text>
						<Input
							onChange={({ target }) =>
								handleChange(target, setTransferTokenTo)
							}
							type="text"
							placeholder="to: 0x2348der243..."
						/>
						<Input
							onChange={({ target }) =>
								handleChange(target, setTransferTokenAmount)
							}
							type="text"
							placeholder="Amount: Eg. 10"
						/>
						<Button
							onClick={transferToken}
							isDisabled={
								transferTokenTo === undefined ||
								transferTokenAmount === undefined ||
								transferTokenTo.length === 0 ||
								transferTokenAmount.length === 0
							}
						>
							Transfer
						</Button>
					</VStack>

					<VStack alignItems="flex-start" width="100%">
						<Heading size="md">Approve Account</Heading>
						<Text>Transfer to another account</Text>
						<Input
							onChange={({ target }) =>
								handleChange(target, setApproveTokenTo)
							}
							type="text"
							placeholder="to: 0x2348der243..."
						/>
						<Input
							onChange={({ target }) =>
								handleChange(target, setApproveTokenAmount)
							}
							type="text"
							placeholder="Amount: Eg. 10"
						/>
						<Button
							onClick={approveToken}
							isDisabled={
								approveTokenTo === undefined ||
								approveTokenAmount === undefined ||
								approveTokenTo.length === 0 ||
								approveTokenAmount.length === 0
							}
						>
							Approve
						</Button>
					</VStack>

					<VStack alignItems="flex-start" width="100%">
						<Heading size="md">Transfer From (Allowance)</Heading>
						<Text>
							Transfer between accounts a specified amount that
							you've been authorised to do so.
						</Text>
						<Input
							onChange={({ target }) =>
								handleChange(target, setTransferFromFrom)
							}
							type="text"
							placeholder="from: 0x2348der243..."
						/>
						<Input
							onChange={({ target }) =>
								handleChange(target, setTransferFromTo)
							}
							type="text"
							placeholder="to: 0x2348der243..."
						/>
						<Input
							onChange={({ target }) =>
								handleChange(target, setTransferFromAmount)
							}
							type="text"
							placeholder="Amount: Eg. 10"
						/>
						<Button
							onClick={transferFromToken}
							isDisabled={
								transferFromFrom === undefined ||
								transferFromTo === undefined ||
								transferFromAmount === undefined ||
								transferFromFrom.length === 0 ||
								transferFromTo.length === 0 ||
								transferFromAmount.length === 0
							}
						>
							Transfer
						</Button>
					</VStack>

					<VStack alignItems="flex-start" width="100%">
						<Heading size="md">Check Allowance</Heading>
						<Text>
							Check what amount has been approved for withdrawal
							between two accounts.
						</Text>
						<Input
							onChange={({ target }) =>
								handleChange(target, setCheckAllowanceOwner)
							}
							type="text"
							placeholder="owner: 0x2348der243..."
						/>
						<Input
							onChange={({ target }) =>
								handleChange(target, setCheckAllowanceSpender)
							}
							type="text"
							placeholder="spender: 0x2348der243..."
						/>
						<Button
							onClick={checkAllowance}
							isDisabled={
								checkAllowanceOwner === undefined ||
								checkAllowanceSpender === undefined ||
								checkAllowanceOwner.length === 0 ||
								checkAllowanceSpender.length === 0
							}
						>
							Check Allowance
						</Button>
					</VStack>
				</VStack>
			) : null}
		</VStack>
	);
}

export default InteractTokenForm;
