import * as Yup from 'yup';

export const schema = Yup.object().shape({
    fullname: Yup.string()
    .min(4, 'Fullname must be 4 characters long')
    .required('Fullname is required'),
    city: Yup.string().required("City is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    telegram: Yup.string().required("Telegram is required"),
})