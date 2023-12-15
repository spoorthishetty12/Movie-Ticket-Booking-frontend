import { Form, Modal, message } from "antd"
import React from "react"
import Button from "../../components/Button"
import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"
import { AddTheater, UpdateTheater } from "../../apicalls/theaters"

function TheatersForm(props) {
    const { showTheaterFormModel, setShowTheaterFormModal, formType, setFormType, selectedTheater, setSelectedTheater, getData } = props
    const { user } = useSelector(state => state.users)
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        values.owner = user._id
        try {
            dispatch(ShowLoading())
            let response = null
            if (formType === "add") {
                response = await AddTheater(values)
            } else {
                values.theaterId = selectedTheater._id
                response = await UpdateTheater(values)
            }

            if (response.success) {
                message.success(response.message)
                setShowTheaterFormModal(false)
                setSelectedTheater(null)
                getData()
            } else {
                message.error(response.message)
            }
            dispatch(HideLoading())
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    return (
        <Modal
            title={formType === "add" ? "Add Theater" : "Edit Theater"}
            open={showTheaterFormModel}
            onCancel={() => {
                setShowTheaterFormModal(false)
                setSelectedTheater(null)
            }}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={selectedTheater}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your theater name!" }]}
                >
                    <input type="text" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please input your address!" }]}
                >
                    <textarea type="text" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                    <input type="text" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <input type="text" />
                </Form.Item>
                <div className="flex justify-end gap-1">
                    <Button title="Cancel"
                        variant="outlined"
                        type="button"
                        onClick={() => {
                            setShowTheaterFormModal(false);
                            setSelectedTheater(null)
                        }}
                    />
                    <Button title="Save" type="submit" />
                </div>
            </Form>

        </Modal>
    )
}

export default TheatersForm