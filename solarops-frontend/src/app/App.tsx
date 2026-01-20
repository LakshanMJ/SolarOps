import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '@/components/layout/Header'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* Sidebar goes here later */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Header />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default App
