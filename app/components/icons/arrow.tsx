import React, { FC } from 'react';

const Icon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M11.982 6.25H6.25v-2.5h10v10h-2.5V8.018l-7.866 7.866-1.768-1.768 7.866-7.866z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default React.memo(Icon);
