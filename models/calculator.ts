import { Token } from "./token";
import { Tokenizer } from "./tokenizer";
import { Parser } from "./parser";
import { Statement } from "./statement";

export class Calculator {

    static calculate (input: string): number | undefined {

        const tokenizer: Tokenizer = new Tokenizer(input);
        const tokenArray: Token[] = tokenizer.tokenize();

        const parser: Parser = new Parser();
        const statment: Statement | undefined = parser.parseTokens(tokenArray);
        if(statment === undefined) {
            return undefined;
        }
        
        return statment.calculate();
    }
}