'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Tooltip } from '@/components/Tooltip';


const TextAreatextarea = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  let code:any="";
  const prevRefreshRef = useRef(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'textarea',type:"string"})
  const [allCode,setAllCode]=useState<any>("")
  const toast:any=useInfoMsg()
  const routes = useRouter()
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

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",
          componentId: "60f153d45f1449edbac49a52bca7f6ed",
          controlId: "4a60fab7194e4dafb372201d2aa6ea3b",
          isTable: false,
          accessProfile:accessProfile,
          from:"textareatextarea"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData[0]?.schema||[]
        let type:any={name:'textarea',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='textarea')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'textarea',type:'text'}
        type={
          name:'textarea',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textarea.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textarea.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.textarea.type
        }
        setDynamicStateandType(type)
       
      }
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[textarea6ea3b?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setform7f6ed((pre:any)=>({...pre,textarea:""}))
    }else 
      prevRefreshRef.current= true
  },[textarea6ea3b?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode
    if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form7f6ed,
      codeStates['setform'] = setform7f6ed,
      codeStates['test']  = test2545d,
      codeStates['settest'] = settest2545d,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    setform7f6ed((prev: any) => ({ ...prev, textarea: e?.target?.value }))
  }
  const handleFocus=async(e:any)=>{
  }
  if (textarea6ea3b?.isHidden) {
    return <></>
  }
return (
  <div 
      className="flex flex-col  " 
  style={{gridColumn: `7 / 9`,gridRow: `79 / 103`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Tooltip title="textarea" placement="bottom-start">
    <div>
    <Text className="pb-2">textarea</Text>
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {textarea6ea3b?.isDisabled ? true : false}
      minRows = {2}
      maxRows = {5}
      placeholder = {'type here...'}
      size = {'m'}
      pin = {'brick-brick'}
      value = { form7f6ed?.textarea != null && typeof form7f6ed?.textarea =='object' ? Object.keys(form7f6ed?.textarea)?.length ?  JSON.stringify(form7f6ed?.textarea,null ,2):"" : form7f6ed?.textarea||""}
    />
    </div>
    </Tooltip>
  </div>
  )
}

export default TextAreatextarea
