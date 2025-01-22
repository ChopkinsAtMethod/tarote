import '@testing-library/jest-dom';

// Extend expect interface
interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
    toHaveValue(value: string | number | string[]): R;
}

declare global {
    interface Expect extends CustomMatchers { }
    interface Matchers<R> extends CustomMatchers<R> { }
    interface AsymmetricMatchers extends CustomMatchers { }
}

export { };