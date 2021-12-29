import { useState, useContext } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	Button,
} from "@chakra-ui/react";
import { TokenFactoryContext } from "../context/TokenFactoryContext";

function CreateTokenForm() {
	const tokenFactoryContext = useContext(TokenFactoryContext);
	const { deployToken, deployingToken } = tokenFactoryContext;

	const [tokenName, setTokenName] = useState();
	const [tokenSymbol, setTokenSymbol] = useState();
	const [tokenTotalSupply, setTokenTotalSupply] = useState(0);
	const [tokenDecimals, setTokenDecimals] = useState(0);

	const handleInputChange = (e, setter) => {
		setter(e.target.value);
	};

	const deployTokenWithMetadata = async () => {
		await deployToken({
			tokenName,
			tokenSymbol,
			tokenTotalSupply,
			tokenDecimals,
		});
	};

	return (
		<VStack spacing={5} alignItems="flex-start" width="100%">
			<FormControl isRequired>
				<FormLabel htmlFor="name">Name</FormLabel>
				<Input
					id="name"
					type="text"
					value={tokenName}
					onChange={(e) => handleInputChange(e, setTokenName)}
					placeholder="Example: Aurora Near"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="symbol">Symbol</FormLabel>
				<Input
					onChange={(e) => handleInputChange(e, setTokenSymbol)}
					id="symbol"
					type="symbol"
					value={tokenSymbol}
					placeholder="Example: aNear"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="tokensupply">Token Supply</FormLabel>
				<Input
					id="tokensupply"
					type="number"
					value={tokenTotalSupply}
					onChange={(e) => handleInputChange(e, setTokenTotalSupply)}
					placeholder="Example: 100"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="decimals">Decimals</FormLabel>
				<Input
					id="decimals"
					type="text"
					value={tokenDecimals}
					onChange={(e) => handleInputChange(e, setTokenDecimals)}
					placeholder="Example: 18"
				/>
			</FormControl>
			<Button
				isLoading={deployingToken}
				onClick={deployTokenWithMetadata}
			>
				Create Token
			</Button>
		</VStack>
	);
}

export default CreateTokenForm;
