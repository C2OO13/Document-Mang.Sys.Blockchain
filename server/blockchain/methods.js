import MainContract from "./MainContract";

export const getCertificate = async (id) => {
    try {
        await MainContract.methods
            .approveAgreement(agreement.investor, agreement.company)
            .send({ from: user?.address });

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setCertificate = async (id) => {
    try {

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const setActive = async (id) => {
    try {

    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const newCertificate = async (id) => {
    try {

    } catch (error) {
        console.log(error);
        return error.message;
    }
}