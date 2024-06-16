"use client";
import { Box, Flex, Skeleton } from "@radix-ui/themes";
import { APIProvider, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { environment } from "~/utils/env";

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect, useRef, useState } from "react";
import { PlaventiEvent } from "~/trpc/types";

const API_KEY = environment.googlePlacesApiKey;

// const styles = [
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#004358" }],
//   },
//   {
//     featureType: "landscape",
//     elementType: "geometry",
//     stylers: [{ color: "#40B4CB" }],
//   },
//   {
//     featureType: "poi",
//     elementType: "geometry",
//     stylers: [{ color: "#40B4CB" }],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [{ color: "#fd7400" }],
//   },
//   {
//     featureType: "road.arterial",
//     elementType: "geometry",
//     stylers: [{ color: "#40B4CB" }, { lightness: -20 }],
//   },
//   {
//     featureType: "road.local",
//     elementType: "geometry",
//     stylers: [{ color: "#40B4CB" }, { lightness: -17 }],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [{ color: "#ffffff" }, { visibility: "on" }, { weight: 0.9 }],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [{ visibility: "on" }, { color: "#ffffff" }],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels",
//     stylers: [{ visibility: "simplified" }],
//   },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   {
//     featureType: "transit",
//     elementType: "geometry",
//     stylers: [{ color: "#1f8a70" }, { lightness: -10 }],
//   },
//   {},
//   {
//     featureType: "administrative",
//     elementType: "geometry",
//     stylers: [{ color: "#1f8a70" }, { weight: 0.7 }],
//   },
// ] as google.maps.MapTypeStyle[];

export function MapComp({
  location,
  zoom = 13,
  minWidth = "280px",
}: {
  zoom?: number;
  location: google.maps.places.PlaceResult;
  minWidth?: string;
}) {
  const lat = location.geometry?.location?.lat();
  const lng = location.geometry?.location?.lng();

  console.log({ lat, lng });

  const [markerRef, marker] = useMarkerRef();

  if (!lat || !lng) {
    return null;
  }

  return (
    <APIProvider apiKey={environment.googlePlacesApiKey}>
      <Flex className="rounded-xl" overflow="hidden">
        <Map
          style={{ width: "100%", height: "175px", minWidth, borderRadius: "8px" }}
          defaultCenter={{
            lat,
            lng,
          }}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}>
          <Marker ref={markerRef} position={{ lat, lng }} />
        </Map>
      </Flex>
    </APIProvider>
  );
}

export function MapOfCity({ city }: { city: string }) {
  // const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
  //   usePlacesService({
  //     apiKey: API_KEY,
  //   });

  // const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);
  // const lat = placeDetails?.geometry?.location?.lat();
  // const lng = placeDetails?.geometry?.location?.lng();

  // console.log({ placePredictions, placeDetails });

  // useEffect(() => {
  //   getPlacePredictions({ input: city });
  // }, [city]);

  // useEffect(() => {
  //   if (!placePredictions) return;
  //   if (placePredictions.length === 0) return;
  //   placesService?.getDetails(
  //     {
  //       placeId: placePredictions[0].place_id,
  //     },
  //     (place) => {
  //       setPlaceDetails(place);
  //     },
  //   );
  // }, [placePredictions, placesService]);

  return (
    <Flex>
      {
        // <Skeleton loading={!placeDetails}>
        //   {placeDetails && lat && lng ? (
        <MapComponent
          zoom={10}
          location={
            {
              coordinates: {
                lat: "53.4810538",
                lng: "-2.250059",
              },
            } as unknown as PlaventiEvent["location"]
          }
        />
        //   ) : (
        //     <Box height="175px" width="280px" />
        //   )}
        // </Skeleton>
      }
    </Flex>
  );
}

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MapProvider } from "~/app/_components/map-provider";

function MapComponentInner({ lat, lng, zoom = 15 }: { lat: number; lng: number; zoom?: number }) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>();
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{ lat: number; lng: number } | undefined>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat, lng },
          zoom,
        }),
      );
      setMarker({ lat, lng });
    }
    if (map && !markerCluster) {
      setMarkerClusters(new MarkerClusterer({ map, markers: [] }));
    }
  }, [map, markerCluster]);

  useEffect(() => {
    if (marker && markerCluster) {
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
        }),
      );
    }
  }, [marker, markerCluster]);

  return (
    <>
      <Flex
        className="rounded-lg"
        ref={ref as any}
        style={{ height: "100%", width: "588px", minHeight: "175px" }}></Flex>
    </>
  );
}

export function MapComponent({
  location,
  zoom = 15,
}: {
  location: PlaventiEvent["location"];
  zoom?: number;
}) {
  return (
    <MapProvider>
      <MapComponentInner zoom={zoom} lat={+location.coordinates.lat} lng={+location.coordinates.lng} />
    </MapProvider>
  );
}
