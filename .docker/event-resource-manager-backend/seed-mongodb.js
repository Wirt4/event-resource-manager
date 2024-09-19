const seed_data = [
    {
        name: "The Band Wagon",
        showtimes: [
            '2024-01-30 17:00:00'
        ],
        event_id: "134532",
    },
    {
        name: "Vintage Hitchcock",
        showtimes: [
            '2024-10-11 19:00:00',
            '2024-10-12 19:00:00',
            '2024-10-13 15:00:00',
            '2024-10-18 19:00:00',
            '2024-10-19 19:00:00',
            '2024-10-20 15:00:00'
        ],
        event_id: "56018",
    },
    {
        name: "Batman Returns",
        showtimes: [
            '2024-12-25 15:00:00'
        ],
        event_id: "234523"
    }
]

//invoke mongo functionality
db.theater_events.insert(seed_data)
