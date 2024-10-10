import { uploadPhoto, createUser } from './utils';

export default async function handleProfileSignup() {
  const photoInfo = uploadPhoto();
  const userInfo = createUser();

  await Promise.all([photoInfo, userInfo]).then((values) => {
    console.log(values[0].body, values[1].firstName, values[1].lastName);
    return new Promise.resolve();
  }).catch(() => new Error('Signup system offline'));
}
