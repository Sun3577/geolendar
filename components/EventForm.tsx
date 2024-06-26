import React, { useState } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { IEvent } from "../lib/types"; // 공통 타입 임포트

interface EventFormProps {
  onAddEvent: (event: IEvent) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [transport, setTransport] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: IEvent = { title, start, end, location, transport };
    const response = await axios.post("/api/events", newEvent);
    onAddEvent(response.data.data);
    // Reset form
    setTitle("");
    setStart("");
    setEnd("");
    setLocation("");
    setTransport("");
  };

  const handleSelect = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setLocation(address);
    console.log(latLng); // You can use latLng to store the coordinates or show on a map
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <PlacesAutocomplete
          value={location}
          onChange={setLocation}
          onSelect={handleSelect}
          googleCallbackName="myCallbackFunc"
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Location",
                  className: "w-full p-2 border border-gray-300 rounded",
                })}
              />
              <div className="autocomplete-dropdown">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style: { cursor: "pointer", padding: "10px" },
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <div className="mb-4">
        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Transport</option>
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
          <option value="bicycling">Bicycling</option>
          <option value="transit">Transit</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
