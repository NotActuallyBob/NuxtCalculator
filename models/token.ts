import { Character } from "./character";

export enum TokenType {
    Numeral,
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Equals,
}

export class Token {
    type: TokenType;
    value: number | undefined;

    constructor(type: TokenType) {
        this.type = type;
    }

    setValue(newValue: number): Token {
        this.value = newValue;
        return this;
    }
}

export class Tokenizer {
    input: string;
    index: number;

    constructor(input: string) {
        this.input = input;
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
        if(!this.peek().hasValue() || !this.peek().isNumber()){
            console.log('Input should start with a number');
        }

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
            }
        }
        return tokenArray;
    }
}