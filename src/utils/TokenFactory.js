import { Contract } from "ethers";

export function createTokenWithSigner(token, contract) {
	await contract.createToken(token);
}

export function getTokens(contract) {
	return await contract.getTokens();
}

export function getTokenMetadataUsingAddress(address) {
	let tokenContract = new Contract();
	let token = {
		name: await tokenContract.name(),
		symbol: await tokenContract.symbol(),
		totalSupply: await tokenContract.totalSupply(),
		decimals: await tokenContract.decimals(),
		owner: await tokenContract.owner(),
	};
	return token;
}

export function getTokensCreatedByAddress(address) {
	let tokens = await contract.tokenCreatedByAddress();
	return tokens;
}

export async function deployContract(wallet) {
	let signer = wallet.getSigner();
	const TokenFactory = new ContractFactory(ERC20.abi, ERC20.bytecode, signer);
	await TokenFactory.deploy();
}
