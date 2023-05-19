import React, { FormEvent } from 'react'

import {
  renderForm,
  getValuesOfFormElement
} from 'src/utils/form'

import {
  SAVE_ITINERARY_FORM
} from 'src/utils/form'

import Input from '../input/Input';
import Dialog from './Dialog'

import {
  ModalItemCloseAction,
  SaveItineraryDataProps,
  DialogPart
} from 'src/types'

export default function SaveItineraryDialog() {
  let saveItineraryForm = React.useMemo(() => SAVE_ITINERARY_FORM, []);

  let onSubmitSaveItinerary = React.useMemo(() => {
    return function(close: ModalItemCloseAction) {
      return (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let keys = Object.keys(form.elements).filter(key => {
          let isString = Number.isNaN(parseInt(key));
          return isString;
        });
        let saveItinerary: SaveItineraryDataProps = {
          saveItineraryName: "Lịch trình du lịch"
        };
    
        for(let key of keys) {
          let formEle: HTMLInputElement | RadioNodeList = form[key];
          let data = getValuesOfFormElement(formEle);
          let saveItineraryKey = data.elementName?.split('-')[0];
          if(saveItineraryKey) saveItinerary[saveItineraryKey] = data.values;
        }

        close(
          true,
          "Đang lưu lịch trình...",
          { 
            saveItinerary: {
              itineraryName: saveItinerary.saveItineraryName,
              color: saveItinerary.saveItineraryColor
            } 
          }
        )
      }
    }
  }, [])

  let Header = React.useMemo((): DialogPart => {
    return function({close}) {
      return <p className="fw-bold mb-2">Lưu lịch trình của hành trình du lịch</p>
    }
  }, []);

  let Body = React.useMemo((): DialogPart => {
    return function ({close}) {
      return (
        <div>
          <form id="save-itinerary-form" onSubmit={onSubmitSaveItinerary(close)}>
            {
              renderForm(saveItineraryForm,
                input => {
                  return (
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
                      key={input.name}
                    />
                  )
                },
                undefined,
                group => (
                  <div className="mt-1" key={group.baseName}>
                    <p className='mb-1'>{group.groupChipLabel}</p>
                    <div className='formprompt-chips-container'>
                      {
                        group.inputs.map(input => (
                          <Input
                            {...input.props}
                            type={input.type}
                            label={input.label && (
                              <div className='circle' style={{backgroundColor: input.label.text, width: 40, aspectRatio: 1}}></div>
                            )}
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
              )
            }
            <div className='flex jc-flex-end ait-center mt-2'>
              <button
                type='submit'
                className="btn btn-primary rounded-8 me-2"
              >
                Lưu lịch trình
              </button>
              <button
                onClick={() => {
                  close(false, "Bạn không lưu lịch trình! Có gì đó không đúng chăng?")
                }}
                className="btn btn-20percent-background rounded-8"
              >
                Huỷ
              </button>
            </div>
          </form>
        </div>
      )
    }
  }, []);

  let dialogName = 'saveItineraryDialog';

  return (
    <Dialog
      name={dialogName}
      header={Header}
      body={Body}
    />
  )
}