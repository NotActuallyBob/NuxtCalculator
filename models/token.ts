import { Statement, StatementAddition, StatementDivision, StatementMultiplication, StatementNumber, StatementPower, StatementSubtraction } from "./statement";

export enum TokenType {
    Numeral,
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Power,
    ParenOpen,
    ParenClose,
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
    
    getStatment(): Statement {
        switch(this.type) {
            case TokenType.Addition:
                return new StatementAddition();
            case TokenType.Subtraction:
                return new StatementSubtraction();
            case TokenType.Multiplication:
                return new StatementMultiplication();
            case TokenType.Division:
                return new StatementDivision();
            case TokenType.Power:
                return new StatementPower();
            case TokenType.Numeral:
                if(this.value === undefined) {
                    throw new Error('Tried to create StatementNumber with a NumeralToken without a value');
                }
                return new StatementNumber(this.value);
            default:
                throw new Error('Tried to get a statment (getStatment()) from a non operand');
        }
    }

    getImportance(): number {
        switch(this.type) {
            case TokenType.Addition:
                return 1;
            case TokenType.Subtraction:
                return 1;
            case TokenType.Multiplication:
                return 2;
            case TokenType.Division:
                return 2;
            case TokenType.Power:
                return 3;
            default:
                return -1;
        }
    }
}