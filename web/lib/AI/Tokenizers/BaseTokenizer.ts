import { ITokenizer, IVocabulary, ITokenizationStrategy } from '@lib/interfaces';
import { SpecialTokens } from '@lib/types';

/**
 * Abstract base class that implements core tokenizer functionality.
 * Concrete implementations only need to provide vocabulary and tokenization strategy.
 */
export abstract class BaseTokenizer implements ITokenizer {
    // Special token IDs - making these readonly and static allows them to be shared
    // across instances while preventing modification
    protected static readonly SPECIAL_TOKENS: SpecialTokens = {
        BOS: 1,    // Beginning of sequence
        EOS: 2,    // End of sequence
        PAD: 0,    // Padding
        UNK: 3     // Unknown token
    } as const;

    // Required properties that concrete implementations must provide
    protected abstract vocabulary: IVocabulary;
    protected abstract tokenizationStrategy: ITokenizationStrategy;

    // Special token getters
    get bos_token_id(): number {
        return BaseTokenizer.SPECIAL_TOKENS.BOS;
    }

    get eos_token_id(): number {
        return BaseTokenizer.SPECIAL_TOKENS.EOS;
    }

    get pad_token_id(): number {
        return BaseTokenizer.SPECIAL_TOKENS.PAD;
    }

    get unk_token_id(): number {
        return BaseTokenizer.SPECIAL_TOKENS.UNK;
    }

    /**
     * Checks if a token ID represents a special token
     */
    isSpecialToken(id: number): boolean {
        return Object.values<number>(BaseTokenizer.SPECIAL_TOKENS).includes(id);
    }

    /**
     * Encodes text into token IDs
     */
    async encode(text: string): Promise<number[]> {
        try {
            // Break text into pieces using the strategy
            const pieces = text.trim() === '' ? [] : this.tokenizationStrategy.tokenize(text);

            // Start with BOS token
            const tokens: number[] = [this.bos_token_id];

            // Convert each piece to a token ID
            for (const piece of pieces) {
                const tokenId = this.vocabulary.getTokenId(piece);
                tokens.push(tokenId ?? this.unk_token_id);
            }

            // End with EOS token
            tokens.push(this.eos_token_id);

            return tokens;
        } catch (error) {
            console.error('Error during encoding:', error);
            throw new Error('Failed to encode text');
        }
    }

    /**
     * Decodes token IDs back into text
     */
    async decode(tokens: number[]): Promise<string> {
        try {
            const pieces: string[] = [];

            for (const token of tokens) {
                // Skip special tokens in output
                if (this.isSpecialToken(token)) {
                    continue;
                }

                const piece = this.vocabulary.getTokenPiece(token);
                if (piece !== undefined) {
                    pieces.push(piece);
                } else {
                    // Handle unknown tokens (could be customized by derived classes)
                    pieces.push('<unk>');
                }
            }

            // Join pieces (concrete implementations can override this behavior)
            return this.joinPieces(pieces);
        } catch (error) {
            console.error('Error during decoding:', error);
            throw new Error('Failed to decode tokens');
        }
    }

    /**
     * Decodes a single token ID into text
     */
    async decodeToken(token: number): Promise<string> {
        try {
            // Don't output anything for special tokens
            if (this.isSpecialToken(token)) {
                return '';
            }

            const piece = this.vocabulary.getTokenPiece(token);
            if (piece === undefined) {
                return '<unk>';
            }

            // Add appropriate spacing (can be overridden by derived classes)
            return this.formatDecodedPiece(piece);
        } catch (error) {
            console.error('Error during single token decoding:', error);
            throw new Error('Failed to decode token');
        }
    }

    /**
     * Protected helper methods that derived classes can override to customize behavior
     */
    protected joinPieces(pieces: string[]): string {
        return pieces.join(' ');
    }

    protected formatDecodedPiece(piece: string): string {
        return piece + ' ';
    }
}