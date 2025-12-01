'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import Grouptest  from "../Grouptest/Grouptest";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import TextToSpeechOutputtexttospeech  from "./TextToSpeechOutputtexttospeech";
import PinInputpininput  from "./PinInputpininput";
import Progressprogress  from "./Progressprogress";
import TextInputtextinput  from "./TextInputtextinput";
import Buttonbutton  from "./Buttonbutton";
import TextAreatextarea  from "./TextAreatextarea";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Groupform = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
  const {dfd_singlesavedfd_v1Props, setdfd_singlesavedfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "texttospeech",
      "pininput",
      "progress",
      "textinput",
      "button",
      "textarea"
    ],
    "allowedGroups": [
      "canvas",
      "form",
      "test"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",componentId:"60f153d45f1449edbac49a52bca7f6ed",from:"GroupForm",accessProfile:accessProfile},{
    headers: {
      Authorization: `Bearer ${token}`
    }})
  code = orchestrationData?.data?.code;
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("texttospeech")){
      settexttospeechb1320({...texttospeechb1320,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("pininput")){
      setpininput34dca({...pininput34dca,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("progress")){
      setprogress5c175({...progress5c175,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("textinput")){
      settextinput928da({...textinput928da,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("button")){
      setbutton19225({...button19225,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("textarea")){
      settextarea6ea3b({...textarea6ea3b,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("test")){
      settest2545d({...test2545d,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form7f6ed,
      codeStates['setform'] = setform7f6ed,
      codeStates['test']  = test2545d,
      codeStates['settest'] = settest2545d,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const form7f6edRef = useRef<any>(null);
  const handleClearSearch = () => {
    form7f6edRef.current?.setSearchParams();
    form7f6edRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(form7f6ed) && Object.keys(form7f6ed)?.length>0)
      {
        setform7f6ed({})
      }
    }else 
      prevRefreshRef.current= true
  }, [form7f6edProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 12',
        gridRow: '16 / 236',
        gridAutoRows: '4px',
        columnGap: '0px',
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        backgroundColor:'',
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className=" rounded-md shadow-md"
    >
        {allowedComponent.includes("test")  &&<Grouptest  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        {allowedControls.includes("texttospeech") ?<TextToSpeechOutputtexttospeech   /* b1320 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("pininput") ?<PinInputpininput   /* 34dca */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("progress")?<Progressprogress  /* 5c175 */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* 928da */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("button")  ?<Buttonbutton lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {allowedControls.includes("textarea") ?<TextAreatextarea   /* 6ea3b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
    </div>
 )
}

export default Groupform
