pragma solidity ^0.8.0;

contract MyNFT {
  // NFT properties (name, description, etc.)
  string public name;
  string public description;
  // ...

  // Total supply of NFTs (optional)
  uint256 public totalSupply;
  // Current number of minted NFTs
  uint256 public mintedCount;

  // Mapping to store owner of each NFT (tokenId => address)
  mapping(uint256 => address) public ownerOf;

  constructor(string memory _name, string memory _description, uint256 _totalSupply) {
    name = _name;
    description = _description;
    totalSupply = _totalSupply; // Set total supply if applicable
  }

  // Function to mint an NFT (payable if there's a price)
  function mintNFT(address to) public {
    // Restrict minting based on total supply (if applicable)
    require(mintedCount < totalSupply, "NFT mint limit reached");
    // Mint the NFT and assign ownership
    mintedCount++;
    balanceOf[to] = mintedCount;
    ownerOf[mintedCount] = to;
  }
}
