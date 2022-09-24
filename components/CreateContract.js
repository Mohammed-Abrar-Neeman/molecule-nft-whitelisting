import { useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import Sidebar from '../components/Sidebar';

const CreateContract = () => {
  return (
    <>
      <div class="container mx-auto bg-white p-4 lg:p-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="overflow-hidden rounded-2xl bg-blue-50 p-4 lg:p-12">
            <div class="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125"></div>
          </div>

          <div class="overflow-hidden rounded-2xl bg-pink-50 p-4 lg:p-12">
            <div class="flex items-center text-pink-500"></div>

            <div class="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125"></div>
          </div>

          <div class="overflow-hidden rounded-2xl bg-green-50 p-4 lg:p-12">
            <div class="flex items-center text-green-500"></div>

            <div class="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125"></div>
          </div>

          <div class="overflow-hidden rounded-2xl bg-purple-50 p-4 lg:p-12">
            <div class="flex items-center text-purple-500">
              <p class="text-sm font-bold uppercase">Feature 7 & Feature 8</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
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

            <div class="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-125"></div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center mt-24">
        <img className="" src="createcontract.svg"></img>
        <button className="h-10 w-1/4 center font-weight:900 text-auto font-titans_fw_600 font-auto text-2xl rounded-lg text-xl  bg-orange-500 text-white ">
          Create Contract
        </button>
      </div> */}
    </>
  );
};

export default CreateContract;
