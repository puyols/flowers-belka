// jest.setup.js
import '@testing-library/jest-dom';

// Mock IntersectionObserver for OptimizedImage component
const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

// Mock fetch for useAnalytics hook and other API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ success: true, cart: { items: [], total_items: 0, total_price: 0 } }),
  })
);
