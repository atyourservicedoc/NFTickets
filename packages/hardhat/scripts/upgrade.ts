import { ethers, upgrades } from "hardhat";
import { event } from "../config";

const currentVersion = event;

async function main() {
  const EventV2 = await ethers.getContractFactory("EventV2");
  const event = await upgrades.upgradeProxy(currentVersion, EventV2);
  console.log("Event Proxy upgraded to:", event.address);
}

main();
