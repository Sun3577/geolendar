import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface IEvent {
  title: string;
  start: string;
  end: string;
  location: string;
  transport: string;
}

interface MyCalendarProps {
  events: IEvent[];
}

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default MyCalendar;
