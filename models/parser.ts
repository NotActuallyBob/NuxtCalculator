import { Token, TokenType } from "./token";
import { Statement, StatementAddition, StatementDivision, StatementMultiplication, StatementNumber, StatementPower, StatementSubtraction } from "./statement";

export class Parser {
    index: number;
    level: number;
    tokens: Token[];
    rootStatment: Statement | undefined;
    previousStatement: Statement | undefined;

    constructor () {
        this.tokens = [];
        this.index = 0;
        this.level = 0;
    }

    resetParser() {
        this.index = 0;
        this.level = 0;
        this.rootStatment = undefined;;
        this.previousStatement = undefined;
    }

    parseTokens(tokens: Token[]): Statement | undefined {
        console.clear();
        this.tokens = tokens;
        this.resetParser();

        tokens.forEach(token => {
            console.log(token);
        });
        let i = 0;
        while(this.hasNextToken()) {
            console.log('Token(' + i + ') = ' + this.peek())
            console.log(i);
            const nextToken: Token = this.consume()!;
            if(nextToken.type! === TokenType.ParenOpen){
                this.level++;
                continue;
            }
            if(nextToken.type! === TokenType.ParenClose){
                this.level--;
                continue;
            }

            const nextStatement: Statement = nextToken.getStatment(this.level);
            nextStatement.print();

            if(this.rootStatment === undefined) {
                this.rootStatment = nextStatement;
            } else {
                this.rootStatment = this.rootStatment.insert(nextStatement, this.rootStatment);
            }
            i++;
            const isNumber: boolean = nextStatement instanceof StatementNumber;
            if(!isNumber){
                this.previousStatement = nextStatement;
            }
        }

        
        console.log('Token(' + i + ') = ' + this.peek())
        
        if(this.rootStatment === undefined || this.rootStatment!.isBroken()){
            return undefined;
        }
        this.rootStatment.printWhole();
        return this.rootStatment;
    }

    hasNextToken(): boolean {
        return this.peek() !== undefined;
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