import { formatMoney, formatNumber } from 'accounting-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default function initializeFilters(Vue) {
  Vue.filter('currency', money => formatMoney(money / 100, '$', 2));
  Vue.filter('point', point => formatNumber(point / 100, 2));
  Vue.filter('duration', service => {
    let duration = service.durationHours ? `${service.durationHours}h ` : '';
    duration += `${service.durationMinutes}min`;
    return duration;
  });
  Vue.filter('bookingDuration', booking => {
    const startAt = Vue.moment(booking.startAt, 'YYYY-MM-DD hh:mm:ss');
    const endAt = Vue.moment(booking.endAt, 'YYYY-MM-DD hh:mm:ss');
    const duration = Vue.moment.duration(endAt.diff(startAt));
    const hours = duration.hours();
    const minutes = duration.minutes();
    let result = hours ? `${hours}h ` : '';
    result += `${minutes}min`;
    return result;
  });
  Vue.filter('momentUtc', (date, format) => Vue.moment.utc(date).format(format));
  Vue.filter('fullName', user => {
    return user ? `${user.firstName} ${user.lastName}` : '';
  });
  Vue.filter('minuteToDuration', minutes => {
    return Vue.moment.utc().startOf('day').add({ minutes }).format('H[h] mm[m]');
  });
  Vue.filter('nationalPhoneNumber', phone => {
    if (phone) {
      const parsedPhone = parsePhoneNumberFromString(phone);
      return parsedPhone ? parsedPhone.formatNational() : phone;
    }
    return phone;
  });
}
