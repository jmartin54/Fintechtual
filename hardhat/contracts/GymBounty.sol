// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract GymBounty {

     constructor() {
         owner = payable(msg.sender);
         price30 = 30 * 3 ether; // deployed on MATIC
     }

    address payable public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "GymBounty: only owner");
        _;
    }

    uint public price30;
    function setPrice30(uint _price) onlyOwner external {
        price30 = _price *  30;
    }

    struct Commitment {
        bool commited;
        bool fulfilled;
        bool claimed; 
    }
    mapping (address => mapping( uint => Commitment)) public commitments; // user => day => commitment 
    mapping( uint => uint) public treasury; // day => totalBalance
    mapping (uint => uint) public fulfillments ; // day = > fullfilledCheckinCount
    function commit() payable external {
        require(msg.value > price30, "GymBounty: msg value too low");
        /* spread price30 over 30 days */
        // get next 30 days
        uint today = block.timestamp / 1 days;
        uint i = 1;

        require(!commitments[msg.sender][today + 1].commited, "GymBounty: you've already commit to the next few days. Comeback when your outstanding commitments expire.");
        // for day
        //      commitments[msg.sender][day].committed = true;
        //      treasury[day] += price30 / 30;
        while(i <= 30){ 
            uint day = today + i;
            commitments[msg.sender][day].commited = true;
            treasury[day] += price30 / 30;
        }
    }

    function fullfill() external {
        // commitments[msg.sender][today].fulfilled = true;
        uint today = block.timestamp / 1 days;
        if(!commitments[msg.sender][today].fulfilled){
            commitments[msg.sender][today].fulfilled = true;
            fulfillments[today] += 1;
        }
    }

    function withdraw() external {
        /* pull out last 30 days */
        // get last 30 days
        uint today = block.timestamp / 1 days;
        uint i = 1;
        // amount = 0
        uint amount = 0;
        // for day
        //      commit = commitments[msg.sender][day];
        //      if(commit.committed && commit.fulfilled && !commit.claimed)
        //          commitments[msg.sender][day].claimed = true;
        //          amount += treasury[day] / fulfillments[day];
        // 
        // if(amount > 0) msg.sender.transfer(amount);
        while(i <= 30){ 
            uint day = today - i;
            Commitment memory commitment = commitments[msg.sender][day];
            if(
                commitment.commited &&
                commitment.fulfilled && 
                !commitment.claimed
            ) {
                commitments[msg.sender][day].claimed = true;
                amount += treasury[day] / fulfillments[day];
            }
        }

        if (amount > 0 ) {
            payable(msg.sender).transfer(amount);
        }
    }

    function platformWithdraw() onlyOwner external { 
        /* withdraw funds older than 30 days */

        // get contract balance
        uint balance = address(this).balance;
        // get last 30 days
        uint today = block.timestamp / 1 days;
        uint i = 1;
        // for day
        //      balance -= treasury[day]
        while(i <= 30){ 
            uint day = today - i;
            balance -= treasury[day];
        }
        // owner.transfer(remaining balance)
        if(balance > 0) {
            owner.transfer(balance);
        }
    }

    function emergencyWithdraw() onlyOwner external {
        selfdestruct(owner);
    }

}