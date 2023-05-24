import React, { FormEvent } from 'react'

import { modal } from 'src/class/modal';

import {
  useMediaQuery
} from 'src/hooks/useMediaQuery'
import {
  useItineraryDetails
} from 'src/hooks/useItineraries'

import {
  PROMPT_FORM,
  renderForm,
  getValuesOfFormElement,
  setValuesToFormElement
} from 'src/utils/form';
import {
  getLocalStorageItem,
  setLocalStorageItem
} from 'src/utils/localstorage'

import Input from '../input/Input'
import Select from '../select/Select';

import './FormPromptStyles.css'
import '../../styles/form.css'

import {
  PromptDataProps,
  ItineraryDataProps
} from 'src/types';

function FormPrompt() {
  const formPromptData = React.useMemo(() => PROMPT_FORM, []);
  const formPromptKeys = React.useMemo(() => Object.keys(formPromptData), [formPromptData])

  const match = useMediaQuery("768,1280");
  const {
    itineraryDetails,
    isGenerated,
    generateItinerary,
    savetinerary,
    updateItineraryDetails
  } = useItineraryDetails();

  const formPromptRef = React.useRef<HTMLFormElement>(null);

  const [info, setInfo] = React.useState({
    hasGeolocationPermission: false,
    isGenerated: false
  });

  const handleShowFormClick = () => {
    formPromptRef.current?.classList.add("show");
  }

  const handleHideFormClick = () => {
    formPromptRef.current?.classList.remove("show");
  }

  const onSubmitPrompt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(match.range === "[0,768]") handleHideFormClick();

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

    // generateItinerary({promptAsObj: {...promptAsObject}});
    updateItineraryDetails({promptAsObj: {...promptAsObject}});
  }

  console.log("RENDER: FormPrompt");
  console.log("Match: ", match);

  React.useEffect(() => {
    if('permissions' in navigator) {
      navigator.permissions.query({name: "geolocation"})
      .then(permission => {
        if(permission.state === "granted") {
          setInfo(prevState => ({...prevState, hasGeolocationPermission: true}));
        }
        if(permission.state === "prompt" && !getLocalStorageItem("isGeolocationDeny")) {
          modal.show("askforlocationDialog")
          .then(result => {
            if(result?.result) setInfo(prevState => ({...prevState, hasGeolocationPermission: result?.result}));
          });
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if(itineraryDetails?.promptAsObj && formPromptRef.current) {
      let form = formPromptRef.current;
      let keys = Object.keys(form.elements).filter(key => {
        let isString = Number.isNaN(parseInt(key));
        return isString;
      });
  
      for(let key of keys) {
        let formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement = form[key];
        let keyForPromptObj = key.split("-")[0];
        setValuesToFormElement(formEle, itineraryDetails?.promptAsObj[keyForPromptObj]);
      }
      setInfo(prevState => ({...prevState, }));
    }
  }, [itineraryDetails?.promptAsObj]);

  return (
    <>
      {
        match.range === "[0,768]" && (
          <button
            onClick={handleShowFormClick}
            className='btn btn-primary rounded-8 toggle-form-btn m-xxl'
          >
            Tạo
          </button>
        )
      }
      <form ref={formPromptRef} id="prompt-form" onSubmit={onSubmitPrompt} className='formprompt'>
        <div className='formprompt-content px-xxl'>
          {
            renderForm(
              formPromptData,
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
                <div className="inputs-container mb-4" key={group.baseName}>
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
                  <div className='chips-container'>
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
                  <div className="selects-container jc-space-between mb-4" key={group.baseName}>
                    {
                      selects.map(select => {
                        let options = select.options;
                        let selectContainerClassName =
                          select.containerClassName
                          ? "select-container " + select.containerClassName
                          : "select-container";
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
              formPromptKeys
            )
          }
        </div>
        
        <div className='pt-2 px-xxl pb-xxl'>
          <div className='form-control-container jc-space-between'>
            <div className='flex flex-rw'>
              <button
                type='submit'
                className='btn btn-primary rounded-8 me-2'
              >Tạo lịch trình</button>
              <button
                type='button'
                onClick={() => {
                  if(!isGenerated) {
                    console.log("Bạn chưa tạo lịch trình cho hành trình du lịch.");
                    modal
                    .show("messageDialog", { message: "Hãy ấn nút tạo lịch trình để tạo lịch trình, sau khi có được kết quả thì bạn mới có thể lưu :(" })
                    .then(data => {
                      console.log("Message's result: ", data?.result);
                    })
                  } else {
                    modal
                    .show("saveItineraryDialog")
                    .then(data => {
                      if(data?.result) {
                        let resquestData = {...itineraryDetails};
                        resquestData.itineraryName = data?.data.itineraryName;
                        resquestData.color = data?.data.color;
                        if(resquestData.travelId) delete resquestData.travelId;
                        savetinerary(resquestData);
                      }
                    })
                  }
                }}
                className='btn btn-20percent-background rounded-8'
              >Lưu lịch trình</button>
            </div>
            {
              match.range === "[0,768]" && (
                <div className='flex ms-2'>
                  <button
                    type='button'
                    onClick={handleHideFormClick}
                    className='btn btn-error rounded-8'
                  >
                    Đóng
                  </button>
                </div>
              )
            }
          </div>
          {
            !info.hasGeolocationPermission && (
              <p className='mt-1'>
                Để có được kết quả tốt hơn thì bạn nên
                <span
                  className='btn-text fw-bold txt-clr-primary'
                  onClick={
                    () => modal.show("askforlocationDialog")
                    .then(result => {
                      if(result?.result) setInfo(prevState => ({...prevState, hasGeolocationPermission: result?.result}));
                    })
                  }
                >
                  &nbsp;chia sẻ vị trí&nbsp;
                </span>
                của bạn!
              </p>
            )
          }
        </div>
      </form>
    </>
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