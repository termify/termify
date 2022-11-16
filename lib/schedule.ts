import { ScheduleDate } from '../components/schedule/schedule';

export type Language = 'de';

interface Months {
    [lang: string]: Record<string, string>;
}

export default class ScheduleClass {
    static months: Months = {
        de: {
            1: 'Januar',
            2: 'Februar',
            3: 'März',
            4: 'April',
            5: 'Mai',
            6: 'Juni',
            7: 'Juli',
            8: 'August',
            9: 'September',
            10: 'Oktober',
            11: 'November',
            12: 'Dezember',
        },
    };

    public static parseMonthNumberToString(month: number, language: Language): string {
        return this.months[language][month] || 'Monat';
    }

    public static daysInMonth(date: ScheduleDate): number {
        return new Date(date.year, date.month, 0).getDate();
    }
}
