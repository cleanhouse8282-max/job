
CREATE TABLE reservations (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
phone TEXT,
category TEXT,
timeslot TEXT,
roadAddress TEXT,
detailAddress TEXT,
pyeong INTEGER,
date TEXT,
status TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
UNIQUE(date,timeslot)
);
