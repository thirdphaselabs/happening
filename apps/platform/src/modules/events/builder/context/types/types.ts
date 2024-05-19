export type SectionStatus = "incomplete" | "complete";

export type EventDetails = {
  name?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  status: SectionStatus;
};

export type DateAndTime = {
  startDate?: Date;
  endDate?: Date;
  shouldDisplayStartDate?: boolean;
  shouldDisplayEndDate?: boolean;
  time?: string;
  status: SectionStatus;
};

export type LocationDetails = {
  venue?: string;
  address?: string;
  status: SectionStatus;
};

export type AdditionalInformation = {
  description?: string;
  tags?: {
    id: string;
    label: string;
  }[];
  status: SectionStatus;
};

export type PaidTicketGroup = {
  id: string;
  name: string;
  description?: string;
  price: number;
  availableQuantity: number;
  salesStart: Date;
  salesEnd: Date;
};

export type FreeTicketGroup = {
  id: string;
  name: string;
  description?: string;
  availableQuantity: number;
  availableFrom: Date;
  availableTo: Date;
};

export type Tickets = {
  paid?: PaidTicketGroup[];
  numberOfPaidTicketsEditing?: number;
  free?: FreeTicketGroup[];
  numberOfFreeTicketsEditing?: number;
  status: SectionStatus;
};

export type EventBuilderStage =
  | "details"
  | "date"
  | "location"
  | "additional-information"
  | "tickets"
  | "confirmation";
