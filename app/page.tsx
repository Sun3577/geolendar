"use client";

import { useState } from "react";
import Head from "next/head";
import MyCalendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import { IEvent } from "../lib/types"; // 공통 타입 임포트

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);

  const handleAddEvent = (newEvent: IEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <Head>
        <title>Geolendar</title>
        <meta
          name="description"
          content="Geolendar - Smart Calendar with Google Maps Integration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Geolendar</h1>
        <EventForm onAddEvent={handleAddEvent} />
        <MyCalendar events={events} />
      </main>
    </div>
  );
}
