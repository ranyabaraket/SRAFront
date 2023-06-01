import { HotelSearchModel } from './hotelSearchModel';

export class CheckRateConditionRequestModel {
    hotelAvailable;
    sessionId;
    searchHotelRequest: HotelSearchModel = new HotelSearchModel();
}


