/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

import AddEventModal from './components/AddEventModal';
import DayLabel from './components/DayLabel/DayLabel';
import FreeTime from './components/FreeTime';
import Modal from './components/Modal/Modal';
import TimeLabel from './components/TimeLabel';
import getWeekDates from './lib/get-week';
import { DataFieldType } from './lib/schema';

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
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [event, setEvent] = React.useState<DataFieldType>([]);

  const weekDates = React.useMemo(() => getWeekDates(new Date()), []);

  const openModal = () => setShowEventModal(true);
  const closeModal = () => setShowEventModal(false);

  return (
    <div className="flex flex-col h-full">
      <header className="relative z-40 flex items-center justify-between flex-none px-6 py-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">
          <time
            dateTime={new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'full',
            }).format(new Date())}
          >
            {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(
              new Date(),
            )}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <button type="button" className="secondary__button">
              Print availability
            </button>
            <div className="w-px h-6 ml-6 bg-gray-300" />
            <button
              type="button"
              className="primary__button"
              onClick={openModal}
            >
              Add availability
            </button>
          </div>
          <Menu className="relative ml-6 md:hidden">
            <MenuButton
              type="button"
              className="flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500 md:hidden"
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open menu</span>

              <HiDotsHorizontal className="w-5 h-5" />
            </MenuButton>

            <MenuList
              portal={false}
              className="absolute z-40 top-12 right-0 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none slide-down"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-0-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <MenuItem
                  as="button"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-0"
                  onSelect={openModal}
                >
                  Add availability
                </MenuItem>
              </div>
              <div className="py-1" role="none">
                <MenuItem
                  as="button"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-1"
                  onSelect={() => {}}
                >
                  Print availability
                </MenuItem>
              </div>
            </MenuList>
          </Menu>
        </div>
      </header>
      <div className="flex flex-col flex-auto overflow-auto bg-white">
        <div
          style={{ width: '165%' }}
          className="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full"
        >
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {weekDates.map((date) => (
                <DayLabel date={date} short={true} />
              ))}
            </div>

            <div className="hidden grid-cols-7 -mr-px text-sm leading-6 text-gray-500 border-r border-gray-100 divide-x divide-gray-100 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDates.map((date) => (
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
                {event.map((val) => (
                  <FreeTime
                    startTime={Number(val.startTime)}
                    endTime={Number(val.endTime)}
                    day={Number(val.day)}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showEventModal} setShowModal={setShowEventModal}>
        <AddEventModal closeModal={closeModal} setValue={setEvent} />
      </Modal>
    </div>
  );
}

export default App;
