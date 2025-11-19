// Lambda function for processing journal entries with AI
import { defineFunction } from '@aws-amplify/backend';

export const processJournal = defineFunction({
  name: 'processJournal',
  entry: './handler.ts',
  timeoutSeconds: 30,
  memoryMB: 512,
});

