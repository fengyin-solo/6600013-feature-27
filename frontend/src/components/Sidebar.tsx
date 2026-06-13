import { useDesignStore } from '../store/design'
import { THEMES } from '../themes/palettes'
import type { PatternType } from '../types'

const PATTERNS: { value: PatternType; label: string }[] = [
  { value: 'spiral',  label: '🌀 螺旋' },
  { value: 'fractal', label: '🌳 分形树' },
  { value: 'wave',    label: '🌊 波浪' },
  { value: 'circles', label: '⭕ 圆环' },
  { value: 'noise',   label: '🎲 噪声场' },
]

export default function Sidebar() {
  const store = useDesignStore()

  return (
    <div className="w-72 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto flex flex-col gap-4">
      <h2 className="text-lg font-bold">🎨 SVG 海报设计器</h2>

      {/* Pattern */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">图案类型</label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERNS.map(p => (
            <button key={p.value} onClick={() => store.setPattern(p.value)}
              className={`px-2 py-1.5 rounded text-xs font-medium ${store.pattern===p.value?'bg-indigo-600':'bg-gray-700 hover:bg-gray-600'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">颜色主题</label>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map(t => (
            <button key={t.id} onClick={() => store.setTheme(t.id)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600">
              <div className="flex">{t.colors.map((c,i) => (
                <div key={i} style={{background:c}} className="w-3 h-3 rounded-full" />
              ))}</div>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Seed */}
      <div>
        <label className="text-xs text-gray-400">种子</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={0} max={99999} value={store.seed}
            onChange={e => store.setParam('seed', Number(e.target.value))} className="flex-1 accent-indigo-500" />
          <input type="number" min={0} max={99999} step={1} value={store.seed}
            onChange={e => store.setParam('seed', Math.min(99999, Math.max(0, Number(e.target.value) || 0)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
          <button onClick={() => store.randomSeed()} className="px-2 bg-indigo-600 rounded text-xs">🎲</button>
        </div>
      </div>

      {/* Iterations */}
      <div>
        <label className="text-xs text-gray-400">迭代数</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={10} max={500} step={10} value={store.iterations}
            onChange={e => store.setParam('iterations', Number(e.target.value))} className="flex-1 accent-purple-500" />
          <input type="number" min={10} max={500} step={10} value={store.iterations}
            onChange={e => store.setParam('iterations', Math.min(500, Math.max(10, Number(e.target.value) || 10)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
        </div>
      </div>

      {/* Scale */}
      <div>
        <label className="text-xs text-gray-400">缩放</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={0.1} max={3} step={0.1} value={store.scale}
            onChange={e => store.setParam('scale', Number(e.target.value))} className="flex-1 accent-green-500" />
          <input type="number" min={0.1} max={3} step={0.1} value={store.scale}
            onChange={e => store.setParam('scale', Math.min(3, Math.max(0.1, Number(e.target.value) || 0.1)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
        </div>
      </div>

      {/* Rotation */}
      <div>
        <label className="text-xs text-gray-400">旋转 (°)</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={0} max={360} step={5} value={store.rotation}
            onChange={e => store.setParam('rotation', Number(e.target.value))} className="flex-1 accent-yellow-500" />
          <input type="number" min={0} max={360} step={5} value={store.rotation}
            onChange={e => store.setParam('rotation', Math.min(360, Math.max(0, Number(e.target.value) || 0)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
        </div>
      </div>

      {/* Stroke */}
      <div>
        <label className="text-xs text-gray-400">描边</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={0.5} max={5} step={0.5} value={store.strokeWidth}
            onChange={e => store.setParam('strokeWidth', Number(e.target.value))} className="flex-1 accent-orange-500" />
          <input type="number" min={0.5} max={5} step={0.5} value={store.strokeWidth}
            onChange={e => store.setParam('strokeWidth', Math.min(5, Math.max(0.5, Number(e.target.value) || 0.5)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
        </div>
      </div>

      {/* Opacity */}
      <div>
        <label className="text-xs text-gray-400">透明度</label>
        <div className="flex gap-2 mt-1 items-center">
          <input type="range" min={0.1} max={1} step={0.05} value={store.opacity}
            onChange={e => store.setParam('opacity', Number(e.target.value))} className="flex-1 accent-pink-500" />
          <input type="number" min={0.1} max={1} step={0.05} value={store.opacity}
            onChange={e => store.setParam('opacity', Math.min(1, Math.max(0.1, Number(e.target.value) || 0.1)))}
            className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-right" />
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-2 mt-2">
        <button onClick={() => store.exportSvg()} className="flex-1 py-2 bg-teal-600 rounded text-sm font-medium">⬇ SVG</button>
        <button onClick={() => store.exportPng()} className="flex-1 py-2 bg-rose-600 rounded text-sm font-medium">⬇ PNG</button>
      </div>
    </div>
  )
}
