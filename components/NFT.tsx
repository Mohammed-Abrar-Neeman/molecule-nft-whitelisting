import React, { useEffect, useState } from 'react';

const NFTs = () => {
  let [users, setUsers] = useState([]);

  const uri =
    'https://api.nftport.xyz/v0/accounts/' +
    '0x93df203b8da82d57113709015d0a9e08a1615df9' +
    '?chain=polygon&include=metadata';

  const getNfts = async () => {
    fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '1f1075fe-a75a-4310-bcaf-06c353302ec8',
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.nfts);
        setUsers(data.nfts);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getNfts();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font h-screen overflow-y-auto overflow-x-auto">
        {uri}
        <div className="container mx-auto bg-white p-4 lg:p-12 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl bg-purple-50 p-4 lg:p-12">
              <div className="flex items-center text-purple-500">
                <p className="text-sm font-bold uppercase">
                  Feature 7 & Feature 8
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <div className="mt-12 h-40 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {users.map((currlem: any) => {
            if (currlem.file_url != '') {
              return (
                <div className="p-4 lg:w-1/4 md:w-1/2">
                  <div className="h-full flex flex-col items-center text-center">
                    <img
                      alt="team"
                      className="flex-shrink-0 rounded-lg w-full h-80 object-cover object-center mb-4"
                      key={currlem.token_id}
                      src={currlem.file_url}
                    />
                    <div className="w-full ">
                      <h2
                        className="title-font font-normal text-lg text-black"
                        key={currlem.token_id}
                      >
                        {currlem.name}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </>
  );
};

export default NFTs;
