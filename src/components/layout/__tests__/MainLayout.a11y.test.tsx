import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import MainLayout from '../MainLayout';

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: {
      id: 1,
      name: 'Jane Doe',
      role: 'admin',
      apartment: null,
    },
    logout: vi.fn(),
  }),
}));

describe('MainLayout accessibility', () => {
  it('renders a skip link to main content', () => {
    render(
      <MemoryRouter>
        <MainLayout title="Dashboard">Body content</MainLayout>
      </MemoryRouter>,
    );

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' });

    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('moves focus to the page heading on render', async () => {
    render(
      <MemoryRouter>
        <MainLayout title="Dashboard">Body content</MainLayout>
      </MemoryRouter>,
    );

    const heading = screen.getByRole('heading', { level: 1, name: 'Dashboard' });

    await waitFor(() => {
      expect(document.activeElement).toBe(heading);
    });
  });
});
