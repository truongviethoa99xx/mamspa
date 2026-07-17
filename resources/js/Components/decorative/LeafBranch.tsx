interface LeafConfig {
    x: number;
    y: number;
    angle: number;
    length: number;
    width: number;
}

const STEM_PATH = 'M132,8 C108,120 152,215 118,335 C96,415 128,468 108,508';

const LEAVES: LeafConfig[] = [
    { x: 120, y: 42, angle: -50, length: 68, width: 30 },
    { x: 130, y: 58, angle: 48, length: 88, width: 36 },
    { x: 106, y: 102, angle: -68, length: 100, width: 40 },
    { x: 140, y: 132, angle: 58, length: 108, width: 42 },
    { x: 116, y: 192, angle: -74, length: 92, width: 36 },
    { x: 130, y: 232, angle: 62, length: 82, width: 33 },
    { x: 110, y: 302, angle: -58, length: 68, width: 27 },
    { x: 122, y: 362, angle: 52, length: 58, width: 23 },
    { x: 108, y: 432, angle: -48, length: 48, width: 19 },
];

function leafPath(length: number, width: number): string {
    const half = width / 2;
    const bulge = length * 0.42;

    return `M0,0 Q${half},-${bulge} 0,-${length} Q-${half},-${bulge} 0,0 Z`;
}

export interface LeafBranchProps {
    className?: string;
}

/** Minh hoạ nhành lá line-art trang trí (không mang nội dung), lấp khoảng trắng cho các khối bố cục thưa. */
export function LeafBranch({ className }: LeafBranchProps) {
    return (
        <svg viewBox="0 0 260 520" className={className} fill="none" stroke="currentColor" strokeWidth={1} aria-hidden="true">
            <path d={STEM_PATH} />
            {LEAVES.map((leaf, index) => (
                <g key={index} transform={`translate(${leaf.x},${leaf.y}) rotate(${leaf.angle})`}>
                    <path d={leafPath(leaf.length, leaf.width)} />
                    <line x1={0} y1={0} x2={0} y2={-leaf.length} />
                </g>
            ))}
        </svg>
    );
}
