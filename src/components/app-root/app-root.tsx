import { Component, State } from '@stencil/core';
import moment from 'moment';


interface IDate {
  date?: string;
  day?: string;
  month?: string;
  year?: string;
}


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
  @State() days: Array<IDate> = [];
  @State() IDate: IDate = {};

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
    this.month = e.target.value
    this.days = this.daysInMonth(this.months.indexOf(e.target.value));
    this.IDate = {} // wiping any selected day if the month is changed
  }
  //when a drop downs selected, handle change runs setting days to the result of the above function.
  handleClick = day => {
    this.IDate = day
  }
  //maping over "months" array to individually build a dropdown // selector.

  // use component did load, to selected january at the start
  componentDidLoad() {
    this.days = this.daysInMonth(this.now.getMonth());
  }

  render() {
    return (
      <div>
        <header>
          <h1>2019</h1>
          <select id="trial" onChange={this.handleChange}>
            {this.months.map(month => <option value={this.month || this.months[this.now.getMonth()]}>{month}</option>)}
          </select>
        </header>

        <main>

          <div class="calender">
            {this.days.map(day => (
              <div
              class={`date-square ${this.IDate.date === day.date ? 'selected': ''}`} onClick={() => this.handleClick(day)}>
                <p class="DoW">{day.day}</p>
                <p>{day.date}</p>
              </div>
            ))}
          </div>
          {this.IDate.day &&
            <div>
              Selected date: {this.IDate.date} / {this.IDate.month} / {this.IDate.year}
            </div>
          }
        </main>
      </div>
    );//56 - If selected day matches the date of the square built by map, give class of selected and style.
  }
}
