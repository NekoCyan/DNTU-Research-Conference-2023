import React, { FormEvent } from 'react'

import {
  INTEREST_CHIPS,
  PROMPT_FORM,
  renderForm
} from 'src/utils/form';

import { useSplash } from 'src/hooks/useSplash';

import Input from '../input/Input'

import './FormPromptStyles.css'
import { toThousandsSeparatedNumber, toIntNumber } from 'src/utils/number';

import {
  ChipInputDataProps,
  GroupInputsDataProps,
  GroupChipInputsDataProps,
  TextInputDataProps
} from 'src/types';

function FormPrompt() {
  const { showSplash } = useSplash();

  const formPromt = React.useMemo(() => PROMPT_FORM, []);
  const formPromtKeys = React.useMemo(() => Object.keys(formPromt), [formPromt])

  const onSubmitPrompt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    let inputs = form.elements;

    // let prompt = `I travel to ${where} in ${duration} day(s).\nI've ${budget} VND for this trip.
    // `
    // console.log(prompt);
    console.log(inputs);
  }

  console.log("RENDER: FormPrompt");

  return (
    <form id="prompt-form" onSubmit={onSubmitPrompt} className='formprompt p-xxl'>
      <div className='prompt-form-content'>
        {
          renderForm(
            formPromt,
            input => (
              <div className="mb-4" key={input.name}>
                <Input
                    {...input.props}
                    label={
                      input.label && (
                        <>
                          <i className={`twa twa-${input.label!.icon}`}></i> <span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
                        </>
                      )
                    }
                    labelInputClassName={input.labelInputClassName}
                    type={input.type}
                    name={input.name}
                  />
              </div>
            ),
            group => (
              <div className="flex flex-rw mb-4" key={group.baseName}>
                  {
                    group.inputs.map(input => (
                      <Input
                        {...input.props}
                        label={
                          input.label && (
                            <>
                              <i className={`twa twa-${input.label!.icon}`}></i> <span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
                            </>
                          )
                        }
                        labelInputClassName={input.labelInputClassName}
                        type={input.type}
                        name={input.name}
                        key={input.name}
                      />
                    ))
                  }
                </div>
            ),
            group => (
              <div key={group.baseName}>
                  <p className='fw-bold fs-3 mb-1'>{group.groupChipLabel}</p>
                  <div className='chips-container'>
                    {
                      group.inputs.map(input => (
                        <Input
                          type='chip'
                          label={input.label && <><i className={`twa twa-${input.label.icon}`}></i> {input.label.text}</>}
                          labelInputClassName='me-1'
                          name={input.name}
                          key={input.value}
                        />
                      ))
                    }
                  </div>
                </div>
            ),
            formPromtKeys
          )
        }
      </div>

      <div>
        <button 
          className='btn btn-primary rounded-8'
          type='submit'
        >Tạo lịch trình</button>
      </div>
    </form>
  )
}

export default React.memo(FormPrompt);

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
/*
    formPromtKeys.map(key => {
      if((formPromt[key] as GroupChipInputsDataProps).isChipGroup) {
        let group = formPromt[key] as GroupChipInputsDataProps;
        return (
          <div key={group.baseName}>
            <p className='fw-bold fs-3 mb-1'>{group.groupChipLabel}</p>
            <div className='chips-container'>
              {
                group.inputs.map(input => (
                  <Input
                    type='chip'
                    label={input.label && <><i className={`twa twa-${input.label.icon}`}></i> {input.label.text}</>}
                    labelInputClassName='me-1'
                    name={input.name}
                    key={input.value}
                  />
                ))
              }
            </div>
          </div>
        )
      }

      if((formPromt[key] as GroupInputsDataProps).isGroup) {
        let group = formPromt[key] as GroupInputsDataProps;
        return (
          <div className="flex flex-rw mb-4" key={group.baseName}>
            {
              group.inputs.map(input => (
                <Input
                  {...input.props}
                  label={
                    input.label && (
                      <>
                        <i className={`twa twa-${input.label!.icon}`}></i> <span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
                      </>
                    )
                  }
                  labelInputClassName={input.labelInputClassName}
                  type={input.type}
                  name={input.name}
                  key={input.name}
                />
              ))
            }
          </div>
        )
      }

      let input = formPromt[key] as TextInputDataProps;
      return (
        <div className="mb-4" key={input.name}>
          <Input
              {...input.props}
              label={
                input.label && (
                  <>
                    <i className={`twa twa-${input.label!.icon}`}></i> <span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
                  </>
                )
              }
              labelInputClassName={input.labelInputClassName}
              type={input.type}
              name={input.name}
            />
        </div>
      )
    })
  }
  <div className="mb-4">
    <Input
      label={<><i className="twa twa-round-pushpin"></i> <span className='fw-bold'>Bạn muốn đi du lịch ở đâu?</span></>}
      autoComplete='none'
      name="where-field"
    />
  </div>
  <div className="flex flex-rw mb-4">
    <Input
      maxLength={12}
      labelInputClassName='pe-2'
      label={<><i className="twa twa-money-bag"></i> <span className='fw-bold'>Chi phí</span> (VND)</>}
      autoComplete='none'
      onInput={onBudgetInput}
      name="budget-field"
    />
    <Input
      max={365}
      min={1}
      type='number'
      label={<><i className="twa twa-timer-clock"></i> <span className='fw-bold'>Trong bao lâu?</span> (Ngày)</>}
      autoComplete='none'
      name="duration-field"
    />
  </div>
  <div>
    <p className='fw-bold fs-3 mb-1'>Bạn bị hấp dẫn bởi:</p>
    <div className='chips-container'>
      {
        INTEREST_CHIPS.map((interestChip: ChipInputDataProps) => (
          <Input
            type='chip'
            label={<><i className={`twa twa-${interestChip.icon}`}></i> {interestChip.label}</>}
            labelInputClassName='me-1'
            name={interestChip.name}
            key={interestChip.value}
          />
        ))
      }
    </div>
  </div>
*/