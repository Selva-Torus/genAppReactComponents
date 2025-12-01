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
import Groupform  from "./Groupform/Groupform";
import Grouphhhhh  from "./Grouphhhhh/Grouphhhhh";
import Groupgtabs  from "./Groupgtabs/Groupgtabs";


export default function PageSinglesaveV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const [initialLoad, setInitialLoad] = useState(false);
  const securityData:any={
  "Template 1": {
    "allowedGroups": [
      "canvas",
      "form",
      "hhhhh",
      "gtabs"
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
  const {singlesave_v1Props, setsinglesave_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checkform,setCheckform,]=useState(false);
  const [checkhhhhh,setCheckhhhhh,]=useState(false);
  const [checkgtabs,setCheckgtabs,]=useState(false);
  const {form902ca, setform902ca} = useContext(TotalContext) as TotalContextProps;
  const {hhhhh0ad28, sethhhhh0ad28} = useContext(TotalContext) as TotalContextProps;
  const {gtabsa4415, setgtabsa4415} = useContext(TotalContext) as TotalContextProps;
  const {dfd_userdfd_v1Props, setdfd_userdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_usedetailsdfd_v1Props, setdfd_usedetailsdfd_v1Props} = useContext(TotalContext) as TotalContextProps;
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
    const orchestrationData = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",accessProfile:[user],from:"pageSinglesaveV1"},{
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
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1"  
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
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1"
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
    "count": "10"
  },
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "events": {}
};
        try{
        let userdfd_v1Body:te_refreshDto={
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:userDFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          userdfd_v1Body["dpdKey"] = encryptionDpd;
          userdfd_v1Body["method"] = encryptionMethod;
        }
        if(singlesave_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< singlesave_v1Props.length;i++){
            if(singlesave_v1Props[i].DFDkey == "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:userDFD:AFVK:v1"){
              delete singlesave_v1Props[i].DFDkey;
              filterData.push(singlesave_v1Props[i])
            }           
          }
          userdfd_v1Body['filterData'] = filterData;
        }
        const userdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",userdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setdfd_userdfd_v1Props(userdfd_v1Data?.data?.dataset?.data || []);
        let usedetailsdfd_v1Body:te_refreshDto={
          key: "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:usedetailsDFD:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          usedetailsdfd_v1Body["dpdKey"] = encryptionDpd;
          usedetailsdfd_v1Body["method"] = encryptionMethod;
        }
        if(singlesave_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< singlesave_v1Props.length;i++){
            if(singlesave_v1Props[i].DFDkey == "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:usedetailsDFD:AFVK:v1"){
              delete singlesave_v1Props[i].DFDkey;
              filterData.push(singlesave_v1Props[i])
            }           
          }
          usedetailsdfd_v1Body['filterData'] = filterData;
        }
        const usedetailsdfd_v1Data:any=await AxiosService.post("/te/eventEmitter",usedetailsdfd_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setdfd_usedetailsdfd_v1Props(usedetailsdfd_v1Data?.data?.dataset?.data || []);
          if (security == 'AA') {
          allowedGroup.map((nodes:any)=>{
            if(nodes?.groupName == 'form' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckform(true)
            }
            if(nodes?.groupName == 'hhhhh' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckhhhhh(true)
            }
            if(nodes?.groupName == 'gtabs' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckgtabs(true)
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
          codeStates['form'] = form902ca;
          codeStates['setform'] = setform902ca;
          codeStates['hhhhh'] = hhhhh0ad28;
          codeStates['sethhhhh'] = sethhhhh0ad28;
          codeStates['gtabs'] = gtabsa4415;
          codeStates['setgtabs'] = setgtabsa4415;
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
    routes.push("/screen_v1");
  }

  useEffect(() => {    
    securityCheck();
  }, [])
  return (
    <>
    <div className='p-3 groupStyle'>
      <Button
          onClick={handleClick}
          size='l'
          className='flex items-center gap-2 '
      >
        <Icon data="FaAngleLeft" size={18} />
          <Text variant='body-3'>Back</Text>
      </Button>
    </div>
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
        {checkform && initialLoad &&<Groupform  
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
        
        {checkhhhhh && initialLoad &&<Grouphhhhh  
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
        
        {checkgtabs && initialLoad &&<Groupgtabs  
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
    