import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Card from '../../src/components/BackgroundCards/Card';
import { IBackgroundType } from '../../../common/types/background-type-interface';
import { BackgroundContext } from '../../src/context/BackgroundContext';
import { AuthContext } from '../../src/context/AuthContext';

//values mock
const mockTogglePinned = vi.fn();

const mockGetRandom = vi.fn().mockResolvedValue({
    id: 1,
    title: 'Test Trait',
    description: 'A test trait description',
    type: IBackgroundType.TRAIT
});

const mockBackground = {
    id: 1,
    title: 'Test Trait',
    description: 'A test trait description',
    type: IBackgroundType.TRAIT
};

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
    refreshBackgrounds: 0,
    getBackgroundById: vi.fn(),
    clearBackgrounds: vi.fn()
};

const mockAuthContextValue = {
    user: {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        roles: ['user'],
        createdAt: new Date().toISOString(),
    },
    isAuthenticated: true,
    loading: false,
    error: null,
    login: vi.fn().mockResolvedValue(true),
    logout: vi.fn(),
    register: vi.fn(),
    updateUser: vi.fn(),
    checkAuthStatus: vi.fn()
};

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
});

//provider mock
const MockBackgroundProvider: React.FC<{ children: React.ReactNode, contextValue: typeof mockContextValue }> = ({ children, contextValue }) => {
    return (
        <BackgroundContext.Provider value={contextValue}>
            {children}
        </BackgroundContext.Provider>
    );
};

//auth provider mock
const MockAuthProvider: React.FC<{ children: React.ReactNode, contextValue: any }> = ({ children, contextValue }) => {
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

//router mock
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    useLocation: () => ({
        pathname: '/test-path',
        search: '',
        hash: '',
        state: null
    }),
    Link: ({ children, to }: { children: React.ReactNode, to: string }) =>
        <a href={to}>{children}</a>,
    Navigate: ({ to }: { to: string }) => <div>Redirecting to {to}</div>,
    Outlet: () => <div>Outlet Content</div>,
    useParams: () => ({ id: '123' })
}));


describe('Card', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    test('renders card with initial empty state', () => {
        const emptyContextValue = {
            ...mockContextValue,
            currentBackgrounds: {
                [IBackgroundType.TRAIT]: null,
                [IBackgroundType.BOND]: null,
                [IBackgroundType.FLAW]: null,
                [IBackgroundType.IDEAL]: null
            } 
        } as unknown as typeof mockContextValue;

        render(
            <MockAuthProvider contextValue={mockAuthContextValue}>
                <MockBackgroundProvider contextValue={emptyContextValue}>
                    <Card type={IBackgroundType.TRAIT} />
                </MockBackgroundProvider>
            </MockAuthProvider>
        );

        //screen.debug
        expect(screen.getByText('TRAIT')).toBeInTheDocument();
        expect(screen.getByText('?')).toBeInTheDocument();
        expect(screen.getByText('???')).toBeInTheDocument();
    });

    test('renders card with specific background data', () => {
        //specific mock
        const braveContextValue = {
            ...mockContextValue,
            currentBackgrounds: {
                ...mockContextValue.currentBackgrounds,
                [IBackgroundType.TRAIT]: {
                    id: 1,
                    title: 'Brave',
                    description: 'Never backs down from a challenge',
                    type: IBackgroundType.TRAIT
                }
            }
        };

        act(() => {
            render(
                <MockAuthProvider contextValue={mockAuthContextValue}>
                    <MockBackgroundProvider contextValue={braveContextValue}>
                        <Card type={IBackgroundType.TRAIT} />
                    </MockBackgroundProvider>
                </MockAuthProvider>
            );
        });

        expect(screen.getByText('TRAIT')).toBeInTheDocument();
        expect(screen.getByText('Brave')).toBeInTheDocument();
        expect(screen.getByText('Never backs down from a challenge')).toBeInTheDocument();
        expect(screen.queryByText('?')).not.toBeInTheDocument();
        expect(screen.queryByText('???')).not.toBeInTheDocument();
    });

    test('handles pin toggle correctly', () => {
        act(() => {
            render(
                <MockAuthProvider contextValue={mockAuthContextValue}>
                    <MockBackgroundProvider contextValue={mockContextValue}>
                        <Card type={IBackgroundType.TRAIT} />
                    </MockBackgroundProvider>
                </MockAuthProvider>
            );
        });

        const pinButton = screen.getByText('Pin');
        act(() => {
            fireEvent.click(pinButton);
        });
        //userevent

        expect(mockTogglePinned).toHaveBeenCalledWith(IBackgroundType.TRAIT);
    });

    test('fetches new background when card is clicked', () => {

        const emptyContextValue = {
            ...mockContextValue,
            currentBackgrounds: {
                ...mockContextValue.currentBackgrounds,
                [IBackgroundType.TRAIT]: { id: 0, title: '', description: '', type: IBackgroundType.TRAIT }
            }
        };

        act(() => {
            render(
                <MockAuthProvider contextValue={mockAuthContextValue}>
                    <MockBackgroundProvider contextValue={emptyContextValue}>
                        <Card type={IBackgroundType.TRAIT} />
                    </MockBackgroundProvider>
                </MockAuthProvider>
            );
        });

        const card = screen.getByTestId('card-link'); //buscar 
        expect(card).not.toBeNull();

        act(() => {
            fireEvent.click(card);
        });

        expect(mockGetRandom).toHaveBeenCalledWith(IBackgroundType.TRAIT);
    });

    test('opens modal when "Add Background" button is clicked', () => {
        act(() => {
            render(
                <MockAuthProvider contextValue={mockAuthContextValue}>
                    <MockBackgroundProvider contextValue={mockContextValue}>
                        <Card type={IBackgroundType.TRAIT} />
                    </MockBackgroundProvider>
                </MockAuthProvider>
            );
        });

        const addButton = screen.getByText('Add Background');

        act(() => {
            fireEvent.click(addButton);
        });

        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
});