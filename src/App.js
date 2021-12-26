import { useContext } from "react";
import {
	VStack,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import CreateTokenForm from "./components/CreateTokenForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Context } from "./context/Web3Context";

function App() {
	const web3Context = useContext(Web3Context);
	const { chainId, isMetamaskInstalled } = web3Context;

	return (
		<div className="App">
			<Modal isOpen={chainId !== null && chainId !== "1313161555"}>
				<ModalOverlay />
				<ModalContent alignItems="center">
					<ModalHeader>Connected to Invalid Network</ModalHeader>
					<ModalBody>Please connect to Aurora Testnet</ModalBody>
				</ModalContent>
			</Modal>
			<Modal isOpen={isMetamaskInstalled === false}>
				<ModalOverlay />
				<ModalContent alignItems="center">
					<ModalHeader>Please Install Metamask</ModalHeader>
					<ModalFooter>
						<Button>Install Metamask</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Router>
				<Header />
				<VStack padding={5} margin="auto" mt="20px" width="600px">
					<Routes>
						<Route exact path="/" element={<CreateTokenForm />} />
						<Route
							exact
							path="/interact"
							element={<Heading>Interact With Token</Heading>}
						/>
					</Routes>
				</VStack>
			</Router>
		</div>
	);
}

export default App;
