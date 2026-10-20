export default class DeliveryInfo {
  constructor({ fullName = '', phone = '', address = '' } = {}) {
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
  }

  // Returns { fieldName: true } for each invalid field; look the message up in UI_TEXT.checkout.errors.
  getErrors() {
    const errors = {};
    const phoneDigits = this.phone.replace(/\D/g, '');
    if (this.fullName.trim().length < 2) errors.fullName = true;
    if (!/^[\d\s()+-]+$/.test(this.phone.trim()) || phoneDigits.length < 7) errors.phone = true;
    if (this.address.trim().length < 5) errors.address = true;
    return errors;
  }

  isValid() {
    return Object.keys(this.getErrors()).length === 0;
  }
}
