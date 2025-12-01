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

const TreeViewertree = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
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
  const handleMapperDetails=async()=>{
    try{
      let code:any;
      const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{
        key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",  componentId:"031d0e3035854fe3a901790199a62373",
        controlId:"b9b23f12200f4623ba792cf7800b599a",isTable:false,
        accessProfile:accessProfile,from:"TreeViewertree"},{
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
      setgdocview62373({...gdocview62373, tree:te_refreshData?.data?.dataset?.data || []})
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
  }

  if (treeb599a?.isHidden) {
    return <></>
  }  return (
    <div 
      style={{gridColumn: `8 / 12`,gridRow: `56 / 137`, gap:``, height: `100%`, overflow: 'auto'}} >  
      <div className='flex overflow-auto'>
        <TaiTreeViewer mainData={gdocview62373?.tree} data={gdocview62373?.tree}  handleClick={handleClick} isEditable={false} path={''} setData={setgdocview62373}/>
      </div>
    </div>
  );
}

export default TreeViewertree

