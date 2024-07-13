import { Input } from '@mantine/core'
import { useMemo, useState } from 'react'

export default function IncreasePanel() {
  const [startValue, setStartValue] = useState<number>()
  const [endValue, setEndValue] = useState<number>()

  const increase = useMemo(() => {
    if (!endValue || !startValue || startValue === 0) return 0
    const increaseValue = (((Number(endValue) - Number(startValue)) / Number(startValue)) * 100).toFixed(2)
    return increaseValue
  }, [startValue, endValue])
  return (
    <>
      <div className="flex justify-center">
        <div className="inline-block">
          <div className="flex items-center gap-4">
            <div className="shrink-0">起始</div>
            <Input
              type="number"
              classNames={{ input: 'text-[16px]' }}
              value={startValue || ''}
              onChange={(e) => setStartValue(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="shrink-0">結束</div>
            <Input
              type="number"
              classNames={{ input: 'text-[16px]' }}
              value={endValue || ''}
              onChange={(e) => setEndValue(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div>漲幅</div>
            <div className={`text-[20px] `}>{increase}%</div>
          </div>
        </div>
      </div>
    </>
  )
}
