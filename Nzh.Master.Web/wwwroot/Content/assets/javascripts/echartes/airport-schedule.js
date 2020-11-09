var data1 = []
var data2 = []
var rawData = {
    "parkingApron": {
        "dimensions": ["Name", "Type", "Near Bridge"],
        "data": data1
    },
    "flight": {
        "dimensions": ["Parking Apron Index", "Arrival Time", "Departure Time", "Flight Number", "VIP", "Arrival Company", "Departure Company", "Arrival Line", "Departure Line", "Report Time"],
        "data": data2
    }
}

var rawData1 = {
    "parkingApron": {
        "dimensions": ["Name", "Type", "Near Bridge"],
        "data": [["L0", "#line0", true],
        ["L1", "#line1", true],
        ["L2", "#line2", true],
            ["L3", "#line3", true],
            ["L4", "#line4", true],
            ["L5", "#line5", true]
        ]
    },
    "flight": {
        "dimensions": ["Parking Apron Index", "Arrival Time", "Departure Time", "Flight Number", "VIP", "Arrival Company", "Departure Company", "Arrival Line", "Departure Line", "Report Time"],
        "data": [

            [0, 1585670400000, 1585674000000, "GG0", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585674000000],
            [0, 1585756800000, 1585760400000, "GG1", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585760400000],
            [0, 1585843200000, 1585846800000, "GG2", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585846800000],
            [0, 1585929600000, 1585933200000, "GG3", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585933200000],
            [0, 1586016000000, 1586019600000, "GG4", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586019600000],
            [0, 1586102400000, 1586106000000, "GG5", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586106000000],
            [0, 1586188800000, 1586192400000, "GG6", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586192400000],
            [0, 1585713600000, 1585717200000, "GG7", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585717200000],
            [0, 1585800000000, 1585803600000, "GG8", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585803600000],
            [0, 1585886400000, 1585890000000, "GG9", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585890000000],
            [0, 1585972800000, 1585976400000, "GG10", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585976400000],
            [0, 1586059200000, 1586062800000, "GG11", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586062800000],
            [0, 1586145600000, 1586149200000, "GG12", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586149200000],
            [0, 1586232000000, 1586235600000, "GG13", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586235600000],

            [1, 1585670400000, 1585674000000, "GG0", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585674000000],
            [1, 1585756800000, 1585760400000, "GG1", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585760400000],
            [1, 1585843200000, 1585846800000, "GG2", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585846800000],
            [1, 1585929600000, 1585933200000, "GG3", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585933200000],
            [1, 1586016000000, 1586019600000, "GG4", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586019600000],
            [1, 1586102400000, 1586106000000, "GG5", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586106000000],
            [1, 1586188800000, 1586192400000, "GG6", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586192400000],
            [1, 1585713600000, 1585717200000, "GG7", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585717200000],
            [1, 1585800000000, 1585803600000, "GG8", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585803600000],
            [1, 1585886400000, 1585890000000, "GG9", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585890000000],
            [1, 1585972800000, 1585976400000, "GG10", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585976400000],
            [1, 1586059200000, 1586062800000, "GG11", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586062800000],
            [1, 1586145600000, 1586149200000, "GG12", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586149200000],
            [1, 1586232000000, 1586235600000, "GG13", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586235600000],
            [1, 1585756800000, 1586192400000, "GG6", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586192400000],

            [2, 1585670400000, 1585674000000, "GG0", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585674000000],
            [2, 1585756800000, 1585760400000, "GG1", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585760400000],
            [2, 1585843200000, 1585846800000, "GG2", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585846800000],
            [2, 1585929600000, 1585933200000, "GG3", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585933200000],
            [2, 1586016000000, 1586019600000, "GG4", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586019600000],
            [2, 1586102400000, 1586106000000, "GG5", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586106000000],
            [2, 1586188800000, 1586192400000, "GG6", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586192400000],
            [2, 1585713600000, 1585717200000, "GG7", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585717200000],
            [2, 1585800000000, 1585803600000, "GG8", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585803600000],
            [2, 1585886400000, 1585890000000, "GG9", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585890000000],
            [2, 1585972800000, 1585976400000, "GG10", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585976400000],
            [2, 1586059200000, 1586062800000, "GG11", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586062800000],
            [2, 1586145600000, 1586149200000, "GG12", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586149200000],
            [2, 1586232000000, 1586235600000, "GG13", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586235600000],

            [3, 1585670400000, 1585674000000, "GG0", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585674000000],
            [3, 1585756800000, 1585760400000, "GG1", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585760400000],
            [3, 1585843200000, 1585846800000, "GG2", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585846800000],
            [3, 1585929600000, 1585933200000, "GG3", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585933200000],
            [3, 1586016000000, 1586019600000, "GG4", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586019600000],
            [3, 1586102400000, 1586106000000, "GG5", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586106000000],
            [3, 1586188800000, 1586192400000, "GG6", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586192400000],
            [3, 1585713600000, 1585717200000, "GG7", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585717200000],
            [3, 1585800000000, 1585803600000, "GG8", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585803600000],
            [3, 1585886400000, 1585890000000, "GG9", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585890000000],
            [3, 1585972800000, 1585976400000, "GG10", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1585976400000],
            [3, 1586059200000, 1586062800000, "GG11", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586062800000],
            [3, 1586145600000, 1586149200000, "GG12", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586149200000],
            [3, 1586232000000, 1586235600000, "GG13", true, "AS", "AS", "XGF-HAC", "HAC-SIY", 1586235600000],

        ]
    }
}