const seed_data = [
    {
        name: "The Band Wagon",
        showtimes: [
            1738285200
        ],
        event_id: "134532",
        opening_night: 1738285200
    },
    {
        name: "Vintage Hitchcock",
        showtimes: [
            1728698400,
            1728784800,
            1728856800,
            1729303200,
            1729389600,
            1729461600
        ],
        event_id: "56018",
        opening_night: 1728698400
    },
    {
        name: "Batman Returns",
        showtimes: [
            1735167600
        ],
        event_id: "234523",
        opening_night: 1735167600
    }
]

//invoke mongo functionality
db.theater_events.insert(seed_data)
