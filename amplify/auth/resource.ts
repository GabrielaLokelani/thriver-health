import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your authentication resource
 * @see https://docs.amplify.aws/react/build-a-backend/auth
 * 
 * Note: We only require email for authentication.
 * User's name will be stored in the UserProfile table, not in Cognito attributes.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
    },
  },
});

