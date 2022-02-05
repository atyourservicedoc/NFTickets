// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract EventMarketplace is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  
  address payable owner;
  uint256 listingPrice = 0.025 ether; //?
  constructor() {
    owner = payable(msg.sender);
    }
  struct EventItem {
    uint256 itemId; //?changed to uint256
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

  mapping(uint256 => EventItem) private idToEventItem;

  event saleComplete (
  uint256 id,
  address buyer,
  uint256 price
  );
  
  event EventItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller, 
    address owner, 
    uint256 price,
    bool sold
  );

  /* Returns the listing price of the contract */
  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }



  // THIS COMES FROM EVENT.SOL

  function createEventItem(
    address nftContract,
    uint256 tokenId,
    uint256 price,
    uint256 ticketCount,
    string memory eventName,
    string memory promoterBrandSymbol
    )
        public payable nonReentrant
    {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price to set must be equal to listing price"); 
       
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        // _mint(msg.sender, itemId, ticketCount, "");
        EventItem memory newEvent = EventItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            eventName,
            promoterBrandSymbol,
            ticketCount,
            0,
            ticketCount
        );
        idToEventItem[itemId] = newEvent;

        IERC1155Upgradeable(nftContract).safeTransferFrom(msg.sender, address(this), tokenId, ticketCount, ""); //?How is this address going to receive ERC1155s if it does not call onERC1155Received function?
        emit EventItemCreated(newEvent.itemId, newEvent.nftContract, newEvent.tokenId, msg.sender, address(0), price, false); //? what is the purpose of the owner being 0x0?
    }
  

  /* Creates the sale of a marketplace item */
  /* Transfers ownership of the item, as well as funds between parties */
  function createEventSale(
    address nftContract,
    uint256 itemId,
    uint256 amount
    ) public payable nonReentrant {
    uint price = idToEventItem[itemId].price;
    uint tokenId = idToEventItem[itemId].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");
    require(idToEventItem[itemId].sold == false); //?is this check necessary?
    idToEventItem[itemId].sold = true; //moved this to execute first
    idToEventItem[itemId].seller.transfer(msg.value);
    IERC1155Upgradeable(nftContract).safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
    idToEventItem[itemId].owner = payable(msg.sender);
    
    idToEventItem[itemId].ticketSold += amount;
    idToEventItem[itemId].ticketRemaining = idToEventItem[itemId].ticketCount - idToEventItem[itemId].ticketSold;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
    emit saleComplete(tokenId, msg.sender, price); //?added this event
  }

  /* Returns all unsold Event items */
  function fetchEventItems() public view returns (EventItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    EventItem[] memory items = new EventItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToEventItem[i + 1].owner == address(0)) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToEventItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

//   /* Returns onlyl items that a user has purchased */
  function fetchMyNFTs() public view returns (EventItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToEventItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    EventItem[] memory items = new EventItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToEventItem[i + 1].owner == msg.sender) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToEventItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

//   /* Returns only items a user has created */
  function fetchItemsCreated() public view returns (EventItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToEventItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    EventItem[] memory items = new EventItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToEventItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        EventItem storage currentItem = idToEventItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
