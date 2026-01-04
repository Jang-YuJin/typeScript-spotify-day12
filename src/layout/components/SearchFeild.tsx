import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './SearchFeild.style.css'

const SearchFeild = () => {
  return (
    <div>
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{color: 'white'}}/>
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        sx={{
            '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '& fieldset': {
                    borderRadius: '24px'
                }
            },
            width: '200px'
        }}
        placeholder='검색어를 입력하세요.'
      />
    </div>
  )
}

export default SearchFeild
