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


test('6', () => {
    let input: string = '1+4^2*2+6/2-2';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(34);
});

test('7', () => {
    let input: string = '1+2+3*(2+3)*4+(2+2)^(5-2)';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(127);
});

test('8', () => {
    let input: string = '1+2*(2+3)*4+1';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(42);
});

test('9', () => {
    let input: string = '1+(2+3)^(3-1)+2*4+1';
    let result: number | undefined = Calculator.calculate(input);
    expect(result).toBe(35);
});