import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import axios from '../api'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await axios.get('/api/get_user_notifications')
      setNotifications(data)
    }
    fetchNotifications()
  }, [])

  return (
    <Dropdown
      icon={'large bell outline'}
      style={{ marginTop: '10px', marginRight: '20px' }}
    >
      {!notifications.length ? (
        <Dropdown.Menu>
          <Dropdown.Item text={'You do not have any notifications!'} />
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu>
          {notifications.map((notification) => (
            <Dropdown.Item text={notification[1]} />
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  )
}

export default Notifications
