import React from'react'
import PageTitle from '../../components/PageTitle'
import Bookings from './Bookings';
import { Tabs } from 'antd';

function Profile() {
  const items = [
    {
      key: '1',
      label: 'Bookings',
      children: <Bookings />,
    }
]
    return (
      <div>
        <PageTitle title="Profile" />
        <Tabs defaultActiveKey="1" items={items}  />
    </div>
    )
  }

  export default Profile;  