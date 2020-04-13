export class TimeSpanFormatter {
    private static  OneHour = 60 * 60 * 1000
    static format(timeSpan: number):string {
        if (timeSpan >= 0) {
            const timeSpanAsDate = new Date(timeSpan - this.OneHour)
            const hoursPart = timeSpanAsDate.getHours() === 0 ? "" : `${timeSpanAsDate.getHours()}h `
            let minutesPart = `${timeSpanAsDate.getMinutes()}m `
            if (hoursPart === "")
                minutesPart = timeSpanAsDate.getMinutes() === 0 ? "" : `${timeSpanAsDate.getMinutes()}m `
            return `${hoursPart}${minutesPart}${timeSpanAsDate.getSeconds()}s`
        } else {
            return "overdue"
        }
    }
}