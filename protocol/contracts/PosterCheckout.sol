// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20Mintable.sol";
import "./Ownable.sol";
import "./utils/Strings.sol";

contract PosterCheckout is Ownable {

    ERC20Mintable internal immutable payableErc20;
    address public treasury;

    struct PosterProduct { 
      string id; // PRINT_PAPER_HASH | PRINT_FRAME_HASH | PRINT_PAPER_LONDON | PRINT_FRAME_LONDON
      uint256 price;
      bool inStock;
    }

    event PosterOrderReceived(
      address indexed _customerWallet, 
      uint _orderNum,
      address _collection, 
      uint256 _tokenid,
      string orderDetails
    );

    mapping (uint256 => PosterProduct) public products;
    uint256 public orderNum = 0;

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

    function setProduct(uint256 _index, PosterProduct memory _product) public onlyOwner {
      products[_index] = _product;
    }

    function setProductInStock(uint256 _index, bool _inStock) public onlyOwner {
      products[_index].inStock = _inStock;
    }

    function buy(uint256 _index, address _collection, uint256 _tokenid, string memory _orderDetails) public {
      PosterProduct memory product = products[_index];
      uint256 price = product.price;
      // ensure approval and conditions are met
      require(product.inStock, "Not purchasable");
      // require(payableErc20.allowance(_msgSender(), address(this)) >= price, "Allowance not set to mint");
      // require(payableErc20.balanceOf(_msgSender()) >= price, "Not enough token to mint");
      // transfer payableERC20
      payableErc20.transferFrom(_msgSender(), treasury, price);
      // increment order count
      orderNum += 1;
      // emit order details
      emit PosterOrderReceived(_msgSender(), orderNum, _collection, _tokenid, _orderDetails);
    }
}