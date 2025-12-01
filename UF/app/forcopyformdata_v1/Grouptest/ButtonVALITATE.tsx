'use client'
import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { XMLParser } from 'fast-xml-parser'


    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const ButtonVALITATE = ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  let code:any = "";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const savedData=useRef({})
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast:any=useInfoMsg();
  let dfKey: string | any;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false);
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<any>("");
    
 /////////////
   //another screen
  const {a374af, seta374af}= useContext(TotalContext) as TotalContextProps;
  const {a374afProps, seta374afProps}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0, setbfedf0}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0Props, setbfedf0Props}= useContext(TotalContext) as TotalContextProps;
  const {testc78ea, settestc78ea}= useContext(TotalContext) as TotalContextProps;
  const {testc78eaProps, settestc78eaProps}= useContext(TotalContext) as TotalContextProps;
  const {state0ef1d, setstate0ef1d}= useContext(TotalContext) as TotalContextProps;
  const {cityc9796, setcityc9796}= useContext(TotalContext) as TotalContextProps;
  const {countrya7836, setcountrya7836}= useContext(TotalContext) as TotalContextProps;
  const {valitateacc89, setvalitateacc89}= useContext(TotalContext) as TotalContextProps;
  const {test201527, settest201527}= useContext(TotalContext) as TotalContextProps;
  const {test201527Props, settest201527Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: any = {};
      codeStates['a']  = a374af,
      codeStates['seta'] = seta374af,
      codeStates['b']  = bfedf0,
      codeStates['setb'] = setbfedf0,
      codeStates['test']  = testc78ea,
      codeStates['settest'] = settestc78ea,
      codeStates['test2']  = test201527,
      codeStates['settest2'] = settest201527,
      codeStates['response']  = savedData.current,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",
          componentId: "cc8dd4877e2344798536805a363c78ea",
          controlId: "57e0718dc03646dd8984f4b41c2acc89",
          isTable: false,
          from:"ButtonVALITATE",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "valitateacc89") {
        buttonRef.current?.click();
      }
    });
  },[valitateacc89?.refresh])

  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans=[]
    let id=""
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  const handleClick=async()=>{
    if(testc78eaProps?.validation==true && testc78eaProps?.required==true || testc78eaProps?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    let saveCheck=false;
        Object.keys(validate).map((item)=>{
      if(validate[item] == 'invalid'){
        saveCheck=true;
    }})
    if (saveCheck) {   
      toast('Please verify the data', 'danger');
      return
    }
    try{  
      await delay(1000);
      await handleCustomCode();
    }catch (err: any) {
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
  }


 if (valitateacc89?.isHidden) {
    return <></>
  }
 
  return (
    <div 
      style={{gridColumn: `9 / 11`,gridRow: `43 / 53`, gap:``, height: `100%`, overflow: 'auto'}} >
        <Button 
          ref={buttonRef}
          className="w-full "
          onClick={handleClick}
          view='action'
          size='s'           
          disabled= {valitateacc89?.isDisabled ? true : false}
          pin='circle-circle'
        >
              {keyset("VALITATE")}
        </Button>
      </div>
    
  )
}

export default ButtonVALITATE

