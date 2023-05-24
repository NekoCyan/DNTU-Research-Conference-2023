import React, { FormEvent } from 'react'

import {
  modal
} from 'src/class/modal'

import {
  useItineraryDetailsState
} from 'src/hooks/useItineraries'

import {
  renderForm,
  getValuesOfFormElement,
  setValuesToFormElement
} from 'src/utils/form'

import {
  SAVE_ITINERARY_FORM
} from 'src/utils/form'

import Input from '../input/Input';
import Dialog from './Dialog'

import {
  ModalItemCloseAction,
  SaveItineraryDataProps,
  DialogPart,
  ItineraryDataProps
} from 'src/types'

export default function SaveItineraryDialog() {
  let { itineraryDetails } = useItineraryDetailsState();
  let saveItineraryForm = React.useMemo(() => SAVE_ITINERARY_FORM, [itineraryDetails]);

  const [hasFormRef, setHasFormRef] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement | null>(null);

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
          itineraryName: "Lịch trình du lịch"
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
            itineraryName: saveItinerary.itineraryName,
            color: saveItinerary.color
          }
        )
      }
    }
  }, [])

  React.useEffect(() => {
    if(hasFormRef && itineraryDetails) {
      let form = formRef.current!;
      let keys = Object.keys(form.elements).filter(key => {
        let isString = Number.isNaN(parseInt(key));
        return isString;
      });
      console.log("Data: ", itineraryDetails);
      for(let key of keys) {
        let formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement = form[key];
        let keyForPromptObj = key.split("-")[0] as keyof ItineraryDataProps;
        setValuesToFormElement(formEle, itineraryDetails![keyForPromptObj] ? itineraryDetails![keyForPromptObj] : "");
      }
    }
  }, [hasFormRef]);

  let Header = React.useMemo((): DialogPart => {
    return function({close}) {
      return <p className="fw-bold mb-2">Lưu lịch trình của hành trình du lịch</p>
    }
  }, []);

  let Body = React.useMemo((): DialogPart => {
    return function ({close}) {
      return (
        <div>
          <form
            ref={form => {
              formRef.current = form;
              setHasFormRef(true);
            }}
            id="save-itinerary-form" onSubmit={onSubmitSaveItinerary(close)}
          >
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
  }, [hasFormRef]);

  let dialogName = 'saveItineraryDialog';

  return (
    <Dialog
      name={dialogName}
      header={Header}
      body={Body}
    />
  )
}