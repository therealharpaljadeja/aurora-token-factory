import { useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	VStack,
	Button,
} from "@chakra-ui/react";

function CreateTokenForm() {
	return (
		<VStack spacing={5} alignItems="flex-start" width="100%">
			<FormControl isRequired>
				<FormLabel htmlFor="name">Name</FormLabel>
				<Input
					id="name"
					type="text"
					placeholder="Example: Aurora Near"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="symbol">Symbol</FormLabel>
				<Input id="symbol" type="symbol" placeholder="Example: aNear" />
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="tokensupply">Token Supply</FormLabel>
				<Input
					id="tokensupply"
					type="number"
					placeholder="Example: 100"
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel htmlFor="decimals">Decimals</FormLabel>
				<Input id="decimals" type="text" placeholder="Example: 18" />
			</FormControl>
			<Button>Create Token</Button>
		</VStack>
	);
}

export default CreateTokenForm;
