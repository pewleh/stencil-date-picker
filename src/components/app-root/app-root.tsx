import { Component, State } from '@stencil/core';
import moment from 'moment';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  // array of months using moment
  now = new Date()
  months = moment.months();
  @State() month: string = '';
  @State() days: any = [];
  @State() selectedDate: object = {};

  // building the days in the month for each selected month
  daysInMonth = month => {
    const date = new Date(2019, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push({
          date: moment(new Date(date)).format('Do'),
          day: moment(new Date(date)).format('dddd'),
          month: moment().month(month).format("MMMM"),
          year: '2019'
        });
        date.setDate(date.getDate() + 1); //builds an array of objects with d/m/y in them.
    }
    return days;
  }

  handleChange = e => {
    // set state does not seem to exist, so am updating directly, not sure if this is ok
    this.month = e.target.value
    this.days = this.daysInMonth(this.months.indexOf(e.target.value));
    this.selectedDate = {} // wiping any selected day if the month is changed
  }
  //when a drop downs selected, handle change runs setting days to the result of the above function.
  handleClick = day => {
    this.selectedDate = day
  }
  //maping over "months" array to individually build a dropdown // selector.

  // use component did load, to selected january at the start
  componentDidLoad() {
    this.days = this.daysInMonth(this.now.getMonth());
    console.log(this.days)
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <select onChange={this.handleChange} value={this.month || this.months[this.now.getMonth()]}>
            {this.months.map(month => <option>{month}</option>)}
          </select>
          <div className="calender">
            {this.days.map(day => (
              <div className={`date-square ${this.selectedDate.date === day.date ? 'selected': ''}`} key={day.date} onClick={() => this.handleClick(day)}>{`${day.day} ${day.date}`}</div>)}
          </div>
          {this.selectedDate.day &&
            <div>
              Selected date: {this.selectedDate.date}/{this.selectedDate.month}/{this.selectedDate.year}
            </div>
          }
        </main>
      </div>
    );//56 - If selected day matches the date of the square built by map, give class of selected and style.
  }
}
