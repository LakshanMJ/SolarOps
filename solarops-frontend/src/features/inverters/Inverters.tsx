import {
  Box,
  Typography,
  Stack,
  Chip,
  Drawer,
  Divider,
  Select,
  MenuItem,
  TextField,
  List,
} from '@mui/material'
import { useState, useMemo, useEffect } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

/* ========================
   Types
======================== */

export type Inverter = {
  id: string
  site: string
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  outputKw: number
  temperature: number
  pr: number
  lastUpdate: string
  activeAlerts: number
}

/* ========================
   Helper to generate initial data
======================== */

const generateInitialData = (): Inverter[] =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `INV-${1000 + i}`,
    site: `Site ${Math.floor(i / 10) + 1}`,
    status: ['HEALTHY', 'WARNING', 'CRITICAL'][Math.floor(Math.random() * 3)] as Inverter['status'],
    outputKw: Math.floor(Math.random() * 500),
    temperature: Math.floor(Math.random() * 80),
    pr: +(Math.random() * 100).toFixed(1),
    lastUpdate: new Date().toISOString(),
    activeAlerts: Math.floor(Math.random() * 5),
  }))

/* ========================
   Page
======================== */

const InvertersPage = () => {
  const [selected, setSelected] = useState<Inverter | null>(null)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Inverter[]>(generateInitialData())

  /* ========================
     Simulate WebSocket Updates
  ======================== */

  useEffect(() => {
    const wsSimulator = setInterval(() => {
      setData(prev =>
        prev.map(inv => {
          if (Math.random() > 0.2) return { ...inv } // spread to create a new reference
          return {
            ...inv,
            status: ['HEALTHY', 'WARNING', 'CRITICAL'][Math.floor(Math.random() * 3)] as Inverter['status'],
            outputKw: Math.floor(Math.random() * 500),
            temperature: Math.floor(Math.random() * 80),
            pr: +(Math.random() * 100).toFixed(1),
            activeAlerts: Math.floor(Math.random() * 5),
            lastUpdate: new Date().toISOString(),
          }
        })
      )

    }, 5000) // every 5 seconds

    return () => clearInterval(wsSimulator)
  }, [])

  /* ========================
     Filters
  ======================== */

  const filtered = useMemo(() => {
    return data.filter(inv => {
      if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false
      if (search && !inv.id.toLowerCase().includes(search.toLowerCase()))
        return false
      return true
    })
  }, [data, statusFilter, search])

  /* ========================
     Table Columns
  ======================== */

  const columns = useMemo<ColumnDef<Inverter>[]>(() => [
    {
      header: 'Inverter ID',
      accessorKey: 'id',
      cell: info => <Typography fontFamily="monospace">{info.getValue<string>()}</Typography>,
    },
    { header: 'Site', accessorKey: 'site' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: info => {
        const v = info.getValue<string>()
        const color =
          v === 'HEALTHY' ? 'success' : v === 'WARNING' ? 'warning' : 'error'
        return <Chip size="small" color={color} label={v} />
      },
    },
    { header: 'Output (kW)', accessorKey: 'outputKw', cell: info => info.getValue<number>().toFixed(0) },
    { header: 'Temp (°C)', accessorKey: 'temperature', cell: info => info.getValue<number>().toFixed(1) },
    { header: 'PR (%)', accessorKey: 'pr', cell: info => `${info.getValue<number>().toFixed(1)}%` },
    {
      header: 'Alerts',
      accessorKey: 'activeAlerts',
      cell: info => (
        <Typography color={info.getValue<number>() > 0 ? 'error' : 'text.secondary'}>
          {info.getValue<number>()}
        </Typography>
      ),
    },
    {
      header: 'Last Update',
      accessorKey: 'lastUpdate',
      cell: info => <Typography color="text.secondary">{info.getValue<string>()}</Typography>,
    },
  ], [])

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  /* ========================
     Render
  ======================== */

  return (
    <Box p={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h6">Inverters</Typography>
          <Typography variant="body2">
            Operational inverter assets across all sites
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="HEALTHY">Healthy</MenuItem>
            <MenuItem value="WARNING">Warning</MenuItem>
            <MenuItem value="CRITICAL">Critical</MenuItem>
          </Select>

          <TextField
            size="small"
            placeholder="Search inverter ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Stack>
      </Stack>

      {/* Table */}
      <Box border="1px solid #e0e0e0" borderRadius={1}>
        {/* Header */}
        <Stack direction="row" px={2} py={1} bgcolor="#fafafa">
          {table.getHeaderGroups().map(hg =>
            hg.headers.map(h => (
              <Box key={h.id} flex={1}>
                <Typography variant="caption" fontWeight={600}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </Typography>
              </Box>
            ))
          )}
        </Stack>

        <Divider />

        {/* Virtualized Rows */}
        <List
          key={filtered.length} // force re-render whenever rows change
          height={520}
          itemCount={table.getRowModel().rows.length}
          itemSize={48}
          width="100%"
        >
          {({ index, style }) => {
            const row = table.getRowModel().rows[index]
            return (
              <Stack
                style={style}
                direction="row"
                px={2}
                alignItems="center"
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                onClick={() => setSelected(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <Box key={cell.id} flex={1}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Stack>
            )
          }}
        </List>
      </Box>

      {/* Slide-over */}
      <Drawer anchor="right" open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <Box width={420} p={3}>
            <Typography variant="h6">{selected.id}</Typography>
            <Typography color="text.secondary" mb={2}>
              Site: {selected.site}
            </Typography>

            <Chip
              color={
                selected.status === 'HEALTHY'
                  ? 'success'
                  : selected.status === 'WARNING'
                    ? 'warning'
                    : 'error'
              }
              label={selected.status}
            />

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Metric label="Current Output" value={`${selected.outputKw} kW`} />
              <Metric label="Temperature" value={`${selected.temperature} °C`} />
              <Metric label="PR" value={`${selected.pr}%`} />
              <Metric label="Active Alerts" value={selected.activeAlerts} />
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}

export default InvertersPage

/* ========================
   Helpers
======================== */

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={500}>{value}</Typography>
    </Stack>
  )
}
