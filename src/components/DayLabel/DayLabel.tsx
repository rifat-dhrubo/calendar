import React from 'react';

type Props = {
  short?: boolean;
  date: Date;
};
const names = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'] as const;
const DayLabel: React.FC<Props> = ({ short = false, date }) => {
  const currentDate = new Date().getDate();
  if (short)
    return (
      <div>
        <div className="flex flex-col items-center pt-2 pb-3">
          {names[date.getDay()][0]}
          <span
            className={`flex items-center justify-center w-8 h-8 mt-1 font-semibold text-gray-900 ${
              currentDate === date.getDate()
                ? 'bg-violet-600 text-white rounded-full'
                : null
            }`}
          >
            {date.getDate()}
          </span>
        </div>
      </div>
    );
  else
    return (
      <div className="flex items-center justify-center py-3">
        <span>
          {names[date.getDay()]}{' '}
          <span
            className={` ${
              currentDate === date.getDate()
                ? ' p-1 ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 font-semibold text-white'
                : 'items-center justify-center font-semibold text-gray-900'
            }`}
          >
            {date.getDate()}
          </span>
        </span>
      </div>
    );
};

export default DayLabel;
