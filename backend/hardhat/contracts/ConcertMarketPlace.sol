// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
//import counters
//import safemath
//import IERCstuff

contract ConcertMarketPlace is ERC1155, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    string public contractName;
    string public symbol;
    uint256 fee = 1 ether;
    
    uint256 ticketId;
    Counters.Counter private _itemIds;
    

    struct EventObject {
        uint256 id;
        string name;
        string description;
        uint256 totalSupply;
        uint256 supplyLeft;
        address owner;
        uint256 pricePerTicket;
        uint256 maxMintAmount;
        string baseURI;
    }

    struct SalesObject {
        uint256 withdrawnSoFar;
        uint256 totalRevenue;
    }

    mapping(uint256 => EventObject) private idToEventObject;
    mapping(uint256 => Counters.Counter) private idToSupplyCount;
    mapping(uint256 => SalesObject) private idToSalesObject;
    //buyers mapping (userAddress, eventId => totalTicketsBought)
    //Event[] public events;

    //salesObject {
    //    ticketsSold
    //    revenue
    //    withdrawn
    //}

    

    
    //mapping(uint id => salesObject) private idToSalesObject;
    
   

    event purchaseStarted (uint256 id, uint256 amount, address buyer);
    event purchaseFailed (uint256 id, uint256 amount, address buyer);
    event purchaseComplete (uint256 id, uint256 amount, address buyer, uint256 price);
    event EventObjectCreated (
        uint256 indexed id, 
        string name,
        string description,
        uint256 totalSupply,
        address indexed owner,
        uint256 pricePerTicket,
        uint256 maxMintAmount,
        string baseURI
        );
    
    
    
    constructor() ERC1155("") {
        contractName = "NFTickets";
        symbol = "NFT";
    }
//THIS FUNCTION WORKS
    function createEventObject ( 
        string memory name,
        string memory description,
        uint256 totalSupply,
        //address owner,
        uint256 pricePerTicket,
        uint256 maxMintAmount,
        string memory baseURI
    )
        external payable nonReentrant
    {
        require(name.length > 0, "Event must have name");
        require(description.length > 0, "Event must have description");
        require(totalSupply > 0, "Event must have 1 ticket to sell");
        require(pricePerTicket > 0, "Price must be at least 1 wei");
        require(maxMintAmount > 0, "Max tickets per order must be at least 1");
        require(msg.value == fee, "Must send create event fee at exact amount");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        EventObject memory newEvent = EventObject(
            itemId, 
            name,
            description,
            totalSupply,
            msg.sender,
            pricePerTicket,
            maxMintAmount,
            baseURI
        );

        SalesObject memory newSales = SalesObject(
            0,
            0
        );

        idToEventObject[itemId] = newEvent;
        idToSupplyCount[itemId] = salesObject;
        emit EventObjectCreated (
            itemId, 
            name,
            description,
            totalSupply,
            msg.sender,
            pricePerTicket,
            maxMintAmount,
            baseURI
        );
    }

//THIS FUNCTION DOESN"T WORK, FINISH REVERT ERROR MESSAGES TO FIND OUT WHY
    function buyTicket(uint256 id, uint amount) external payable nonReentrant {
        /*emit purchaseStarted (id, amount, msg.sender);
        if (amount < 0 || amount >= idToEventObject[id].maxMintAmount || supplyCount.current().add(amount) >= idToEventObject[id].totalSupply) {
            emit purchaseFailed (id, amount, msg.sender);
        }*/
        require(amount > 0, "amount gotta be larger than 0");
        require(amount <= idToEventObject[id].maxMintAmount, "can't buy more tickets than maxmintAmount");
        require(supplyCount.current().add(amount) <= idToEventObject[id].totalSupply, "purchase would buy more tickets than exist");
        require(msg.value == (idToEventObject[id].pricePerTicket * amount), "sent wrong amount of funds for minting tickets"); // Should I add this to if statement?
        _mint(msg.sender, id, amount, "");
        for (uint256 i = 0; i < amount; i++) {
            idToSupplyCount[id].increment();
        }
        idToSalesObject[id].totalRevenue += msg.value;
        emit purchaseComplete(id, amount, msg.sender, idToEventObject[id].pricePerTicket);
    }

    function getEvent(uint256 id) public view returns (EventObject) {
        return idToEventObject[id];
    }

    function getEvents(uint256 page, uint256 pageSize) public view returns (EventObject[]) {
        EventObject[pageSize] memory events;
        for (uint256 i = 0; i < pageSize; i++) {
            events.push(idToEventItem[(page*pageSize)+1])
        ;}
        return events;
    }


    function withdrawFunds(_id, withdrawAmount) external payable nonReentrant {
        require (idToEventObject[_id].owner == msg.sender, "Must be event creator");
        require (salesObject[_id].totalRevenue >= salesObject[_id].withdrawnSoFar + withdrawAmount, "Trying to withdraw more than you've made");
        salesObject[_id] = withdrawn + withdrawnAmount;
        //transfer(withdrawAmount)
        idToSalesObject[_id].withdrawnSoFar += withdrawAmount;
        //it's 2am I'll finish this tmr
    }

    
}