import dayjs from "dayjs"

export const getDateTimeFormat = (datetime: string) => {
    return dayjs(datetime).format("MMM DD, YYYY hh:mm A")
}