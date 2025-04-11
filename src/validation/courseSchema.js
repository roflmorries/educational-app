import * as Yup from 'yup';

export const schema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Course name must be at least 3 characters long')
    .required('Course name is required'),
    description: Yup.string()
    .max(500, 'Description cannot exceed 500 characters'),
    startDate: Yup.date()
    .required('Start date is required'),
    numberOfClasses: Yup.number()
    .min(1, 'Number of classes must be at least 1')
    .max(120, 'Number of classes cannot exceed 120')
    .required('Number of classes is required'),
})