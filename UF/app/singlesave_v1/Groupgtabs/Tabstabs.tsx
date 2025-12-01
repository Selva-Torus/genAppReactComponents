
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import axios from 'axios';
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import i18n from '@/app/components/i18n';
import { AxiosService } from '@/app/components/axiosService';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { Tabs } from '@/components/Tabs';

import Pageforcopyformdata_v1 from '@/app/forcopyformdata_v1/forcopyformdata_v1page';
import Pagetreeview_v1 from '@/app/treeview_v1/treeview_v1page';

const Tabstabs = ({encryptionFlagCompData}:any) => {
  const token:string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const prevRefreshRef = useRef(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);
  const [allCode,setAllCode]=useState<any>("");
  const [selected,setSelected]=useState<any>("first");
  const routes = useRouter();
  let code:any= "";
 /////////////
   //another screen
  const {form902ca, setform902ca}= useContext(TotalContext) as TotalContextProps;
  const {form902caProps, setform902caProps}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28Props, sethhhhh0ad28Props}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415Props, setgtabsa4415Props}= useContext(TotalContext) as TotalContextProps;
  const {gg24162, setgg24162}= useContext(TotalContext) as TotalContextProps;
  const {tabsa2125, settabsa2125}= useContext(TotalContext) as TotalContextProps;
  const {forcopyformdata_v1Props, setforcopyformdata_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {treeview_v1Props, settreeview_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  let ScreenItems:any=[
    {
      id: "forcopyformdata_v1",
      title: "forcopyformdata_v1",
      disabled: false,
      className: "!justify-center"
    },
    {
      id: "treeview_v1",
      title: "treeview_v1",
      disabled: false,
      className: "!justify-center"
    },
  ]
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
          componentId: "7ecafe8792ef4357b836de95d64a4415",
          controlId: "45e829f24697428dbbb98924746a2125",
          isTable: false,
          accessProfile:accessProfile,
          from:"tabstabs"
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
  }

  useEffect(()=>{
    handleMapperValue()
  },[tabsa2125?.refresh])

  useEffect(()=>{
    setgtabsa4415((pre:any)=>({...pre,tabs:""}));
  },[tabsa2125?.refresh])

  const handleCode=async () => {
    code = allCode
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger');
      //return;
    }  else if (code != '') {
      let codeStates: any = {};
    codeStates['form']  = form902ca,
    codeStates['setform'] = setform902ca,
    codeStates['hhhhh']  = hhhhh0ad28,
    codeStates['sethhhhh'] = sethhhhh0ad28,
    codeStates['gtabs']  = gtabsa4415,
    codeStates['setgtabs'] = setgtabsa4415,
    codeExecution(code,codeStates);
    }
  }


  const handleSelect=async(e:any)=>{
    // show as profile code
        if(e?.toLowerCase()=='forcopyformdata_v1'){
          let filterProps2:any =  [
  {
    "key": "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedescription:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "7f9735f870b042ad83a850e40ac0a387",
        "object": {
          "properties.id": ""
        }
      }
    ]
  }
];
          let filterData2 = await getFilterProps(filterProps2,gtabsa4415);
          setforcopyformdata_v1Props([...filterData2 ]);
        }
    // show as profile code
        if(e?.toLowerCase()=='treeview_v1'){
          let filterProps4:any =  [];
          let filterData4 = await getFilterProps(filterProps4,gtabsa4415);
          settreeview_v1Props([...filterData4 ]);
        }
    setSelected(e);
    }
    function handleConfirmSelect(e:any){
    }

    if (tabsa2125?.isHidden) {
      return <></>
    }

  return (
    <div 
       style={{gridColumn: `2 / 12`,gridRow: `30 / 104`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Tabs
        className=""
        onChange={(e)=>handleSelect(e)}
        items={ScreenItems}
      />
      {selected=="forcopyformdata_v1"? <Pageforcopyformdata_v1/> :selected=="treeview_v1"? <Pagetreeview_v1/> :null}
    </div>
  )
}

export default  Tabstabs
