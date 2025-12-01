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


const TextInputage = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:userDFD:AFVK:v1|65e4b9fc4c24445f894db11440ecf95e|properties.age"
      ],
      "targetKey": "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1|3e7270b3f4fb4d0aaf31e1c67a5902ca|efe8f1d8373d472e80c6d7306949880e"
    }
  ],
  "schemaData": {
    "type": "string"
  }
}
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'age',type:"text"})
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
  const {form902ca, setform902ca}= useContext(TotalContext) as TotalContextProps;
  const {form902caProps, setform902caProps}= useContext(TotalContext) as TotalContextProps;
  const {namee1df1, setnamee1df1}= useContext(TotalContext) as TotalContextProps;
  const {age9880e, setage9880e}= useContext(TotalContext) as TotalContextProps;
  const {pivot575fb, setpivot575fb}= useContext(TotalContext) as TotalContextProps;
  const {save5c903, setsave5c903}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28Props, sethhhhh0ad28Props}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415Props, setgtabsa4415Props}= useContext(TotalContext) as TotalContextProps;
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
    setValidate((pre:any)=>({...pre,age:undefined}))
    if(dynamicStateandType.type=="number"){
    setform902ca((prev: any) => ({ ...prev, age: +e.target.value }))
    }
    else{
    setform902ca((prev: any) => ({ ...prev, age: e.target.value }))
    }
  }
  const handleBlur=async () => {
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form902ca,
      codeStates['setform'] = setform902ca,
      codeStates['hhhhh']  = hhhhh0ad28,
      codeStates['sethhhhh'] = sethhhhh0ad28,
      codeStates['gtabs']  = gtabsa4415,
      codeStates['setgtabs'] = setgtabsa4415,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
          componentId: "3e7270b3f4fb4d0aaf31e1c67a5902ca",
          controlId: "efe8f1d8373d472e80c6d7306949880e",
          isTable: false,
          from:"TextInputage",
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
        let type:any={name:'age',type:'text'}
        type={
          name:'age',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.age.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.age.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.age.type
        }
        setDynamicStateandType(type)
       
      }
      if(Array.isArray(orchestrationData?.data?.dstData))
      {
        return
      }else{
      //  if(Object.keys(orchestrationData?.data?.dstData).length>0) 
       // setform902ca((pre:any)=>({...pre,age:orchestrationData?.data?.dstData}))
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

  if (age9880e?.isHidden) {
    return <></>
  }
  return (   
    <div 
      style={{gridColumn: `8 / 10`,gridRow: `14 / 23`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("age")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={form902ca?.age||""}
         disabled= {age9880e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly= {age9880e?.isDisabled ? true : false}
        size='m'      
        view='normal'
        validationState={validate?.age ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputage
