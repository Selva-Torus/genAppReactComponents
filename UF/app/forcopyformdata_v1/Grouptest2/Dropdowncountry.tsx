
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
  const {bfedf0, setbfedf0}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0Props, setbfedf0Props}= useContext(TotalContext) as TotalContextProps;
  const {testc78ea, settestc78ea}= useContext(TotalContext) as TotalContextProps;
  const {testc78eaProps, settestc78eaProps}= useContext(TotalContext) as TotalContextProps;
  const {test201527, settest201527}= useContext(TotalContext) as TotalContextProps;
  const {test201527Props, settest201527Props}= useContext(TotalContext) as TotalContextProps;
  const {country7b2d1, setcountry7b2d1}= useContext(TotalContext) as TotalContextProps;
  const {check33853, setcheck33853}= useContext(TotalContext) as TotalContextProps;
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
        componentId: "be4b3112ca8e41cf998b9aa24be01527",
        controlId: "469782fcfb3e45999a01b68dcdd7b2d1",
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

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperColumn,mapperText,category, bindtranValue, code)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperColumn,category, bindtranValue, code)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
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
  },[country7b2d1?.refresh])

  useEffect(() => {
    getDropdownData()
  },[country7b2d1?.refresh])

  const handlechange = async(value: any) => {
    if(value.length>0){
      settest201527((prev: any) => ({ ...prev, countrycode: getMapperDetailsBindValues[value],countryvalue: value }))
        setIsRequredData(false)
    }else{
      let temp:any = test201527
      delete temp.countrycode
      delete temp.countryvalue
      settest201527(temp)
      getDropdownData()
       setIsRequredData(true)
    }
     setError('')
    setValidate((pre:any)=>({...pre,countrycode:undefined}))
  };

  useEffect(() => {
    if(Array.isArray(dfd_codedexcriptionv2_v1Props) && dfd_codedexcriptionv2_v1Props?.length == 1){
    // settest201527((pre:any)=>({...pre,countrycode:dfd_codedexcriptionv2_v1Props[0]?.countrycode}))
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
      settest201527((prev: any) => ({ ...prev, countrycode: getMapperDetailsBindValues[value]}))
         setIsRequredData(false)
    } else {
       settest201527((prev: any) => ({ ...prev, countrycode: ''}))
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
        codeStates['country'] = country7b2d1,
        codeStates['setcountry'] = setcountry7b2d1,
        codeStates['selected']  = selected,
        codeStates['check'] = check33853,
        codeStates['setcheck'] = setcheck33853,
        codeStates['selected']  = selected,
    codeExecution(customecode,codeStates)
    }
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
     settest201527((pre:any)=>({...pre,countrycode:""}))
    else
      setInitialCount(1)
  },[country7b2d1?.refresh])

  if (country7b2d1?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `2 / 4`,gridRow: `12 / 36`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
      </div>
      <Dropdown   
        className=""    
        disabled= {country7b2d1?.isDisabled ? true : false}
        width = "250"
        static={true}
        staticProps={countryOptions}
        placeholder={keyset("country")} filterable={true} hasClear={true} onChange={handlechange} value={test201527?.countryvalue ? [test201527?.countryvalue] : []}
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
