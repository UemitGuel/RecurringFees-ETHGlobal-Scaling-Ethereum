// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error FeeNft__NeedMoreETHSent();
error FeeNft__TransferFailed();
error FeeNFT__NoLongerMintable();

contract FeeNFT is ERC721URIStorage, Ownable {
  string internal s_activatedUri;
  string internal s_notActivatedUri;
  uint256 private s_tokenCounter;
  uint256 private immutable i_mintLimit;
  uint256 private immutable i_mintFee;
  uint256 private immutable i_subscriptionFee;
  uint256 private immutable i_time;
  mapping(uint256 => uint256) s_validUntil;

  event Deactivated(uint256 indexed tokenId, address indexed from, uint256 indexed timestamp);
  event FeePayed(uint256 indexed tokenId, address indexed payer, uint256 indexed timestamp);

  constructor(
    uint256 mintLimit,
    uint256 mintFee,
    uint256 monthlyFee,
    uint256 subscriptionTime,
    string memory activatedUri,
    string memory inactiveUri
  ) ERC721("feeNft", "FEE") {
    i_mintLimit = mintLimit;
    i_mintFee = mintFee;
    i_subscriptionFee = monthlyFee;
    i_time = subscriptionTime;
    s_activatedUri = activatedUri;
    s_notActivatedUri = inactiveUri;
    s_tokenCounter = 0;
  }

  function mint() public payable returns (uint256) {
    if (msg.value < i_mintFee) {
      revert FeeNft__NeedMoreETHSent();
    }
    if (s_tokenCounter >= i_mintLimit) {
      revert FeeNFT__NoLongerMintable();
    }
    uint256 newItemId = s_tokenCounter;
    s_tokenCounter = s_tokenCounter + 1;
    _safeMint(_msgSender(), newItemId);
    return newItemId;
  }

  function payFee(uint256 tokenId) public payable {
    if (msg.value < i_subscriptionFee) revert FeeNft__NeedMoreETHSent();

    s_validUntil[tokenId] = block.timestamp + i_time;
    emit FeePayed(tokenId, msg.sender, block.timestamp);
  }

  function transferFrom(address from, address to, uint256 tokenId) public override {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");

    _transfer(from, to, tokenId);
    s_validUntil[tokenId] = block.timestamp - 1;

    emit Deactivated(tokenId, from, block.timestamp);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
    _safeTransfer(from, to, tokenId, data);
    s_validUntil[tokenId] = block.timestamp - 1;

    emit Deactivated(tokenId, from, block.timestamp);
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public override {
    safeTransferFrom(from, to, tokenId, "");
  }

  function withdraw() public onlyOwner {
    uint256 amount = address(this).balance;
    (bool success, ) = payable(_msgSender()).call{ value: amount }("");
    if (!success) {
      revert FeeNft__TransferFailed();
    }
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    _requireMinted(tokenId);

    if (block.timestamp <= s_validUntil[tokenId]) {
      return s_activatedUri;
    } else {
      return s_notActivatedUri;
    }
  }

  function getValidUntil(uint256 tokenId) public view returns (uint256) {
    return s_validUntil[tokenId];
  }

  function getIsActivated(uint256 tokenId) public view returns (bool) {
    return s_validUntil[tokenId] >= block.timestamp;
  }

  function getMintFee() public view returns (uint256) {
    return i_mintFee;
  }

  function getSubscriptionFee() public view returns (uint256) {
    return i_subscriptionFee;
  }

  function getSubscriptionTime() public view returns (uint256) {
    return i_time;
  }

  function getMintLimit() public view returns (uint256) {
    return i_mintLimit;
  }

  function getTokenCounter() public view returns (uint256) {
    return s_tokenCounter;
  }
}
