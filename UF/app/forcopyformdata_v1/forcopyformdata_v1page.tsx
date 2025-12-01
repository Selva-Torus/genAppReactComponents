'use client'
import { useLanguage } from "../components/languageContext";
import React,{ useContext,useEffect,useState } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto,te_refreshDto,te_dfDto } from '@/app/interfaces/interfaces';
import { codeExecution } from "../utils/codeExecution";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import GroupA  from "./GroupA/GroupA";
import GroupB  from "./GroupB/GroupB";
import Grouptest  from "./Grouptest/Grouptest";
import Grouptest2  from "./Grouptest2/Grouptest2";


export default function PageForcopyformdataV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const [initialLoad, setInitialLoad] = useState(false);
  const securityData:any={
  "Template 1": {
    "allowedGroups": [
      "canvas",
      "b"
    ]
  }
};
  let code:any="";
  //const language=useLanguage();
  const routes = useRouter();
  const toast=useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<any>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<any>({});
  const [dropdownData, setDropdownData] = useState<any>({});
  const token:string = getCookie('token'); 
  const decodedTokenObj: any = decodeToken(token);
  const user = decodedTokenObj?.selectedAccessProfile;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {paginationDetails, setpaginationDetails} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {forcopyformdata_v1Props, setforcopyformdata_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checka,setChecka,]=useState(false);
  const [checkb,setCheckb,]=useState(false);
  const [checktest,setChecktest,]=useState(false);
  const [checktest2,setChecktest2,]=useState(false);
  const {a374af, seta374af} = useContext(TotalContext) as TotalContextProps;
  const {bfedf0, setbfedf0} = useContext(TotalContext) as TotalContextProps;
  const {testc78ea, settestc78ea} = useContext(TotalContext) as TotalContextProps;
  const {test201527, settest201527} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codedescription_v1Props, setdfd_codedescription_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_codedexcriptionv2_v1Props, setdfd_codedexcriptionv2_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData :any ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }

  async function securityCheck() {
    const orchestrationData = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1",accessProfile:[user],from:"pageForcopyformdataV1"},{
      headers: {
        Authorization: `Bearer ${token}`
      }});
    const uf_dfKey:string[] = orchestrationData?.data?.DFkeys;
    const security:string = orchestrationData?.data?.security; 
    const allowedGroup:any[] = orchestrationData?.data?.allowedGroup||[];
    code = orchestrationData?.data?.code;
    const pagination:any = orchestrationData?.data?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.data?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
    })
    let encryptionData:any = {};
    if (token) {
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct293/ag001/a001/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct293/ag001/a001/v1';
      }
      try {
        let myAccount:any;
        if(encryptionFlagPage){
         myAccount = await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:forcopyformdata:AFVK:v1"
            }
         })          
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        let actionDetails:any = {
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
    "count": 100
  },
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "events": {}
};
        try{
        let codedescription_v1Body:te_refreshDto={
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedescription:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          codedescription_v1Body["dpdKey"] = encryptionDpd;
          codedescription_v1Body["method"] = encryptionMethod;
        }
        if(forcopyformdata_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< forcopyformdata_v1Props.length;i++){
            if(forcopyformdata_v1Props[i].DFDkey == "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedescription:AFVK:v1"){
              delete forcopyformdata_v1Props[i].DFDkey;
              filterData.push(forcopyformdata_v1Props[i])
            }           
          }
          codedescription_v1Body['filterData'] = filterData;
        }
        const codedescription_v1Data:any=await AxiosService.post("/te/eventEmitter",codedescription_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setdfd_codedescription_v1Props(codedescription_v1Data?.data?.dataset?.data || []);
        let codedexcriptionv2_v1Body:te_refreshDto={
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedexcriptionv2:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          codedexcriptionv2_v1Body["dpdKey"] = encryptionDpd;
          codedexcriptionv2_v1Body["method"] = encryptionMethod;
        }
        if(forcopyformdata_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< forcopyformdata_v1Props.length;i++){
            if(forcopyformdata_v1Props[i].DFDkey == "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:codedexcriptionv2:AFVK:v1"){
              delete forcopyformdata_v1Props[i].DFDkey;
              filterData.push(forcopyformdata_v1Props[i])
            }           
          }
          codedexcriptionv2_v1Body['filterData'] = filterData;
        }
        const codedexcriptionv2_v1Data:any=await AxiosService.post("/te/eventEmitter",codedexcriptionv2_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setdfd_codedexcriptionv2_v1Props(codedexcriptionv2_v1Data?.data?.dataset?.data || []);
          if (security == 'AA') {
          allowedGroup.map((nodes:any)=>{
            if(nodes?.groupName == 'A' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setChecka(true)
            }
            if(nodes?.groupName == 'B' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckb(true)
            }
            if(nodes?.groupName == 'test' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setChecktest(true)
            }
            if(nodes?.groupName == 'test2' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setChecktest2(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: any = {}
          codeStates['a'] = a374af;
          codeStates['seta'] = seta374af;
          codeStates['b'] = bfedf0;
          codeStates['setb'] = setbfedf0;
          codeStates['test'] = testc78ea;
          codeStates['settest'] = settestc78ea;
          codeStates['test2'] = test201527;
          codeStates['settest2'] = settest201527;
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = () => {
    routes.push("/");
  }

  useEffect(() => {    
    securityCheck();
  }, [])
  return (
    <>
     <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'} `}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:'#ffffff',
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
        minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
        {checka && initialLoad &&<GroupA  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        
        {checkb && initialLoad &&<GroupB  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        
        {checktest && initialLoad &&<Grouptest  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        
        {checktest2 && initialLoad &&<Grouptest2  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        
          </div> 
    </>
  )
}
    