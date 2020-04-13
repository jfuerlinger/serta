import {TimeSpanFormatter} from "../../../src/commands/serta-status/time-span-formatter";

test("TimeSpanFormatter.format formats time span with full hours, minutes, and seconds", () => {
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("14 April 2020 7:32:15")
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("23h 59m 15s")
})

test("TimeSpanFormatter.format formats time span with one digit seconds", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 19:44:05")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("12h 11m 5s")
})

test("TimeSpanFormatter.format formats time span with 0 hours", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 7:35:05")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("2m 5s")
})

test("TimeSpanFormatter.format formats time span with 0 hours and 0 minutes", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 7:33:05")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("5s")
})

test("TimeSpanFormatter.format formats time span with hours but 0 minutes", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 9:33:05")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("2h 0m 5s")
})

test("TimeSpanFormatter formats time span with 0 h , 0 m, 0 s", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 7:33:00")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("0s")
})

test("TimeSpanFormatter formats time span with negative time span", () => {
    // when
    const startDate = Date.parse("13 April 2020 7:33:00")
    const endDate = Date.parse("13 April 2020 7:32:59")

    // then
    expect(TimeSpanFormatter.format(endDate - startDate)).toBe("overdue")
})