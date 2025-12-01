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
  const {form902ca, setform902ca}= useContext(TotalContext) as TotalContextProps;
  const {form902caProps, setform902caProps}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28Props, sethhhhh0ad28Props}= useContext(TotalContext) as TotalContextProps;
  const {load83eab, setload83eab}= useContext(TotalContext) as TotalContextProps;
  const {tree5d59a, settree5d59a}= useContext(TotalContext) as TotalContextProps;
  const {textareaf5138, settextareaf5138}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415Props, setgtabsa4415Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
          componentId: "3dfe0cb9feed411a84b13c09ad70ad28",
          controlId: "8183915e2363433d8930992e97bf5138",
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
  },[textareaf5138?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      sethhhhh0ad28((pre:any)=>({...pre,textarea:""}))
    }else 
      prevRefreshRef.current= true
  },[textareaf5138?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode
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
  const handleChange = async(e: any) => {
    sethhhhh0ad28((prev: any) => ({ ...prev, textarea: e?.target?.value }))
  }
  const handleFocus=async(e:any)=>{
  }
  if (textareaf5138?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 3`,gridRow: `30 / 60`, gap:``, height: `100%`, overflow: 'auto'}} >
    <TextArea
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {textareaf5138?.isDisabled ? true : false}
      minRows = {2}
      maxRows = {10}
      placeholder = {'type here...'}
      size = {'m'}
      pin = {'brick-brick'}
      value = { hhhhh0ad28?.textarea != null && typeof hhhhh0ad28?.textarea =='object' ? Object.keys(hhhhh0ad28?.textarea)?.length ?  JSON.stringify(hhhhh0ad28?.textarea,null ,2):"" : hhhhh0ad28?.textarea||""}
    />
  </div>
  )
}

export default TextAreatextarea
