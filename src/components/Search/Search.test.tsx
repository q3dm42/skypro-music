import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Search from './Search';

describe('Search', () => {
  it('calls onChange with typed value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Search value="" onChange={handleChange} />);
    await user.type(screen.getByPlaceholderText('Поиск'), 'abc');

    expect(handleChange).toHaveBeenLastCalledWith('c');
  });
});
