import { Tabs } from '@mantine/core'
import { TabType } from './constants'
import IncreasePanel from './components/IncreasePanel'
function App() {
  return (
    <>
      <div className="p-10">
        <Tabs
          defaultValue={TabType.Increase}
          classNames={{
            tab: 'border-b-[3px]',
            tabLabel: 'text-[22px] font-semibold',
          }}
        >
          <Tabs.List>
            <Tabs.Tab value={TabType.Increase}>漲幅計算</Tabs.Tab>
            <Tabs.Tab value={TabType.TrailCalculate}>掛單試算</Tabs.Tab>
          </Tabs.List>
          <div className="pt-4">
            <Tabs.Panel value={TabType.Increase}>
              <IncreasePanel />
            </Tabs.Panel>
            <Tabs.Panel value={TabType.TrailCalculate}>
              coming soon...
            </Tabs.Panel>
          </div>
        </Tabs>
      </div>
    </>
  )
}

export default App
