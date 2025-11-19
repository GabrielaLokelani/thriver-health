// Amplify Gen 2 Auth Configuration for Thriver Health
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
    },
    name: {
      required: false,
    },
  },
});

