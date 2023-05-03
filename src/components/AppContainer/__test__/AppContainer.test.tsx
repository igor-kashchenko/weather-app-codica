import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppContainer } from '../AppContainer';
import { UniversalWrapper } from '../../../__mock__/UniversalWrapper';

describe('AppContainer', () => {
  it('renders correctly', () => {
    const testText = 'Test content';

    render(
      <UniversalWrapper component={<AppContainer>{testText}</AppContainer>} />
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders with correct background color', () => {
    const testText = 'Test content';

    const { container } = render(
      <UniversalWrapper component={<AppContainer>{testText}</AppContainer>} />
    );

    expect(container.firstChild).toHaveStyle('background-color: #ffffff');
  });
});
