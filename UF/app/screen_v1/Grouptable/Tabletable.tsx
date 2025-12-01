
  
//CustomTable
'use client'
import React, { useState,useContext,useEffect } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import { Icon } from '@/components/Icon';
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
let defaultColumns = [
  {
    "id": "user_id",
    "name": "user_id",
    "meta": {
      "sort": true
    },
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "phone",
    "name": "phone",
    "meta": {
      "sort": true
    },
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "id",
    "name": "id",
    "meta": {
      "sort": true
    },
    "isSearch": false,
    "colourIndicator": []
  }
] ;
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
function generateUniqueCode() {
  const timestamp = new Date().getTime() // Current timestamp in milliseconds
  const randomValue = Math.random().toString(36).substring(2, 8) // Random alphanumeric string of length 6
  return `${timestamp}-${randomValue}`
}

const Tabletable = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData,encryptionFlagCompData }: any) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const schemaData :any = [
  {
    "nodeId": "98e8c6e44d1b448ea1edb7ee1e0de956",
    "nodeName": "apinode",
    "nodeType": "apinode",
    "schema": {
      "description": "Read all the records from the userdetails table",
      "operationId": "userdetailsController_findAll",
      "parameters": [],
      "responses": {
        "200": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "user_id": {
                      "type": "number",
                      "example": "number"
                    },
                    "phone": {
                      "type": "string",
                      "example": "string"
                    },
                    "id": {
                      "type": "number",
                      "example": "number"
                    },
                    "trs_creator_email": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_created_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_created_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_modified_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_modified_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_next_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_process_id": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_access_profile": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_code": {
                      "type": "string",
                      "example": "string"
                    }
                  },
                  "required": [
                    "user_id",
                    "phone",
                    "id",
                    "trs_creator_email",
                    "trs_created_date",
                    "trs_created_by",
                    "trs_modified_date",
                    "trs_modified_by",
                    "trs_status",
                    "trs_next_status",
                    "trs_process_id",
                    "trs_access_profile",
                    "trs_org_grp_code",
                    "trs_org_code",
                    "trs_role_grp_code",
                    "trs_role_code",
                    "trs_ps_grp_code",
                    "trs_ps_code"
                  ]
                }
              }
            }
          }
        }
      },
      "security": [
        {
          "JWT-auth": []
        }
      ],
      "summary": "Read all the records",
      "tags": [
        "ERD API"
      ]
    }
  },
  {
    "nodeId": "fb48f70e814a45528a701647935b4d3c",
    "nodeName": "datasetschemanode",
    "nodeType": "datasetschemanode",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Generated schema for Root",
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "id": {
          "type": "number"
        },
        "trs_creator_email": {
          "type": "string"
        },
        "trs_created_date": {
          "type": "string"
        },
        "trs_created_by": {
          "type": "string"
        },
        "trs_modified_date": {
          "type": "string"
        },
        "trs_modified_by": {
          "type": "string"
        },
        "trs_status": {
          "type": "string"
        },
        "trs_next_status": {
          "type": "string"
        },
        "trs_process_id": {
          "type": "string"
        },
        "trs_access_profile": {
          "type": "string"
        },
        "trs_org_grp_code": {
          "type": "string"
        },
        "trs_org_code": {
          "type": "string"
        },
        "trs_role_grp_code": {
          "type": "string"
        },
        "trs_role_code": {
          "type": "string"
        },
        "trs_ps_grp_code": {
          "type": "string"
        },
        "trs_ps_code": {
          "type": "string"
        }
      },
      "required": [
        "user_id",
        "phone",
        "id",
        "trs_creator_email",
        "trs_created_date",
        "trs_created_by",
        "trs_modified_date",
        "trs_modified_by",
        "trs_status",
        "trs_next_status",
        "trs_process_id",
        "trs_access_profile",
        "trs_org_grp_code",
        "trs_org_code",
        "trs_role_grp_code",
        "trs_role_code",
        "trs_ps_grp_code",
        "trs_ps_code"
      ]
    }
  }
]
  const securityData:any={
  "Template 1": {
    "allowedControls": [
      "user_id",
      "phone",
      "id"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const keyset:any=i18n.keyset("language");
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [allCode,setAllCode]=useState<any>("");
  let getDataPKey:any="";
  let getDataPTable:any="";
  let codeExec:any;
  const toast:any=useInfoMsg();
  const routes = useRouter();
  let isGetFormdata = false;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false);
  const [columns,setColumns]=useState<any>([]);
  const [sumValues,setSumValues]=useState<any>({});
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
 /////////////
   //another screen
  const {form03415, setform03415}= useContext(TotalContext) as TotalContextProps 
  const {form03415Props, setform03415Props}= useContext(TotalContext) as TotalContextProps 
  const {table85363, settable85363}= useContext(TotalContext) as TotalContextProps 
  const {table85363Props, settable85363Props}= useContext(TotalContext) as TotalContextProps 
  const {user_ida2a2a, setuser_ida2a2a}= useContext(TotalContext) as TotalContextProps 
  const {phonebc3ea, setphonebc3ea}= useContext(TotalContext) as TotalContextProps 
  const {id76e97, setid76e97}= useContext(TotalContext) as TotalContextProps 
  const {gdocview62373, setgdocview62373}= useContext(TotalContext) as TotalContextProps 
  const {gdocview62373Props, setgdocview62373Props}= useContext(TotalContext) as TotalContextProps 
  //////////////
  const handleCheckboxChange = (row: { user_id: any }) => {
    const isSelected = selectedRows.some(
      (selectedRow: { user_id: any }) => selectedRow.user_id === row.user_id
    )

    if (isSelected) {
      setSelectedRows((prevSelected: any) =>
        prevSelected.filter(
          (selectedRow: { user_id: any }) => selectedRow.user_id !== row.user_id
        )
      )
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }
  const GetTableDetails = async () => {
    const orchestrationData = await AxiosService.post(
      '/UF/Orchestration',
      {
        key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
        componentId:"e4ff8e0400354a1fa206a4e898185363",
        from :"Pivottable",
        isTable: true,
        accessProfile:accessProfile
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setAllCode(orchestrationData?.data?.code)
  
    if (orchestrationData?.data) {
      if (orchestrationData?.data?.action) {
        // for schema based column and type preparatiuon       
      }
      if(orchestrationData?.data?.schemaData){
        let altertColumns:any=[]
       let allSchemas:any[]=orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties
          defaultColumns.map((defaultRenderItem:any)=>{
            Object.keys(allSchemas).map((schemaItem:any)=>{
              if(defaultRenderItem.id==schemaItem)
              {
                altertColumns.push({
                  ...defaultRenderItem,type:allSchemas[schemaItem].example.toLowerCase()=='string'?"text":allSchemas[schemaItem].example.toLowerCase() == 'integer'?'number':allSchemas[schemaItem].example.toLowerCase()
                })
              }
            })
          })
        if(Array.isArray(orchestrationData?.data?.security) )
        {
          let securityData=orchestrationData?.data?.security
          altertColumns=altertColumns.filter((item:any)=>{
            if(securityData.includes(item?.id))
              return item
          })
        }
        setColumns(altertColumns) 
      }  
    }
  }

  useEffect(()=>{
    GetTableDetails()
  },[table85363?.refresh])

  const handleSaveAll= async ()=>{
    let upId:any = ""
    let parentData: any = nullFilter(primaryTableData.parentData)
    let childData: any = []
    let codeExec:any;
    
    table85363?.map((item:any)=>{
      childData.push(nullFilter(item))
    })
    try{
      let uf_initiatePf:any
      let te_eventEmitterBody:te_eventEmitterDto
      let primaryKey:any
      let uf_getPFDetails:any
      let uf_ifo:any
      let lockedKeysLength:number
      const orchestrationData:any =  await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",  componentId:"e4ff8e0400354a1fa206a4e898185363",isTable:true,accessProfile:accessProfile,from:"pivottable"},{
        headers: {
          Authorization: `Bearer ${token}`  
          },
        }
      )
      let code:any= allCode
      if (code !="" ) {
        let codeStates: any = {}
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,
        codeExec = codeExecution(code,codeStates)
      }
      let eventProperty = orchestrationData?.data?.events?.eventSummary;
      let eventDetails = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId:string = "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1";
      sourceId+= "|"+"e4ff8e0400354a1fa206a4e898185363"
      for (let k = 0; k < eventDetailsArray.length; k++) {
        if (eventDetailsArray[k].type != 'group' && eventDetailsArray[k].type != 'screen')
        sourceId += '|' + eventDetailsArray[k].id
        if (
          eventDetailsArray[k]?.type === 'handlerNode' &&
          eventDetailsArray[k]?.name === 'saveHandler' && 
          eventDetailsArray[k]?.eventContext ==="rise"
        ) {
          if (
            eventDetailsArray[k]?.targetKey &&
            eventDetailsArray[k]?.targetKey.length > 0 
          ) {
            uf_getPFDetails= {
              key: eventDetailsArray[k].targetKey[0],
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceId
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              sourceId:sourceId
            };
          }
        } else if (
          eventDetailsArray[k]?.type === 'handlerNode' &&
          eventDetailsArray[k]?.name === 'updateHandler' && 
          eventDetailsArray[k]?.eventContext ==="rise"
        ) {
          if (
            eventDetailsArray[k].targetKey &&
            eventDetailsArray[k].targetKey.length > 0
          ) {
            uf_getPFDetails= {
              key: eventDetailsArray[k].targetKey[0],
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceId
            };
          } else if (!eventDetailsArray[k].targetKey) {
            uf_getPFDetails= {
              primaryKey: eventDetailsArray[k].primaryKey,
              tableName: eventDetailsArray[k]?.tableName,
              status: eventDetailsArray[k]?.status,
              sourceId:sourceId
            };
          }
        }
      }
      if ( orchestrationData?.error == true) {
        toast(orchestrationData?.errorDetails?.message, 'danger')
        return
      }
      if (uf_getPFDetails.key != undefined) {
        const uf_initiatePfBody:uf_initiatePfDto={
        key:uf_getPFDetails.key,
        sourceId:uf_getPFDetails.sourceId
        }
      if (encryptionFlagCont) {
          uf_initiatePfBody["dpdKey"] = encryptionDpd
          uf_initiatePfBody["method"] = encryptionMethod
      } 
        uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
          { headers: {
          Authorization: `Bearer ${token}`
          }, })
          if(uf_initiatePf?.data?.error == true){
            toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
            return
          }
    
        } else {
        uf_initiatePf= {
          data:{
            nodeProperty:'',
            eventProperty:''
          }
        }
      }

    
    
    
//getFormData
  parentData = nullFilter(form03415)
  upId = form03415?.upId || ""
  parentData = {...parentData,...codeExec}
  getDataPKey='id'
  getDataPTable='user'
  isGetFormdata = true;

    
    
    // saveHandler
 
  let te_saveBody:te_eventEmitterDto ={
    ...uf_initiatePf.data.nodeProperty}
  let eventData:any = {status:uf_initiatePf.data.eventProperty.sourceStatus,
    created_by:createdBy,
    modified_by:createdBy
  }

   if (uf_getPFDetails.key != undefined) {
    //   const uf_ifoBody:uf_ifoDto={
    //     formData:tableData,
    //     key:uf_getPFDetails.key,
    //     groupId:"e4ff8e0400354a1fa206a4e898185363",,
    //     controlId:""e4ff8e0400354a1fa206a4e898185363",
    //   }
    //   uf_ifo = await AxiosService.post(
    //    "/UF/ifo",
    //     uf_ifoBody,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   )
    //   if(uf_ifo?.data?.error == true){
    //     toast(uf_ifo?.data?.errorDetails?.message, 'danger')
    //     return
    //   }
    //   te_saveBody.data = {...uf_ifo?.data,...eventData}
    //   te_saveBody.event = uf_initiatePf.data.eventProperty.sourceStatus
    //   te_saveBody.key= te_saveBody.key.slice(0, te_saveBody.key.lastIndexOf(':')) + ':';
    // }
    // else{
    //   te_saveBody.data = {
    //     parentData,
    //     childData
      }
    //te_saveBody.event = uf_initiatePf.data.eventProperty.sourceStatus
    // }
      let filteredData :any=[];
    childData.map((item:any)=>{
      let temp=item;
      delete temp.user_id;
      filteredData.push(temp)

    })

    te_saveBody.data = filteredData;
      
    te_saveBody.sourceId = uf_initiatePf?.data?.eventProperty?.sourceId
 // te_saveBody.url = process.env.NEXT_PUBLIC_API_BASE_URL+'/'
  te_saveBody.event = uf_initiatePf?.data?.eventProperty?.source?.status
  te_saveBody.upId=upId
  primaryKey = uf_getPFDetails.primaryKey;
  if (encryptionFlagCont) {
      te_saveBody["dpdKey"] = encryptionDpd
      te_saveBody["method"] = encryptionMethod
  } 
  const te_save = await AxiosService.post("/te/save",te_saveBody,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    )


if(te_save?.data?.error == true){
  toast(te_save?.data?.errorDetails?.message, 'danger')
  return
}

if (uf_getPFDetails.key != undefined) {
{/* 
let te_updateBody:te_updateDto ={};
te_updateBody.data = [{status:te_save.data.event,'modified_by':createdBy,process_id:te_save.data.upId,...codeExec}]
te_updateBody.upId = te_save.data.upId
te_updateBody.tableName = getDataPTable
te_updateBody.primaryKey = [form03415?.id]
te_updateBody.url = process.env.NEXT_PUBLIC_API_BASE_URL+'/'
if (encryptionFlagCont) {
  te_updateBody["dpdKey"] = encryptionDpd
  te_updateBody["method"] = encryptionMethod
} 

const te_update:any=await AxiosService.post("/te/update",te_updateBody,{
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

if (te_update && te_update?.status) {
  toast('data updated successfully', 'success')
}

let tempkeys: any = {}
Object.keys(form03415).map((item: any) => {
  tempkeys[item] = ''
})
setform03415(tempkeys)
settable85363([])

if(te_update?.data?.error == true){
  toast(te_update?.data?.errorDetails?.message, 'danger')
  return
}
*/}
}
let keys: any = {}
Object.keys(form03415).map((item: any) => {
  keys[item] = ''
})
setform03415(keys)
  await eventEmitter()

  }catch(err:any){
    if( typeof err =='string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.message, 'danger');
    return
  }
}

  async function eventEmitter(){
        return
    if (Array.isArray(eventEmitterData) || eventEmitterData.length > 0) {
      // Execute all requests in parallel using forEach
    const requests = eventEmitterData.map(async (element:any) => {
      try {
        if (encryptionFlagCont) {
          element["dpdKey"] = encryptionDpd
          element["method"] = encryptionMethod
        } 
        const te_refresh = await AxiosService.post("/te/eventEmitter", element, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (te_refresh?.data?.error === true) {
          toast(te_refresh?.data?.errorDetails?.message, 'danger');
        }
      } catch (error) {
        console.error("Error in eventEmitter:", error);
      }
    });
    await Promise.all(requests);
    }
  }

  async function handleAllSave(){
      await handleSaveAll()
  }

  async function handleConfirmOnSaveAll(){
  } 

  const handleSelectAll = (event: { target: { checked: any } }) => {
    if (event.target.checked) {
      setSelectedRows(table85363) // Select all rows
    } else {
      setSelectedRows([]) // Deselect all rows
    }
  }

  const onRowDataChange = (
    rowIndex: number,
    newData: any,
    type: string,
    colunm?: any
  ) => {
    const updatedData = table85363?.map((item: any) => {
      if (item.user_id === rowIndex) {
        if (type === 'number') {
          if(newData.value.length > 0 && newData.value.startsWith('0')){
            newData.value = newData.value.slice(1);
          } 
          return {
            ...item,
            [newData.name]: +newData.value
          }
        } 
        else if (type == 'date') {
          const selectedDate = new Date(newData)
          const IST_OFFSET = 5.5 * 60 * 60 * 1000
          const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET)
          const isoDate = indiaTime.toISOString()
          return {
            ...item,
            [colunm]: isoDate
          }
        } 
        else {
          return {
            ...item,
            [newData.name]: newData.value
          }
        }
      }
      return item
    })
    settable85363(updatedData)
  }

  const onDelete = (Indx: number) => {
    const updatedData = table85363.filter((item: any) => {
      if (item.user_id != Indx) {
        return item
      }
    })
    settable85363(updatedData)
  } 

  function addRow() {
    let newRow: any = {}
    columns.forEach((item:any) => {
      if (item.id === 'user_id') {
        newRow['user_id'] = generateUniqueCode()
      } else if (item.type === 'number') {
        newRow[item.id] = 0
      } else if (item.type === 'text') {
        newRow[item.id] = '' 
      } else if (item.type === 'date') {
        newRow[item.id] = null
      } else newRow[item.id] = ''
    })
    newRow['id'] = form03415.id
    settable85363([newRow, ...table85363])
  }
  useEffect(()=>{
    if(Array.isArray(table85363)&&table85363.length >= 0)
      someRecords()
  },[table85363])

  function someRecords(){
    let sumableColums:any=[]
    let sumableColumsAndName:any=[]
    columns.map((item:any)=>{
        if(item.type=='number' && 'user_id' != item.id && item.id && item?.isSumable==true)
        {
          sumableColumsAndName.push({id:item.id,name:item?.name})
          sumableColums.push(item.id)
        } 
    })
    let ans:any={}
    table85363?.map((item:any)=>{
        sumableColums.map((cols:any)=>{
            if(ans.hasOwnProperty(cols))
                ans={ ...ans,[cols]:item[cols]+ans[cols]}
            else{
                ans={ ...ans,[cols]:item[cols]}
            }
        })
    })
    sumableColumsAndName.map((item:any)=>{
      if(item?.id==item?.name)
      {
        ans[item?.name] =structuredClone(ans[item.id])
      }else
      {
        ans[item?.name] =structuredClone(ans[item.id])
        delete ans[item.id]
      }
     })
     setSumValues(ans)
  }

  useEffect(() => {
    settable85363([])
  }, [primaryTableData.value])

  if (table85363?.isHidden) {
    return <></>
  }

  return (
    <div className="px-[0.7vw] col-start-1 col-end-13">
            <div className='overflow-x-auto'>
              <div className='flex justify-end p-2'>
                <Button
                  onClick={addRow}
                  size='s'
                  className='flex transform items-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                  <Icon data="FaPlus" size={18} />
                </Button>
              </div>
              <table className='min-w-full rounded-md border border-gray-200 bg-white'>
                <thead>
                  <tr className='border border-gray-200 text-sm leading-normal text-gray-600'>
                    {/* <th className='px-3 py-2 text-left'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        onChange={handleSelectAll}
                      />
                    </th> */}
                    {columns.map(
                      (column: any) =>
                        column?.id != 'user_id' && (
                          <th key={column.id} className='px-3 py-1 text-left'>
                            {keyset(column.name)}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody className='text-sm font-light text-gray-600'>
                  {table85363?.map((row: any) => {
                    const isSelected = selectedRows.some(
                      (selectedRow: { user_id: any }) => selectedRow.user_id === row.user_id
                    )
                    return (
                      <tr
                        key={row.user_id}
                        className={`border-b border-gray-200 ${isSelected ? 'bg-orange-200' : 'hover:bg-gray-100'}`}
                      >
                        {columns.map(
                          (column: any) =>
                            column?.id != 'user_id' && column?.id != primaryTableData.primaryKey && (
                              <td key={column.id} className='px-3 py-1 text-left'>
                                {column.type == 'date' ? (
                                  row[column.id] != null ? (
                                    <DatePicker
                                      size='s'
                                      value={row[column.id]}
                                      onUpdate={event => {
                                        onRowDataChange(
                                          row['user_id'],
                                          event,
                                          column.type,
                                          column.id
                                        )
                                      }}
                                    />
                                  ) : (
                                    <DatePicker
                                      size='s'
                                      readOnly= {table85363?.isDisabled ? true : false}
                                      onUpdate={event => {
                                        onRowDataChange(
                                          row['user_id'],
                                          event,
                                          column.type,
                                          column.id
                                        )
                                      }}
                                    />
                                  )
                                  ) : (
                                  <TextInput
                                    value={row[column.id]}
                                    name={column.id}
                                    type={column.type}
                                    view='clear'
                                    pin='brick-brick'
                                    readOnly= {table85363?.isDisabled ? true : false}
                                    onChange={event => {
                                      onRowDataChange(
                                        row['user_id'],
                                        event.target,
                                        column.type
                                      )
                                    }}
                                  />
                                )} 
                              </td>
                            )
                        )}
                        <td className='px-6 py-3 text-left'>
                          <Button size='s' onClick={() => onDelete(row.user_id)}>
                            <Icon data="FaRegTimesCircle" size={18} />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {table85363?.length == 0 && (
                <div className='flex w-full items-center justify-center p-2'>
                  {keyset("no data")}
                </div>
              )}
              {Object.keys(sumValues).map((items:any,id:any)=>{

                return(
        
                  <div key={id} className="mt-6 flex items-center justify-between border-t pt-4">
                    <span className="text-base font-medium text-gray-900">Total {items}</span>
                    <span className="text-base font-semibold text-gray-900">₹ {sumValues[items]||""}</span>
                  </div>
                )
              })}
              <div className='flex justify-end p-2'>
                <Button
                  className='flex transform items-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  onClick={handleAllSave}
                  size='l'
                >
                {keyset("Save All")}

                </Button>
              </div>
            </div>
    </div>
  )
}

export default Tabletable;
