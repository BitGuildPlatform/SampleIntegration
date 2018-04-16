pragma solidity ^0.4.20;

contract PLATPriceOracle {

  address admin;
  
  // How much Eth you get for 1 PLAT, multiplied by 10^18
  // Default value is the ICO price, make sure you update
  uint public ETHtoPLATratio = 12500000000000;
    
  function PLATPriceOracle() public {
    admin = msg.sender;
  }

  function updatePrice(uint _newRatio) public {
  	require(_newRatio > 0);
  	require(msg.sender == admin);
  	ETHtoPLATratio = _newRatio;
  }
}
