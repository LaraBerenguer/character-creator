import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';
import { BackgroundContext } from '../context/BackgroundContext';
import { IBackgroundType } from '../types/background-type-interface';

/*const mockBackground = {
    id: '1',
    title: 'Test Background',
    description: 'Test Description',
    type: IBackgroundType.TRAIT
};*/

describe('Card', () => {
    beforeEach(() => {        
        window.HTMLDialogElement.prototype.showModal = vi.fn();
        window.HTMLDialogElement.prototype.close = vi.fn();
    });

    const mockContextValue = {
        getRandomBackground: vi.fn(),
        addUserBackground: vi.fn(),
        togglePinned: vi.fn(),
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
        setOneBackground: vi.fn()
    };

    test('renders card with initial empty state', () => {
        render(
            <BackgroundContext.Provider value={mockContextValue}>
                <Card type={IBackgroundType.TRAIT} />
            </BackgroundContext.Provider>
        );

        expect(screen.getByText('TRAIT')).toBeInTheDocument();
        expect(screen.getByText('?')).toBeInTheDocument();
        expect(screen.getByText('???')).toBeInTheDocument();
    });

    test('handles pin toggle correctly', () => {
        render(
            <BackgroundContext.Provider value={mockContextValue}>
                <Card type={IBackgroundType.TRAIT} />
            </BackgroundContext.Provider>
        );

        const pinButton = screen.getByText('Pin');
        fireEvent.click(pinButton);

        expect(mockContextValue.togglePinned).toHaveBeenCalledWith(IBackgroundType.TRAIT);
    });    
});