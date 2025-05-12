import {
  BASE_URL_ADD_TO_CALENDAR_URL,
  GoogleCalendarEventOptions,
  GoogleCalendarEvent,
  USER_TIME_ZONE,
} from "./add_to_calendar";

const MOCK_START_DATE = new Date(2019, 4, 5, 11, 30);
const MOCK_END_DATE = new Date(2019, 4, 6, 11, 30);
const MOCK_CONVERTED_START_DATE = "20190505T113000";
const MOCK_CONVERTED_END_DATE = "20190506T113000";
const MOCK_LOCATION = "London";
const MOCK_TITLE = "Some event name";
const MOCK_DETAILS = "Some event details";
const MOCK_TIMEZONE = "America/New_York";

describe("The GoogleCalendarEvent class", () => {
  it("returns a link without any event details or location", () => {
    const MOCK_OPTIONS: GoogleCalendarEventOptions = {
      endDate: MOCK_END_DATE,
      startDate: MOCK_START_DATE,
      title: MOCK_TITLE,
    };

    const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

    const expectedLink = encodeURI(
      `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=${MOCK_CONVERTED_START_DATE}Z/${
        MOCK_CONVERTED_END_DATE
      }Z&text=${MOCK_TITLE}`,
    );

    expect(calendarEvent.getEventLink()).toBe(expectedLink);
  });

  it("returns a link with event details and location", () => {
    const MOCK_OPTIONS: GoogleCalendarEventOptions = {
      details: MOCK_DETAILS,
      endDate: MOCK_END_DATE,
      location: MOCK_LOCATION,
      startDate: MOCK_START_DATE,
      title: MOCK_TITLE,
    };
    const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

    const expectedLink = encodeURI(
      `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=${
        MOCK_CONVERTED_START_DATE
      }Z/${MOCK_CONVERTED_END_DATE}Z&text=${
        MOCK_TITLE
      }&details=${MOCK_DETAILS}&location=${MOCK_LOCATION}`,
    );

    expect(calendarEvent.getEventLink()).toBe(expectedLink);
  });

  it("returns a link for an all day event correctly", () => {
    const MOCK_OPTIONS: GoogleCalendarEventOptions = {
      endDate: new Date(2019, 4, 7),
      isAllDayEvent: true,
      startDate: new Date(2019, 4, 6),
      title: MOCK_TITLE,
    };
    const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

    const expectedLink = encodeURI(
      `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=20190506/20190507&text=${
        MOCK_TITLE
      }`,
    );
    expect(calendarEvent.getEventLink()).toBe(expectedLink);
  });

  it(
    "returns a link for an event where the timezone is set to the users " +
      "default",
    () => {
      const MOCK_OPTIONS: GoogleCalendarEventOptions = {
        endDate: MOCK_END_DATE,
        startDate: MOCK_START_DATE,
        title: MOCK_TITLE,
        timeZone: USER_TIME_ZONE,
      };
      const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

      const expectedLink = encodeURI(
        `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=${
          MOCK_CONVERTED_START_DATE
        }/${MOCK_CONVERTED_END_DATE}&text=${MOCK_TITLE}`,
      );

      expect(calendarEvent.getEventLink()).toBe(expectedLink);
    },
  );

  it("returns a link for an event where a custom timezone is set", () => {
    const MOCK_OPTIONS: GoogleCalendarEventOptions = {
      endDate: MOCK_END_DATE,
      startDate: MOCK_START_DATE,
      title: MOCK_TITLE,
      timeZone: MOCK_TIMEZONE,
    };
    const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

    const expectedLink = encodeURI(
      `${BASE_URL_ADD_TO_CALENDAR_URL}&dates=${MOCK_CONVERTED_START_DATE}/${
        MOCK_CONVERTED_END_DATE
      }&text=${MOCK_TITLE}&ctz=${MOCK_TIMEZONE}`,
    );

    expect(calendarEvent.getEventLink()).toBe(expectedLink);
  });

  it("throws an error if the start date is later than the end date", () => {
    const MOCK_OPTIONS: GoogleCalendarEventOptions = {
      endDate: new Date(2019, 0, 1),
      startDate: new Date(2020, 0, 1),
      title: MOCK_TITLE,
    };
    const calendarEvent = new GoogleCalendarEvent(MOCK_OPTIONS);

    expect(() => calendarEvent.getEventLink()).toThrowError();
  });
});
