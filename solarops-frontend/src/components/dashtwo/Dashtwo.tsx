import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const PURPLE = '#5D46B6';
const PAGE_BG = '#EEF0F4';
const CARD_BLUE = 'linear-gradient(135deg, #CCF0F5 0%, #E3F7FB 100%)';
const CARD_PINK = 'linear-gradient(135deg, #FFE0E9 0%, #FFF0F4 100%)';

const salesData = [
  { name: 'Week 1', blue: 42, pink: 35 },
  { name: 'Week 2', blue: 55, pink: 48 },
  { name: 'Week 3', blue: 68, pink: 58 },
  { name: 'Week 4', blue: 78, pink: 72 },
];

const visitorsData = [
  { day: 'Mon', v: 32 },
  { day: 'Tue', v: 45 },
  { day: 'Wed', v: 38 },
  { day: 'Thu', v: 52 },
  { day: 'Fri', v: 48 },
  { day: 'Sat', v: 41 },
  { day: 'Sun', v: 36 },
];

const topProducts = [
  { n: 1, name: 'Tshirt Levis', price: '$ 120,00', img: 'https://picsum.photos/seed/fs1/56/56' },
  { n: 2, name: 'Long jeans jacket', price: '$ 340,00', img: 'https://picsum.photos/seed/fs2/56/56' },
  { n: 3, name: 'Sport shoes Nike', price: '$ 210,00', img: 'https://picsum.photos/seed/fs3/56/56' },
  { n: 4, name: 'Backpack Urban', price: '$ 89,00', img: 'https://picsum.photos/seed/fs4/56/56' },
];

const navItems = [
  { label: 'Dashboard', icon: DashboardOutlinedIcon, active: true },
  { label: 'Orders', icon: ShoppingBagOutlinedIcon, active: false },
  { label: 'Products', icon: Inventory2OutlinedIcon, active: false },
  { label: 'Marketing', icon: CampaignOutlinedIcon, active: false },
  { label: 'Rates', icon: PercentOutlinedIcon, active: false },
  { label: 'Reports', icon: AssessmentOutlinedIcon, active: false },
];

function SalesTooltip({ active }: { active?: boolean; payload?: unknown[]; label?: string }) {
  if (!active) return null;
  return (
    <Box
      sx={{
        bgcolor: PURPLE,
        color: '#fff',
        px: 2,
        py: 1.25,
        borderRadius: '14px',
        boxShadow: '0 8px 24px rgba(93, 70, 182, 0.35)',
        fontSize: 13,
        fontFamily: 'Inter, Roboto, sans-serif',
      }}
    >
      <Typography sx={{ fontSize: 11, opacity: 0.9, mb: 0.5 }}>10.06 - 17.06.2020</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: 15 }}>$ 7 320,89</Typography>
    </Box>
  );
}

export type DashtwoProps = {
  onClose: () => void;
};

export default function Dashtwo({ onClose }: DashtwoProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        fontFamily: '"Inter", "Roboto", sans-serif',
        overflow: 'hidden',
        bgcolor: PAGE_BG,
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close dashboard preview"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 20,
          bgcolor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
          '&:hover': { bgcolor: '#fff' },
        }}
        size="small"
      >
        <CloseIcon sx={{ color: PURPLE }} />
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: 200, sm: 228 },
          flexShrink: 0,
          bgcolor: PURPLE,
          display: 'flex',
          flexDirection: 'column',
          py: 3,
          px: 0,
          minHeight: '100vh',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 2.5, mb: 4 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.25)',
              border: '2px solid rgba(255,255,255,0.5)',
            }}
          />
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.02em',
            }}
          >
            ForShop
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 1.35,
                  pl: 2.5,
                  pr: 1,
                  cursor: 'pointer',
                  ...(item.active
                    ? {
                        bgcolor: '#fff',
                        color: PURPLE,
                        borderRadius: '0 28px 28px 0',
                        mr: 0,
                        boxShadow: '4px 4px 20px rgba(0,0,0,0.08)',
                      }
                    : {
                        color: 'rgba(255,255,255,0.82)',
                        '&:hover': { color: '#fff' },
                      }),
                }}
              >
                <Icon sx={{ fontSize: 22, opacity: item.active ? 1 : 0.95 }} />
                <Typography sx={{ fontWeight: item.active ? 600 : 500, fontSize: 15 }}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 11,
            px: 2.5,
            mt: 'auto',
          }}
        >
          © 2020 ForShop
        </Typography>
      </Box>

      {/* Main */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 2.5, md: 3 },
          minWidth: 0,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '28px',
            p: { xs: 2.5, sm: 3, md: 3.5 },
            boxShadow: '0 12px 40px rgba(93, 70, 182, 0.08), 0 4px 12px rgba(0,0,0,0.04)',
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          {/* Header row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 22, sm: 26 },
                color: '#2D2A45',
                letterSpacing: '-0.02em',
              }}
            >
              Welcome, Damian
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end', minWidth: 260 }}>
              <TextField
                placeholder="Search for products..."
                size="small"
                sx={{
                  maxWidth: 340,
                  flex: '1 1 200px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    bgcolor: '#F3F4F8',
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                  },
                  '& input': { fontSize: 14, py: 1.1 },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: '#9CA3AF', fontSize: 22 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton
                sx={{
                  bgcolor: '#F3F4F8',
                  width: 44,
                  height: 44,
                  position: 'relative',
                }}
              >
                <NotificationsNoneIcon sx={{ color: PURPLE }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: PURPLE,
                  }}
                />
              </IconButton>
              <Box
                component="img"
                src="https://picsum.photos/seed/avatar/96/96"
                alt=""
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #F3F4F8',
                }}
              />
            </Box>
          </Box>

          {/* Summary cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                background: CARD_BLUE,
                borderRadius: '22px',
                p: 2.5,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(100, 180, 200, 0.15)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DescriptionOutlinedIcon sx={{ color: PURPLE, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 28, color: '#2D2A45', lineHeight: 1.1 }}>
                    23 789
                  </Typography>
                  <Typography sx={{ color: '#6B7280', fontSize: 14, mt: 0.5 }}>Orders</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: PURPLE,
                  color: '#fff',
                  px: 1.25,
                  py: 0.5,
                  borderRadius: '10px',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                +20
              </Box>
            </Box>

            <Box
              sx={{
                background: CARD_PINK,
                borderRadius: '22px',
                p: 2.5,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(230, 150, 170, 0.18)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '16px',
                    bgcolor: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SavingsOutlinedIcon sx={{ color: PURPLE, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 26, color: '#2D2A45', lineHeight: 1.1 }}>
                    $ 12 890,89
                  </Typography>
                  <Typography sx={{ color: '#6B7280', fontSize: 14, mt: 0.5 }}>Profit</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: PURPLE,
                  color: '#fff',
                  px: 1.25,
                  py: 0.5,
                  borderRadius: '10px',
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                +$ 840,00
              </Box>
            </Box>
          </Box>

          {/* Charts row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1.45fr 1fr' },
              gap: 2.5,
              alignItems: 'stretch',
            }}
          >
            {/* Sales statistics */}
            <Box
              sx={{
                borderRadius: '22px',
                border: '1px solid #EEF0F6',
                p: 2.5,
                minHeight: 320,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#2D2A45' }}>
                  Sales statistics
                </Typography>
                <Select
                  defaultValue="Monthly"
                  size="small"
                  sx={{
                    borderRadius: '12px',
                    fontSize: 13,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  }}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: '100%', height: 260 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[20, 100]}
                      tick={{ fontSize: 12, fill: '#9CA3AF' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<SalesTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="blue"
                      stroke="#7EC8E3"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#7EC8E3', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pink"
                      stroke="#F5A3C7"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#F5A3C7', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            {/* Right column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box
                sx={{
                  borderRadius: '22px',
                  border: '1px solid #EEF0F6',
                  p: 2.5,
                  flex: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 17, color: '#2D2A45' }}>
                    Top selling products
                  </Typography>
                  <Typography
                    sx={{
                      color: PURPLE,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    See all &gt;
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
                  {topProducts.map((p) => (
                    <Box
                      key={p.n}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Typography sx={{ color: '#9CA3AF', fontWeight: 600, width: 20, fontSize: 14 }}>
                        {p.n}
                      </Typography>
                      <Box
                        component="img"
                        src={p.img}
                        alt=""
                        sx={{ width: 44, height: 44, borderRadius: '12px', objectFit: 'cover' }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 14, color: '#374151', fontWeight: 500 }} noWrap>
                          {p.name}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#2D2A45' }}>{p.price}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  borderRadius: '22px',
                  border: '1px solid #EEF0F6',
                  p: 2.5,
                  flex: 1,
                  minHeight: 200,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 17, color: '#2D2A45' }}>
                    Unique visitors
                  </Typography>
                  <Select
                    defaultValue="Weekly"
                    size="small"
                    sx={{
                      borderRadius: '12px',
                      fontSize: 13,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                    }}
                  >
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ width: '100%', height: 160 }}>
                  <ResponsiveContainer>
                    <AreaChart data={visitorsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={PURPLE} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={PURPLE} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F6" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#9CA3AF' }}
                        axisLine={false}
                        tickLine={false}
                        ticks={[25, 50]}
                        tickFormatter={(v) => `${v}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: 'none',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={PURPLE}
                        strokeWidth={2}
                        fill="url(#uvGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
