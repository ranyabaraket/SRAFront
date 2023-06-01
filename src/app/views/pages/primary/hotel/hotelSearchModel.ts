export class HotelSearchModel {
    destination;
    checkIn;
    checkOut;
    nationality = '';
    ratings;
    nbRooms;
    // rooms: [{ nbAdult: 1, nbChildren: 0, childrenAgeList: [], nbRoom: 1, nbInfant: 0 }];
    rooms: RoomModel[] = [];
    codeCityGG;
    codeCityMR;
    nbNights;
    // countrySelected: [{ codePays: 'SA' }];
    countrySelected: Country = new Country();
    qteADT = 1;
    qteCHD = 0;
    hotelCode;
    destinationText;
    city;
    codeCityGB;
    codeCityTBO;
    codeCityTR;
    codeCityGrn;
    codeCityPx;
    currentDevise;
}

export class RoomModel {
    nbAdult;
    nbChildren;
    childrenAgeList: [];
    nbRoom;
    nbInfant;
}
export class Country {
    abrvPays;
    addVisa;
    codePays;
    dtCreate;
    dtModif;
    forVisa;
    idPays;
    indPays;
    indTelPays;
    lpays;
    nationalite;
    ordPays;
    refUser;
    version;
}


