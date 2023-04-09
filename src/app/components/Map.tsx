"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

interface MapProps {
  center?: [number, number];
}

const markerIcon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [20, 20],
});

export const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      zoom={center ? 6 : 2}
      center={center ?? [10, 10]}
      scrollWheelZoom={false}
      className={"h-[50vh]"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker icon={markerIcon} position={center ?? [1, 1]}></Marker>
      )}
    </MapContainer>
  );
};
