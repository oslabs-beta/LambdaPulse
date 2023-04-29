export function getApiBaseUrl() {
    if (import.meta.env.MODE === 'test') {
      return 'http://localhost:3000';
    }
    return '';
  }