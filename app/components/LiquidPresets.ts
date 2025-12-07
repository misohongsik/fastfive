export type LiquidPresetName = 'Ocean' | 'Lava' | 'Neon' | 'DeepDark';

export interface LiquidOptions {
    color1: string;
    color2: string;
    color3: string;
    speed: number;
    intensity: number;
    scale: number;
}

export const LIQUID_PRESETS: Record<LiquidPresetName, LiquidOptions> = {
    Ocean: {
        color1: '#0077be',
        color2: '#00a86b',
        color3: '#00d2d3',
        speed: 1.0,
        intensity: 0.5,
        scale: 1.0,
    },
    Lava: {
        color1: '#e1b12c',
        color2: '#e74c3c',
        color3: '#8e44ad',
        speed: 1.2,
        intensity: 0.8,
        scale: 1.2,
    },
    Neon: {
        color1: '#ff9ff3',
        color2: '#feca57',
        color3: '#54a0ff',
        speed: 1.0,
        intensity: 0.6,
        scale: 1.5,
    },
    DeepDark: {
        color1: '#000000',
        color2: '#2d3436',
        color3: '#636e72',
        speed: 0.5,
        intensity: 0.3,
        scale: 0.8,
    },
};
