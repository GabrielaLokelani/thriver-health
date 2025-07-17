import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    // Standard attributes
    birthdate: {
      required: false,
      mutable: true,
    },
    email: {
      required: true,
      mutable: true,
    },
    givenName: {
      mutable: true,
      required: false,
    },
    familyName: {
      required: false,
      mutable: true,
    },
    fullname: {
      required: false,
      mutable: true,
    },
    profilePicture: {
      mutable: true,
      required: false,
    },
    // Custom attributes
    // Duplicated in the User Table, keeping it here for the build
    'custom:talent_lms_id': {
      mutable: true,
      dataType: 'String',
      minLen: 3,
      maxLen: 7
    },
    // Duplicated in the User Table, keeping it here for the build
    'custom:assessments_id': {
      mutable: true,
      dataType: 'String',
      minLen: 1,
      maxLen: 50
    },
    // Duplicated in the User Table, keeping it here for the build
    'custom:status': {
      mutable: true,
      dataType: 'String',
      minLen: 1,
      maxLen: 50
    },
    'custom:role': {
      mutable: true,
      dataType: 'String',
      minLen: 3,
      maxLen: 25
    },
    // Duplicated in the User Table, keeping it here for the build
    'custom:groups': {
      mutable: true,
      dataType: 'String'
    },

   // Duplicated in the User Table, keeping it here for the build
    'custom:organization_id': {
      mutable: true,
      dataType: 'String'
    },
    // Duplicated in the User Table, keeping it here for the build
    'custom:locations': {
      mutable: true,
      dataType: 'String'
    }
  }
})