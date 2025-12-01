'use client'




import React, { useState,useContext,useEffect } from 'react'
import { codeExecution } from '@/app/utils/codeExecution';
import { PinInput } from '@/components/PinInput';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Tooltip } from '@/components/Tooltip';
import { useRouter } from 'next/navigation'


const PinInputpininput = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'pininput',type:"text"});
  const toast:any=useInfoMsg(); 
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [allCode,setAllCode]=useState<any>("");
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
          controlId: "d14d8a6a40ef487e8c12689354734dca",
          isTable: false,
          from:"pinInputpininput",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setAllCode(orchestrationData?.data?.code);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[refresh.pininputpininput34dca])

  const handleUpdate = async(data:any) => {
    setform7f6ed((prev: any) => ({ ...prev, pininput: data}))
  }  
  const handleBlur = async(data:any)=>{  
    let code:any= allCode;
    if (code != '') {
    let codeStates: any = {};
    codeStates['form']  = form7f6ed;
    codeStates['setform'] = setform7f6ed;
    codeStates['test']  = test2545d;
    codeStates['settest'] = settest2545d;
    codeExecution(code,codeStates);
    }
  }


if (pininput34dca?.isHidden) {
  return <></>;
}

return (
  <div
className="flex flex-row "    style={{gridColumn: `8 / 10`,gridRow: `12 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Tooltip title="pininput" placement="top-start">
    <div>
    <Text>pininput</Text>
    <PinInput 
      className=""
      value={form7f6ed?.pininput||""}
      onChange={handleUpdate}
      onBlur={handleBlur}      
      size="m"
      length={4 }
      disabled= {pininput34dca?.isDisabled ? true : false}
      placeholder="pininput"
    />
    </div>
    </Tooltip>
  </div>
  )
}

export default PinInputpininput
