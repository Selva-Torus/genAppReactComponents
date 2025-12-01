



'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { Progress } from '@/components/Progress';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';

const Progresscheckp = ({encryptionFlagCompData}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
  /////////////
  //another screen
  const {form03415, setform03415}= useContext(TotalContext) as TotalContextProps;  
  const {form03415Props, setform03415Props}= useContext(TotalContext) as TotalContextProps;  
  const {table85363, settable85363}= useContext(TotalContext) as TotalContextProps;  
  const {table85363Props, settable85363Props}= useContext(TotalContext) as TotalContextProps;  
  const {gdocview62373, setgdocview62373}= useContext(TotalContext) as TotalContextProps;  
  const {gdocview62373Props, setgdocview62373Props}= useContext(TotalContext) as TotalContextProps;  
  const {checkpc644a, setcheckpc644a}= useContext(TotalContext) as TotalContextProps;  
  const {progress3b6ff, setprogress3b6ff}= useContext(TotalContext) as TotalContextProps;  
  const {docviewf16e3, setdocviewf16e3}= useContext(TotalContext) as TotalContextProps;  
  const {treeb599a, settreeb599a}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
          componentId: "031d0e3035854fe3a901790199a62373",
          controlId: "919afdc5485f40559b76b82d0e3c644a",
          isTable: false,
          accessProfile:accessProfile,
          from:"progresscheckp"
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
    }catch(err){
      console.log(err)
    }
    handleCustomCode()
  }

  const handleCustomCode=async () => {
    let customCode:any=''
    let code :any = allCode;
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[checkpc644a?.refresh])

  if (checkpc644a?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `2 / 12`,gridRow: `11 / 21`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className="w-full "
        size = {'s'}
        theme = {'success'}
        text = {'sample_text'}
        value = {10}
    />
  </div>
  )
}

export default Progresscheckp
