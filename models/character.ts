export class Character {
    value: string | undefined;

    constructor(value: string | undefined) {
        if(value === undefined) {
            this.value = undefined;
            return;
        }

        if(value!.length == 1) {
            this.value = value;
        } else {
            throw new Error('Charcter was longer than 1');
        }
    }

    hasValue(): boolean {
        return this.value !== undefined;
    }

    isNumber(): boolean {
        return !isNaN(Number(this.value));
    }

    isAdditionSign(): boolean {
        return this.value === '+';
    }

    isSubtractionSign(): boolean {
        return this.value === '-';
    }

    isSpace(): boolean {
        return this.value === ' ';
    }

    isSemi(): boolean {
        return this.value === ';';
    }
}