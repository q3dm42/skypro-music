import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import Centerblock from './Centerblock';
import { makeStore } from '@/store/store';
import { createTrack } from '@/test/trackFactory';

vi.mock('../FavoriteButton/FavoriteButton', () => ({
  default: () => <button type="button">like</button>,
}));

const tracks = [
  createTrack({ _id: 1, name: 'Alpha', author: 'Nero', genre: ['Rock'] }),
  createTrack({ _id: 2, name: 'Beta', author: 'Mixkit', genre: ['Jazz'] }),
];

function renderCenterblock() {
  render(
    <Provider store={makeStore()}>
      <Centerblock title="Треки" tracks={tracks} />
    </Provider>,
  );
}

describe('Centerblock', () => {
  it('filters playlist by search query', async () => {
    const user = userEvent.setup();
    renderCenterblock();

    await user.type(screen.getByPlaceholderText('Поиск'), 'Be');

    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('shows empty state when no tracks match', async () => {
    const user = userEvent.setup();
    renderCenterblock();

    await user.type(screen.getByPlaceholderText('Поиск'), 'zzz');

    expect(screen.getByText('Нет подходящих треков')).toBeInTheDocument();
  });
});
