import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";



describe("BasicDutchAuction", function () {

  async function deployDutchAuctionFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const dutchAuctionFactory = await ethers.getContractFactory("BasicDutchAuction");
    const dutchAuction = await dutchAuctionFactory.connect(owner).deploy(100, 10, 10);

    return { dutchAuction,owner, otherAccount};

  }

  describe("BasicDutchAuction Deployment", function () {

    

    it("testing the bid functionality", async function() {
      const { dutchAuction, owner, otherAccount } = await loadFixture(deployDutchAuctionFixture);
      await dutchAuction.bid({value: 220});
    })

    it("testing the Win Bid amount", async function() {
      const { dutchAuction, owner, otherAccount } = await loadFixture(deployDutchAuctionFixture);

      await dutchAuction.bid({value: 220});

      expect(await dutchAuction.winBid()).to.equal(220);


    })

    it("testing the Auction End", async function() {
      const { dutchAuction, owner, otherAccount } = await loadFixture(deployDutchAuctionFixture);

      await dutchAuction.bid({value: 220});


      expect(await dutchAuction.auctionEnded()).to.equal(true);

    })

    it("testing if winner address is correct after winning the bid", async function() {
      const { dutchAuction, owner, otherAccount } = await loadFixture(deployDutchAuctionFixture);

      await dutchAuction.bid({value: 220});

      expect(await dutchAuction.winner()).to.equal(owner.address);


    })


    /*it("Testing the decrement Price functionality", async function() {
      const { dutchAuction, owner, otherAccount } = await loadFixture(deployDutchAuctionFixture);

      await dutchAuction.decrementPrice();

      expect(await dutchAuction.currentPrice()).to.equal(190);
    })*/

 
    
  
  });
});
