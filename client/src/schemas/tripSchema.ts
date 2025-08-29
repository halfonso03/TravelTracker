import * as yup from 'yup';

export interface TripFormData {
    id: number
    travellerName: string,
    fromDate: Date | null,
    toDate: Date | null,
    location: string,
    description: string,
    approvedDate: Date | null,
    statusId: number
    fiduciary: string,
    // status: string,
    submittedDate?: Date | null,
    reimbursementSentDate?: Date | null
    reimbursementPaidDate?: Date
}


export const tripFormSchema = yup.object().shape({
    id: yup.number().required("*"),
    travellerName: yup.string().required('*'),
    fromDate: yup.date().required('*'),
    location: yup.string().required('*'),
    description: yup.string().required('*'),
    approvedDate: yup.date().required('*'),
    statusId: yup.number().required(),
    fiduciary: yup.string().required('*'),
    toDate: yup.date()
        .required('*')
        .when('fromDate', (fromDate, schema) => {
            if (!fromDate[0]) return schema;
            return fromDate ? schema.min(fromDate, '**') : schema;
        }),
});

export interface TripFormSchema {
    id: number
    travellerName: string,
    fromDate: Date,
    toDate: Date,
    location: string,
    description: string,
    approvedDate: Date,
    statusId: number
    fiduciary: string,
    submittedDate?: Date,
    reimbursementSentDate?: Date
    reimbursementPaidDate?: Date
}

