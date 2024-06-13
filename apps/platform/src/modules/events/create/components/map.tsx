"use client";
import { Box, Flex, Skeleton } from "@radix-ui/themes";
import { APIProvider, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { environment } from "~/utils/env";

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useEffect, useState } from "react";

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
}: {
  zoom?: number;
  location: google.maps.places.PlaceResult;
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
          style={{ width: "100%", height: "175px", minWidth: "280px", borderRadius: "8px" }}
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
  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: API_KEY,
    });

  const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);

  console.log({ placePredictions, placeDetails });

  useEffect(() => {
    getPlacePredictions({ input: city });
  }, [city]);

  useEffect(() => {
    if (!placePredictions) return;
    if (placePredictions.length === 0) return;
    placesService?.getDetails(
      {
        placeId: placePredictions[0].place_id,
      },
      (place) => {
        setPlaceDetails(place);
      },
    );
  }, [placePredictions, placesService]);

  return (
    <Flex>
      {
        <Skeleton loading={!placeDetails}>
          {placeDetails ? <MapComp location={placeDetails} zoom={9} /> : <Box height="175px" width="280px" />}
        </Skeleton>
      }
    </Flex>
  );
}
