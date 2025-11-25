


"use client"
import { RealTheme } from '@gravity-ui/uikit'
import React from 'react'
import { getCookie } from './components/cookieMgment'
export interface TotalContextProps {
  aaf24: any 
  setaaf24: React.Dispatch<React.SetStateAction<any>>
  aaf24Props: any 
  setaaf24Props: React.Dispatch<React.SetStateAction<any>>
  bc87d: any 
  setbc87d: React.Dispatch<React.SetStateAction<any>>
  bc87dProps: any 
  setbc87dProps: React.Dispatch<React.SetStateAction<any>>
  18b45: any,
  set18b45:React.Dispatch<React.SetStateAction<any>>
  18b45Props: any 
  set18b45Props: React.Dispatch<React.SetStateAction<any>>
  38e1a: any,
  set38e1a:React.Dispatch<React.SetStateAction<any>>
  38e1aProps: any 
  set38e1aProps: React.Dispatch<React.SetStateAction<any>>
  addd6f6de: any,
  setaddd6f6de:React.Dispatch<React.SetStateAction<any>>
  addd6f6deProps: any 
  setaddd6f6deProps: React.Dispatch<React.SetStateAction<any>>
  83aee: any,
  set83aee:React.Dispatch<React.SetStateAction<any>>
  83aeeProps: any 
  set83aeeProps: React.Dispatch<React.SetStateAction<any>>
  b003a: any,
  setb003a:React.Dispatch<React.SetStateAction<any>>
  b003aProps: any 
  setb003aProps: React.Dispatch<React.SetStateAction<any>>
  d4690: any,
  setd4690:React.Dispatch<React.SetStateAction<any>>
  d4690Props: any 
  setd4690Props: React.Dispatch<React.SetStateAction<any>>
  02b51: any,
  set02b51:React.Dispatch<React.SetStateAction<any>>
  02b51Props: any 
  set02b51Props: React.Dispatch<React.SetStateAction<any>>
  ef801: any,
  setef801:React.Dispatch<React.SetStateAction<any>>
  ef801Props: any 
  setef801Props: React.Dispatch<React.SetStateAction<any>>
  0db94: any,
  set0db94:React.Dispatch<React.SetStateAction<any>>
  0db94Props: any 
  set0db94Props: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  oprmatrixuf_v1Props: any 
  setoprmatrixuf_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd

  refetch: any,
  setRefetch: React.Dispatch<React.SetStateAction<any>>
  searchParam: string,
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
  disableParam: any,
  setDisableParam: React.Dispatch<React.SetStateAction<any>>
  globalState: any,
  setGlobalState: React.Dispatch<React.SetStateAction<any>>
  // for all textInput validation
  validate: any,
  setValidate: React.Dispatch<React.SetStateAction<any>>

  //its used for validate once again on button click
  validateRefetch: any,
  setValidateRefetch: React.Dispatch<React.SetStateAction<any>>
  accessProfile:any,
  setAccessProfile:React.Dispatch<React.SetStateAction<any>>
  memoryVariables:any
  setMemoryVariables:React.Dispatch<React.SetStateAction<any>>
  property:any
  setProperty:React.Dispatch<React.SetStateAction<any>>
  triggerRefresh: () => void,
  refresh: any ,
  setRefresh: React.Dispatch<React.SetStateAction<any>>
  lockedData: any,
  setLockedData: React.Dispatch<React.SetStateAction<any>>
  paginationDetails: any,
  setpaginationDetails: React.Dispatch<React.SetStateAction<any>>
  eventEmitterData:any,
  setEventEmitterData:React.Dispatch<React.SetStateAction<any>>
  userDetails:any,
  setUserDetails:React.Dispatch<React.SetStateAction<any>>
  encAppFalg:any,
  setEncAppFalg:React.Dispatch<React.SetStateAction<any>>,
  selectedTheme: RealTheme,
  setSelectedTheme: React.Dispatch<React.SetStateAction<RealTheme>>
}

export const TotalContext = React.createContext<TotalContextProps | {}>({})

const GlobalContext = ({children} : {children: React.ReactNode}) => {
      //////////
        const [aaf24, setaaf24 ] = React.useState<any>({}) 
    const [aaf24Props, setaaf24Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[]
      }) 
        const [bc87d, setbc87d ] = React.useState<any>({}) 
    const [bc87dProps, setbc87dProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[]
      }) 
   const [18b45,set18b45] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [38e1a,set38e1a] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [addd6f6de,setaddd6f6de] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [83aee,set83aee] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [b003a,setb003a] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [d4690,setd4690] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [02b51,set02b51] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [ef801,setef801] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [0db94,set0db94] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
    ///////////
    const [refresh, setRefresh] = React.useState<any>({       qrcode18b45:false,
       timeline38e1a:false,
       buttonAddd6f6de:false,
       barchart83aee:false,
       datepickerb003a:false,
       companycardd4690:false,
       radiobutton02b51:false,
       textareaef801:false,
       checkbox0db94:false,
       groupaaf24:false,
       groupbc87d:false,
      })

  ////// screen states 
   const [oprmatrixuf_v1Props,setoprmatrixuf_v1Props] = React.useState<any>([])

///////// dfd
    const [searchParam , setSearchParam] = React.useState<string>("")
    const [disableParam , setDisableParam] = React.useState<any>({})
    const [globalState , setGlobalState] = React.useState<any>({})
    const [refetch, setRefetch] = React.useState<any>(false)
    const [validate, setValidate] = React.useState<any>({});
    const [validateRefetch, setValidateRefetch] = React.useState<any>({
      value:false,
      init:0
    })
    const [accessProfile, setAccessProfile] = React.useState<any>([])
    const [property, setProperty] = React.useState<any>({})
    const [memoryVariables, setMemoryVariables] = React.useState<any>({})
    const [lockedData, setLockedData] = React.useState<any>({})
    const [paginationDetails, setpaginationDetails] = React.useState<any>({})

    const [eventEmitterData,setEventEmitterData] = React.useState<any>([])
    const [userDetails , setUserDetails] = React.useState<any>({})
    const [encAppFalg , setEncAppFalg] = React.useState<any>({})
    const theme = getCookie('cfg_theme')
    const [selectedTheme , setSelectedTheme] = React.useState<RealTheme>(theme || "")
    
    
  return (
    <TotalContext.Provider 
      value={
      {
      //
        aaf24, 
        setaaf24,
        aaf24Props, 
        setaaf24Props,
        bc87d, 
        setbc87d,
        bc87dProps, 
        setbc87dProps,
        18b45,
        set18b45, 
        38e1a,
        set38e1a, 
        addd6f6de,
        setaddd6f6de, 
        83aee,
        set83aee, 
        b003a,
        setb003a, 
        d4690,
        setd4690, 
        02b51,
        set02b51, 
        ef801,
        setef801, 
        0db94,
        set0db94, 
        ////// screen states 
          oprmatrixuf_v1Props,
          setoprmatrixuf_v1Props,
        //////////

        ///////// dfd
        refetch,
        setRefetch,
        searchParam,
        setSearchParam,
        disableParam,
        setDisableParam,
        globalState,
        setGlobalState,
        validate,
        setValidate,
        validateRefetch,
        setValidateRefetch,
        accessProfile,
        setAccessProfile,
        property,
        setProperty,
        setRefresh,
        refresh,
        memoryVariables,
        setMemoryVariables,
        lockedData,
        setLockedData,
        paginationDetails,
        setpaginationDetails,
        eventEmitterData,
        setEventEmitterData,
        userDetails,
        setUserDetails,
        encAppFalg,
        setEncAppFalg,
        selectedTheme, 
        setSelectedTheme
        }}
      >
      {children}
    </TotalContext.Provider>
  )
}

export default GlobalContext