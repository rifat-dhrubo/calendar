import React from "react";

type Props = {
  children: React.ReactNode;
};

const TimeLabel: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default TimeLabel;
