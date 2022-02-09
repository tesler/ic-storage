export const addMonthToDate = (date: Date, months: number): Date => {
    date.setMonth(date.getMonth() + months);
    return date;
};
