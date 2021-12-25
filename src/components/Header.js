import {
	HStack,
	Heading,
	Button,
	Spacer,
	useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
	// const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack px={5} py={3} boxShadow="base">
			<Heading size="md" mr="50px">
				AuroraTokenFactory
			</Heading>
			<HStack spacing={5}>
				<Link to="/">Create Token</Link>
				<Link to="/interact">Interact With Token</Link>
			</HStack>
			<Spacer />
			{/* <Button onClick={toggleColorMode} variant="base">
				{colorMode === "light" ? "Dark" : "Light"}
			</Button> */}
			<Button>Connect Wallet</Button>
		</HStack>
	);
}

export default Header;
