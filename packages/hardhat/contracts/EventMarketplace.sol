// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";



import "hardhat/console.sol";

contract EventMarketplace is ReentrancyGuardUpgradeable, OwnableUpgradeable, ERC1155HolderUpgradeable {
  using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter private _itemIds;
  CountersUpgradeable.Counter private _itemsSold;
  

  constructor() initializer {}
    
  function initialize(uint256 listingPrice, address payable owner) initializer public {
    // __ERC1155HolderUpgradeable_init("ipfs://{id}.json");
    __ReentrancyGuard_init();
    __Ownable_init();
    __ERC1155Holder_init();
  }

  mapping(uint256 => EventItem) private idToEventItem;

  event EventItemCreated (
      uint indexed itemId,
      address indexed nftContract,
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );
    
  struct EventItem {
    uint itemId;
    address nftContract;
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

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }
  
  /* Places an item for sale on the marketplace */
  function createEventItem(
    uint256 itemId,
    address nftContract,
    uint256 tokenId,
    uint256 price,
    string promoterBrandSymbol,
    uint256 ticketCount,
    uint256 ticketSold,
    uint256 ticketRemaining
  ) public payable nonReentrant {
    owner = payable(msg.sender);
    require(price > 0, "Ticket price must be at least 1 wei");
    require(msg.value == listingPrice, "Price must be equal to listing price");
    transferOwnership(msg.sender);
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
  
    idToMarketItem[itemId] =  EventItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false,
      promoterBrandSymbol,
      ticketCount,
      ticketSold,
      ticketRemaining
    );

    IERC1155(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createMarketSale(
    address nftContract,
    uint256 itemId
    ) public payable nonReentrant {
    uint price = idToMarketItem[itemId].price;
    uint tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToMarketItem[itemId].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
  }

  /* Returns all unsold market items */
  function fetchMarketItems() public view returns (EventItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    EventItem[] memory items = new EventItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns onlyl items that a user has purchased */
  function fetchMyNFTs() public view returns (EventItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    EventItem[] memory items = new EventItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  /* Returns only items a user has created */
  function fetchItemsCreated() public view returns (EventItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    EventItem[] memory items = new EventItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
