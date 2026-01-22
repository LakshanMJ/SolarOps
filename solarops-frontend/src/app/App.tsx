import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '@/components/layout/Header'
import SideBar from '@/components/layout/SideBar'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ✅ HEADER — FULL WIDTH */}
      <Header />

      {/* ✅ BODY — SIDEBAR + CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* SIDEBAR (starts under header) */}
        <SideBar />

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            minWidth: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default App
