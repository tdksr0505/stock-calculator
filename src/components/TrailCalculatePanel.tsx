import { Button, Input } from '@mantine/core'
import { useMemo, useState } from 'react'
import { cn } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import { RxCrossCircled } from 'react-icons/rx'
type TrialOrder = {
  id: string
  amountSpent: number
  sharesPurchased: number
  unit: 'shares' | 'lots'
}

const getDefaultTrialOrder = () => {
  return {
    id: uuidv4(),
    amountSpent: 0,
    sharesPurchased: 0,
    unit: 'shares' as 'shares' | 'lots',
  }
}
export default function TrailCalculatePanel() {
  const [totalFunds, setTotalFunds] = useState<number>(1000000)
  const [allocation, setAllocation] = useState<number>()
  const defaultOrderData: TrialOrder[] = Array.from({ length: 5 }, getDefaultTrialOrder)
  const [trialOrderData, setTrialOrderData] = useState<TrialOrder[]>(defaultOrderData)

  const remainAmount = useMemo(() => {
    if (totalFunds === 0 || !allocation) return 0
    let needToBuy = totalFunds * allocation * 0.01
    trialOrderData.forEach((el) => {
      needToBuy = needToBuy - el.amountSpent * el.sharesPurchased * (el.unit === 'shares' ? 1 : 1000)
    })
    return needToBuy
  }, [totalFunds, allocation, trialOrderData])

  const { averagePurchasePrice, totalsharesPurchased, totalAmountPurchased } = useMemo(() => {
    let totalAmount = 0
    let totalShares = 0
    trialOrderData.forEach((el) => {
      const shares = el.unit === 'shares' ? el.sharesPurchased : el.sharesPurchased * 1000
      totalAmount = totalAmount + el.amountSpent * shares
      totalShares = totalShares + shares
    })

    if (totalShares === 0)
      return { averagePurchasePrice: 0, totalsharesPurchased: totalShares, totalAmountPurchased: totalAmount }
    return {
      averagePurchasePrice: (totalAmount / totalShares).toFixed(2),
      totalsharesPurchased: totalShares,
      totalAmountPurchased: totalAmount,
    }
  }, [trialOrderData])

  const updateTrialOrderData = <K extends keyof TrialOrder>(index: number, key: K, value: TrialOrder[K]) => {
    const newOrderTrials = [...trialOrderData]
    newOrderTrials[index][key] = value
    setTrialOrderData(newOrderTrials)
    return
  }
  return (
    <>
      <div className="flex justify-center text-[20px]">
        <div className="inline-block">
          <div className="flex gap-5 items-center flex-wrap">
            <div className="flex items-center gap-4">
              <div className="shrink-0">總資金</div>
              <Input
                type="number"
                classNames={{ input: 'text-[16px]' }}
                value={totalFunds || ''}
                onChange={(e) => setTotalFunds(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0">買入比例</div>
              <Input
                type="number"
                classNames={{ input: 'text-[16px]' }}
                value={allocation || ''}
                onChange={(e) => setAllocation(Number(e.target.value))}
              />
              %
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div>還需買入金額</div>
            <div>{remainAmount.toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div>已買入金額</div>
            <div>{totalAmountPurchased.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div>買入均價</div>
            <div>{averagePurchasePrice}</div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div>已買入股數</div>
            <div>{totalsharesPurchased}</div>
          </div>
          <div className="mt-3 border rounded-2xl p-3">
            <div className="flex justify-between">
              <div>掛單試算</div>
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    setTrialOrderData((prev) => {
                      return [...prev, getDefaultTrialOrder()]
                    })
                  }}
                >
                  新增
                </Button>
              </div>
            </div>
            <div className="text-[18px] mt-5">
              {trialOrderData.map((data, index) => {
                return (
                  <div className="flex gap-2 py-1 items-center" key={data.id}>
                    <div className="flex gap-1 itmes-center flex-wrap">
                      <span className="pt-[3px]">價格</span>
                      <Input
                        type="number"
                        classNames={{ input: 'text-[16px]' }}
                        value={trialOrderData[index].amountSpent}
                        onChange={(e) => updateTrialOrderData(index, 'amountSpent', Number(e.target.value))}
                      />
                    </div>
                    <div className="flex gap-1 itmes-center flex-wrap">
                      <span className="pt-[3px]">數量</span>
                      <Input
                        type="number"
                        classNames={{ input: 'text-[16px]' }}
                        value={trialOrderData[index].sharesPurchased}
                        onChange={(e) => updateTrialOrderData(index, 'sharesPurchased', Number(e.target.value))}
                      />
                    </div>
                    <div className="flex gap-2 text-[20px] itmes-center bg-slate-200 rounded-lg p-1">
                      <span
                        className={cn('w-[30px] h-[30px] flex justify-center items-center cursor-pointer', {
                          'bg-blue-500 text-white rounded-md p-1': trialOrderData[index].unit === 'shares',
                        })}
                        onClick={() => updateTrialOrderData(index, 'unit', 'shares')}
                      >
                        股
                      </span>
                      <span>/</span>
                      <span
                        className={cn('w-[30px] h-[30px] flex justify-center items-center cursor-pointer', {
                          'bg-blue-500 text-white rounded-md p-1': trialOrderData[index].unit === 'lots',
                        })}
                        onClick={() => updateTrialOrderData(index, 'unit', 'lots')}
                      >
                        張
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTrialOrderData((prev) => {
                          return prev.filter((el) => el.id !== data.id)
                        })
                      }}
                    >
                      <RxCrossCircled color={'#ff4242'} size={22} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
