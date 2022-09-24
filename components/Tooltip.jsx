import React, { useState } from 'react';

export const Tooltip = ({ children, tooltipText }) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = '10px';
    tipRef.current.style.marginTop = '26px';
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = '10px';
    tipRef.current.style.marginTop = '26px';
  }
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!toggleCollapse ? (
        <>
          <div
            // className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-900 text-white px-4 py-2 rounded flex items-center transition-all duration-150 dark:text-light dark:bg-primary"
            className="absolute whitespace-no-wrap bg-gray-900 text-white px-4 py-2 rounded flex items-center transition-all duration-150 dark:text-light dark:bg-primary"
            style={{ left: '100%', opacity: 0 }}
            ref={tipRef}
          >
            <div
              className="bg-black h-3 w-3 absolute dark:bg-primary"
              style={{ left: '-6px', transform: 'rotate(45deg)' }}
            />
            {tooltipText}
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute whitespace-no-wrap bg-gray-900 text-white px-4 py-2 rounded flex items-center transition-all duration-150 dark:text-light dark:bg-primary"
            style={{ left: '100%', opacity: 0 }}
            ref={tipRef}
          >
            <div
              className="bg-black h-3 w-3 absolute dark:bg-primary"
              style={{ left: '-6px', transform: 'rotate(45deg)' }}
            />
            {tooltipText}
          </div>
        </>
      )}

      {children}
    </div>
  );
};
