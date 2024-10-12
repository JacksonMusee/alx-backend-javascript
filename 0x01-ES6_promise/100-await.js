import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  const results = await Promise.allSettled([uploadPhoto(), createUser()]);

  const allFulfilled = results.every((result) => result.status === 'fulfilled');

  if (allFulfilled) {
    return {
      photo: results[0].value,
      user: results[1].value,
    };
  }
  return {
    photo: null,
    user: null,
  };
}
