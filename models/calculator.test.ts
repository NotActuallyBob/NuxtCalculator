import { Calculator } from "./calculator";

test('1', () => {
    let input: string = '2+3';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(5);
});

test('2', () => {
    let input: string = '3*2';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(6);
});

test('3', () => {
    let input: string = '1+3*3';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(10);
});

test('4', () => {
    let input: string = '1+3*3+1';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(11);
});

test('5', () => {
    let input: string = '1+4^2*2';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(33);
});