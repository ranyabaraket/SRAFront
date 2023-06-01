import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LabelType, Options } from 'ng5-slider';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/views/pages/shared/services/language.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() data;
  @Output() backward = new EventEmitter();
  flightsFiltred;
  options: Options = {
    floor: 0,
    ceil: 86340,
    translate: (value: number, label: LabelType): string => {
      const duration = moment.duration(value, 'seconds');
      const resultstring = moment
        .utc(duration.asMilliseconds())
        .format('HH:mm');
      return resultstring;
    },
  };
  constructor(
    private languageServise: LanguageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.languageServise.shareLang.subscribe((data) => {
      if (data) {
        this.translate.use(data);
      } else {
        this.translate.setDefaultLang('en');
      }
    });
    this.flightsFiltred = this.data.flights;
  }

  changeTimeValueToReset() {
    this.data.filterSettings.forEach((element) => {
      element.timeFrame.minValueLanding = 0;
      element.timeFrame.maxValueLanding = 86340;
      element.timeFrame.minValueTakeoff = 0;
      element.timeFrame.maxValueTakeoff = 86340;
    });
    this.applyFilter(null);
  }
  toTime(timeString) {
    const timeTokens = timeString.split(':');
    return new Date(
      2020,
      0,
      1,
      Number(timeTokens[0]),
      Number(timeTokens[1]),
      0
    );
  }

  filterByFlightNo(flights, index) {
    const result = [];
    flights.forEach((element) => {
      let ok;
      element.originDestinationOptions[index].airlineCodes.forEach(
        (airlineCode) => {
          airlineCode.forEach((a) => {
            if (a.includes(this.data.filterSettings[index].flightNo)) {
              ok = true;
            }
          });
        }
      );
      if (ok) {
        result.push(element);
      }
    });
    return result;
  }

  filterByNbStops(flights, index) {
    const result = [];
    flights.forEach((element) => {
      this.data.filterSettings[index].nbstops.forEach((nbstop) => {
        if (nbstop.value) {
          if (
            element.originDestinationOptions[index].nbStop.includes(nbstop.name)
          ) {
            result.push(element);
          }
        }
      });
    });
    return result;
  }

  filterByCompanies(flights, index) {
    const result = [];
    flights.forEach((element) => {
      let ok;
      this.data.filterSettings[index].companies.forEach((company) => {
        if (company.value) {
          element.originDestinationOptions[index].airlineCodes.forEach((a) => {
            if (a[0] === company.code) {
              ok = true;
            }
          });
        }
      });
      if (ok) {
        result.push(element);
      }
    });
    return result;
  }

  filterByClasses(flights, index) {
    const result = [];
    flights.forEach((element) => {
      let ok;
      this.data.filterSettings[index].classes.forEach((c) => {
        if (c.value) {
          element.originDestinationOptions[index].airlineCodes.forEach(
            (airlineCode) => {
              let i = 0;
              airlineCode.forEach((a) => {
                if (
                  i > 0 &&
                  a.split(' ')[1] &&
                  c.name.includes(a.split(' ')[1])
                ) {
                  ok = true;
                }
                i = +1;
              });
            }
          );
          if (ok) {
            result.push(element);
          }
        }
      });
    });
    return result;
  }
  filterByDepartFrameTimeStart(flights, index) {
    const duration = moment.duration(
      this.data.filterSettings[index].timeFrame.minValueTakeoff,
      'seconds'
    );
    const resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm');
    const result = [];
    flights.forEach((element) => {
      if (
        this.toTime(element.originDestinationOptions[index].departureTime) >=
        this.toTime(resultstring)
      ) {
        result.push(element);
      }
    });
    return result;
  }
  filterByDepartFrameTimeEnd(flights, index) {
    const duration = moment.duration(
      this.data.filterSettings[index].timeFrame.maxValueTakeoff,
      'seconds'
    );
    const resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm');
    const result = [];
    flights.forEach((element) => {
      if (
        this.toTime(element.originDestinationOptions[index].departureTime) <=
        this.toTime(resultstring)
      ) {
        result.push(element);
      }
    });
    return result;
  }
  filterByArrivalFrameTimeStart(flights, index) {
    const duration = moment.duration(
      this.data.filterSettings[index].timeFrame.minValueLanding,
      'seconds'
    );
    const resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm');
    const result = [];
    flights.forEach((element) => {
      if (
        this.toTime(element.originDestinationOptions[index].arrivalTime) >=
        this.toTime(resultstring)
      ) {
        result.push(element);
      }
    });
    return result;
  }
  filterByArrivalFrameTimeEnd(flights, index) {
    const duration = moment.duration(
      this.data.filterSettings[index].timeFrame.maxValueLanding,
      'seconds'
    );
    const resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm');
    const result = [];
    flights.forEach((element) => {
      if (
        this.toTime(element.originDestinationOptions[index].arrivalTime) <=
        this.toTime(resultstring)
      ) {
        result.push(element);
      }
    });
    return result;
  }
  applyFilter(event) {
    this.flightsFiltred = this.data.flights;
    for (let i = 0; i < this.data.filterSettings.length; i++) {
      // flightNo filter
      if (this.data.filterSettings[i].flightNo !== '') {
        this.flightsFiltred = this.filterByFlightNo(this.flightsFiltred, i);
      }
      // nbStops filter
      if (this.data.filterSettings[i].nbstops.find((s) => !s.value)) {
        this.flightsFiltred = this.filterByNbStops(this.flightsFiltred, i);
      }
      // companies filter
      if (this.data.filterSettings[i].companies.find((s) => !s.value)) {
        this.flightsFiltred = this.filterByCompanies(this.flightsFiltred, i);
      }
      // classes filter
      if (this.data.filterSettings[i].classes.find((s) => !s.value)) {
        this.flightsFiltred = this.filterByClasses(this.flightsFiltred, i);
      }
      // time frame filter -- depart: start interval / end interval
      if (this.data.filterSettings[i].timeFrame.minValueTakeoff !== 0) {
        this.flightsFiltred = this.filterByDepartFrameTimeStart(
          this.flightsFiltred,
          i
        );
      }
      if (this.data.filterSettings[i].timeFrame.maxValueTakeoff !== 86340) {
        this.flightsFiltred = this.filterByDepartFrameTimeEnd(
          this.flightsFiltred,
          i
        );
      }
      // time frame filter -- arrival: start interval / end interval
      if (this.data.filterSettings[i].timeFrame.minValueLanding !== 0) {
        this.flightsFiltred = this.filterByArrivalFrameTimeStart(
          this.flightsFiltred,
          i
        );
      }
      if (this.data.filterSettings[i].timeFrame.maxValueLanding !== 86340) {
        this.flightsFiltred = this.filterByArrivalFrameTimeEnd(
          this.flightsFiltred,
          i
        );
      }
    }
    this.backward.emit(this.flightsFiltred);
  }

  // filter config -All checked
  changeValueToCheckAll(key) {
    this.data.filterSettings.forEach((filter) => {
      filter[key].forEach((element) => {
        element.value = true;
      });
    });
    this.applyFilter(null);
  }
  // filter config -None checked
  changeValueToNone(key) {
    this.data.filterSettings.forEach((filter) => {
      filter[key].forEach((element) => {
        element.value = false;
      });
    });
    this.applyFilter(null);
  }
  initFilter() {
    this.changeTimeValueToReset();
    this.data.filterSettings.forEach((filter) => {
      filter.flightNo = '';
      filter.classes.forEach((element) => {
        element.value = true;
      });
      filter.companies.forEach((element) => {
        element.value = true;
      });
      filter.nbstops.forEach((element) => {
        element.value = true;
      });
    });
    this.applyFilter(null);
  }
}
