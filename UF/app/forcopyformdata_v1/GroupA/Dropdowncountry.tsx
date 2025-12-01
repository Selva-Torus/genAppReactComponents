
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'



let getMapperDetailsBindValues:any ={} ;
const Dropdowncountry = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codedexcriptionv2_v1Props, setdfd_codedexcriptionv2_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  let getMapperDetailsValues:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  let customecode:any="";
  const [allCode,setAllCode]=useState<any>("");
 /////////////
   //another screen
  const {a374af, seta374af}= useContext(TotalContext) as TotalContextProps;
  const {a374afProps, seta374afProps}= useContext(TotalContext) as TotalContextProps;
  const {name4ba6f, setname4ba6f}= useContext(TotalContext) as TotalContextProps;
  const {country97da8, setcountry97da8}= useContext(TotalContext) as TotalContextProps;
  const {state7a4d2, setstate7a4d2}= useContext(TotalContext) as TotalContextProps;
  const {cityfa4f7, setcityfa4f7}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0, setbfedf0}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0Props, setbfedf0Props}= useContext(TotalContext) as TotalContextProps;
  const {testc78ea, settestc78ea}= useContext(TotalContext) as TotalContextProps;
  const {testc78eaProps, settestc78eaProps}= useContext(TotalContext) as TotalContextProps;
  const {test201527, settest201527}= useContext(TotalContext) as TotalContextProps;
  const {test201527Props, settest201527Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [countryOptions, setcountryOptions] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any
  category = "";

  const handleMapperValue = async()=>{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",
        componentId: "1c694586ee234da492b63d3e870374af",
        controlId: "ca0a477d73554219b4a80af12bd97da8",
        isTable: false,
        accessProfile:accessProfile,
        from:"dropdowncountry"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }
  }
  const getDropdownData = async(value?:any)=>{
    let te_refreshBody:te_refreshDto={
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedexcriptionv2:AFVK:v1"+":",
          refreshFlag: "Y",                
          count:1000,
          page:1
        }
        if (encryptionFlagCont) {
          te_refreshBody["dpdKey"] = encryptionDpd;
          te_refreshBody["method"] = encryptionMethod;
        }
        const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(te_refreshData?.data?.error == true){
          toast(te_refreshData?.data?.errorDetails?.message, 'danger')
        }else{
          //setdfd_codedexcriptionv2_v1Props(te_refreshData?.data?.dataset?.data || [])
        }
    let dfData = te_refreshData?.data?.dataset?.data
    let mapperColumn: string =  `countryvalue`
    let mapperText: string =  `countrycode`
    bindtranValue = value;

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperColumn,mapperText,category, bindtranValue, code)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperColumn,category, bindtranValue, code)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
      setDropdownData((prev: any) => ({ ...prev, COUNTRY: getMapperDetails}))
    if(!value){
    let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
    temp = temp.filter((ele:any)=>ele)
    setcountryOptions(temp);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[country97da8?.refresh])

  useEffect(() => {
    getDropdownData()
  },[country97da8?.refresh])

  const handlechange = async(value: any) => {
    if(value.length>0){
      seta374af((prev: any) => ({ ...prev, countrycode: getMapperDetailsBindValues[value],countryvalue: value }))
      getDropdownData(value)
        setIsRequredData(false)
    }else{
      let temp:any = a374af
      delete temp.countrycode
      delete temp.countryvalue
      seta374af(temp)
      getDropdownData()
       setIsRequredData(true)
    }
     setError('')
    setValidate((pre:any)=>({...pre,countrycode:undefined}))
    handleClick(value)
  };

  useEffect(() => {
    if(Array.isArray(dfd_codedexcriptionv2_v1Props) && dfd_codedexcriptionv2_v1Props?.length == 1){
    // seta374af((pre:any)=>({...pre,countrycode:dfd_codedexcriptionv2_v1Props[0]?.countrycode}))
    }
  },[dfd_codedexcriptionv2_v1Props])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[]
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      seta374af((prev: any) => ({ ...prev, countrycode: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       seta374af((prev: any) => ({ ...prev, countrycode: ''}))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,countrycode:undefined}))
   
    selected.current=value
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}
      
        codeStates['a'] = a374af,
        codeStates['seta'] = seta374af,
        codeStates['selected']  = selected,
        codeStates['a374af'] = a374afProps,
        codeStates['seta374af'] = seta374afProps,
        codeStates['selected']  = selected,
        codeStates['name'] = name4ba6f,
        codeStates['setname'] = setname4ba6f,
        codeStates['selected']  = selected,
        codeStates['country'] = country97da8,
        codeStates['setcountry'] = setcountry97da8,
        codeStates['selected']  = selected,
        codeStates['state'] = state7a4d2,
        codeStates['setstate'] = setstate7a4d2,
        codeStates['selected']  = selected,
        codeStates['city'] = cityfa4f7,
        codeStates['setcity'] = setcityfa4f7,
        codeStates['selected']  = selected,
        codeStates['b'] = bfedf0,
        codeStates['setb'] = setbfedf0,
        codeStates['selected']  = selected,
        codeStates['bfedf0'] = bfedf0Props,
        codeStates['setbfedf0'] = setbfedf0Props,
        codeStates['selected']  = selected,
        codeStates['test'] = testc78ea,
        codeStates['settest'] = settestc78ea,
        codeStates['selected']  = selected,
        codeStates['testc78ea'] = testc78eaProps,
        codeStates['settestc78ea'] = settestc78eaProps,
        codeStates['selected']  = selected,
        codeStates['test2'] = test201527,
        codeStates['settest2'] = settest201527,
        codeStates['selected']  = selected,
        codeStates['test201527'] = test201527Props,
        codeStates['settest201527'] = settest201527Props,
        codeStates['selected']  = selected,
    codeExecution(customecode,codeStates)
    }
  }
   
  async function handleConfirmonClick(){
  } 
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  let schemaArray = [] ;
  const handleBlur = async () => {
  }
    useEffect(()=>{
        handleBlur()
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     seta374af((pre:any)=>({...pre,countrycode:""}))
    else
      setInitialCount(1)
  },[country97da8?.refresh])

  if (country97da8?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `5 / 7`,gridRow: `10 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
      </div>
      <Dropdown   
        className=""    
        disabled= {country97da8?.isDisabled ? true : false}
        width = "250"
        static={true}
        staticProps={countryOptions}
        placeholder={keyset("country")} filterable={true} hasClear={true} onChange={handlechange} value={a374af?.countryvalue ? [a374af?.countryvalue] : []}
        />
         {validate?.country && (
          <Text variant="caption-1" color="danger" className="mt-1">
            {error || 'This field is required'}
          </Text>
        )}
    </div>
  );
};

export default Dropdowncountry;
