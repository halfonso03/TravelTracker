import * as yup from 'yup';

export interface TripFormData {
    id: number
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
    reimbursementPaidDate?: Date,
    travellerId: number
}


export const tripFormSchema = yup.object().shape({
    id: yup.number().required("*"),
    travellerId: yup.number().required('*'),
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
    travellerId: number,
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

