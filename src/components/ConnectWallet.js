import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { Button } from "@chakra-ui/react";

function ConnectWallet() {
	const web3Context = useContext(Web3Context);
	const { connect, connectingAccount, signer } = web3Context;

	return (
		<Button onClick={connect} isLoading={connectingAccount}>
			Connect Wallet
		</Button>
	);
}

export default ConnectWallet;
