/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

import DayLabel from './components/DayLabel/DayLabel';
import TimeLabel from './components/TimeLabel';
import getWeekDates from './lib/get-week';

// 24hr time array
const timeArray = [
  '12AM',
  '1AM',
  '2AM',
  '3AM',
  '4AM',
  '5AM',
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM',
  '9PM',
  '10PM',
  '11PM',
] as const;

function App() {
  const [count, setCount] = React.useState(0);

  const weekDates = React.useMemo(() => getWeekDates(new Date()), []);

  return (
    <div className="flex flex-col h-full">
      <header className="relative z-40 flex items-center justify-between flex-none px-6 py-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="2022-01">
            {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(
              new Date(),
            )}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="w-px h-6 ml-6 bg-gray-300" />
            <button
              type="button"
              className="px-4 py-2 ml-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
          </div>
          <div className="relative ml-6 md:hidden">
            <button
              type="button"
              className="flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500"
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open menu</span>

              <HiDotsHorizontal className="w-5 h-5" />
            </button>
            {/* Dropdown menu, show/hide based on menu state. Entering: "transition
            ease-out duration-100" From: "transform opacity-0 scale-95" To:
            "transform opacity-100 scale-100" Leaving: "transition ease-in
            duration-75" From: "transform opacity-100 scale-100" To: "transform
            opacity-0 scale-95" */}
            <div
              className="absolute right-0 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-0-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-0"
                >
                  Create event
                </a>
              </div>
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-1"
                >
                  Go to today
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col flex-auto overflow-auto bg-white">
        <div
          style={{ width: '165%' }}
          className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full"
        >
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {weekDates.map((date, index) => (
                <DayLabel date={date} short={true} />
              ))}
            </div>

            <div className="hidden grid-cols-7 -mr-px text-sm leading-6 text-gray-500 border-r border-gray-100 divide-x divide-gray-100 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDates.map((date, index) => (
                <DayLabel date={date} />
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 flex-none bg-white w-14 ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines  */}
              <div
                className="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
                style={{
                  gridTemplateRows: 'repeat(24, minmax(3.5rem, 1fr))',
                }}
              >
                <div className="row-end-1 h-7" />
                {timeArray.map((time) => (
                  <TimeLabel>{time}</TimeLabel>
                ))}
              </div>
              {/*  Vertical lines  */}
              <div className="hidden grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="w-8 col-start-8 row-span-full" />
              </div>
              {/* Events */}
              <ol
                className="grid grid-cols-1 col-start-1 col-end-2 row-start-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: '1.75rem repeat(24, minmax(0, 1fr)) auto',
                }}
              >
                <li
                  className="relative flex mt-px sm:col-start-3 "
                  style={{
                    gridRow: '22 / span 1',
                  }}
                >
                  <a
                    href="#"
                    className="absolute flex flex-col px-2 py-0.5 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-blue-50 hover:bg-blue-100 "
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      Breakfasta ad asd asd asd asd as
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                {/* <li className="relative flex mt-px sm:col-start-3" style="grid-row: 92 / span 30">
                <a href="#" className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-pink-50 hover:bg-pink-100">
                  <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                  <p className="text-pink-500 group-hover:text-pink-700"><time datetime="2022-01-12T07:30">7:30 AM</time></p>
                </a>
              </li>  */}
                {/* <li className="relative hidden mt-px sm:col-start-6 sm:flex" style="grid-row: 122 / span 24">
                <a href="#" className="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 bg-gray-100 rounded-lg group inset-1 hover:bg-gray-200">
                  <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                  <p className="text-gray-500 group-hover:text-gray-700"><time datetime="2022-01-15T10:00">10:00 AM</time></p>
                </a>
              </li>  */}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;