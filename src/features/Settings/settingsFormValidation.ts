import * as zod from 'zod';

export const SettingsSchema = zod.object({
  led: zod.boolean(),
  fan: zod.boolean(),
  updateInterval: zod.number().min(1).max(1000),
  temperature: zod.object({
    max: zod.number().min(-100).max(100),
    min: zod.number().min(-100).max(100),
  }),
  humidity: zod.object({
    max: zod.number().min(0).max(100),
    min: zod.number().min(0).max(100),
  }),
  co2: zod.object({
    max: zod.number().min(0).max(5000),
    min: zod.number().min(0).max(5000),
  }),
});
