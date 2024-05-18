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

export type Tickets = {
  status: SectionStatus;
};

export type EventBuilderStage = "details" | "date" | "tickets" | "confirmation";
