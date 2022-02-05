// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Event = await ethers.getContractFactory("Event");
  const event = await upgrades.deployProxy(Event);

  await event.deployed();

  console.log("Event deployed to:", event.address);

  const EventMarketplace = await ethers.getContractFactory("EventMarketplace");
  const eventMarketplace = await EventMarketplace.deploy();

  await eventMarketplace.deployed();

  console.log("Event Marketplace deployed to:", eventMarketplace.address);

  const config = `
  export const event = "${event.address}"
  export const eventMarketplace = "${eventMarketplace.address}"
  `;

  const data = JSON.stringify(config);
  fs.writeFileSync("config.ts", JSON.parse(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
