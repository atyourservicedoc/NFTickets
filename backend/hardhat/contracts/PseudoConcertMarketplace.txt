// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ConcertMarketPlace is ERC1155 {


    struct Event {
        id,
        name,
        description,
        totalSupply,
        owner,
        pricePerTicket,
        URI,
    }

    salesObject {
        ticketsSold
        revenue
        withdrawn
    }

    Events mapping(id => EventObject);
    EventSales mapping(id => salesObject)
    buyers mapping (userAddress, eventId => totalTicketsBought)

    construct() {}

    addEvent(name, description, totalSupply, pricePerTicket, URI) {
        Events[events.length+1] = {params from input, owner: msg.sender}
    }

    getEvents(pageNumber, pageSize, searchQuery?(optional)) {
        Events.filter(contains(searchQuery))
        return Events[pageNumber * pageSize, ((pageNumber +1) * pageSize) -1]
    }

    getEvent(id) {
        return Event[id];
    }

    buyTicket(id, quantity) {
        emit purchase started
        if (quantity too much) {
            emit purchase failed
        }
        require(quantity isn't too much);
        _mint(msg.sender, id, quantity, '');
        buyers(userAddress, eventId) += quantity
        salesObject(id) = ticketsSold + quantity, revenue + quantity * (ticketPrice)
        emit purchase succeed
    }

    withdrawFunds(id, withdrawAmount) {
        require Events[id].owner === msg.sender
        require withdrawn + withdrawAmount <= revenue
        salesObject[id] = withdrawn + withdrawnAmount
        transfer(withdrawAmount)
    }

}
