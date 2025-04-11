import * as Yup from 'yup';

export const schema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Username must be 3 characters long')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters long')
    .required('Password is required'),
})