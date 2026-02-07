import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '@/components/layout/Header'
import SideBar from '@/components/layout/SideBar'
import { GlobalStyles } from '@mui/material'

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
      <Header />

      <GlobalStyles
        styles={{
          /* Webkit browsers (Chrome, Edge, Opera) */
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(255, 166, 0, 0.38)',
          },

          /* Firefox */
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--accent-primary) transparent',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
        }}
      >

        <SideBar />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
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
