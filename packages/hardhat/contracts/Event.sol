// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";


/// @custom:security-contact nicolas.guasca@gmail.com
contract Event is Initializable, ERC1155Upgradeable, ERC1155BurnableUpgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    // address public contractAddress;
    // An address type variable is used to store ethereum accounts.

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() initializer public {
        __ERC1155_init("ipfs://{id}.json");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();
        __ERC1155Burnable_init();

    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    /*
   * @notice Mint _amount of tokens of a given id
   * @param _to      The address to mint tokens to
   * @param _id      Token id to mint
   * @param _amount  The amount to be minted
   * @param _data    Data to pass if receiver is contract
   */
    function createToken(uint256 amount, bytes memory data)
        public
        onlyOwner returns (uint)
    {
        address marketplaceAddress = msg.sender;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId, amount, data);
        setApprovalForAll(marketplaceAddress, true);
        return newItemId;
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function reduceSupply(address account, uint256 id, uint256 amount)
        public
        onlyOwner
        {
        burn(account, id, amount);
    }

    function reduceSuppleBatch(address account, uint256[] memory ids, uint256[] memory values)
        public
        onlyOwner
        {
        burnBatch(account, ids, values);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}