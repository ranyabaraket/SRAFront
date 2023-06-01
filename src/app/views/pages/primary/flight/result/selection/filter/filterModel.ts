export class FilterModel {
    flightNo = '';
    nbstops = [];
    companies = [];
    classes = [];
    destination = '';
    timeFrame = {
        minValueLanding : 0,
        maxValueLanding : 86340,
        minValueTakeoff : 0,
        maxValueTakeoff : 86340,
    };
}
