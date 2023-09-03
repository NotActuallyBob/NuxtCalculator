export enum TokenType {
    Numeral,
    Addition,
    Subtraction,
    Multiplication,
    Division,
    Power,
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

    isOperation(): boolean {
        return this.type !== TokenType.Numeral
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