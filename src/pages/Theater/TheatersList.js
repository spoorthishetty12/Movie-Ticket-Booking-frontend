import React, { useEffect } from "react"
import { useState } from "react"
import Button from "../../components/Button"
import TheatersForm from "./TheatersForm"
import { DeleteTheater, GetAllTheatersByOwner } from "../../apicalls/theaters"
import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"
import { Table, message } from "antd"

function TheatersList(){
    const { user } = useSelector(state => state.users)
    const [showTheaterFormModel = false, setShowTheaterFormModal] = useState(false)
    const [selectedTheater=null, setSelectedTheater] = useState(null)
    const [formType = "add", setFormType] = useState("add")
    const [theaters = [],setTheaters] = useState([])
    const dispatch = useDispatch()

    const getData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await GetAllTheatersByOwner({
            owner: user._id,
          });
          if (response.success) {
            setTheaters(response.data);
          } else {
            message.error(response.message);
          }
          dispatch(HideLoading());
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };

      const handleDelete = async (id) => {
        try{
        dispatch(ShowLoading())
        const response = await DeleteTheater({theaterId: id})
        if(response.success){
            message.success(response.message)
            getData()
        }else{
            message.error(response.message)
        }
        dispatch(HideLoading())
    }catch(error){
        dispatch(HideLoading)
        message.error(error.message)
    }
      }

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Address",
            dataIndex: "address"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (text, record) =>{
                if(text){
                    return "Approved"
                }else{
                    return "Pending/Blocked"
                }
            }
        },
        {
            title:"Action",
            dataIndex:"action",
            render: (text, record)=>{
                return(
                    <div className = "flex gap-1 items-center">
                        <i className="ri-delete-bin-5-fill"
                            onClick={()=>{
                                handleDelete(record._id)
                            }}
                        ></i>
                        <i className="ri-pencil-fill"
                        onClick={()=>{
                            setFormType("edit")
                            setSelectedTheater(record)
                            setShowTheaterFormModal(true)
                        }}></i>

                        {record.isActive && <span className = "underline">Shows</span>}
                    </div>
                )
            }
        }
    ]

    useEffect(()=>{
        getData()
    },[])
    return(
        <div>
            <div className = "flex justify-end mb-1">
            <Button variant = "outlined" title = "Add Theater"
            onClick={()=>{
                setFormType("add")
                setShowTheaterFormModal(true)
            }}
            />
            </div>

            <Table columns = {columns} dataSource={theaters}/>

        {showTheaterFormModel && <TheatersForm 
            showTheaterFormModel = {showTheaterFormModel}
            setShowTheaterFormModal = {setShowTheaterFormModal}
            formType = {formType}
            setFormType = {setFormType}
            selectedTheater = {selectedTheater}
            setSelectedTheater = {setSelectedTheater} 
            getData = {getData} 
            />  
    }
        </div>

    )
}

export default TheatersList