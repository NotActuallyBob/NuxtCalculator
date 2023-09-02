export interface Statment {
    member1: number | Statment;
    member2: number | Statment;
    importance: number;
    evaluate(): number;
    swapRight(statment: Statment): void;
    isMoreImportant(statment: Statment): boolean;
}

export class StatmentAddition implements Statment {
    member1: number | Statment;
    member2: number | Statment;
    importance: number;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
        this.importance = 1;
    }

    evaluate(): number {
        if(typeof(this.member1) !== 'number') {
            this.member1 = this.member1.evaluate();
        }
        if(typeof(this.member2) !== 'number') {
            this.member2 = this.member2.evaluate();
        }
        return this.member1 + this.member2;
    }

    swapRight(statment: Statment): void {
        if(typeof(this.member2) === 'number'){
            this.member2 = statment;
        } else  {
            this.member2.swapRight(statment);
        }
    }

    isMoreImportant(statment: Statment): boolean {
        return this.importance > statment.importance;
    }
}

export class StatmentSubtraction implements Statment {
    member1: number | Statment;
    member2: number | Statment;
    importance: number;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
        this.importance = 1;
    }

    evaluate(): number {
        if(typeof(this.member1) !== 'number') {
            this.member1 = this.member1.evaluate();
        }
        if(typeof(this.member2) !== 'number') {
            this.member2 = this.member2.evaluate();
        }
        return this.member1 - this.member2;
    }

    swapRight(statment: Statment): void {
        if(typeof(this.member2) === 'number'){
            this.member2 = statment;
        } else  {
            this.member2.swapRight(statment);
        }
    }

    isMoreImportant(statment: Statment): boolean {
        return this.importance > statment.importance;
    }
}

export class StatmentMultiplication implements Statment {
    member1: number | Statment;
    member2: number | Statment;
    importance: number;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
        this.importance = 2;
    }

    evaluate(): number {
        if(typeof(this.member1) !== 'number') {
            this.member1 = this.member1.evaluate();
        }
        if(typeof(this.member2) !== 'number') {
            this.member2 = this.member2.evaluate();
        }
        return this.member1 * this.member2;
    }

    swapRight(statment: Statment): void {
        if(typeof(this.member2) === 'number'){
            this.member2 = statment;
        } else  {
            this.member2.swapRight(statment);
        }
    }

    isMoreImportant(statment: Statment): boolean {
        return this.importance > statment.importance;
    }
}

export class StatmentDivision implements Statment {
    member1: number | Statment;
    member2: number | Statment;
    importance: number;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
        this.importance = 2;
    }

    evaluate(): number {
        if(typeof(this.member1) !== 'number') {
            this.member1 = this.member1.evaluate();
        }
        if(typeof(this.member2) !== 'number') {
            this.member2 = this.member2.evaluate();
        }
        return this.member1 / this.member2;
    }

    swapRight(statment: Statment): void {
        if(typeof(this.member2) === 'number'){
            this.member2 = statment;
        } else  {
            this.member2.swapRight(statment);
        }
    }

    isMoreImportant(statment: Statment): boolean {
        return this.importance > statment.importance;
    }
}