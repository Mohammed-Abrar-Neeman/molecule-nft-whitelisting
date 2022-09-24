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

export default function Minting() {
  const { account, active, chainId } = useWeb3React();
  const { ethereumProvider } = useEthereumProvider();
  const { createTable, writeQuery, readQuery } = useTableland();
  // const { CONTRACT_ADDRESS, METADATA_URI, METADATA_IMG } = useNftPort();

  const [message, setMessage] = useState('');
  const [connErrMsg, setConnErrMsg] = useState('');
  const [totalContracts, setTotalContracts] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');
  const [listToken, setListToken] = useState([]);
  const [listTokenName, setListTokenName] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [showTokenList, setShowTokenList] = useState(false);
  const [whiteListRequest, setWhiteListRequest] = useState([]);
  const [mintedTokenStatus, setMintedTokenStatus] = useState('');
  const [selectedContract, setSelectedContract] = useState('');

  const [formData, setFormData] = useState();
  const [checked, setChecked] = useState([]);
  const [formData1, setFormData1] = useState();
  const [checked1, setChecked1] = useState([]);
  const [showList, setShowList] = useState(true);

  const tURI = 'QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7';
  const tableName = 'molecule_nft_whitelisting_user_request_80001_2040';

  useEffect(() => {
    setFormData(new FormData());
    setFormData1(new FormData());
  }, []);

  const handleToggle = (c, address) => () => {
    // return the first index or -1
    console.log('inside handletoggle c', c);
    console.log('inside handletoggle', checked.indexOf(c));
    console.log('address', address);
    console.log('before checked', checked);
    const clickedCategory = checked.indexOf(c);
    const clickedCategory1 = checked1.indexOf(address);
    console.log('before clickedCategory', clickedCategory);
    const all = [...checked];
    const all1 = [...checked1];
    console.log('clickedCategory', clickedCategory);
    console.log('all before', all);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    if (clickedCategory1 === -1) {
      all1.push(address);
    } else {
      all1.splice(clickedCategory1, 1);
    }
    console.log('all after', all);
    console.log(all.length);
    setChecked(all);
    setChecked1(all1);
    console.log(checked);
    console.log(checked.length);
    formData.set('Selected Address', all);

    formData1.set('Selected Address', all1);

    console.log(typeof formData);
  };

  async function connectTableland(item) {
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

      const { columns, rows } = await tableland.read(
        `SELECT * FROM ${tableName};`
      );

      console.log(columns);
      console.log(rows);

      console.log(typeof item);
      var str = '';
      for (var k in item) {
        if (item.hasOwnProperty(k)) {
          str += item[k].toString();
        }
      }
      console.log(str);
      const contract = "'" + str.toString() + "'";
      console.log(typeof contract);
      console.log('abrar', contract);
      const query1 = await tableland.read(
        `SELECT * FROM ${tableName} WHERE ca = ${contract} and metadata = 'pending' ;`
      );

      console.log(query1);
      console.log(typeof query1);
      setWhiteListRequest(query1.rows);
      console.log('whiteListRequest' + query1.rows);
      //setShowTable(true);
      const query2 = await tableland.read(
        `SELECT address FROM ${tableName} WHERE ca = ${contract} ;`
      );
      console.log(query2);
      setSuccessMsg(
        'Request sent for whitelisting! please wait till whitelisted'
      );
      setIsPending(false);
      setShowTable(true);
    }
  }

  async function updateTableland(item, contracts) {
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

      const { columns, rows } = await tableland.read(
        `SELECT * FROM ${tableName};`
      );

      console.log(columns);
      console.log(rows);

      console.log('item inside updatetable', item);
      console.log(typeof item);

      var str = '';
      for (var k in item) {
        if (item.hasOwnProperty(k)) {
          str += item[k].toString();
        }
      }
      console.log(str);
      const contract = "'" + projectConfig.address + "'";
      console.log(typeof contract);
      console.log(contract);

      // item.map(async (item: any, index: any) => {
      //   console.log('item inside map', item);
      //   const insertRes = await tableland.write(
      //     `UPDATE  ${tableName} SET metadata = 'minted' WHERE id =${item} ;`
      //   );
      //   console.log(insertRes);
      // });

      //var names: any = [];
      for (var token in item) {
        if (item.hasOwnProperty(token)) {
          const insertRes = await tableland.write(
            `UPDATE  ${tableName} SET metadata = 'minted' WHERE id =${item[token]} ;`
          );
          //const tokenNames = await contract.tokenName(item[token]);
          //names.push(tokenNames);
        }
      }
      // console.log(names, ' after for loop');
      // setListTokenName(names);
      // console.log(listTokenName, ' listTokenName after for loop');

      setShowTable(false);
      const query1 = await tableland.read(
        `SELECT * FROM ${tableName} WHERE ca = ${contract} and metadata = 'pending' ;`
      );

      console.log(query1);
      console.log(typeof query1);
      setShowTable(false);
      setWhiteListRequest(query1.rows);
      console.log('whiteListRequest' + query1.rows);
      const query2 = await tableland.read(
        `SELECT address FROM ${tableName} WHERE ca = ${contract} ;`
      );
      console.log(query2);
      connectTableland(selectedContract);
      setSuccessMsg(
        'Request sent for whitelisting! please wait till whitelisted'
      );
      setIsMinting(false);
      setIsPending(true);
    }
  }

  async function createContract() {
    setShowModal(false);
    if (account && ethereumProvider) {
      const totalContractCost = (
        projectConfig.mintCost * mintAmount
      ).toString();
      const totalWei = ethers.utils.parseEther(totalContractCost).toBigInt();
      setMessage('');
      setIsPending(true);
      try {
        const web3Provider = new ethers.providers.Web3Provider(
          ethereumProvider
        );
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          projectConfig.contractAddress,
          ABI,
          signer
        );

        const name = 'Test1';
        const symbol = 'symbol test1';
        const tokenURI =
          'https://ipfs.io/ipfs/QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7';
        //const tokenURI = MINTINGS[Math.floor(Math.random() * MINTINGS.length)];
        console.log('name', tokenName);
        console.log('symbol', tokenSymbol);
        console.log('tokenURI', tokenURI);
        const transaction = await contract.createContract(
          tokenName,
          tokenSymbol,
          tokenURI
        );
        setIsPending(false);
        setIsMinting(true);
        await transaction.wait();

        setMessage(`Yay! ${tokenName} contract successfully created`);
        await fetchTotalContracts();
      } catch (error) {
        console.error(error);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    if (!active) {
      setConnErrMsg('Not connected to your wallet.');
      setShowModal(false);
    } else {
      if (chainId !== projectConfig.chainId) {
        setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
        setShowModal(false);
      } else {
        setShowModal(false);
        setConnErrMsg('');
        setIsPending(true);
        setSuccessMsg('');
        setMessage('');
        fetchTotalContracts();
      }
    }
  }, [account, active, chainId]);

  async function fetchTotalContracts() {
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
      console.log(contract.totalDeployedContracts(account));
      setTotalContracts(
        (await contract.totalDeployedContracts(account)).toString()
      );
      console.log('totalContracts' + totalContracts);

      console.log(await contract.listToken(account));
      const tokenIds = await contract.listToken(account);
      console.log(typeof tokenIds);
      setListToken(tokenIds);
      console.log(tokenIds.toString() + 'tokenIds');
      console.log(listToken.toString() + 'listToken');
      console.log(typeof listToken);

      // const tokens: any = [];
      // {
      //   listToken.length > 0 &&
      //     listToken.map(async (item: any, index: any) => {
      //       const tokenNames = await contract.tokenName(item);
      //       console.log(typeof tokenNames);

      //       tokens.push(tokenNames);
      //       console.log(tokenNames.toString() + 'tokenNames');
      //       console.log(listTokenName.toString() + 'listTokenName');
      //       console.log(typeof listTokenName);
      //     });
      // }
      // console.log(tokens + 'tokens final');
      // setListTokenName(tokens);
      // console.log(listTokenName + 'listTokenName final');

      // var names: any = [];
      // for (var token in listToken) {
      //   if (listToken.hasOwnProperty(token)) {
      //     const tokenNames = await contract.tokenName(listToken[token]);
      //     names.push(tokenNames);
      //   }
      // }
      // console.log(names, ' after for loop');
      // setListTokenName(names);
      // console.log(listTokenName, ' listTokenName after for loop');

      setIsPending(false);
      setIsMinting(false);
      setShowTokenList(true);
    }
  }

  async function mint() {
    setShowModal(false);
    if (account && ethereumProvider) {
      const totalContractCost = (
        projectConfig.mintCost * mintAmount
      ).toString();
      const totalWei = ethers.utils.parseEther(totalContractCost).toBigInt();
      setMessage('');
      setIsPending(true);
      try {
        const web3Provider = new ethers.providers.Web3Provider(
          ethereumProvider
        );
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          projectConfig.contractAddress,
          ABI,
          signer
        );
        console.log('selectedContract' + selectedContract);
        console.log(typeof selectedContract);
        console.log(typeof formData);
        // console.log(JSON.stringify(...formData));
        // console.log('formData convert' + typeof JSON.stringify(...formData));
        if (formData) {
        }
        for (let [name, account] of formData) {
          console.log(account);
          console.log(typeof account); // key1 = value1, then key2 = value2
          console.log(selectedContract);
          console.log(typeof selectedContract);
          const transaction = await contract.mintToken(
            selectedContract,
            account
          );
          console.log(transaction);
          console.log(typeof transaction);
          setIsPending(false);
          setIsMinting(true);
          await transaction.wait();
          let id = [];
          for (let [name, account] of formData1) {
            id.push(account);
            updateTableland(id, selectedContract);
          }
        }
      } catch (error) {
        console.error(error);
        setIsPending(false);
      }
    }
  }

  async function bulkMint() {
    setShowModal(false);
    if (account && ethereumProvider) {
      const totalContractCost = (
        projectConfig.mintCost * mintAmount
      ).toString();
      const totalWei = ethers.utils.parseEther(totalContractCost).toBigInt();
      setMessage('');
      setIsPending(true);
      try {
        const web3Provider = new ethers.providers.Web3Provider(
          ethereumProvider
        );
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          projectConfig.contractAddress,
          ABI,
          signer
        );
        console.log('selectedContract' + selectedContract);
        console.log(typeof selectedContract);
        console.log(typeof formData);
        console.log(JSON.stringify(...formData));
        console.log('formData convert' + typeof JSON.stringify(...formData));

        let accounts = [];
        console.log(typeof accounts);
        for (let [name, account] of formData) {
          console.log(account);
          console.log(typeof account); // key1 = value1, then key2 = value2
          console.log(selectedContract);
          console.log(typeof selectedContract);

          accounts = account.split(',');
          console.log('modified a ', accounts);

          console.log(accounts);
          console.log(typeof accounts);
        }
        const transaction = await contract.bulkMintToken(
          selectedContract,
          accounts
        );
        console.log(transaction);
        console.log(typeof transaction);
        setIsPending(false);
        setIsMinting(true);
        await transaction.wait();
        let id = [];
        for (let [name, account] of formData1) {
          console.log('for loop id', account);
          id = account.split(',');
          console.log('modified id', id);
          updateTableland(id, selectedContract);
        }
      } catch (error) {
        console.error(error);
        setIsPending(false);
      }
    }
  }

  return (
    <>
      <Layout>
        <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
          <div className="">
            {/* <div className="flex flex-col justify-center items-center">
              <div
                id="toast-warning"
                className="flex items-center justify-center text-center p-4 w-full max-w-4xl text-sidebar_text font-normal font-titans_fw_500 bg-gray-200 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
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
                  </svg>
                  <span className="sr-only">Warning icon</span>
                </div>
                <div className="ml-3 text-sm font-normal text-center">
                  Please make sure you are connected to the correct address and
                  the correct network ({projectConfig.networkName}).
                </div>
              </div>
            </div> */}
            {active && !connErrMsg ? (
              <>
                {isPending || isMinting ? (
                  <div className="flex flex-col justify-center items-center">
                    <button
                      type="button"
                      className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_text font-bold w-60 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
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
                    {totalContracts > 0 && !showTable ? (
                      <div className="relative">
                        <button
                          type="button"
                          className={`absolute top-4 right-10 rounded px-4 py-2 bg-white font-normal border border-sidebar_text text-sidebar_text w-40 font-titans_fw_500 justify-center items-center text-center`}
                          onClick={() => setShowModal(true)}
                        >
                          Add Contracts
                        </button>
                        <div className=" flex  ">
                          <div className=" m-10 w-full ">
                            {/* {totalContracts} */}

                            {listToken.length > 0 &&
                              listToken.map((item, index) => {
                                return (
                                  <>
                                    <p
                                      key={index}
                                      onClick={() => {
                                        connectTableland({ item });
                                        setShowTable(false);
                                        setShowList(false);
                                        setSelectedContract(item.toString());
                                      }}
                                      className="mt-5 w-full border-solid border-orange-500 p-4 shadow-xl  border rounded cursor-pointer"
                                    >
                                      {item}
                                    </p>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {isPending ? (
                          <button
                            type="button"
                            className="flex justify-center items-center rounded px-4 py-2 bg-red-700 font-bold w-40 cursor-not-allowed"
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
                          <>
                            {
                              !showTable ? (
                                <div className="flex flex-col justify-center items-center mt-24">
                                  <img
                                    className=""
                                    src="createcontract.svg"
                                  ></img>
                                  <button
                                    className="h-10 w-1/4 center font-weight:900 text-auto font-titans_fw_600 font-auto text-2xl rounded-lg text-xl  bg-orange-500 text-white "
                                    onClick={() => setShowModal(true)}
                                  >
                                    Create Contract
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="overflow-x-auto relative shadow-md relative mt-2">
                                    <button
                                      className=" -mb-1 text-white font-normal rounded-t-lg bg-sidebar_text font-titans_fw_500 border border-sidebar_text uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                      type="button"
                                      onClick={() => {
                                        setShowTable(false);
                                        setChecked([]);
                                      }}
                                    >
                                      Close
                                    </button>

                                    {checked.length > 0 ? (
                                      <>
                                        <button
                                          type="button"
                                          className={`absolute top-1 right-0 rounded px-4 py-2 bg-white font-normal border border-sidebar_text text-sidebar_text w-40 font-titans_fw_500 justify-center items-center text-center cursor-not-allowed`}
                                        >
                                          {checked.length + ' selected'}
                                        </button>
                                      </>
                                    ) : null}

                                    {checked.length > 0 ? (
                                      <>
                                        {checked.length == 1 ? (
                                          <>
                                            <button
                                              className=" rounded mb-0 text-sidebar_text font-normal font-titans_fw_500 border border-sidebar_text uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                              type="button"
                                              onClick={() => {
                                                mint();
                                                setShowTable(false);
                                                setShowList(false);

                                                setChecked([]);
                                              }}
                                            >
                                              Mint
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className=" rounded mb-0 text-sidebar_text font-normal font-titans_fw_500 border border-sidebar_text uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                              type="button"
                                              onClick={() => {
                                                bulkMint();
                                                setShowTable(false);
                                                setShowList(false);

                                                setChecked([]);
                                              }}
                                            >
                                              Bulk Mint
                                            </button>
                                          </>
                                        )}
                                      </>
                                    ) : null}

                                    <div className="overflow-x-auto relative shadow-md ">
                                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-md font-bold font-titans_fw_500 text-white uppercase bg-sidebar_text dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                            <th
                                              scope="col"
                                              className="py-3 px-6"
                                            >
                                              Select
                                            </th>
                                            <th
                                              scope="col"
                                              className="py-3 px-6"
                                            >
                                              Contarct
                                            </th>
                                            <th
                                              scope="col"
                                              className="py-3 px-6"
                                            >
                                              Address
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {whiteListRequest.length > 0 ? (
                                            whiteListRequest.map((data, i) => {
                                              return (
                                                <>
                                                  <tr
                                                    key={data}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                                                  >
                                                    <td className="py-4 px-6">
                                                      <div className="flex items-center">
                                                        <input
                                                          onChange={handleToggle(
                                                            data[3],
                                                            data[0]
                                                          )}
                                                          id="checkbox-table-search-1"
                                                          type="checkbox"
                                                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                        />
                                                        <label
                                                          htmlFor="checkbox-table-search-1"
                                                          className="sr-only"
                                                        >
                                                          checkbox
                                                        </label>
                                                      </div>
                                                    </td>
                                                    <th
                                                      scope="row"
                                                      className="py-4 px-6 font-bold text-black font-titans_fw_400 whitespace-nowrap dark:text-white"
                                                    >
                                                      {data[1]}
                                                    </th>
                                                    <td className="py-4 px-6 font-bold text-black font-titans_fw_400">
                                                      {data[3]}
                                                    </td>
                                                  </tr>
                                                </>
                                              );
                                            })
                                          ) : (
                                            <>
                                              {' '}
                                              <thead>
                                                <div className="text-2xl text-sidebar_text font-titans_fw_600 font-bold uppercase bg-gray-50 text-center justify-center">
                                                  No request for whitelisting
                                                </div>
                                              </thead>
                                            </>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </>
                              )
                              // <button
                              //   type="button"
                              //   className={`rounded px-4 py-2 bg-blue-700 font-bold w-40`}
                              //   onClick={() => setShowModal(true)}
                              // >
                              //   Create Contract
                              // </button>
                            }
                          </>
                          // <button
                          //   type="button"
                          //   className={`rounded px-4 py-2 bg-blue-700 font-bold w-40`}
                          //   onClick={() => setShowModal(true)}
                          // >
                          //   Create Contract
                          // </button>
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
                        className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_text font-bold w-80 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
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

          {/* {successMsg && <h2>{successMsg}</h2>}

          {message && (
            <div className="text-green-500 text-center">{message}</div>
          )} */}
          {/* {connErrMsg && (
            <div className="text-red-500 text-center">{connErrMsg}</div>
          )} */}
        </div>

        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative p-1 w-[600px] h-[300px]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="authentication-modal"
                    onClick={() => setShowModal(false)}
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
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="py-6 px-6 lg:px-8">
                    <h3 className="mb-4 text-titans_molecule_text font-normal font-titans_fw_500 text-[#222A3A] dark:text-white text-center">
                      Add Address list
                    </h3>
                    <form className="space-y-6" action="#">
                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Token Name"
                          required
                          onChange={(e) => setTokenName(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Token Symbol"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          onChange={(e) => setTokenSymbol(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Token URI"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          onChange={(e) => setTokenURI(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className=" bg-sidebar_text w-full text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={createContract}
                      >
                        Create Contract
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Create contract</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                        x
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Token Name
                      </label>
                      <input
                        onChange={(e) => setTokenName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        required
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Symbol
                      </label>
                      <input
                        onChange={(e) => setTokenSymbol(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        required
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        TokenURI
                      </label>
                      <input
                        onChange={(e) => setTokenURI(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        required
                      />
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={createContract}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </>
        ) : null}
        {/* <div className="bg-white">{checked.length}</div>

        {checked.length > 0 ? (
          <>
            {checked.length == 1 ? (
              <>
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={mint}
                >
                  Mint
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={bulkMint}
                >
                  Bulk Mint
                </button>
              </>
            )}
          </>
        ) : null} */}

        {/* {showTable ? (
          <>
           
            <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
              <div className="flex flex-col justify-center items-center">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <button
                    className={` top-8 right-10 rounded px-4 py-2 bg-white font-normal border border-sidebar_text text-sidebar_text w-40 font-titans_fw_500 justify-center items-center text-center`}
                    type="button"
                    onClick={() => setShowTable(false)}
                  >
                    Close
                  </button>

                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Select
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Contarct
                        </th>
                        <th scope="col" className="py-3 px-6">
                          MetaData
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Address
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {whiteListRequest.length > 0 ? (
                        whiteListRequest.map((data: any, i: any) => {
                          return (
                            <>
                              <tr key={data}>
                                <td>
                                  <input
                                    onChange={handleToggle(data[3], data[0])}
                                    type="checkbox"
                                    className="mr-2"
                                  />
                                </td>
                                <th>{data[1]} </th>
                                <td>{data[2]} </td>
                                <td>{data[3]} </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <>
                          {' '}
                          <tr>
                            <div> No request for whitelist</div>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : null} */}
      </Layout>
    </>
  );
}
