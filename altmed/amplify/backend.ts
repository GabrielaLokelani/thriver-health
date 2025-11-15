// Amplify Gen 2 Backend Entry Point
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { processJournal } from './functions/processJournal/resource';

export const backend = defineBackend({
  auth,
  data,
  processJournal,
});

