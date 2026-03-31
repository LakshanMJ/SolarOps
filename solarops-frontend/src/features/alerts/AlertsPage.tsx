import { Box, Typography, Chip } from '@mui/material';
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { useEffect, useState } from 'react';
import { BACKEND_URLS } from '@/backendUrls';
import { fetchData } from '@/utils/fetch';
import SolarChip from '@/utils/SolarStatusChip';
import StatusChip from '@/utils/SolarStatusChip';


const alertsData = [
   {
      "id": "aa790007-c705-49e1-8ce1-68108a0970de",
      "inverterId": "be798ebb-d433-4e34-aff9-23d402a435cc",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Remote firmware reboot initiated; dispatching technician for string voltage check.",
      "createdAt": "2026-03-31T13:30:00.316Z",
      "inverter": {
         "name": "RD-INV-02",
         "site": { "name": "Solar Ops – Red Dune" }
      }
   },
   {
      "id": "3c0b9169-6289-4a02-bd9a-2d72e00ad01b",
      "inverterId": "debed726-b400-4be8-8537-65300c6aaa91",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": null,
      "createdAt": "2026-03-31T13:30:00.311Z",
      "inverter": {
         "name": "RD-INV-01",
         "site": { "name": "Solar Ops – Red Dune" }
      }
   },
   {
      "id": "30a59031-277e-4063-9393-f9e40e748f51",
      "inverterId": "debed726-b400-4be8-8537-65300c6aaa91",
      "message": "Inverter status worsened from Online to Degraded",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Manual inspection of DC connectors required due to suspected thermal expansion issues.",
      "createdAt": "2026-03-31T13:30:00.309Z",
      "inverter": {
         "name": "RD-INV-01",
         "site": { "name": "Solar Ops – Red Dune" }
      }
   },
   {
      "id": "7fee761c-5e03-4e30-b279-a5b2b5ed106c",
      "inverterId": "070f1b1c-40e4-4907-8ca5-55f0645bf54c",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Checking grid-tie synchronization logs for frequency instability.",
      "createdAt": "2026-03-31T13:30:00.302Z",
      "inverter": {
         "name": "Z-INV-01",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "d3069bcb-7ba8-498b-abc1-dae6d6b54970",
      "inverterId": "debed726-b400-4be8-8537-65300c6aaa91",
      "message": "Status changed from Online to Degraded",
      "severity": "Warning",
      "status": "Open",
      "maintenanceAction": "Scheduled fan replacement for next routine maintenance cycle.",
      "createdAt": "2026-03-31T13:30:00.302Z",
      "inverter": {
         "name": "RD-INV-01",
         "site": { "name": "Solar Ops – Red Dune" }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Closed",
      "maintenanceAction": "Replaced blown 400V fuse; system verified and returned to full load.",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Closed",
      "maintenanceAction": "Cleared debris from air intake vents; operating temperatures normalized.",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Escalated to Site Manager; ground fault suspected in Sub-Array B.",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": null,
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": { "name": "Solar Ops – Delta" }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Monitoring local cloud cover impact before sending onsite team.",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Analyzing MPPT logs for potential DC optimizer failure.",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Awaiting feedback from onsite maintenance team regarding islanding detection.",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": { "name": "Solar Ops – Nova Plains" }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "maintenanceAction": "Analyzing MPPT logs for potential DC optimizer failure.",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Awaiting feedback from onsite maintenance team regarding islanding detection.",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "a2b3c4d5-e6f7-4a5b-8c9d-0e1f2a3b4c5d",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "Communication Lost with Data Logger",
      "severity": "Critical",
      "status": "Open",
      "maintenanceAction": "Dispatching technician to check data logger connectivity and perform manual data retrieval.",
      "createdAt": "2026-03-31T13:35:10.112Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "f8e7d6c5-b4a3-4210-9876-543210fedcba",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "DC Ground Fault Detected",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:38:45.500Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4cce7a49-de02-4e2f-a989-e6cf3ba9e9ce",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.297Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "3438f98d-9160-4b59-964c-243b4286a073",
      "inverterId": "93ed91fa-d462-4732-b77f-b8980a08d904",
      "message": "Temperature exceeded 75°C",
      "severity": "Warning",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.294Z",
      "inverter": {
         "name": "NP-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "be5b70a7-6915-48b5-98a9-1ede8baf80e7",
      "inverterId": "51943833-cb60-49ed-9d27-d3d12c249096",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.291Z",
      "inverter": {
         "name": "HR-INV-01",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "4d39f5f7-b549-486c-9ffa-6e15f0a08695",
      "inverterId": "6a76fafc-80cf-4948-9fa3-dacab6fb00d8",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.286Z",
      "inverter": {
         "name": "D-INV-01",
         "site": {
            "name": "Solar Ops – Delta"
         }
      }
   },
   {
      "id": "607e7c4a-7188-4de5-8a7a-bbda6313b19c",
      "inverterId": "e975382d-7308-45ba-97a7-51f363e2a257",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.282Z",
      "inverter": {
         "name": "HR-INV-04",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   },
   {
      "id": "cfff9197-edef-4e83-8954-3b3a01183e5f",
      "inverterId": "475144e7-9695-4100-9ada-dfada2b06b72",
      "message": "AC output dropped more than 40% in 10 minutes",
      "severity": "Critical",
      "status": "Open",
      "createdAt": "2026-03-31T13:30:00.278Z",
      "inverter": {
         "name": "A-INV-02",
         "site": {
            "name": "Solar Ops – Nova Plains"
         }
      }
   }
]

const actions = [
   "Inspect DC wiring for loose connections.",
   "Check inverter cooling system and clean filters.",
   "Restart inverter remotely and monitor output.",
   "Verify grid synchronization parameters.",
   "Inspect string voltage and current imbalance.",
   "Run diagnostics on MPPT performance.",
   "Check for shading or panel obstruction.",
   "Inspect AC breaker and protection systems.",
   "Review historical performance logs for anomalies.",
   "Dispatch technician for onsite inspection."
];

const updatedAlerts = alertsData.map(alert => ({
   ...alert,
   maintenanceAction: Math.random() < 0.3
      ? null // ~30% null
      : alert.maintenanceAction || actions[Math.floor(Math.random() * actions.length)]
}));

interface AlertRow {
   id: string;
   severity: 'Warning' | 'Critical' | 'Info';
   message: string;
   inverter?: {
      name: string;
      site?: { name: string };
   };
   createdAt: string;
   status: 'Open' | 'Closed';
   maintenanceAction?: string;
}

const alertSeverityStatusConfig = {
   warning: { sx: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
   critical: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
};

const alertStatusConfig = {
   resolved: { sx: { backgroundColor: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' } },
   open: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
};

export default function AlertsPage() {

   // const [alertsData, setAlertsData] = useState([])

   const columns: GridColDef<AlertRow>[] = [
      {
         field: 'severity',
         headerName: 'Severity',
         width: 130,
         align: 'left',
         headerAlign: 'left',
         renderCell: (params) => (
            <StatusChip status={params.value} config={alertSeverityStatusConfig} />
         )
      },
      {
         field: 'message',
         headerName: 'Message',
         flex: 2,
         minWidth: 200,
         align: 'left',
         headerAlign: 'center',
         renderCell: (params) => (
            <div style={{
               whiteSpace: 'normal',
               wordBreak: 'break-word',
               lineHeight: '1.4',
               padding: '8px 0'
            }}>
               {params.value || '—'}
            </div>
         )
      },
      {
         field: 'inverter',
         headerName: 'Inverter',
         flex: 1.2,
         minWidth: 120,
         align: 'center',
         headerAlign: 'center',
         valueGetter: (_, row) => row.inverter?.name,
      },
      {
         field: 'site',
         headerName: 'Site',
         flex: 1.5,
         minWidth: 140,
         align: 'left',
         headerAlign: 'center',
         valueGetter: (_, row) => row.inverter?.site?.name,
      },
      {
         field: 'createdAt',
         headerName: 'Created At',
         flex: 1.2,
         minWidth: 150,
         align: 'left',
         headerAlign: 'center',
         valueGetter: (value, row: AlertRow) => row?.createdAt || '',
         valueFormatter: (value: string) => {
            if (!value) return '';
            const date = new Date(value);
            const options: Intl.DateTimeFormatOptions = {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
               hour: 'numeric',
               minute: '2-digit',
               hour12: true,
            };
            return date.toLocaleString(undefined, options);
         },
      },
      {
         field: 'status',
         headerName: 'Status',
         width: 130,
         align: 'center',
         headerAlign: 'center',
         renderCell: (params) => (
            <StatusChip status={params.value} config={alertStatusConfig} />
         )
      },
      {
         field: 'maintenanceAction',
         headerName: 'Maintenance Actions',
         flex: 1.5,
         minWidth: 180,
         headerAlign: 'center',
         renderCell: (params) => (
            <div style={{
               whiteSpace: 'normal',
               wordBreak: 'break-word',
               lineHeight: '1.4',
               padding: '8px 0'
            }}>
               {params.value || '—'}
            </div>
         ),
      },
   ];

   useEffect(() => {
      async function fetchAlerts() {
         try {
            const alertsData = await fetchData(BACKEND_URLS.ALERTS);
            // setAlertsData(alertsData);
         } catch (err) {
            console.error('Failed to load alerts data:', err);
         }
      }

      fetchAlerts();
   }, []);

   return (
      <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
         <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
            Alert Management & Resolution
         </Typography>

         <Box sx={{ height: 400, width: '100%', mt: 4 }}>
            <SolarDataGrid
               rows={updatedAlerts}
               columns={columns}
               getRowId={(row) => row.id}
               pageSizeOptions={[5, 10]}
               rowsPerPageOptions={[5]}
               disableSelectionOnClick
               disableColumnSorting
               initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
               autoHeight
            />
         </Box>
      </Box>
   );
}
