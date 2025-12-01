'use client'




    

     
import React, { useState,useContext,useEffect } from 'react'
import { TorusTextInput } from '@/app/TorusComponents/TextInput';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot';


const TextInputname = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {
    "NDS": [
      {
        "id": "e5c5f8f744574c808b12d090163e1df1",
        "type": "controlNode",
        "position": {
          "x": -43.59610354063215,
          "y": -80.41616222771583
        },
        "data": {
          "nodeId": "e5c5f8f744574c808b12d090163e1df1",
          "nodeName": "name",
          "nodeType": "textinput",
          "events": [
            {
              "name": "onChange",
              "rise": [
                {
                  "key": "getValueFromMemory",
                  "label": "getValueFromMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshScreen",
                  "label": "refreshScreen",
                  "listenerType": "type1"
                },
                {
                  "key": "setValueToMemory",
                  "label": "setValueToMemory",
                  "listenerType": "type1"
                },
                {
                  "key": "confirmMsg",
                  "label": "confirmMsg",
                  "listenerType": "type1"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type1"
                },
                {
                  "key": "infoMsg",
                  "label": "infoMsg",
                  "listenerType": "type1"
                }
              ],
              "riseListen": [
                {
                  "key": "triggerButtonClick",
                  "label": "triggerButtonClick",
                  "listenerType": "type1"
                },
                {
                  "key": "showComponentAsPopup",
                  "label": "showComponentAsPopup",
                  "listenerType": "type2"
                },
                {
                  "key": "selectFirstRecord",
                  "label": "selectFirstRecord",
                  "listenerType": "type1"
                },
                {
                  "key": "resetSelection",
                  "label": "resetSelection",
                  "listenerType": "type1"
                },
                {
                  "key": "hideElement",
                  "label": "hideElement",
                  "listenerType": "type2"
                },
                {
                  "key": "showElement",
                  "label": "showElement",
                  "listenerType": "type2"
                },
                {
                  "key": "refreshElement",
                  "label": "refreshElement",
                  "listenerType": "type2"
                },
                {
                  "key": "disableElement",
                  "label": "disableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "enableElement",
                  "label": "enableElement",
                  "listenerType": "type2"
                },
                {
                  "key": "clearHandler",
                  "label": "clearHandler",
                  "listenerType": "type1"
                },
                {
                  "key": "showArtifactAsModal",
                  "label": "showArtifactAsModal",
                  "listenerType": "type2"
                },
                {
                  "key": "showArtifact",
                  "label": "showArtifact",
                  "listenerType": "type2"
                }
              ],
              "self": [],
              "enabled": true
            }
          ],
          "label": "name",
          "children": [
            "e5c5f8f744574c808b12d090163e1df1.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 29,
        "positionAbsolute": {
          "x": -43.59594136832956,
          "y": -80.41656827406186
        }
      },
      {
        "id": "e5c5f8f744574c808b12d090163e1df1.1.1.1",
        "type": "handlerNode",
        "label": "showArtifact",
        "eventContext": "riseListen",
        "position": {
          "x": -28.52553736933844,
          "y": 68.1251842100485
        },
        "data": {
          "label": "showArtifact",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "e5c5f8f744574c808b12d090163e1df1.1.1",
          "children": [
            "107fea0f28b84135bd0517bd413d47dd.1.1.1.1"
          ]
        },
        "width": 54,
        "height": 45,
        "positionAbsolute": {
          "x": -28.52484626107255,
          "y": 68.12515534507251
        }
      },
      {
        "id": "107fea0f28b84135bd0517bd413d47dd.1.1.1.1",
        "type": "screen",
        "elementType": "",
        "key": "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",
        "position": {
          "x": 71.16697414352677,
          "y": 24.76627879813048
        },
        "data": {
          "label": "automate.v1",
          "sequence": "1.1.1.1",
          "parent": "e5c5f8f744574c808b12d090163e1df1",
          "children": [],
          "nodeProperty": {},
          "nodeLabel": "",
          "parentId": "e5c5f8f744574c808b12d090163e1df1.1.1.1"
        },
        "width": 52,
        "height": 45,
        "positionAbsolute": {
          "x": 71.16710511737323,
          "y": 24.76663451986525
        }
      },
      {
        "id": "e5c5f8f744574c808b12d090163e1df1.1.1",
        "type": "eventNode",
        "position": {
          "x": -1.9712381584395795,
          "y": -16.81984465874061
        },
        "data": {
          "label": "onChange",
          "sequence": "1.1",
          "parent": "e5c5f8f744574c808b12d090163e1df1",
          "children": [
            "e5c5f8f744574c808b12d090163e1df1.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -1.9720386779984165,
          "y": -16.819875901520433
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "e5c5f8f744574c808b12d090163e1df1->e5c5f8f744574c808b12d090163e1df1.1.1",
        "source": "e5c5f8f744574c808b12d090163e1df1",
        "type": "straight",
        "target": "e5c5f8f744574c808b12d090163e1df1.1.1",
        "animated": true
      },
      {
        "id": "e5c5f8f744574c808b12d090163e1df1.1.1.1->107fea0f28b84135bd0517bd413d47dd.1.1.1.1",
        "source": "e5c5f8f744574c808b12d090163e1df1.1.1.1",
        "type": "straight",
        "target": "107fea0f28b84135bd0517bd413d47dd.1.1.1.1"
      },
      {
        "id": "e5c5f8f744574c808b12d090163e1df1.1.1->e5c5f8f744574c808b12d090163e1df1.1.1.1",
        "source": "e5c5f8f744574c808b12d090163e1df1.1.1",
        "type": "straight",
        "target": "e5c5f8f744574c808b12d090163e1df1.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "e5c5f8f744574c808b12d090163e1df1",
      "type": "textinput",
      "name": "name",
      "sequence": 1,
      "children": [
        {
          "id": "e5c5f8f744574c808b12d090163e1df1.1.1",
          "type": "eventNode",
          "name": "onChange",
          "sequence": "1.1",
          "children": [
            {
              "id": "e5c5f8f744574c808b12d090163e1df1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "showArtifact",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "107fea0f28b84135bd0517bd413d47dd.1.1.1.1",
                  "type": "screen",
                  "name": "automate.v1",
                  "label": "",
                  "key": "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1",
                  "elementType": "",
                  "sequence": "1.1.1.1",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:userDFD:AFVK:v1|65e4b9fc4c24445f894db11440ecf95e|properties.name"
      ],
      "targetKey": "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1|3e7270b3f4fb4d0aaf31e1c67a5902ca|e5c5f8f744574c808b12d090163e1df1"
    }
  ],
  "schemaData": {
    "type": "string"
  }
}
  const {automate_v1Props, setautomate_v1Props}= useContext(TotalContext) as TotalContextProps;
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'name',type:"text"})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
  /////////////
   //another screen
  const {form902ca, setform902ca}= useContext(TotalContext) as TotalContextProps;
  const {form902caProps, setform902caProps}= useContext(TotalContext) as TotalContextProps;
  const {namee1df1, setnamee1df1}= useContext(TotalContext) as TotalContextProps;
  const {age9880e, setage9880e}= useContext(TotalContext) as TotalContextProps;
  const {pivot575fb, setpivot575fb}= useContext(TotalContext) as TotalContextProps;
  const {save5c903, setsave5c903}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28}= useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28Props, sethhhhh0ad28Props}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415}= useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415Props, setgtabsa4415Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  

  // Validation  
    const [error, setError] = useState<string>('');
      /// vvv
      /// vvv
      /// vvv
      /// vvv
  schemaArray = [] ;
  const handleChange = async(e: any) => {
    setError('')
    setValidate((pre:any)=>({...pre,name:undefined}))
    if(dynamicStateandType.type=="number"){
    setform902ca((prev: any) => ({ ...prev, name: +e.target.value }))
    }
    else{
    setform902ca((prev: any) => ({ ...prev, name: e.target.value }))
    }
              // show as profile 
      let filterProps: any =  [];
      let filterData = await getFilterProps(filterProps,form902ca);
      setautomate_v1Props([...filterData ]);
      routes.push(getRouteScreenDetails('CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:automate:AFVK:v1', 'automate_v1'))
  }
  const handleBlur=async () => {
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form902ca,
      codeStates['setform'] = setform902ca,
      codeStates['hhhhh']  = hhhhh0ad28,
      codeStates['sethhhhh'] = sethhhhh0ad28,
      codeStates['gtabs']  = gtabsa4415,
      codeStates['setgtabs'] = setgtabsa4415,
    codeExecution(code,codeStates)
    }
  }
  async function handleConfirmOnChange(){
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
          componentId: "3e7270b3f4fb4d0aaf31e1c67a5902ca",
          controlId: "e5c5f8f744574c808b12d090163e1df1",
          isTable: false,
          from:"TextInputname",
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
      setAllCode(orchestrationData?.data?.code)
      
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'name',type:'text'}
        type={
          name:'name',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.name.type
        }
        setDynamicStateandType(type)
       
      }
      if(Array.isArray(orchestrationData?.data?.dstData))
      {
        return
      }else{
      //  if(Object.keys(orchestrationData?.data?.dstData).length>0) 
       // setform902ca((pre:any)=>({...pre,name:orchestrationData?.data?.dstData}))
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
      handleMapperValue()
      handleBlur()
  },[validateRefetch.value])

  if (namee1df1?.isHidden) {
    return <></>
  }
  return (   
    <div 
      style={{gridColumn: `3 / 5`,gridRow: `13 / 23`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={form902ca?.name||""}
         disabled= {namee1df1?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly= {namee1df1?.isDisabled ? true : false}
        size='m'      
        view='normal'
        validationState={validate?.name ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputname
