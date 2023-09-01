import { Token } from "./token";
import { Tokenizer } from "./tokenizer";
import { Parser } from "./parser";

export class Calculator {
    static input: string;

    static calculate (input: string): number | undefined {
        Calculator.input = input;

        const tokenizer: Tokenizer = new Tokenizer(this.input);
        const tokenArray: Token[] = tokenizer.tokenize();

        const parser: Parser = new Parser(tokenArray);
        const result: number | undefined = parser.parseTokens();

        tokenArray.forEach(token => {
            console.log(token);    
        });
        return result;
    }

    

    
}