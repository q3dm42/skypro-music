import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Filter from './Filter';
import { defaultTrackFilters } from '@/utils/filterTracks';
import { createTrack } from '@/test/trackFactory';

const tracks = [
  createTrack({ _id: 1, author: 'Nero', genre: ['Rock'] }),
  createTrack({ _id: 2, author: 'Mixkit', genre: ['Jazz'] }),
];

describe('Filter', () => {
  it('opens only selected category and selects author', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();

    render(
      <Filter
        filters={defaultTrackFilters}
        onFilterChange={handleFilterChange}
        tracks={tracks}
      />,
    );

    await user.click(screen.getByRole('button', { name: /исполнителю/i }));
    expect(screen.getByRole('button', { name: 'Nero' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /жанру/i }));
    expect(screen.queryByRole('button', { name: 'Nero' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rock' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Rock' }));
    expect(handleFilterChange).toHaveBeenCalledWith({
      ...defaultTrackFilters,
      genre: 'Rock',
    });
  });

  it('selects date sort option', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();

    render(
      <Filter
        filters={defaultTrackFilters}
        onFilterChange={handleFilterChange}
        tracks={tracks}
      />,
    );

    await user.click(screen.getByRole('button', { name: /году выпуска/i }));
    await user.click(screen.getByRole('button', { name: 'Сначала новые' }));

    expect(handleFilterChange).toHaveBeenCalledWith({
      ...defaultTrackFilters,
      sortOrder: 'new',
    });
  });
});
