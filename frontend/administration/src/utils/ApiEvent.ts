class ApiEvent<T = any> {
  handled = false;
  content: T;
  constructor(val: T) {
    this.content = val;
  }

  markHandled() {
    this.handled = true;
  }

  hasBeenHandled() {
    if (this.handled) return true;
    this.markHandled();
    return false;
  }

  getContent() {
    this.handled = true;
    return this.content;
  }
}

export default ApiEvent;
