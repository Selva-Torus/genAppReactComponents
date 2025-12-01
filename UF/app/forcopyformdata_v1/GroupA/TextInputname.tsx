'use client'




    

     
import React, { useState,useContext,useEffect } from 'react'
import { TorusTextInput } from '@/app/TorusComponents/TextInput';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot';


const TextInputname = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
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
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'name',type:"text"})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
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
  

  // Validation  
    const [error, setError] = useState<string>('');
      /// vvv
      /// vvv
      /// vvv
      /// vvv
  schemaArray = [] ;
  const handleChange = async(e: any) => {
    setError('')
    setValidate((pre:any)=>({...pre,name:undefined}))
    if(dynamicStateandType.type=="number"){
    seta374af((prev: any) => ({ ...prev, name: +e.target.value }))
    }
    else{
    seta374af((prev: any) => ({ ...prev, name: e.target.value }))
    }
  }
  const handleBlur=async () => {
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
      codeStates['a']  = a374af,
      codeStates['seta'] = seta374af,
      codeStates['b']  = bfedf0,
      codeStates['setb'] = setbfedf0,
      codeStates['test']  = testc78ea,
      codeStates['settest'] = settestc78ea,
      codeStates['test2']  = test201527,
      codeStates['settest2'] = settest201527,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",
          componentId: "1c694586ee234da492b63d3e870374af",
          controlId: "1622b127be8f48c4830af24d2584ba6f",
          isTable: false,
          from:"TextInputname",
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
      
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'name',type:'text'}
        type={
          name:'name',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type
        }
        setDynamicStateandType(type)
       
      }
      if(Array.isArray(orchestrationData?.data?.dstData))
      {
        return
      }else{
      //  if(Object.keys(orchestrationData?.data?.dstData).length>0) 
       // seta374af((pre:any)=>({...pre,name:orchestrationData?.data?.dstData}))
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
      handleMapperValue()
      handleBlur()
  },[validateRefetch.value])

  if (name4ba6f?.isHidden) {
    return <></>
  }
  return (   
    <div 
      style={{gridColumn: `2 / 4`,gridRow: `10 / 20`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={a374af?.name||""}
         disabled= {name4ba6f?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly= {name4ba6f?.isDisabled ? true : false}
        size='m'      
        view='normal'
        validationState={validate?.name ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputname
