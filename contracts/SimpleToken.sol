// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20, Ownable {

  using Address for address;

  constructor() ERC20("Simple Token", "SMT") {
    _mint(owner(), 1_000_000 * 1e18);
  }

  function mint(address receiver, uint256 amount) external onlyOwner {
    require(!receiver.isContract(), "The receiver can't be a contract");

    _mint(receiver, amount);
  }

}
