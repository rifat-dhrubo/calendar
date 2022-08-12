import React from 'react';

type Props = {
  startTime: number;
  endTime: number;
  day: number;
};

const FreeTime: React.FC<Props> = ({ startTime, endTime, day }) => {
  const startTimeString =
    startTime > 12 ? `${12 - startTime}pm` : `${startTime} am`;
  const endTimeString = endTime > 12 ? `${12 - endTime}pm` : `${endTime} am`;
  return (
    <li
      className="relative flex mt-px sm:col-start-3 "
      style={{
        gridRow: `${Number(startTime) + 2} / span ${
          Number(endTime) - Number(startTime)
        }`,
        gridColumn: `${day} / span 1`,
      }}
    >
      <div className="absolute flex flex-col px-2 py-0.5 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-blue-50 hover:bg-blue-100 ">
        <p className="order-1 font-semibold text-blue-700">Free</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          {startTimeString} - {endTimeString}
        </p>
      </div>
    </li>
  );
};

export default FreeTime;
