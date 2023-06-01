export class ConfirmPurchaseModel {
    pnr;
    totalAdults;
    totalChild;
    totalInfants;
    contactPerson;
    emailAddress;
    sSRFeeCodePR;
    totalPremiumPR;
    purchaseDate;
    planTitle;
    nbrJour = 1;
    etatFileass = 'Pending';
    flights = [{
        departCountryCode: null,
        departStationCode: null,
        arrivalCountryCode: null,
        arrivalStationCode: null,
        departAirlineCode: null,
        departDateTime: null,
        returnAirlineCode: null,
        returnDateTime: null,
        departFlightNo: null,
        returnFlightNo: null,
    }];
    passengers: Passenger = new Passenger();
    riders = [{
        currency: null,
        totalPremium: 0,
        sSRFeeCode: 0
    }];
    mains = [{
        currency: null,
        totalPremium: 0,
        sSRFeeCode: 0
    }];

}

export class Raiders {
    currency;
    totalPremium;
    sSRFeeCode;
}
export class Mains {
    currency;
    totalPremium;
    sSRFeeCode;
}

export class Passenger {
    isInfant;
    firstName;
    lastName;
    gender;
    dOB;
    age;
    identityType;
    identityNo;
    isQualified;
    nationality;
    countryOfResidence;
    selectedPlanCode;
    selectedSSRFeeCode;
    currencyCode;
    passengerPremiumAmount;
    typePers;
}

export class Flight {
    departCountryCode;
    departStationCode;
    arrivalCountryCode;
    arrivalStationCode;
    departAirlineCode;
    departDateTime;
    returnAirlineCode;
    returnDateTime;
    departFlightNo;
    returnFlightNo;
}
