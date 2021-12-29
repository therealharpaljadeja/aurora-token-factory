import { useContext } from "react";
import { Route } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";
import ConnectWallet from "./ConnectWallet";

function ProtectedRoute(props) {
	const web3Context = useContext(Web3Context);
	const { account } = web3Context;
	return account !== undefined ? (
		<Route {...props}>{props.children}</Route>
	) : (
		<ConnectWallet />
	);
}

export default ProtectedRoute;
