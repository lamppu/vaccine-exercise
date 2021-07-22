import React, { useState } from 'react';
import './DateTimeForm.css';
import { Form, Icon, Button, Popup } from 'semantic-ui-react';

const DateTimeForm = ({onDateTimeStringChange, onOrdersAndVaccinesChange}) => {
  const [selectedDate, setSelectedDate] = useState('2021-01-02');
  const [selectedTime, setSelectedTime] = useState('');
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  }
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  }
  const handleSubmit = async () => {
    const time = (selectedTime !== '') ? selectedTime : '23:59:59';
    const dateString = selectedDate + 'T' + time + 'Z';
    onDateTimeStringChange(dateString);

    const ordersUrl = 'http://localhost:3001/orders?date=' + dateString;
    let resp = await fetch(ordersUrl);

    if (resp.status === 200) {
      resp = await resp.json();
      onOrdersAndVaccinesChange(resp.data);
    }

  }

  return (
    <Form className='DateTimeForm'>
      <label>
        Choose a date and time between January 2<sup>nd</sup> and
        April 12<sup>th</sup> 2021
        <Popup
          trigger={<Icon name='info circle'/>}
          content='Please note that this app uses mock data'
          position='right center'
        />
      </label>
      <Form.Group inline>
        <Form.Input
          label='Date'
          type='date'
          min='2021-01-02'
          max='2021-04-12'
          defaultValue={selectedDate}
          onChange={handleDateChange}
        />
        <Form.Input
          label="Time (optional)"
          type='time'
          step='1'
          defaultValue={selectedTime}
          onChange={handleTimeChange}
        />
        <Button type='submit' onClick={handleSubmit}>Show data for chosen date</Button>
      </Form.Group>

    </Form>
  )
}
/*
const DateTimeForm = ({onDateTimeStringChange, selectedDate, selectedTime, onSelectedDateChange, onSelectedTimeChange, onOrdersAndVaccinesChange}) => {
  const handleDateChange = (e) => {
    onSelectedDateChange(e.target.value);
  }
  const handleTimeChange = (e) => {
    onSelectedTimeChange(e.target.value);
  }
  const handleSubmit = async () => {
    const time = (selectedTime !== '') ? selectedTime : '23:59:59';
    const dateString = selectedDate + 'T' + time + 'Z';
    onDateTimeStringChange(dateString);

    const ordersUrl = 'http://localhost:3001/orders?date=' + dateString;
    let resp = await fetch(ordersUrl);

    if (resp.status === 200) {
      resp = await resp.json();
      onOrdersAndVaccinesChange(resp.data);
    }

  }

  return (
    <Form className='DateTimeForm'>
      <label>
        Choose a date and time between January 2<sup>nd</sup> and
        April 12<sup>th</sup> 2021
        <Popup
          trigger={<Icon name='info circle'/>}
          content='Please note that this app uses mock data'
          position='right center'
        />
      </label>
      <Form.Group inline>
        <Form.Input
          label='Date'
          type='date'
          min='2021-01-02'
          max='2021-04-12'
          defaultValue={selectedDate}
          onChange={handleDateChange}
        />
        <Form.Input
          label="Time (optional)"
          type='time'
          step='1'
          defaultValue={selectedTime}
          onChange={handleTimeChange}
        />
        <Button type='submit' onClick={handleSubmit}>Show data for chosen date</Button>
      </Form.Group>

    </Form>
  )
}
*/

export default DateTimeForm;
