// Amplify Gen 2 Backend Entry Point
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { processJournal } from './functions/processJournal/resource.js';

export const backend = defineBackend({
  auth,
  data,
  processJournal,
});

