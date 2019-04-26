import { Component, State } from '@stencil/core';
import moment from 'moment';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  // array of months using moment
  months = moment.months();
  @State() month: string = '';
  @State() days: any = [];

  daysInMonth = month => {
    const date = new Date(2019, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
  }

  handleChange = (e, selected) => {
    // set state does not seem to exist, so am updating directly, not sure if this is ok
    this[selected] = e.target.value
    this.days = this.daysInMonth(this.months.indexOf(e.target.value));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <select onChange={e => this.handleChange(e, 'month')}>
            {this.months.map(month => <option value={month} key={month}>{month}</option>)}
          </select>
          {this.days.map(day => <p key={day}>{`${day}`}</p>)}
        </main>
      </div>
    );
  }
}
