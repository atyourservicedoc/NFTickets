// import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("EventMarketplace");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log("EventMarketplace deployed at: ", marketAddress);

    const NFT = await ethers.getContractFactory("Event");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;
    console.log(
      `Event token contract deployed from: ${marketAddress} to ${nftContractAddress}`
    );

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");
    const itemsCount = 1000;
    const eventMock = "My frist event";
    const brandMock = "LTK";

    await nft.createToken("https://www.mytokenlocation.com", "");
    await nft.createToken("https://www.mytokenlocation2.com", "");

    await market.createEventItem(
      nftContractAddress,
      1,
      auctionPrice,
      itemsCount,
      eventMock,
      brandMock
    );
    await market.createEventItem(
      nftContractAddress,
      2,
      auctionPrice,
      itemsCount,
      eventMock,
      brandMock
    );

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createEventSale(nftContractAddress, 1, itemsCount);

    const items = await market.fetchEventItems();

    items = await Promise.all(
      items.map(async (i: item) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});
