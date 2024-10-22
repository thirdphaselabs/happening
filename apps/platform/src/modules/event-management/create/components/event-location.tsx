"use client";

import { Button, TextFieldInput } from "@plaventi/ui";
import { Cross2Icon, MagnifyingGlassIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Popover, ScrollArea, Text } from "@radix-ui/themes";
import { RiMapPinLine } from "@remixicon/react";
import React, { memo, useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useDebounce } from "~/app/_hooks/use-debounce";
import { MapComp } from "./map";
import { environment } from "~/utils/env";
import { useEventBuilderContext } from "../context/event-builder.context";

const API_KEY = environment.googlePlacesApiKey;

export function EventLocationInner() {
  const { setLocationDetails } = useEventBuilderContext();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [search, setSearch] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!debouncedSearch) return;
    console.log("debouncedSearch", debouncedSearch);
    getPlacePredictions({ input: debouncedSearch });
  }, [debouncedSearch]);

  const [isOpen, setIsOpen] = React.useState(false);

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: API_KEY,
    });

  const [placeDetails, setPlaceDetails] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (placeDetails && placeDetails?.place_id === selectedLocation) {
      setLocationDetails({
        locationDetails: {
          name: placeDetails.name,
          formattedAddress: placeDetails.formatted_address,
          placeId: placeDetails.place_id,
          coordinates:
            placeDetails.geometry && placeDetails.geometry.location
              ? {
                  lat: placeDetails.geometry.location.lat().toString(),
                  lng: placeDetails.geometry.location.lng().toString(),
                }
              : undefined,
        },
      });
    }
  }, [placeDetails]);

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (!selectedLocation || !placesService) return;
    placesService.getDetails(
      {
        placeId: selectedLocation,
      },
      (place) => {
        setPlaceDetails(place);
      },
    );
  }, [selectedLocation, placesService]);

  console.log({ placeDetails, placePredictions });

  return (
    <>
      <Popover.Root open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
        <Popover.Trigger>
          <Flex
            gap="2"
            className="bg-skyA2 rounded-xl px-3 py-2"
            width="100%"
            onClick={() => setIsOpen(true)}
            align="center"
            justify="between">
            <Flex gap="2">
              <Flex align="start" className="mt-1">
                <SewingPinIcon height="16" width="16" color="gray" />
              </Flex>
              <Flex direction="column">
                <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                  {placeDetails ? placeDetails.name : "Add Event Location"}
                </Heading>
                <Text color="gray" size="2">
                  {placeDetails ? placeDetails.formatted_address : "Real world location or virtual link."}
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <IconButton
                color="gray"
                variant="ghost"
                size="3"
                className="z-[10]"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocationDetails(null);
                  setSelectedLocation(null);
                  setPlaceDetails(null);
                }}>
                <Cross2Icon />
              </IconButton>
            </Flex>
          </Flex>
        </Popover.Trigger>
        <Popover.Content width="360px" className="relative px-2 py-1" align="end">
          <Flex direction="column" className="" gap="1">
            <TextFieldInput
              placeholder="Enter location"
              variant="soft"
              color="gray"
              size="3"
              className="w-full"
              value={search ?? ""}
              onChange={(evt) => {
                if (evt.target.value === "") {
                  setSearch(null);
                } else {
                  setSearch(evt.target.value);
                }
              }}
            />
            <ScrollArea type="always" scrollbars="vertical" className="timezone-select">
              <Flex direction="column" gap="1" mt="1">
                {placePredictions.length === 0 && search !== null && (
                  <Flex className="py-5" align="center" justify="center" gap="1">
                    <Text size="3" color="gray" align="center">
                      {!isPlacePredictionsLoading && debouncedSearch === search
                        ? "No results found"
                        : "Loading..."}
                    </Text>
                  </Flex>
                )}
                {placePredictions.length === 0 && (search === null || search === "") && (
                  <Flex className="py-5" align="center" justify="center" gap="1">
                    <MagnifyingGlassIcon color="gray" height="18" width="18" />
                    <Text size="3" color="gray" align="center">
                      Start typing to search for a location
                    </Text>
                  </Flex>
                )}
                {placePredictions.map((prediction, index) => {
                  console.log(prediction);
                  return (
                    <Button
                      color="gray"
                      variant="surface"
                      onClick={() => {
                        setSelectedLocation(prediction.place_id);
                        setIsOpen(false);
                      }}
                      className="hover:bg-skyA3 h-fit w-full justify-start gap-4 py-1 shadow-none">
                      <RiMapPinLine xHeight="16" color="gray" />
                      <Flex direction="column" justify="start" align="start">
                        <Text size="2" highContrast>
                          {prediction.structured_formatting.main_text}
                        </Text>
                        <Text size="2" color="gray">
                          {prediction.structured_formatting.secondary_text}
                        </Text>
                      </Flex>
                    </Button>
                    // <Flex key={prediction.place_id}>
                    //   <Flex align="center" gap="2">
                    //     <RiMapPinLine xHeight="16" color="gray" />
                    //     <Flex direction="column">
                    //       <Text size="2">{prediction.structured_formatting.main_text}</Text>
                    //       <Text size="1" color="gray">
                    //         {prediction.structured_formatting.secondary_text}
                    //       </Text>
                    //     </Flex>
                    //   </Flex>
                    // </Flex>
                  );
                })}
              </Flex>
            </ScrollArea>
          </Flex>
        </Popover.Content>
      </Popover.Root>
      {placeDetails && <MapComp location={placeDetails} key={placeDetails.place_id} />}
    </>
  );
}

export const EventLocation = memo(EventLocationInner);
