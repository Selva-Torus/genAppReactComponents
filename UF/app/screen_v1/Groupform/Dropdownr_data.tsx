
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation'
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetails } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'


const Dropdownr_data = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  let customecode:any="";
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
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  const items = [
   'aaa',
   'bbb',
  ];

  useEffect(() => {
  if(form03415?.r_data=="" || form03415?.r_data==undefined || form03415?.r_data==null ){
    setSelectedItem("");
  }
  },[form03415?.r_data])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:parentchildindivitualsave:AFVK:v1",
          componentId: "0435d19851c747a18437b02e18403415",
          controlId: "2ababd1183c04a918d6bd4be40483fce",
          isTable: false,
          accessProfile:accessProfile,
          from:"dropdownr_data"
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
  },[r_data83fce?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[]
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setform03415((prev: any) => ({ ...prev, r_data: value}))
      setIsRequredData(false)
    } else {
      setform03415((prev: any) => ({ ...prev, r_data: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,r_data:undefined}))
    selected.current=value
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}
      
        codeStates['form'] = form03415,
        codeStates['setform'] = setform03415,
        codeStates['selected']  = selected,
        codeStates['form03415'] = form03415Props,
        codeStates['setform03415'] = setform03415Props,
        codeStates['selected']  = selected,
        codeStates['clear'] = clear835e9,
        codeStates['setclear'] = setclear835e9,
        codeStates['selected']  = selected,
        codeStates['name'] = name973ca,
        codeStates['setname'] = setname973ca,
        codeStates['selected']  = selected,
        codeStates['age'] = agee3b87,
        codeStates['setage'] = setagee3b87,
        codeStates['selected']  = selected,
        codeStates['show'] = show7b59f,
        codeStates['setshow'] = setshow7b59f,
        codeStates['selected']  = selected,
        codeStates['parentsave'] = parentsave72680,
        codeStates['setparentsave'] = setparentsave72680,
        codeStates['selected']  = selected,
        codeStates['docup'] = docup8da75,
        codeStates['setdocup'] = setdocup8da75,
        codeStates['selected']  = selected,
        codeStates['v_data'] = v_data16036,
        codeStates['setv_data'] = setv_data16036,
        codeStates['selected']  = selected,
        codeStates['r_data'] = r_data83fce,
        codeStates['setr_data'] = setr_data83fce,
        codeStates['selected']  = selected,
        codeStates['table'] = table85363,
        codeStates['settable'] = settable85363,
        codeStates['selected']  = selected,
        codeStates['table85363'] = table85363Props,
        codeStates['settable85363'] = settable85363Props,
        codeStates['selected']  = selected,
        codeStates['gdocview'] = gdocview62373,
        codeStates['setgdocview'] = setgdocview62373,
        codeStates['selected']  = selected,
        codeStates['gdocview62373'] = gdocview62373Props,
        codeStates['setgdocview62373'] = setgdocview62373Props,
        codeStates['selected']  = selected,
    codeExecution(customecode,codeStates)
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
      if(form03415?.r_data == "" || form03415?.r_data == undefined){
      form03415.r_data = "";
      const validate:any = v.safeParse(schema, form03415?.r_data);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,r_data:"invalid"}))
        }
    }else if(form03415?.r_data !== ""){
    const validate:any = v.safeParse(schema, form03415?.r_data);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,r_data:"invalid"}))
    }
    }
  }

    useEffect(()=>{
        if(!form03415?.r_data)
        { 
          setform03415Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
    },[validateRefetch.value])
  ///////////////

  useEffect(() => {
    if(initialCount!=0)
     setform03415((pre:any)=>({...pre,r_data:""}))
    else
      setInitialCount(1)
  },[r_data83fce?.refresh])

  if (r_data83fce?.isHidden) {
    return <></>
  }

  return (
    <div 
className="flex flex-col-reverse  "      style={{gridColumn: `10 / 12`,gridRow: `59 / 78`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
        <Text className="pb-2">r_data</Text>
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      </div>
      <Dropdown
        className=""
        placeholder={keyset("r_data")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {r_data83fce?.isDisabled ? true : false}
        width = "250"
        value={form03415?.r_data ?[form03415?.r_data] : []}
        onChange={handleClick} 
        validationState={validate?.r_data ? "invalid" : undefined}
        errorMessage={error}
      /> 
      {validate?.r_data && (
        <Text variant="caption-1" color="danger" className="mt-1">
          {error || 'This field is required'}
        </Text>
      )}
    </div>
  );
};

export default Dropdownr_data;
