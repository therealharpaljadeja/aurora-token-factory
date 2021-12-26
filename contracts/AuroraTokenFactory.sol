pragma solidity ^0.8.0;
import "./ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AuroraTokenFactory {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;
    mapping(address => address) tokenToOwner;
    address[] tokens;

    constructor() {}

    struct Token {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 decimals;
    }

    event TokenCreated(
        string indexed name,
        string indexed symbol,
        uint256 indexed totalSupply
    );

    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals
    ) external returns (address) {
        ERC20 token = new ERC20(name, symbol, totalSupply, decimals);
        tokenToOwner[address(token)] = msg.sender;
        _tokenCounter.increment();
        tokens.push(address(token));
        emit TokenCreated(name, symbol, totalSupply);
        return address(token);
    }

    function tokenCreatedByAddress() external view returns (address[] memory) {
        uint256 resultLength = 0;
        for (uint256 i = 0; i < _tokenCounter.current(); i++) {
            if (tokenToOwner[tokens[i]] == msg.sender) {
                resultLength++;
            }
        }

        uint256 currentIndex = 0;
        address[] memory result = new address[](resultLength);
        for (uint256 i = 0; i < _tokenCounter.current(); i++) {
            if (tokenToOwner[tokens[i]] == msg.sender) {
                result[currentIndex] = tokens[i];
                currentIndex++;
            }
        }

        return result;
    }
}
