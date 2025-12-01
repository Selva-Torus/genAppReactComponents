'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";

import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import imageNotFound from '@/app/assets/imageNotFound.png';
import TaiTreeViewer from "@/components/TreeViewer";

const TreeViewertreedata = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState<string>('');
  const [documentType, setDocumentType] = useState('');
  const [data, setData] = React.useState<any>("");
  const [otherFileFormat, setOtherFileFormat] = useState(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
 /////////////
   //another screen
  const {c2e6b8, setc2e6b8}= useContext(TotalContext) as TotalContextProps;
  const {c2e6b8Props, setc2e6b8Props}= useContext(TotalContext) as TotalContextProps;
  const {valuec9aa8, setvaluec9aa8}= useContext(TotalContext) as TotalContextProps;
  const {treedata5518b, settreedata5518b}= useContext(TotalContext) as TotalContextProps;
  const {bind9f0e3, setbind9f0e3}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleMapperDetails=async()=>{
    try{
      let code:any;
      const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{
        key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:treeview:AFVK:v1",  componentId:"c6651d604e574e4f8242371bab12e6b8",
        controlId:"422fa9310eaa49048ddbb8ba6555518b",isTable:false,
        accessProfile:accessProfile,from:"TreeViewertreedata"},{
        headers: {
          Authorization: `Bearer ${token}`
      }})
      let dfdKey:any=""
      if( orchestrationData?.data?.mapper?.length && orchestrationData?.data?.mapper[0]?.sourceKey?.length){
        dfdKey = orchestrationData?.data?.mapper[0]?.sourceKey[0]?.split("|")?.at(0)
      }
      if(dfdKey=='')
        return
    let te_refreshBody:te_refreshDto={
          key: dfdKey+":",
          refreshFlag: "Y",                
          count:1000,
          page:1
        }
    if (encryptionFlagCont) {
      te_refreshBody["dpdKey"] = encryptionDpd;
      te_refreshBody["method"] = encryptionMethod;
    }
    const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(te_refreshData?.data?.error == true){
      toast(te_refreshData?.data?.errorDetails?.message, 'danger')
    }else{
      setc2e6b8({...c2e6b8, treedata:te_refreshData?.data?.dataset?.data || []})
        }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperDetails()
  },[])

  function handleClick(data:any,path:string){
    data=path.replace('/','')
            // copyFormData
              setc2e6b8({...c2e6b8,value:data})
  }

  async function handleConfirmOnClick(){
    try{
    }catch(err){
      toast(err, 'danger');
    }
  } 
  async function handleConfirmOnCancel(){
     try{
    }catch(err){
      toast(err, 'danger');
    }
  }
  if (treedata5518b?.isHidden) {
    return <></>
  }  return (
    <div 
      style={{gridColumn: `5 / 12`,gridRow: `25 / 173`, gap:``, height: `100%`, overflow: 'auto'}} >  
      <div className='flex overflow-auto'>
        <TaiTreeViewer mainData={c2e6b8?.treedata} data={c2e6b8?.treedata}  handleClick={handleClick} isEditable={false} path={''} setData={setc2e6b8}/>
      </div>
    </div>
  );
}

export default TreeViewertreedata

