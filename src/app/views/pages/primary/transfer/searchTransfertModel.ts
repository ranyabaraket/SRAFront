export class SearchTransfertModel {
    arrivalDate; // dd/mm/yyyy
    arrivalDateAff;
    arrivalTimeH;
    arrivalTimeM;
    departureDate; // dd/mm/yyyy
    departureDateAff;
    departureTimeH;
    departureTimeM;
    transferType = 1; // 1 : Airport to Hotel / 2 : Hotel to Airport
    pickupLocation;
    dropoffLocation;
    transAdult = 1;
    transChildren = 0;
    transInfant = 0;
    journeyType = 1; // 1 : one way  / 2 : return
    country = '';
    pickupLongitude: any;
    dropoffLongitude: any;
    pickupLatitude: any;
    dropoffLatitude: any;
    dropoffCity;
    dropoffPlace;
    pickupPlace;
    pickupCity;
    dtDepart;
    dtArrival;

}
