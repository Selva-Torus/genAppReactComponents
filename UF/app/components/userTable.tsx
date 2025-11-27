import React, { useEffect, useMemo, useState } from 'react'
import {Table} from '@gravity-ui/uikit'
import { AxiosService } from '@/app/components/axiosService'
import { getCookie } from '@/app/components/cookieMgment'
import { useInfoMsg } from '@/app/components/infoMsgHandler'
import UserCreationModal from './userCreationModal'
import { SetupScreenContext, SetupScreenContextType } from './setup'
import { useGravityThemeClass } from '../utils/useGravityUITheme'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { Pagination } from '@/components/Pagination'
import { Icon } from '@/components/Icon'

export interface UserData {
  users: string
  email: string
  firstName: string
  lastName: string
  loginId: string
  accessProfile: string[]
  accessExpires: string
  dateAdded: string
  profile: string
  noOfProductsService: number
  lastActive: string
  edit: string
  mobile?: string
  isAppAdmin?: boolean
}

const CustomTable = Table

const UserTable: React.FC<{
  data: UserData[]
  setData: React.Dispatch<React.SetStateAction<UserData[]>>
}> = ({ data, setData }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const toast = useInfoMsg()
  const [accessProfiles, setAccessProfiles] = useState<any>({})
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [editUserModalOpen, setEditUserModalOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [newUser, setNewUser] = useState({})
  const { selectedRows, setSelectedRows, searchTerm } = React.useContext(
    SetupScreenContext
  ) as SetupScreenContextType
  const userDataPerPage = 11
  const themeClass = useGravityThemeClass()

  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const formattedDate = date.toLocaleDateString('en-US', options)
    const time = date.toLocaleTimeString('en-US', { hour12: false }) // 24-hour format HH:MM:SS
    if (isNaN(date.getTime())) {
      return 'NA'
    }
    return `${formattedDate} | ${time}`
  }

  const filteredData = Object.entries(data)
    .filter(([key, value]) => {
      if (typeof value === 'string') {
        return (value as string)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      } else if (Array.isArray(value)) {
        return value.some(role => {
          return Object.values(role).some(val => {
            return (
              typeof val === 'string' &&
              val.toLowerCase().includes(searchTerm.toLowerCase())
            )
          })
        })
      } else {
        return Object.values(value as any).some(val => {
          if (typeof val === 'string') {
            return val.toLowerCase().includes(searchTerm.toLowerCase())
          } else if (Array.isArray(val)) {
            return val.some(role => {
              return Object.values(role).some(v => {
                return (
                  typeof v === 'string' &&
                  v.toLowerCase().includes(searchTerm.toLowerCase())
                )
              })
            })
          }
        })
      }
    })
    .map(([key, value], index) => ({ ...(value as any), originalIndex: key }))

  const currentGroups = useMemo(() => {
    const indexOfLastGroup = currentPage * userDataPerPage
    const indexOfFirstGroup = indexOfLastGroup - userDataPerPage

    return filteredData.slice(indexOfFirstGroup, indexOfLastGroup)
  }, [data, filteredData, setData, currentPage, searchTerm])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / userDataPerPage)
  }, [data, filteredData, currentPage, userDataPerPage])

  const handledatachange = (
    item: UserData,
    key: keyof UserData,
    value: any
  ) => {
    const updatedData = data.map(user => {
      if (user.email === item.email) {
        if (key == 'accessProfile') {
          let noOfProductsService: any = 0
          ;(value as string[]).forEach(selectedProfiles => {
            noOfProductsService += accessProfiles[selectedProfiles]
          })
          return { ...user, [key]: value, noOfProductsService }
        }
        return { ...user, [key]: value }
      }
      return user
    })
    setData(updatedData)
  }

  const getAccessProfiles = async () => {
    try {
      const res = await AxiosService.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/getAppAccessProfiles`,
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`
          }
        }
      )
      if (res.status === 200) {
        setAccessProfiles(res.data)
      }
    } catch (error) {
      toast('Error Fetching Access Profiles', 'danger')
    }
  }

  useEffect(() => {
    getAccessProfiles()
  }, [])

  const handleRowSelection = (indices: string[]) => {
    let updatedIndices = indices
    if (currentPage !== 1) {
      updatedIndices = indices.map(index =>
        String(Number(index) + userDataPerPage * (currentPage - 1))
      )
    }
    if (updatedIndices.length > 0) {
      const selectedEmails = new Set<string>()
      data.forEach((item, index) => {
        if (updatedIndices.includes(index.toString())) {
          selectedEmails.add(item.email)
        }
      })
      setSelectedRows(selectedEmails)
    } else {
      setSelectedRows(new Set([]))
    }
  }

  const getSelectedIds = useMemo(() => {
    const selectedIndicess = new Set<string>()
    data.forEach((item, index) => {
      if (selectedRows.has(item.email)) {
        if (currentPage == 1) {
          selectedIndicess.add(index.toString())
        } else {
          let indexToAdd = Number(index) - userDataPerPage * (currentPage - 1)
          selectedIndicess.add(indexToAdd.toString())
        }
      }
    })
    return Array.from(selectedIndicess)
  }, [selectedRows, currentPage])

  const columns = [
    {
      id: 'profile',
      name: '',
      width: 60,
      align: 'center',
      template: (item: any) =>
        item.profile ? (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden'
            }}
            className='border rounded-full'
          >
            <img
              src={item.profile}
              alt='Profile'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                ;(e.target as HTMLImageElement).src = ''
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              // backgroundColor: '#f0f1f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='border rounded-full'
          >
            <Text variant='subheader-1'>
              {item.firstName?.charAt(0)}
              {item.lastName?.charAt(0)}
            </Text>
          </div>
        )
    },
    {
      id: 'users',
      name: 'User',
      width: 150,
      template: (item: any) => (
        <div className='flex flex-col'>
          <Text variant='subheader-2'>
            {item.firstName} {item.lastName}
          </Text>
          <Text variant='caption-1' color='secondary'>
            {item.email}
          </Text>
          {item.mobile && (
            <Text variant='caption-2' color='secondary'>
              {item.mobile}
            </Text>
          )}
        </div>
      )
    },
    {
      id: 'accessProfile',
      name: 'Access Profile',
      width: 150,
      template: (item: any) => {
        return (
          <Text>
            {item.accessProfile && item.accessProfile.length === 0
              ? 'No Template Available'
              : item.accessProfile.length > 1
              ? 'Multiple Template'
              : item.accessProfile}
          </Text>
        )
      }
    },
    {
      id: 'noOfProductsService',
      name: 'No. of Products/service',
      width: 200,
      align: 'center'
    },
    {
      id: 'accessExpires',
      name: 'Access Expires',
      width: 210,
      template: (item: any) => (
        <div className='flex flex-col'>
          <div className={`flex rounded-md`}>
            <form onSubmit={e => e.preventDefault()}>
              <input
                className='cursor-pointer rounded border px-2 py-1'
                style={{
                  backgroundColor: 'var(--g-color-base-background)',
                  color: 'var(--g-color-text-primary)',
                  borderColor: 'var(--g-color-line-generic)'
                }}
                type='date'
                defaultValue={item.accessExpires}
                min={new Date().toISOString().split('T')[0]}
                onChange={e =>
                  handledatachange(item, 'accessExpires', e.target.value)
                }
              />
            </form>
          </div>
        </div>
      )
    },
    {
      id: 'lastActive',
      name: 'Last Active',
      width: 220,
      template: (item: any) => (
        <Text variant='body-2'>
          {!item.lastActive || item.lastActive === 'NA'
            ? 'NA'
            : formatDate(item.lastActive)}
        </Text>
      )
    },
    {
      id: 'dateAdded',
      name: 'Date Added',
      width: 220,
      align: 'start',
      template: (item: any) => (
        <Text variant='body-2'>
          {!item.dateAdded || item.dateAdded === 'NA'
            ? 'NA'
            : formatDate(item.dateAdded)}
        </Text>
      )
    },
    {
      id: 'edit',
      name: 'action',
      width: 100,
      align: 'center',
      template: (item: any) => (
        <div className='flex flex-col items-center gap-2'>
          <Button
            onClick={() => {
              setEditUserModalOpen(true)
              setUserData(item)
            }}
            view='flat'
          >
            <Icon data='FaPencilAlt' size={18} />
          </Button>
          <Modal
            className='w-[1000px] lg:min-w-[900px]'
            onClose={() => setEditUserModalOpen(false)}
            open={editUserModalOpen}
            closeOnOverlayClick
            showCloseButton={false}
          >
            <UserCreationModal
              setModalOpen={setEditUserModalOpen}
              newUser={userData}
              setNewUser={setUserData}
              accessProfiles={accessProfiles}
              data={data}
              setData={setData}
              isEdit={true}
            />
          </Modal>
        </div>
      )
    }
  ]

  return (
    <div className={`g-root h-[80vh] w-full ${themeClass}`}>
      <div>
        <button
          id='tanantUser-creation-btn'
          className='hidden'
          onClick={() => setAddUserModalOpen(true)}
        >
          userCreationButton
        </button>
        <Modal
          className='w-[1000px] lg:min-w-[900px]'
          open={addUserModalOpen}
          onClose={() => setAddUserModalOpen(false)}
          closeOnOverlayClick
          showCloseButton={false}
        >
          <UserCreationModal
            setModalOpen={setAddUserModalOpen}
            newUser={newUser}
            setNewUser={setNewUser}
            accessProfiles={accessProfiles}
            data={data}
            setData={setData}
          />
        </Modal>
      </div>
      <Text variant='header-1'>{'User Management'}</Text>
      <CustomTable
        className='mt-5 h-[73vh]'
        data={currentGroups}
        columns={columns as any}
        emptyMessage='No data available'
      />
      <Pagination
        className='mt-1 justify-center'
        page={currentPage}
        pageSize={userDataPerPage}
        onUpdate={setCurrentPage}
        total={data.length}
        compact={true}
      />
    </div>
  )
}

export default UserTable
