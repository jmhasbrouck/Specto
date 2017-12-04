
class Time {
    constructor (m, s, ms) {
	var localMs = m * 60 * 1000 + s * 1000 + ms;
	this.date = new Date(localMs);
    }
    // code liberally taken from https://gist.github.com/polygonplanet/7952234
    getTime(template) {
	var specs = 'YYYY:MM:DD:HH:mm:ss:ms'.split(':');
	return this.date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
	    return template.split(specs[i]).join(item);
	}, template);
    }
    setMin(m) {
	this.date.setMinutes(m);
    }
    setSec(s) {
	this.date.setSeconds(s);
    }
    setMs(ms) {
	this.date.setTime(ms);
    }
    setDate(date) {
	this.date = date;
    }
    getTotalMS() {
	return this.date.getMinutes() * 60 * 1000 + this.date.getSeconds() * 1000 + this.date.getMilliseconds();
    }
}
