const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Aurora Token Factory Tests", function () {
	it("Should create a token and return its address", async function () {
		const TokenFactory = await ethers.getContractFactory(
			"AuroraTokenFactory"
		);
		const tokenFactory = await TokenFactory.deploy();
		await tokenFactory.deployed();

		const [firstSigner, secondSigner] = await ethers.getSigners();
		console.log(`Using ${secondSigner.address} to create token`);
		await tokenFactory
			.connect(secondSigner)
			.createToken("Test", "TST", 100, 18);

		let tokenCreatedBySigner = await tokenFactory
			.connect(secondSigner)
			.tokenCreatedByAddress();

		const ERC20 = await ethers.getContractFactory("ERC20");
		let token1 = ERC20.attach(tokenCreatedBySigner[0]);
		expect(await token1.name()).to.equal("Test");
		expect(await token1.symbol()).to.equal("TST");
		expect(await token1.totalSupply()).to.equal(100);
		expect(await token1.decimals()).to.equal(18);
	});
});
