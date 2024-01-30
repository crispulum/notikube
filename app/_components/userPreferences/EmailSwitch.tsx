'use client'

import * as React from 'react';
import Switch from '@mui/material/Switch';
import {useState, useEffect} from 'react';
import { FormControlLabel } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import { User } from '../../../types/definitions';


const EmailSwitch = () => {

  const session = useSession().data;
  const userId = session?.user?.userid;

  const [checked, setChecked] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  async function getStatus(user_id:(string | undefined)) {
    if (userId !== undefined) {
    console.log('userId', user_id)
    let res = await fetch(`http://localhost:3000/api/getUser/${userId}`)
    const data: User = await res.json();
    console.log('data', data)
    setChecked(data.email_status)
    setLoading(false)
  }
}

  useEffect(() => {
    if (userId !== undefined) {
    getStatus(userId);
  }},[userId]
);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    console.log('status', checked)
    fetch('http://localhost:3000/api/updateUser/email', {
      method:'POST',
      body: JSON.stringify({user_id: userId, status: checked})
    })
  };

  const RedSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: red[600],
      '&:hover': {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: red[600],
    },
  }));

  // while (loading) {
  //   return <div>loading ...</div>
  // }

  return (
    <FormControlLabel
      control={<RedSwitch
      checked={checked}
      onChange={handleChange}
      inputProps={{'aria-label': 'controlled'}}
    />}
    label={'Email Notifications'}
    />
  )
}

export default EmailSwitch;