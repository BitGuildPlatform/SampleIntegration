export function makeError(message, status = 400, data = {}) {
  return Object.assign(new Error(), {message, status, ...data});
}

