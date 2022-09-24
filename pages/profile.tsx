import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { IconContext } from 'react-icons';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import ABI from '../config/MoleculeFactoryV2.json';
import rpcConfig from '../config/rpcConfig';
import projectConfig from '../config/projectConfig';
import { useEthereumProvider } from '../hooks/useEthereumProvider';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { create } from 'domain';
import { Tooltip } from '../components/Tooltip';
import useTableland from '../hooks/useTableland';
import { connect } from '@tableland/sdk';

type ROW_TYPE = {
  id: number;
  ca: string;
  metadata: string;
  address: string;
};

export default function User() {
  const { account, active, chainId } = useWeb3React();
  const { ethereumProvider } = useEthereumProvider();
  const { createTable, writeQuery, readQuery } = useTableland();
  // const { CONTRACT_ADDRESS, METADATA_URI, METADATA_IMG } = useNftPort();

  const [message, setMessage] = useState('');
  const [connErrMsg, setConnErrMsg] = useState('');

  const [querystatus, setQueryStatus] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');

  const [showTable, setShowTable] = useState(false);

  const [showTokenList, setShowTokenList] = useState(false);

  const [selectedContract, setSelectedContract] = useState('');

  const [formData, setFormData] = useState('');

  const tURI = 'QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7';
  const tableName = 'molecule_nft_whitelisting_user_request_80001_2040';
  //const tableName = 'molecule_nft_whitelisting_request_80001_2211';

  async function connectTableland() {
    console.log('dd', 'enter');

    if (account && ethereumProvider) {
      const provider = new ethers.providers.Web3Provider(ethereumProvider);
      const signer = provider.getSigner();

      console.log('dd', signer);

      // Connect to the Tableland testnet (defaults to Goerli testnet)
      // @return {Connection} Interface to access the Tableland network and target chain
      const tableland = await connect({
        network: 'testnet',
        chain: 'polygon-mumbai',
        signer: signer,
      });

      const query = await tableland.read(`SELECT * FROM ${tableName};`);
      console.log(query);

      // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
      const insertRes = await tableland.write(
        //INSERT INTO table_id [ ( column_name [, ...] ) ] VALUES ({ expression } [, ...]);
        `INSERT INTO ${tableName} (id, ca, metadata, address) VALUES (${query.rows.length}, '${projectConfig.address}', 'pending', '${account}');`
      );
      console.log(insertRes);

      const { columns, rows } = await tableland.read(
        `SELECT * FROM ${tableName};`
      );

      console.log(columns);

      console.log(rows);

      setSuccessMsg(
        'Request sent for whitelisting! please wait till whitelisted'
      );
      setShowTable(true);
    }
  }

  useEffect(() => {
    if (!active) {
      setConnErrMsg('Not connected to your wallet.');
    } else {
      if (chainId !== projectConfig.chainId) {
        setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
      } else {
        setConnErrMsg('');
        setIsPending(true);
        queryStatuss();
      }
    }
  }, [account, active, chainId]);

  async function queryStatuss() {
    if (account && ethereumProvider) {
      const web3Provider = new ethers.providers.JsonRpcProvider(
        rpcConfig(process.env.NEXT_PUBLIC_ALCHEMY_KEY)
      );
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        projectConfig.contractAddress,
        ABI,
        web3Provider
      );
      console.log(web3Provider + 'provider');
      console.log(signer + 'signer');
      console.log(contract + 'contract');

      setQueryStatus(
        await contract.queryStatus(account, projectConfig.address)
      );

      console.log(await contract.queryStatus(account, projectConfig.address));

      setIsPending(false);
    }
  }

  return (
    <>
      <Layout>
        <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
          <div className="">
            {active && !connErrMsg ? (
              <>
                {isPending || isMinting ? (
                  <div className="flex flex-col justify-center items-center">
                    <button
                      type="button"
                      className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-60 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {isPending && 'Requesting'}
                      {isMinting && 'Creating'}
                      {!isPending && !isMinting && 'Processing'}
                    </button>
                  </div>
                ) : (
                  <>
                    {querystatus ? (
                      <div className="bg-white">
                        {querystatus}

                        <button
                          type="button"
                          className={`rounded px-4 py-2 bg-blue-700 font-bold w-40`}
                          onClick={connectTableland}
                        >
                          View Profile
                        </button>
                        <div className="flex flex-col justify-center items-center mt-24">
                          <img className="" src="thankyou.jpeg"></img>
                          <button className="h-10 w-1/4 text-center items-center justify-center mt-auto font-weight:900 text-auto font-titans_fw_600 font-auto  rounded-lg  bg-sidebar_user text-white ">
                            Thank you for subscribing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {isPending ? (
                          <button
                            type="button"
                            className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-40 cursor-not-allowed"
                          >
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {isPending && 'Pending'}
                          </button>
                        ) : (
                          <div className="flex flex-col justify-center items-center mt-24">
                            <img className="" src="createcontract.svg"></img>
                            <button
                              className="h-10 w-1/4 text-center font-weight:900 text-auto font-titans_fw_600 font-auto text-2xl rounded-lg text-xl  bg-sidebar_user text-white "
                              onClick={connectTableland}
                            >
                              Please subscribe
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {connErrMsg && (
                  <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
                    <div className="flex flex-col justify-center items-center">
                      <button
                        type="button"
                        className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-80 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>{' '}
                        {connErrMsg}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {successMsg && <h2>{successMsg}</h2>}

          {message && (
            <div className="text-green-500 text-center">{message}</div>
          )}
          {/* {connErrMsg && (
            <div className="text-red-500 text-center">{connErrMsg}</div>
          )} */}
        </div>
        {/* <div className="text-gray-400 mt-2">{account}</div>
        <div className="text-gray-400 mt-2">
          Please make sure you are connected to the correct address and the
          correct network ({projectConfig.networkName}).
        </div> */}
      </Layout>
    </>
  );
}
