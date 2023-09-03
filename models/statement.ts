export abstract class Statement {
    member1: number | Statement;
    member2: number | Statement;
    importance: number;

    constructor(member1: number | Statement, member2: number | Statement, importance: number) {
        this.member1 = member1;
        this.member2 = member2;
        this.importance = importance;
    }

    evaluate(): number {
        if (typeof this.member1 !== 'number') {
            this.member1 = this.member1.evaluate();
        }
        if (typeof this.member2 !== 'number') {
            this.member2 = this.member2.evaluate();
        }
        console.log(this.calculate());
        return this.calculate();
    }

    abstract calculate(): number;

    swapUp(statement: Statement, rootStatment: Statement): Statement {
        if(typeof this.member2 === 'number'){
            if(statement.isMoreImportant(this)){
                this.member2 = statement;
                return rootStatment;
            } else {
                statement.member1 = this;
                return statement;
            }
        }

        if(this.member2.isMoreImportant(statement)){
            statement.member1 = this;
            return statement;
        }

        const rightChild: Statement = this.member2 as Statement;

        if(!rightChild.isMoreImportant(statement)){
            statement.member1 = rightChild;
            this.member2 = statement;
            return rootStatment;
        }

        return rightChild.swapUp(statement, rootStatment);
    }

    swapRight(statement: Statement): void {
        if (typeof this.member2 === 'number') {
            this.member2 = statement;
        } else {
            this.member2.swapRight(statement);
        }
    }

    isMoreImportant(statement: Statement): boolean {
        return this.importance > statement.importance;
    }
}

export class StatementAddition extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 1);
    }

    calculate(): number {
        return this.member1 as number + (this.member2 as number);
    }
}

export class StatementSubtraction extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 1);
    }

    calculate(): number {
        return this.member1 as number - (this.member2 as number);
    }
}

export class StatementMultiplication extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) * (this.member2 as number);
    }
}

export class StatementDivision extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) / (this.member2 as number);
    }
}

export class StatementPower extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) ** (this.member2 as number);
    }
}
