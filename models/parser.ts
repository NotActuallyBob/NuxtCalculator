import { Token, TokenType } from "./token";
import { Statement, StatementAddition, StatementDivision, StatementMultiplication, StatementPower, StatementSubtraction } from "./statement";

export class Parser {
    index: number;
    tokens: Token[];

    importanceOfLast: number = -1;
    importanceOfCurrent: number = -1;

    constructor (tokens: Token[]) {
        this.tokens = tokens;
        this.index = 0;
    }

    parseTokens(): Statement | undefined {
        if(!this.hasNextOperation()) {
            return undefined;
        }
        
        let statement: Statement = this.getNextStatement();
        let previousStatement: Statement = statement;
        this.importanceOfLast = this.importanceOfCurrent;
        while(this.hasNextOperation()){
            const nextStatement = this.getNextStatement();
            if(nextStatement.isMoreImportant(previousStatement)){
                statement!.swapRight(nextStatement);
            } else {
                statement = statement.swapUp(nextStatement, statement);
            }
            this.importanceOfLast = this.importanceOfCurrent;
            previousStatement = statement;
        }
        return statement;
    }

    getNextStatement(): Statement {
        const next = this.getNextOperation();
        const operationToken: Token = next.operationToken;
        const number1: number = next.n1;
        const number2: number = next.n2;

        this.importanceOfCurrent = operationToken.getImportance();
        return this.createStatement(operationToken, number1, number2);
    }

    getNextOperation() {
        const n1: number = (this.consume()!.value!)
        const operationToken = (this.consume()!);
        const n2: number = (this.peek()!.value!)

        return {operationToken, n1, n2};
    }
    
    createStatement(token: Token, number1: number | Statement, number2: number | Statement) : Statement {
        switch (token.type) {
            case TokenType.Addition:
                return new StatementAddition(number1, number2);
            case TokenType.Subtraction:
                return new StatementSubtraction(number1, number2);
            case TokenType.Multiplication:
                return new StatementMultiplication(number1, number2);
            case TokenType.Division:
                return new StatementDivision(number1, number2);
            case TokenType.Power:
                return new StatementPower(number1, number2);
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