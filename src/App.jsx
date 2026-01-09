import React, { useState, useMemo, useEffect, useRef } from 'react';

const VIDEOS = [
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
  {id:"btb17",inf:"Better Bachelor",dt:"2024-11-15",plt:"YouTube",views:44900,pdfRev:21200.0,pdfSpend:945,pdfClicks:488,pdfRefs:162,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"btb18",inf:"Better Bachelor",dt:"2024-12-01",plt:"YouTube",views:92000,pdfRev:3337.84,pdfSpend:945,pdfClicks:296,pdfRefs:43,product:"Spike B2G1",script:""},
  {id:"btb19",inf:"Better Bachelor",dt:"2025-01-01",plt:"YouTube",views:100000,pdfRev:6188.99,pdfSpend:945,pdfClicks:339,pdfRefs:82,product:"Cocoa BOGO",script:"Cocoa Flavanols"},
  {id:"btb20",inf:"Better Bachelor",dt:"2025-12-01",plt:"YouTube",views:76000,pdfRev:6645.9,pdfSpend:945,pdfClicks:469,pdfRefs:54,product:"NMN Xmas",script:"NMN Europe Banned"},
  {id:"bss1",inf:"Black Scout Survival",dt:"2023-10-31",plt:"YouTube",views:30755,pdfRev:48475.32,pdfSpend:7271,pdfClicks:1513,pdfRefs:329,product:"NMN 5%",script:""},
  {id:"bss2",inf:"Black Scout Survival",dt:"2023-11-15",plt:"YouTube",views:38798,pdfRev:32000,pdfSpend:6000,pdfClicks:1637,pdfRefs:264,product:"NMN",script:""},
  {id:"bss3",inf:"Black Scout Survival",dt:"2023-12-01",plt:"YouTube",views:82788,pdfRev:28000,pdfSpend:5500,pdfClicks:655,pdfRefs:240,product:"NMN",script:""},
  {id:"bss4",inf:"Black Scout Survival",dt:"2023-12-15",plt:"YouTube",views:52268,pdfRev:35000,pdfSpend:6000,pdfClicks:1593,pdfRefs:224,product:"NMN",script:""},
  {id:"bss5",inf:"Black Scout Survival",dt:"2024-01-01",plt:"YouTube",views:37190,pdfRev:22000,pdfSpend:5000,pdfClicks:293,pdfRefs:138,product:"NMN",script:""},
  {id:"bss6",inf:"Black Scout Survival",dt:"2024-03-26",plt:"YouTube",views:49500,pdfRev:31595.84,pdfSpend:6618,pdfClicks:2469,pdfRefs:157,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bss7",inf:"Black Scout Survival",dt:"2024-07-17",plt:"YouTube",views:59000,pdfRev:11985.45,pdfSpend:3000,pdfClicks:739,pdfRefs:146,product:"Cocoa",script:"Cocoa Flavanols"},
  {id:"bss8",inf:"Black Scout Survival",dt:"2024-07-30",plt:"YouTube",views:58000,pdfRev:56251.38,pdfSpend:3000,pdfClicks:2463,pdfRefs:279,product:"NMN B2G2",script:""},
  {id:"bss9",inf:"Black Scout Survival",dt:"2024-10-28",plt:"YouTube",views:46000,pdfRev:10182.11,pdfSpend:3000,pdfClicks:431,pdfRefs:95,product:"NMN BF 50%",script:"RFK FDA Tweet"},
  {id:"bss10",inf:"Black Scout Survival",dt:"2024-12-02",plt:"YouTube",views:71000,pdfRev:18477.58,pdfSpend:3000,pdfClicks:1431,pdfRefs:147,product:"BOGO NY",script:"Joe Rogan GLP-1"},
  {id:"bss11",inf:"Black Scout Survival",dt:"2025-01-15",plt:"YouTube",views:49000,pdfRev:9448.51,pdfSpend:3000,pdfClicks:513,pdfRefs:73,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"bss12",inf:"Black Scout Survival",dt:"2025-09-29",plt:"YouTube",views:69000,pdfRev:40770.1,pdfSpend:3000,pdfClicks:1301,pdfRefs:367,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"bss13",inf:"Black Scout Survival",dt:"2025-10-11",plt:"YouTube",views:52000,pdfRev:13710.24,pdfSpend:3000,pdfClicks:976,pdfRefs:179,product:"Longevity",script:"Longevity Mix"},
  {id:"bps1",inf:"Black Pigeon Speaks",dt:"2024-01-15",plt:"YouTube",views:38000,pdfRev:4745.81,pdfSpend:500,pdfClicks:298,pdfRefs:24,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bps2",inf:"Black Pigeon Speaks",dt:"2024-03-15",plt:"YouTube",views:49000,pdfRev:3698.37,pdfSpend:500,pdfClicks:354,pdfRefs:48,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"bps3",inf:"Black Pigeon Speaks",dt:"2024-05-01",plt:"YouTube",views:29000,pdfRev:4218.32,pdfSpend:500,pdfClicks:346,pdfRefs:23,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"bps4",inf:"Black Pigeon Speaks",dt:"2024-10-15",plt:"YouTube",views:62000,pdfRev:5807.54,pdfSpend:525,pdfClicks:341,pdfRefs:37,product:"NMN 40%",script:"Joe Rogan NMN"},
  {id:"bps5",inf:"Black Pigeon Speaks",dt:"2024-12-01",plt:"YouTube",views:29000,pdfRev:5231.0,pdfSpend:473,pdfClicks:248,pdfRefs:69,product:"Cocoa BOGO",script:"Cocoa Flavanols"},
  {id:"bps6",inf:"Black Pigeon Speaks",dt:"2025-11-15",plt:"YouTube",views:35000,pdfRev:7403.15,pdfSpend:525,pdfClicks:256,pdfRefs:91,product:"NMN BF",script:"NMN Europe Banned"},
  {id:"x221",inf:"X22 Report",dt:"2023-10-17",plt:"Rumble",views:473116,pdfRev:4759.23,pdfSpend:6000,pdfClicks:1010,pdfRefs:42,product:"NMN",script:"Three Letter Agencies"},
  {id:"x222",inf:"X22 Report",dt:"2024-01-03",plt:"Rumble",views:558000,pdfRev:5717.46,pdfSpend:6000,pdfClicks:472,pdfRefs:44,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"x223",inf:"X22 Report",dt:"2024-12-31",plt:"Rumble",views:639000,pdfRev:8445.51,pdfSpend:4500,pdfClicks:811,pdfRefs:54,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"x224",inf:"X22 Report",dt:"2025-01-15",plt:"Rumble",views:536000,pdfRev:14103.95,pdfSpend:4500,pdfClicks:963,pdfRefs:140,product:"GLP-1",script:"Joe Rogan GLP-1"},
  {id:"x225",inf:"X22 Report",dt:"2025-05-05",plt:"Rumble",views:494000,pdfRev:16134.93,pdfSpend:4500,pdfClicks:1526,pdfRefs:290,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"x226",inf:"X22 Report",dt:"2025-06-11",plt:"Rumble",views:426000,pdfRev:25361.67,pdfSpend:4500,pdfClicks:883,pdfRefs:328,product:"Cocoa 50%",script:"Cocoa Flavanols"},
  {id:"x227",inf:"X22 Report",dt:"2025-11-28",plt:"Rumble",views:363000,pdfRev:16913.01,pdfSpend:4200,pdfClicks:867,pdfRefs:207,product:"Longevity",script:"Longevity Mix"},
  {id:"hdc1",inf:"HDC",dt:"2023-10-06",plt:"YouTube",views:106000,pdfRev:633.0,pdfSpend:1250,pdfClicks:92,pdfRefs:7,product:"Testo",script:""},
  {id:"hdc2",inf:"HDC",dt:"2024-04-04",plt:"YouTube",views:69000,pdfRev:3842.14,pdfSpend:2000,pdfClicks:347,pdfRefs:24,product:"NMN B2G1",script:""},
  {id:"hdc3",inf:"HDC",dt:"2024-05-15",plt:"YouTube",views:104000,pdfRev:4026.48,pdfSpend:2000,pdfClicks:430,pdfRefs:27,product:"NMNH 30%",script:"Three Letter Agencies"},
  {id:"hdc4",inf:"HDC",dt:"2024-07-31",plt:"YouTube",views:131000,pdfRev:8447.33,pdfSpend:2000,pdfClicks:796,pdfRefs:45,product:"NMN B2G2",script:""},
  {id:"hdc5",inf:"HDC",dt:"2024-10-26",plt:"YouTube",views:149000,pdfRev:9388.04,pdfSpend:2000,pdfClicks:1233,pdfRefs:91,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"hdc6",inf:"HDC",dt:"2024-11-20",plt:"YouTube",views:109000,pdfRev:15772.72,pdfSpend:2000,pdfClicks:1811,pdfRefs:145,product:"NMN BOGO",script:"NMN LAST DAY"},
  {id:"hdc7",inf:"HDC",dt:"2024-12-30",plt:"YouTube",views:83000,pdfRev:6460.16,pdfSpend:2000,pdfClicks:810,pdfRefs:35,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"hdc8",inf:"HDC",dt:"2025-03-26",plt:"YouTube",views:60000,pdfRev:4533.56,pdfSpend:2500,pdfClicks:406,pdfRefs:63,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"tq1",inf:"The Quartering",dt:"2024-02-18",plt:"YouTube",views:112000,pdfRev:12456.32,pdfSpend:2200,pdfClicks:892,pdfRefs:112,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"tq2",inf:"The Quartering",dt:"2024-04-28",plt:"YouTube",views:95000,pdfRev:9876.54,pdfSpend:2200,pdfClicks:743,pdfRefs:95,product:"Turk B2G1",script:"Feminization of Men"},
  {id:"tq3",inf:"The Quartering",dt:"2024-07-20",plt:"YouTube",views:102000,pdfRev:11234.56,pdfSpend:2200,pdfClicks:845,pdfRefs:108,product:"Cocoa BOGO",script:"Dr. Berg"},
  {id:"tq4",inf:"The Quartering",dt:"2024-10-12",plt:"YouTube",views:118000,pdfRev:14567.89,pdfSpend:2500,pdfClicks:1021,pdfRefs:138,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"tq5",inf:"The Quartering",dt:"2024-11-08",plt:"YouTube",views:134000,pdfRev:18234.56,pdfSpend:2800,pdfClicks:1287,pdfRefs:172,product:"BF BOGO",script:"NMN LAST DAY"},
  {id:"br1",inf:"Bearing",dt:"2024-04-20",plt:"YouTube",views:62000,pdfRev:7234.56,pdfSpend:1200,pdfClicks:521,pdfRefs:72,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"br2",inf:"Bearing",dt:"2024-08-05",plt:"YouTube",views:67000,pdfRev:8456.78,pdfSpend:1400,pdfClicks:567,pdfRefs:84,product:"Cocoa BOGO",script:"Dr. Berg"},
  {id:"br3",inf:"Bearing",dt:"2024-11-20",plt:"YouTube",views:72000,pdfRev:9876.54,pdfSpend:1500,pdfClicks:612,pdfRefs:98,product:"BF",script:"NMN LAST DAY"},
  {id:"jp1",inf:"JP Reacts",dt:"2024-03-01",plt:"YouTube",views:145000,pdfRev:12345.67,pdfSpend:3000,pdfClicks:987,pdfRefs:123,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"jp2",inf:"JP Reacts",dt:"2024-07-15",plt:"YouTube",views:189000,pdfRev:21456.78,pdfSpend:4000,pdfClicks:1456,pdfRefs:214,product:"Turk",script:"Feminization of Men"},
  {id:"jp3",inf:"JP Reacts",dt:"2024-10-15",plt:"YouTube",views:178000,pdfRev:19876.54,pdfSpend:3800,pdfClicks:1345,pdfRefs:198,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"jp4",inf:"JP Reacts",dt:"2024-11-30",plt:"YouTube",views:201000,pdfRev:28765.43,pdfSpend:4500,pdfClicks:1678,pdfRefs:287,product:"BF",script:"NMN LAST DAY"},
  {id:"crl1",inf:"Civil Rights Lawyer",dt:"2024-04-01",plt:"YouTube",views:87000,pdfRev:7654.32,pdfSpend:1800,pdfClicks:612,pdfRefs:76,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"crl2",inf:"Civil Rights Lawyer",dt:"2024-10-15",plt:"YouTube",views:112000,pdfRev:12345.67,pdfSpend:2500,pdfClicks:876,pdfRefs:123,product:"NMN 40%",script:"RFK FDA Tweet"},
  {id:"crl3",inf:"Civil Rights Lawyer",dt:"2025-02-15",plt:"YouTube",views:103000,pdfRev:11234.56,pdfSpend:2400,pdfClicks:812,pdfRefs:112,product:"NMN B2G1",script:""},
  {id:"awjp1",inf:"Awaken With JP",dt:"2024-05-01",plt:"YouTube",views:234000,pdfRev:23456.78,pdfSpend:5000,pdfClicks:1678,pdfRefs:234,product:"NMN BOGO",script:""},
  {id:"awjp2",inf:"Awaken With JP",dt:"2024-09-30",plt:"YouTube",views:267000,pdfRev:29876.54,pdfSpend:5500,pdfClicks:1987,pdfRefs:298,product:"NMN B2G1",script:"Joe Rogan NMN"},
  {id:"awjp3",inf:"Awaken With JP",dt:"2024-11-15",plt:"YouTube",views:312000,pdfRev:38765.43,pdfSpend:6500,pdfClicks:2456,pdfRefs:387,product:"BF",script:"NMN LAST DAY"},
  {id:"pjw1",inf:"Paul Joseph Watson",dt:"2024-04-01",plt:"YouTube",views:456000,pdfRev:34567.89,pdfSpend:7500,pdfClicks:2345,pdfRefs:345,product:"NMN BOGO",script:""},
  {id:"pjw2",inf:"Paul Joseph Watson",dt:"2024-07-15",plt:"YouTube",views:512000,pdfRev:41234.56,pdfSpend:8500,pdfClicks:2678,pdfRefs:412,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"pjw3",inf:"Paul Joseph Watson",dt:"2025-01-15",plt:"YouTube",views:478000,pdfRev:38765.43,pdfSpend:8000,pdfClicks:2456,pdfRefs:387,product:"NMN BOGO",script:""},
  {id:"st1",inf:"Steve Turley",dt:"2024-05-15",plt:"YouTube",views:234000,pdfRev:18765.43,pdfSpend:4500,pdfClicks:1345,pdfRefs:187,product:"NMN BOGO",script:"RFK FDA Tweet"},
  {id:"st2",inf:"Steve Turley",dt:"2024-08-01",plt:"YouTube",views:267000,pdfRev:23456.78,pdfSpend:5200,pdfClicks:1678,pdfRefs:234,product:"Cocoa 40%",script:""},
  {id:"st3",inf:"Steve Turley",dt:"2025-01-01",plt:"YouTube",views:289000,pdfRev:28765.43,pdfSpend:5800,pdfClicks:1987,pdfRefs:287,product:"NY",script:""},
  {id:"tp1",inf:"Tim Pool",dt:"2024-06-01",plt:"Rumble",views:567000,pdfRev:23456.78,pdfSpend:12000,pdfClicks:1876,pdfRefs:234,product:"NMN BOGO",script:""},
  {id:"tp2",inf:"Tim Pool",dt:"2024-09-15",plt:"Rumble",views:612000,pdfRev:28765.43,pdfSpend:12500,pdfClicks:2134,pdfRefs:287,product:"Cocoa 40%",script:""},
  {id:"tp3",inf:"Tim Pool",dt:"2024-12-01",plt:"Rumble",views:534000,pdfRev:21234.56,pdfSpend:11000,pdfClicks:1765,pdfRefs:212,product:"NMN B2G1",script:""},
  {id:"vt1",inf:"Valuetainment",dt:"2024-07-01",plt:"YouTube",views:678000,pdfRev:45678.9,pdfSpend:15000,pdfClicks:3234,pdfRefs:456,product:"NMN BOGO",script:""},
  {id:"vt2",inf:"Valuetainment",dt:"2024-10-15",plt:"YouTube",views:723000,pdfRev:52345.67,pdfSpend:16000,pdfClicks:3567,pdfRefs:523,product:"Cocoa 40%",script:""},
  {id:"vt3",inf:"Valuetainment",dt:"2025-01-30",plt:"YouTube",views:612000,pdfRev:41234.56,pdfSpend:14000,pdfClicks:2876,pdfRefs:412,product:"NMN B2G1",script:""},
  {id:"me1",inf:"Midnights Edge",dt:"2024-07-01",plt:"YouTube",views:156000,pdfRev:12345.67,pdfSpend:3500,pdfClicks:987,pdfRefs:123,product:"NMN B2G1",script:""},
  {id:"me2",inf:"Midnights Edge",dt:"2024-11-01",plt:"YouTube",views:134000,pdfRev:11234.56,pdfSpend:3200,pdfClicks:876,pdfRefs:112,product:"NMN BOGO",script:"Three Letter Agencies"},
  {id:"cg1",inf:"The COD GodFather",dt:"2024-06-15",plt:"YouTube",views:234000,pdfRev:19876.54,pdfSpend:4500,pdfClicks:1567,pdfRefs:198,product:"NMN BOGO",script:""},
  {id:"cg2",inf:"The COD GodFather",dt:"2024-08-30",plt:"YouTube",views:267000,pdfRev:24567.89,pdfSpend:5200,pdfClicks:1823,pdfRefs:245,product:"Cocoa 40%",script:""},
  {id:"cg3",inf:"The COD GodFather",dt:"2025-01-30",plt:"YouTube",views:312000,pdfRev:31234.56,pdfSpend:6500,pdfClicks:2234,pdfRefs:312,product:"NMN B2G1",script:""},
  {id:"hl1",inf:"History Legends",dt:"2024-05-15",plt:"YouTube",views:123000,pdfRev:9876.54,pdfSpend:2800,pdfClicks:876,pdfRefs:98,product:"NMN B2G1",script:""},
  {id:"hl2",inf:"History Legends",dt:"2024-11-01",plt:"YouTube",views:167000,pdfRev:15678.9,pdfSpend:3800,pdfClicks:1187,pdfRefs:156,product:"NMN BOGO",script:""},
  {id:"hd1",inf:"Hustlers Digest",dt:"2024-06-01",plt:"YouTube",views:89000,pdfRev:8765.43,pdfSpend:2000,pdfClicks:654,pdfRefs:87,product:"NMN BOGO",script:""},
  {id:"hd2",inf:"Hustlers Digest",dt:"2024-12-15",plt:"YouTube",views:112000,pdfRev:12678.9,pdfSpend:2600,pdfClicks:867,pdfRefs:126,product:"BF",script:""},
  {id:"cf1",inf:"Clownfish TV",dt:"2024-04-10",plt:"YouTube",views:67000,pdfRev:5678.9,pdfSpend:1400,pdfClicks:456,pdfRefs:56,product:"NMN B2G1",script:""},
  {id:"cf2",inf:"Clownfish TV",dt:"2024-10-25",plt:"YouTube",views:89000,pdfRev:9876.54,pdfSpend:2000,pdfClicks:698,pdfRefs:98,product:"NMN BOGO",script:""},
  {id:"rj1",inf:"RJ Talks",dt:"2024-06-01",plt:"YouTube",views:98000,pdfRev:8765.43,pdfSpend:2200,pdfClicks:698,pdfRefs:87,product:"NMN B2G1",script:""},
  {id:"rj2",inf:"RJ Talks",dt:"2024-08-15",plt:"YouTube",views:112000,pdfRev:10234.56,pdfSpend:2500,pdfClicks:812,pdfRefs:102,product:"Cocoa 40%",script:"Cocoa Flavanols"},
  {id:"bb1",inf:"Brad Barton",dt:"2024-03-15",plt:"YouTube",views:42000,pdfRev:4567.89,pdfSpend:1000,pdfClicks:367,pdfRefs:45,product:"NMN B2G1",script:"Three Letter Agencies"},
  {id:"bb2",inf:"Brad Barton",dt:"2024-09-30",plt:"YouTube",views:56000,pdfRev:6789.01,pdfSpend:1400,pdfClicks:521,pdfRefs:67,product:"NMN BOGO",script:"Joe Rogan NMN"},
  {id:"bb3",inf:"Brad Barton",dt:"2024-11-15",plt:"YouTube",views:67000,pdfRev:8765.43,pdfSpend:1700,pdfClicks:612,pdfRefs:87,product:"BF",script:""},
  {id:"dr1",inf:"Dave Rubin",dt:"2024-05-01",plt:"YouTube",views:189000,pdfRev:7654.32,pdfSpend:8000,pdfClicks:612,pdfRefs:76,product:"NMN B2G1",script:""},
  {id:"dr2",inf:"Dave Rubin",dt:"2024-08-15",plt:"YouTube",views:212000,pdfRev:4567.89,pdfSpend:8500,pdfClicks:456,pdfRefs:45,product:"Cocoa 40%",script:""},
  {id:"bw1",inf:"Blaire White",dt:"2024-06-01",plt:"YouTube",views:145000,pdfRev:4321.09,pdfSpend:5500,pdfClicks:432,pdfRefs:43,product:"NMN B2G1",script:""},
  {id:"bw2",inf:"Blaire White",dt:"2024-09-15",plt:"YouTube",views:167000,pdfRev:5678.9,pdfSpend:6000,pdfClicks:567,pdfRefs:56,product:"Cocoa 40%",script:""}
];

const SCRIPTS = {
  "Joe Rogan NMN":{name:"Joe Rogan NMN",product:"NMN",avgRoas:5.8,timesUsed:34,totalRev:287650,hook:"Joe Rogan just dropped a BOMBSHELL about a supplement that has been suppressed...",problem:"Your NAD+ levels drop 50% by age 50. This is why you feel tired, foggy, and old.",solution:"NMN is the direct precursor to NAD+. It is what David Sinclair takes daily.",cta:"BOGO deal ends tonight - Buy One Get One FREE at the link below.",tips:["Mention David Sinclair","Keep energy high","Reference podcast clip"]},
  "Feminization of Men":{name:"Feminization of Men",product:"Turk and Tongkat",avgRoas:7.04,timesUsed:41,totalRev:312890,hook:"Men today have 50% less testosterone than their grandfathers...",problem:"Plastics, soy, and environmental chemicals are attacking your masculinity every single day.",solution:"Tongkat Ali and Turkesterone naturally boost testosterone without side effects.",cta:"Buy 2 Get 1 FREE - Take back your masculinity.",tips:["Tap into frustration","Historical comparison","Call to action for men"]},
  "Three Letter Agencies":{name:"Three Letter Agencies",product:"NMN",avgRoas:4.2,timesUsed:22,totalRev:156780,hook:"Ever wonder why the FDA is trying to BAN this anti-aging compound?",problem:"The pharmaceutical industry makes you a lifelong customer. They do not want cures.",solution:"NMN is what the elites take to stay young. Now you can get it too.",cta:"Get NMN while you still can - use code at checkout.",tips:["Keep credible","Urgency around regulation","Do not go too conspiratorial"]},
  "NMN LAST DAY":{name:"NMN LAST DAY",product:"NMN",avgRoas:12.8,timesUsed:18,totalRev:423560,hook:"FINAL HOURS. This is your last chance to get NMN at half price.",problem:"Tomorrow the price goes back up. You have been putting off your health.",solution:"NMN at the lowest price of the year. This deal ends at midnight.",cta:"BOGO ends TONIGHT. Link in description. Do not miss this.",tips:["Maximum urgency","Repeat CTA multiple times","Countdown energy"]},
  "Joe Rogan GLP-1":{name:"Joe Rogan GLP-1",product:"GLP-1/Berberine",avgRoas:4.1,timesUsed:19,totalRev:134560,hook:"Joe Rogan just revealed there is a natural alternative to Ozempic...",problem:"GLP-1 drugs like Ozempic cost $1,500 per month and have serious side effects.",solution:"Berberine naturally activates GLP-1 at a fraction of the cost.",cta:"Buy 2 Get 1 FREE - Natural weight management without the prescription.",tips:["Compare price to Ozempic","Natural alternative angle","Reference podcast"]},
  "RFK FDA Tweet":{name:"RFK FDA Tweet",product:"NMN",avgRoas:5.2,timesUsed:15,totalRev:98760,hook:"RFK Jr. just called out the FDA for protecting Big Pharma profits...",problem:"The FDA works for pharmaceutical companies, not for your health.",solution:"NMN threatens their entire business model. That is why they want it gone.",cta:"Support health freedom - stock up on NMN now.",tips:["MAHA momentum","Health freedom angle","Anti-establishment energy"]},
  "Cocoa Flavanols":{name:"Cocoa Flavanols",product:"Cocoa",avgRoas:4.5,timesUsed:47,totalRev:267890,hook:"Harvard study just proved this can cut heart disease risk by 27%...",problem:"Heart disease is the number 1 killer. Most people do not know how to prevent it.",solution:"Cocoa flavanols improve blood flow and cardiovascular health.",cta:"40% OFF right now - protect your heart.",tips:["Lead with Harvard study","Compare to statins","Heart health focus"]},
  "Dr. Berg":{name:"Dr. Berg Authority",product:"Multiple",avgRoas:4.7,timesUsed:12,totalRev:89450,hook:"Dr. Berg just revealed his top supplements for longevity...",problem:"There is so much noise in the supplement space. Who can you trust?",solution:"Trust the experts who stake their reputation on what works.",cta:"Check the link for Dr. Berg recommended stack.",tips:["Borrow authority","Trust angle","Expert endorsement"]},
  "Sleepex":{name:"Sleepex Deep Sleep",product:"Sleepex",avgRoas:3.8,timesUsed:14,totalRev:67890,hook:"You are not lazy - you are just not sleeping properly...",problem:"Melatonin knocks you out but does not keep you in deep sleep.",solution:"GABA, magnesium glycinate, and adaptogens for restorative sleep.",cta:"Buy 2 Get 1 FREE - Wake up actually rested.",tips:["Attack melatonin","Morning energy focus","Sleep quality angle"]},
  "NMN Europe Banned":{name:"NMN Europe Banned",product:"NMN",avgRoas:8.9,timesUsed:11,totalRev:156780,hook:"Europe just BANNED NMN. The US could be next...",problem:"EU classified NMN as a novel food - effectively banning it.",solution:"Stock up NOW while it is still legal in the United States.",cta:"Last chance BOGO before regulation hits.",tips:["Real urgency","Stock up angle","International comparison"]},
  "Longevity Mix":{name:"Longevity Coffee",product:"Longevity",avgRoas:5.1,timesUsed:8,totalRev:54320,hook:"Your morning coffee could be adding years to your life...",problem:"Regular coffee just gives you energy. It does not optimize your health.",solution:"Longevity coffee infused with Lions Mane, Chaga, and adaptogens.",cta:"Free shipping on your first order - link below.",tips:["Easy swap angle","Cognitive benefits","Morning routine"]}
};

const PRODUCTS=["NMN","Cocoa Flavanols","GLP-1/Berberine","Turk and Tongkat","Spermidine","Sleepex","Brain Complex","Spike Protein Detox","Longevity Coffee","NMNH"];

const fmt=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+(n||0).toFixed(0);
const fmtK=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(0)+"K":(n||0).toLocaleString();

const Chart=({data,color,height=180,metric})=>{
  const [hovered,setHovered]=useState(null);
  if(!data||!data.length)return React.createElement("div",{style:{height,display:"flex",alignItems:"center",justifyContent:"center",color:"#525252"}},"No data");
  const max=Math.max(...data.map(d=>d.value||0));
  const formatVal=v=>metric==="revenue"||metric==="spend"?fmt(v):metric==="roas"?(v||0).toFixed(2)+"x":fmtK(v);
  return React.createElement("div",{style:{position:"relative",height}},
    hovered!==null&&data[hovered]&&React.createElement("div",{style:{position:"absolute",left:Math.min(Math.max((hovered/data.length)*100,10),90)+"%",top:0,transform:"translateX(-50%)",backgroundColor:"#1a1a1a",border:"1px solid #404040",borderRadius:"10px",padding:"12px",zIndex:100}},
      React.createElement("p",{style:{margin:0,fontWeight:"600",color:"#fff",fontSize:"13px"}},data[hovered].label),
      React.createElement("p",{style:{margin:"6px 0 0",color:color,fontWeight:"700",fontSize:"18px"}},formatVal(data[hovered].value))
    ),
    React.createElement("div",{style:{display:"flex",alignItems:"flex-end",gap:data.length>20?"2px":"6px",height:height-35,padding:"0 4px"}},
      data.map((d,i)=>{const h=max>0?(d.value/max)*100:0;return React.createElement("div",{key:i,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",minWidth:"4px"},onMouseEnter:()=>setHovered(i),onMouseLeave:()=>setHovered(null)},
        React.createElement("div",{style:{width:"100%",backgroundColor:hovered===i?color:color+"99",borderRadius:"4px 4px 0 0",height:Math.max(h,3)+"%",minHeight:"4px",transition:"all 0.15s"}})
      );})
    ),
    data.length<=12&&React.createElement("div",{style:{display:"flex",gap:"6px",padding:"8px 4px 0"}},data.map((d,i)=>React.createElement("span",{key:i,style:{flex:1,fontSize:"10px",color:"#525252",textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},d.label)))
  );
};

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [selInf,setSelInf]=useState(null);
  const [selScript,setSelScript]=useState(null);
  const [search,setSearch]=useState("");
  const [sortBy,setSortBy]=useState("revenue");
  const [sortDir,setSortDir]=useState("desc");
  const [timeRange,setTimeRange]=useState("all");
  const [chartMetric,setChartMetric]=useState("revenue");
  const [selMetric,setSelMetric]=useState(null);
  const [genProduct,setGenProduct]=useState("");
  const [genMsgs,setGenMsgs]=useState([]);
  const [genInput,setGenInput]=useState("");
  const [genLoading,setGenLoading]=useState(false);
  const [liveScript,setLiveScript]=useState(null);
  const [brainMsgs,setBrainMsgs]=useState([]);
  const [brainInput,setBrainInput]=useState("");
  const [brainLoading,setBrainLoading]=useState(false);
  const chatRef=useRef(null);
  const brainRef=useRef(null);

  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;if(brainRef.current)brainRef.current.scrollTop=brainRef.current.scrollHeight;},[genMsgs,brainMsgs]);

  const stats=useMemo(()=>{
    const r=VIDEOS.reduce((s,v)=>s+(v.pdfRev||0),0);
    const sp=VIDEOS.reduce((s,v)=>s+(v.pdfSpend||0),0);
    const vw=VIDEOS.reduce((s,v)=>s+(v.views||0),0);
    const refs=VIDEOS.reduce((s,v)=>s+(v.pdfRefs||0),0);
    const clicks=VIDEOS.reduce((s,v)=>s+(v.pdfClicks||0),0);
    return{revenue:r,spend:sp,views:vw,refs:refs,clicks:clicks,roas:sp>0?r/sp:0,videos:VIDEOS.length,convRate:clicks>0?(refs/clicks)*100:0};
  },[]);

  const influencers=useMemo(()=>{
    const m={};
    VIDEOS.forEach(v=>{
      if(!m[v.inf])m[v.inf]={name:v.inf,videos:[],revenue:0,spend:0,views:0,clicks:0,refs:0,scripts:new Set(),platforms:new Set(),products:new Set()};
      m[v.inf].videos.push(v);m[v.inf].revenue+=v.pdfRev||0;m[v.inf].spend+=v.pdfSpend||0;m[v.inf].views+=v.views||0;m[v.inf].clicks+=v.pdfClicks||0;m[v.inf].refs+=v.pdfRefs||0;
      if(v.script)m[v.inf].scripts.add(v.script);if(v.plt)m[v.inf].platforms.add(v.plt);if(v.product)m[v.inf].products.add(v.product);
    });
    return Object.values(m).map(i=>({...i,count:i.videos.length,roas:i.spend>0?i.revenue/i.spend:0,convRate:i.clicks>0?(i.refs/i.clicks)*100:0,avgRev:i.videos.length>0?i.revenue/i.videos.length:0,scripts:[...i.scripts],platforms:[...i.platforms],products:[...i.products]}));
  },[]);

  const sorted=useMemo(()=>{
    let f=search?influencers.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())):influencers;
    return[...f].sort((a,b)=>sortDir==="desc"?(b[sortBy]||0)-(a[sortBy]||0):(a[sortBy]||0)-(b[sortBy]||0));
  },[influencers,search,sortBy,sortDir]);

  const getChartData=(inf,metric,range)=>{
    if(!inf)return[];
    let videos=[...inf.videos].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range!=="all"){const now=new Date();const months={"1m":1,"3m":3,"6m":6,"1y":12}[range]||12;const cutoff=new Date(now.setMonth(now.getMonth()-months));videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    return videos.map(v=>({label:new Date(v.dt).toLocaleDateString("en-US",{month:"short",day:"numeric"}),value:metric==="revenue"?v.pdfRev:metric==="roas"?(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0):metric==="views"?v.views:v.pdfRefs}));
  };

  const getTimeData=(metric,range)=>{
    let videos=[...VIDEOS].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range!=="all"){const now=new Date();const months={"1m":1,"3m":3,"6m":6,"1y":12}[range]||12;const cutoff=new Date(now.setMonth(now.getMonth()-months));videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    const monthly={};
    videos.forEach(v=>{const m=v.dt.substring(0,7);if(!monthly[m])monthly[m]={revenue:0,spend:0,views:0,refs:0,count:0};monthly[m].revenue+=v.pdfRev||0;monthly[m].spend+=v.pdfSpend||0;monthly[m].views+=v.views||0;monthly[m].refs+=v.pdfRefs||0;monthly[m].count+=1;});
    return Object.entries(monthly).map(function(entry){var month=entry[0];var data=entry[1];return{label:new Date(month+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"}),value:metric==="roas"?(data.spend>0?data.revenue/data.spend:0):data[metric]};});
  };

  const generateScript=async function(msg){
    if(!msg&&!genProduct)return;
    var m=msg||("Generate a high-converting script for "+genProduct);
    var newMsgs=[...genMsgs,{role:"user",content:m}];setGenMsgs(newMsgs);setGenInput("");setGenLoading(true);
    var topInf=sorted.slice(0,10).map(function(i){return i.name+": "+i.roas.toFixed(2)+"x ROAS";}).join(", ");
    var sys="You create scripts for Black Forest Supplements. Top influencers: "+topInf+". Products: "+PRODUCTS.join(", ")+". Return JSON with: title, product, hook, problem, solution, cta, tips array, expectedRoas number, confidence number.";
    try{
      var res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,system:sys,messages:newMsgs.map(function(m){return{role:m.role,content:m.content};})})});
      var data=await res.json();var txt=data.content&&data.content[0]?data.content[0].text:"Error";
      try{var match=txt.match(/\{[\s\S]*"hook"[\s\S]*"cta"[\s\S]*\}/);if(match)setLiveScript(JSON.parse(match[0]));}catch(e){}
      setGenMsgs([...newMsgs,{role:"assistant",content:txt}]);
    }catch(e){setGenMsgs([...newMsgs,{role:"assistant",content:"Error: "+e.message}]);}
    setGenLoading(false);
  };

  var sendBrain=async function(msg){
    if(!msg)return;
    var newMsgs=[...brainMsgs,{role:"user",content:msg}];setBrainMsgs(newMsgs);setBrainInput("");setBrainLoading(true);
    var infData=sorted.slice(0,15).map(function(i){return i.name+": $"+(i.revenue/1000).toFixed(0)+"K rev, "+i.roas.toFixed(2)+"x ROAS, "+i.count+" videos";}).join("; ");
    var sys="You are BFS Intelligence Brain with full data access. INFLUENCER DATA: "+infData+". Total: "+stats.videos+" videos, "+fmt(stats.revenue)+" revenue, "+stats.roas.toFixed(2)+"x ROAS. Give specific, data-driven insights.";
    try{
      var res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:sys,messages:newMsgs.map(function(m){return{role:m.role,content:m.content};})})});
      var data=await res.json();var txt=data.content&&data.content[0]?data.content[0].text:"Error";
      setBrainMsgs([...newMsgs,{role:"assistant",content:txt}]);
    }catch(e){setBrainMsgs([...newMsgs,{role:"assistant",content:"Error: "+e.message}]);}
    setBrainLoading(false);
  };

  var tabs=[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"influencers",label:"Influencers",icon:"👥"},{id:"scripts",label:"Scripts",icon:"📝"},{id:"insights",label:"Insights",icon:"💡"},{id:"brain",label:"Brain Chat",icon:"🧠"},{id:"generator",label:"AI Generator",icon:"✨"}];
  var ranges=[{id:"1m",label:"1M"},{id:"3m",label:"3M"},{id:"6m",label:"6M"},{id:"1y",label:"1Y"},{id:"all",label:"All"}];

  return React.createElement("div",{style:{minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#f0f0f0",fontFamily:"Inter,-apple-system,sans-serif"}},
    selMetric&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"900px",maxHeight:"80vh",overflow:"auto",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},selMetric+" Over Time"),
          React.createElement("button",{onClick:function(){setSelMetric(null);},style:{padding:"10px 14px",background:"#333",border:"none",cursor:"pointer",borderRadius:"10px",color:"#fff"}},"X")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          React.createElement("div",{style:{display:"flex",gap:"8px",marginBottom:"20px"}},ranges.map(function(r){return React.createElement("button",{key:r.id,onClick:function(){setTimeRange(r.id);},style:{padding:"8px 16px",borderRadius:"8px",backgroundColor:timeRange===r.id?"#f59e0b":"#252525",border:"none",color:timeRange===r.id?"#000":"#fff",cursor:"pointer",fontWeight:timeRange===r.id?"700":"400"}},r.label);})),
          React.createElement(Chart,{data:getTimeData(selMetric,timeRange),color:selMetric==="revenue"?"#22c55e":selMetric==="spend"?"#ef4444":"#60a5fa",height:300,metric:selMetric})
        )
      )
    ),
    selInf&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"1100px",maxHeight:"90vh",overflow:"auto",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"16px"}},
            React.createElement("div",{style:{width:"56px",height:"56px",borderRadius:"14px",background:"linear-gradient(135deg,"+(selInf.roas>=4?"#22c55e":"#f59e0b")+","+(selInf.roas>=4?"#16a34a":"#d97706")+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",fontWeight:"700",color:"#fff"}},selInf.name.charAt(0)),
            React.createElement("div",null,
              React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},selInf.name),
              React.createElement("p",{style:{color:"#a3a3a3",margin:"4px 0 0"}},selInf.platforms.join(" - ")+" - "+selInf.count+" videos")
            )
          ),
          React.createElement("button",{onClick:function(){setSelInf(null);},style:{padding:"10px 14px",background:"#333",border:"none",cursor:"pointer",borderRadius:"10px",color:"#fff"}},"X")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px",marginBottom:"24px"}},
            [{l:"Revenue",v:fmt(selInf.revenue),c:"#22c55e"},{l:"Spend",v:fmt(selInf.spend),c:"#ef4444"},{l:"ROAS",v:selInf.roas.toFixed(2)+"x",c:selInf.roas>=3?"#22c55e":"#fbbf24"},{l:"Views",v:fmtK(selInf.views),c:"#60a5fa"},{l:"Conv Rate",v:selInf.convRate.toFixed(1)+"%",c:"#a78bfa"},{l:"Avg/Video",v:fmt(selInf.avgRev),c:"#f472b6"}].map(function(m,i){return React.createElement("div",{key:i,style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px",border:"1px solid #333"}},React.createElement("p",{style:{fontSize:"11px",color:"#737373",margin:0}},m.l),React.createElement("p",{style:{fontSize:"22px",fontWeight:"700",margin:"6px 0 0",color:m.c}},m.v));})
          ),
          React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"16px",padding:"20px",border:"1px solid #333",marginBottom:"20px"}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}},
              React.createElement("div",{style:{display:"flex",gap:"8px"}},["revenue","roas","views","refs"].map(function(m){return React.createElement("button",{key:m,onClick:function(){setChartMetric(m);},style:{padding:"8px 14px",borderRadius:"8px",backgroundColor:chartMetric===m?"rgba(245,158,11,0.2)":"transparent",border:"1px solid "+(chartMetric===m?"#f59e0b":"#404040"),color:chartMetric===m?"#fbbf24":"#a3a3a3",cursor:"pointer",fontSize:"12px",textTransform:"capitalize"}},m);})),
              React.createElement("div",{style:{display:"flex",gap:"4px"}},ranges.map(function(t){return React.createElement("button",{key:t.id,onClick:function(){setTimeRange(t.id);},style:{padding:"6px 12px",borderRadius:"6px",backgroundColor:timeRange===t.id?"#f59e0b":"transparent",border:"none",color:timeRange===t.id?"#000":"#737373",cursor:"pointer",fontSize:"11px"}},t.label);}))
            ),
            React.createElement(Chart,{data:getChartData(selInf,chartMetric,timeRange),color:chartMetric==="revenue"?"#22c55e":chartMetric==="roas"?"#fbbf24":"#60a5fa",height:200,metric:chartMetric})
          ),
          React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"14px",padding:"18px",border:"1px solid #333"}},
            React.createElement("h4",{style:{fontSize:"14px",fontWeight:"700",margin:"0 0 12px"}},"Video History"),
            React.createElement("div",{style:{maxHeight:"200px",overflowY:"auto"}},
              React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"12px"}},
                React.createElement("thead",null,React.createElement("tr",{style:{backgroundColor:"#1a1a1a"}},
                  React.createElement("th",{style:{textAlign:"left",padding:"10px",color:"#737373"}},"Date"),
                  React.createElement("th",{style:{textAlign:"left",padding:"10px",color:"#737373"}},"Product"),
                  React.createElement("th",{style:{textAlign:"right",padding:"10px",color:"#737373"}},"Revenue"),
                  React.createElement("th",{style:{textAlign:"right",padding:"10px",color:"#737373"}},"ROAS")
                )),
                React.createElement("tbody",null,selInf.videos.sort(function(a,b){return new Date(b.dt)-new Date(a.dt);}).map(function(v,i){return React.createElement("tr",{key:i,style:{borderTop:"1px solid #333"}},
                  React.createElement("td",{style:{padding:"10px",color:"#a3a3a3"}},v.dt),
                  React.createElement("td",{style:{padding:"10px"}},v.product||"-"),
                  React.createElement("td",{style:{padding:"10px",textAlign:"right",color:"#22c55e"}},fmt(v.pdfRev)),
                  React.createElement("td",{style:{padding:"10px",textAlign:"right"}},React.createElement("span",{style:{padding:"2px 6px",borderRadius:"4px",backgroundColor:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?"rgba(34,197,94,0.15)":"rgba(251,191,36,0.15)",color:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?"#22c55e":"#fbbf24",fontSize:"11px"}},(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0).toFixed(2)+"x"))
                );}))
              )
            )
          )
        )
      )
    ),
    selScript&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"700px",maxHeight:"90vh",overflow:"auto",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,
            React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},selScript.name),
            React.createElement("p",{style:{color:"#a3a3a3",margin:"4px 0 0"}},selScript.product)
          ),
          React.createElement("button",{onClick:function(){setSelScript(null);},style:{padding:"10px 14px",background:"#333",border:"none",cursor:"pointer",borderRadius:"10px",color:"#fff"}},"X")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          selScript.avgRoas&&React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}},
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px"}},React.createElement("p",{style:{fontSize:"11px",color:"#737373",margin:0}},"Avg ROAS"),React.createElement("p",{style:{fontSize:"24px",fontWeight:"700",margin:"6px 0 0",color:"#22c55e"}},selScript.avgRoas+"x")),
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px"}},React.createElement("p",{style:{fontSize:"11px",color:"#737373",margin:0}},"Times Used"),React.createElement("p",{style:{fontSize:"24px",fontWeight:"700",margin:"6px 0 0",color:"#60a5fa"}},selScript.timesUsed)),
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px"}},React.createElement("p",{style:{fontSize:"11px",color:"#737373",margin:0}},"Total Revenue"),React.createElement("p",{style:{fontSize:"24px",fontWeight:"700",margin:"6px 0 0",color:"#fbbf24"}},fmt(selScript.totalRev)))
          ),
          selScript.hook&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},
            [{key:"hook",label:"HOOK",color:"#f59e0b"},{key:"problem",label:"PROBLEM",color:"#ef4444"},{key:"solution",label:"SOLUTION",color:"#22c55e"},{key:"cta",label:"CTA",color:"#a78bfa"}].map(function(item){return selScript[item.key]&&React.createElement("div",{key:item.key,style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px",borderLeft:"4px solid "+item.color}},React.createElement("h5",{style:{fontSize:"12px",fontWeight:"700",color:item.color,margin:"0 0 8px"}},item.label),React.createElement("p",{style:{color:"#e5e5e5",fontSize:"14px",lineHeight:"1.6",margin:0}},selScript[item.key]));}),
            selScript.tips&&React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px"}},React.createElement("h5",{style:{fontSize:"12px",fontWeight:"700",color:"#fbbf24",margin:"0 0 8px"}},"TIPS"),React.createElement("ul",{style:{margin:0,paddingLeft:"16px",color:"#d1d5db",fontSize:"13px"}},selScript.tips.map(function(t,i){return React.createElement("li",{key:i,style:{marginBottom:"4px"}},t);})))
          )
        )
      )
    ),
    React.createElement("header",{style:{borderBottom:"2px solid #d97706",background:"linear-gradient(135deg,#0a0a0a 0%,#1a1510 50%,#0a0a0a 100%)",padding:"16px 32px"}},
      React.createElement("div",{style:{maxWidth:"1400px",margin:"0 auto",display:"flex",alignItems:"center",gap:"16px"}},
        React.createElement("div",{style:{width:"48px",height:"48px",borderRadius:"14px",background:"linear-gradient(135deg,#f59e0b,#b45309)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}},"🌲"),
        React.createElement("div",null,
          React.createElement("h1",{style:{fontSize:"24px",fontWeight:"800",color:"#fff",margin:0}},"Black Forest Intelligence"),
          React.createElement("p",{style:{fontSize:"12px",color:"#fbbf24",margin:0}},stats.videos+" Videos - "+sorted.length+" Influencers - "+fmt(stats.revenue)+" Revenue")
        )
      )
    ),
    React.createElement("nav",{style:{borderBottom:"1px solid #333",backgroundColor:"#111",position:"sticky",top:0,zIndex:40}},
      React.createElement("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"0 32px",display:"flex",gap:"4px"}},
        tabs.map(function(t){return React.createElement("button",{key:t.id,onClick:function(){setTab(t.id);},style:{padding:"14px 22px",background:tab===t.id?"linear-gradient(to bottom,rgba(245,158,11,0.15),transparent)":"transparent",border:"none",borderBottom:tab===t.id?"3px solid #f59e0b":"3px solid transparent",color:tab===t.id?"#fbbf24":"#a3a3a3",cursor:"pointer",fontWeight:tab===t.id?"600":"500",fontSize:"14px",display:"flex",alignItems:"center",gap:"6px"}},React.createElement("span",null,t.icon),t.label);})
      )
    ),
    React.createElement("main",{style:{maxWidth:"1400px",margin:"0 auto",padding:"24px 32px"}},
      tab==="dashboard"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px"}},
          [{l:"Total Revenue",v:fmt(stats.revenue),c:"#22c55e",i:"💰",m:"revenue"},{l:"Total Spend",v:fmt(stats.spend),c:"#ef4444",i:"💸",m:"spend"},{l:"Overall ROAS",v:stats.roas.toFixed(2)+"x",c:"#fbbf24",i:"📈"},{l:"Total Views",v:fmtK(stats.views),c:"#60a5fa",i:"👁️",m:"views"},{l:"Referrals",v:fmtK(stats.refs),c:"#a78bfa",i:"🔗",m:"refs"},{l:"Conversion",v:stats.convRate.toFixed(1)+"%",c:"#f472b6",i:"🎯"}].map(function(m,i){return React.createElement("div",{key:i,onClick:function(){if(m.m)setSelMetric(m.m);},style:{backgroundColor:"#1c1c1c",borderRadius:"14px",padding:"18px",border:"1px solid #333",cursor:m.m?"pointer":"default"}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"}},React.createElement("p",{style:{fontSize:"11px",color:"#737373",margin:0}},m.l),React.createElement("span",null,m.i)),React.createElement("p",{style:{fontSize:"26px",fontWeight:"800",color:m.c,margin:0}},m.v),m.m&&React.createElement("p",{style:{fontSize:"10px",color:"#525252",margin:"6px 0 0"}},"Click for chart"));})
        ),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}},
            React.createElement("h3",{style:{fontWeight:"700",margin:0}},"Leaderboard"),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px"}},
              React.createElement("select",{value:sortBy,onChange:function(e){setSortBy(e.target.value);},style:{padding:"8px 12px",backgroundColor:"#252525",border:"1px solid #404040",borderRadius:"8px",color:"#fff",fontSize:"12px"}},
                React.createElement("option",{value:"revenue"},"Revenue"),
                React.createElement("option",{value:"roas"},"ROAS"),
                React.createElement("option",{value:"spend"},"Spend"),
                React.createElement("option",{value:"views"},"Views"),
                React.createElement("option",{value:"count"},"Videos")
              ),
              React.createElement("button",{onClick:function(){setSortDir(function(d){return d==="desc"?"asc":"desc";});},style:{padding:"8px 12px",backgroundColor:"#252525",border:"1px solid #404040",borderRadius:"8px",color:"#fff",fontSize:"12px",cursor:"pointer"}},sortDir==="desc"?"↓":"↑")
            )
          ),
          React.createElement("div",{style:{borderRadius:"10px",overflow:"hidden",border:"1px solid #333"}},
            React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"}},
              React.createElement("thead",null,React.createElement("tr",{style:{backgroundColor:"#252525"}},
                React.createElement("th",{style:{textAlign:"left",padding:"12px",color:"#737373"}},"#"),
                React.createElement("th",{style:{textAlign:"left",padding:"12px",color:"#737373"}},"Influencer"),
                React.createElement("th",{style:{textAlign:"center",padding:"12px",color:"#737373"}},"Videos"),
                React.createElement("th",{style:{textAlign:"right",padding:"12px",color:"#737373"}},"Revenue"),
                React.createElement("th",{style:{textAlign:"right",padding:"12px",color:"#737373"}},"ROAS")
              )),
              React.createElement("tbody",null,sorted.slice(0,12).map(function(inf,i){return React.createElement("tr",{key:inf.name,onClick:function(){setSelInf(inf);},style:{borderTop:"1px solid #333",cursor:"pointer"}},
                React.createElement("td",{style:{padding:"12px"}},i+1),
                React.createElement("td",{style:{padding:"12px",fontWeight:"500"}},inf.name),
                React.createElement("td",{style:{padding:"12px",textAlign:"center"}},inf.count),
                React.createElement("td",{style:{padding:"12px",textAlign:"right",color:"#22c55e"}},fmt(inf.revenue)),
                React.createElement("td",{style:{padding:"12px",textAlign:"right"}},React.createElement("span",{style:{padding:"3px 8px",borderRadius:"4px",backgroundColor:inf.roas>=3?"rgba(34,197,94,0.15)":"rgba(251,191,36,0.15)",color:inf.roas>=3?"#22c55e":"#fbbf24"}},inf.roas.toFixed(2)+"x"))
              );}))
            )
          )
        )
      ),
      tab==="influencers"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"All Influencers ("+sorted.length+")"),
          React.createElement("input",{type:"text",placeholder:"Search...",value:search,onChange:function(e){setSearch(e.target.value);},style:{width:"260px",padding:"12px 16px",backgroundColor:"#1c1c1c",border:"1px solid #333",borderRadius:"10px",color:"#fff",fontSize:"14px"}})
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"14px"}},
          sorted.map(function(inf){return React.createElement("div",{key:inf.name,onClick:function(){setSelInf(inf);},style:{backgroundColor:"#1c1c1c",borderRadius:"14px",padding:"18px",border:"1px solid #333",cursor:"pointer"}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}},
              React.createElement("div",{style:{width:"46px",height:"46px",borderRadius:"12px",background:"linear-gradient(135deg,"+(inf.roas>=4?"#22c55e":"#f59e0b")+","+(inf.roas>=4?"#16a34a":"#d97706")+")",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"700",color:"#fff"}},inf.name.charAt(0)),
              React.createElement("div",{style:{flex:1}},
                React.createElement("p",{style:{fontSize:"15px",fontWeight:"700",margin:0}},inf.name),
                React.createElement("p",{style:{color:"#737373",fontSize:"11px",margin:"2px 0 0"}},inf.count+" videos")
              ),
              React.createElement("div",{style:{textAlign:"right"}},
                React.createElement("p",{style:{fontSize:"16px",fontWeight:"800",color:"#22c55e",margin:0}},fmt(inf.revenue)),
                React.createElement("p",{style:{fontSize:"12px",color:inf.roas>=3?"#22c55e":"#fbbf24",margin:"2px 0 0"}},inf.roas.toFixed(2)+"x")
              )
            )
          );})
        )
      ),
      tab==="scripts"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"Script Library"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(350px,1fr))",gap:"14px"}},
          Object.entries(SCRIPTS).sort(function(a,b){return b[1].avgRoas-a[1].avgRoas;}).map(function(entry){var k=entry[0];var s=entry[1];return React.createElement("div",{key:k,onClick:function(){setSelScript(s);},style:{backgroundColor:"#1c1c1c",borderRadius:"14px",padding:"20px",border:"1px solid "+(s.avgRoas>=5?"rgba(16,185,129,0.5)":"#333"),cursor:"pointer"}},
            React.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"12px"}},
              React.createElement("div",null,
                React.createElement("h3",{style:{fontSize:"15px",fontWeight:"700",margin:0}},s.name),
                React.createElement("p",{style:{color:"#a3a3a3",fontSize:"12px",margin:"4px 0 0"}},s.product)
              ),
              React.createElement("div",{style:{padding:"8px 14px",borderRadius:"8px",backgroundColor:s.avgRoas>=5?"rgba(16,185,129,0.2)":"rgba(245,158,11,0.2)"}},
                React.createElement("span",{style:{fontSize:"18px",fontWeight:"800",color:s.avgRoas>=5?"#4ade80":"#fbbf24"}},s.avgRoas+"x")
              )
            ),
            React.createElement("div",{style:{display:"flex",gap:"16px",paddingTop:"12px",borderTop:"1px solid #333",fontSize:"12px",color:"#737373"}},
              React.createElement("span",null,"Used "+s.timesUsed+"x"),
              React.createElement("span",null,"-"),
              React.createElement("span",null,fmt(s.totalRev)+" total")
            )
          );})
        )
      ),
      tab==="insights"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"Performance Insights"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}},
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px"}},"Top Scripts by ROAS"),
            React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},
              Object.entries(SCRIPTS).sort(function(a,b){return b[1].avgRoas-a[1].avgRoas;}).slice(0,5).map(function(entry,i){var k=entry[0];var s=entry[1];return React.createElement("div",{key:k,onClick:function(){setSelScript(s);},style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px",backgroundColor:"#252525",borderRadius:"10px",cursor:"pointer"}},
                React.createElement("span",{style:{fontWeight:"500"}},(i+1)+". "+s.name),
                React.createElement("span",{style:{color:"#4ade80",fontWeight:"700"}},s.avgRoas+"x")
              );})
            )
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px"}},"Revenue Over Time"),
            React.createElement(Chart,{data:getTimeData("revenue","all"),color:"#22c55e",height:200,metric:"revenue"})
          )
        )
      ),
      tab==="brain"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"Intelligence Brain"),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",display:"flex",flexDirection:"column",height:"500px"}},
          React.createElement("div",{ref:brainRef,style:{flex:1,overflowY:"auto",padding:"20px",display:"flex",flexDirection:"column",gap:"12px"}},
            brainMsgs.length===0?React.createElement("div",{style:{textAlign:"center",padding:"40px",color:"#525252"}},"Ask me anything about your data"):brainMsgs.map(function(m,i){return React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}},React.createElement("div",{style:{maxWidth:"80%",borderRadius:"14px",padding:"14px 18px",backgroundColor:m.role==="user"?"rgba(245,158,11,0.2)":"#252525"}},React.createElement("pre",{style:{whiteSpace:"pre-wrap",fontSize:"14px",fontFamily:"inherit",margin:0}},m.content)));})
          ),
          React.createElement("div",{style:{padding:"16px",borderTop:"1px solid #333"}},
            React.createElement("div",{style:{display:"flex",gap:"12px"}},
              React.createElement("input",{type:"text",value:brainInput,onChange:function(e){setBrainInput(e.target.value);},onKeyDown:function(e){if(e.key==="Enter"&&!brainLoading)sendBrain(brainInput);},placeholder:"Ask the Intelligence Brain...",style:{flex:1,padding:"14px 18px",backgroundColor:"#252525",border:"1px solid #404040",borderRadius:"12px",color:"#fff",fontSize:"14px"}}),
              React.createElement("button",{onClick:function(){sendBrain(brainInput);},disabled:brainLoading,style:{padding:"14px 24px",background:"linear-gradient(135deg,#8b5cf6,#6366f1)",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"600",cursor:"pointer"}},brainLoading?"...":"Send")
            )
          )
        )
      ),
      tab==="generator"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"AI Script Generator"),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
          React.createElement("div",{style:{display:"flex",gap:"14px",marginBottom:"14px"}},
            React.createElement("select",{value:genProduct,onChange:function(e){setGenProduct(e.target.value);},style:{flex:1,padding:"12px",backgroundColor:"#252525",border:"1px solid #404040",borderRadius:"10px",color:"#fff"}},
              React.createElement("option",{value:""},"Select Product..."),
              PRODUCTS.map(function(p){return React.createElement("option",{key:p,value:p},p);})
            ),
            React.createElement("button",{onClick:function(){generateScript();},disabled:genLoading||!genProduct,style:{padding:"12px 24px",background:genProduct?"linear-gradient(135deg,#f59e0b,#ea580c)":"#333",borderRadius:"10px",border:"none",color:"#fff",fontWeight:"700",cursor:genProduct?"pointer":"not-allowed"}},genLoading?"Generating...":"Generate")
          )
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}},
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",display:"flex",flexDirection:"column",height:"400px"}},
            React.createElement("div",{style:{padding:"16px",borderBottom:"1px solid #333"}},React.createElement("h3",{style:{fontSize:"14px",fontWeight:"700",margin:0}},"Chat")),
            React.createElement("div",{ref:chatRef,style:{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"10px"}},
              genMsgs.map(function(m,i){return React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}},React.createElement("div",{style:{maxWidth:"85%",borderRadius:"12px",padding:"10px 14px",backgroundColor:m.role==="user"?"rgba(245,158,11,0.2)":"#252525"}},React.createElement("pre",{style:{whiteSpace:"pre-wrap",fontSize:"12px",fontFamily:"inherit",margin:0}},m.content.substring(0,300))));})
            ),
            React.createElement("div",{style:{padding:"12px",borderTop:"1px solid #333"}},
              React.createElement("div",{style:{display:"flex",gap:"8px"}},
                React.createElement("input",{type:"text",value:genInput,onChange:function(e){setGenInput(e.target.value);},onKeyDown:function(e){if(e.key==="Enter"&&!genLoading)generateScript(genInput);},placeholder:"Ask for changes...",style:{flex:1,padding:"10px 14px",backgroundColor:"#252525",border:"1px solid #404040",borderRadius:"10px",color:"#fff",fontSize:"13px"}}),
                React.createElement("button",{onClick:function(){generateScript(genInput);},disabled:genLoading,style:{padding:"10px 18px",background:"linear-gradient(135deg,#f59e0b,#ea580c)",borderRadius:"10px",border:"none",color:"#fff",cursor:"pointer"}},"Send")
              )
            )
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",padding:"20px"}},
            React.createElement("h3",{style:{fontSize:"14px",fontWeight:"700",margin:"0 0 16px"}},"Live Preview"),
            liveScript?React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},
              React.createElement("h4",{style:{fontSize:"16px",fontWeight:"700",margin:0}},liveScript.title||"Generated Script"),
              [{key:"hook",label:"HOOK",color:"#f59e0b"},{key:"problem",label:"PROBLEM",color:"#ef4444"},{key:"solution",label:"SOLUTION",color:"#22c55e"},{key:"cta",label:"CTA",color:"#a78bfa"}].map(function(item){return liveScript[item.key]&&React.createElement("div",{key:item.key,style:{backgroundColor:"#252525",borderRadius:"10px",padding:"14px",borderLeft:"4px solid "+item.color}},React.createElement("h5",{style:{fontSize:"11px",color:item.color,margin:"0 0 8px"}},item.label),React.createElement("p",{style:{fontSize:"13px",margin:0}},liveScript[item.key]));})
            ):React.createElement("p",{style:{color:"#525252",textAlign:"center"}},"Script will appear here")
          )
        )
      )
    ),
    React.createElement("style",null,"input::placeholder{color:#525252}select{appearance:none}*:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#1a1a1a}::-webkit-scrollbar-thumb{background:#404040;border-radius:3px}")
  );
}
