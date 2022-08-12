import * as z from 'zod';

export const schema = z.object({
  data: z
    .array(
      z
        .object({
          day: z.string(),
          startTime: z.string(),
          endTime: z.string(),
        })
        .refine((value) => value.startTime > value.endTime, {
          message: 'Start time must be before end time',
          path: ['startTime'],
        }),
    )
    .refine(
      (arrayData) => {
        for (let index = 0; index < arrayData.length; index++) {
          const element = arrayData[index];

          for (
            let secondIndex = index + 1;
            secondIndex < arrayData.length;
            secondIndex++
          ) {
            const secondElement = arrayData[secondIndex];
            if (element.day === secondElement.day) {
              if (element.startTime === secondElement.startTime) {
                return false;
              }
              if (element.endTime === secondElement.endTime) {
                return false;
              }
            }
          }
        }
        return true;
      },
      {
        message: 'Duplicate time slot',
        path: [0],
      },
    ),
});

export type DataType = z.infer<typeof schema>;

export type DataFieldType = DataType['data'];
