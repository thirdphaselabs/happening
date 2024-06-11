import { Flex } from "@radix-ui/themes";
import { APIProvider, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { environment } from "~/utils/env";

export function MapComp({ location }: { location: google.maps.places.PlaceResult }) {
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
          style={{ width: "100%", height: "175px", borderRadius: "8px" }}
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
