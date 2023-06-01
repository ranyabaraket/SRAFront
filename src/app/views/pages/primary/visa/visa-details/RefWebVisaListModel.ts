export class RefWebVisaListModel {
    countryFrom;
    visato;
    nbPax;
    responsable;
    phoneNumber;
    emailContact;
    typeVisa;
    startDate;
    endDate;
    refUser;
    listVisaApply: any = [];
    prixVisa;
    typeVisaT;
    paxName;
    birthdate;
    currency;
    visaToString;
    status;
    finalPrice;
    dtCreate;
    idTypeVisa;
}

export class RefWebVisaModel {
    fullName = '';
    ddBirthDate = '';
    mmBirthDate = '';
    yyBirthDate = '';
    passport = '';
    picture = '';
    documents;
}

export class PrmDocumentVisaModel {
    id = new PrmDocumentVisaId();
    ltypedoc = '';
    noteTypedoc = '';
    ordTypedoc = '';
    file = '';
    urlFile = '';
}

export class PrmDocumentVisaId {
    idEntite = '';
    idPays = '';
    idTypevsa = '';
    idTypedoc = '';
}

export class VsaTypevisa {
    id: {
        idEntite;
        idPays;
        idTypevsa
    };
    version;
    codeTypevsa;
    lTypevisa;
    ordTypevsa;
    refUser;
    dtCreate;
    dtModif;
    actif;
}

