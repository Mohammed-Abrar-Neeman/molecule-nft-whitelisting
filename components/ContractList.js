import { useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';

import Sidebar from '../components/Sidebar';

const ContractList = () => {
  const items = [0, 1, 2, 3, 4];
  return (
    <>
      <div className=" flex  ">
        <div className=" m-10 w-full ">
          {items.map((value, item) => (
            <div id="accordion-collapse" data-accordion="collapse">
              <div
                id="accordion-collapse-body-3"
                class="hidden"
                aria-labelledby="accordion-collapse-heading-3"
              >
                <div class="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
                  <p className="mt-5 w-full border-solid border-orange-500 p-2 shadow-xl  border">
                    0xE2a8228FA011D3FA574dCB9d898d81A09C96C3Bf
                  </p>
                </div>
              </div>
              <h2 id="accordion-collapse-heading-3">
                <button
                  type="button"
                  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  data-accordion-target="#accordion-collapse-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-3"
                >
                  <span>0xE2a8228FA011D3FA574dCB9d898d81A09C96C3Bf</span>
                  <svg
                    data-accordion-icon
                    class="w-6 h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContractList;
