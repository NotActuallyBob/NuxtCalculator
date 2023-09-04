export abstract class Statement {
    importance: number;

    constructor(importance: number) {
        this.importance = importance;
    }

    abstract calculate(): number;

    abstract getRight(): Statement | undefined;
    abstract getLeft(): Statement | undefined;
    abstract setRight(statement: Statement): boolean;
    abstract setLeft(statement: Statement): boolean;
    abstract print(): void;
    abstract printTree(): string;

    insert(statement: Statement, rootStatment: Statement, previousStatement: Statement | undefined = undefined): Statement {
        if(!statement.isMoreImportant(this)) {
            statement.setLeft(this);
            if(previousStatement !== undefined) {
                previousStatement.setRight(statement);
                return rootStatment;
            }
            return statement;
        }

        if(this.getRight() === undefined) {
            this.setRight(statement);
            return rootStatment;
        }

        if(this.getRight() instanceof StatementNumber){
            statement.setLeft(this.getRight()!);
            this.setRight(statement);
            return rootStatment;
        }

        return this.getRight()!.insert(statement, rootStatment, this);
    }

    isBroken(): boolean {
        if (this instanceof StatementNumber) {
            return false;
        }
    
        if (this.getLeft() === undefined || this.getRight() === undefined) {
            return true;
        }
    
        return this.getLeft()!.isBroken() || this.getRight()!.isBroken();
    }

    isMoreImportant(statement: Statement): boolean {
        return this.importance > statement.importance;
    }

    printWhole(): void {
        console.log('Whole: ' + this.printTree());
    }
}

export class StatementNumber extends Statement {
    value: number;
    constructor(value: number) {
        super(999);
        this.value = value;
    }

    calculate(): number {
        return this.value;
    }

    getRight(): Statement | undefined {
        return undefined;
    }

    getLeft(): Statement | undefined {
        return undefined;
    }

    setLeft(statement: Statement): boolean {
        return false;
    }

    setRight(statement: Statement): boolean {
        return false;
    }

    print(): void {
        console.log('StatementNumber: ' + this.value);
    }

    printTree(): string {
        return this.value.toString();
    }
}

export class StatementAddition extends Statement {
    member1: Statement | undefined;
    member2: Statement | undefined;
    constructor(member1: Statement | undefined = undefined, member2: Statement | undefined = undefined) {
        super(1);
        this.member1 = member1;
        this.member2 = member2;
    }

    calculate(): number {
        if(this.member1 === undefined || this.member2 === undefined) {
            throw new Error('Tried to calculate with undefined memembers of StatmentAddition');
        }
        return this.member1.calculate() + this.member2.calculate();
    }

    getRight(): Statement | undefined {
        return this.member2;
    }

    getLeft(): Statement | undefined {
        return this.member1;
    }

    setRight(statement: Statement): boolean {
        this.member2 = statement;
        return true;
    }

    setLeft(statement: Statement): boolean {
        this.member1 = statement;
        return true;
    }

    print(): void {
        console.log('StatementAddition: (' + this.member1 + ' + ' + this.member2 + ')');
    }

    printTree(): string {
        if(this.member1 === undefined && this.member2 == undefined) {
            return ('(undefined + undefined)');
        }
        if(this.member1 === undefined) {
            return ('(undefined + ' + this.member2!.printTree() + ')');
        }
        if(this.member2 === undefined) {
            return ('(' + this.member1!.printTree() + ' + undefined)');
        }
        
        return ('(' + this.member1!.printTree() + ' + ' + this.member2!.printTree() + ')');
        
    }
}

export class StatementSubtraction extends Statement {
    member1: Statement | undefined;
    member2: Statement | undefined;
    constructor(member1: Statement | undefined = undefined, member2: Statement | undefined = undefined) {
        super(1);
        this.member1 = member1;
        this.member2 = member2;
    }

    calculate(): number {
        if(this.member1 === undefined || this.member2 === undefined) {
            throw new Error('Tried to calculate with undefined memembers of StatmentSubtraction');
        }
        return this.member1.calculate() - this.member2.calculate();
    }

    getRight(): Statement | undefined {
        return this.member2;
    }

    getLeft(): Statement | undefined {
        return this.member1;
    }

    setRight(statement: Statement): boolean {
        this.member2 = statement;
        return true;
    }

    setLeft(statement: Statement): boolean {
        this.member1 = statement;
        return true;
    }

    print(): void {
        console.log('StatementSubtraction: (' + this.member1 + ' - ' + this.member2 + ')');
    }

    printTree(): string {
        if(this.member1 === undefined && this.member2 == undefined) {
            return ('(undefined - undefined)');
        }
        if(this.member1 === undefined) {
            return ('(undefined - ' + this.member2!.printTree() + ')');
        }
        if(this.member2 === undefined) {
            return ('(' + this.member1!.printTree() + ' - undefined)');
        }
        
        return ('(' + this.member1!.printTree() + ' - ' + this.member2!.printTree() + ')');
        
    }
}

export class StatementMultiplication extends Statement {
    member1: Statement | undefined;
    member2: Statement | undefined;
    constructor(member1: Statement | undefined = undefined, member2: Statement | undefined = undefined) {
        super(2);
        this.member1 = member1;
        this.member2 = member2;
    }

    calculate(): number {
        if(this.member1 === undefined || this.member2 === undefined) {
            throw new Error('Tried to calculate with undefined memembers of StatmentMultiplication');
        }
        return this.member1.calculate() * this.member2.calculate();
    }

    getRight(): Statement | undefined {
        return this.member2;
    }

    getLeft(): Statement | undefined {
        return this.member1;
    }

    setRight(statement: Statement): boolean {
        this.member2 = statement;
        return true;
    }

    setLeft(statement: Statement): boolean {
        this.member1 = statement;
        return true;
    }

    print(): void {
        console.log('StatementMultiplication: (' + this.member1 + ' * ' + this.member2 + ')');
    }

    printTree(): string {
        if(this.member1 === undefined && this.member2 == undefined) {
            return ('(undefined * undefined)');
        }
        if(this.member1 === undefined) {
            return ('(undefined * ' + this.member2!.printTree() + ')');
        }
        if(this.member2 === undefined) {
            return ('(' + this.member1!.printTree() + ' * undefined)');
        }
        
        return ('(' + this.member1!.printTree() + ' * ' + this.member2!.printTree() + ')');
        
    }
}

export class StatementDivision extends Statement {
    member1: Statement | undefined;
    member2: Statement | undefined;
    constructor(member1: Statement | undefined = undefined, member2: Statement | undefined = undefined) {
        super(2);
        this.member1 = member1;
        this.member2 = member2;
    }

    calculate(): number {
        if(this.member1 === undefined || this.member2 === undefined) {
            throw new Error('Tried to calculate with undefined memembers of StatmentDivision');
        }
        return this.member1.calculate() / this.member2.calculate();
    }

    getRight(): Statement | undefined {
        return this.member2;
    }

    getLeft(): Statement | undefined {
        return this.member1;
    }

    setRight(statement: Statement): boolean {
        this.member2 = statement;
        return true;
    }

    setLeft(statement: Statement): boolean {
        this.member1 = statement;
        return true;
    }

    print(): void {
        console.log('StatementDivision: (' + this.member1 + ' / ' + this.member2 + ')');
    }

    printTree(): string {
        if(this.member1 === undefined && this.member2 == undefined) {
            return ('(undefined / undefined)');
        }
        if(this.member1 === undefined) {
            return ('(undefined / ' + this.member2!.printTree() + ')');
        }
        if(this.member2 === undefined) {
            return ('(' + this.member1!.printTree() + ' / undefined)');
        }
        
        return ('(' + this.member1!.printTree() + ' / ' + this.member2!.printTree() + ')');
        
    }
}

export class StatementPower extends Statement {
    member1: Statement | undefined;
    member2: Statement | undefined;
    constructor(member1: Statement | undefined = undefined, member2: Statement | undefined = undefined) {
        super(3);
        this.member1 = member1;
        this.member2 = member2;
    }

    calculate(): number {
        if(this.member1 === undefined || this.member2 === undefined) {
            throw new Error('Tried to calculate with undefined memembers of StatmentPower');
        }
        return this.member1.calculate() ** this.member2.calculate();
    }

    getRight(): Statement | undefined {
        return this.member2;
    }

    getLeft(): Statement | undefined {
        return this.member1;
    }

    setRight(statement: Statement): boolean {
        this.member2 = statement;
        return true;
    }

    setLeft(statement: Statement): boolean {
        this.member1 = statement;
        return true;
    }

    print(): void {
        console.log('StatementPower: (' + this.member1 + ' ^ ' + this.member2 + ')');
    }

    printTree(): string {
        if(this.member1 === undefined && this.member2 == undefined) {
            return ('(undefined ^ undefined)');
        }
        if(this.member1 === undefined) {
            return ('(undefined ^ ' + this.member2!.printTree() + ')');
        }
        if(this.member2 === undefined) {
            return ('(' + this.member1!.printTree() + ' ^ undefined)');
        }
        
        return ('(' + this.member1!.printTree() + ' ^ ' + this.member2!.printTree() + ')');
        
    }
}