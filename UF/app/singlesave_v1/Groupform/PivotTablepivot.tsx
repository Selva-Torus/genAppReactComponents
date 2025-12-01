
'use client'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import React, { useEffect, useState,useContext } from 'react'
import { AxiosService } from '@/app/components/axiosService'
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import { Icon } from '@/components/Icon';
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import i18n from '@/app/components/i18n';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution } from '@/app/utils/codeExecution'
import { getCookie } from "@/app/components/cookieMgment"
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';


let mappedColumns:any[] = [
  {
    "id": "phone"
  },
  {
    "id": "trs_created_date"
  },
  {
    "id": "id"
  }
];
let presentCols:any[] = [
  "phone",
  "trs_created_date",
  "id"
];

interface Expense {
  id: any
  [key: string]: any
}
function generateUniqueCode() {
  const timestamp = new Date().getTime() // Current timestamp in milliseconds
  const randomValue = Math.random().toString(36).substring(2, 8) // Random alphanumeric string of length 6
  return `${timestamp}-${randomValue}`
}

export default function PivotTablepivot({encryptionFlagCompData}:any) {
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode]=useState<any>("");
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const toast:any=useInfoMsg()
  let code:any = ""
  const keyset:any=i18n.keyset("language") 
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'phone',type:"text"})
  const routes = useRouter()
  const [selectedRows, setSelectedRows] = useState<any>([])
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
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
  
  const [sumableCols,setSumableCols] = useState<any>(
        [
  {
    "key": "",
    "label": ""
  }
]
  )
  const [selection, setSelection] = useState<any[]>([])
  const [dstColumns, setDstColumns] = useState<any>([])
  const [sumValues,setSumValues]=useState<any>({})
  const [newExpense, setNewExpense] = useState<Expense>({
    id: '',
    category: '',
    date: '',
    amount: 0
  })
  const GetTableDetails = async () => {
    const orchestrationData = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT293:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:singleSave:AFVK:v1",
        componentId: "3e7270b3f4fb4d0aaf31e1c67a5902ca",
        controlId: "763eac13150248f1ac1a0029466575fb",
        isTable: false,
        from:"PivotTablepivot",
        accessProfile:accessProfile
      },
      
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if (orchestrationData?.data) {
      if(orchestrationData?.data?.mapper?.length>0)
      {
        if (orchestrationData?.data?.schemaData) {
          let altertColumns: any = []
          let allSchemas: any[] =
            orchestrationData?.data?.schemaData[0].schema.responses['200']
              .content['application/json'].schema.items.properties
          mappedColumns.map((defaultRenderItem: any) => {
            Object.keys(allSchemas).map((schemaItem: any) => {
              if (defaultRenderItem.id == schemaItem) {
                altertColumns.push({
                  ...defaultRenderItem,
                  type:
                    allSchemas[schemaItem].example?.toLowerCase() == 'string'
                      ? 'text'
                      : allSchemas[schemaItem].example?.toLowerCase() == 'integer'
                      ? 'number'
                      : allSchemas[schemaItem].example?.toLowerCase()
                })
              }
            })
          })
          if (Array.isArray(orchestrationData?.data?.security)) {
            let securityData = orchestrationData?.data?.security
            altertColumns = altertColumns.filter((item: any) => {
              if (securityData.includes(item?.id)) return item
            })
          }
          console.log(altertColumns)

          setDstColumns(altertColumns)
        }
      }
    if(orchestrationData?.data?.code)
    {
      setAllCode(orchestrationData?.data?.code)
    }      
    }
  }
  const [userType,setUserType]=useState<any>([])
  
  useEffect(()=>{
    GetTableDetails()
  },[pivot575fb?.refresh])

  const handleCustomCode=async () => {
    code = allCode
    if (code != '') {
      let codeStates: any = {}
          codeStates['form']  = form902ca,
          codeStates['setform'] = setform902ca,
          codeStates['hhhhh']  = hhhhh0ad28,
          codeStates['sethhhhh'] = sethhhhh0ad28,
          codeStates['gtabs']  = gtabsa4415,
          codeStates['setgtabs'] = setgtabsa4415,
        code = codeExecution(code,codeStates)
        return code
    }
  }

  async function setLock(data:any){  
    setSelection(data)
    let temp:any = form902ca
    for(let i=0;i<temp?.phone?.length;i++)
    {
      temp.phone[i]._isSelected_= false
    }
    data.map((indexes:any)=>{
      temp.phone[indexes]._isSelected_=true
    })
    setform902ca(temp)
    let summedValues:any={}
    if(sumableCols?.length>0){
      temp?.phone?.map((items:any)=>{
        sumableCols?.map((sumable:any)=>{
          if(Object.keys(items).includes(sumable?.key))
          {
            if(typeof items[sumable?.key] == "number" && items['_isSelected_'] == true){
              if(Object.keys(summedValues).includes(sumable?.label))
                  summedValues[sumable?.label]= summedValues[sumable?.label] + items[sumable?.key]
              else
                summedValues[sumable?.label]=items[sumable?.key]
            }
          }
        })
      })
    }
    setSumValues(summedValues)
    await handleCustomCode()
  }

  
  const getRowActions = (item: any, index: number) => {
    return [
      {text: 'Remove',handler: () => {},theme: 'danger'}
    ]
  }

    const onRowDataChange = (
    rowIndex: number,
    newData: any,
    type: string,
    colunm?: any
  ) => {
    let temp: any[] = form902ca?.userdetails || []
    const updatedData = temp?.map((item: any, id: number) => {
      if (id == rowIndex) {
        if (type === 'number') {
          if (newData.value.length > 0 && newData.value.startsWith('0')) {
            newData.value = newData.value.slice(1)
          }
          return {
            ...item,
            [newData.name]: +newData.value
          }
        } else if (type == 'date' || type === 'datetime') {
          const selectedDate = new Date(newData)
          const IST_OFFSET = 5.5 * 60 * 60 * 1000
          const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET)
          const isoDate = indiaTime.toISOString()
          return {
            ...item,
            [colunm]: isoDate
          }
        } else {
          return {
            ...item,
            [newData.name]: newData.value
          }
        }
      }
      return item
    })
    setform902ca((pre: any) => ({
      ...pre,
      userdetails: updatedData
    }))
  }
  function addRow() {
    let newRow: any = {}
    dstColumns.forEach((item: any) => {
      if (item.type === 'number') {
        newRow[item.id] = 0
      } else if (item.type === 'text') {
        newRow[item.id] = ''
      } else if (item.type === 'date' || item.type === 'datetime') {
        newRow[item.id] = null
      } else newRow[item.id] = ''
    })

    console.log(newRow)
    let childTables: any = form902ca?.childTables || []
    childTables.push('userdetails')
    childTables = childTables.filter(
      (item: any, index: number) => childTables.indexOf(item) === index
    )

    if (Array.isArray(form902ca?.userdetails)) {
      setform902ca((pre: any) => ({
        ...pre,
        childTables,
        userdetails: [...pre?.userdetails, newRow]
      }))
    } else {
      setform902ca((pre: any) => ({ ...pre,     childTables, userdetails: [newRow] }))
    }

    return
  }

  function deleteRow(index: number) {
    let temp: any = form902ca?.userdetails || []
    temp.splice(index, 1)
    setform902ca((pre: any) => ({ ...pre, userdetails: temp }))
  }

  return (
    <div      style={{gridColumn: `2 / 11`,gridRow: `46 / 94`, gap:``, height: `100%`, overflow: 'auto'}} >
     
      <div>
        <div className='flex justify-end p-2'>
          <Button
            onClick={addRow}
            size='s'
            className='flex transform items-center rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
           <Icon data="FaPlus" size={18} />
          </Button>
        </div>
        <div className='relative max-h-[40vh] overflow-y-auto rounded-md border border-gray-200'>
          <table className='min-w-full bg-white'>
            <thead className='sticky top-0 z-10 bg-gray-50'>
              <tr className='border-b border-gray-200 text-sm leading-normal text-gray-600'>
                {dstColumns.map((column: any) => (
                  <th key={column.id} className='px-3 py-1 text-left'>
                    {keyset(column.name || column.id)}
                  </th>
                ))}
                <th className='px-6 py-3 text-left'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-sm font-light text-gray-600'>
              {Array.isArray(form902ca?.userdetails) ? form902ca?.userdetails.map(
                (row: any, index: number) => {
                  const isSelected = false
                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 ${
                        isSelected ? 'bg-orange-200' : 'hover:bg-gray-100'
                      }`}
                    >
                      {dstColumns.map((column: any) => (
                        <td key={column.id} className='px-3 py-1 text-left'>
                          {column.type === 'date' ||
                          column.type === 'datetime' ? (
                            <DatePicker
                              size='s'
                              onUpdate={event => {
                                onRowDataChange(
                                  index,
                                  event,
                                  column.type,
                                  column.id
                                )
                              }}
                            />
                          ) : (
                            <TextInput
                              value={row[column.id]}
                              name={column.id}
                              type={column.type}
                              view='clear'
                              pin='brick-brick'
                              onChange={event => {
                                onRowDataChange(
                                  index,
                                  event.target,
                                  column.type
                                )
                              }}
                            />
                          )}
                        </td>
                      ))}
                      <td className='px-6 py-3 text-left'>
                        <Button size='s' onClick={() => deleteRow(index)}>
                          <Icon data="FaRegTimesCircle" size={18} />
                        </Button>
                      </td>
                    </tr>
                  )
                }
              )
            :null
          }
            </tbody>
          </table>
        </div>
      </div>
      {Object.keys(sumValues).map((items:any,id:any)=>{
        return(
          <div key={id} className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-base font-medium text-gray-900">{items}</span>
            <span className="text-base font-semibold text-gray-900">₹ {sumValues[items]||""}</span>
          </div>
        )
      })}
    </div>
  )
}