import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  const photoInfo = uploadPhoto();
  const userInfo = createUser();

  return Promise
    .all([photoInfo, userInfo]).then((values) => {
      console.log(values[0].body, values[1].firstName, values[1].lastName);
    }).catch(() => new Error('Signup system offline'));
}
