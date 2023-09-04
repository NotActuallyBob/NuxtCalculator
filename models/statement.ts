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
        return this.calculate();
    }

    print() {
        console.log(this.member1 + this.getType() + this.member2);
    }

    abstract calculate(): number;
    abstract getType(): string;

    insert(statement: Statement, rootStatment: Statement, previousStatement: Statement | undefined = undefined): Statement {
        if(!statement.isMoreImportant(this)) {
            statement.member1 = this;
            if(previousStatement !== undefined) {
                previousStatement.member2 = statement;
                return rootStatment;
            }
            return statement;
        }

        if(typeof this.member2 === 'number') {
            this.member2 = statement;
            return rootStatment;
        }

        return this.member2.insert(statement, rootStatment, this);
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

    getType(): string {
        return '+';
    }
}

export class StatementSubtraction extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 1);
    }

    calculate(): number {
        return this.member1 as number - (this.member2 as number);
    }

    getType(): string {
        return '-';
    }
}

export class StatementMultiplication extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) * (this.member2 as number);
    }

    getType(): string {
        return '*';
    }
}

export class StatementDivision extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) / (this.member2 as number);
    }

    getType(): string {
        return '/';
    }
}

export class StatementPower extends Statement {
    constructor(member1: number | Statement, member2: number | Statement) {
        super(member1, member2, 2);
    }

    calculate(): number {
        return (this.member1 as number) ** (this.member2 as number);
    }

    getType(): string {
        return '^';
    }
}
