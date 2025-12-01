'use client'
import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { XMLParser } from 'fast-xml-parser'


    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonload = ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  let code:any = "";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const savedData=useRef({})
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast:any=useInfoMsg();
  let dfKey: string | any;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false);
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<any>("");
  const [fileBindFlag, setFileBindFlag] = React.useState(false);
  const [fileBind, setFileBind] = React.useState<any>({
   readFunction:()=>{},
   stateName:{},
   mainControlName:""
  });
    
 /////////////
   //another screen
  const {form902ca, setform902ca}= useContext(TotalContext) as TotalContextProps;
  const {form902caProps, setform902caProps}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28Props, sethhhhh0ad28Props}= useContext(TotalContext) as TotalContextProps;
  const {load83eab, setload83eab}= useContext(TotalContext) as TotalContextProps;
  const {tree5d59a, settree5d59a}= useContext(TotalContext) as TotalContextProps;
  const {textareaf5138, settextareaf5138}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415Props, setgtabsa4415Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form902ca,
      codeStates['setform'] = setform902ca,
      codeStates['hhhhh']  = hhhhh0ad28,
      codeStates['sethhhhh'] = sethhhhh0ad28,
      codeStates['gtabs']  = gtabsa4415,
      codeStates['setgtabs'] = setgtabsa4415,
      codeStates['response']  = savedData.current,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
          componentId: "3dfe0cb9feed411a84b13c09ad70ad28",
          controlId: "9c0b815dd1bd447bb347a8df99583eab",
          isTable: false,
          from:"Buttonload",
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
    eventBus.on("triggerButton", (id:any) => {
      if (id === "load83eab") {
        buttonRef.current?.click();
      }
    });
  },[load83eab?.refresh])

  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans=[]
    let id=""
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  const handleClick=async()=>{
    if(hhhhh0ad28Props?.validation==true && hhhhh0ad28Props?.required==true || hhhhh0ad28Props?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    let saveCheck=false;
        Object.keys(validate).map((item)=>{
      if(validate[item] == 'invalid'){
        saveCheck=true;
    }})
    if (saveCheck) {   
      toast('Please verify the data', 'danger');
      return
    }
    try{  
    // sethhhhh0ad28({ ...hhhhh0ad28, tree:allData });           
    setFileBindFlag(true);
    setFileBind((pre:any)=>({
      ...pre,
      readFunction: sethhhhh0ad28,
      stateName: hhhhh0ad28,
      mainControlName:'tree'
    }))
      await delay(1000);
      await handleCustomCode();
    }catch (err: any) {
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
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


 if (load83eab?.isHidden) {
    return <></>
  }
 
  return (
    <div 
      style={{gridColumn: `1 / 3`,gridRow: `7 / 17`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Modal
        open={fileBindFlag}
        onClose={() => setFileBindFlag(false)}
        className='w-[800px] h-[500px] bg-gray-50 mx-auto rounded-lg shadow-xl p-5'
      >
        <div className='flex h-[30px] w-full justify-end'>
          <button
            className='flex w-[30px] justify-end'
            onClick={() => setFileBindFlag(false)}
          >
            X
          </button>
        </div>
        <FileReaderPage setData={fileBind.readFunction} stateName={fileBind.stateName} mainControlName={fileBind.mainControlName} />
      </Modal>
        <Button 
          ref={buttonRef}
          className="w-full "
          onClick={handleClick}
          view='action'
          size='s'           
          disabled= {load83eab?.isDisabled ? true : false}
          pin='circle-circle'
        >
              {keyset("load")}
        </Button>
      </div>
    
  )
}

export default Buttonload

function FileReaderPage({ setData = () => {},stateName={}, mainControlName=""}: { setData: any,stateName:any,mainControlName:string }) {
  const [fileContent, setFileContent] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [fileType, setFileType] = useState<string>('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    setFileName(file.name)
    setFileType(file.type || file.name.split('.').pop() || '')

    reader.onload = async event => {
      let result = event.target?.result as string
      let formatData: any = {}
      let fileType: string = 'text'

      // Handle JSON
      if (file.name.endsWith('.json')) {
        try {
          const json = JSON.parse(result)
          result = JSON.stringify(json, null, 2)
          formatData = json
          fileType = 'json'
        } catch (err) {
          result = 'Invalid JSON file.'
        }
      }

      // Handle XML
      // else if (file.name.endsWith('.xml')) {
//   const parser = new DOMParser()
//   try {
//     const xmlDoc = parser.parseFromString(result, 'text/xml')
//     const formatted = new XMLSerializer().serializeToString(xmlDoc)
//     result = formatted
//     const xmlText = await file.text()
//     const parser2 = new XMLParser({
//       ignoreAttributes: false,
//       attributeNamePrefix: '@_',
//       allowBooleanAttributes: true,
//       parseAttributeValue: true,
//       trimValues: true
//     })
//     const xml = parser2.parse(xmlText)
//     formatData = xml
//     fileType = 'xml'
//   } catch (err) {
//     result = 'Invalid XML file.'
        //   }
      // }

      setFileContent(result)
      if (fileType == 'text') {
        setData((pre: any) => ({ ...pre, [mainControlName]: result }))
      } else {
        setData((pre: any) => ({ ...pre, [mainControlName]: formatData }))
      }
    }

    reader.readAsText(file)
  }

  return (
      <div className='w-full'>
        <h1 className='mb-6 border-b pb-2 text-2xl font-bold'>
          📄 File Reader (.txt, .json, .xml)
        </h1>
        <input
          type='file'
          accept='.txt, .json, .xml'
          onChange={handleFileChange}
          className='mb-6 block w-full text-sm  file:mr-4 file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-200'
        />
        {fileName && (
          <div className='mt-6 '>
            <h2 className='mb-2 text-lg font-semibold'>📝 File: {fileName}</h2>
            <div className=' w-full h-[270px] overflow-auto rounded-md border border-gray-200 shadow-inner dark:border-gray-700 dark:bg-gray-800'>
              <pre className='whitespace-pre-wrap break-words font-mono text-sm '>
                {fileContent}
              </pre>
            </div>
          </div>
        )}
      </div>
  )
}

