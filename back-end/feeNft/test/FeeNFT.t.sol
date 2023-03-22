// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../src/FeeNFT.sol";
import { PRBTest } from "@prb/test/PRBTest.sol";
import { StdCheats } from "forge-std/StdCheats.sol";
import { console2 } from "forge-std/console2.sol";

contract FeeNFTTest is PRBTest, StdCheats {
  FeeNFT public feeNft;
  string tokenUriActivated = "ipfs://QmSiMZHGoymC9SGS9RV9zwfJZRKC5d8ppP3UpLsAJwcJwU";

  string tokenUriInactive = "ipfs://QmWod8a7qEaGTY2ckxagHsKqodrNc1isBur8fDx94crt2P";
  uint256 mintLimit = 1000;
  uint256 mintFee = 100000000000000;
  uint256 subscriptionFee = 10000000000000;
  uint256 subscriptionTime = 2419200;
  address bob = address(0x01);
  address alice = address(0x02);
  address eve = address(0x03);

  function setUp() public {
    feeNft = new FeeNFT(mintLimit, mintFee, subscriptionFee, subscriptionTime, tokenUriActivated, tokenUriInactive);

    vm.startPrank(bob);
    vm.deal(bob, 1 ether);
    uint256 limit = feeNft.mint{ value: 0.0001 ether }();
  }

  function test_Minting() external {
    address owner = feeNft.ownerOf(0);

    assertEq(bob, owner);
  }

  function test_fullTransfer() external {
    assertFalse(feeNft.getIsActivated(0));
    feeNft.payFee{ value: 0.00001 ether }(0);
    assertTrue(feeNft.getIsActivated(0));
    feeNft.transferFrom(bob, alice, 0);
    address newOwner = feeNft.ownerOf(0);
    assertNotEq(newOwner, bob);
    assertEq(newOwner, alice);
    assertFalse(feeNft.getIsActivated(0));
  }

  function test_URIS() external {
    assertFalse(feeNft.getIsActivated(0));
    assertEq(feeNft.tokenURI(0), tokenUriInactive);
    feeNft.payFee{ value: 0.00001 ether }(0);
    assertTrue(feeNft.getIsActivated(0));
    assertEq(feeNft.tokenURI(0), tokenUriActivated);
    feeNft.transferFrom(bob, alice, 0);
    address newOwner = feeNft.ownerOf(0);
    assertNotEq(newOwner, bob);
    assertEq(newOwner, alice);
    assertFalse(feeNft.getIsActivated(0));
    assertEq(feeNft.tokenURI(0), tokenUriInactive);
  }

  function test_deactivationWithTime() external {
    assertFalse(feeNft.getIsActivated(0));
    uint256 time0 = block.timestamp;

    feeNft.payFee{ value: 0.00001 ether }(0);
    assertTrue(feeNft.getIsActivated(0));
    //change time and check true before time
    console2.log(time0);
    vm.warp(2419100);
    uint256 time1 = block.timestamp;
    console2.log(time1);
    assertTrue(feeNft.getIsActivated(0));

    vm.warp(2419202);
    uint256 time2 = block.timestamp;
    console2.log(time2);
    assertFalse(feeNft.getIsActivated(0));
    assertEq(feeNft.tokenURI(0), tokenUriInactive);
  }
  /// @dev Test that fuzzes an unsigned integer.
  //function testFuzz_Example(uint256 x) external {
  //vm.assume(x != 0);
  //assertGt(x, 0);
  //}

  /// @dev Test that runs against a fork of Ethereum Mainnet. You need to set `API_KEY_ALCHEMY` in your environment
  /// for this test to run - you can get an API key for free at https://alchemy.com.
  //function testFork_Example() external {
  //string memory alchemyApiKey = vm.envOr("API_KEY_ALCHEMY", string(""));
  //// Silently pass this test if the user didn't define the API key.
  //if (bytes(alchemyApiKey).length == 0) {
  //return;
  //}

  //// Run the test normally, otherwise.
  //vm.createSelectFork({ urlOrAlias: "mainnet", blockNumber: 16_428_000 });
  //address usdc = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
  //address holder = 0x7713974908Be4BEd47172370115e8b1219F4A5f0;
  //uint256 actualBalance = IERC20(usdc).balanceOf(holder);
  //uint256 expectedBalance = 196_307_713.810457e6;
  //assertEq(actualBalance, expectedBalance);
  //}
}
