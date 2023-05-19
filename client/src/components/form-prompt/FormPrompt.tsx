import React, { FormEvent } from 'react'

import { modal } from 'src/class/modal';

import {
  PROMPT_FORM,
  renderForm,
  getValuesOfFormElement
} from 'src/utils/form';

import Input from '../input/Input'
import Select from '../select/Select';

import './FormPromptStyles.css'

import {
  ResquestBodyDataProps,
  PromptDataProps,
  ItineraryDataProps
} from 'src/types';

function FormPrompt() {
  const formPromt = React.useMemo(() => PROMPT_FORM, []);
  const formPromtKeys = React.useMemo(() => Object.keys(formPromt), [formPromt])

  const [currentItinerary, setCurrentItinerary] = React.useState<ItineraryDataProps | null>(null);

  const onSubmitPrompt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    let keys = Object.keys(form.elements).filter(key => {
      let isString = Number.isNaN(parseInt(key));
      return isString;
    });
    let promptAsObject: PromptDataProps = {};

    for(let key of keys) {
      let formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement = form[key];
      let data = getValuesOfFormElement(formEle);
      let promptKey = data.elementName?.split('-')[0];
      if(promptKey) promptAsObject[promptKey] = data.values;
    }

    let requestBody: ResquestBodyDataProps<{[key: string]: PromptDataProps}> = {
      data: {
        promptAsObject
      }
    }

    setCurrentItinerary({
      promptAsObj: {...promptAsObject}
    })

    console.log("Request body: ", requestBody)
  }

  console.log("RENDER: FormPrompt");

  return (
    <form id="prompt-form" onSubmit={onSubmitPrompt} className='formprompt px-xxl pb-xxl'>
      <div className='formprompt-content'>
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
                          {input.label!.icon && <i className={`twa twa-${input.label!.icon} me-1`}></i>}<span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
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
                            {input.label!.icon && <i className={`twa twa-${input.label!.icon}`}></i>}<span className='fw-bold'>{input.label!.text}</span> {input.label!.sub}
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
              <div className="mb-4" key={group.baseName}>
                <p className='fw-bold fs-3 mb-1'>{group.groupChipLabel}</p>
                <div className='formprompt-chips-container'>
                  {
                    group.inputs.map(input => (
                      <Input
                        {...input.props}
                        type={input.type}
                        label={input.label && <>{input.label.icon && <i className={`twa twa-${input.label.icon}`}></i>}{input.label.text && " " + input.label.text}</>}
                        labelInputClassName='me-1'
                        name={input.name}
                        key={input.value}
                        value={input.value}
                      />
                    ))
                  }
                </div>
              </div>
            ),
            select => {
              let options = select.options;
              return (
                <div className="mb-4" key={select.name}>
                  <Select
                    label={
                      select.label && (
                        <>
                          {select.label!.icon && <i className={`twa twa-${select.label!.icon}`}></i>}<span className='fw-bold'>{select.label!.text}</span> {select.label!.sub}
                        </>
                      )
                    }
                    name={select.name}
                    {...select.props}
                  >
                    {
                      options.map(option => (
                        <Select.Option
                          value={option.value}
                          key={option.name}
                        >{option.label}</Select.Option>
                      ))
                    }
                  </Select>
                </div>
              )
            },
            group => {
              let selects = group.selects;
              return (
                <div className="flex flex-rw jc-space-between mb-4" key={group.baseName}>
                  {
                    selects.map(select => {
                      let options = select.options;
                      let selectContainerClassName =
                        select.containerClassName
                        ? "formprompt-select-container" + " " + select.containerClassName
                        : "formprompt-select-container";
                      return (
                        <div
                          className={selectContainerClassName}
                          key={select.name}
                        >
                          <Select
                            label={
                              select.label && (
                                <>
                                  {select.label!.icon && <i className={`twa twa-${select.label!.icon}`}></i>}<span className='fw-bold'>{select.label!.text}</span> {select.label!.sub}
                                </>
                              )
                            }
                            name={select.name}
                            {...select.props}
                          >
                            {
                              options.map(option => (
                                <Select.Option
                                  value={option.value}
                                  key={option.name}
                                >{option.label}</Select.Option>
                              ))
                            }
                          </Select>
                        </div>
                      )
                    })
                  }
                </div>
              )
            },
            formPromtKeys
          )
        }
      </div>

      <div className='formprompt-controll-container pt-2'>
        <div className='flex flex-rw'>
          <button
            className='btn btn-primary rounded-8 me-2'
            type='submit'
          >Tạo lịch trình</button>
          <button 
            onClick={() => {
              if(!currentItinerary?.prompt) {
                console.log("Bạn chưa tạo lịch trình cho hành trình du lịch.");
                modal
                .show("messageDialog", { message: "Bạn chưa tạo lịch trình nên không thể lưu lại được :(" })
                .then(data => {
                  console.log("Message's result: ", data?.result);
                })
              } else {
                modal
                .show("saveItineraryDialog")
                .then(data => {
                  setCurrentItinerary(prevState => {
                    let { saveItinerary } = data?.data;
                    console.log("Save Itinerary: ", saveItinerary)
                    return {...prevState, itineraryName: saveItinerary.itineraryName, color: saveItinerary.color}
                  })
                })
              }
            }}
            className='btn btn-20percent-background rounded-8'
            type='button'
          >Lưu lịch trình</button>
        </div>
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