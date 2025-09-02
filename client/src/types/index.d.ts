type Trip = {
    id: number
    travellerId: number,
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
    travellerName?: string
}



type Traveller = {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

type Alert = {
    id: number,
    name: string;
    message: string;
    level: number;
};


