import { RadialGoalsChart } from '@/components/radial-chart';

export default function Page() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 '>
      <div className='grid auto-rows-min gap-4 md:grid-cols-2'>
        <RadialGoalsChart />
        <RadialGoalsChart />
        <div className='md:col-span-2'>
          <RadialGoalsChart />
        </div>
      </div>
    </div>
  );
}
