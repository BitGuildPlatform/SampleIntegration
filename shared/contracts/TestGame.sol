pragma solidity ^0.4.2;

contract BitGuildToken { // implements ERC20Interface
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract Ownable {
  address public owner;

  function constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) public onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }
}

contract TestContract is Ownable {
    BitGuildToken public tokenContract;

    function constructor(address _tokenContract) public {
        tokenContract = BitGuildToken(_tokenContract);
    }

    function kill() public onlyOwner {
        tokenContract.transferFrom(this, msg.sender, tokenContract.balanceOf(this));
        selfdestruct(msg.sender);
    }

    function buyItem(bytes _id) public payable {
      require(msg.value != 0);
      require(_id.length != 0);
      _buyItem(_id)
    }

    function receiveApproval(address _sender, uint256 _value, BitGuildToken _tokenContract, bytes _extraData) public {
        require(_tokenContract == tokenContract);
        require(_tokenContract.transferFrom(_sender, address(this), _value));
        require(_extraData.length != 0);
        _buyItem(_extraData)
    }

    withdrawToken() public {

    }

    function _buyItem(bytes _id) private {
        // do something with item
    }

    function () external payable {
      revert();
    }
}
