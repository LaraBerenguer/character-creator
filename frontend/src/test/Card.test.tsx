import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/BackgroundCards/Card';
import { IBackgroundType } from '../../../common/types/background-type-interface';

const mockTogglePinned = vi.fn();

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
});

//context mock
vi.mock('../context/AuthContext', () => ({
    useAuth: () => ({
        user: { id: 1, username: 'testuser', email: 'test@example.com' },
        loading: false,
        error: null,
        login: vi.fn(),
        logout: vi.fn()
    })
}));

vi.mock('../context/BackgroundContext', () => ({
    useBackgroundContext: () => ({
        getRandomBackground: vi.fn(),
        addUserBackground: vi.fn(),
        togglePinned: mockTogglePinned,
        currentBackgrounds: {
            [IBackgroundType.TRAIT]: null,
            [IBackgroundType.BOND]: null,
            [IBackgroundType.FLAW]: null,
            [IBackgroundType.IDEAL]: null
        },
        pinnedBackgrounds: {
            [IBackgroundType.TRAIT]: false,
            [IBackgroundType.FLAW]: false,
            [IBackgroundType.BOND]: false,
            [IBackgroundType.IDEAL]: false
        },
        getByType: vi.fn(),
        getRandomAll: vi.fn(),
        setOneBackground: vi.fn(),
        refreshBackgrounds: 0
    })
}));

describe('Card', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders card with initial empty state', () => {
        render(
            <Card type={IBackgroundType.TRAIT} />
        );

        //screen.debug
        expect(screen.getByText('TRAIT')).toBeInTheDocument();
        expect(screen.getByText('?')).toBeInTheDocument();
        expect(screen.getByText('???')).toBeInTheDocument();
    });

    test('handles pin toggle correctly', () => {
        render(
            <Card type={IBackgroundType.TRAIT} />
        );

        const pinButton = screen.getByText('Pin');
        fireEvent.click(pinButton);
        //userevent

        expect(mockTogglePinned).toHaveBeenCalledWith(IBackgroundType.TRAIT);
    });
});