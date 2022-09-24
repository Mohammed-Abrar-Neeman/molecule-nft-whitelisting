import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEthereumProvider } from '../hooks/useEthereumProvider';
import rpcConfig from '../config/rpcConfig';
import projectConfig from '../config/projectConfig';

const Tokens = () => {
  let [items, setItems] = useState([]);
  const { account, active, chainId } = useWeb3React();
  const { ethereumProvider } = useEthereumProvider();
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

  const uri =
    'https://api.covalenthq.com/v1/1/address/0x93df203b8da82d57113709015d0a9e08a1615df9/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_d452e85367ae400b874ea3bdd3b';
  const getTokens = async () => {
    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.items);
        setItems(data.data.items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    if (!active) {
      setConnErrMsg('Not connected to your wallet.');
    } else {
      if (chainId !== projectConfig.chainId) {
        setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
      } else {
        setConnErrMsg('');
        setIsPending(true);
        getTokens();
      }
    }
  }, [account, active, chainId]);

  return (
    <>
      {/* <section className="h-screen text-gray-600 body-font overflow-y-auto">
        <div className="container mx-auto overflow-y-auto overflow-x-auto">
          {items.map((curlem) => {
            return (
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="h-full flex  border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={curlem.logo_url}
                    />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        {curlem.contract_ticker_symbol}
                      </h2>
                      <p className="text-gray-500">
                        {curlem.balance /
                          Math.pow(10, curlem.contract_decimals)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section> */}
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-12">
        {items.map((curlem: any) => {
          return (
            <div className="relative">
              <div className="px-2">
                <div className="flex h-8 w-full rounded-t-lg border-b-2 border-gray-900 bg-[#CBD2E0] pl-[90px] shadow-lg">
                  <small className="my-auto items-center text-xs font-normal tracking-tight text-black">
                    {curlem.contract_ticker_symbol}
                  </small>
                </div>
              </div>
              <div className="flex h-12 w-full rounded-lg bg-[#2D3648] pl-[98px] shadow-xl">
                <small className="my-auto text-lg font-bold text-white">
                  {curlem.balance / Math.pow(10, curlem.contract_decimals)}
                </small>
              </div>
              <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                <img
                  className="rounded-full object-cover object-center"
                  src={curlem.logo_url}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tokens;
