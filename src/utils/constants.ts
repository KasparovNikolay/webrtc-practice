export const constants = {
  LOGOUT_LINK: window.location.origin || 'https://127.0.0.1:3000/',
}

export const socketConfig = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] }
