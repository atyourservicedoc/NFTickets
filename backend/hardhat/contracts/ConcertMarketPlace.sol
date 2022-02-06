
pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
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
    Counters.Counter private supplyCount;
    

    struct EventObject {
        uint256 id;
        string name;
        string description;
        uint256 totalSupply;
        address owner;
        uint256 pricePerTicket;
        uint256 maxMintAmount;
        string baseURI;
    }

    mapping(uint256 => EventObject) private idToEventObject;
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
        require(pricePerTicket > 0, "Price must be at least 1 wei");
        require(msg.value == fee, "Price to set must be equal to listing price");
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

        idToEventObject[itemId] = newEvent;
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
        //events[events.length+1] = {params from input, owner: msg.sender} //?
    }

//THIS FUNCTION DOESN"T WORK, FINISH REVERT ERROR MESSAGES TO FIND OUT WHY
    function buyTicket(uint256 id, uint amount) external payable nonReentrant {
        emit purchaseStarted (id, amount, msg.sender);
        if (amount < 0 || amount >= idToEventObject[id].maxMintAmount || supplyCount.current().add(amount) >= idToEventObject[id].totalSupply) {
            emit purchaseFailed (id, amount, msg.sender);
        }
        require(amount > 0, "amount gotta be larger than 0");
        require(amount <= idToEventObject[id].maxMintAmount);
        require(supplyCount.current().add(amount) <= idToEventObject[id].totalSupply);
        require(msg.value == (idToEventObject[id].pricePerTicket * amount)); // Should I add this to if statement?
        _mint(msg.sender, id, amount, "");
        //buyers(userAddress, eventId) += amount
        //salesObject(id) = ticketsSold + amount, revenue + amount * (ticketPrice)
        emit purchaseComplete(id, amount, msg.sender, idToEventObject[id].pricePerTicket);
    }


    //function withdrawFunds(id, withdrawAmount) external payable nonReentrant {
     //   require (idToEventObject[id].owner == msg.sender);
        
        //require withdrawn + withdrawAmount <= 
        //salesObject[id] = withdrawn + withdrawnAmount
        //transfer(withdrawAmount)
        //it's 2am I'll finish this tmr
    //}

    
}
