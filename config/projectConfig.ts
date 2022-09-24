const projectConfig = {
  nftName: 'Molecule',

  nftSymbol: 'MOLECULE',

  maxSupply: 100,

  maxMintAmountPerTxn: 10,

  mintCost: process.env.NODE_ENV === 'production' ? 0.01 : 0.01,

  networkName:
    process.env.NODE_ENV === 'production'
      ? 'Mumbai Testnet' // 'Ethereum Mainnet'
      : 'Mumbai Testnet', // 'Rinkeby Testnet'

  chainName: 'MATIC', // 'ETH'

  chainId: process.env.NODE_ENV === 'production' ? 80001 : 80001, // Ethereum (1), Rinkeby (4)

  siteDomain: 'www.yourdomain.com',

  siteUrl:
    process.env.NODE_ENV === 'production'
      ? `http://localhost:3000`
      : 'http://localhost:3000',

  openseaCollectionUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://opensea.io/collection/your_opensea_collection_name'
      : 'https://testnets.opensea.io/collection/your_opensea_collection_name',

  contractAddress:
    process.env.NODE_ENV === 'production'
      ? '0xf1DFF4ed1ab2F3609454051DC4451bCeFB78f6C8'
      : '0xf1DFF4ed1ab2F3609454051DC4451bCeFB78f6C8',

  scanUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://mumbai.polygonscan.com/address/0xD1b8A007Af1B82b95C7A871bB037992A214685a5'
      : 'https://mumbai.polygonscan.com/address/0xD1b8A007Af1B82b95C7A871bB037992A214685a5',
  // 'https://etherscan.io/address/your_ethereum_contract_address'
  // 'https://rinkeby.etherscan.io/address/your_rinkeby_contract_address'

  address:
    process.env.NODE_ENV === 'production'
      ? '0x6C903A86E0C6972502Cf98B4e552632B5cDd4436'
      : '0x6C903A86E0C6972502Cf98B4e552632B5cDd4436',
};

export default projectConfig;
