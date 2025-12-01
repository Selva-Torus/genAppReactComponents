'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
//////////
import { Modal } from "@/components/Modal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { TextToSpeech } from "@/components/TextToSpeech";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import Pagination from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
////////////
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';


const TextToSpeechOutputtexttospeech = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": []
}
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>(""); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'texttospeech',type:"text"});
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {form7f6ed, setform7f6ed}= useContext(TotalContext) as TotalContextProps;
  const {form7f6edProps, setform7f6edProps}= useContext(TotalContext) as TotalContextProps;
  const {texttospeechb1320, settexttospeechb1320}= useContext(TotalContext) as TotalContextProps;
  const {pininput34dca, setpininput34dca}= useContext(TotalContext) as TotalContextProps;
  const {progress5c175, setprogress5c175}= useContext(TotalContext) as TotalContextProps;
  const {textinput928da, settextinput928da}= useContext(TotalContext) as TotalContextProps;
  const {button19225, setbutton19225}= useContext(TotalContext) as TotalContextProps;
  const {textarea6ea3b, settextarea6ea3b}= useContext(TotalContext) as TotalContextProps;
  const {test2545d, settest2545d}= useContext(TotalContext) as TotalContextProps;
  const {test2545dProps, settest2545dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  

  const handleChange = async(e: any) => {
    await handleBlur();
    if(dynamicStateandType.type=="number"){
    setform7f6ed((prev: any) => ({ ...prev, texttospeech: +e.target.value }))
    }
    else{
    setform7f6ed((prev: any) => ({ ...prev, texttospeech: e.target.value }))
    }
  }
  const handleBlur=async () => {
    let code:any= allCode;
     if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form7f6ed,
      codeStates['setform'] = setform7f6ed,
      codeStates['test']  = test2545d,
      codeStates['settest'] = settest2545d,
    codeExecution(code,codeStates)
    }
  }

  useEffect(()=>{
    handleBlur()
  },[validateRefetch.value])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",
          componentId: "60f153d45f1449edbac49a52bca7f6ed",
          controlId: "ffc71a8d3e034f809e672929cd9b1320",
          isTable: false,
          from:"TextInputtexttospeech",
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
      setAllCode(orchestrationData?.data?.code)
      
      if(orchestrationData?.data?.schemaData){
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'texttospeech',type:'text'}
        type={
          name:'texttospeech',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type
        }
        setDynamicStateandType(type);       
      }
    }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setform7f6ed((pre:any)=>({...pre,texttospeech:""}));
  },[texttospeechb1320?.refresh])

  if (texttospeechb1320?.isHidden) {
    return <></>
  }

  return (   
    <div 
      style={{gridColumn: `2 / 6`,gridRow: `7 / 38`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TextToSpeech
        className=""
        // label={keyset("texttospeech")}
        onChange= {handleChange}
        onBlur={()=>handleBlur()}
        // type={dynamicStateandType.type}
        value={form7f6ed?.texttospeech||""}
        disabled= {texttospeechb1320?.isDisabled ? true : false}
      />
    </div>
        
  )
}

export default TextToSpeechOutputtexttospeech
