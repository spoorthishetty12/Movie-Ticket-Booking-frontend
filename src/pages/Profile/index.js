import React from'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import TheatersList from '../Theater/TheatersList'

function Profile() {
    const items = [
        {
          key: '1',
          label: 'Theaters',
          children: <TheatersList/>,
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