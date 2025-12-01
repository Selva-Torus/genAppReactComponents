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
import Buttonclear  from "./Buttonclear";
import TextInputname  from "./TextInputname";
import TextInputage  from "./TextInputage";
import Buttonshow  from "./Buttonshow";
import ButtonparentSave  from "./ButtonparentSave";
import Documentuploaderdocup  from "./Documentuploaderdocup";
import Dropdownv_data  from "./Dropdownv_data";
import Dropdownr_data  from "./Dropdownr_data";
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
      "clear",
      "name",
      "age",
      "show",
      "parentsave",
      "docup",
      "v_data",
      "r_data"
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
  const {clear835e9, setclear835e9}= useContext(TotalContext) as TotalContextProps;
  const {name973ca, setname973ca}= useContext(TotalContext) as TotalContextProps;
  const {agee3b87, setagee3b87}= useContext(TotalContext) as TotalContextProps;
  const {show7b59f, setshow7b59f}= useContext(TotalContext) as TotalContextProps;
  const {parentsave72680, setparentsave72680}= useContext(TotalContext) as TotalContextProps;
  const {docup8da75, setdocup8da75}= useContext(TotalContext) as TotalContextProps;
  const {v_data16036, setv_data16036}= useContext(TotalContext) as TotalContextProps;
  const {r_data83fce, setr_data83fce}= useContext(TotalContext) as TotalContextProps;
  const {table85363, settable85363}= useContext(TotalContext) as TotalContextProps;
  const {table85363Props, settable85363Props}= useContext(TotalContext) as TotalContextProps;
  const {gdocview62373, setgdocview62373}= useContext(TotalContext) as TotalContextProps;
  const {gdocview62373Props, setgdocview62373Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",componentId:"0435d19851c747a18437b02e18403415",from:"GroupForm",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("clear")){
      setclear835e9({...clear835e9,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("name")){
      setname973ca({...name973ca,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("age")){
      setagee3b87({...agee3b87,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("show")){
      setshow7b59f({...show7b59f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("parentsave")){
      setparentsave72680({...parentsave72680,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("docup")){
      setdocup8da75({...docup8da75,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("v_data")){
      setv_data16036({...v_data16036,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("r_data")){
      setr_data83fce({...r_data83fce,isDisabled:true});
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
  const form03415Ref = useRef<any>(null);
  const handleClearSearch = () => {
    form03415Ref.current?.setSearchParams();
    form03415Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(form03415) && Object.keys(form03415)?.length>0)
      {
        setform03415({})
      }
    }else 
      prevRefreshRef.current= true
  }, [form03415Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '2 / 12',
        gridRow: '6 / 114',
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
        {allowedControls.includes("clear")  ?<Buttonclear lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {allowedControls.includes("name") ?<TextInputname   /* 973ca */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("age") ?<TextInputage   /* e3b87 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("show")  ?<Buttonshow lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {allowedControls.includes("parentsave")  ?<ButtonparentSave lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {allowedControls.includes("docup") ?<Documentuploaderdocup   /* 8da75 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("v_data") ?<Dropdownv_data   /* 16036 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("r_data") ?<Dropdownr_data   /* 83fce */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default Groupform
