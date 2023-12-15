import React from'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import TheatersList from './TheatersList'

function Theater() {
    const items = [
        {
          key: '1',
          label: 'Theaters',
          children: <TheatersList/>,
        }
    ]
    return (
      <div>
        <PageTitle title="Theater" />
        <Tabs defaultActiveKey="1" items={items}  />    
    </div>
    )
  }

  export default Theater;  