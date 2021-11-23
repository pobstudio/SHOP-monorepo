// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../ERC20Mintable.sol";
import "../Ownable.sol";
import "../utils/Strings.sol";

contract PrintServiceEth is Ownable {

    address payable public treasury;
    uint256 public orderId = 0;

    struct Product { 
      string id;
      uint256 price;
      bool inStock;
    }
    mapping (uint256 => Product) public products;

    event PrintOrderReceived(
      uint indexed _orderId,
      bytes32 indexed _orderHash,
      uint256 _productId,
      address _collection, 
      uint256 _tokenId
    );

    constructor () { }

    function setTreasury(address payable _treasury) public onlyOwner {
      treasury = _treasury;
    }

    function setProduct(uint256 _index, Product memory _product) public onlyOwner {
      products[_index] = _product;
    }

    function setProductInStock(uint256 _index, bool _inStock) public onlyOwner {
      products[_index].inStock = _inStock;
    }

    function setProductPrice(uint256 _index, uint256 _price) public onlyOwner {
      products[_index].price = _price;
    }

    function buy(uint256 _productIndex, address _collection, uint256 _tokenId, bytes32 _orderHash) public payable {
      Product memory product = products[_productIndex];
      uint256 price = product.price;
      uint256 amountPaid = msg.value;
      // ensure approval and conditions are met
      require(product.inStock, "Product out of stock");
      // ensure enough balance
      require(price <= msg.value, "Insufficient payment");
      // transfer ETH to Treasury
      treasury.call{value: price }("");
      // transfer any overpayment back to payer
      msg.sender.call{value: amountPaid - price}("");
      // increment order count
      orderId += 1;
      // emit order details
      emit PrintOrderReceived(orderId, _orderHash, _productIndex, _collection, _tokenId);
    }
}