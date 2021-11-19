// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC20Mintable.sol";
import "../Ownable.sol";
import "../utils/Strings.sol";

contract PrintServiceV2 is Ownable {

  event PrintOrderReceived(
    uint indexed _orderId,
    bytes32 indexed _orderHash,
    uint256 _productId,
    address _collection, 
    uint256 _tokenId
  );

  address payable public treasury;
  uint256 public orderId;

  struct Product { 
    string id;
    uint256 price;
    bool inStock;
  }

  mapping (uint256 => mapping (uint256 => Product)) public productConfig;
  mapping (uint256 => address payable) public currencyConfig;

  constructor (
    address payable _treasury,
    uint256 _orderId
  ) {
    treasury = _treasury;
    orderId = _orderId;
  }

  function setTreasury(address payable _treasury) public onlyOwner {
    treasury = _treasury;
  }

  function setCurrencyConfig(uint256 _currencyIndex, address payable _currency) public onlyOwner {
    currencyConfig[_currencyIndex] = _currency;
  }

  function setProductConfig(uint256 _currencyIndex, uint256 _productIndex, Product memory _product) public onlyOwner {
    productConfig[_currencyIndex][_productIndex] = _product;
  }

  function buy(uint256 _currencyIndex, uint256 _productIndex, address _collection, uint256 _tokenId, bytes32 _orderHash) public payable {
    address payable currency = currencyConfig[_currencyIndex];
    Product memory product = productConfig[_currencyIndex][_productIndex];
    uint256 price = product.price;

    require(product.inStock, "Out of stock");

    if (_currencyIndex == 0) { // if ETH
      uint256 amountPaid = msg.value;
      require(price <= msg.value, "Insufficient payment"); // ensure enough payment
      treasury.call{value: price }(""); // transfer ETH to Treasury
      msg.sender.call{value: amountPaid - price}(""); // transfer any overpayment back to payer
    } else { // is ERC20
      require(ERC20Mintable(currency).allowance(_msgSender(), address(this)) >= price, "Insufficient allowance");
      require(ERC20Mintable(currency).balanceOf(_msgSender()) >= price, "Insufficient balance");
      ERC20Mintable(currency).transferFrom(_msgSender(), treasury, price); // transfer ERC20
    }
    
    orderId += 1;
    emit PrintOrderReceived(orderId, _orderHash, _productIndex, _collection, _tokenId);
  }
}