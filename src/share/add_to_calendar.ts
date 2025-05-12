import { isDevMode } from "@angular/core";

export const BASE_URL_ADD_TO_CALENDAR_URL =
  "http://www.google.com/calendar/event?action=TEMPLATE";

/**
 * Constant signifying to that a calendar event should be set to the users
 * current timezone. Note - the actual value of this constant is not used.
 */
export const USER_TIME_ZONE = "User timezone";

const UTC_TIME_ZONE_CODE = "Z";

export interface GoogleCalendarEventOptions {
  /** Optional property which fills the event details section of an event. */
  details?: string;

  /**
   * A plain JavaScript date which sets the end date of the event. Remember
   * that months in JavaScript Date objects are zero indexed.
   */
  endDate: Date;

  /**
   * An optional property which sets the event as all day if set to true. Can
   * be left undefined if the event is not an all day event.
   */
  isAllDayEvent?: boolean;

  /**
   * Optional location of the event. Locations should ideally be Google Maps
   * friendly.
   */
  location?: string;

  /**
   * A plain JavaScript date which sets the start date of the event. Remember
   * that months in JavaScript Date objects are zero indexed.
   */
  startDate: Date;

  /**
   * The timezone the event should be set to. The options are as follows:
   *
   * - If left undefined, the default behaviour will use UTC.
   * - A custom timezone can be passed, in the tz database name format, e.g.
   * Europe/Paris'. See here for a full list -
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * - The users own timezone can be used by passing the constant
   * USER_TIME_ZONE.
   */
  timeZone?: string;

  /** The title of the event */
  title: string;
}

function formatDateSegment(dateSegment: number): string {
  return dateSegment.toString().padStart(2, "0");
}

function formatDateString(
  date: Date,
  isAllDayEvent = false,
  timeZone = UTC_TIME_ZONE_CODE,
): string {
  const year = date.getFullYear();
  const month = formatDateSegment(date.getMonth() + 1);
  const day = formatDateSegment(date.getDate());

  if (isAllDayEvent) {
    return `${year}${month}${day}`;
  } else {
    // Timezone should only be included in the date string if UTC ('Z') is being
    // used.
    const timeZoneCode =
      timeZone === UTC_TIME_ZONE_CODE ? UTC_TIME_ZONE_CODE : "";
    const hours = formatDateSegment(date.getHours());
    const minutes = formatDateSegment(date.getMinutes());
    const seconds = formatDateSegment(date.getSeconds());

    return `${year}${month}${day}T${hours}${minutes}${seconds}${timeZoneCode}`;
  }
}

abstract class CalendarEvent {
  abstract getEventLink(): string;
}

/**
 * Creates a calendar event which can be used to generate calendar invitation
 * links. Example usage:
 *
 * const options = {
 *   endDate: new Date(2020, 1, 1, 13, 30),
 *   location: 'London',
 *   startDate: new Date(2020, 1, 1, 12, 30),
 *   title: 'My event',
 * };
 *
 * const calendarEvent = new CalendarEvent(options);
 *
 * calendarEvent.getGoogleCalendarEventLink();
 */
export class GoogleCalendarEvent extends CalendarEvent {
  constructor(private readonly options: GoogleCalendarEventOptions) {
    super();
  }

  getEventLink(): string {
    const {
      details,
      endDate,
      isAllDayEvent,
      location,
      startDate,
      timeZone,
      title,
    } = this.options;

    if (isDevMode() && startDate.getTime() > endDate.getTime()) {
      throw new Error("Start date must not be later than end date!");
    }

    const formattedStartDate = formatDateString(
      startDate,
      isAllDayEvent,
      timeZone,
    );
    const formattedEndDate = formatDateString(endDate, isAllDayEvent, timeZone);
    const timeZoneSection =
      timeZone && timeZone !== USER_TIME_ZONE ? `&ctz=${timeZone}` : "";
    const detailsSection = details ? `&details=${details}` : "";
    const locationSection = location ? `&location=${location}` : "";

    return encodeURI(
      `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=${
        formattedStartDate
      }/${formattedEndDate}&text=${title}${
        timeZoneSection
      }${detailsSection}${locationSection}`,
    );
  }
}
