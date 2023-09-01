import { Token, TokenType } from "./token";
import { Statment, StatmentAddition } from "./statment";

export class Parser {
    index: number;
    tokens: Token[];

    constructor (tokens: Token[]) {
        this.tokens = tokens;
        this.index = 0;
    }

    parseTokens(): number | undefined {
        let statment: Statment | undefined = undefined;

        if(this.tokens[0].type !== TokenType.Numeral) {
            console.error('Should start with number')
            return undefined;
        }

        while(this.peek() !== undefined && this.peek(1) !== undefined && this.peek(2) !== undefined) {
            if(this.peek(1)!.type === TokenType.Addition){
                const member1: number = this.consume()!.value!;
                this.consume();
                const member2: number = this.peek()!.value!;

                if(statment === undefined) {
                    statment = new StatmentAddition(member1, member2)
                } else {
                    statment = new StatmentAddition(statment.evaluate(), member2);
                }
            }
        }

        return statment!.evaluate();
    }

    peek(offset: number = 0): Token | undefined {
        const indexToCheck: number = this.index + offset;
        if(indexToCheck >= this.tokens.length){
            return undefined;
        }
        return this.tokens[indexToCheck];
    }

    consume(): Token | undefined {
        if(this.index >= this.tokens.length){
            return undefined;
        }
        const token: Token = this.tokens[this.index];
        this.index++;
        return token;
    }
}