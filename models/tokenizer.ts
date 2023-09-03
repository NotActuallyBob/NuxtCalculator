import { Character } from "./character";
import { Token, TokenType } from "./token";

export class Tokenizer {
    input: string;
    index: number;

    constructor(input: string) {
        this.input = input.trim();
        this.index = 0;
    }

    peek(offset: number = 0): Character {
        const indexToCheck: number = this.index + offset;
        if(indexToCheck >= this.input.length){
            return new Character(undefined);
        }
        return new Character(this.input.charAt(indexToCheck));
    }

    consume(): Character {
        if(this.index >= this.input.length){
            return new Character(undefined);
        }
        const character: Character = new Character(this.input.charAt(this.index));
        this.index++;
        return character;
    }

    tokenize(): Token[] {
        let tokenArray: Token[] = [];
        let numString: string = '';

        while(this.peek().hasValue()) {
            numString = '';
            if(this.peek().isNumber()) {
                while(this.peek().hasValue() && this.peek().isNumber()) {
                    numString = numString.concat(this.consume().value!);    
                }
                tokenArray.push(new Token(TokenType.Numeral).setValue(Number(numString)))
            } else if (this.peek().isAdditionSign()) {
                this.consume();
                tokenArray.push(new Token(TokenType.Addition));
            } else if (this.peek().isSubtractionSign()) {
                this.consume();
                tokenArray.push(new Token(TokenType.Subtraction));
            } else if (this.peek().isMultiplicationSign()) {
                this.consume();
                tokenArray.push(new Token(TokenType.Multiplication));
            } else if (this.peek().isDivitionSign()) {
                this.consume();
                tokenArray.push(new Token(TokenType.Division));
            } else if (this.peek().isPowerSign()) {
                this.consume();
                tokenArray.push(new Token(TokenType.Power));
            } else {
                console.error('Found something weird in the input');
                this.consume();
            }
        }

        tokenArray.forEach(token => {
            console.log(token);
        });
        return tokenArray;
    }
}