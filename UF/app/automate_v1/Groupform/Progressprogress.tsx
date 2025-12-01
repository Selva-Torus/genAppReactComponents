





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
import { Tooltip } from '@/components/Tooltip';

const Progressprogress = ({encryptionFlagCompData}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
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
          controlId: "f8222308981d47d289bd1ba847f5c175",
          isTable: false,
          accessProfile:accessProfile,
          from:"progressprogress"
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
      codeStates['form']  = form7f6ed,
      codeStates['setform'] = setform7f6ed,
      codeStates['test']  = test2545d,
      codeStates['settest'] = settest2545d,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[progress5c175?.refresh])

  if (progress5c175?.isHidden) {
    return <></>
  }

return (
  <div 
className="flex flex-row-reverse  "    style={{gridColumn: `8 / 10`,gridRow: `42 / 64`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Text>progress</Text>
    <Tooltip title="progress" placement="bottom-start">          
    <Progress 
      className="w-full "
        size = {'s'}
        theme = {'success'}
        text = {'sample_text'}
        value = {10}
    />
  </Tooltip>
  </div>
  )
}

export default Progressprogress
