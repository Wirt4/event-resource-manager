const seed_data = [
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
    }
]

//invoke mongo functionality
db.theater_events.insert(seed_data)