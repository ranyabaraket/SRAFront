export class RefNotification {
    id: RefNotificationId = new RefNotificationId();
    dtNotif;
    sentBy;
    sentTo;
    notifTitle;
    notifTexte;
    notifStatus;
    refUser;
    dtCreate;
    dtModif;
    version;
    notifResponse;
    responseBy;
    responseDate;
    customer;
    notifPhoto;

    inprocessBy;
    inprocessDate;
    trUserName;
  dtNotifAff: string;
}
export class RefNotificationId {
    idEntite;
    idTiers;
    idGsa;
    idNotif;
}
