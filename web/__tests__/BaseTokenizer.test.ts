import { BaseTokenizer } from '@lib/AI/Tokenizers/BaseTokenizer';
import { IVocabulary, ITokenizationStrategy } from '@lib/interfaces';

// Mock vocabulary for testing
class TestVocabulary implements IVocabulary {
    private wordToId = new Map<string, number>([
        ['hello', 10],
        ['world', 11],
        ['test', 12]
    ]);

    private idToWord = new Map<number, string>([
        [10, 'hello'],
        [11, 'world'],
        [12, 'test']
    ]);

    getTokenId(piece: string): number | undefined {
        return this.wordToId.get(piece);
    }

    getTokenPiece(id: number): string | undefined {
        return this.idToWord.get(id);
    }

    size(): number {
        return this.wordToId.size;
    }
}

// Mock tokenization strategy for testing
class TestTokenizationStrategy implements ITokenizationStrategy {
    tokenize(text: string): string[] {
        return text.trim() === '' ? [] : text.toLowerCase().split(' ');
    }
}

// Concrete implementation for testing
class TestTokenizer extends BaseTokenizer {
    protected vocabulary: IVocabulary;
    protected tokenizationStrategy: ITokenizationStrategy;

    constructor() {
        super();
        this.vocabulary = new TestVocabulary();
        this.tokenizationStrategy = new TestTokenizationStrategy();
    }
}

describe('BaseTokenizer', () => {
    let tokenizer: TestTokenizer;

    beforeEach(() => {
        tokenizer = new TestTokenizer();
    });

    describe('Special Tokens', () => {
        test('has correct special token values', () => {
            expect(tokenizer.bos_token_id).toBe(1);
            expect(tokenizer.eos_token_id).toBe(2);
            expect(tokenizer.pad_token_id).toBe(0);
            expect(tokenizer.unk_token_id).toBe(3);
        });

        test('correctly identifies special tokens', () => {
            expect(tokenizer.isSpecialToken(0)).toBe(true);  // PAD
            expect(tokenizer.isSpecialToken(1)).toBe(true);  // BOS
            expect(tokenizer.isSpecialToken(2)).toBe(true);  // EOS
            expect(tokenizer.isSpecialToken(3)).toBe(true);  // UNK
            expect(tokenizer.isSpecialToken(10)).toBe(false); // Regular token
        });
    });

    describe('Encoding', () => {
        test('encodes known tokens correctly', async () => {
            const tokens = await tokenizer.encode('hello world');
            expect(tokens).toEqual([
                tokenizer.bos_token_id,
                10, // hello
                11, // world
                tokenizer.eos_token_id
            ]);
        });

        test('handles unknown tokens', async () => {
            const tokens = await tokenizer.encode('hello unknown world');
            expect(tokens).toEqual([
                tokenizer.bos_token_id,
                10, // hello
                tokenizer.unk_token_id, // unknown
                11, // world
                tokenizer.eos_token_id
            ]);
        });

        test('handles empty input', async () => {
            const tokens = await tokenizer.encode('');
            expect(tokens).toEqual([
                tokenizer.bos_token_id,
                tokenizer.eos_token_id
            ]);
        });
    });

    describe('Decoding', () => {
        test('decodes known tokens correctly', async () => {
            const text = await tokenizer.decode([
                tokenizer.bos_token_id,
                10, // hello
                11, // world
                tokenizer.eos_token_id
            ]);
            expect(text).toBe('hello world');
        });

        test('handles unknown tokens in decoding', async () => {
            const text = await tokenizer.decode([
                tokenizer.bos_token_id,
                10, // hello
                999, // unknown token id
                11, // world
                tokenizer.eos_token_id
            ]);
            expect(text).toBe('hello <unk> world');
        });

        test('filters out special tokens during decoding', async () => {
            const text = await tokenizer.decode([
                tokenizer.bos_token_id,
                10, // hello
                tokenizer.pad_token_id,
                11, // world
                tokenizer.eos_token_id
            ]);
            expect(text).toBe('hello world');
        });
    });

    describe('Single Token Decoding', () => {
        test('decodes single known token correctly', async () => {
            const piece = await tokenizer.decodeToken(10);
            expect(piece).toBe('hello ');
        });

        test('handles unknown token in single decode', async () => {
            const piece = await tokenizer.decodeToken(999);
            expect(piece).toBe('<unk>');
        });

        test('returns empty string for special tokens', async () => {
            expect(await tokenizer.decodeToken(tokenizer.bos_token_id)).toBe('');
            expect(await tokenizer.decodeToken(tokenizer.eos_token_id)).toBe('');
            expect(await tokenizer.decodeToken(tokenizer.pad_token_id)).toBe('');
        });
    });

    describe('Error Handling', () => {
        const originalConsoleError = console.error;
        beforeAll(() => {
            console.error = jest.fn();
        });

        afterAll(() => {
            console.error = originalConsoleError;
        });
        test('handles encoding errors gracefully', async () => {
            // Mock tokenization strategy to throw error
            const errorTokenizer = new TestTokenizer();
            errorTokenizer['tokenizationStrategy'] = {
                tokenize: () => { throw new Error('Tokenization failed'); }
            };

            await expect(errorTokenizer.encode('test')).rejects.toThrow('Failed to encode text');
        });

        test('handles decoding errors gracefully', async () => {
            // Mock vocabulary to throw error
            const errorTokenizer = new TestTokenizer();
            errorTokenizer['vocabulary'] = {
                getTokenPiece: () => { throw new Error('Token lookup failed'); },
                getTokenId: () => undefined,
                size: () => 0
            };

            await expect(errorTokenizer.decode([10])).rejects.toThrow('Failed to decode tokens');
        });
    });
});