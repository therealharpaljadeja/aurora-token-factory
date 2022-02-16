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
	Text,
	Link,
	useDisclosure,
} from "@chakra-ui/react";
import CreateTokenForm from "./components/CreateTokenForm";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Context } from "./context/Web3Context";
import ConnectWallet from "./components/ConnectWallet";
import { TokenFactoryContext } from "./context/TokenFactoryContext";
import InteractTokenForm from "./components/InteractTokenForm";
import CreateNFTForm from "./components/CreateNFTForm";
import InteractWithNFT from "./components/InteractWithNFT";

function App() {
	const web3Context = useContext(Web3Context);
	const tokenFactoryContext = useContext(TokenFactoryContext);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { wallet, chainId, isMetamaskInstalled, account, addTokenToWallet } =
		web3Context;
	const { tokenMetadata, setTokenMetadata } = tokenFactoryContext;

	function modalClose() {
		setTokenMetadata(null);
		onClose();
	}

	return (
		<div className="App">
			<Modal isOpen={chainId !== undefined && chainId !== "1313161555"}>
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
						<Link href="https://metamask.io/" target="_blank">
							<Button>Install Metamask</Button>
						</Link>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{tokenMetadata ? (
				<Modal onClose={modalClose} isCentered isOpen={true}>
					<ModalOverlay />
					<ModalContent alignItems="center">
						<ModalHeader>Token Created</ModalHeader>
						<ModalBody>
							<Heading size="2xl" mb={5}>
								${tokenMetadata.symbol}
							</Heading>
							<Link
								href={`https://explorer.testnet.aurora.dev/address/${tokenMetadata.address}/transactions`}
								textAlign="center"
								target="_blank"
							>
								<Text>View On Explorer</Text>
							</Link>
						</ModalBody>
						<ModalFooter>
							<Button
								onClick={() => addTokenToWallet(tokenMetadata)}
							>
								Add to Metamask
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : null}
			<Router>
				<Header />
				<VStack padding={5} margin="auto" mt="20px" width="100%">
					<Routes>
						<Route
							exact
							path="/"
							element={
								account ? (
									<CreateTokenForm />
								) : (
									<ConnectWallet />
								)
							}
						/>
						<Route
							exact
							path="/interact"
							element={
								account ? (
									<InteractTokenForm />
								) : (
									<ConnectWallet />
								)
							}
						/>
						<Route
							exact
							path="/erc721"
							element={
								account ? <CreateNFTForm /> : <ConnectWallet />
							}
						/>
						<Route
							exact
							path="/interactnft"
							element={
								account ? (
									<InteractWithNFT />
								) : (
									<ConnectWallet />
								)
							}
						/>
					</Routes>
				</VStack>
			</Router>
		</div>
	);
}

export default App;
