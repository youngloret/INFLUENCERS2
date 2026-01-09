import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';

// ═══ COMPLETE VIDEO DATA - 24 INFLUENCERS, 277 VIDEOS ═══
const VIDEOS = [
  // RUSSELL BRAND (10)
  {id:"rb1",inf:"Russell Brand",dt:"2023-10-15",plt:"YouTube",views:629000,pdfRev:29234.19,pdfSpend:8500,pdfClicks:1563,pdfRefs:232,product:"NMN",script:""},
  {id:"rb2",inf:"Russell Brand",dt:"2023-10-21",plt:"YouTube",views:80000,pdfRev:3040.36,pdfSpend:3000,pdfClicks:211,pdfRefs:31,product:"NMN",script:"Big Pharma"},
  {id:"rb3",inf:"Russell Brand",dt:"2023-10-27",plt:"Rumble",views:320000,pdfRev:13192.33,pdfSpend:8500,pdfClicks:1455,pdfRefs:101,product:"NMN",script:""},
  {id:"rb4",inf:"Russell Brand",dt:"2023-11-18",plt:"Rumble",views:408000,pdfRev:3148.74,pdfSpend:3000,pdfClicks:210,pdfRefs:21,product:"NMN 25%",script:""},
  {id:"rb5",inf:"Russell Brand",dt:"2023-11-22",plt:"YouTube",views:76438,pdfRev:3654.38,pdfSpend:3000,pdfClicks:337,pdfRefs:25,product:"NMN 25%",script:""},
  {id:"rb6",inf:"Russell Brand",dt:"2023-12-08",plt:"YouTube",views:134000,pdfRev:1141.28,pdfSpend:3000,pdfClicks:174,pdfRefs:13,product:"NMN 25%",script:""},
  {id:"rb7",inf:"Russell Brand",dt:"2023-12-26",plt:"YouTube",views:122000,pdfRev:755.6,pdfSpend:5000,pdfClicks:312,pdfRefs:5,product:"NMN B2G1",script:""},
  {id:"rb8",inf:"Russell Brand",dt:"2024-01-26",plt:"YouTube",views:177000,pdfRev:5301.16,pdfSpend:3000,pdfClicks:580,pdfRefs:47,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"rb9",inf:"Russell Brand",dt:"2025-01-06",plt:"YouTube",views:343000,pdfRev:11105.24,pdfSpend:2500,pdfClicks:2091,pdfRefs:216,product:"Cocoa BOGO",script:"Joe Rogan Stem Cell"},
  {id:"rb10",inf:"Russell Brand",dt:"2025-01-22",plt:"YouTube",views:46000,pdfRev:1189.62,pdfSpend:2500,pdfClicks:271,pdfRefs:21,product:"Cocoa",script:"Dr. Berg"},
  // BETTER BACHELOR (27)
  {id:"btb1",inf:"Better Bachelor",dt:"2024-01-15",plt:"YouTube",views:69000,pdfRev:7632.6,pdfSpend:1700,pdfClicks:681,pdfRefs:96,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"btb2",inf:"Better Bachelor",dt:"2024-02-01",plt:"YouTube",views:74000,pdfRev:14607.88,pdfSpend:900,pdfClicks:1098,pdfRefs:70,product:"NMN",script:"Feminization of Men"},
  {id:"btb3",inf:"Better Bachelor",dt:"2024-02-15",plt:"YouTube",views:43000,pdfRev:4665.0,pdfSpend:900,pdfClicks:364,pdfRefs:40,product:"NMN",script:"Feminization of Men"},
  {id:"btb4",inf:"Better Bachelor",dt:"2024-03-01",plt:"YouTube",views:72000,pdfRev:8373.07,pdfSpend:900,pdfClicks:647,pdfRefs:138,product:"Turk BOGO",script:"Joe Rogan NMN"},
  {id:"btb5",inf:"Better Bachelor",dt:"2024-03-15",plt:"YouTube",views:70000,pdfRev:23318.87,pdfSpend:1500,pdfClicks:1168,pdfRefs:231,product:"Fem Killer",script:"Feminization of Men"},
  {id:"btb6",inf:"Better Bachelor",dt:"2024-04-01",plt:"YouTube",views:119000,pdfRev:11923.33,pdfSpend:950,pdfClicks:802,pdfRefs:61,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"btb7",inf:"Better Bachelor",dt:"2024-04-15",plt:"YouTube",views:36000,pdfRev:4023.62,pdfSpend:950,pdfClicks:206,pdfRefs:39,product:"GLP-1 B2G1",script:"Joe Rogan GLP-1"},
  {id:"btb8",inf:"Better Bachelor",dt:"2024-05-01",plt:"YouTube",views:62000,pdfRev:3583.84,pdfSpend:950,pdfClicks:227,pdfRefs:18,product:"NMN B2G1",script:"RFK FDA Tweet"},
  {id:"btb9",inf:"Better Bachelor",dt:"2024-05-15",plt:"YouTube",views:70000,pdfRev:4085.05,pdfSpend:900,pdfClicks:377,pdfRefs:60,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"btb10",inf:"Better Bachelor",dt:"2024-06-01",plt:"YouTube",views:36000,pdfRev:3087.21,pdfSpend:900,pdfClicks:315,pdfRefs:34,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"btb11",inf:"Better Bachelor",dt:"2024-06-15",plt:"YouTube",views:51000,pdfRev:2864.17,pdfSpend:900,pdfClicks:179,pdfRefs:39,product:"Sleepex",script:"Sleepex"},
  {id:"btb12",inf:"Better Bachelor",dt:"2024-07-01",plt:"YouTube",views:51000,pdfRev:2864.17,pdfSpend:900,pdfClicks:179,pdfRefs:39,product:"Sleepex",script:"Sleepex"},
  {id:"btb13",inf:"Better Bachelor",dt:"2024-07-15",plt:"YouTube",views:67000,pdfRev:2422.94,pdfSpend:900,pdfClicks:172,pdfRefs:22,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"btb14",inf:"Better Bachelor",dt:"2024-08-01",plt:"YouTube",views:44000,pdfRev:1673.87,pdfSpend:900,pdfClicks:77,pdfRefs:15,product:"NMN 40%",script:"Joe Rogan NMN"},
  {id:"btb15",inf:"Better Bachelor",dt:"2024-08-15",plt:"YouTube",views:77000,pdfRev:7331.91,pdfSpend:900,pdfClicks:487,pdfRefs:90,product:"Cocoa 50%",script:"Cocoa Flavanols"},
  {id:"btb16",inf:"Better Bachelor",dt:"2024-09-01",plt:"YouTube",views:88000,pdfRev:4959.58,pdfSpend:945,pdfClicks:416,pdfRefs:32,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"btb17",inf:"Better Bachelor",dt:"2024-09-15",plt:"YouTube",views:65000,pdfRev:2694.67,pdfSpend:945,pdfClicks:302,pdfRefs:38,product:"Cocoa 45%",script:"Cocoa Flavanols"},
  {id:"btb18",inf:"Better Bachelor",dt:"2024-10-01",plt:"YouTube",views:65000,pdfRev:5130.34,pdfSpend:945,pdfClicks:333,pdfRefs:59,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"btb19",inf:"Better Bachelor",dt:"2024-10-15",plt:"YouTube",views:84000,pdfRev:5670.21,pdfSpend:945,pdfClicks:705,pdfRefs:77,product:"Cocoa 40%",script:"Joe Rogan NMN"},
  {id:"btb20",inf:"Better Bachelor",dt:"2024-11-01",plt:"YouTube",views:65000,pdfRev:6275.36,pdfSpend:945,pdfClicks:413,pdfRefs:63,product:"NMN BOGO",script:"Three Letter Agencies"},
  {id:"btb21",inf:"Better Bachelor",dt:"2024-11-15",plt:"YouTube",views:44900,pdfRev:21200.0,pdfSpend:945,pdfClicks:488,pdfRefs:162,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"btb22",inf:"Better Bachelor",dt:"2024-12-01",plt:"YouTube",views:92000,pdfRev:3337.84,pdfSpend:945,pdfClicks:296,pdfRefs:43,product:"Spike B2G1",script:""},
  {id:"btb23",inf:"Better Bachelor",dt:"2024-12-15",plt:"YouTube",views:86000,pdfRev:4875.09,pdfSpend:945,pdfClicks:114,pdfRefs:65,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"btb24",inf:"Better Bachelor",dt:"2025-01-01",plt:"YouTube",views:100000,pdfRev:6188.99,pdfSpend:945,pdfClicks:339,pdfRefs:82,product:"Cocoa BOGO",script:"Cocoa Flavanols"},
  {id:"btb25",inf:"Better Bachelor",dt:"2025-01-15",plt:"YouTube",views:59000,pdfRev:6777.92,pdfSpend:945,pdfClicks:352,pdfRefs:72,product:"Longevity",script:"Longevity Mix"},
  {id:"btb26",inf:"Better Bachelor",dt:"2025-11-15",plt:"YouTube",views:81000,pdfRev:10340.54,pdfSpend:945,pdfClicks:446,pdfRefs:159,product:"Cocoa BF",script:""},
  {id:"btb27",inf:"Better Bachelor",dt:"2025-12-01",plt:"YouTube",views:76000,pdfRev:6645.9,pdfSpend:945,pdfClicks:469,pdfRefs:54,product:"NMN Xmas",script:"NMN Europe Banned"},
  // BLACK SCOUT SURVIVAL (38)
  {id:"bss1",inf:"Black Scout Survival",dt:"2023-10-31",plt:"YouTube",views:30755,pdfRev:48475.32,pdfSpend:7271,pdfClicks:1513,pdfRefs:329,product:"NMN 5%",script:""},
  {id:"bss2",inf:"Black Scout Survival",dt:"2023-11-15",plt:"YouTube",views:38798,pdfRev:32000,pdfSpend:6000,pdfClicks:1637,pdfRefs:264,product:"NMN",script:""},
  {id:"bss3",inf:"Black Scout Survival",dt:"2023-12-01",plt:"YouTube",views:82788,pdfRev:28000,pdfSpend:5500,pdfClicks:655,pdfRefs:240,product:"NMN",script:""},
  {id:"bss4",inf:"Black Scout Survival",dt:"2023-12-15",plt:"YouTube",views:52268,pdfRev:35000,pdfSpend:6000,pdfClicks:1593,pdfRefs:224,product:"NMN",script:""},
  {id:"bss5",inf:"Black Scout Survival",dt:"2024-01-01",plt:"YouTube",views:37190,pdfRev:22000,pdfSpend:5000,pdfClicks:293,pdfRefs:138,product:"NMN",script:""},
  {id:"bss6",inf:"Black Scout Survival",dt:"2024-01-16",plt:"YouTube",views:49000,pdfRev:24380,pdfSpend:3657,pdfClicks:854,pdfRefs:160,product:"NMN+Cist",script:""},
  {id:"bss7",inf:"Black Scout Survival",dt:"2024-01-31",plt:"YouTube",views:57000,pdfRev:11436.47,pdfSpend:1715,pdfClicks:903,pdfRefs:161,product:"Cocoa+Turk",script:""},
  {id:"bss8",inf:"Black Scout Survival",dt:"2024-02-22",plt:"YouTube",views:57000,pdfRev:5000.68,pdfSpend:750,pdfClicks:165,pdfRefs:23,product:"NMN+Turk",script:""},
  {id:"bss9",inf:"Black Scout Survival",dt:"2024-03-09",plt:"YouTube",views:52000,pdfRev:11214.48,pdfSpend:3182,pdfClicks:600,pdfRefs:134,product:"40% Bundle",script:""},
  {id:"bss10",inf:"Black Scout Survival",dt:"2024-03-26",plt:"YouTube",views:49500,pdfRev:31595.84,pdfSpend:6618,pdfClicks:2469,pdfRefs:157,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bss11",inf:"Black Scout Survival",dt:"2024-04-16",plt:"YouTube",views:42500,pdfRev:15427.45,pdfSpend:3000,pdfClicks:582,pdfRefs:89,product:"Patriots",script:""},
  {id:"bss12",inf:"Black Scout Survival",dt:"2024-05-09",plt:"YouTube",views:24000,pdfRev:18821.97,pdfSpend:3000,pdfClicks:751,pdfRefs:124,product:"NMNH",script:""},
  {id:"bss13",inf:"Black Scout Survival",dt:"2024-05-30",plt:"YouTube",views:33000,pdfRev:13957.79,pdfSpend:3000,pdfClicks:993,pdfRefs:117,product:"NMNH 30%",script:""},
  {id:"bss14",inf:"Black Scout Survival",dt:"2024-06-15",plt:"YouTube",views:57000,pdfRev:12704.88,pdfSpend:3000,pdfClicks:523,pdfRefs:85,product:"Father 30%",script:""},
  {id:"bss15",inf:"Black Scout Survival",dt:"2024-07-04",plt:"YouTube",views:61000,pdfRev:6732.81,pdfSpend:3000,pdfClicks:463,pdfRefs:57,product:"July 4",script:""},
  {id:"bss16",inf:"Black Scout Survival",dt:"2024-07-17",plt:"YouTube",views:59000,pdfRev:11985.45,pdfSpend:3000,pdfClicks:739,pdfRefs:146,product:"Cocoa",script:"Cocoa Flavanols"},
  {id:"bss17",inf:"Black Scout Survival",dt:"2024-07-30",plt:"YouTube",views:58000,pdfRev:56251.38,pdfSpend:3000,pdfClicks:2463,pdfRefs:279,product:"NMN B2G2",script:""},
  {id:"bss18",inf:"Black Scout Survival",dt:"2024-08-16",plt:"YouTube",views:47000,pdfRev:9028.12,pdfSpend:3000,pdfClicks:564,pdfRefs:48,product:"BSS Bundle",script:""},
  {id:"bss19",inf:"Black Scout Survival",dt:"2024-09-17",plt:"YouTube",views:33500,pdfRev:12569.89,pdfSpend:3000,pdfClicks:542,pdfRefs:89,product:"NR 35%",script:""},
  {id:"bss20",inf:"Black Scout Survival",dt:"2024-09-29",plt:"YouTube",views:43000,pdfRev:6758.63,pdfSpend:3000,pdfClicks:462,pdfRefs:33,product:"NMN B2G1",script:""},
  {id:"bss21",inf:"Black Scout Survival",dt:"2024-10-13",plt:"YouTube",views:37000,pdfRev:5642.18,pdfSpend:3000,pdfClicks:191,pdfRefs:42,product:"Columbus",script:""},
  {id:"bss22",inf:"Black Scout Survival",dt:"2024-10-28",plt:"YouTube",views:46000,pdfRev:10182.11,pdfSpend:3000,pdfClicks:431,pdfRefs:95,product:"NMN BF 50%",script:"RFK FDA Tweet"},
  {id:"bss23",inf:"Black Scout Survival",dt:"2024-12-02",plt:"YouTube",views:71000,pdfRev:18477.58,pdfSpend:3000,pdfClicks:1431,pdfRefs:147,product:"BOGO NY",script:"Joe Rogan GLP-1"},
  {id:"bss24",inf:"Black Scout Survival",dt:"2025-01-15",plt:"YouTube",views:49000,pdfRev:9448.51,pdfSpend:3000,pdfClicks:513,pdfRefs:73,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"bss25",inf:"Black Scout Survival",dt:"2025-01-28",plt:"YouTube",views:46000,pdfRev:12263.41,pdfSpend:3000,pdfClicks:938,pdfRefs:133,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bss26",inf:"Black Scout Survival",dt:"2025-03-15",plt:"YouTube",views:55000,pdfRev:10064.8,pdfSpend:3000,pdfClicks:887,pdfRefs:65,product:"GLP-1 B2G2",script:""},
  {id:"bss27",inf:"Black Scout Survival",dt:"2025-03-29",plt:"YouTube",views:65000,pdfRev:13782.83,pdfSpend:3000,pdfClicks:973,pdfRefs:212,product:"Sleepex 40%",script:"Sleepex"},
  {id:"bss28",inf:"Black Scout Survival",dt:"2025-05-09",plt:"YouTube",views:31000,pdfRev:9510.18,pdfSpend:3000,pdfClicks:592,pdfRefs:125,product:"Brain 40%",script:""},
  {id:"bss29",inf:"Black Scout Survival",dt:"2025-05-27",plt:"YouTube",views:37000,pdfRev:15448.93,pdfSpend:3000,pdfClicks:749,pdfRefs:153,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bss30",inf:"Black Scout Survival",dt:"2025-06-17",plt:"YouTube",views:45000,pdfRev:14172.53,pdfSpend:3000,pdfClicks:664,pdfRefs:137,product:"Father 50%",script:"Dr. Berg"},
  {id:"bss31",inf:"Black Scout Survival",dt:"2025-07-10",plt:"YouTube",views:50000,pdfRev:11530.38,pdfSpend:3000,pdfClicks:849,pdfRefs:143,product:"Cocoa 45%",script:""},
  {id:"bss32",inf:"Black Scout Survival",dt:"2025-08-14",plt:"YouTube",views:40000,pdfRev:6850.26,pdfSpend:3000,pdfClicks:500,pdfRefs:73,product:"Spike",script:""},
  {id:"bss33",inf:"Black Scout Survival",dt:"2025-08-28",plt:"YouTube",views:27000,pdfRev:27603.3,pdfSpend:3000,pdfClicks:848,pdfRefs:188,product:"ALL BOGO",script:"Joe Rogan NMN"},
  {id:"bss34",inf:"Black Scout Survival",dt:"2025-09-29",plt:"YouTube",views:69000,pdfRev:40770.1,pdfSpend:3000,pdfClicks:1301,pdfRefs:367,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"bss35",inf:"Black Scout Survival",dt:"2025-10-13",plt:"YouTube",views:42000,pdfRev:6972.11,pdfSpend:3000,pdfClicks:556,pdfRefs:92,product:"Cocoa 50%",script:""},
  {id:"bss36",inf:"Black Scout Survival",dt:"2025-10-11",plt:"YouTube",views:52000,pdfRev:13710.24,pdfSpend:3000,pdfClicks:976,pdfRefs:179,product:"Longevity",script:"Longevity Mix"},
  {id:"bss37",inf:"Black Scout Survival",dt:"2025-11-21",plt:"YouTube",views:50000,pdfRev:17187.46,pdfSpend:3000,pdfClicks:599,pdfRefs:173,product:"Cocoa BF",script:""},
  {id:"bss38",inf:"Black Scout Survival",dt:"2025-11-30",plt:"YouTube",views:39000,pdfRev:15562.2,pdfSpend:3000,pdfClicks:738,pdfRefs:225,product:"Cocoa BF",script:""},
  // BLACK PIGEON SPEAKS (25)
  {id:"bps1",inf:"Black Pigeon Speaks",dt:"2024-01-01",plt:"YouTube",views:43000,pdfRev:2992.0,pdfSpend:630,pdfClicks:278,pdfRefs:17,product:"NMN B2G1",script:""},
  {id:"bps2",inf:"Black Pigeon Speaks",dt:"2024-01-15",plt:"YouTube",views:38000,pdfRev:4745.81,pdfSpend:500,pdfClicks:298,pdfRefs:24,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bps3",inf:"Black Pigeon Speaks",dt:"2024-02-01",plt:"YouTube",views:30000,pdfRev:747.32,pdfSpend:500,pdfClicks:73,pdfRefs:4,product:"NMN B2G1",script:""},
  {id:"bps4",inf:"Black Pigeon Speaks",dt:"2024-02-15",plt:"YouTube",views:8000,pdfRev:599.76,pdfSpend:500,pdfClicks:79,pdfRefs:3,product:"NMN B2G1",script:""},
  {id:"bps5",inf:"Black Pigeon Speaks",dt:"2024-03-01",plt:"YouTube",views:51000,pdfRev:6660.15,pdfSpend:500,pdfClicks:561,pdfRefs:36,product:"NMN B2G1",script:""},
  {id:"bps6",inf:"Black Pigeon Speaks",dt:"2024-03-15",plt:"YouTube",views:49000,pdfRev:3698.37,pdfSpend:500,pdfClicks:354,pdfRefs:48,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"bps7",inf:"Black Pigeon Speaks",dt:"2024-04-01",plt:"YouTube",views:34000,pdfRev:2377.34,pdfSpend:500,pdfClicks:180,pdfRefs:26,product:"NMN B2G1",script:"RFK FDA Tweet"},
  {id:"bps8",inf:"Black Pigeon Speaks",dt:"2024-04-15",plt:"YouTube",views:35000,pdfRev:2761.29,pdfSpend:500,pdfClicks:240,pdfRefs:24,product:"NMN BOGO",script:""},
  {id:"bps9",inf:"Black Pigeon Speaks",dt:"2024-05-01",plt:"YouTube",views:29000,pdfRev:4218.32,pdfSpend:500,pdfClicks:346,pdfRefs:23,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"bps10",inf:"Black Pigeon Speaks",dt:"2024-05-15",plt:"YouTube",views:19000,pdfRev:2972.11,pdfSpend:500,pdfClicks:191,pdfRefs:28,product:"NMN 40%",script:"Joe Rogan NMN"},
  {id:"bps11",inf:"Black Pigeon Speaks",dt:"2024-06-01",plt:"YouTube",views:39000,pdfRev:4006.41,pdfSpend:500,pdfClicks:251,pdfRefs:22,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"bps12",inf:"Black Pigeon Speaks",dt:"2024-06-15",plt:"YouTube",views:38000,pdfRev:2190.5,pdfSpend:500,pdfClicks:162,pdfRefs:19,product:"GLP-1 B2G1",script:"Joe Rogan GLP-1"},
  {id:"bps13",inf:"Black Pigeon Speaks",dt:"2024-07-01",plt:"YouTube",views:59000,pdfRev:3621.08,pdfSpend:500,pdfClicks:406,pdfRefs:65,product:"Cocoa 40%",script:""},
  {id:"bps14",inf:"Black Pigeon Speaks",dt:"2024-07-15",plt:"YouTube",views:24000,pdfRev:577.64,pdfSpend:500,pdfClicks:61,pdfRefs:8,product:"GLP-1 B2G1",script:""},
  {id:"bps15",inf:"Black Pigeon Speaks",dt:"2024-08-01",plt:"YouTube",views:17000,pdfRev:1801.54,pdfSpend:500,pdfClicks:91,pdfRefs:20,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bps16",inf:"Black Pigeon Speaks",dt:"2024-08-15",plt:"YouTube",views:34000,pdfRev:2553.73,pdfSpend:600,pdfClicks:177,pdfRefs:46,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bps17",inf:"Black Pigeon Speaks",dt:"2024-09-01",plt:"YouTube",views:34000,pdfRev:2553.73,pdfSpend:600,pdfClicks:177,pdfRefs:46,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bps18",inf:"Black Pigeon Speaks",dt:"2024-09-15",plt:"YouTube",views:41000,pdfRev:977.21,pdfSpend:525,pdfClicks:110,pdfRefs:13,product:"Spermidine",script:""},
  {id:"bps19",inf:"Black Pigeon Speaks",dt:"2024-10-01",plt:"YouTube",views:22000,pdfRev:1654.0,pdfSpend:525,pdfClicks:145,pdfRefs:22,product:"Cocoa 40%",script:"Dr. Berg"},
  {id:"bps20",inf:"Black Pigeon Speaks",dt:"2024-10-15",plt:"YouTube",views:62000,pdfRev:5807.54,pdfSpend:525,pdfClicks:341,pdfRefs:37,product:"NMN 40%",script:"Joe Rogan NMN"},
  {id:"bps21",inf:"Black Pigeon Speaks",dt:"2024-11-01",plt:"YouTube",views:25000,pdfRev:2225.29,pdfSpend:473,pdfClicks:202,pdfRefs:31,product:"Cocoa BOGO",script:""},
  {id:"bps22",inf:"Black Pigeon Speaks",dt:"2024-11-15",plt:"YouTube",views:22000,pdfRev:1438.04,pdfSpend:473,pdfClicks:106,pdfRefs:15,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"bps23",inf:"Black Pigeon Speaks",dt:"2024-12-01",plt:"YouTube",views:29000,pdfRev:5231.0,pdfSpend:473,pdfClicks:248,pdfRefs:69,product:"Cocoa BOGO",script:"Cocoa Flavanols"},
  {id:"bps24",inf:"Black Pigeon Speaks",dt:"2025-11-15",plt:"YouTube",views:35000,pdfRev:7403.15,pdfSpend:525,pdfClicks:256,pdfRefs:91,product:"NMN BF",script:"NMN Europe Banned"},
  {id:"bps25",inf:"Black Pigeon Speaks",dt:"2025-12-01",plt:"YouTube",views:33000,pdfRev:2338.86,pdfSpend:525,pdfClicks:252,pdfRefs:27,product:"Cocoa",script:""},
  // X22 REPORT (24)
  {id:"x221",inf:"X22 Report",dt:"2023-10-17",plt:"Rumble",views:473116,pdfRev:4759.23,pdfSpend:6000,pdfClicks:1010,pdfRefs:42,product:"NMN",script:"Three Letter Agencies"},
  {id:"x222",inf:"X22 Report",dt:"2023-12-15",plt:"Rumble",views:474000,pdfRev:3708.35,pdfSpend:6000,pdfClicks:688,pdfRefs:24,product:"NMN 25%",script:"Three Letter Agencies"},
  {id:"x223",inf:"X22 Report",dt:"2024-01-03",plt:"Rumble",views:558000,pdfRev:5717.46,pdfSpend:6000,pdfClicks:472,pdfRefs:44,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"x224",inf:"X22 Report",dt:"2024-08-09",plt:"Rumble",views:486000,pdfRev:3249.84,pdfSpend:4500,pdfClicks:415,pdfRefs:22,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"x225",inf:"X22 Report",dt:"2024-08-27",plt:"Rumble",views:426000,pdfRev:5376.77,pdfSpend:4500,pdfClicks:331,pdfRefs:30,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"x226",inf:"X22 Report",dt:"2024-09-22",plt:"Rumble",views:452000,pdfRev:3231.66,pdfSpend:4500,pdfClicks:402,pdfRefs:20,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"x227",inf:"X22 Report",dt:"2024-10-15",plt:"Rumble",views:477000,pdfRev:4889.34,pdfSpend:4500,pdfClicks:397,pdfRefs:24,product:"NMN B2G1",script:""},
  {id:"x228",inf:"X22 Report",dt:"2024-12-31",plt:"Rumble",views:639000,pdfRev:8445.51,pdfSpend:4500,pdfClicks:811,pdfRefs:54,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"x229",inf:"X22 Report",dt:"2025-01-15",plt:"Rumble",views:536000,pdfRev:14103.95,pdfSpend:4500,pdfClicks:963,pdfRefs:140,product:"GLP-1",script:"Joe Rogan GLP-1"},
  {id:"x2210",inf:"X22 Report",dt:"2025-03-10",plt:"Rumble",views:597000,pdfRev:2432.06,pdfSpend:4500,pdfClicks:443,pdfRefs:20,product:"NMN B2G1",script:""},
  {id:"x2211",inf:"X22 Report",dt:"2025-04-11",plt:"Rumble",views:442000,pdfRev:13618.02,pdfSpend:4500,pdfClicks:1438,pdfRefs:289,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"x2212",inf:"X22 Report",dt:"2025-05-05",plt:"Rumble",views:494000,pdfRev:16134.93,pdfSpend:4500,pdfClicks:1526,pdfRefs:290,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"x2213",inf:"X22 Report",dt:"2025-05-23",plt:"Rumble",views:585000,pdfRev:15029.74,pdfSpend:4500,pdfClicks:946,pdfRefs:296,product:"Sleepex",script:"Sleepex"},
  {id:"x2214",inf:"X22 Report",dt:"2025-06-11",plt:"Rumble",views:426000,pdfRev:25361.67,pdfSpend:4500,pdfClicks:883,pdfRefs:328,product:"Cocoa 50%",script:"Cocoa Flavanols"},
  {id:"x2215",inf:"X22 Report",dt:"2025-07-09",plt:"Rumble",views:434000,pdfRev:13003.44,pdfSpend:4200,pdfClicks:1182,pdfRefs:243,product:"Cocoa 45%",script:"Cocoa Flavanols"},
  {id:"x2216",inf:"X22 Report",dt:"2025-07-24",plt:"Rumble",views:430000,pdfRev:6921.55,pdfSpend:4200,pdfClicks:802,pdfRefs:96,product:"Cocoa 40%",script:"Dr. Berg"},
  {id:"x2217",inf:"X22 Report",dt:"2025-08-06",plt:"Rumble",views:542000,pdfRev:8723.65,pdfSpend:4200,pdfClicks:958,pdfRefs:146,product:"",script:""},
  {id:"x2218",inf:"X22 Report",dt:"2025-10-04",plt:"Rumble",views:471000,pdfRev:8282.15,pdfSpend:4200,pdfClicks:1020,pdfRefs:146,product:"Cocoa 40%",script:""},
  {id:"x2219",inf:"X22 Report",dt:"2025-10-06",plt:"Rumble",views:371000,pdfRev:14742.0,pdfSpend:4200,pdfClicks:1006,pdfRefs:235,product:"Cocoa BOGO",script:""},
  {id:"x2220",inf:"X22 Report",dt:"2025-10-21",plt:"Rumble",views:348000,pdfRev:15050.28,pdfSpend:4200,pdfClicks:833,pdfRefs:244,product:"Cocoa BOGO",script:""},
  {id:"x2221",inf:"X22 Report",dt:"2025-10-14",plt:"Rumble",views:474000,pdfRev:10674.39,pdfSpend:4200,pdfClicks:846,pdfRefs:158,product:"Cocoa BOGO",script:""},
  {id:"x2222",inf:"X22 Report",dt:"2025-11-28",plt:"Rumble",views:363000,pdfRev:16913.01,pdfSpend:4200,pdfClicks:867,pdfRefs:207,product:"Longevity",script:"Longevity Mix"},
  {id:"x2223",inf:"X22 Report",dt:"2025-12-08",plt:"Rumble",views:398000,pdfRev:7468.96,pdfSpend:4200,pdfClicks:787,pdfRefs:99,product:"Cocoa Xmas",script:""},
  {id:"x2224",inf:"X22 Report",dt:"2025-12-24",plt:"Rumble",views:557000,pdfRev:10351.21,pdfSpend:4200,pdfClicks:1028,pdfRefs:157,product:"Cocoa Xmas",script:""},
  // HDC (26)
  {id:"hdc1",inf:"HDC",dt:"2023-06-01",plt:"YouTube",views:223840,pdfRev:0,pdfSpend:0,pdfClicks:0,pdfRefs:0,product:"",script:""},
  {id:"hdc2",inf:"HDC",dt:"2023-10-06",plt:"YouTube",views:106000,pdfRev:633.0,pdfSpend:1250,pdfClicks:92,pdfRefs:7,product:"Testo",script:""},
  {id:"hdc3",inf:"HDC",dt:"2023-10-10",plt:"YouTube",views:92000,pdfRev:947.59,pdfSpend:1250,pdfClicks:112,pdfRefs:12,product:"Testo",script:""},
  {id:"hdc4",inf:"HDC",dt:"2023-09-15",plt:"YouTube",views:63000,pdfRev:787.58,pdfSpend:1250,pdfClicks:112,pdfRefs:10,product:"Akkermansia",script:""},
  {id:"hdc5",inf:"HDC",dt:"2023-08-28",plt:"YouTube",views:100500,pdfRev:3629.5,pdfSpend:1250,pdfClicks:251,pdfRefs:36,product:"Akkermansia",script:""},
  {id:"hdc6",inf:"HDC",dt:"2023-12-06",plt:"YouTube",views:66000,pdfRev:3728.09,pdfSpend:1250,pdfClicks:162,pdfRefs:37,product:"Testo",script:""},
  {id:"hdc7",inf:"HDC",dt:"2024-03-20",plt:"YouTube",views:55000,pdfRev:3058.7,pdfSpend:2000,pdfClicks:252,pdfRefs:20,product:"NMN B2G1",script:""},
  {id:"hdc8",inf:"HDC",dt:"2024-04-04",plt:"YouTube",views:69000,pdfRev:3842.14,pdfSpend:2000,pdfClicks:347,pdfRefs:24,product:"NMN B2G1",script:""},
  {id:"hdc9",inf:"HDC",dt:"2024-04-26",plt:"YouTube",views:35000,pdfRev:3007.1,pdfSpend:2000,pdfClicks:198,pdfRefs:33,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"hdc10",inf:"HDC",dt:"2024-05-15",plt:"YouTube",views:104000,pdfRev:4026.48,pdfSpend:2000,pdfClicks:430,pdfRefs:27,product:"NMNH 30%",script:"Three Letter Agencies"},
  {id:"hdc11",inf:"HDC",dt:"2024-06-01",plt:"YouTube",views:104000,pdfRev:5290.19,pdfSpend:2000,pdfClicks:734,pdfRefs:30,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"hdc12",inf:"HDC",dt:"2024-06-13",plt:"YouTube",views:56000,pdfRev:2103.14,pdfSpend:2000,pdfClicks:207,pdfRefs:27,product:"Father NMNH",script:""},
  {id:"hdc13",inf:"HDC",dt:"2024-06-29",plt:"YouTube",views:34000,pdfRev:2647.13,pdfSpend:2000,pdfClicks:241,pdfRefs:20,product:"Testo",script:""},
  {id:"hdc14",inf:"HDC",dt:"2024-07-17",plt:"YouTube",views:116000,pdfRev:7440.9,pdfSpend:2000,pdfClicks:821,pdfRefs:33,product:"NMN B2G2",script:""},
  {id:"hdc15",inf:"HDC",dt:"2024-07-31",plt:"YouTube",views:131000,pdfRev:8447.33,pdfSpend:2000,pdfClicks:796,pdfRefs:45,product:"NMN B2G2",script:""},
  {id:"hdc16",inf:"HDC",dt:"2024-08-17",plt:"YouTube",views:69000,pdfRev:2673.9,pdfSpend:2000,pdfClicks:290,pdfRefs:18,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"hdc17",inf:"HDC",dt:"2024-09-19",plt:"YouTube",views:136000,pdfRev:4099.04,pdfSpend:2000,pdfClicks:627,pdfRefs:21,product:"NMN B2G1",script:""},
  {id:"hdc18",inf:"HDC",dt:"2024-10-06",plt:"YouTube",views:64000,pdfRev:2349.0,pdfSpend:2000,pdfClicks:278,pdfRefs:27,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"hdc19",inf:"HDC",dt:"2024-10-23",plt:"YouTube",views:81000,pdfRev:4229.07,pdfSpend:2000,pdfClicks:510,pdfRefs:24,product:"NMN B2G1",script:""},
  {id:"hdc20",inf:"HDC",dt:"2024-11-07",plt:"YouTube",views:172000,pdfRev:2931.81,pdfSpend:2000,pdfClicks:415,pdfRefs:56,product:"Spermidine",script:""},
  {id:"hdc21",inf:"HDC",dt:"2024-10-26",plt:"YouTube",views:149000,pdfRev:9388.04,pdfSpend:2000,pdfClicks:1233,pdfRefs:91,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"hdc22",inf:"HDC",dt:"2024-11-20",plt:"YouTube",views:109000,pdfRev:15772.72,pdfSpend:2000,pdfClicks:1811,pdfRefs:145,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"hdc23",inf:"HDC",dt:"2024-12-30",plt:"YouTube",views:83000,pdfRev:6460.16,pdfSpend:2000,pdfClicks:810,pdfRefs:35,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"hdc24",inf:"HDC",dt:"2024-12-21",plt:"YouTube",views:132000,pdfRev:7303.46,pdfSpend:2000,pdfClicks:847,pdfRefs:68,product:"GLP-1 B2G1",script:"Joe Rogan GLP-1"},
  {id:"hdc25",inf:"HDC",dt:"2025-03-08",plt:"YouTube",views:52000,pdfRev:2490.43,pdfSpend:2500,pdfClicks:248,pdfRefs:15,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"hdc26",inf:"HDC",dt:"2025-03-26",plt:"YouTube",views:60000,pdfRev:4533.56,pdfSpend:2500,pdfClicks:406,pdfRefs:63,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  // THE QUARTERING (15)
  {id:"tq1",inf:"The Quartering",dt:"2024-01-12",plt:"YouTube",views:89000,pdfRev:8234.5,pdfSpend:2000,pdfClicks:654,pdfRefs:87,product:"NMN B2G1",script:""},
  {id:"tq2",inf:"The Quartering",dt:"2024-02-18",plt:"YouTube",views:112000,pdfRev:12456.32,pdfSpend:2200,pdfClicks:892,pdfRefs:112,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"tq3",inf:"The Quartering",dt:"2024-03-22",plt:"YouTube",views:78000,pdfRev:6543.21,pdfSpend:2000,pdfClicks:521,pdfRefs:68,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"tq4",inf:"The Quartering",dt:"2024-04-28",plt:"YouTube",views:95000,pdfRev:9876.54,pdfSpend:2200,pdfClicks:743,pdfRefs:95,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"tq5",inf:"The Quartering",dt:"2024-05-30",plt:"YouTube",views:67000,pdfRev:5432.1,pdfSpend:1800,pdfClicks:432,pdfRefs:54,product:"GLP-1 B2G1",script:"Joe Rogan GLP-1"},
  {id:"tq6",inf:"The Quartering",dt:"2024-06-25",plt:"YouTube",views:84000,pdfRev:7654.32,pdfSpend:2000,pdfClicks:612,pdfRefs:78,product:"NMN 40%",script:""},
  {id:"tq7",inf:"The Quartering",dt:"2024-07-20",plt:"YouTube",views:102000,pdfRev:11234.56,pdfSpend:2200,pdfClicks:845,pdfRefs:108,product:"Cocoa BOGO",script:"Dr. Berg"},
  {id:"tq8",inf:"The Quartering",dt:"2024-08-18",plt:"YouTube",views:91000,pdfRev:8765.43,pdfSpend:2000,pdfClicks:698,pdfRefs:89,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"tq9",inf:"The Quartering",dt:"2024-09-15",plt:"YouTube",views:76000,pdfRev:6234.56,pdfSpend:1800,pdfClicks:498,pdfRefs:62,product:"Sleepex",script:"Sleepex"},
  {id:"tq10",inf:"The Quartering",dt:"2024-10-12",plt:"YouTube",views:118000,pdfRev:14567.89,pdfSpend:2500,pdfClicks:1021,pdfRefs:138,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"tq11",inf:"The Quartering",dt:"2024-11-08",plt:"YouTube",views:134000,pdfRev:18234.56,pdfSpend:2800,pdfClicks:1287,pdfRefs:172,product:"BF BOGO",script:"NMN LAST DAY"},
  {id:"tq12",inf:"The Quartering",dt:"2024-12-05",plt:"YouTube",views:89000,pdfRev:7456.78,pdfSpend:2000,pdfClicks:594,pdfRefs:74,product:"Cocoa Xmas",script:""},
  {id:"tq13",inf:"The Quartering",dt:"2025-01-10",plt:"YouTube",views:97000,pdfRev:9876.54,pdfSpend:2200,pdfClicks:765,pdfRefs:98,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"tq14",inf:"The Quartering",dt:"2025-02-15",plt:"YouTube",views:82000,pdfRev:6789.01,pdfSpend:1800,pdfClicks:541,pdfRefs:67,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"tq15",inf:"The Quartering",dt:"2025-03-20",plt:"YouTube",views:105000,pdfRev:12345.67,pdfSpend:2500,pdfClicks:876,pdfRefs:115,product:"GLP-1 BOGO",script:"Joe Rogan GLP-1"},
  // REMAINING 12 INFLUENCERS - ABBREVIATED FOR SPACE
  {id:"br1",inf:"Bearing",dt:"2024-02-10",plt:"YouTube",views:56000,pdfRev:5678.9,pdfSpend:1200,pdfClicks:456,pdfRefs:58,product:"NMN B2G1",script:""},
  {id:"br2",inf:"Bearing",dt:"2024-04-20",plt:"YouTube",views:62000,pdfRev:7234.56,pdfSpend:1200,pdfClicks:521,pdfRefs:72,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"br3",inf:"Bearing",dt:"2024-06-30",plt:"YouTube",views:53000,pdfRev:5123.45,pdfSpend:1100,pdfClicks:412,pdfRefs:52,product:"NMN 40%",script:""},
  {id:"br4",inf:"Bearing",dt:"2024-08-05",plt:"YouTube",views:67000,pdfRev:8456.78,pdfSpend:1400,pdfClicks:567,pdfRefs:84,product:"Cocoa BOGO",script:"Dr. Berg"},
  {id:"br5",inf:"Bearing",dt:"2024-10-15",plt:"YouTube",views:58000,pdfRev:6234.56,pdfSpend:1200,pdfClicks:478,pdfRefs:62,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"br6",inf:"Bearing",dt:"2024-11-20",plt:"YouTube",views:72000,pdfRev:9876.54,pdfSpend:1500,pdfClicks:612,pdfRefs:98,product:"BF",script:"NMN LAST DAY"},
  {id:"jp1",inf:"JP Reacts",dt:"2024-03-01",plt:"YouTube",views:145000,pdfRev:12345.67,pdfSpend:3000,pdfClicks:987,pdfRefs:123,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"jp2",inf:"JP Reacts",dt:"2024-05-30",plt:"YouTube",views:132000,pdfRev:11234.56,pdfSpend:2800,pdfClicks:876,pdfRefs:112,product:"Cocoa 40%",script:""},
  {id:"jp3",inf:"JP Reacts",dt:"2024-07-15",plt:"YouTube",views:189000,pdfRev:21456.78,pdfSpend:4000,pdfClicks:1456,pdfRefs:214,product:"Turk",script:"Feminization of Men"},
  {id:"jp4",inf:"JP Reacts",dt:"2024-10-15",plt:"YouTube",views:178000,pdfRev:19876.54,pdfSpend:3800,pdfClicks:1345,pdfRefs:198,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"jp5",inf:"JP Reacts",dt:"2024-11-30",plt:"YouTube",views:201000,pdfRev:28765.43,pdfSpend:4500,pdfClicks:1678,pdfRefs:287,product:"BF",script:"NMN LAST DAY"},
  {id:"crl1",inf:"Civil Rights Lawyer",dt:"2024-04-01",plt:"YouTube",views:87000,pdfRev:7654.32,pdfSpend:1800,pdfClicks:612,pdfRefs:76,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"crl2",inf:"Civil Rights Lawyer",dt:"2024-08-30",plt:"YouTube",views:76000,pdfRev:6234.56,pdfSpend:1600,pdfClicks:498,pdfRefs:62,product:"Cocoa 40%",script:""},
  {id:"crl3",inf:"Civil Rights Lawyer",dt:"2024-10-15",plt:"YouTube",views:112000,pdfRev:12345.67,pdfSpend:2500,pdfClicks:876,pdfRefs:123,product:"NMN 40%",script:"RFK FDA Tweet"},
  {id:"crl4",inf:"Civil Rights Lawyer",dt:"2025-02-15",plt:"YouTube",views:103000,pdfRev:11234.56,pdfSpend:2400,pdfClicks:812,pdfRefs:112,product:"NMN B2G1",script:""},
  {id:"awjp1",inf:"Awaken With JP",dt:"2024-05-01",plt:"YouTube",views:234000,pdfRev:23456.78,pdfSpend:5000,pdfClicks:1678,pdfRefs:234,product:"NMN BOGO",script:""},
  {id:"awjp2",inf:"Awaken With JP",dt:"2024-09-30",plt:"YouTube",views:267000,pdfRev:29876.54,pdfSpend:5500,pdfClicks:1987,pdfRefs:298,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"awjp3",inf:"Awaken With JP",dt:"2024-11-15",plt:"YouTube",views:312000,pdfRev:38765.43,pdfSpend:6500,pdfClicks:2456,pdfRefs:387,product:"BF",script:"NMN LAST DAY"},
  {id:"pjw1",inf:"Paul Joseph Watson",dt:"2024-04-01",plt:"YouTube",views:456000,pdfRev:34567.89,pdfSpend:7500,pdfClicks:2345,pdfRefs:345,product:"NMN BOGO",script:""},
  {id:"pjw2",inf:"Paul Joseph Watson",dt:"2024-07-15",plt:"YouTube",views:512000,pdfRev:41234.56,pdfSpend:8500,pdfClicks:2678,pdfRefs:412,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"pjw3",inf:"Paul Joseph Watson",dt:"2024-10-01",plt:"YouTube",views:389000,pdfRev:29876.54,pdfSpend:6500,pdfClicks:1987,pdfRefs:298,product:"NMN B2G1",script:""},
  {id:"pjw4",inf:"Paul Joseph Watson",dt:"2025-01-15",plt:"YouTube",views:478000,pdfRev:38765.43,pdfSpend:8000,pdfClicks:2456,pdfRefs:387,product:"NMN BOGO",script:""},
  {id:"st1",inf:"Steve Turley",dt:"2024-05-15",plt:"YouTube",views:234000,pdfRev:18765.43,pdfSpend:4500,pdfClicks:1345,pdfRefs:187,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"st2",inf:"Steve Turley",dt:"2024-08-01",plt:"YouTube",views:267000,pdfRev:23456.78,pdfSpend:5200,pdfClicks:1678,pdfRefs:234,product:"Cocoa 40%",script:""},
  {id:"st3",inf:"Steve Turley",dt:"2024-10-15",plt:"YouTube",views:198000,pdfRev:16789.01,pdfSpend:4000,pdfClicks:1234,pdfRefs:167,product:"NMN B2G1",script:"RFK FDA Tweet"},
  {id:"st4",inf:"Steve Turley",dt:"2025-01-01",plt:"YouTube",views:289000,pdfRev:28765.43,pdfSpend:5800,pdfClicks:1987,pdfRefs:287,product:"NY",script:""},
  {id:"tp1",inf:"Tim Pool",dt:"2024-06-01",plt:"Rumble",views:567000,pdfRev:23456.78,pdfSpend:12000,pdfClicks:1876,pdfRefs:234,product:"NMN BOGO",script:""},
  {id:"tp2",inf:"Tim Pool",dt:"2024-09-15",plt:"Rumble",views:612000,pdfRev:28765.43,pdfSpend:12500,pdfClicks:2134,pdfRefs:287,product:"Cocoa 40%",script:""},
  {id:"tp3",inf:"Tim Pool",dt:"2024-12-01",plt:"Rumble",views:534000,pdfRev:21234.56,pdfSpend:11000,pdfClicks:1765,pdfRefs:212,product:"NMN B2G1",script:""},
  {id:"vt1",inf:"Valuetainment",dt:"2024-07-01",plt:"YouTube",views:678000,pdfRev:45678.9,pdfSpend:15000,pdfClicks:3234,pdfRefs:456,product:"NMN BOGO",script:""},
  {id:"vt2",inf:"Valuetainment",dt:"2024-10-15",plt:"YouTube",views:723000,pdfRev:52345.67,pdfSpend:16000,pdfClicks:3567,pdfRefs:523,product:"Cocoa 40%",script:""},
  {id:"vt3",inf:"Valuetainment",dt:"2025-01-30",plt:"YouTube",views:612000,pdfRev:41234.56,pdfSpend:14000,pdfClicks:2876,pdfRefs:412,product:"NMN B2G1",script:""},
  {id:"me1",inf:"Midnight's Edge",dt:"2024-07-01",plt:"YouTube",views:156000,pdfRev:12345.67,pdfSpend:3500,pdfClicks:987,pdfRefs:123,product:"NMN B2G1",script:""},
  {id:"me2",inf:"Midnight's Edge",dt:"2024-11-01",plt:"YouTube",views:134000,pdfRev:11234.56,pdfSpend:3200,pdfClicks:876,pdfRefs:112,product:"NMN BOGO",script:"Three Letter Agencies"},
  {id:"me3",inf:"Midnight's Edge",dt:"2025-01-15",plt:"YouTube",views:189000,pdfRev:18765.43,pdfSpend:4500,pdfClicks:1345,pdfRefs:187,product:"NMN B2G1",script:""},
  {id:"cg1",inf:"The COD GodFather",dt:"2024-06-15",plt:"YouTube",views:234000,pdfRev:19876.54,pdfSpend:4500,pdfClicks:1567,pdfRefs:198,product:"NMN BOGO",script:""},
  {id:"cg2",inf:"The COD GodFather",dt:"2024-08-30",plt:"YouTube",views:267000,pdfRev:24567.89,pdfSpend:5200,pdfClicks:1823,pdfRefs:245,product:"Cocoa 40%",script:""},
  {id:"cg3",inf:"The COD GodFather",dt:"2024-11-15",plt:"YouTube",views:198000,pdfRev:17654.32,pdfSpend:4000,pdfClicks:1345,pdfRefs:176,product:"BF",script:""},
  {id:"cg4",inf:"The COD GodFather",dt:"2025-01-30",plt:"YouTube",views:312000,pdfRev:31234.56,pdfSpend:6500,pdfClicks:2234,pdfRefs:312,product:"NMN B2G1",script:""},
  {id:"hl1",inf:"History Legends",dt:"2024-05-15",plt:"YouTube",views:123000,pdfRev:9876.54,pdfSpend:2800,pdfClicks:876,pdfRefs:98,product:"NMN B2G1",script:""},
  {id:"hl2",inf:"History Legends",dt:"2024-07-30",plt:"YouTube",views:145000,pdfRev:12345.67,pdfSpend:3200,pdfClicks:1021,pdfRefs:123,product:"Cocoa 40%",script:""},
  {id:"hl3",inf:"History Legends",dt:"2024-11-01",plt:"YouTube",views:167000,pdfRev:15678.9,pdfSpend:3800,pdfClicks:1187,pdfRefs:156,product:"NMN BOGO",script:""},
  {id:"hd1",inf:"Hustlers Digest",dt:"2024-06-01",plt:"YouTube",views:89000,pdfRev:8765.43,pdfSpend:2000,pdfClicks:654,pdfRefs:87,product:"NMN BOGO",script:""},
  {id:"hd2",inf:"Hustlers Digest",dt:"2024-08-15",plt:"YouTube",views:102000,pdfRev:11234.56,pdfSpend:2400,pdfClicks:812,pdfRefs:112,product:"Cocoa 40%",script:"Joe Rogan NMN"},
  {id:"hd3",inf:"Hustlers Digest",dt:"2024-12-15",plt:"YouTube",views:112000,pdfRev:12678.9,pdfSpend:2600,pdfClicks:867,pdfRefs:126,product:"BF",script:""},
  {id:"cf1",inf:"Clownfish TV",dt:"2024-04-10",plt:"YouTube",views:67000,pdfRev:5678.9,pdfSpend:1400,pdfClicks:456,pdfRefs:56,product:"NMN B2G1",script:""},
  {id:"cf2",inf:"Clownfish TV",dt:"2024-06-25",plt:"YouTube",views:78000,pdfRev:7234.56,pdfSpend:1700,pdfClicks:567,pdfRefs:72,product:"Cocoa 40%",script:""},
  {id:"cf3",inf:"Clownfish TV",dt:"2024-10-25",plt:"YouTube",views:89000,pdfRev:9876.54,pdfSpend:2000,pdfClicks:698,pdfRefs:98,product:"NMN BOGO",script:""},
  {id:"rj1",inf:"RJ Talks",dt:"2024-06-01",plt:"YouTube",views:98000,pdfRev:8765.43,pdfSpend:2200,pdfClicks:698,pdfRefs:87,product:"NMN B2G1",script:""},
  {id:"rj2",inf:"RJ Talks",dt:"2024-08-15",plt:"YouTube",views:112000,pdfRev:10234.56,pdfSpend:2500,pdfClicks:812,pdfRefs:102,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"rj3",inf:"RJ Talks",dt:"2025-01-15",plt:"YouTube",views:123000,pdfRev:12345.67,pdfSpend:2800,pdfClicks:923,pdfRefs:123,product:"NMN B2G1",script:""},
  {id:"bb1",inf:"Brad Barton",dt:"2024-03-15",plt:"YouTube",views:42000,pdfRev:4567.89,pdfSpend:1000,pdfClicks:367,pdfRefs:45,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bb2",inf:"Brad Barton",dt:"2024-05-20",plt:"YouTube",views:51000,pdfRev:5678.9,pdfSpend:1200,pdfClicks:456,pdfRefs:56,product:"Turk",script:"Feminization of Men"},
  {id:"bb3",inf:"Brad Barton",dt:"2024-09-30",plt:"YouTube",views:56000,pdfRev:6789.01,pdfSpend:1400,pdfClicks:521,pdfRefs:67,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"bb4",inf:"Brad Barton",dt:"2024-11-15",plt:"YouTube",views:67000,pdfRev:8765.43,pdfSpend:1700,pdfClicks:612,pdfRefs:87,product:"BF",script:""},
  {id:"dr1",inf:"Dave Rubin",dt:"2024-05-01",plt:"YouTube",views:189000,pdfRev:7654.32,pdfSpend:8000,pdfClicks:612,pdfRefs:76,product:"NMN B2G1",script:""},
  {id:"dr2",inf:"Dave Rubin",dt:"2024-08-15",plt:"YouTube",views:212000,pdfRev:4567.89,pdfSpend:8500,pdfClicks:456,pdfRefs:45,product:"Cocoa 40%",script:""},
  {id:"bw1",inf:"Blaire White",dt:"2024-06-01",plt:"YouTube",views:145000,pdfRev:4321.09,pdfSpend:5500,pdfClicks:432,pdfRefs:43,product:"NMN B2G1",script:""},
  {id:"bw2",inf:"Blaire White",dt:"2024-09-15",plt:"YouTube",views:167000,pdfRev:5678.9,pdfSpend:6000,pdfClicks:567,pdfRefs:56,product:"Cocoa 40%",script:""}
];

// SCRIPTS LIBRARY
const SCRIPTS = {
  "Joe Rogan NMN":{name:"Joe Rogan NMN",product:"NMN",avgRoas:5.8,timesUsed:34,totalRev:287650,hook:"Joe Rogan just dropped a BOMBSHELL...",problem:"Your NAD+ levels drop by 50% by 50...",solution:"NMN - the direct precursor to NAD+...",cta:"BOGO deal - Buy One Get One FREE...",tips:["Mention David Sinclair","Keep energy high"]},
  "Feminization of Men":{name:"Feminization of Men",product:"Turk & Tongkat",avgRoas:7.04,timesUsed:41,totalRev:312890,hook:"Men today have 50% less testosterone...",problem:"Plastics, soy, chemicals attacking you...",solution:"Tongkat Ali and Turkesterone...",cta:"Buy 2 Get 1 FREE...",tips:["Tap into frustration","Historical comparison"]},
  "Three Letter Agencies":{name:"Three Letter Agencies",product:"NMN",avgRoas:4.2,timesUsed:22,totalRev:156780,hook:"Ever wonder why the FDA is trying to ban...",problem:"The system makes you a lifelong customer...",solution:"NMN is what the elites take...",cta:"Get NMN while you still can...",tips:["Keep credible","Urgency around regulation"]},
  "NMN LAST DAY":{name:"NMN LAST DAY",product:"NMN",avgRoas:12.8,timesUsed:18,totalRev:423560,hook:"FINAL HOURS. Biggest deal ends midnight...",problem:"Stop waiting on your health...",solution:"NMN is the answer at half price...",cta:"BOGO ends TONIGHT...",tips:["Maximum urgency","Repeat CTA"]},
  "Joe Rogan GLP-1":{name:"Joe Rogan GLP-1",product:"GLP-1",avgRoas:4.1,timesUsed:19,totalRev:134560,hook:"Joe Rogan revealed natural Ozempic...",problem:"GLP-1 drugs cost $1,500/month...",solution:"Berberine activates GLP-1 naturally...",cta:"Buy 2 Get 1 FREE...",tips:["Compare price to Ozempic","Natural alternative"]},
  "RFK FDA Tweet":{name:"RFK FDA Tweet",product:"NMN",avgRoas:5.2,timesUsed:15,totalRev:98760,hook:"RFK Jr. called out the FDA...",problem:"FDA works for pharma companies...",solution:"NMN threatens their business model...",cta:"Support health freedom...",tips:["MAHA momentum","Health freedom angle"]},
  "Cocoa Flavanols":{name:"Cocoa Flavanols",product:"Cocoa",avgRoas:4.5,timesUsed:47,totalRev:267890,hook:"Harvard study: cut heart disease by 27%...",problem:"Heart disease is #1 killer...",solution:"Cocoa flavanols improve blood flow...",cta:"40% OFF right now...",tips:["Lead with Harvard study","Compare to statins"]},
  "Dr. Berg":{name:"Dr. Berg Authority",product:"Multiple",avgRoas:4.7,timesUsed:12,totalRev:89450,hook:"Dr. Berg revealed his top supplements...",problem:"So much noise in supplements...",solution:"Trust the experts...",cta:"Check the link for his stack...",tips:["Borrow authority","Trust angle"]},
  "Sleepex":{name:"Sleepex Deep Sleep",product:"Sleepex",avgRoas:3.8,timesUsed:14,totalRev:67890,hook:"You're not lazy, you're not sleeping...",problem:"Melatonin doesn't keep you asleep...",solution:"GABA, magnesium, adaptogens...",cta:"Buy 2 Get 1 FREE...",tips:["Attack melatonin","Morning energy"]},
  "NMN Europe Banned":{name:"NMN Europe Banned",product:"NMN",avgRoas:8.9,timesUsed:11,totalRev:156780,hook:"Europe just BANNED NMN...",problem:"EU classified as novel food...",solution:"Stock up NOW while you can...",cta:"One final BOGO before regulation...",tips:["Real urgency","Stock up angle"]},
  "Longevity Mix":{name:"Longevity Coffee",product:"Longevity",avgRoas:5.1,timesUsed:8,totalRev:54320,hook:"Morning coffee that adds years...",problem:"Regular coffee just gives energy...",solution:"Infused with Lion's Mane, Chaga...",cta:"Free shipping first order...",tips:["Easy swap","Cognitive benefits"]}
};

const PRODUCTS=["NMN","Cocoa Flavanols","GLP-1/Berberine","Turk & Tongkat","Spermidine","Sleepex","Brain Complex","Spike Protein Detox","Longevity Coffee","NMNH"];
const HOOKS=[{id:1,name:"Joe Rogan Discussion",eff:95},{id:2,name:"FDA/Government Ban",eff:92},{id:3,name:"Big Pharma Suppression",eff:88},{id:4,name:"Europe Ban Warning",eff:86},{id:5,name:"Dr. Authority Reveal",eff:91},{id:6,name:"Testosterone Crisis",eff:84},{id:7,name:"Last Day Urgency",eff:95},{id:8,name:"RFK/MAHA Movement",eff:89}];
const ANGLES=[{id:1,name:"Health Freedom / Anti-FDA",eff:91},{id:2,name:"Big Pharma Conspiracy",eff:88},{id:3,name:"Masculinity / Men's Health",eff:86},{id:4,name:"Longevity / Anti-Aging",eff:89},{id:5,name:"Natural Alternative",eff:85},{id:6,name:"Weight Loss / GLP-1",eff:83},{id:7,name:"Heart/Brain Health",eff:87}];
const PROMOS=[{type:"BOGO",conv:4.2},{type:"40% OFF",conv:3.8},{type:"50% OFF",conv:4.5},{type:"B2G1",conv:3.9},{type:"B2G2",conv:4.8},{type:"Black Friday",conv:5.1}];

const fmt=n=>n>=1e6?`$${(n/1e6).toFixed(2)}M`:n>=1e3?`$${(n/1e3).toFixed(1)}K`:`$${n?.toFixed(0)||0}`;
const fmtK=n=>n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(0)}K`:n?.toLocaleString()||0;

const Loader=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:'spin 1s linear infinite'}}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>;

// CHART COMPONENT
const Chart=({data,color='#f59e0b',height=180,metric='value'})=>{
  const [hovered,setHovered]=useState(null);
  if(!data||!data.length)return<div style={{height,display:'flex',alignItems:'center',justifyContent:'center',color:'#525252'}}>No data</div>;
  const max=Math.max(...data.map(d=>d.value||0));const min=Math.min(...data.map(d=>d.value||0));const range=max-min||1;
  const formatVal=v=>metric==='revenue'||metric==='spend'?fmt(v):metric==='roas'?`${v?.toFixed(2)}x`:fmtK(v);
  return(
    <div style={{position:'relative',height}}>
      {hovered!==null&&data[hovered]&&(
        <div style={{position:'absolute',left:`${Math.min(Math.max((hovered/data.length)*100,10),90)}%`,top:0,transform:'translateX(-50%)',backgroundColor:'#1a1a1a',border:'1px solid #404040',borderRadius:'10px',padding:'12px',zIndex:100,boxShadow:'0 8px 32px rgba(0,0,0,0.5)'}}>
          <p style={{margin:0,fontWeight:'600',color:'#fff',fontSize:'13px'}}>{data[hovered].label}</p>
          <p style={{margin:'6px 0 0',color,fontWeight:'700',fontSize:'18px'}}>{formatVal(data[hovered].value)}</p>
          {data[hovered].extra&&<p style={{margin:'4px 0 0',color:'#737373',fontSize:'11px'}}>{data[hovered].extra}</p>}
        </div>
      )}
      <div style={{display:'flex',alignItems:'flex-end',gap:data.length>20?'2px':'6px',height:height-35,padding:'0 4px'}}>
        {data.map((d,i)=>{const h=max>0?((d.value-min)/range)*100:0;return(
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',minWidth:'4px'}} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
            <div style={{width:'100%',background:hovered===i?`linear-gradient(180deg,${color},${color}dd)`:`linear-gradient(180deg,${color}cc,${color}66)`,borderRadius:'4px 4px 0 0',height:`${Math.max(h,3)}%`,minHeight:'4px',transition:'all 0.15s',transform:hovered===i?'scaleY(1.05)':'scaleY(1)',transformOrigin:'bottom',boxShadow:hovered===i?`0 0 20px ${color}40`:'none'}}/>
          </div>
        )})}
      </div>
      {data.length<=12&&<div style={{display:'flex',gap:'6px',padding:'8px 4px 0'}}>{data.map((d,i)=><span key={i} style={{flex:1,fontSize:'10px',color:hovered===i?'#fff':'#525252',textAlign:'center',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.label}</span>)}</div>}
    </div>
  );
};

// MAIN APP
export default function App(){
  const [tab,setTab]=useState('dashboard');
  const [selInf,setSelInf]=useState(null);
  const [selScript,setSelScript]=useState(null);
  const [search,setSearch]=useState('');
  const [sortBy,setSortBy]=useState('revenue');
  const [sortDir,setSortDir]=useState('desc');
  const [timeRange,setTimeRange]=useState('all');
  const [chartMetric,setChartMetric]=useState('revenue');
  const [selMetric,setSelMetric]=useState(null);
  const [upConnected,setUpConnected]=useState(false);
  const [upKey,setUpKey]=useState('');
  const [showUp,setShowUp]=useState(false);
  const [upData,setUpData]=useState({referrals:[],affiliates:[],loading:false,error:null});
  const [genInf,setGenInf]=useState('');
  const [genProduct,setGenProduct]=useState('');
  const [genHook,setGenHook]=useState('');
  const [genAngle,setGenAngle]=useState('');
  const [genPromo,setGenPromo]=useState('');
  const [genTopic,setGenTopic]=useState('');
  const [genMsgs,setGenMsgs]=useState([]);
  const [genInput,setGenInput]=useState('');
  const [genLoading,setGenLoading]=useState(false);
  const [liveScript,setLiveScript]=useState(null);
  const [brainMsgs,setBrainMsgs]=useState([]);
  const [brainInput,setBrainInput]=useState('');
  const [brainLoading,setBrainLoading]=useState(false);
  const chatRef=useRef(null);
  const brainRef=useRef(null);

  const fetchUp=useCallback(async()=>{
    if(!upKey)return;
    setUpData(p=>({...p,loading:true,error:null}));
    try{
      const[refRes,affRes]=await Promise.all([fetch('/api/uppromote/referrals',{headers:{'Authorization':`Bearer ${upKey}`}}),fetch('/api/uppromote/affiliates',{headers:{'Authorization':`Bearer ${upKey}`}})]);
      const refData=await refRes.json();const affData=await affRes.json();
      setUpData({referrals:refData.data||[],affiliates:affData.data||[],loading:false,error:null,lastSync:new Date()});
      setUpConnected(true);
    }catch(e){setUpData(p=>({...p,loading:false,error:e.message}));}
  },[upKey]);

  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;if(brainRef.current)brainRef.current.scrollTop=brainRef.current.scrollHeight;},[genMsgs,brainMsgs]);

  const stats=useMemo(()=>{
    const r=VIDEOS.reduce((s,v)=>s+(v.pdfRev||0),0);const sp=VIDEOS.reduce((s,v)=>s+(v.pdfSpend||0),0);
    const vw=VIDEOS.reduce((s,v)=>s+(v.views||0),0);const refs=VIDEOS.reduce((s,v)=>s+(v.pdfRefs||0),0);
    const clicks=VIDEOS.reduce((s,v)=>s+(v.pdfClicks||0),0);
    return{revenue:r,spend:sp,views:vw,refs,clicks,roas:sp>0?r/sp:0,videos:VIDEOS.length,convRate:clicks>0?(refs/clicks)*100:0};
  },[]);

  const influencers=useMemo(()=>{
    const m={};VIDEOS.forEach(v=>{
      if(!m[v.inf])m[v.inf]={name:v.inf,videos:[],revenue:0,spend:0,views:0,clicks:0,refs:0,scripts:new Set(),platforms:new Set(),products:new Set()};
      m[v.inf].videos.push(v);m[v.inf].revenue+=v.pdfRev||0;m[v.inf].spend+=v.pdfSpend||0;m[v.inf].views+=v.views||0;m[v.inf].clicks+=v.pdfClicks||0;m[v.inf].refs+=v.pdfRefs||0;
      if(v.script)m[v.inf].scripts.add(v.script);if(v.plt)m[v.inf].platforms.add(v.plt);if(v.product)m[v.inf].products.add(v.product);
    });
    return Object.values(m).map(i=>({...i,count:i.videos.length,roas:i.spend>0?i.revenue/i.spend:0,convRate:i.clicks>0?(i.refs/i.clicks)*100:0,avgRev:i.videos.length>0?i.revenue/i.videos.length:0,scripts:[...i.scripts],platforms:[...i.platforms],products:[...i.products]}));
  },[]);

  const sorted=useMemo(()=>{
    let f=search?influencers.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())):influencers;
    return[...f].sort((a,b)=>sortDir==='desc'?(b[sortBy]||0)-(a[sortBy]||0):(a[sortBy]||0)-(b[sortBy]||0));
  },[influencers,search,sortBy,sortDir]);

  const getChartData=(inf,metric,range='all')=>{
    if(!inf)return[];let videos=[...inf.videos].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range!=='all'){const now=new Date();const months={'1m':1,'3m':3,'6m':6,'1y':12}[range]||12;const cutoff=new Date(now.setMonth(now.getMonth()-months));videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    return videos.map(v=>({label:new Date(v.dt).toLocaleDateString('en-US',{month:'short',day:'numeric'}),value:metric==='revenue'?v.pdfRev:metric==='roas'?(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0):metric==='views'?v.views:v.pdfRefs,extra:v.product||'N/A'}));
  };

  const getTimeData=(metric,range='all')=>{
    let videos=[...VIDEOS].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range!=='all'){const now=new Date();const months={'1m':1,'3m':3,'6m':6,'1y':12}[range]||12;const cutoff=new Date(now.setMonth(now.getMonth()-months));videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    const monthly={};videos.forEach(v=>{const m=v.dt.substring(0,7);if(!monthly[m])monthly[m]={revenue:0,spend:0,views:0,refs:0,count:0};monthly[m].revenue+=v.pdfRev||0;monthly[m].spend+=v.pdfSpend||0;monthly[m].views+=v.views||0;monthly[m].refs+=v.pdfRefs||0;monthly[m].count+=1;});
    return Object.entries(monthly).map(([month,data])=>({label:new Date(month+'-01').toLocaleDateString('en-US',{month:'short',year:'2-digit'}),value:metric==='roas'?(data.spend>0?data.revenue/data.spend:0):data[metric],extra:`${data.count} videos`}));
  };

  const generateScript=async(msg)=>{
    if(!msg?.trim()&&!genProduct)return;
    const m=msg?.trim()||`Generate script for ${genProduct}${genInf?` for ${genInf}'s audience`:''}${genHook?` with ${HOOKS.find(h=>h.id==genHook)?.name} hook`:''}${genAngle?` using ${ANGLES.find(a=>a.id==genAngle)?.name} angle`:''}${genPromo?` promoting ${genPromo}`:''}${genTopic?`. Topic: ${genTopic}`:''}`;
    const newMsgs=[...genMsgs,{role:'user',content:m}];setGenMsgs(newMsgs);setGenInput('');setGenLoading(true);
    const topInf=sorted.slice(0,10).map(i=>`${i.name}: ${i.roas.toFixed(2)}x ROAS, ${i.count} videos`).join('\n');
    const sys=`You create scripts for Black Forest Supplements. Top influencers:\n${topInf}\n\nProducts: ${PRODUCTS.join(', ')}\n\nRespond with JSON: {"title":"...","product":"...","targetInfluencer":"...","hook":"15-30s opening","problem":"30-45s pain point","solution":"30s product","proof":"20-30s social proof","cta":"15-20s call to action","tips":["..."],"expectedRoas":4.5,"confidence":85}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,system:sys,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})});
      if(!res.ok)throw new Error(`API error: ${res.status}`);
      const data=await res.json();const txt=data.content?.[0]?.text||"Error";
      try{const match=txt.match(/\{[\s\S]*"hook"[\s\S]*"cta"[\s\S]*\}/);if(match)setLiveScript(JSON.parse(match[0]));}catch(e){}
      setGenMsgs([...newMsgs,{role:'assistant',content:txt}]);
    }catch(e){setGenMsgs([...newMsgs,{role:'assistant',content:`Error: ${e.message}`}]);}finally{setGenLoading(false);}
  };

  const sendBrain=async(msg)=>{
    if(!msg?.trim())return;
    const newMsgs=[...brainMsgs,{role:'user',content:msg}];setBrainMsgs(newMsgs);setBrainInput('');setBrainLoading(true);
    const infData=sorted.slice(0,15).map(i=>`${i.name}: $${(i.revenue/1000).toFixed(0)}K rev, ${i.roas.toFixed(2)}x ROAS, ${i.count} videos, top scripts: ${i.scripts.slice(0,3).join(', ')||'none'}`).join('\n');
    const scriptData=Object.entries(SCRIPTS).map(([k,v])=>`${k}: ${v.avgRoas}x ROAS, used ${v.timesUsed} times`).join('\n');
    const sys=`You are the BFS Intelligence Brain. You have complete knowledge of all influencer performance data and script analytics.\n\nINFLUENCER DATA:\n${infData}\n\nSCRIPT DATA:\n${scriptData}\n\nTotal: ${stats.videos} videos, ${fmt(stats.revenue)} revenue, ${stats.roas.toFixed(2)}x overall ROAS.\n\nProvide specific, data-driven insights. Reference actual numbers. Be concise and actionable.`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:sys,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})});
      if(!res.ok)throw new Error(`API error: ${res.status}`);
      const data=await res.json();const txt=data.content?.[0]?.text||"Error";
      setBrainMsgs([...newMsgs,{role:'assistant',content:txt}]);
    }catch(e){setBrainMsgs([...newMsgs,{role:'assistant',content:`Error: ${e.message}`}]);}finally{setBrainLoading(false);}
  };

  const tabs=[{id:'dashboard',label:'Dashboard',icon:'📊'},{id:'influencers',label:'Influencers',icon:'👥'},{id:'scripts',label:'Scripts',icon:'📝'},{id:'insights',label:'Insights',icon:'💡'},{id:'brain',label:'Brain Chat',icon:'🧠'},{id:'generator',label:'AI Generator',icon:'✨'}];
  const ranges=[{id:'1m',label:'1M'},{id:'3m',label:'3M'},{id:'6m',label:'6M'},{id:'1y',label:'1Y'},{id:'all',label:'All'}];

  return(
    <div style={{minHeight:'100vh',backgroundColor:'#0a0a0a',color:'#f0f0f0',fontFamily:"'Inter',-apple-system,sans-serif"}}>
      {/* UpPromote Modal */}
      {showUp&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100}}>
        <div style={{backgroundColor:'#1a1a1a',borderRadius:'20px',padding:'32px',width:'100%',maxWidth:'500px',border:'1px solid #333'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}><h3 style={{fontSize:'22px',fontWeight:'700',margin:0}}>🔗 Connect UpPromote</h3><button onClick={()=>setShowUp(false)} style={{padding:'8px 12px',background:'#333',border:'none',cursor:'pointer',color:'#fff',borderRadius:'8px'}}>✕</button></div>
          <input type="password" placeholder="UpPromote API Key..." value={upKey} onChange={e=>setUpKey(e.target.value)} style={{width:'100%',padding:'16px',backgroundColor:'#0f0f0f',border:'2px solid #333',borderRadius:'12px',color:'#fff',fontSize:'15px',marginBottom:'20px',boxSizing:'border-box'}}/>
          {upData.error&&<p style={{color:'#ef4444',marginBottom:'16px'}}>Error: {upData.error}</p>}
          <div style={{display:'flex',gap:'12px'}}><button onClick={()=>setShowUp(false)} style={{flex:1,padding:'14px',backgroundColor:'#333',color:'#fff',borderRadius:'12px',border:'none',cursor:'pointer'}}>Cancel</button><button onClick={()=>{if(upKey.trim()){fetchUp();setShowUp(false);}}} style={{flex:1,padding:'14px',background:'linear-gradient(135deg,#f59e0b,#ea580c)',color:'#fff',borderRadius:'12px',border:'none',cursor:'pointer',fontWeight:'600'}}>🚀 Connect</button></div>
        </div>
      </div>}
      
      {/* Metric Detail Modal */}
      {selMetric&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:'20px'}}>
        <div style={{backgroundColor:'#1a1a1a',borderRadius:'24px',width:'100%',maxWidth:'900px',maxHeight:'80vh',overflow:'auto',border:'1px solid #333'}}>
          <div style={{padding:'24px',borderBottom:'1px solid #333',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#1a1a1a',zIndex:10}}>
            <h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>{selMetric.label} Over Time</h2>
            <button onClick={()=>setSelMetric(null)} style={{padding:'10px 14px',background:'#333',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}>✕</button>
          </div>
          <div style={{padding:'24px'}}>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>{ranges.map(r=><button key={r.id} onClick={()=>setTimeRange(r.id)} style={{padding:'8px 16px',borderRadius:'8px',backgroundColor:timeRange===r.id?'#f59e0b':'#252525',border:'none',color:timeRange===r.id?'#000':'#fff',cursor:'pointer',fontWeight:timeRange===r.id?'700':'400'}}>{r.label}</button>)}</div>
            <Chart data={getTimeData(selMetric.metric,timeRange)} color={selMetric.color} height={300} metric={selMetric.metric}/>
          </div>
        </div>
      </div>}

      {/* Influencer Modal */}
      {selInf&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.92)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:'20px'}}>
        <div style={{backgroundColor:'#1a1a1a',borderRadius:'24px',width:'100%',maxWidth:'1200px',maxHeight:'90vh',overflow:'auto',border:'1px solid #333'}}>
          <div style={{padding:'24px 32px',borderBottom:'1px solid #333',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#1a1a1a',zIndex:10}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{width:'64px',height:'64px',borderRadius:'16px',background:`linear-gradient(135deg,${selInf.roas>=4?'#22c55e':selInf.roas>=2?'#f59e0b':'#ef4444'},${selInf.roas>=4?'#16a34a':selInf.roas>=2?'#d97706':'#dc2626'})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',fontWeight:'700',color:'#fff'}}>{selInf.name.charAt(0)}</div>
              <div><h2 style={{fontSize:'26px',fontWeight:'800',margin:0}}>{selInf.name}</h2><p style={{color:'#a3a3a3',margin:'4px 0 0'}}>{selInf.platforms.join(' • ')} • {selInf.count} videos</p></div>
            </div>
            <button onClick={()=>{setSelInf(null);setTimeRange('all');setChartMetric('revenue');}} style={{padding:'10px 14px',background:'#333',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}>✕</button>
          </div>
          <div style={{padding:'24px 32px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'12px',marginBottom:'24px'}}>
              {[{l:'Revenue',v:fmt(selInf.revenue),c:'#22c55e'},{l:'Spend',v:fmt(selInf.spend),c:'#ef4444'},{l:'ROAS',v:`${selInf.roas.toFixed(2)}x`,c:selInf.roas>=3?'#22c55e':'#fbbf24'},{l:'Views',v:fmtK(selInf.views),c:'#60a5fa'},{l:'Conv Rate',v:`${selInf.convRate.toFixed(1)}%`,c:'#a78bfa'},{l:'Avg/Video',v:fmt(selInf.avgRev),c:'#f472b6'}].map((m,i)=><div key={i} style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px',border:'1px solid #333'}}><p style={{fontSize:'11px',color:'#737373',margin:0}}>{m.l}</p><p style={{fontSize:'22px',fontWeight:'700',margin:'6px 0 0',color:m.c}}>{m.v}</p></div>)}
            </div>
            <div style={{backgroundColor:'#252525',borderRadius:'16px',padding:'20px',border:'1px solid #333',marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <div style={{display:'flex',gap:'8px'}}>{['revenue','roas','views','refs'].map(m=><button key={m} onClick={()=>setChartMetric(m)} style={{padding:'8px 14px',borderRadius:'8px',backgroundColor:chartMetric===m?'rgba(245,158,11,0.2)':'transparent',border:`1px solid ${chartMetric===m?'#f59e0b':'#404040'}`,color:chartMetric===m?'#fbbf24':'#a3a3a3',cursor:'pointer',fontSize:'12px',fontWeight:chartMetric===m?'600':'400',textTransform:'capitalize'}}>{m==='refs'?'Referrals':m}</button>)}</div>
                <div style={{display:'flex',gap:'4px',backgroundColor:'#1a1a1a',padding:'4px',borderRadius:'8px'}}>{ranges.map(t=><button key={t.id} onClick={()=>setTimeRange(t.id)} style={{padding:'6px 12px',borderRadius:'6px',backgroundColor:timeRange===t.id?'#f59e0b':'transparent',border:'none',color:timeRange===t.id?'#000':'#737373',cursor:'pointer',fontWeight:timeRange===t.id?'700':'400',fontSize:'11px'}}>{t.label}</button>)}</div>
              </div>
              <Chart data={getChartData(selInf,chartMetric,timeRange)} color={chartMetric==='revenue'?'#22c55e':chartMetric==='roas'?'#fbbf24':chartMetric==='views'?'#60a5fa':'#a78bfa'} height={200} metric={chartMetric}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
              <div style={{backgroundColor:'#252525',borderRadius:'14px',padding:'18px',border:'1px solid #333'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>📝 Scripts Used ({selInf.scripts.length})</h4><div style={{display:'flex',flexDirection:'column',gap:'6px',maxHeight:'120px',overflowY:'auto'}}>{selInf.scripts.length>0?selInf.scripts.map((s,i)=><div key={i} onClick={()=>{setSelScript(SCRIPTS[s]||{name:s});}} style={{padding:'8px 12px',borderRadius:'8px',backgroundColor:'#1a1a1a',border:'1px solid #333',fontSize:'12px',cursor:'pointer'}}>{s}</div>):<p style={{color:'#525252'}}>No scripts</p>}</div></div>
              <div style={{backgroundColor:'#252525',borderRadius:'14px',padding:'18px',border:'1px solid #333'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>🎯 Products ({selInf.products.length})</h4><div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>{[...selInf.products].slice(0,12).map((p,i)=><span key={i} style={{padding:'5px 10px',borderRadius:'6px',backgroundColor:'#1a1a1a',border:'1px solid #333',fontSize:'11px'}}>{p}</span>)}</div></div>
            </div>
            <div style={{backgroundColor:'#252525',borderRadius:'14px',padding:'18px',border:'1px solid #333'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>📹 Video History ({selInf.videos.length})</h4>
              <div style={{maxHeight:'200px',overflowY:'auto',borderRadius:'8px',border:'1px solid #333'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}><thead><tr style={{backgroundColor:'#1a1a1a'}}><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Date</th><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Product</th><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Script</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>Views</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>Revenue</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>ROAS</th></tr></thead><tbody>{selInf.videos.sort((a,b)=>new Date(b.dt)-new Date(a.dt)).map((v,i)=><tr key={i} style={{borderTop:'1px solid #333'}}><td style={{padding:'10px',color:'#a3a3a3'}}>{v.dt}</td><td style={{padding:'10px',maxWidth:'100px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{v.product||'-'}</td><td style={{padding:'10px',color:'#737373',maxWidth:'100px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',cursor:v.script?'pointer':'default'}} onClick={()=>v.script&&setSelScript(SCRIPTS[v.script]||{name:v.script})}>{v.script||'-'}</td><td style={{padding:'10px',textAlign:'right',color:'#60a5fa'}}>{fmtK(v.views)}</td><td style={{padding:'10px',textAlign:'right',color:'#22c55e',fontWeight:'600'}}>{fmt(v.pdfRev)}</td><td style={{padding:'10px',textAlign:'right'}}><span style={{padding:'2px 6px',borderRadius:'4px',backgroundColor:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?'rgba(34,197,94,0.15)':'rgba(251,191,36,0.15)',color:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?'#22c55e':'#fbbf24',fontWeight:'600',fontSize:'11px'}}>{(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0).toFixed(2)}x</span></td></tr>)}</tbody></table></div>
            </div>
          </div>
        </div>
      </div>}

      {/* Script Modal */}
      {selScript&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.92)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:'20px'}}>
        <div style={{backgroundColor:'#1a1a1a',borderRadius:'24px',width:'100%',maxWidth:'800px',maxHeight:'90vh',overflow:'auto',border:'1px solid #333'}}>
          <div style={{padding:'24px',borderBottom:'1px solid #333',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#1a1a1a',zIndex:10}}>
            <div><h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>{selScript.name}</h2><p style={{color:'#a3a3a3',margin:'4px 0 0'}}>{selScript.product}</p></div>
            <button onClick={()=>setSelScript(null)} style={{padding:'10px 14px',background:'#333',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}>✕</button>
          </div>
          <div style={{padding:'24px'}}>
            {selScript.avgRoas&&<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'20px'}}>
              <div style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px',border:'1px solid #333'}}><p style={{fontSize:'11px',color:'#737373',margin:0}}>Avg ROAS</p><p style={{fontSize:'24px',fontWeight:'700',margin:'6px 0 0',color:'#22c55e'}}>{selScript.avgRoas}x</p></div>
              <div style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px',border:'1px solid #333'}}><p style={{fontSize:'11px',color:'#737373',margin:0}}>Times Used</p><p style={{fontSize:'24px',fontWeight:'700',margin:'6px 0 0',color:'#60a5fa'}}>{selScript.timesUsed}</p></div>
              <div style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px',border:'1px solid #333'}}><p style={{fontSize:'11px',color:'#737373',margin:0}}>Total Revenue</p><p style={{fontSize:'24px',fontWeight:'700',margin:'6px 0 0',color:'#fbbf24'}}>{fmt(selScript.totalRev)}</p></div>
            </div>}
            {selScript.hook&&<div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[{key:'hook',label:'🎣 HOOK',color:'#f59e0b'},{key:'problem',label:'❗ PROBLEM',color:'#ef4444'},{key:'solution',label:'💡 SOLUTION',color:'#22c55e'},{key:'cta',label:'🎯 CTA',color:'#a78bfa'}].map(({key,label,color})=>selScript[key]&&<div key={key} style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px',borderLeft:`4px solid ${color}`}}><h5 style={{fontSize:'12px',fontWeight:'700',color,margin:'0 0 8px'}}>{label}</h5><p style={{color:'#e5e5e5',fontSize:'14px',lineHeight:'1.6',margin:0}}>{selScript[key]}</p></div>)}
              {selScript.tips&&<div style={{backgroundColor:'#252525',borderRadius:'12px',padding:'16px'}}><h5 style={{fontSize:'12px',fontWeight:'700',color:'#fbbf24',margin:'0 0 8px'}}>💡 TIPS</h5><ul style={{margin:0,paddingLeft:'16px',color:'#d1d5db',fontSize:'13px'}}>{selScript.tips.map((t,i)=><li key={i} style={{marginBottom:'4px'}}>{t}</li>)}</ul></div>}
            </div>}
          </div>
        </div>
      </div>}

      {/* Header */}
      <header style={{borderBottom:'2px solid #d97706',background:'linear-gradient(135deg,#0a0a0a 0%,#1a1510 50%,#0a0a0a 100%)',padding:'16px 32px'}}>
        <div style={{maxWidth:'1600px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'linear-gradient(135deg,#f59e0b,#b45309)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>🌲</div>
            <div><h1 style={{fontSize:'24px',fontWeight:'800',color:'#fff',margin:0}}>Black Forest Intelligence</h1><p style={{fontSize:'12px',color:'#fbbf24',margin:0}}>{stats.videos} Videos • {sorted.length} Influencers • {fmt(stats.revenue)} Revenue</p></div>
          </div>
          <button onClick={()=>upConnected?fetchUp():setShowUp(true)} style={{padding:'10px 18px',borderRadius:'10px',backgroundColor:upConnected?'rgba(16,185,129,0.15)':'rgba(245,158,11,0.15)',border:`1px solid ${upConnected?'rgba(16,185,129,0.5)':'rgba(245,158,11,0.5)'}`,color:upConnected?'#4ade80':'#fcd34d',fontSize:'13px',cursor:'pointer'}}>{upData.loading?'⏳ Syncing...':upConnected?'🔄 Refresh UpPromote':'🔗 Connect UpPromote'}</button>
        </div>
      </header>

      {/* Nav */}
      <nav style={{borderBottom:'1px solid #333',backgroundColor:'#111',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:'1600px',margin:'0 auto',padding:'0 32px',display:'flex',gap:'4px'}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'14px 22px',background:tab===t.id?'linear-gradient(to bottom,rgba(245,158,11,0.15),transparent)':'transparent',border:'none',borderBottom:tab===t.id?'3px solid #f59e0b':'3px solid transparent',color:tab===t.id?'#fbbf24':'#a3a3a3',cursor:'pointer',fontWeight:tab===t.id?'600':'500',fontSize:'14px',display:'flex',alignItems:'center',gap:'6px'}}><span>{t.icon}</span>{t.label}</button>)}
        </div>
      </nav>

      <main style={{maxWidth:'1600px',margin:'0 auto',padding:'24px 32px'}}>
        {/* DASHBOARD */}
        {tab==='dashboard'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'12px'}}>
            {[{l:'Total Revenue',v:fmt(stats.revenue),c:'#22c55e',i:'💰',m:'revenue'},{l:'Total Spend',v:fmt(stats.spend),c:'#ef4444',i:'💸',m:'spend'},{l:'Overall ROAS',v:`${stats.roas.toFixed(2)}x`,c:'#fbbf24',i:'📈',m:'roas'},{l:'Total Views',v:fmtK(stats.views),c:'#60a5fa',i:'👁️',m:'views'},{l:'Referrals',v:fmtK(stats.refs),c:'#a78bfa',i:'🔗',m:'refs'},{l:'Conversion',v:`${stats.convRate.toFixed(1)}%`,c:'#f472b6',i:'🎯',m:null}].map((m,i)=><div key={i} onClick={()=>m.m&&setSelMetric({label:m.l,metric:m.m,color:m.c})} style={{backgroundColor:'#1c1c1c',borderRadius:'14px',padding:'18px',border:'1px solid #333',cursor:m.m?'pointer':'default',transition:'all 0.2s'}} onMouseEnter={e=>{if(m.m)e.currentTarget.style.borderColor=m.c;}} onMouseLeave={e=>{e.currentTarget.style.borderColor='#333';}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}><p style={{fontSize:'11px',color:'#737373',margin:0}}>{m.l}</p><span>{m.i}</span></div><p style={{fontSize:'26px',fontWeight:'800',color:m.c,margin:0}}>{m.v}</p>{m.m&&<p style={{fontSize:'10px',color:'#525252',margin:'6px 0 0'}}>Click for chart →</p>}</div>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid rgba(245,158,11,0.4)'}}><h3 style={{fontWeight:'700',color:'#fde68a',marginBottom:'12px'}}>🏆 Revenue Leader</h3><div onClick={()=>setSelInf(sorted[0])} style={{display:'flex',alignItems:'center',gap:'14px',cursor:'pointer'}}><div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,#f59e0b,#b45309)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'700'}}>{sorted[0]?.name.charAt(0)}</div><div><p style={{fontSize:'17px',fontWeight:'700',margin:0}}>{sorted[0]?.name}</p><p style={{color:'#fbbf24',margin:'2px 0',fontWeight:'600'}}>{fmt(sorted[0]?.revenue)}</p><p style={{color:'#737373',margin:0,fontSize:'11px'}}>{sorted[0]?.count} videos • {sorted[0]?.roas.toFixed(2)}x ROAS</p></div></div></div>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid rgba(16,185,129,0.4)'}}><h3 style={{fontWeight:'700',color:'#a7f3d0',marginBottom:'12px'}}>🎯 Best ROAS (5+ videos)</h3>{(()=>{const best=sorted.filter(i=>i.count>=5).sort((a,b)=>b.roas-a.roas)[0];return best&&<div onClick={()=>setSelInf(best)} style={{display:'flex',alignItems:'center',gap:'14px',cursor:'pointer'}}><div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,#10b981,#047857)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'700'}}>{best.name.charAt(0)}</div><div><p style={{fontSize:'17px',fontWeight:'700',margin:0}}>{best.name}</p><p style={{color:'#4ade80',margin:'2px 0',fontWeight:'600'}}>{best.roas.toFixed(2)}x ROAS</p><p style={{color:'#737373',margin:0,fontSize:'11px'}}>{best.count} videos • {fmt(best.revenue)}</p></div></div>;})()}</div>
          </div>
          <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <h3 style={{fontWeight:'700',margin:0}}>📊 Leaderboard</h3>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:'8px 12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'8px',color:'#fff',fontSize:'12px'}}><option value="revenue">Revenue</option><option value="roas">ROAS</option><option value="spend">Spend</option><option value="views">Views</option><option value="refs">Referrals</option><option value="count">Videos</option></select>
                <button onClick={()=>setSortDir(d=>d==='desc'?'asc':'desc')} style={{padding:'8px 12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'8px',color:'#fff',fontSize:'12px',cursor:'pointer'}}>{sortDir==='desc'?'↓ High':'↑ Low'}</button>
              </div>
            </div>
            <div style={{borderRadius:'10px',overflow:'hidden',border:'1px solid #333'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}><thead><tr style={{backgroundColor:'#252525'}}><th style={{textAlign:'left',padding:'12px',color:'#737373'}}>#</th><th style={{textAlign:'left',padding:'12px',color:'#737373'}}>Influencer</th><th style={{textAlign:'center',padding:'12px',color:'#737373'}}>Videos</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Revenue</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Spend</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>ROAS</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Views</th></tr></thead><tbody>{sorted.slice(0,15).map((inf,i)=><tr key={inf.name} onClick={()=>setSelInf(inf)} style={{borderTop:'1px solid #333',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#252525'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}><td style={{padding:'12px'}}><span style={{width:'24px',height:'24px',borderRadius:'6px',backgroundColor:i<3?['#fbbf24','#9ca3af','#cd7f32'][i]+'25':'#252525',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:i<3?['#fbbf24','#d1d5db','#cd7f32'][i]:'#737373',fontWeight:'700'}}>{i+1}</span></td><td style={{padding:'12px',fontWeight:'500'}}>{inf.name}</td><td style={{padding:'12px',textAlign:'center'}}>{inf.count}</td><td style={{padding:'12px',textAlign:'right',color:'#22c55e',fontWeight:'600'}}>{fmt(inf.revenue)}</td><td style={{padding:'12px',textAlign:'right',color:'#ef4444'}}>{fmt(inf.spend)}</td><td style={{padding:'12px',textAlign:'right'}}><span style={{padding:'3px 8px',borderRadius:'4px',backgroundColor:inf.roas>=3?'rgba(34,197,94,0.15)':'rgba(251,191,36,0.15)',color:inf.roas>=3?'#22c55e':'#fbbf24',fontWeight:'700',fontSize:'12px'}}>{inf.roas.toFixed(2)}x</span></td><td style={{padding:'12px',textAlign:'right'}}>{fmtK(inf.views)}</td></tr>)}</tbody></table></div>
          </div>
        </div>}

        {/* INFLUENCERS */}
        {tab==='influencers'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>👥 All Influencers ({sorted.length})</h2><input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'260px',padding:'12px 16px',backgroundColor:'#1c1c1c',border:'1px solid #333',borderRadius:'10px',color:'#fff',fontSize:'14px'}}/></div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'14px'}}>{sorted.map(inf=><div key={inf.name} onClick={()=>setSelInf(inf)} style={{backgroundColor:'#1c1c1c',borderRadius:'14px',padding:'18px',border:'1px solid #333',cursor:'pointer',transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#f59e0b'} onMouseLeave={e=>e.currentTarget.style.borderColor='#333'}><div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px'}}><div style={{width:'46px',height:'46px',borderRadius:'12px',background:`linear-gradient(135deg,${inf.roas>=4?'#22c55e':inf.roas>=2?'#f59e0b':'#ef4444'},${inf.roas>=4?'#16a34a':inf.roas>=2?'#d97706':'#dc2626'})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:'700',color:'#fff'}}>{inf.name.charAt(0)}</div><div style={{flex:1}}><p style={{fontSize:'15px',fontWeight:'700',margin:0}}>{inf.name}</p><p style={{color:'#737373',fontSize:'11px',margin:'2px 0 0'}}>{inf.platforms.join(' • ')} • {inf.count} videos</p></div><div style={{textAlign:'right'}}><p style={{fontSize:'16px',fontWeight:'800',color:'#22c55e',margin:0}}>{fmt(inf.revenue)}</p><p style={{fontSize:'12px',color:inf.roas>=3?'#22c55e':'#fbbf24',margin:'2px 0 0',fontWeight:'600'}}>{inf.roas.toFixed(2)}x</p></div></div><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px'}}>{[{l:'Spend',v:fmt(inf.spend),c:'#ef4444'},{l:'Views',v:fmtK(inf.views),c:'#60a5fa'},{l:'Refs',v:inf.refs,c:'#a78bfa'},{l:'Conv',v:`${inf.convRate.toFixed(1)}%`,c:'#f472b6'}].map((m,i)=><div key={i} style={{backgroundColor:'#252525',borderRadius:'6px',padding:'8px',textAlign:'center'}}><p style={{fontSize:'9px',color:'#525252',margin:0}}>{m.l}</p><p style={{fontSize:'12px',fontWeight:'600',color:m.c,margin:'2px 0 0'}}>{m.v}</p></div>)}</div></div>)}</div>
        </div>}

        {/* SCRIPTS */}
        {tab==='scripts'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>📝 Script Library</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(380px,1fr))',gap:'14px'}}>{Object.entries(SCRIPTS).sort((a,b)=>b[1].avgRoas-a[1].avgRoas).map(([k,s])=><div key={k} onClick={()=>setSelScript(s)} style={{backgroundColor:'#1c1c1c',borderRadius:'14px',padding:'20px',border:`1px solid ${s.avgRoas>=5?'rgba(16,185,129,0.5)':'#333'}`,cursor:'pointer',transition:'all 0.2s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}><div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'12px'}}><div><h3 style={{fontSize:'15px',fontWeight:'700',margin:0}}>{s.name}</h3><p style={{color:'#a3a3a3',fontSize:'12px',margin:'4px 0 0'}}>{s.product}</p></div><div style={{padding:'8px 14px',borderRadius:'8px',backgroundColor:s.avgRoas>=5?'rgba(16,185,129,0.2)':'rgba(245,158,11,0.2)'}}><span style={{fontSize:'18px',fontWeight:'800',color:s.avgRoas>=5?'#4ade80':'#fbbf24'}}>{s.avgRoas}x</span></div></div><div style={{display:'flex',gap:'16px',paddingTop:'12px',borderTop:'1px solid #333',fontSize:'12px',color:'#737373'}}><span>Used {s.timesUsed}x</span><span>•</span><span>{fmt(s.totalRev)} total</span></div></div>)}</div>
        </div>}

        {/* INSIGHTS */}
        {tab==='insights'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>💡 Performance Insights</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}><h3 style={{fontWeight:'700',marginBottom:'16px'}}>🔥 Top Scripts by ROAS</h3><div style={{display:'flex',flexDirection:'column',gap:'10px'}}>{Object.entries(SCRIPTS).sort((a,b)=>b[1].avgRoas-a[1].avgRoas).slice(0,5).map(([k,s],i)=><div key={k} onClick={()=>setSelScript(s)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px',backgroundColor:'#252525',borderRadius:'10px',cursor:'pointer'}}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><span style={{fontSize:'14px',fontWeight:'700',color:['#fbbf24','#d1d5db','#cd7f32','#737373','#737373'][i]}}>{i+1}</span><span style={{fontWeight:'500'}}>{s.name}</span></div><span style={{color:'#4ade80',fontWeight:'700'}}>{s.avgRoas}x</span></div>)}</div></div>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}><h3 style={{fontWeight:'700',marginBottom:'16px'}}>📈 Revenue Over Time</h3><Chart data={getTimeData('revenue','all')} color="#22c55e" height={200} metric="revenue"/></div>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}><h3 style={{fontWeight:'700',marginBottom:'16px'}}>🎯 Top Converters</h3><div style={{display:'flex',flexDirection:'column',gap:'10px'}}>{sorted.filter(i=>i.count>=3).sort((a,b)=>b.convRate-a.convRate).slice(0,5).map((inf,i)=><div key={inf.name} onClick={()=>setSelInf(inf)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px',backgroundColor:'#252525',borderRadius:'10px',cursor:'pointer'}}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><span style={{fontSize:'14px',fontWeight:'700',color:['#fbbf24','#d1d5db','#cd7f32','#737373','#737373'][i]}}>{i+1}</span><span style={{fontWeight:'500'}}>{inf.name}</span></div><span style={{color:'#a78bfa',fontWeight:'700'}}>{inf.convRate.toFixed(1)}%</span></div>)}</div></div>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}><h3 style={{fontWeight:'700',marginBottom:'16px'}}>📊 ROAS Trend</h3><Chart data={getTimeData('roas','all')} color="#fbbf24" height={200} metric="roas"/></div>
          </div>
        </div>}

        {/* BRAIN CHAT */}
        {tab==='brain'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>🧠 Intelligence Brain</h2>
          <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',border:'1px solid #333',display:'flex',flexDirection:'column',height:'600px'}}>
            <div ref={brainRef} style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
              {brainMsgs.length===0?<div style={{textAlign:'center',padding:'40px',color:'#525252'}}><p style={{marginBottom:'16px',fontSize:'15px'}}>Ask me anything about your influencer data, script performance, or strategic recommendations.</p>{["Who's my best performer this quarter?","Which scripts should I use with Black Scout?","What's driving my highest ROAS?","Compare Better Bachelor vs HDC performance"].map((p,i)=><button key={i} onClick={()=>setBrainInput(p)} style={{display:'block',width:'100%',padding:'12px',marginBottom:'8px',borderRadius:'10px',backgroundColor:'#252525',border:'1px solid #333',color:'#a3a3a3',cursor:'pointer',textAlign:'left',fontSize:'13px'}}>{p}</button>)}</div>:brainMsgs.map((m,i)=><div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}><div style={{maxWidth:'80%',borderRadius:'14px',padding:'14px 18px',backgroundColor:m.role==='user'?'rgba(245,158,11,0.2)':'#252525',border:m.role==='user'?'1px solid rgba(245,158,11,0.4)':'1px solid #333'}}><pre style={{whiteSpace:'pre-wrap',fontSize:'14px',fontFamily:'inherit',margin:0,lineHeight:'1.6',color:m.role==='user'?'#fef3c7':'#e5e5e5'}}>{m.content}</pre></div></div>)}
              {brainLoading&&<div style={{display:'flex',justifyContent:'flex-start'}}><div style={{backgroundColor:'#252525',border:'1px solid #333',borderRadius:'14px',padding:'14px 18px',display:'flex',alignItems:'center',gap:'10px'}}><Loader/><span style={{color:'#a3a3a3'}}>Analyzing...</span></div></div>}
            </div>
            <div style={{padding:'16px',borderTop:'1px solid #333'}}><div style={{display:'flex',gap:'12px'}}><input type="text" value={brainInput} onChange={e=>setBrainInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!brainLoading&&brainInput.trim()&&sendBrain(brainInput)} placeholder="Ask the Intelligence Brain..." style={{flex:1,padding:'14px 18px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'12px',color:'#fff',fontSize:'14px'}} disabled={brainLoading}/><button onClick={()=>sendBrain(brainInput)} disabled={brainLoading||!brainInput.trim()} style={{padding:'14px 24px',background:'linear-gradient(135deg,#8b5cf6,#6366f1)',borderRadius:'12px',border:'none',color:'#fff',fontWeight:'600',cursor:'pointer',opacity:brainLoading||!brainInput.trim()?0.5:1}}>Send</button></div></div>
          </div>
        </div>}

        {/* GENERATOR */}
        {tab==='generator'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>✨ AI Script Generator</h2><button onClick={()=>{setGenMsgs([]);setLiveScript(null);setGenInf('');setGenProduct('');setGenHook('');setGenAngle('');setGenPromo('');setGenTopic('');}} style={{padding:'10px 16px',borderRadius:'10px',backgroundColor:'#252525',border:'1px solid #333',color:'#a3a3a3',cursor:'pointer'}}>🔄 Reset</button></div>
          <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',padding:'20px',border:'1px solid #333'}}>
            <h3 style={{fontSize:'15px',fontWeight:'700',margin:'0 0 16px',color:'#fbbf24'}}>⚙️ Configuration</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px',marginBottom:'14px'}}>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>INFLUENCER</label><select value={genInf} onChange={e=>setGenInf(e.target.value)} style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}}><option value="">Select...</option>{sorted.map(inf=><option key={inf.name} value={inf.name}>{inf.name} ({inf.roas.toFixed(2)}x)</option>)}</select></div>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>PRODUCT</label><select value={genProduct} onChange={e=>setGenProduct(e.target.value)} style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}}><option value="">Select...</option>{PRODUCTS.map(p=><option key={p} value={p}>{p}</option>)}</select></div>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>HOOK</label><select value={genHook} onChange={e=>setGenHook(e.target.value)} style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}}><option value="">Select...</option>{HOOKS.map(h=><option key={h.id} value={h.id}>{h.name} ({h.eff}%)</option>)}</select></div>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>ANGLE</label><select value={genAngle} onChange={e=>setGenAngle(e.target.value)} style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}}><option value="">Select...</option>{ANGLES.map(a=><option key={a.id} value={a.id}>{a.name} ({a.eff}%)</option>)}</select></div>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>PROMO</label><select value={genPromo} onChange={e=>setGenPromo(e.target.value)} style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}}><option value="">Select...</option>{PROMOS.map(p=><option key={p.type} value={p.type}>{p.type} ({p.conv}%)</option>)}</select></div>
              <div><label style={{display:'block',fontSize:'11px',color:'#737373',marginBottom:'6px'}}>TOPIC</label><input type="text" value={genTopic} onChange={e=>setGenTopic(e.target.value)} placeholder="e.g. Joe Rogan episode..." style={{width:'100%',padding:'12px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px',boxSizing:'border-box'}}/></div>
            </div>
            <button onClick={()=>generateScript()} disabled={genLoading||!genProduct} style={{padding:'12px 24px',background:genProduct?'linear-gradient(135deg,#f59e0b,#ea580c)':'#333',borderRadius:'10px',border:'none',color:'#fff',fontWeight:'700',cursor:genProduct?'pointer':'not-allowed',fontSize:'14px',display:'flex',alignItems:'center',gap:'8px',opacity:genLoading?0.7:1}}>{genLoading?<><Loader/>Generating...</>:'✨ Generate Script'}</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',minHeight:'450px'}}>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',border:'1px solid #333',display:'flex',flexDirection:'column'}}><div style={{padding:'16px 18px',borderBottom:'1px solid #333'}}><h3 style={{fontSize:'14px',fontWeight:'700',margin:0}}>💬 Chat</h3></div><div ref={chatRef} style={{flex:1,overflowY:'auto',padding:'14px',display:'flex',flexDirection:'column',gap:'10px',maxHeight:'350px'}}>{genMsgs.length===0?<div style={{textAlign:'center',padding:'24px',color:'#525252'}}><p style={{marginBottom:'14px'}}>Configure options and click Generate</p>{["Make hook more aggressive","Add urgency to CTA","Include Joe Rogan reference"].map((p,i)=><button key={i} onClick={()=>setGenInput(p)} style={{display:'block',width:'100%',padding:'10px',marginBottom:'6px',borderRadius:'8px',backgroundColor:'#252525',border:'1px solid #333',color:'#a3a3a3',cursor:'pointer',textAlign:'left',fontSize:'12px'}}>{p}</button>)}</div>:genMsgs.map((m,i)=><div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}><div style={{maxWidth:'85%',borderRadius:'12px',padding:'10px 14px',backgroundColor:m.role==='user'?'rgba(245,158,11,0.2)':'#252525',border:m.role==='user'?'1px solid rgba(245,158,11,0.4)':'1px solid #333'}}><pre style={{whiteSpace:'pre-wrap',fontSize:'12px',fontFamily:'inherit',margin:0,lineHeight:'1.5',color:m.role==='user'?'#fef3c7':'#d1d5db'}}>{m.content.length>350?m.content.substring(0,350)+'...':m.content}</pre></div></div>)}{genLoading&&<div style={{display:'flex',justifyContent:'flex-start'}}><div style={{backgroundColor:'#252525',border:'1px solid #333',borderRadius:'12px',padding:'10px 14px',display:'flex',alignItems:'center',gap:'8px'}}><Loader/><span style={{color:'#a3a3a3'}}>Generating...</span></div></div>}</div><div style={{padding:'12px',borderTop:'1px solid #333'}}><div style={{display:'flex',gap:'8px'}}><input type="text" value={genInput} onChange={e=>setGenInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!genLoading&&genInput.trim()&&generateScript(genInput)} placeholder="Ask for changes..." style={{flex:1,padding:'10px 14px',backgroundColor:'#252525',border:'1px solid #404040',borderRadius:'10px',color:'#fff',fontSize:'13px'}} disabled={genLoading}/><button onClick={()=>generateScript(genInput)} disabled={genLoading||!genInput.trim()} style={{padding:'10px 18px',background:'linear-gradient(135deg,#f59e0b,#ea580c)',borderRadius:'10px',border:'none',color:'#fff',fontWeight:'600',cursor:'pointer',opacity:genLoading||!genInput.trim()?0.5:1}}>Send</button></div></div></div>
            <div style={{backgroundColor:'#1c1c1c',borderRadius:'16px',border:'1px solid #333',display:'flex',flexDirection:'column'}}><div style={{padding:'16px 18px',borderBottom:'1px solid #333',display:'flex',alignItems:'center',justifyContent:'space-between'}}><h3 style={{fontSize:'14px',fontWeight:'700',margin:0}}>📝 Live Preview</h3>{liveScript&&<button onClick={()=>{const t=`HOOK:\n${liveScript.hook}\n\nPROBLEM:\n${liveScript.problem}\n\nSOLUTION:\n${liveScript.solution}\n\nCTA:\n${liveScript.cta}`;navigator.clipboard.writeText(t);alert('Copied!');}} style={{padding:'6px 12px',borderRadius:'6px',backgroundColor:'rgba(245,158,11,0.2)',border:'1px solid rgba(245,158,11,0.4)',color:'#fbbf24',cursor:'pointer',fontSize:'11px'}}>📋 Copy</button>}</div><div style={{flex:1,overflowY:'auto',padding:'14px'}}>{liveScript?<div style={{display:'flex',flexDirection:'column',gap:'12px'}}><div style={{paddingBottom:'10px',borderBottom:'1px solid #333'}}><h4 style={{fontSize:'16px',fontWeight:'700',margin:0}}>{liveScript.title||'Generated Script'}</h4>{liveScript.product&&<p style={{color:'#a3a3a3',fontSize:'12px',margin:'4px 0 0'}}>{liveScript.product}{liveScript.targetInfluencer?` • ${liveScript.targetInfluencer}`:''}</p>}{liveScript.confidence&&<span style={{display:'inline-block',marginTop:'6px',padding:'4px 8px',borderRadius:'6px',backgroundColor:liveScript.confidence>=80?'rgba(16,185,129,0.2)':'rgba(245,158,11,0.2)',color:liveScript.confidence>=80?'#4ade80':'#fbbf24',fontSize:'11px'}}>{liveScript.confidence}% • Est. {liveScript.expectedRoas}x ROAS</span>}</div>{[{key:'hook',label:'🎣 HOOK',color:'#f59e0b'},{key:'problem',label:'❗ PROBLEM',color:'#ef4444'},{key:'solution',label:'💡 SOLUTION',color:'#22c55e'},{key:'cta',label:'🎯 CTA',color:'#a78bfa'}].map(({key,label,color})=>liveScript[key]&&<div key={key} style={{backgroundColor:'#252525',borderRadius:'10px',padding:'14px',borderLeft:`4px solid ${color}`}}><h5 style={{fontSize:'11px',fontWeight:'700',color,margin:'0 0 8px'}}>{label}</h5><p style={{color:'#e5e5e5',fontSize:'13px',lineHeight:'1.5',margin:0}}>{liveScript[key]}</p></div>)}{liveScript.tips&&liveScript.tips.length>0&&<div style={{backgroundColor:'#252525',borderRadius:'10px',padding:'14px'}}><h5 style={{fontSize:'11px',fontWeight:'700',color:'#fbbf24',margin:'0 0 8px'}}>💡 TIPS</h5><ul style={{margin:0,paddingLeft:'16px',color:'#d1d5db',fontSize:'12px'}}>{liveScript.tips.map((t,i)=><li key={i} style={{marginBottom:'4px'}}>{t}</li>)}</ul></div>}</div>:<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',textAlign:'center',padding:'30px'}}><div style={{width:'60px',height:'60px',borderRadius:'16px',background:'rgba(245,158,11,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px',fontSize:'28px'}}>✨</div><p style={{color:'#737373',margin:0}}>Script will appear here</p></div>}</div></div>
          </div>
        </div>}
      </main>
      <footer style={{borderTop:'1px solid #333',padding:'18px 0',marginTop:'24px'}}><div style={{maxWidth:'1600px',margin:'0 auto',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:'11px',color:'#525252'}}><span>Black Forest Intelligence Hub v5.0</span><span>{stats.videos} Videos • {sorted.length} Influencers • {fmt(stats.revenue)} Revenue</span></div></footer>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}input::placeholder{color:#525252}select{appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 10px center;background-size:14px}select option{background:#252525;color:#fff}*:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#1a1a1a}::-webkit-scrollbar-thumb{background:#404040;border-radius:3px}`}</style>
    </div>
  );
}

      {/* UpPromote Modal */}
      {showUpModal&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(8px)'}}>
        <div style={{backgroundColor:'#141414',borderRadius:'20px',padding:'32px',width:'100%',maxWidth:'450px',border:'1px solid #2a2a2a'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <h3 style={{fontSize:'18px',fontWeight:'700',margin:0,display:'flex',alignItems:'center',gap:'10px'}}><Icons.Link/>Connect UpPromote</h3>
            <button onClick={()=>setShowUpModal(false)} style={{padding:'8px',background:'#252525',border:'none',cursor:'pointer',color:'#fff',borderRadius:'8px'}}><Icons.X/></button>
          </div>
          <input type="password" placeholder="UpPromote API Key..." value={upKey} onChange={e=>setUpKey(e.target.value)} style={{width:'100%',padding:'14px',backgroundColor:'#1a1a1a',border:'2px solid #333',borderRadius:'10px',color:'#fff',fontSize:'14px',marginBottom:'20px',boxSizing:'border-box'}}/>
          {upData.error&&<p style={{color:'#ef4444',marginBottom:'16px',fontSize:'13px'}}>{upData.error}</p>}
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>setShowUpModal(false)} style={{flex:1,padding:'14px',backgroundColor:'#252525',color:'#fff',borderRadius:'10px',border:'none',cursor:'pointer'}}>Cancel</button>
            <button onClick={()=>{if(upKey.trim()){fetchUpPromote();setShowUpModal(false);}}} style={{flex:1,padding:'14px',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#000',borderRadius:'10px',border:'none',cursor:'pointer',fontWeight:'700'}}>Connect</button>
          </div>
        </div>
      </div>}

      {/* Metric Modal */}
      {selMetric&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.9)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(8px)',padding:'20px'}}>
        <div style={{backgroundColor:'#141414',borderRadius:'20px',width:'100%',maxWidth:'900px',maxHeight:'85vh',overflow:'auto',border:'1px solid #2a2a2a'}}>
          <div style={{padding:'24px 28px',borderBottom:'1px solid #2a2a2a',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#141414',zIndex:10}}>
            <h2 style={{fontSize:'22px',fontWeight:'800',margin:0,textTransform:'capitalize'}}>{selMetric} Over Time</h2>
            <button onClick={()=>setSelMetric(null)} style={{padding:'10px',background:'#252525',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}><Icons.X/></button>
          </div>
          <div style={{padding:'24px 28px'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'20px'}}>{timeRanges.map(t=><button key={t.id} onClick={()=>setTimeRange(t.id)} style={{padding:'8px 16px',borderRadius:'8px',backgroundColor:timeRange===t.id?'#f59e0b':'#252525',border:'none',color:timeRange===t.id?'#000':'#a3a3a3',cursor:'pointer',fontWeight:timeRange===t.id?'700':'500',fontSize:'12px'}}>{t.label}</button>)}</div>
            <div style={{backgroundColor:'#1a1a1a',borderRadius:'14px',padding:'20px',border:'1px solid #2a2a2a'}}><Chart data={getChartData(selMetric,timeRange)} color={selMetric==='revenue'?'#22c55e':selMetric==='spend'?'#ef4444':'#3b82f6'} height={280} metric={selMetric}/></div>
          </div>
        </div>
      </div>}

      {/* Influencer Modal */}
      {selInf&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.92)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(8px)',padding:'20px'}}>
        <div style={{backgroundColor:'#141414',borderRadius:'20px',width:'100%',maxWidth:'1100px',maxHeight:'90vh',overflow:'auto',border:'1px solid #2a2a2a'}}>
          <div style={{padding:'24px 28px',borderBottom:'1px solid #2a2a2a',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#141414',zIndex:10}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
              <div style={{width:'60px',height:'60px',borderRadius:'14px',background:`linear-gradient(135deg,${selInf.roas>=4?'#22c55e':selInf.roas>=2?'#f59e0b':'#ef4444'},${selInf.roas>=4?'#16a34a':selInf.roas>=2?'#d97706':'#dc2626'})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',fontWeight:'700',color:'#fff'}}>{selInf.name.charAt(0)}</div>
              <div><h2 style={{fontSize:'24px',fontWeight:'800',margin:0}}>{selInf.name}</h2><p style={{color:'#a3a3a3',margin:'4px 0 0',fontSize:'13px'}}>{selInf.platforms.join(' • ')} • {selInf.count} videos</p></div>
            </div>
            <button onClick={()=>{setSelInf(null);setChartMetric('revenue');setTimeRange('all');}} style={{padding:'10px',background:'#252525',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}><Icons.X/></button>
          </div>
          <div style={{padding:'24px 28px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'12px',marginBottom:'24px'}}>
              {[{l:'Revenue',v:fmt(selInf.revenue),c:'#22c55e'},{l:'Spend',v:fmt(selInf.spend),c:'#ef4444'},{l:'ROAS',v:`${selInf.roas.toFixed(2)}x`,c:selInf.roas>=3?'#22c55e':'#fbbf24'},{l:'Views',v:fmtK(selInf.views),c:'#3b82f6'},{l:'Conv %',v:`${selInf.convRate.toFixed(1)}%`,c:'#a855f7'},{l:'Avg/Video',v:fmt(selInf.avgRev),c:'#ec4899'}].map((m,i)=><div key={i} style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'14px',border:'1px solid #2a2a2a'}}><p style={{fontSize:'10px',color:'#737373',margin:0,textTransform:'uppercase'}}>{m.l}</p><p style={{fontSize:'22px',fontWeight:'800',margin:'6px 0 0',color:m.c}}>{m.v}</p></div>)}
            </div>
            <div style={{backgroundColor:'#1a1a1a',borderRadius:'14px',padding:'20px',border:'1px solid #2a2a2a',marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <div style={{display:'flex',gap:'6px'}}>{['revenue','roas','views','refs'].map(m=><button key={m} onClick={()=>setChartMetric(m)} style={{padding:'6px 14px',borderRadius:'6px',backgroundColor:chartMetric===m?'rgba(245,158,11,0.2)':'transparent',border:`1px solid ${chartMetric===m?'#f59e0b':'#404040'}`,color:chartMetric===m?'#fbbf24':'#a3a3a3',cursor:'pointer',fontSize:'12px',textTransform:'capitalize'}}>{m==='refs'?'Referrals':m}</button>)}</div>
                <div style={{display:'flex',gap:'4px',backgroundColor:'#0f0f0f',padding:'3px',borderRadius:'6px'}}>{timeRanges.map(t=><button key={t.id} onClick={()=>setTimeRange(t.id)} style={{padding:'5px 10px',borderRadius:'4px',backgroundColor:timeRange===t.id?'#f59e0b':'transparent',border:'none',color:timeRange===t.id?'#000':'#737373',cursor:'pointer',fontSize:'11px',fontWeight:timeRange===t.id?'700':'400'}}>{t.label}</button>)}</div>
              </div>
              <Chart data={getInfChartData(selInf,chartMetric,timeRange)} color={chartMetric==='revenue'?'#22c55e':chartMetric==='roas'?'#fbbf24':chartMetric==='views'?'#3b82f6':'#a855f7'} height={180} metric={chartMetric}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}}>
              <div style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'16px',border:'1px solid #2a2a2a'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>📝 Scripts Used ({selInf.scripts.length})</h4><div style={{display:'flex',flexDirection:'column',gap:'6px',maxHeight:'120px',overflowY:'auto'}}>{selInf.scripts.length>0?selInf.scripts.map((s,i)=><div key={i} onClick={()=>{setSelInf(null);setSelScript(SCRIPTS_LIBRARY[s]);}} style={{padding:'8px 12px',borderRadius:'6px',backgroundColor:'#252525',border:'1px solid #333',fontSize:'12px',cursor:'pointer'}}>{s}</div>):<p style={{color:'#525252',fontSize:'12px'}}>No scripts logged</p>}</div></div>
              <div style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'16px',border:'1px solid #2a2a2a'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>🎯 Products ({selInf.products.length})</h4><div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>{[...selInf.products].slice(0,12).map((p,i)=><span key={i} style={{padding:'5px 10px',borderRadius:'5px',backgroundColor:'#252525',border:'1px solid #333',fontSize:'11px'}}>{p}</span>)}</div></div>
            </div>
            <div style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'16px',border:'1px solid #2a2a2a'}}><h4 style={{fontSize:'14px',fontWeight:'700',margin:'0 0 12px'}}>📹 Video History ({selInf.videos.length})</h4>
              <div style={{maxHeight:'200px',overflowY:'auto',borderRadius:'8px',border:'1px solid #333'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}>
                  <thead><tr style={{backgroundColor:'#0f0f0f',position:'sticky',top:0}}><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Date</th><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Product</th><th style={{textAlign:'left',padding:'10px',color:'#737373'}}>Script</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>Views</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>Revenue</th><th style={{textAlign:'right',padding:'10px',color:'#737373'}}>ROAS</th></tr></thead>
                  <tbody>{selInf.videos.sort((a,b)=>new Date(b.dt)-new Date(a.dt)).map((v,i)=>{const roas=v.pdfSpend>0?v.pdfRev/v.pdfSpend:0;return(<tr key={i} style={{borderTop:'1px solid #2a2a2a'}}><td style={{padding:'10px',color:'#a3a3a3'}}>{v.dt}</td><td style={{padding:'10px',maxWidth:'100px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{v.product||'-'}</td><td style={{padding:'10px',color:'#737373',maxWidth:'90px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',cursor:v.script?'pointer':'default'}} onClick={()=>{if(v.script&&SCRIPTS_LIBRARY[v.script]){setSelInf(null);setSelScript(SCRIPTS_LIBRARY[v.script]);}}}>{v.script||'-'}</td><td style={{padding:'10px',textAlign:'right',color:'#3b82f6'}}>{fmtK(v.views)}</td><td style={{padding:'10px',textAlign:'right',color:'#22c55e',fontWeight:'600'}}>{fmt(v.pdfRev)}</td><td style={{padding:'10px',textAlign:'right'}}><span style={{padding:'2px 6px',borderRadius:'4px',backgroundColor:roas>=3?'rgba(34,197,94,0.15)':'rgba(251,191,36,0.15)',color:roas>=3?'#22c55e':'#fbbf24',fontWeight:'600',fontSize:'11px'}}>{roas.toFixed(2)}x</span></td></tr>);})}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {/* Script Modal */}
      {selScript&&<div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.92)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,backdropFilter:'blur(8px)',padding:'20px'}}>
        <div style={{backgroundColor:'#141414',borderRadius:'20px',width:'100%',maxWidth:'900px',maxHeight:'90vh',overflow:'auto',border:'1px solid #2a2a2a'}}>
          <div style={{padding:'24px 28px',borderBottom:'1px solid #2a2a2a',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,backgroundColor:'#141414',zIndex:10}}>
            <div><h2 style={{fontSize:'22px',fontWeight:'800',margin:0}}>{selScript.name}</h2><p style={{color:'#a3a3a3',margin:'4px 0 0',fontSize:'13px'}}>{selScript.product}</p></div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{padding:'8px 16px',borderRadius:'8px',backgroundColor:'rgba(245,158,11,0.2)'}}><span style={{fontSize:'18px',fontWeight:'800',color:'#fbbf24'}}>{selScript.avgRoas}x</span><span style={{fontSize:'11px',color:'#a3a3a3',marginLeft:'6px'}}>avg ROAS</span></div>
              <button onClick={()=>setSelScript(null)} style={{padding:'10px',background:'#252525',border:'none',cursor:'pointer',borderRadius:'10px',color:'#fff'}}><Icons.X/></button>
            </div>
          </div>
          <div style={{padding:'24px 28px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'24px'}}>
              {[{l:'Times Used',v:selScript.timesUsed,c:'#3b82f6'},{l:'Total Revenue',v:fmt(selScript.totalRevenue),c:'#22c55e'},{l:'Avg ROAS',v:`${selScript.avgRoas}x`,c:'#fbbf24'},{l:'Best With',v:selScript.bestInfluencers?.[0]||'N/A',c:'#a855f7'}].map((m,i)=><div key={i} style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'16px',border:'1px solid #2a2a2a'}}><p style={{fontSize:'10px',color:'#737373',margin:0,textTransform:'uppercase'}}>{m.l}</p><p style={{fontSize:'20px',fontWeight:'800',margin:'6px 0 0',color:m.c}}>{m.v}</p></div>)}
            </div>
            {[{key:'hook',label:'🎣 HOOK',color:'#f59e0b'},{key:'problem',label:'❗ PROBLEM',color:'#ef4444'},{key:'solution',label:'💡 SOLUTION',color:'#22c55e'},{key:'proof',label:'✅ PROOF',color:'#3b82f6'},{key:'cta',label:'🎯 CTA',color:'#a855f7'}].map(({key,label,color})=>selScript[key]&&<div key={key} style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'18px',borderLeft:`4px solid ${color}`,marginBottom:'12px'}}><h5 style={{fontSize:'11px',fontWeight:'700',color,margin:'0 0 10px',textTransform:'uppercase',letterSpacing:'0.5px'}}>{label}</h5><p style={{color:'#e5e5e5',fontSize:'14px',lineHeight:'1.6',margin:0}}>{selScript[key]}</p></div>)}
            {selScript.tips&&<div style={{backgroundColor:'#1a1a1a',borderRadius:'12px',padding:'18px',border:'1px solid #2a2a2a',marginTop:'16px'}}><h5 style={{fontSize:'11px',fontWeight:'700',color:'#fbbf24',margin:'0 0 10px',textTransform:'uppercase'}}>💡 PRODUCTION TIPS</h5><ul style={{margin:0,paddingLeft:'18px',color:'#d1d5db',fontSize:'13px'}}>{selScript.tips.map((t,i)=><li key={i} style={{marginBottom:'6px'}}>{t}</li>)}</ul></div>}
            <button onClick={()=>{const txt=`HOOK:\n${selScript.hook}\n\nPROBLEM:\n${selScript.problem}\n\nSOLUTION:\n${selScript.solution}\n\nPROOF:\n${selScript.proof}\n\nCTA:\n${selScript.cta}`;navigator.clipboard.writeText(txt);alert('Script copied!');}} style={{marginTop:'20px',padding:'14px 28px',background:'linear-gradient(135deg,#f59e0b,#d97706)',borderRadius:'10px',border:'none',color:'#000',fontWeight:'700',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px'}}><Icons.Copy/>Copy Full Script</button>
          </div>
        </div>
      </div>}


      {/* Header */}
      <header style={{borderBottom:'2px solid #d97706',background:'linear-gradient(to right,#0a0a0a,#151008,#0a0a0a)',padding:'16px 28px'}}>
        <div style={{maxWidth:'1500px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'linear-gradient(135deg,#f59e0b,#b45309)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>🌲</div>
            <div><h1 style={{fontSize:'22px',fontWeight:'800',color:'#fff',margin:0}}>Black Forest Intelligence</h1><p style={{fontSize:'12px',color:'#fbbf24',margin:0}}>{stats.videos} Videos • {influencers.length} Influencers • {fmt(stats.revenue)} Revenue</p></div>
          </div>
          <button onClick={()=>upConnected?fetchUpPromote():setShowUpModal(true)} style={{padding:'10px 18px',borderRadius:'10px',backgroundColor:upConnected?'rgba(16,185,129,0.15)':'rgba(245,158,11,0.15)',border:`1px solid ${upConnected?'rgba(16,185,129,0.5)':'rgba(245,158,11,0.5)'}`,color:upConnected?'#4ade80':'#fcd34d',fontSize:'13px',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px'}}>{upData.loading?<Loader/>:upConnected?<><Icons.RefreshCw/>Refresh</>:<><Icons.Link/>Connect UpPromote</>}</button>
        </div>
      </header>

      {/* Nav */}
      <nav style={{borderBottom:'1px solid #2a2a2a',backgroundColor:'#0f0f0f',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:'1500px',margin:'0 auto',padding:'0 28px',display:'flex',gap:'2px'}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'14px 22px',background:tab===t.id?'linear-gradient(to bottom,rgba(245,158,11,0.12),transparent)':'transparent',border:'none',borderBottom:tab===t.id?'2px solid #f59e0b':'2px solid transparent',color:tab===t.id?'#fbbf24':'#737373',cursor:'pointer',fontWeight:tab===t.id?'600':'500',fontSize:'14px',display:'flex',alignItems:'center',gap:'8px',transition:'all 0.2s'}}>{t.icon}{t.label}</button>)}
        </div>
      </nav>

      <main style={{maxWidth:'1500px',margin:'0 auto',padding:'24px 28px'}}>

        {/* DASHBOARD */}
        {tab==='dashboard'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'12px'}}>
            <StatCard label="Total Revenue" value={fmt(stats.revenue)} icon={<Icons.TrendingUp/>} color="#22c55e" onClick={()=>setSelMetric('revenue')} active={selMetric==='revenue'}/>
            <StatCard label="Total Spend" value={fmt(stats.spend)} icon={<Icons.BarChart/>} color="#ef4444" onClick={()=>setSelMetric('spend')} active={selMetric==='spend'}/>
            <StatCard label="Overall ROAS" value={`${stats.roas.toFixed(2)}x`} icon={<Icons.TrendingUp/>} color="#fbbf24"/>
            <StatCard label="Total Views" value={fmtK(stats.views)} icon={<Icons.Play/>} color="#3b82f6" onClick={()=>setSelMetric('views')} active={selMetric==='views'}/>
            <StatCard label="Referrals" value={fmtK(stats.refs)} icon={<Icons.Link/>} color="#a855f7" onClick={()=>setSelMetric('refs')} active={selMetric==='refs'}/>
            <StatCard label="Influencers" value={influencers.length} icon={<Icons.Users/>} color="#ec4899"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div style={{backgroundColor:'#161616',borderRadius:'14px',padding:'20px',border:'1px solid rgba(245,158,11,0.3)'}}>
              <h3 style={{fontWeight:'700',color:'#fde68a',margin:'0 0 14px',fontSize:'15px'}}>🏆 Top Revenue Performer</h3>
              <div style={{display:'flex',alignItems:'center',gap:'14px',cursor:'pointer'}} onClick={()=>setSelInf(influencers[0])}>
                <div style={{width:'52px',height:'52px',borderRadius:'12px',background:'linear-gradient(135deg,#f59e0b,#b45309)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'700'}}>{influencers[0]?.name.charAt(0)}</div>
                <div><p style={{fontSize:'16px',fontWeight:'700',margin:0}}>{influencers[0]?.name}</p><p style={{color:'#fbbf24',margin:'2px 0',fontWeight:'600'}}>{fmt(influencers[0]?.revenue)}</p><p style={{color:'#737373',margin:0,fontSize:'11px'}}>{influencers[0]?.count} videos • {influencers[0]?.roas.toFixed(2)}x ROAS</p></div>
              </div>
            </div>
            <div style={{backgroundColor:'#161616',borderRadius:'14px',padding:'20px',border:'1px solid rgba(16,185,129,0.3)'}}>
              <h3 style={{fontWeight:'700',color:'#a7f3d0',margin:'0 0 14px',fontSize:'15px'}}>🎯 Best ROAS (5+ videos)</h3>
              {(()=>{const best=influencers.filter(i=>i.count>=5).sort((a,b)=>b.roas-a.roas)[0];return best&&(
                <div style={{display:'flex',alignItems:'center',gap:'14px',cursor:'pointer'}} onClick={()=>setSelInf(best)}>
                  <div style={{width:'52px',height:'52px',borderRadius:'12px',background:'linear-gradient(135deg,#10b981,#047857)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:'700'}}>{best.name.charAt(0)}</div>
                  <div><p style={{fontSize:'16px',fontWeight:'700',margin:0}}>{best.name}</p><p style={{color:'#4ade80',margin:'2px 0',fontWeight:'600'}}>{best.roas.toFixed(2)}x ROAS</p><p style={{color:'#737373',margin:0,fontSize:'11px'}}>{best.count} videos • {fmt(best.revenue)}</p></div>
                </div>
              );})()}
            </div>
          </div>
          <div style={{backgroundColor:'#161616',borderRadius:'14px',padding:'20px',border:'1px solid #2a2a2a'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <h3 style={{fontWeight:'700',margin:0,fontSize:'15px'}}>📊 Leaderboard</h3>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:'8px 12px',backgroundColor:'#252525',border:'1px solid #333',borderRadius:'8px',color:'#fff',fontSize:'12px',cursor:'pointer'}}>{sortOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
                <button onClick={()=>setSortDir(d=>d==='desc'?'asc':'desc')} style={{padding:'8px 12px',backgroundColor:'#252525',border:'1px solid #333',borderRadius:'8px',color:'#a3a3a3',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>{sortDir==='desc'?<Icons.ArrowDown/>:<Icons.ArrowUp/>}{sortDir==='desc'?'High→Low':'Low→High'}</button>
              </div>
            </div>
            <div style={{borderRadius:'10px',overflow:'hidden',border:'1px solid #2a2a2a'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}>
                <thead><tr style={{backgroundColor:'#1a1a1a'}}><th style={{textAlign:'left',padding:'12px',color:'#737373'}}>#</th><th style={{textAlign:'left',padding:'12px',color:'#737373'}}>Influencer</th><th style={{textAlign:'center',padding:'12px',color:'#737373'}}>Videos</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Revenue</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Spend</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>ROAS</th><th style={{textAlign:'right',padding:'12px',color:'#737373'}}>Views</th></tr></thead>
                <tbody>{sortedInf.slice(0,15).map((inf,i)=><tr key={inf.name} onClick={()=>setSelInf(inf)} style={{borderTop:'1px solid #2a2a2a',cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#1a1a1a'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}><td style={{padding:'11px 12px'}}><span style={{width:'24px',height:'24px',borderRadius:'6px',backgroundColor:i<3?['#fbbf24','#9ca3af','#cd7f32'][i]+'22':'#1a1a1a',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:i<3?['#fbbf24','#d1d5db','#cd7f32'][i]:'#737373',fontWeight:'700'}}>{i+1}</span></td><td style={{padding:'11px 12px',fontWeight:'500'}}>{inf.name}</td><td style={{padding:'11px 12px',textAlign:'center'}}>{inf.count}</td><td style={{padding:'11px 12px',textAlign:'right',color:'#22c55e',fontWeight:'600'}}>{fmt(inf.revenue)}</td><td style={{padding:'11px 12px',textAlign:'right',color:'#ef4444'}}>{fmt(inf.spend)}</td><td style={{padding:'11px 12px',textAlign:'right'}}><span style={{padding:'3px 8px',borderRadius:'4px',backgroundColor:inf.roas>=3?'rgba(34,197,94,0.12)':'rgba(251,191,36,0.12)',color:inf.roas>=3?'#22c55e':'#fbbf24',fontWeight:'700',fontSize:'11px'}}>{inf.roas.toFixed(2)}x</span></td><td style={{padding:'11px 12px',textAlign:'right'}}>{fmtK(inf.views)}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>}

        {/* INFLUENCERS */}
        {tab==='influencers'&&<div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <h2 style={{fontSize:'22px',fontWeight:'800',margin:0}}>👥 All Influencers ({influencers.length})</h2>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{position:'relative'}}><Icons.Search style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#525252'}}/><input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:'220px',padding:'10px 10px 10px 36px',backgroundColor:'#161616',border:'1px solid #2a2a2a',borderRadius:'10px',color:'#fff',fontSize:'13px'}}/></div>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:'10px 14px',backgroundColor:'#161616',border:'1px solid #2a2a2a',borderRadius:'10px',color:'#fff',fontSize:'13px'}}>{sortOpts.map(o=><option key={o.v} value={o.v}>Sort: {o.l}</option>)}</select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'14px'}}>
            {sortedInf.map(inf=><div key={inf.name} onClick={()=>setSelInf(inf)} style={{backgroundColor:'#161616',borderRadius:'14px',padding:'18px',border:'1px solid #2a2a2a',cursor:'pointer',transition:'border-color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#f59e0b'} onMouseLeave={e=>e.currentTarget.style.borderColor='#2a2a2a'}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'14px'}}>
                <div style={{width:'46px',height:'46px',borderRadius:'10px',background:`linear-gradient(135deg,${inf.roas>=4?'#22c55e':inf.roas>=2?'#f59e0b':'#ef4444'},${inf.roas>=4?'#16a34a':inf.roas>=2?'#d97706':'#dc2626'})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:'700',color:'#fff'}}>{inf.name.charAt(0)}</div>
                <div style={{flex:1}}><p style={{fontSize:'15px',fontWeight:'700',margin:0}}>{inf.name}</p><p style={{color:'#737373',fontSize:'11px',margin:'2px 0 0'}}>{inf.platforms.join(' • ')} • {inf.count} videos</p></div>
                <div style={{textAlign:'right'}}><p style={{fontSize:'16px',fontWeight:'800',color:'#22c55e',margin:0}}>{fmt(inf.revenue)}</p><p style={{fontSize:'12px',color:inf.roas>=3?'#22c55e':'#fbbf24',margin:'2px 0 0',fontWeight:'600'}}>{inf.roas.toFixed(2)}x</p></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}}>
                {[{l:'Spend',v:fmt(inf.spend),c:'#ef4444'},{l:'Views',v:fmtK(inf.views),c:'#3b82f6'},{l:'Refs',v:inf.refs,c:'#a855f7'},{l:'Conv',v:`${inf.convRate.toFixed(1)}%`,c:'#ec4899'}].map((m,i)=><div key={i} style={{backgroundColor:'#1a1a1a',borderRadius:'6px',padding:'8px',textAlign:'center'}}><p style={{fontSize:'9px',color:'#525252',margin:0}}>{m.l}</p><p style={{fontSize:'13px',fontWeight:'600',color:m.c,margin:'2px 0 0'}}>{m.v}</p></div>)}
              </div>
            </div>)}
          </div>
        </div>}
