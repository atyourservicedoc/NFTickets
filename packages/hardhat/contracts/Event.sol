// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

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
    address public _owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}
  struct EventItem {
    uint itemId;
    // address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
    string eventName; 
    string promoterBrandSymbol;
    uint256 ticketCount;
    uint256 ticketSold;
    uint256 ticketRemaining;
  }

  event EventItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

    mapping(uint256 => EventItem) private idToEventItem;


    // address public promoter;

    function initialize(address marketplaceAddress) initializer public {
        __ERC1155_init("ipfs://{id}.json");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();
        __ERC1155Burnable_init();
        // bytes32 marketplaceAddress;
        // uint256 ticketTotal;
        // contractAddress = marketplaceAddress;
        // // string public ticketURI;
        // bytes32 ticketHash;
    }

// IMPLEMENTED INSIDE createEvent
    // function setURI(string memory newuri) public onlyOwner {
    //     _setURI(newuri);
    // }

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
    function createEvent(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        uint256 newItemId = _tokenIds.current();
        _mint(account, id, amount, "");
        // EventItem memory newItem = EventItem(
        //     newItemId,
        //     id,
        //     account,
        //     account,
        //     amount,
        //     false,
        //     "",
        //     "",
        //     amount,
        //     0,
        //     amount
        // );    
        }

//     function createEvent(string memory tokenURI) public returns (uint) {
//     _tokenIds.increment();
//     uint256 newItemId = _tokenIds.current();

//     _mint(msg.sender, newItemId);
//     _setTokenURI(newItemId, tokenURI);
//     setApprovalForAll(contractAddress, true);
//     return newItemId;
// }

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