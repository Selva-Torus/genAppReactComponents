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
 

const ButtonparentSave = ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
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


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: any = {};
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,
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
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
          componentId: "0435d19851c747a18437b02e18403415",
          controlId: "3463e163b2244813909c1b176bf72680",
          isTable: false,
          from:"ButtonparentSave",
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
      if (id === "parentsave72680") {
        buttonRef.current?.click();
      }
    });
  },[parentsave72680?.refresh])

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

  async function handleSave2680_1_1_1(){
    try{
      let mainData:any=structuredClone(form03415);
      let uf_initiatePf:any;
      let te_eventEmitterBody:te_eventEmitterDto={
        dpdKey: '',
        method: '',
        event: '',
        sourceId: '',
        key: '',
        data: {},
        lock: {}
      }
      let primaryKey:any;
      let tagetKey:any="CK:CT293:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:parentchildpf:AFVK:v1|bf46d428d42e44648fedb3f316100993"
      let uf_getPFDetails:any={
        key: "CK:CT293:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:parentchildpf:AFVK:v1|bf46d428d42e44648fedb3f316100993"
      };
      let uf_ifo:any;
      let lockedKeysLength:number;
      let eventProperty = {
  "id": "3463e163b2244813909c1b176bf72680",
  "type": "button",
  "name": "parentSave",
  "sequence": 1,
  "children": [
    {
      "id": "3463e163b2244813909c1b176bf72680.1.1",
      "type": "eventNode",
      "name": "onClick",
      "sequence": "1.1",
      "children": [
        {
          "id": "3463e163b2244813909c1b176bf72680.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "saveHandler",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "3463e163b2244813909c1b176bf72680.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [],
              "hlr": {
                "params": [
                  {
                    "name": "parentTable",
                    "_type": "string",
                    "selectionList": [],
                    "value": "user",
                    "enabled": true
                  },
                  {
                    "name": "primaryKey",
                    "_type": "string",
                    "selectionList": [],
                    "value": "id",
                    "enabled": true
                  },
                  {
                    "name": "setValue",
                    "_type": "array",
                    "items": [
                      {
                        "source": "",
                        "target": ""
                      }
                    ],
                    "value": "",
                    "enabled": true
                  }
                ]
              }
            }
          ],
          "hlr": {
            "params": [
              {
                "name": "primaryKey",
                "_type": "string",
                "selectionList": [],
                "value": "",
                "enabled": true
              },
              {
                "name": "relationScope",
                "_type": "select",
                "selectionList": [
                  "PARENT_ONLY",
                  "PARENT_AND_CHILDREN",
                  "PARENT_AND_ALL_DESCENDANTS"
                ],
                "value": "",
                "enabled": true
              },
              {
                "name": "needClearValue",
                "_type": "boolean",
                "selectionList": [],
                "value": "",
                "enabled": true
              }
            ]
          },
          "targetKey": [
            "CK:CT293:FNGK:AF:FNK:PF-PFD:CATK:AG001:AFGK:A001:AFK:parentchildpf:AFVK:v1|bf46d428d42e44648fedb3f316100993"
          ]
        }
      ]
    }
  ]
};
      let eventDetails: any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId:string = "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1";
      sourceId+= "|"+"0435d19851c747a18437b02e18403415";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath="CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1"+"|"+"0435d19851c747a18437b02e18403415"+"|"+eventProperty.id
      pathIds.map((ele:any,id:number)=>{
        if(id!=pathIds.length-1)
        {
          sourceIdNewPath=sourceIdNewPath+"|"+ele
        }
      })
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'saveHandler'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceIdNewPath
            };
          }
        } else if (
          eventDetailsArray[k].type === 'handlerNode' &&
          eventDetailsArray[k].name === 'eventEmitter'
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key:tagetKey,
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              updateColumns: eventDetailsArray[k]?.updateColumns,
              sourceId:sourceIdNewPath
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              updateColumns: eventDetailsArray[k]?.updateColumns,
              sourceId:sourceIdNewPath
            };
          }
        }
      }
    
      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
          key:uf_getPFDetails.key,
          sourceId:sourceIdNewPath
        };
        if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd;
          uf_initiatePfBody["method"] = encryptionMethod;
        }
            uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
              if(uf_initiatePf?.data?.error == true){
                toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                return
              }
      
      } else {
        throw 'Please check PF'
      }

  // saveHandler


    let te_save:any;
    let te_saveBody:te_eventEmitterDto ={
      ...uf_initiatePf?.data?.nodeProperty
    }
    let eventData:any = {trs_status:uf_initiatePf?.data?.eventProperty?.source?.status,
      created_by:createdBy,
      modified_by:createdBy
    }
    let reworkedObject:any=nullFilter(form03415);
    let reworkKeys:any=[];
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof form03415[item]=='object' && Array.isArray( form03415[item]) &&  form03415[item].length && typeof form03415[item][0] !="string" ){
          if( form03415[item].length>0 && !Object.keys(form03415[item][0]).includes('_isSelected_'))
              reworkKeys.push(item);
        }
      })

      if(reworkKeys.length)
      {
        for(let i=0;i<reworkKeys.length;i++){
          let fileBody:any = form03415[reworkKeys[i]].map((item:any) => item?.file)
          const formData = new FormData();
          fileBody.forEach((file:File) => {
            formData.append("file", file);
          });
          formData.append('context', reworkKeys[i]);
          formData.append("enableEncryption", fileBody[0]?.enableEncryption);
          if (encryptionFlagCont) {
            formData.append("dpdKey" ,encryptionDpd);
            formData.append("method" ,encryptionMethod);
          } 
          if (fileBody[0]?.DbType == 'DB') {
          const res=await AxiosService.post( "/UF/upload",formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                filename: reworkedObject[reworkKeys[i]]?.name
                  ? reworkedObject[reworkKeys[i]]?.name.replace(
                      /\.[^/.]+$/,
                      ''
                    )
                  : ''
              }
            }
          )
          reworkedObject[reworkKeys[i]] = res.data.file.fileId
        } else if (fileBody[0]?.DbType == 'DFS') {

            const basePath = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
            const bucketFolderame = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
            const data = new FormData();
            data.append('file', fileBody[0]);
            data.append('bucketFolderame', bucketFolderame.toLowerCase());
            data.append('folderPath', basePath);
            data.append('enableEncryption', fileBody[0]?.enableEncryption);

            const res = await AxiosService.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
              data,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  filename: fileBody[0]?.name
                    ? fileBody[0].name.replace(/\.[^/.]+$/, '')
                    : ''
                }
              }
            )

            console.log('Upload response:', res.data)
            reworkedObject[reworkKeys[i]] = res.data.imageUrl
          }
        }
      }
      ///////  for pivottable data preparation
      Object.keys(reworkedObject).map((item:any)=>{
        if(typeof form03415[item]=='object')
        {
          if( form03415[item].length>0 &&Object.keys(form03415[item][0]).includes('_isSelected_'))
          {
            reworkedObject[item]=reworkedObject[item].filter((data:any)=>data?._isSelected_== true)
            for(let i=0;i<reworkedObject[item].length;i++)
            {
              reworkedObject[item][i] = nullFilter(reworkedObject[item][i])
              delete reworkedObject[item][i]._isSelected_
            }

          }
           
        }
      })

      if ("childTables" in form03415) {
        te_saveBody.childTables = form03415.childTables
      }  

      if (uf_getPFDetails.key != undefined) {
        let formData:any={};
        let ifoResponse:any=[];
        if(Array.isArray(form03415))
        {
          formData=lockedData?.data || {};
          for( const dataList of formData )
          {
            
            const uf_ifoBody:uf_ifoDto={
              formData:dataList,
              key:uf_getPFDetails.key,
              groupId:"0435d19851c747a18437b02e18403415",
              controlId:"3463e163b2244813909c1b176bf72680"
            };
            if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
            uf_ifo = await AxiosService.post(
            "/UF/ifo",
              uf_ifoBody,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
            
            if(uf_ifo?.data?.error == true){
              toast(uf_ifo?.data?.errorDetails?.message, 'danger');
              return
            }
          }
        } 
        else{
          formData=reworkedObject
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"0435d19851c747a18437b02e18403415",
            controlId:"3463e163b2244813909c1b176bf72680"
          };
          if (encryptionFlagCont) {
            uf_ifoBody["dpdKey"] = encryptionDpd;
            uf_ifoBody["method"] = encryptionMethod;
          } 
          uf_ifo = await AxiosService.post(
          "/UF/ifo",
            uf_ifoBody,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          
          if(uf_ifo?.data?.error == true){
            toast(uf_ifo?.data?.errorDetails?.message, 'danger');
            return
          }
            formData={...uf_ifo?.data};
            reworkedObject=formData;
        }
      }
        te_saveBody.data = {...nullFilter(reworkedObject),...eventData};
        te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status;
        te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId;
        if(mainData?.upId)
        {
          te_saveBody['upId']= mainData.upId
        }
        te_saveBody.key= te_saveBody?.key?.slice(0, te_saveBody?.key?.lastIndexOf(':')) + ':';
      
      
      primaryKey = uf_getPFDetails.primaryKey;
        if (encryptionFlagCont) {
            te_saveBody["dpdKey"] = encryptionDpd;
            te_saveBody["method"] = encryptionMethod;
          } 
          te_save = await AxiosService.post("/te/save",te_saveBody,{
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
             },
           }
         )
    ///////////////////////
    // copyFormData
    if(te_save?.data?.insertedData){
      let temp:any={};
      Object.keys(te_save?.data?.insertedData)?.map((obj:any)=>{
        if (Array.isArray(te_save?.data?.insertedData[obj])) {
        const items = te_save.data.insertedData[obj];     
        if (items.length === 1) {
        // only one record
        const item = items[0];
        temp["id"] = item.id;
      } else if (items.length > 1) {
        toast('Trying to save more than one data', 'error');
      } else {
        toast('No data found for this key', 'warning');
      }
      }else{
        if(te_save?.data?.insertedData[obj]["id"])
          temp["id"]=te_save?.data?.insertedData[obj]["id"];
      }
      })
      temp['upId']=te_save?.data?.upId||"";
      setform03415({...form03415,...temp});
      savedData.current=te_save?.data
    }
    if(te_save?.data?.result){
      let temp:any={};
      Object.keys(mainData).map((changedCols:any)=>{
        temp[changedCols]=te_save?.data?.result[changedCols];
      })
      temp["id"]=te_save?.data?.result["id"];
      setform03415(temp);
      savedData.current=te_save?.data?.insertedData
    }
    if(te_save?.data?.data){
      setform03415(te_save?.data?.data);
      savedData.current=te_save?.data?.data
    }
    }
    catch(err:any)
    {
      savedData.current = {};
      if( typeof err =='string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.message, 'danger');

      return
    }
  }
  const handleClick=async()=>{
    if(form03415Props?.validation==true && form03415Props?.required==true || form03415Props?.required==true)
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
      await handleSave2680_1_1_1();
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


 if (parentsave72680?.isHidden) {
    return <></>
  }
 
  return (
    <div 
      style={{gridColumn: `9 / 11`,gridRow: `35 / 45`, gap:``, height: `100%`, overflow: 'auto'}} >
        <Button 
          ref={buttonRef}
          className="w-full "
          onClick={handleClick}
          view='outlined-warning'
          size='s'           
          disabled= {parentsave72680?.isDisabled ? true : false}
          pin='circle-circle'
        >
              {keyset("parentSave")}
        </Button>
      </div>
    
  )
}

export default ButtonparentSave

