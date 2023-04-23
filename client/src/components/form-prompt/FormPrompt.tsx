import React from 'react'

import Input from '../input/Input'

import './FormPromptStyles.css'
import { toThousandsSeparatedNumber, toIntNumber, formattedNumberPattern } from 'src/utils/number';

export default function FormPrompt() {
  const promptInputRefs = React.useRef<{[key: string]: HTMLInputElement | null}>({
    where: null,
    budget: null,
    duration: null
  });

  const onBudgetInput = (e: any) => {
    let value = toIntNumber(e.target.value);

    if(Number.isNaN(value)) {
      e.target.value = "";
      return;
    }

    let formatted = toThousandsSeparatedNumber(value);
    e.target.value = formatted;
  }

  const onSubmitPrompt = () => {
    let where = promptInputRefs.current.where?.value;
    let budget = !promptInputRefs.current.budget?.value ? "0" : promptInputRefs.current.budget?.value;
    let duration = !promptInputRefs.current.duration?.value ? "1" : promptInputRefs.current.duration?.value;

    let prompt = `I travel to ${where} in ${duration} day(s).\nI've ${budget} VND for this trip.
    `
    console.log(prompt);
  }

  console.log("RENDER: FormPrompt");

  return (
    <div className='formprompt p-xxl'>
      <div>
        <div className="mb-4">
          <Input
            ref={input => promptInputRefs.current.where = input!}
            label={<><i className="twa twa-round-pushpin"></i> Bạn muốn đi du lịch ở đâu?</>}
            autoComplete='none'
          />
        </div>
        <div className="flex flex-rw">
          <Input
            ref={input => promptInputRefs.current.budget = input!}
            maxLength={12}
            labelInputClassName='pe-2'
            label={<><i className="twa twa-money-bag"></i> Chi phí</>}
            autoComplete='none'
            onInput={onBudgetInput}
          />
          <Input
            ref={input => promptInputRefs.current.duration = input!}
            max={365}
            min={1}
            type='number'
            label={<><i className="twa twa-timer-clock"></i> Trong bao lâu?</>}
            autoComplete='none'
          />
        </div>
      </div>

      <div>
        <button 
          className='btn btn-primary rounded-8'
          onClick={onSubmitPrompt}
        >Tạo lịch trình</button>
      </div>
    </div>
  )
}

/* 
  <p><i className="twa twa-flag-vietnam"></i> Chào mừng đến với DNTU Conference</p>
  <p>Một số nút trong app, xem App.tsx để biết thêm chi tiết</p>
  <button className='btn btn-primary rounded-8'><span>Primary color button</span></button>
  <button className='btn btn-error rounded-8'>Error color button</button>
  <button className='btn rounded-8' disabled>Diabled button</button>
  <button className='btn btn-20percent-background rounded-8'>20 percent white button</button>
  <button className='btn btn-transparent-bg rounded-8'>Transparent background button</button>
  <button className='btn rounded-8 btn-lbl-primary'>No border button, lbl color primary</button>
  <button className='btn rounded-8 btn-lbl-primary-container'>No border button, lbl color primary container</button>
*/
