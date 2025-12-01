
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation'
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetails } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'


const DropdownCOUNTRY = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const {dfd_codedescription_v1Props, setdfd_codedescription_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
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
  const {state0b6c9, setstate0b6c9}= useContext(TotalContext) as TotalContextProps;
  const {countryfc56a, setcountryfc56a}= useContext(TotalContext) as TotalContextProps;
  const {name05359, setname05359}= useContext(TotalContext) as TotalContextProps;
  const {city0a02b, setcity0a02b}= useContext(TotalContext) as TotalContextProps;
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
  category = "COUNTRY";

  const handleMapperValue = async()=>{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",
        componentId: "4497064e36c34f38aba0387c792fedf0",
        controlId: "f7f1cdf57c7f49209913857f3ccfc56a",
        isTable: false,
        accessProfile:accessProfile,
        from:"dropdownCOUNTRY"
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
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedescription:AFVK:v1"+":",
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
          //setdfd_codedescription_v1Props(te_refreshData?.data?.dataset?.data || [])
        }
    let dfData = te_refreshData?.data?.dataset?.data
    let mapperColumn: string =  `description`
    bindtranValue = value;

  try{
    getMapperDetails = await getDropdownDetails(dfData,mapperColumn,category, bindtranValue, code)
      setDropdownData((prev: any) => ({ ...prev, COUNTRY: getMapperDetails}))
    if(!value){
    setcountryOptions(getMapperDetails);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[countryfc56a?.refresh])

  useEffect(() => {
    getDropdownData()
  },[countryfc56a?.refresh])

  const handlechange = async(value: any) => {
    if(value.length>0){
      setbfedf0((prev: any) => ({ ...prev, country: value }))
      getDropdownData(value)
      setIsRequredData(false)
    }else{
      let temp:any = bfedf0
      delete temp.country
      setbfedf0(temp)
      getDropdownData()
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,country:undefined}))
    handleClick(value)
  };

  useEffect(() => {
    if(Array.isArray(dfd_codedescription_v1Props) && dfd_codedescription_v1Props?.length == 1){
    // setbfedf0((pre:any)=>({...pre,country:dfd_codedescription_v1Props[0]?.country}))
    }
  },[dfd_codedescription_v1Props])

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
      setbfedf0((prev: any) => ({ ...prev, country: value}))
      setIsRequredData(false)
    } else {
      setbfedf0((prev: any) => ({ ...prev, country: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,country:undefined}))
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
        codeStates['state'] = state0b6c9,
        codeStates['setstate'] = setstate0b6c9,
        codeStates['selected']  = selected,
        codeStates['country'] = countryfc56a,
        codeStates['setcountry'] = setcountryfc56a,
        codeStates['selected']  = selected,
        codeStates['name'] = name05359,
        codeStates['setname'] = setname05359,
        codeStates['selected']  = selected,
        codeStates['city'] = city0a02b,
        codeStates['setcity'] = setcity0a02b,
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
  ///////////////

  useEffect(() => {
    if(initialCount!=0)
     setbfedf0((pre:any)=>({...pre,country:""}))
    else
      setInitialCount(1)
  },[countryfc56a?.refresh])

  if (countryfc56a?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `6 / 8`,gridRow: `18 / 28`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
      </div>
      <Dropdown   
        className=""    
        disabled= {countryfc56a?.isDisabled ? true : false}
        width = "250"
        static={true}
        staticProps={countryOptions}
        placeholder={keyset("COUNTRY")} 
        filterable={true} 
        hasClear={true} 
        onChange={handlechange} 
        value={bfedf0?.country ? [bfedf0?.country] : []}
        />
        {validate?.country && (
          <Text variant="caption-1" color="danger" className="mt-1">
            {error || 'This field is required'}
          </Text>
        )}
    </div>
  );
};

export default DropdownCOUNTRY;
