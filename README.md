TZ
==

Formatting of iso8601 dates. Things like:


    ok(tz.format('2012-10-09T15:29:59+08:00', '{h}:{mm} {A}') === '3:29 PM', 'time format failed');
    ok(tz.format('2012-10-09T15:29:59+08:00', '{MM}') === '10', 'MM');
    ok(tz.format('2012-05-09T15:29:59+08:00', '{M}') === '5', 'M - ' + tz.format('2012-05-09T15:29:59+08:00', '{M}'));
    ok(tz.format('2012-05-09T15:29:59+08:00', '{DD}') === '09', 'DD - ' + tz.format('2012-05-09T15:29:59+08:00', '{DD}'));
    ok(tz.format('2012-05-09T15:29:59+08:00', '{D}') === '9', 'D - ' + tz.format('2012-05-09T15:29:59+08:00', '{D}'));
    ok(tz.format('2012-10-09T15:29:59+08:00', '{h}:{mm} {A} {h}') === '3:29 PM 3', 'time format with repeating tokens failed');
    console.log(tz.format('2012-10-12T15:29:59+08:00', 'T h:mm A'));
    ok(tz.format('2012-10-12T15:29:59+08:00', '{T} at {h}:{mm} {A}') === 'Today at 3:29 PM', '{T} - ' + tz.format('2012-10-12T15:29:59+08:00', '{T} at {h}:{mm} {A}'));
    ok(tz.format('2012-10-13T15:29:59+08:00', '{T} at {h}:{mm} {A}') === 'Tomorrow at 3:29 PM', 'time format with Tomorrow failed');
    ok(tz.format('2012-10-14T15:29:59+08:00', '{T} at {h}:{mm} {A}') === '14/10/2012 at 3:29 PM', 'time format with date failed - ' + tz.format('2012-10-14T15:29:59+08:00', '{T} at {h}:{mm} {A}'));
