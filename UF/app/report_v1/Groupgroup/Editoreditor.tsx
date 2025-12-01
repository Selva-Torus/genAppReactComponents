
'use client'
import axios from 'axios';
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/Pagination';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetails } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { DocumentViewer } from "react-documents";

  
export default function Editoreditor({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData, isFormOpen}: any){
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const token: string = getCookie('token');
  const {dfd_singlesavedfd_v1Props, setdfd_singlesavedfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
   function filtetKeyname(str = '', filterString = '') {
    return str?.replace(filterString, '')
  }
  const [paginationData, setPaginationData] = React.useState({
    page: 1,
    pageSize: 1,
    total: 0
  });
  const [orchestrationDataMapper, setorchestrationDataMapper] = React.useState([]);

  function getValueByPath(obj: any, path: string) {
    return path
      .split('.')
      .reduce(
        (acc: { [x: string]: any }, key: string | number) => acc?.[key],
        obj
      )
  }
  function setValueByPath(obj: any, path: string, value: any) {
    const keys = path.split('.')
    let current = obj
    keys.forEach((key: string | number, index: number) => {
      if (index === keys.length - 1) {
        current[key] = value
      } else {
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {}
        }
        current = current[key]
      }
    })
  }
  async function getMapperDetails(){
    const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT293:FNGK:AF:FNK:UF-UFR:CATK:AG001:AFGK:A001:AFK:report:AFVK:v1",
          componentId: "283561a593874f1eaeb99ab9f6e761ff",
          controlId: "f95832b649c046ee891179e75291c54b",
          from:"Editor"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.mapper?.length > 0){
        setorchestrationDataMapper(orchestrationData?.data?.mapper);
        let filteredata:any=[];
        if (dfd_singlesavedfd_v1Props.length >0) {
        dfd_singlesavedfd_v1Props?.map((items:any)=>{
          let temp:any={}
          orchestrationData?.data?.mapper?.map((mapItem:any)=>{
            let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
            sourceKey = filtetKeyname(sourceKey, 'items.properties.')
            sourceKey = filtetKeyname(sourceKey, 'properties.')
            let targetKey = mapItem?.targetKey?.split('|').at(-1)
            targetKey = filtetKeyname(targetKey, 'items.properties.')
            targetKey = filtetKeyname(targetKey, 'properties.')
            sourceKey=sourceKey.replaceAll("properties.","")
            targetKey=targetKey.replaceAll("properties.","")
            const value = getValueByPath(items, sourceKey)
            setValueByPath(temp, targetKey, value)
          })
          filteredata.push(temp)
        })
        if(filteredata?.length>0){
          fetchReport(filteredata[0])
        }
      }
      }
}


const handleUpdate = (data: { page: number; pageSize: number }) => {
    const { page, pageSize } = data;
    setPaginationData(prevState => ({ ...prevState, page, pageSize }));
    if(orchestrationDataMapper?.length > 0){
      let filteredata:any=[];
      if (dfd_singlesavedfd_v1Props.length >0) {
        dfd_singlesavedfd_v1Props?.map((items:any)=>{
          let temp:any={}
          orchestrationDataMapper?.map((mapItem:any)=>{
            let sourceKey = mapItem?.sourceKey?.split('|').at(-1)
            sourceKey = filtetKeyname(sourceKey, 'items.properties.')
            sourceKey = filtetKeyname(sourceKey, 'properties.')
            let targetKey = mapItem?.targetKey?.split('|').at(-1)
            targetKey = filtetKeyname(targetKey, 'items.properties.')
            targetKey = filtetKeyname(targetKey, 'properties.')
            sourceKey=sourceKey.replaceAll("properties.","")
            targetKey=targetKey.replaceAll("properties.","")
            const value = getValueByPath(items, sourceKey)
            setValueByPath(temp, targetKey, value)
          })
          filteredata.push(temp)
        })
    }

    fetchReport(filteredata[page - 1])
  }
}

  const fetchReport = async (templadteData:any) => {
    let postData: any = {
        template: {
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title}}</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 40px;
      color: #333;
    }
    .report-container {
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 0 auto;
      padding: 30px;
    }
    .report-header {
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .report-header h1 {
      margin: 0;
      color: #007bff;
      font-size: 28px;
    }
    .report-section {
      margin-bottom: 20px;
    }
    .report-section label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
      color: #555;
    }
    .report-section input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #999;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="report-header">
      <h1>{{title}}</h1>
    </div>
    
    <div class="report-section">
      <label for="name">Name</label>
      <input type="text" id="name" value="{{name}}" readonly>
    </div>

    <div class="report-section">
      <label for="age">Age</label>
      <input type="text" id="age" value="{{age}}" readonly>
    </div>

    <div class="report-section">
      <label for="created_by">Created By</label>
      <input type="text" id="created_by" value="{{trs_created_by}}" readonly>
    </div>

    <div class="report-section">
      <label for="created_date">Created Date</label>
      <input type="text" id="created_date" value="{{trs_created_date}}" readonly>
    </div>

    <div class="report-section">
      <label for="status">Status</label>
      <input type="text" id="status" value="{{trs_status}}" readonly>
    </div>

    <div class="report-section">
      <label for="next_status">Next Status</label>
      <input type="text" id="next_status" value="{{trs_next_status}}" readonly>
    </div>

    <div class="report-section">
      <label for="process_id">Process ID</label>
      <input type="text" id="process_id" value="{{trs_process_id}}" readonly>
    </div>
    <label for="phone">Phone</label>
    {{#each userdetails}}

    <div class="report-section">
      <input type="text" id="phone" value="{{phone}}" readonly>
    </div>
    {{/each}}
    <div class="footer">
      © 2025 Report System
    </div>
  </div>
</body>
</html>
 `,
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
      data:templadteData,
    };
    let reportData: any = await axios.post(
      'https://jsreport9x.toruslowcode.com/api/report',
      postData,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const blob = new Blob([reportData.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

  }

  useEffect(() => {
    getMapperDetails()
  }, [dfd_singlesavedfd_v1Props]);
  return (
    <div 
      //style={{gridColumn: `2 / 12`,gridRow: `14 / 161`, gap:``, height: `100%`, overflow: 'auto'}}
      className='w-full h-full'
      >
     
      {pdfUrl && dfd_singlesavedfd_v1Props.length >0 ? (
       <div className={`flex flex-col w-full h-full gap-3`}>
       <DocumentViewer
          url={pdfUrl}
          viewer='pdf'
          className='h-full w-full'
        />
        <Pagination
        className='flex w-full items-center justify-center'
        page={paginationData.page}
        pageSize={1}
        pageSizeOptions={[1]}
        total={dfd_singlesavedfd_v1Props.length}
        onUpdate={handleUpdate}
        //showInput={true}
        size='l'
      />
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  )
}
