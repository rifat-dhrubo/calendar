import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { HiPlus, HiX } from 'react-icons/hi';
import * as z from 'zod';

import { DataFieldType, DataType, schema } from '../../lib/schema';
import FormSelect from '../FormSelect';
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
// 7 days of week array with label and value
const weekDays = [
  { label: 'Monday', value: '1' },
  { label: 'Tuesday', value: '2' },
  { label: 'Wednesday', value: '3' },
  { label: 'Thursday', value: '4' },
  { label: 'Friday', value: '5' },
  { label: 'Saturday', value: '6' },
  { label: 'Sunday', value: '7' },
] as const;

// 9 Am to 5 pm array with label and value
const timeSlots = [
  { label: '9 am', value: '9' },
  { label: '10 am', value: '10' },
  { label: '11 am', value: '11' },
  { label: '12 pm', value: '12' },
  { label: '1 pm', value: '13' },
  { label: '2 pm', value: '14' },
  { label: '3 pm', value: '15' },
  { label: '4 pm', value: '16' },
  { label: '5 pm', value: '17' },
] as const;

type Props = {
  closeModal: () => void;
  setValue: React.Dispatch<React.SetStateAction<DataFieldType>>;
};

const defaultValue = {
  day: weekDays[0].value,
  startTime: timeSlots[0].value,
  endTime: timeSlots[1].value,
};

const AddEventModal: React.FC<Props> = ({ closeModal, setValue }) => {
  const { register, handleSubmit, formState, control, clearErrors } =
    useForm<DataType>({
      defaultValues: {
        data: [defaultValue],
      },
      resolver: zodResolver(schema),
      mode: 'onChange',
    });
  const { append, remove, fields } = useFieldArray({ control, name: 'data' });

  const onSubmit = (formData: DataType) => {
    setValue(formData.data);
    closeModal();
  };
  return (
    <div className="w-full max-w-6xl border p-4 border-slate-100 ">
      <header className="text-left w-full mb-8">
        <h2 className="text-2xl text-gray-700">Add Availability</h2>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="event-form"
        className="space-y-4"
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <FormSelect
                name="day"
                labelText="Day"
                wrapperClass="min-w-[200px]"
                error={
                  formState.errors.data &&
                  formState?.errors?.data[index]?.day?.message
                    ? true
                    : false
                }
                errorMessage={
                  formState.errors.data
                    ? formState?.errors?.data[index]?.day?.message
                    : ''
                }
              >
                <select
                  className="input"
                  {...register(`data.${index}.day` as const, {
                    onChange: () => {},
                  })}
                >
                  {weekDays.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </FormSelect>
              <FormSelect
                name="startTime"
                labelText="Start time"
                wrapperClass="sm:min-w-[200px]"
                error={
                  formState.errors.data &&
                  formState?.errors?.data[index]?.startTime?.message
                    ? true
                    : false
                }
                errorMessage={
                  formState.errors.data
                    ? formState?.errors?.data[index]?.startTime?.message
                    : ''
                }
              >
                <select
                  className="input"
                  {...register(`data.${index}.startTime` as const, {})}
                >
                  {timeSlots.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </FormSelect>
              <FormSelect
                name="endTime"
                labelText="End time"
                wrapperClass="sm:min-w-[200px]"
                error={
                  formState.errors.data &&
                  formState?.errors?.data[index]?.endTime?.message
                    ? true
                    : false
                }
                errorMessage={
                  formState.errors.data
                    ? formState?.errors?.data[index]?.endTime?.message
                    : ''
                }
              >
                <select
                  className="input"
                  {...register(`data.${index}.endTime` as const)}
                >
                  {timeSlots.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </FormSelect>
              <div className="sm:min-w-[200px] flex items-center justify-center">
                <button
                  type="button"
                  className="inline-flex relative top-3 text-red-500 bg-slate-50 text-base border-red-500 border px-4 py-1.5 rounded-md items-center focus:ring focus:ring-red-500/20 focus:ring-offset-2  focus:border-opacity-25 hover:border-opacity-50 hover:ring hover:ring-red-500/40 hover:border-transparent"
                  onClick={() => remove(index)}
                >
                  <HiX
                    className="w-5 h-5 text-red-500 mr-2"
                    aria-hidden="true"
                  />
                  Remove
                </button>
              </div>
            </section>
          </div>
        ))}

        {formState.errors.data ? (
          <p className="mt-2 text-sm text-red-600">
            {formState.errors.data[0]?.message}
          </p>
        ) : null}

        <button
          type="button"
          className="inline-flex relative top-3 text-violet-500 bg-slate-50 text-base border-violet-500 border px-4 py-1.5 rounded-md items-center focus:ring focus:ring-violet-500/20 focus:ring-offset-2  focus:border-opacity-25 hover:border-opacity-50 hover:ring hover:ring-violet-500/40 hover:border-transparent mt-4"
          onClick={() => append(defaultValue)}
        >
          <HiPlus className="w-5 h-5 text-violet-500 mr-2" aria-hidden="true" />
          Add Another
        </button>
      </form>
      <footer className="flex w-full justify-end gap-8 mt-8">
        <button
          type="button"
          className="secondary__button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button type="submit" form="event-form" className="primary__button">
          Save
        </button>
      </footer>
    </div>
  );
};

export default AddEventModal;
