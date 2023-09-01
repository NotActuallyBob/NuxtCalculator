import { Character } from "./character";
import { Token, Tokenizer } from "./token";

export class Calculator {
    static input: string;

    static calculate (input: string): number {
        Calculator.input = input;

        const tokenizer: Tokenizer = new Tokenizer(this.input);
        const tokenArray: Token[] = tokenizer.tokenize();
        
        tokenArray.forEach(token => {
            console.log(token);    
        });
        return 0;
    }

    

    
}