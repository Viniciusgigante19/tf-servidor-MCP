// src/mcp/mcp.js

const events = {};

/**
 * Registra um listener para um evento
 * @param {string} eventName 
 * @param {Function} callback 
 */
function on(eventName, callback) {
  if (!events[eventName]) events[eventName] = [];
  events[eventName].push(callback);
}

/**
 * Emite um evento, chamando todos os listeners registrados
 * @param {string} eventName 
 * @param {any} payload 
 */
function emit(eventName, payload) {
  const listeners = events[eventName] || [];
  listeners.forEach((callback) => callback(payload));
}

/**
 * Remove um listener de um evento
 * @param {string} eventName 
 * @param {Function} callback 
 */
function off(eventName, callback) {
  if (!events[eventName]) return;
  events[eventName] = events[eventName].filter((cb) => cb !== callback);
}

const MCP = {
  on,
  off,
  emit,
};

export default MCP;
