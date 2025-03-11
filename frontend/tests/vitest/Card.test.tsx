import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../../src/components/BackgroundCards/Card';
import { IBackgroundType } from '../../../common/types/background-type-interface';

//values mock
const mockTogglePinned = vi.fn();

const mockGetRandom = vi.fn().mockResolvedValue({
    id: 1,
    title: 'Test Trait',
    description: 'A test trait description',
    type: IBackgroundType.TRAIT
});

const mockBackground = vi.fn().mockResolvedValue({
    id: 1,
    title: 'Test Trait',
    description: 'A test trait description',
    type: IBackgroundType.TRAIT
});

const mockContextValue = {
    getRandomBackground: mockGetRandom,
    addUserBackground: vi.fn(),
    togglePinned: mockTogglePinned,
    currentBackgrounds: {
        [IBackgroundType.TRAIT]: mockBackground,
        [IBackgroundType.BOND]: mockBackground,
        [IBackgroundType.FLAW]: mockBackground,
        [IBackgroundType.IDEAL]: mockBackground
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
};

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
    useBackgroundContext: () => mockContextValue
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

    test('fetches new background when card is clicked', () => {

        render(<Card type={IBackgroundType.TRAIT} />);

        const card = screen.getByText('?').closest('a');
        expect(card).not.toBeNull();
        fireEvent.click(card as HTMLElement);

        expect(mockGetRandom).toHaveBeenCalledWith(IBackgroundType.TRAIT);
    });

    test('opens modal when "Add Background" button is clicked', () => {
        render(<Card type={IBackgroundType.TRAIT} />);

        const addButton = screen.getByText('Add Background');
        fireEvent.click(addButton);

        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
});