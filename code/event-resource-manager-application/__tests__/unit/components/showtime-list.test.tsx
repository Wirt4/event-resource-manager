import ShowtimeListItem from "@/components/showtime-list";

describe('showtimes list item test',()=>{
    test('New Years Eve',()=> {

        const expected=
                <li>
                   Dec 31, 2024 11:59 pm
                </li>

        const result = ShowtimeListItem({ showtime: '2024-12-31 23:59:00'})

        expect(result).toEqual(expected);
    })
    test('New Years Day',()=> {

        const expected=
            <li>
                Jan 1, 2025 12:00 am
            </li>

        const result = ShowtimeListItem({ showtime: '2025-01-01 00:00:00'})

        expect(result).toEqual(expected);
    })
})