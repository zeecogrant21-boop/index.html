/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

export interface MathSolution {
  expression: string;
  result: string | number;
  steps: string[];
  category: 'Arithmetic' | 'Algebra' | 'Statistics' | 'Economy & GCT' | 'Geometry';
  timestamp: number;
}

/**
 * Smart Mathematical Expression Evaluator & Algebraic Solver
 */
export class SmartMathEngine {
  /**
   * Safely evaluate arithmetic and math functions
   */
  public static evaluateArithmetic(expr: string): { value: number; steps: string[] } {
    const clean = expr.trim();
    const steps: string[] = [];

    steps.push(`Input expression: "${clean}"`);

    // Replace inline percentage expressions like "15% of 200" or "20% * 50" with math
    let sanitized = clean
      .replace(/(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(\d+(?:\.\d+)?)/gi, '(($1 / 100) * $2)')
      .replace(/(\d+(?:\.\d+)?)\s*%/g, '($1 / 100)')
      .replace(/\^/g, '**')
      .replace(/pi/gi, Math.PI.toString())
      .replace(/e\b/gi, Math.E.toString())
      .replace(/sqrt\(([^)]+)\)/gi, 'Math.sqrt($1)')
      .replace(/abs\(([^)]+)\)/gi, 'Math.abs($1)')
      .replace(/sin\(([^)]+)\)/gi, 'Math.sin($1)')
      .replace(/cos\(([^)]+)\)/gi, 'Math.cos($1)')
      .replace(/tan\(([^)]+)\)/gi, 'Math.tan($1)')
      .replace(/log\(([^)]+)\)/gi, 'Math.log10($1)');

    // Whitelist check to prevent code injection
    if (!/^[0-9+\-*/().\s,Math.sqrtabscosintanlogPIE*]+$/.test(sanitized)) {
      throw new Error('Unsupported characters or invalid mathematical expression.');
    }

    // Evaluate in sandboxed Function
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${sanitized});`);
    const val = fn();

    if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
      throw new Error('Mathematical expression resulted in NaN or Infinity.');
    }

    const rounded = Math.round(val * 100000) / 100000;
    steps.push(`Normalized syntax: ${sanitized}`);
    steps.push(`Computed result: ${rounded}`);

    return { value: rounded, steps };
  }

  /**
   * Solve linear equation: ax + b = c  or  ax = b
   */
  public static solveLinear(equation: string): { x: number; steps: string[] } {
    // Normalization: e.g. "3x + 12 = 27" -> 3x = 15 -> x = 5
    const steps: string[] = [];
    const eq = equation.replace(/\s+/g, '');
    steps.push(`Original linear equation: ${equation}`);

    const parts = eq.split('=');
    if (parts.length !== 2) {
      throw new Error('Linear equation must contain exactly one "=" sign.');
    }

    const left = parts[0];
    const right = parseFloat(parts[1]);

    if (isNaN(right)) {
      throw new Error('Right side of linear equation must be a numeric value.');
    }

    // Match ax + b or ax - b
    const match = left.match(/^([+-]?\d*(?:\.\d+)?)x([+-]\d+(?:\.\d+)?)?$/i);
    if (!match) {
      throw new Error('Format must be like "ax + b = c" (e.g., 2x + 5 = 15 or 4x = 20)');
    }

    let aStr = match[1];
    let bStr = match[2] || '0';

    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
    let b = parseFloat(bStr);

    if (a === 0) {
      throw new Error('Coefficient "a" cannot be 0 in a linear equation.');
    }

    steps.push(`Identified coefficients: a = ${a}, b = ${b}, right side c = ${right}`);
    const constantShift = right - b;
    steps.push(`Subtract constant: ${a}x = ${right} - (${b}) = ${constantShift}`);
    const x = Math.round((constantShift / a) * 10000) / 10000;
    steps.push(`Divide by coefficient a: x = ${constantShift} / ${a} = ${x}`);

    return { x, steps };
  }

  /**
   * Solve Quadratic Equation: ax² + bx + c = 0
   */
  public static solveQuadratic(a: number, b: number, c: number): { roots: number[]; discriminant: number; steps: string[] } {
    const steps: string[] = [];
    steps.push(`Quadratic standard form: (${a})x² + (${b})x + (${c}) = 0`);

    if (a === 0) {
      throw new Error('Coefficient "a" cannot be zero in quadratic equation.');
    }

    const d = b * b - 4 * a * c;
    steps.push(`Calculate discriminant: Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${d}`);

    if (d > 0) {
      const sqrtD = Math.sqrt(d);
      const root1 = (-b + sqrtD) / (2 * a);
      const root2 = (-b - sqrtD) / (2 * a);
      steps.push(`Two distinct real roots (Δ > 0):`);
      steps.push(`x₁ = (-(${b}) + √${d}) / 2(${a}) = ${Math.round(root1 * 1000) / 1000}`);
      steps.push(`x₂ = (-(${b}) - √${d}) / 2(${a}) = ${Math.round(root2 * 1000) / 1000}`);
      return {
        roots: [Math.round(root1 * 1000) / 1000, Math.round(root2 * 1000) / 1000],
        discriminant: d,
        steps
      };
    } else if (d === 0) {
      const root = -b / (2 * a);
      steps.push(`One repeated real root (Δ = 0): x = -(${b}) / 2(${a}) = ${root}`);
      return {
        roots: [Math.round(root * 1000) / 1000],
        discriminant: 0,
        steps
      };
    } else {
      steps.push(`Discriminant Δ < 0: No real roots (complex roots exist: ±${(Math.sqrt(-d) / (2 * a)).toFixed(3)}i).`);
      return {
        roots: [],
        discriminant: d,
        steps
      };
    }
  }

  /**
   * Jamaican Economic & Tax Calculator (GCT 15%, Currency Conversions)
   */
  public static calculateGCT(amount: number, taxRate: number = 0.15): {
    subtotal: number;
    gctAmount: number;
    grandTotal: number;
    steps: string[];
  } {
    const subtotal = Math.round(amount * 100) / 100;
    const gctAmount = Math.round(subtotal * taxRate * 100) / 100;
    const grandTotal = Math.round((subtotal + gctAmount) * 100) / 100;

    return {
      subtotal,
      gctAmount,
      grandTotal,
      steps: [
        `Base / Subtotal amount: JMD $${subtotal.toLocaleString()}`,
        `Apply GCT Rate (${(taxRate * 100).toFixed(1)}%): $${subtotal} × ${taxRate} = JMD $${gctAmount.toLocaleString()}`,
        `Grand Total with GCT: JMD $${grandTotal.toLocaleString()}`
      ]
    };
  }

  /**
   * Statistical Analysis of a dataset
   */
  public static calculateStatistics(numbers: number[]): {
    count: number;
    mean: number;
    median: number;
    min: number;
    max: number;
    stdDev: number;
    variance: number;
    steps: string[];
  } {
    if (numbers.length === 0) {
      throw new Error('Dataset must contain at least one number.');
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const count = sorted.length;
    const sum = sorted.reduce((acc, n) => acc + n, 0);
    const mean = Math.round((sum / count) * 1000) / 1000;

    let median: number;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = Math.round(((sorted[mid - 1] + sorted[mid]) / 2) * 1000) / 1000;
    } else {
      median = sorted[mid];
    }

    const min = sorted[0];
    const max = sorted[count - 1];

    const sqDiffs = sorted.map(n => Math.pow(n - mean, 2));
    const variance = Math.round((sqDiffs.reduce((a, b) => a + b, 0) / count) * 1000) / 1000;
    const stdDev = Math.round(Math.sqrt(variance) * 1000) / 1000;

    return {
      count,
      mean,
      median,
      min,
      max,
      stdDev,
      variance,
      steps: [
        `Dataset size N = ${count}, values: [${sorted.slice(0, 10).join(', ')}${count > 10 ? '...' : ''}]`,
        `Sum of values = ${sum}, Arithmetic Mean (μ) = ${mean}`,
        `Median = ${median}, Min = ${min}, Max = ${max}`,
        `Variance (σ²) = ${variance}, Standard Deviation (σ) = ${stdDev}`
      ]
    };
  }
}
