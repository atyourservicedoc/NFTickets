import { ethers, upgrades } from "hardhat";
import { event } from "../config";

const currentVersion = event;

async function main() {
  const Event = await ethers.getContractFactory("Event");
  const event = await upgrades.upgradeProxy(currentVersion, Event);
  console.log("Event upgraded and proxied through:", event.address);
}

main();
