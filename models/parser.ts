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
        let statment: Statment | undefined = undefined;

        const operationType: TokenType = this.getOperationType();

        const number3: number = this.consume()!.value!;
        const operationToken1: Token = this.consume()!;
        const number4: number = this.peek()!.value!;
        this.importanceOfLast = operationToken1.getImportance();
        statment = this.createStatment(operationToken1, number3, number4);

        while(this.hasNextOperation()){
            const operationType: TokenType = this.getOperationType();

            const number1: number = this.consume()!.value!;
            const operationToken: Token = this.consume()!;
            const number2: number = this.peek()!.value!;
            this.importanceOfCurrent = operationToken.getImportance();
            
            const newStatment = this.createStatment(operationToken, number1, number2);

            if(this.nextFirst()){
                statment!.swapRight(newStatment);
            } else {
                newStatment.member1 = statment;
                statment = newStatment;
            }

            this.importanceOfLast = this.importanceOfCurrent;
        }

        return statment;
    }
    
    createStatment(token: Token, number1: number | Statment, number2: number | Statment) : Statment{
        switch (token.type) {
            case TokenType.Addition:
                return new StatmentAddition(number1, number2);
            case TokenType.Subtraction:
                return new StatmentSubtraction(number1, number2);
            case TokenType.Multiplication:
                return new StatmentMultiplication(number1, number2);
            case TokenType.Division:
                return new StatmentDivision(number1, number2);
            default:
                throw new Error("OperationToken was number");
        }
    }

    nextFirst(): boolean {
        return this.importanceOfCurrent >= this.importanceOfLast;
    }

    hasNextOperation() {
        return (this.peek() !== undefined && this.peek(1) !== undefined && this.peek(2) !== undefined)
    }

    getOperationType(): TokenType {
        return (this.peek(1)!.type);
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