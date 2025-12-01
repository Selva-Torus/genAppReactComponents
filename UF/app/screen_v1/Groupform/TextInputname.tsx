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
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:userDFD:AFVK:v1|65e4b9fc4c24445f894db11440ecf95e|properties.name"
      ],
      "targetKey": "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1|0435d19851c747a18437b02e18403415|0cc40d095c904bf0a4e3d3c6bdd973ca"
    }
  ],
  "schemaData": {
    "type": "string"
  }
}
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
  

  // Validation  
    const [error, setError] = useState<string>('');
      /// vvv

      /// vvv
      /// vvv
      /// vvv
  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleChange = async(e: any) => {
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
    setError('')
    setValidate((pre:any)=>({...pre,name:undefined}))
    if(dynamicStateandType.type=="number"){
    setform03415((prev: any) => ({ ...prev, name: +e.target.value }))
    }
    else{
    setform03415((prev: any) => ({ ...prev, name: e.target.value }))
    }
  }
  const handleBlur=async () => {
      if(form03415?.name == "" || form03415?.name == undefined){
      form03415.name = "";
      const validate:any = v.safeParse(schema, form03415?.name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,name:"invalid"}))
        }
    }else if(form03415?.name !== ""){
    const validate:any = v.safeParse(schema, form03415?.name);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,name:"invalid"}))
    }
    }
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
      codeStates['form']  = form03415,
      codeStates['setform'] = setform03415,
      codeStates['table']  = table85363,
      codeStates['settable'] = settable85363,
      codeStates['gdocview']  = gdocview62373,
      codeStates['setgdocview'] = setgdocview62373,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
          componentId: "0435d19851c747a18437b02e18403415",
          controlId: "0cc40d095c904bf0a4e3d3c6bdd973ca",
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
       // setform03415((pre:any)=>({...pre,name:orchestrationData?.data?.dstData}))
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
      handleMapperValue()
      if(!form03415?.name)
      { 
        setform03415Props((pre:any)=>({...pre,required:true}))
        setIsRequredData(true)
      }
      if(validateRefetch.init!=0)
        handleBlur()
  },[validateRefetch.value])

  if (name973ca?.isHidden) {
    return <></>
  }
  return (   
    <div 
className="flex flex-row-reverse "      style={{gridColumn: `2 / 4`,gridRow: `11 / 28`, gap:``, height: `100%`, overflow: 'auto'}} >
        <div>
          <Text className="pb-2">{keyset("test")}</Text>
          {isRequredData && <span style={{ color: 'red' }}>*</span>}
        </div>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={form03415?.name||""}
         disabled= {name973ca?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly= {name973ca?.isDisabled ? true : false}
        size='m'      
        view='normal'
        validationState={validate?.name ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputname
