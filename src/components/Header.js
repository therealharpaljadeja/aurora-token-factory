import { useContext } from "react";
import { HStack, Heading, Spacer, Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";
import ConnectWallet from "./ConnectWallet";

function Header() {
	const web3Context = useContext(Web3Context);
	const { account } = web3Context;

	return (
		<HStack
			justifyContent="center"
			height="65px"
			px={5}
			py={3}
			boxShadow="base"
		>
			<Heading size="md" mr="50px">
				AuroraTokenFactory
			</Heading>
			<HStack spacing={5}>
				<Link to="/">Create Token</Link>
				<Link to="/erc721">Create Token (ERC-721)</Link>
				<Link to="/interact">Interact With Token</Link>
				<Link to="/interactnft">Interact With Token (ERC-721)</Link>
			</HStack>
			<Spacer />
			{account ? (
				<Tag>{`${account.substr(0, 5)}...${account.substr(
					-5,
					5
				)}`}</Tag>
			) : (
				<ConnectWallet />
			)}
		</HStack>
	);
}

export default Header;
