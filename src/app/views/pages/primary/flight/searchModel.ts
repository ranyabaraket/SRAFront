export class SearchModel {
    departVol1;
    destinationVol1;
    departVol2;
    destinationVol2;
    departVol3;
    destinationVol3;
    departleVol1;
    departleVol2;
    departleVol3
    retourleVol1;
    rangeDepart = '0';
    rangeArriv = '0';
    classe = null;

    qteADT = 1;
    qteCHD = 0;
    qteINF = 0;

    departVol4;
    destinationVol4;
    departleVol4;
    departVol5;
    destinationVol5;
    departleVol5;

    typeSearch = 1;// 1 : OneWay ; 2 :RoundTrip ; 3 : MultiDestination
    typGds = ['G', 'L', 'O', 'C'];
    baggage = null;
    flightType = null;
    refundable = null;
    calender = false;
    preferredAirlines = null;
    promoCode = '';

    // added new flight
    airline;
    airlines;
    qteSTU;
    qteSRC;
    qteSEA;
    qteYTH;
    gds;
    isRefundable = null;
    isResidentFare;
    nearByAirports;
    pricingSourceType; // "ALL", "DEFAULT", "PRIVATE", "PUBLIC"
    requestOptions; // "DEFAULT", "FIFTY", "HUNDRED", "TWO_HUNDRED"
    sessionId
    target;// "DEFAULT" , "DEVELOPMENT" , "PRODUCTION" , "TEST"
    cabinPreference;
    maxStopsQuantity;// "Default" , "All" , "Direct" , "OneStop"
    cabinType;
    preferenceLevel;
    codeDevise;
    idEntite;
    gdsModel;



// not found in model search back
    nbDays;
    departVolTxt;
    destinationVolTxt;
}
