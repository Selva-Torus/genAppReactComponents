'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus';
import RadioButton  from "./RadioButton";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Group = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
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
      "radiobutton"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "User": {
    "allowedControls": [
      "radiobutton"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template 3": {
    "allowedControls": [
      "radiobutton"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "group"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template 4": {
    "allowedControls": [],
    "allowedGroups": [],
    "blockedControls": [
      "radiobutton"
    ],
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
  const {aaf24, setaaf24}= useContext(TotalContext) as TotalContextProps;
  const {aaf24Props, setaaf24Props}= useContext(TotalContext) as TotalContextProps;
  const {bc87d, setbc87d}= useContext(TotalContext) as TotalContextProps;
  const {bc87dProps, setbc87dProps}= useContext(TotalContext) as TotalContextProps;
  const {02b51, set02b51}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:oprmatrix:AFK:oprmatrixUF:AFVK:v1",componentId:"db0d030286b445f4842fdfc798cbc87d",from:"Group",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("")){
      set02b51({...02b51,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['']  = aaf24,
      codeStates['set'] = setaaf24,
      codeStates['']  = bc87d,
      codeStates['set'] = setbc87d,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const bc87dRef = useRef<any>(null);
  const handleClearSearch = () => {
    bc87dRef.current?.setSearchParams();
    bc87dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(bc87d) && Object.keys(bc87d)?.length>0)
      {
        setbc87d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [bc87dProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '5 / 7',
        gridRow: '80 / 90',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
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
      className=" rounded-md "
    >
        {allowedControls.includes("")?<RadioButton  /* 02b51 */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
    </div>
 )
}

export default Group
