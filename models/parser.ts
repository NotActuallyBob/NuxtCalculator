import { Token, TokenType } from "./token";
import { Statment, StatmentAddition, StatmentDivision, StatmentMultiplication, StatmentSubtraction } from "./statment";

export class Parser {
    index: number;
    tokens: Token[];

    importanceOfLast: number = -1;
    importanceOfCurrent: number = -1;

    constructor (tokens: Token[]) {
        this.tokens = tokens;
        this.index = 0;
    }

    parseTokens(): Statment | undefined {
        if(!this.hasNextOperation()) {
            return undefined;
        }
        
        let statment: Statment = this.getNextStatment();
        let previousStatment: Statment = statment;
        while(this.hasNextOperation()){
            const nextStatment = this.getNextStatment();
            if(nextStatment.isMoreImportant(previousStatment)){
                statment!.swapRight(nextStatment);
            } else {
                nextStatment.member1 = statment;
                statment = nextStatment;
            }
            this.importanceOfLast = this.importanceOfCurrent;
            previousStatment = statment;
        }
        return statment;
    }

    getNextStatment(): Statment {
        const next = this.getNextOperation();
            const operationToken: Token = next.operationToken;
            const number1: number = next.n1;
            const number2: number = next.n2;

            this.importanceOfCurrent = operationToken.getImportance();
            return this.createStatment(operationToken, number1, number2);
    }

    getNextOperation() {
        const n1: number = (this.consume()!.value!)
        const operationToken = (this.consume()!);
        const n2: number = (this.peek()!.value!)

        return {operationToken, n1, n2};
    }
    
    createStatment(token: Token, number1: number | Statment, number2: number | Statment) : Statment {
        switch (token.type) {
            case TokenType.Addition:
                return new StatmentAddition(number1, number2);
            case TokenType.Subtraction:
                return new StatmentSubtraction(number1, number2);
            case TokenType.Multiplication:
                return new StatmentMultiplication(number1, number2);
            case TokenType.Division:
                return new StatmentDivision(number1, number2);
        }
        throw new Error("OperationToken was number");
    }

    hasNextOperation() {
        
        return (this.peek() !== undefined &&
                this.peek(1) !== undefined &&
                this.peek(2) !== undefined &&
                this.peek()!.type === TokenType.Numeral &&
                this.peek(1)?.isOperation() &&
                this.peek(2)!.type === TokenType.Numeral);
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