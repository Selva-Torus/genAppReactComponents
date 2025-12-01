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
import TextInputname  from "./TextInputname";
import Dropdowncountry  from "./Dropdowncountry";
import Dropdownstate  from "./Dropdownstate";
import Dropdowncity  from "./Dropdowncity";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const GroupA = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
  const {dfd_codedescription_v1Props, setdfd_codedescription_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codedexcriptionv2_v1Props, setdfd_codedexcriptionv2_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    "allowedControls": [],
    "allowedGroups": [
      "canvas",
      "b"
    ],
    "blockedControls": [
      "name",
      "country",
      "state",
      "city"
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
  const {a374af, seta374af}= useContext(TotalContext) as TotalContextProps;
  const {a374afProps, seta374afProps}= useContext(TotalContext) as TotalContextProps;
  const {name4ba6f, setname4ba6f}= useContext(TotalContext) as TotalContextProps;
  const {country97da8, setcountry97da8}= useContext(TotalContext) as TotalContextProps;
  const {state7a4d2, setstate7a4d2}= useContext(TotalContext) as TotalContextProps;
  const {cityfa4f7, setcityfa4f7}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0, setbfedf0}= useContext(TotalContext) as TotalContextProps;
  const {bfedf0Props, setbfedf0Props}= useContext(TotalContext) as TotalContextProps;
  const {testc78ea, settestc78ea}= useContext(TotalContext) as TotalContextProps;
  const {testc78eaProps, settestc78eaProps}= useContext(TotalContext) as TotalContextProps;
  const {test201527, settest201527}= useContext(TotalContext) as TotalContextProps;
  const {test201527Props, settest201527Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",componentId:"1c694586ee234da492b63d3e870374af",from:"GroupA",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("name")){
      setname4ba6f({...name4ba6f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("country")){
      setcountry97da8({...country97da8,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("state")){
      setstate7a4d2({...state7a4d2,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("city")){
      setcityfa4f7({...cityfa4f7,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['a']  = a374af,
      codeStates['seta'] = seta374af,
      codeStates['b']  = bfedf0,
      codeStates['setb'] = setbfedf0,
      codeStates['test']  = testc78ea,
      codeStates['settest'] = settestc78ea,
      codeStates['test2']  = test201527,
      codeStates['settest2'] = settest201527,

    codeExecution(code,codeStates);
    } 
  }

  function handleConfirmOnLoad(){
  }

    const handleOnload=()=>{
      // copyFormData for group
        setbfedf0((prev:any) => ({ ...prev, ...a374af }));
  }
  const handleOnChange=()=>{

  }
  const a374afRef = useRef<any>(null);
  const handleClearSearch = () => {
    a374afRef.current?.setSearchParams();
    a374afRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(a374af) && Object.keys(a374af)?.length>0)
      {
        seta374af({})
      }
    }else 
      prevRefreshRef.current= true
  }, [a374afProps?.refresh])

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    handleOnChange()
  }, [a374af])
  return (
    <div 
      style={{          
        gridColumn: '2 / 12',
        gridRow: '16 / 76',
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
        {allowedControls.includes("name") ?<TextInputname   /* 4ba6f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("country") ?<Dropdowncountry   /* 97da8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("state") ?<Dropdownstate   /* 7a4d2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("city") ?<Dropdowncity   /* fa4f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default GroupA
