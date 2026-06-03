import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
        <span className="text-yellow-400 text-sm font-light tracking-widest uppercase">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}
