'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import {Text} from "@/components/Text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import DocViewer from "@/components/DocumentViewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from "@/app/utils/codeExecution";
import imageNotFound from '@/app/assets/imageNotFound.png';

const DocumentViewerdocview = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [allCode,setAllCode]=useState<any>("");
  let customCode:any;
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,
      customCode = codeExecution(code,codeStates);
    }
  }

   const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
          componentId: "031d0e3035854fe3a901790199a62373",
          controlId: "49148619f89a4c57948101e2ab1f16e3",
          isTable: false,
          from:"Buttondocview",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
    }catch(err){
        console.log(err);
    }
  }
  useEffect(()=>{
    handleMapper();
  },[])
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [otherFileFormat, setOtherFileFormat] = useState(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
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
  const baseUrl = process.env.NEXT_PUBLIC_FTP_OUTPUT_HOST;
  const fetchData = async () => {
    let url: string | null = null
    if (!gdocview62373?.docview) {
      setFileUrl(null);
      return;
    }
    try {
      setLoading(true);
      let downloadFileBody :any =  { id: gdocview62373?.docview,context:"docview",enableEncryption:true };
      if (encryptionFlagCont) {
          downloadFileBody["dpdKey"] = encryptionDpd;
          downloadFileBody["method"] = encryptionMethod;
      } 
      if(downloadFileBody?.id?.startsWith(baseUrl) ){
        const response = await AxiosService.post(
          '/UF/getDFS',downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        const blob = new Blob([response.data], {
          type: response.headers['content-type']
        })
        url = window.URL.createObjectURL(blob)
      }else{
        const response = await AxiosService.post(
          'UF/downloadFile',
          downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )
        
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        url = URL.createObjectURL(blob);
      }
      setFileUrl(url);
    } catch (err) {
      setFileUrl(null);
    } finally {
      setLoading(false);
    }
    handleCustomCode()
  }

  useEffect(() => {
    fetchData();
  }, [gdocview62373?.docview])
  
  if (docviewf16e3?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `2 / 7`,gridRow: `54 / 137`, gap:``}}>
        Loading...
      </div>
    )
  }

  if (!fileUrl)
  return (
    <div
      className=""
      style={{ gridColumn: `2 / 7`, gridRow: `54 / 137`, gap:`` }}
    >
    <div className="items-center justify-center text-center bg-gray-50 rounded-xl border border-red-500 shadow-sm p-2">
      <Text variant="body-1" className="text-lg font-semibold text-gray-700">No Document Found</Text>
      <p className="text-sm text-gray-500">
        The attachment or document you are looking for is unavailable or not uploaded yet.
      </p>
    </div>
    </div>
  );

  return (
    <div 
      style={{gridColumn: `2 / 7`,gridRow: `54 / 137`, gap:``, height: `100%`, overflow: 'auto'}} >  
      <DocViewer 
        url={fileUrl}
        queryParams="HL=NL"
        viewer="url"
        viewerUrl={""}
        googleCheckInterval={500}
        googleMaxChecks={5}
        overrideLocalhost="null" 
        googleCheckContentLoaded={true}
        className="w-full h-full " 
      />
    </div>
  );
}

export default DocumentViewerdocview
