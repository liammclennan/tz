var testCount = 0, today = new Date(2012, 9, 12);

function ok(condition, message) {
    testCount++;
    if (!condition) throw new Error('ggaaahh: ' + message);
}

var tz = {
    format: function(iso8601, pattern) {
        var parsed = this.parse(iso8601),
            copy = pattern;

        for (var key in parsed) {
            copy = copy.replace(new RegExp('\{' + key + '\}', 'g'), parsed[key]);
        }

        return copy;
    },

    parse: function(iso8601) {
        var timeIndex = iso8601.indexOf('T') + 1;
        var time = iso8601.substring(timeIndex, timeIndex + 8);
        var isPm = parseInt(time.substring(0, 2)) > 12;
        var hours = isPm ? 
            parseInt(time.substring(0, 2)) - 12 : 
            parseInt(time.substring(0, 2));

        var minutes = time.substring(3, 5);
        var seconds = time.substring(6, 8);
        var today = today || new Date();
        var target = new Date(iso8601);

        function isToday() {
            return today.getUTCFullYear() === target.getUTCFullYear()
                && today.getUTCMonth() === target.getUTCMonth()
                && today.getUTCDate() === target.getUTCDate();
        }

        function isTomorrow() {
            var diff = target - today,
                msInTwoDays = 48 * 3600 * 1000;
            return !isToday() && diff > 0 && diff < msInTwoDays;
        }

        function getT() {
            if (isToday()) return 'Today';
            if (isTomorrow()) return 'Tomorrow';
            return iso8601.substring(8, 10) + '/' + iso8601.substring(5,7) + '/' + iso8601.substring(0, 4); 
        }

        // note to self, order these with decreasing specificity (don't want to match h before hh)
        return {
            'YYYY': iso8601.substring(0, 4),
            'MM': iso8601.substring(5,7),
            'M': parseInt(iso8601.substring(5,7), 10).toString(),
            'DD': iso8601.substring(8, 10),
            'D': parseInt(iso8601.substring(8, 10), 10).toString(),
            'A': isPm ? 'PM' : 'AM',
            'a': isPm ? 'pm' : 'am',
            'h': hours,
            'mm': minutes,
            'ss': seconds,
            'T': getT() // Today, tomorrow or dd/mm/yy
        };
    }
};

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

console.log(testCount + ' tests passed');