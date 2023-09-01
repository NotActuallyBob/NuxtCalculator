export interface Statment {
    member1: number | Statment;
    member2: number | Statment;
    evaluate(): number;
}

export class StatmentAddition implements Statment {
    member1: number | Statment;
    member2: number | Statment;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
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
}

export class StatmentSubtraction implements Statment {
    member1: number | Statment;
    member2: number | Statment;

    constructor(member1: number | Statment, member2: number | Statment) {
        this.member1 = member1;
        this.member2 = member2;
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
}