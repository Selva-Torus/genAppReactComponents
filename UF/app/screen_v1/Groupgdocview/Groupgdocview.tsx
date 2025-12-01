'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import Progresscheckp  from "./Progresscheckp";
import Progressprogress  from "./Progressprogress";
import DocumentViewerdocview  from "./DocumentViewerdocview";
import TreeViewertree  from "./TreeViewertree";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Groupgdocview = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
  const {dfd_userdfd_v1Props, setdfd_userdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_usedetailsdfd_v1Props, setdfd_usedetailsdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "checkp",
      "progress",
      "docview",
      "tree"
    ],
    "allowedGroups": [
      "canvas",
      "form",
      "table",
      "gdocview"
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
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",componentId:"031d0e3035854fe3a901790199a62373",from:"GroupGdocview",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("checkp")){
      setcheckpc644a({...checkpc644a,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("progress")){
      setprogress3b6ff({...progress3b6ff,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("docview")){
      setdocviewf16e3({...docviewf16e3,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("tree")){
      settreeb599a({...treeb599a,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const gdocview62373Ref = useRef<any>(null);
  const handleClearSearch = () => {
    gdocview62373Ref.current?.setSearchParams();
    gdocview62373Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(gdocview62373) && Object.keys(gdocview62373)?.length>0)
      {
        setgdocview62373({})
      }
    }else 
      prevRefreshRef.current= true
  }, [gdocview62373Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '2 / 12',
        gridRow: '212 / 360',
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
        {allowedControls.includes("checkp")?<Progresscheckp  /* c644a */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("progress")?<Progressprogress  /* 3b6ff */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("docview") ?<DocumentViewerdocview   /* f16e3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("tree")?<TreeViewertree /* b599a */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
    </div>
 )
}

export default Groupgdocview
