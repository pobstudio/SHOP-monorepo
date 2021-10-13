// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20Mintable.sol";
import "./Ownable.sol";
import "./utils/Strings.sol";

contract PosterCheckout is Ownable {
    using Strings for uint256;

    ERC20Mintable internal immutable payableErc20;
    address public treasury;

    mapping (uint256 => uint256) public prices;
    uint256 public orderNum = 0;
    bool public inStock = true;

    event PosterOrderReceived(
      address indexed _customerWallet, 
      uint _orderNum,
      address _collection, 
      uint256 _tokenid
    );

    constructor (
      address _payableErc20,
      address _treasury
    ) {
      payableErc20 = ERC20Mintable(_payableErc20);
      treasury = _treasury;
    }

    function setTreasury(address _treasury) public onlyOwner {
      treasury = _treasury;
    }

    function setPrice(uint256 _price, uint256 _index) public onlyOwner {
      prices[_index] = _price;
    }

    function setInStock(bool _inStock) public onlyOwner {
      inStock = _inStock;
    }

    function buy(uint256 _priceIndex, address _collection, uint256 _tokenid) public {
      // ensure approval and conditions are met
      require(inStock, "Not purchasable");
      require(payableErc20.allowance(_msgSender(), address(this)) >= prices[_priceIndex], "Allowance not set to mint");
      require(payableErc20.balanceOf(_msgSender()) >= prices[_priceIndex], "Not enough token to mint");
      // transfer payableERC20
      payableErc20.transferFrom(_msgSender(), treasury, prices[_priceIndex]);
      // increment order count
      orderNum += 1;
      // emit order details
      emit PosterOrderReceived(_msgSender(), orderNum, _collection, _tokenid);
    }
}