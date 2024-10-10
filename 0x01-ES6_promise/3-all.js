import { uploadPhoto, createUser } from './utils';

export function handleProfileSignup() {
  const photoInfo = uploadPhoto();
  const userInfo = createUser();

  await Promise.all([photoInfo, userInfo]).then((values) => {
    console.log(values[0].body, values[1].firstName, values[1].lastName);
    return Promise.resolve({
      body: values[0].body,
      firstName: values[1].firstName,
      lastName: values[1].lastName,
    });
  }).catch(() => new Error('Signup system offline'));
}
