type Trip = {
    id: number
    travellerName: string,
    fromDate: Date,
    toDate: Date,
    approvedDate: Date,
    status?: string,
    statusId: number,
    location: string,
    description: string,
    fiduciary: string,
    submittedDate?: Date,
    reimbursementSentDate?: Date
    reimbursementPaidDate?: Date
}



type Alert = {
    id: number,
    name: string;
    message: string;
    level: number;
};


