const hre = require("hardhat");

async function main() {
	const AuroraTokenFactory = await hre.ethers.getContractFactory(
		"AuroraTokenFactory"
	);
	const tokenFactory = await AuroraTokenFactory.deploy();

	await tokenFactory.deployed();

	console.log("TokenFactory deployed to:", tokenFactory.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
