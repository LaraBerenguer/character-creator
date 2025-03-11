/*import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddBackgroundModal from '../components/BackgroundCards/AddBackgroundModal';
import { IBackgroundType } from '../../../common/types/background-type-interface';

describe('AddBackgroundModal', () => {
    beforeEach(() => {
        window.HTMLDialogElement.prototype.showModal = vi.fn();
        window.HTMLDialogElement.prototype.close = vi.fn();
    });

    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();

    test('renders modal when isOpen is true', () => {
        render(
            <AddBackgroundModal
                type={IBackgroundType.TRAIT}
                isOpen={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/add your own trait/i)).toBeInTheDocument();
    });

    test('calls onSubmit with correct data when form is submitted', async () => {
        render(
            <AddBackgroundModal
                type={IBackgroundType.TRAIT}
                isOpen={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
            />
        );

        const titleInput = screen.getByRole('textbox', { name: /title/i });
        const descriptionInput = screen.getByRole('textbox', { name: /description/i });
        const submitButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.click(submitButton);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            title: 'Test Title',
            description: 'Test Description',
            type: IBackgroundType.TRAIT
        });
    });
});*/