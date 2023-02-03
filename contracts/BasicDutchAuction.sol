// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract BasicDutchAuction {
    uint256 public reservePrice;
    uint256 public numBlocksAuctionOpen;
    uint256 public offerPriceDecrement;
    uint256 public startsAt;
    uint256 public initialPrice;
    uint256 public currentPrice;
    uint256 public auctionEndBlock;
    uint256 public winBid;
    address payable public owner;
    address public winner;
    bool public auctionEnded;

    constructor(uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement) payable{
        reservePrice = _reservePrice;
        numBlocksAuctionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        initialPrice = reservePrice + numBlocksAuctionOpen*offerPriceDecrement;
        startsAt = block.number;
        auctionEndBlock = block.number + numBlocksAuctionOpen;
        currentPrice = initialPrice;
        owner = payable(msg.sender);
 

        auctionEnded = false;
  

    }



    function bid() external payable returns (address) {

        require(auctionEnded == false, "Auction has ended");
        require(block.number < auctionEndBlock, "Auction has ended");
        updatePrice();
        require(msg.value >= currentPrice, "Bid is lower than current price");
        require(winner == address(0), "Auction has already been won");
        winner = msg.sender;
        owner.transfer(msg.value);
        auctionEnded = true;
        winBid = msg.value;
        return winner;

    }


    function updatePrice() internal {
        if (block.number >= auctionEndBlock) {
            auctionEnded = true;
            return;
        }
        currentPrice = initialPrice - (offerPriceDecrement * (block.number - startsAt));
    }


    /*function refundBid() public payable{
        require(auctionEnded == false, "Auction is ended");
        require(msg.sender != winner, "Winner cannot request refund");
        payable(msg.sender).transfer(msg.value);
    }*/

}

