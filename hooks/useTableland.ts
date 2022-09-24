import { connect } from '@tableland/sdk';
import { ethers } from 'ethers';
import type { ExternalProvider } from '@ethersproject/providers';

export const TABLE_NAME = 'mmtable_80001_513';

export type ROW_TYPE = {
  id: number;
  ca: string;
  metadata: string;
  address: string;
};

export default function useTableland() {
  const getConnection = async (ethereumProvider: ExternalProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner();

    console.log('signer', signer);

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain
    const tableland = await connect({
      network: 'testnet',
      chain: 'polygon-mumbai',
      signer: signer,
    });
    console.log('table connection', tableland);
    return tableland;
  };

  const createTable = async (ethereumProvider: ExternalProvider) => {
    const tableland = await getConnection(ethereumProvider);
    console.log('tt', tableland);
    const { name } = await tableland.create(
      `id int, ca text, metadata text, address text, primary key (id)`, // Table schema definition
      {
        prefix: `my_table`, // Optional `prefix` used to define a human-readable string
      }
    );
    console.log('table name', name);

    return { name };
  };

  const writeQuery = async (
    ethereumProvider: ExternalProvider,
    tableName: string,
    data: ROW_TYPE
  ) => {
    const connection = await getConnection(ethereumProvider);
    console.log('tt', connection);

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain

    const writeRes = await connection.write(
      `INSERT INTO ${tableName} (id, ca, metadata, address) VALUES (${data.id}, '${data.ca}', '${data.metadata}', '${data.address}');`
    );
    console.log(writeRes);
    return writeRes;
  };

  const readQuery = async (
    ethereumProvider: ExternalProvider,
    tableName: string
  ) => {
    const connection = await getConnection(ethereumProvider);
    console.log('tt', connection);

    // Connect to the Tableland testnet (defaults to Goerli testnet)
    // @return {Connection} Interface to access the Tableland network and target chain

    const readRes = await connection.read(`SELECT * FROM ${tableName};`);
    console.log(readRes);
    return readRes;
  };

  return { createTable, writeQuery, readQuery };
}
