'use client'
import React, { useContext,useEffect, useState } from 'react';
import { codeExecution } from "../utils/codeExecution";
import { Multiply, ThreeLineIcon } from '../components/svgApplication';
import { AxiosService } from '../components/axiosService';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import decodeToken from "../components/decodeToken";
import { te_refreshDto } from '../interfaces/interfaces';
import { TotalContext, TotalContextProps } from '../globalContext';
import { useGravityThemeClass } from '../utils/useGravityUITheme'
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useTheme } from '@/hooks/useTheme';
import Groupgroup  from "./Groupgroup/Groupgroup";


type ReportItem = {
  displayName: string
  referanceName: string
  referencePath: string
  nodeId: string
  key: string
  type: string
  children?: ReportItem[]
}

type FilterDataItem = Record<string, any> & { nodeId: string }

const PageReportV1 = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  let code:any="";
  const toast=useInfoMsg();
  const [generatedPayload, setGeneratedPayload] = useState<any[]>([])
  const [initialLoad, setInitialLoad] = useState(false);
  const [checkToAdd, setCheckToAdd] = useState<any>({});
  const [dropdownData, setDropdownData] = useState<any>({});
  const [primaryTableData, setPrimaryTableData] = useState<any>({primaryKey:"",value:"",compName:""});
  const token:string = getCookie('token'); 
  const decodedTokenObj: any = decodeToken(token);
  const user = decodedTokenObj?.selectedAccessProfile;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {paginationDetails, setpaginationDetails} = useContext(TotalContext) as TotalContextProps;
  const {report_v1Props, setreport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const artifactName =
    "CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1".split(
      ':'
    )[11]
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  const themeClass = useGravityThemeClass()
  const { property } = useContext(TotalContext) as TotalContextProps
  let brandcolor: string = property?.brandColor ?? '#0736c4'
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData :any ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [checkgroup,setCheckgroup,]=useState(false);
  const {group761ff, setgroup761ff} = useContext(TotalContext) as TotalContextProps;
  const {dfd_singlesavedfd_v1Props, setdfd_singlesavedfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [dfd_singlesavedfd_v1Params, setdfd_singlesavedfd_v1Params] = React.useState<any>({
    "key":"CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:singlesavedfd:AFVK:v1:",
    "count":1000,
    "page":1,
    "refreshFlag":"Y",
    "reportFlag":true
    });
  const [pdfUrl, setPdfUrl] = useState<string | null>(
    'https://www.orimi.com/pdf-test.pdf'
  )

  const reportData:any = [
  {
    "displayName": "",
    "referanceName": "name",
    "referencePath": "properties.name",
    "nodeId": "b55c200975964ec08197c78d8350534b",
    "key": "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:singlesavedfd:AFVK:v1:",
    "type": "string"
  },
  {
    "displayName": "",
    "referanceName": "age",
    "referencePath": "properties.age",
    "nodeId": "b55c200975964ec08197c78d8350534b",
    "key": "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:singlesavedfd:AFVK:v1:",
    "type": "string"
  },
  {
    "displayName": "",
    "referanceName": "userdetails",
    "referencePath": "properties.userdetails",
    "nodeId": "b55c200975964ec08197c78d8350534b",
    "key": "CK:CT293:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:singlesavedfd:AFVK:v1:",
    "type": "array"
  }
]

  const capitalizeEachWord = (str: string) => {
    if (!str) return ''
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  // Initialize payload with empty values
  useEffect(() => {
      setdfd_singlesavedfd_v1Props([])
    if (reportData.length) {
      const initPayload = extractFilterDataByKey(reportData)
      setGeneratedPayload(initPayload)
    }
  }, [])

  // Recursive function to extract filterData grouped by key
  const extractFilterDataByKey = (items: ReportItem[]): any[] => {
    const keyMap: Record<string, FilterDataItem[]> = {}

    const recurse = (item: ReportItem, key: string) => {
      if (!keyMap[key]) keyMap[key] = []

      if (item.type === 'object' && item.children) {
        item.children.forEach(child => recurse(child, key))
      } else {
        keyMap[key].push({ nodeId: item.nodeId, [item.referencePath]: '' })
      }
    }

    items.forEach(item => recurse(item, item.key))

    return Object.keys(keyMap).map(k => ({
      key: k,
      refreshFlag: 'Y',
      count: 1000,
      page: 1,
      filterData: keyMap[k],
      reportFlag:true
    }))
  }

  const mergeFilterDataByNodeId = (payload: any) => {
  return payload.map((p: any) => {
    const mergedMap: Record<string, any> = {}

    p.filterData.forEach((fd: any) => {
      const nodeId = fd.nodeId
      if (!mergedMap[nodeId]) {
        mergedMap[nodeId] = { nodeId }
      }
      Object.keys(fd).forEach(k => {
        if (k !== 'nodeId') {
          mergedMap[nodeId][k] = fd[k]
        }
      })
    })

    return {
      ...p,
      filterData: Object.values(mergedMap)
    }
  })
}

  const handleInputChange = (
    key: string,
    referencePath: string,
    value: string,
    type: string
  ) => {
    if (type === 'number' && isNaN(Number(value))) {
      return
    }
    setGeneratedPayload(prev => {
      const updatedPayload = prev.map(p => {
        if (p.key !== key) return p
        const updatedFilterData = p.filterData.map((fd: any) => {
          if (fd.hasOwnProperty(referencePath)) {
            return { ...fd, [referencePath]: value }
          }
          return fd
        })
        return { ...p, filterData: updatedFilterData }
      })

      // Split into v1 and v2 live
      const cleanedPayload = updatedPayload.map(p => ({
        ...p,
        filterData: p.filterData
          .map((fd: any) => {
            const cleanFd: any = { nodeId: fd.nodeId }
            for (const k in fd) {
              if (k !== 'nodeId' && fd[k] !== '') cleanFd[k] = fd[k]
            }
            return Object.keys(cleanFd).length > 1 ? cleanFd : null
          })
          .filter(Boolean)
      }))

      const updatedCleanedPayload = mergeFilterDataByNodeId(cleanedPayload)

     const singlesavedfd_v1Payload= updatedCleanedPayload.find((p: any) => p.key.split(':')[11].toLowerCase() === "singlesavedfd" && p.key.split(':')[11].toLowerCase() === "singlesavedfd") || null;
     setdfd_singlesavedfd_v1Params(singlesavedfd_v1Payload)


      return updatedPayload
    })
  }
  

// Recursive UI rendering
 const renderItem = (item: ReportItem, index: number) => {
    if (item.type === 'object' && item.children) {
      return (
        <div
          key={index}
          style={{
            backgroundColor: brandcolor,
            borderColor: 'var(--g-color-line-generic)'
          }}
          className='flex w-full flex-col gap-[10px] rounded-lg border px-[10px] py-[10px]'
        >
          <Text variant='subheader-3'>
            {capitalizeEachWord(item.displayName || item.referanceName)}
          </Text>
          {item.children.map((child, childIndex) =>
            renderItem(child, childIndex)
          )}
        </div>
      )
    } else {
      const value =
        generatedPayload
          .find(p => p.key === item.key)
          ?.filterData.find((fd: any) =>
            fd.hasOwnProperty(item.referencePath)
          )?.[item.referencePath] || ''

      return (
        <div
          key={item.referencePath}
          className='flex w-full flex-col rounded-lg border px-[12px] py-[5px]'
          style={{
            backgroundColor: 'var(--g-color-base-background)',
            color: 'var(--g-color-text-primary)',
            borderColor: 'var(--g-color-line-generic)'
          }}
        >
          <Text variant='code-2'>
            {capitalizeEachWord(item.displayName || item.referanceName)}
          </Text>
          <input
            style={{
              backgroundColor: 'var(--g-color-base-background)',
              color: 'var(--g-color-text-primary)',
              borderColor: 'var(--g-color-line-generic)',
              outline: 'none'
            }}
            placeholder={item.displayName || item.referanceName}
            value={value}
            onChange={e =>
              handleInputChange(
                item.key,
                item.referencePath,
                e.target.value,
                item.type
              )
            }
            className='rounded-lg'
          />
        </div>
      )
    }
  }


  const handleClick = async () => {
    try {
        const res = await AxiosService.post(
        '/te/eventEmitter',
        dfd_singlesavedfd_v1Params,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
          }
        }
      )
      if(res.status === 201){
        setdfd_singlesavedfd_v1Props(res.data.dataset.data || {})
      } 
    } catch (error) {
      console.log(error)
    }
  }

  async function securityCheck() {
    const orchestrationData = await AxiosService.post("/UF/Orchestration",{key:"CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1",accessProfile:[user],from:"pageReportV1"},{
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
              key:"CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1"  
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
              key:"CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1"
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
          if (security == 'AA') {
          allowedGroup.map((nodes:any)=>{
            if(nodes?.groupName == 'group' && (nodes?.security== 'AA' || nodes?.security == 'ATO'))
            {
              setCheckgroup(true)
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
          codeStates['group'] = group761ff;
          codeStates['setgroup'] = setgroup761ff;
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


  useEffect(() => {    
    securityCheck();
  }, [])

  return (
     <div className='flex h-[80vh] xl:h-[87vh] w-full gap-[20px] overflow-hidden'>
      <>
        {isFormOpen ? (
          <div
            style={{
              borderColor: 'var(--g-color-line-generic)'
            }}
           className='flex h-full flex-col gap-[10px] rounded-lg border'
          >
            <div className='flex items-center justify-between gap-[10px] px-[15px] py-[10px]'>
              <Text variant='subheader-3'>{capitalizeEachWord(artifactName)}</Text>
              <Button view='flat' size='m' onClick={() => setIsFormOpen(false)}>
                 <Multiply fill={isDark ? "white" : "black"} />
              </Button>
            </div>
            <hr className='w-full border border-black/15' />
            <div
              //style={{ backgroundColor: selectionColor }}
               className='flex h-full w-full flex-col items-center gap-[10px] overflow-y-auto rounded-lg px-[10px] py-[10px] scrollbar-hide'
            >
              {reportData.map((item: any, index: number) =>
                renderItem(item, index)
              )}
            </div>
            <div className='flex w-full justify-end gap-[10px] px-[10px] py-[10px]'>
              <Button onClick={handleClick}>Generate Report</Button>
            </div>
          </div>
        ) : (
          <div>
          <Button view='flat' size='l' onClick={() => setIsFormOpen(true)}>
            <ThreeLineIcon
              fill={themeClass.includes('dark') ? '#ffffff' : '#000000'}
            />
          </Button>
          </div>
        )}
      </>
      <div className='w-full h-full'>
        <div style={{"gap":"16","gridAutoRows":"4px","minHeight":"100vh","padding":"0rem","backgroundColor":"#ffffff","columnGap":"0px","rowGap":"0px","display":"grid","gridTemplateColumns":"repeat(12, 1fr)"}} className='h-full w-full'>
        {checkgroup && initialLoad &&<Groupgroup  
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
          paginationDetails={paginationDetails}
          isFormOpen={isFormOpen}
        />}
        
          </div> 
      </div>
    </div>
  )
}

export default PageReportV1


