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
import { Tooltip } from '@/components/Tooltip';


const TextInputtextinput = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'textinput',type:"text"})
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
  

  // Validation  
    const [error, setError] = useState<string>('');
      /// vvv
      /// vvv
      /// vvv
      /// vvv
  schemaArray = [] ;
  const handleChange = async(e: any) => {
    setError('')
    setValidate((pre:any)=>({...pre,textinput:undefined}))
    if(dynamicStateandType.type=="number"){
    setform7f6ed((prev: any) => ({ ...prev, textinput: +e.target.value }))
    }
    else{
    setform7f6ed((prev: any) => ({ ...prev, textinput: e.target.value }))
    }
  }
  const handleBlur=async () => {
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form7f6ed,
      codeStates['setform'] = setform7f6ed,
      codeStates['test']  = test2545d,
      codeStates['settest'] = settest2545d,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",
          componentId: "60f153d45f1449edbac49a52bca7f6ed",
          controlId: "145e8a0f4e8f43b6a596b85e6c9928da",
          isTable: false,
          from:"TextInputtextinput",
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
        let type:any={name:'textinput',type:'text'}
        type={
          name:'textinput',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textinput.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textinput.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textinput.type
        }
        setDynamicStateandType(type)
       
      }
      if(Array.isArray(orchestrationData?.data?.dstData))
      {
        return
      }else{
      //  if(Object.keys(orchestrationData?.data?.dstData).length>0) 
       // setform7f6ed((pre:any)=>({...pre,textinput:orchestrationData?.data?.dstData}))
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

  if (textinput928da?.isHidden) {
    return <></>
  }
  return (   
    <div 
className="flex flex-col-reverse "      style={{gridColumn: `2 / 4`,gridRow: `71 / 101`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Text variant="body-2">{keyset("textinput")}</Text>
      <Tooltip title="textinput" placement="bottom-end">
        <div>
        <div>
          <Text className="pb-2">{keyset("textinput")}</Text>
          {isRequredData && <span style={{ color: 'red' }}>*</span>}
        </div>
      <TextInput
        require={isRequredData}
        className=""
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={form7f6ed?.textinput||""}
         disabled= {textinput928da?.isDisabled ? true : false}
        leftContent={"textinput"}      
        rightContent={"textinput"}      
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly= {textinput928da?.isDisabled ? true : false}
        size='m'      
        view='normal'
        validationState={validate?.textinput ? "invalid" : undefined}
        errorMessage={error}
      />
      </div>
      </Tooltip>
    </div> 
  )
}

export default TextInputtextinput
