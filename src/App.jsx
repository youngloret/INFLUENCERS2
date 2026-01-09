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
  "Joe Rogan NMN":{name:"Joe Rogan NMN #1",product:"NMN",avgRoas:5.8,timesUsed:34,totalRev:287650,
    hook:"Joe Rogan just dropped a BOMBSHELL about a supplement that's been suppressed by the pharmaceutical industry...",
    problem:"Here's what they don't want you to know: Your NAD+ levels drop by 50% by the time you're 50. This is literally why you feel tired, why your brain feels foggy, why you're aging faster than you should be.",
    solution:"NMN is the direct precursor to NAD+. It's what Harvard researcher David Sinclair has been taking daily for years. It's what the world's top longevity scientists are using. And now you can get it too.",
    cta:"BOGO deal ends tonight - Buy One Get One FREE at the link below. This is the same premium NMN the biohackers use.",
    tips:["Mention David Sinclair by name","Reference the Harvard research","Keep energy high throughout","Emphasize the BOGO urgency"]},
  "Feminization of Men":{name:"Feminization of Men",product:"Turk & Tongkat",avgRoas:7.04,timesUsed:41,totalRev:312890,
    hook:"Men today have 50% LESS testosterone than their grandfathers had at the same age. This isn't an accident...",
    problem:"Plastics in your food. Soy in everything. Chemicals in your water. They're literally attacking your masculinity every single day. And Big Pharma? They want you weak. They want you dependent.",
    solution:"Tongkat Ali and Turkesterone are nature's answer. They naturally support healthy testosterone levels without the side effects of synthetic alternatives. This is what elite athletes use.",
    cta:"Buy 2 Get 1 FREE - Take back your masculinity. Link in description.",
    tips:["Tap into the frustration men feel","Use historical comparison data","Strong call to action for masculinity","Works great with male-focused channels"]},
  "Three Letter Agencies":{name:"Three Letter Agencies",product:"NMN",avgRoas:4.2,timesUsed:22,totalRev:156780,
    hook:"Ever wonder why the FDA is trying to BAN this anti-aging compound? Follow the money...",
    problem:"The pharmaceutical industry doesn't make money from healthy people. They make money from sick people. They want you to be a lifelong customer, not a cured patient.",
    solution:"NMN is what the elites take to stay young. It's what Silicon Valley billionaires are using. And now they're trying to restrict access because it threatens their entire business model.",
    cta:"Get NMN while you still can - use code at checkout. Stock up before regulations hit.",
    tips:["Keep it credible - don't go too far","Focus on regulatory urgency","Mention the elite angle","Don't name specific agencies directly"]},
  "NMN LAST DAY":{name:"NMN LAST DAY",product:"NMN",avgRoas:12.8,timesUsed:18,totalRev:423560,
    hook:"FINAL HOURS. This is your LAST CHANCE to get NMN at 50% off. I'm not kidding - this deal dies at midnight.",
    problem:"Tomorrow the price goes back up. You've been putting off investing in your health. You've been saying 'I'll do it later.' Well, later is NOW.",
    solution:"This is the lowest price of the entire year on premium NMN. The same formula the longevity researchers use. The same quality the biohackers trust.",
    cta:"BOGO ends TONIGHT. Link in description. Set a reminder. Don't miss this. Midnight it's GONE.",
    tips:["Maximum urgency throughout","Repeat the deadline multiple times","Countdown energy","This script has the highest ROAS - use for final day pushes"]},
  "Joe Rogan GLP-1":{name:"Joe Rogan GLP-1",product:"GLP-1/Berberine",avgRoas:4.1,timesUsed:19,totalRev:134560,
    hook:"Joe Rogan just revealed there's a natural alternative to Ozempic that costs 90% less...",
    problem:"GLP-1 drugs like Ozempic cost $1,500 per month. And the side effects? Nausea, vomiting, pancreatitis. That's what you're signing up for with Big Pharma's solution.",
    solution:"Berberine has been used for thousands of years. It naturally activates GLP-1 pathways at a fraction of the cost. No prescription needed. No side effects.",
    cta:"Buy 2 Get 1 FREE - Natural weight management without the prescription. Link below.",
    tips:["Compare the price difference specifically","Mention the side effects of Ozempic","Reference the podcast for credibility","Natural alternative angle works well"]},
  "RFK FDA Tweet":{name:"RFK FDA Tweet",product:"NMN",avgRoas:5.2,timesUsed:15,totalRev:98760,
    hook:"RFK Jr. just called out the FDA for protecting Big Pharma profits over your health. And he named names...",
    problem:"The FDA is supposed to protect us. Instead, they're a revolving door with pharmaceutical executives. They approve dangerous drugs while trying to ban natural supplements that actually work.",
    solution:"NMN threatens their entire business model. If people could stay healthy naturally, who needs their expensive drugs? That's why they want it gone.",
    cta:"Support health freedom - stock up on NMN now before they restrict access. Use code for discount.",
    tips:["Ride the MAHA momentum","Health freedom angle resonates strongly","Anti-establishment energy","Don't make specific claims about FDA actions"]},
  "Cocoa Flavanols":{name:"Cocoa Flavanols",product:"Cocoa Extract",avgRoas:4.5,timesUsed:47,totalRev:267890,
    hook:"A Harvard study just proved this compound can cut heart disease risk by 27%. And it comes from chocolate...",
    problem:"Heart disease is the #1 killer in America. Doctors want to put you on statins for life. But what if there was a natural solution backed by Harvard research?",
    solution:"Cocoa flavanols improve blood flow, support healthy blood pressure, and protect your cardiovascular system. It's concentrated cocoa extract without the sugar and calories.",
    cta:"40% OFF for a limited time - protect your heart naturally. Link in description.",
    tips:["Lead with the Harvard study - it's real and credible","Compare favorably to statins","Heart health resonates with older demographics","Mention the chocolate angle - it's memorable"]},
  "Dr. Berg":{name:"Dr. Berg Authority",product:"Multiple",avgRoas:4.7,timesUsed:12,totalRev:89450,
    hook:"Dr. Berg just revealed his top 3 supplements for longevity. And one of them surprised everyone...",
    problem:"There's so much noise in the supplement space. Everyone's trying to sell you something. How do you know what actually works? You need to trust the experts who stake their reputation on results.",
    solution:"These are the exact supplements recommended by one of the most trusted voices in health. Not paid promotions - genuine recommendations based on research.",
    cta:"Check the link for Dr. Berg's recommended stack. These are selling fast.",
    tips:["Borrow authority from trusted figures","Trust angle works well with skeptical audiences","Keep it genuine - don't oversell","Expert endorsement builds credibility"]},
  "Sleepex":{name:"Sleepex Deep Sleep",product:"Sleep Formula",avgRoas:3.8,timesUsed:14,totalRev:67890,
    hook:"You're not lazy. You're not unmotivated. You're just not sleeping properly. Here's what's actually happening...",
    problem:"Melatonin knocks you out but doesn't keep you in deep sleep. You wake up just as tired. That's because you're not getting restorative sleep - the kind that actually repairs your body and brain.",
    solution:"This formula combines GABA, magnesium glycinate, and adaptogenic herbs to support deep, restorative sleep. Wake up actually feeling refreshed for once.",
    cta:"Buy 2 Get 1 FREE - Finally wake up rested. Link in description.",
    tips:["Attack melatonin directly - people relate to this","Focus on morning energy, not falling asleep","Sleep quality angle resonates widely","Tired/foggy hook gets attention"]},
  "NMN Europe Banned":{name:"NMN Europe Banned",product:"NMN",avgRoas:8.9,timesUsed:11,totalRev:156780,
    hook:"Europe just BANNED NMN. Completely illegal. And the US could be next...",
    problem:"The EU classified NMN as a 'novel food' - effectively banning it from sale. The pharmaceutical industry has been lobbying for years to restrict access to supplements that threaten their profits.",
    solution:"Right now, NMN is still legal in the United States. But with the regulatory pressure increasing, that could change. This is your window to stock up.",
    cta:"Last chance BOGO before potential regulation. Don't wait until it's too late. Link below.",
    tips:["This is real urgency - the EU ban happened","Stock up angle creates action","International comparison adds credibility","Very high ROAS due to genuine scarcity"]},
  "Longevity Mix":{name:"Longevity Coffee",product:"Longevity Blend",avgRoas:5.1,timesUsed:8,totalRev:54320,
    hook:"What if your morning coffee could add years to your life? This isn't hype - it's science...",
    problem:"Regular coffee gives you energy but it's a missed opportunity. You're already drinking it every day - why not make it work harder for you?",
    solution:"Longevity coffee infused with Lion's Mane for focus, Chaga for immunity, and adaptogenic herbs for stress. Same ritual, 10x the benefits.",
    cta:"Free shipping on your first order - upgrade your morning routine. Link in description.",
    tips:["Easy swap angle - no new habits needed","Focus on cognitive benefits","Morning routine integration","Low friction conversion"]}
};

const PRODUCTS=["NMN","Cocoa Flavanols","GLP-1/Berberine","Turk & Tongkat","Spermidine","Sleepex","Brain Complex","Spike Detox","Longevity Coffee","NMNH"];

const fmt=n=>n>=1e6?"$"+(n/1e6).toFixed(2)+"M":n>=1e3?"$"+(n/1e3).toFixed(1)+"K":"$"+(n||0).toFixed(0);
const fmtK=n=>n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(0)+"K":(n||0).toLocaleString();

// FIXED CHART - proper bar scaling
const Chart=({data,color="#f59e0b",height=200,metric="value"})=>{
  const [hov,setHov]=useState(null);
  if(!data||!data.length)return React.createElement("div",{style:{height,display:"flex",alignItems:"center",justifyContent:"center",color:"#666"}},"No data available");
  
  const values=data.map(d=>d.value||0);
  const maxVal=Math.max(...values);
  const minVal=Math.min(...values);
  const range=maxVal-minVal||1;
  
  const formatVal=v=>{
    if(metric==="revenue"||metric==="spend")return fmt(v);
    if(metric==="roas")return (v||0).toFixed(2)+"x";
    return fmtK(v);
  };

  return React.createElement("div",{style:{position:"relative",height,width:"100%"}},
    hov!==null&&data[hov]&&React.createElement("div",{style:{position:"absolute",left:`${Math.min(Math.max((hov/data.length)*100,5),95)}%`,top:"-10px",transform:"translateX(-50%)",backgroundColor:"#1f1f1f",border:"1px solid #444",borderRadius:"8px",padding:"10px 14px",zIndex:50,whiteSpace:"nowrap",boxShadow:"0 4px 12px rgba(0,0,0,0.5)"}},
      React.createElement("div",{style:{fontSize:"12px",color:"#999",marginBottom:"4px"}},data[hov].label),
      React.createElement("div",{style:{fontSize:"18px",fontWeight:"700",color:color}},formatVal(data[hov].value))
    ),
    React.createElement("div",{style:{display:"flex",alignItems:"flex-end",gap:data.length>15?"2px":"4px",height:height-40,paddingTop:"20px"}},
      data.map((d,i)=>{
        // Scale from 10% minimum to 100%
        const pct=maxVal>0?10+((d.value-minVal)/range)*90:10;
        return React.createElement("div",{key:i,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",minWidth:"8px"},onMouseEnter:()=>setHov(i),onMouseLeave:()=>setHov(null)},
          React.createElement("div",{style:{width:"100%",backgroundColor:hov===i?color:color+"cc",borderRadius:"4px 4px 0 0",height:`${pct}%`,transition:"all 0.2s ease",minHeight:"8px"}})
        );
      })
    ),
    data.length<=15&&React.createElement("div",{style:{display:"flex",gap:"4px",paddingTop:"8px"}},
      data.map((d,i)=>React.createElement("div",{key:i,style:{flex:1,fontSize:"9px",color:"#666",textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},d.label))
    )
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
  const [upConnected,setUpConnected]=useState(false);
  const [upKey,setUpKey]=useState("");
  const [showUpModal,setShowUpModal]=useState(false);
  const chatRef=useRef(null);
  const brainRef=useRef(null);

  useEffect(()=>{
    if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;
    if(brainRef.current)brainRef.current.scrollTop=brainRef.current.scrollHeight;
  },[genMsgs,brainMsgs]);

  const stats=useMemo(()=>{
    const r=VIDEOS.reduce((s,v)=>s+(v.pdfRev||0),0);
    const sp=VIDEOS.reduce((s,v)=>s+(v.pdfSpend||0),0);
    const vw=VIDEOS.reduce((s,v)=>s+(v.views||0),0);
    const refs=VIDEOS.reduce((s,v)=>s+(v.pdfRefs||0),0);
    const clicks=VIDEOS.reduce((s,v)=>s+(v.pdfClicks||0),0);
    return{revenue:r,spend:sp,views:vw,refs,clicks,roas:sp>0?r/sp:0,videos:VIDEOS.length,convRate:clicks>0?(refs/clicks)*100:0};
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

  const topScripts=useMemo(()=>Object.values(SCRIPTS).sort((a,b)=>b.avgRoas-a.avgRoas),[]);
  const topByRev=useMemo(()=>[...sorted].sort((a,b)=>b.revenue-a.revenue).slice(0,5),[sorted]);
  const topByRoas=useMemo(()=>[...sorted].filter(i=>i.count>=3).sort((a,b)=>b.roas-a.roas).slice(0,5),[sorted]);

  const getChartData=(inf,metric,range)=>{
    if(!inf)return[];
    let videos=[...inf.videos].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range&&range!=="all"){const now=new Date();const months={"1m":1,"3m":3,"6m":6,"1y":12}[range]||12;const cutoff=new Date(now.getFullYear(),now.getMonth()-months,1);videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    return videos.map(v=>({label:new Date(v.dt).toLocaleDateString("en-US",{month:"short",day:"numeric"}),value:metric==="revenue"?v.pdfRev:metric==="roas"?(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0):metric==="views"?v.views:v.pdfRefs}));
  };

  const getTimeData=(metric,range)=>{
    let videos=[...VIDEOS].sort((a,b)=>new Date(a.dt)-new Date(b.dt));
    if(range&&range!=="all"){const now=new Date();const months={"1m":1,"3m":3,"6m":6,"1y":12}[range]||12;const cutoff=new Date(now.getFullYear(),now.getMonth()-months,1);videos=videos.filter(v=>new Date(v.dt)>=cutoff);}
    const monthly={};
    videos.forEach(v=>{const m=v.dt.substring(0,7);if(!monthly[m])monthly[m]={revenue:0,spend:0,views:0,refs:0};monthly[m].revenue+=v.pdfRev||0;monthly[m].spend+=v.pdfSpend||0;monthly[m].views+=v.views||0;monthly[m].refs+=v.pdfRefs||0;});
    return Object.entries(monthly).sort((a,b)=>a[0].localeCompare(b[0])).map(([month,data])=>({label:new Date(month+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"}),value:metric==="roas"?(data.spend>0?data.revenue/data.spend:0):data[metric]}));
  };

  const connectUpPromote=()=>{if(upKey.trim()){setUpConnected(true);setShowUpModal(false);}};

  // AI Chat function for Brain
  const sendBrain=async(msg)=>{
    if(!msg||!msg.trim())return;
    const newMsgs=[...brainMsgs,{role:"user",content:msg.trim()}];
    setBrainMsgs(newMsgs);setBrainInput("");setBrainLoading(true);
    
    const infSummary=sorted.slice(0,15).map(i=>`${i.name}: $${(i.revenue/1000).toFixed(0)}K revenue, ${i.roas.toFixed(2)}x ROAS, ${i.count} videos, scripts: ${i.scripts.slice(0,3).join(", ")||"none"}`).join("\n");
    const scriptSummary=topScripts.slice(0,8).map(s=>`${s.name}: ${s.avgRoas}x ROAS, used ${s.timesUsed}x, $${(s.totalRev/1000).toFixed(0)}K total`).join("\n");
    
    const systemPrompt=`You are the BFS Intelligence Brain - an AI analyst for Black Forest Supplements influencer marketing data. You have access to complete campaign data.

TOTAL STATS: ${stats.videos} videos, ${fmt(stats.revenue)} total revenue, ${fmt(stats.spend)} total spend, ${stats.roas.toFixed(2)}x overall ROAS, ${fmtK(stats.views)} total views

TOP INFLUENCERS BY REVENUE:
${infSummary}

TOP PERFORMING SCRIPTS:
${scriptSummary}

Provide specific, data-driven insights. Reference actual numbers. Be concise but insightful. When asked about performance, give specific comparisons and recommendations.`;

    try{
      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:systemPrompt,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})
      });
      const data=await response.json();
      const reply=data.content&&data.content[0]?data.content[0].text:"Sorry, I couldn't process that request.";
      setBrainMsgs([...newMsgs,{role:"assistant",content:reply}]);
    }catch(err){
      setBrainMsgs([...newMsgs,{role:"assistant",content:"Error connecting to AI: "+err.message+". Make sure the API is accessible."}]);
    }
    setBrainLoading(false);
  };

  // AI Script Generator
  const generateScript=async(msg)=>{
    const query=msg&&msg.trim()?msg.trim():(genProduct?`Generate a high-converting script for ${genProduct}`:"");
    if(!query)return;
    
    const newMsgs=[...genMsgs,{role:"user",content:query}];
    setGenMsgs(newMsgs);setGenInput("");setGenLoading(true);
    
    const topPerformers=topScripts.slice(0,5).map(s=>`${s.name} (${s.avgRoas}x ROAS): Hook: "${s.hook.substring(0,100)}..."`).join("\n");
    
    const systemPrompt=`You are an expert direct response copywriter for Black Forest Supplements. Generate scripts that convert.

TOP PERFORMING SCRIPTS FOR REFERENCE:
${topPerformers}

KEY ANGLES THAT WORK:
- Joe Rogan / podcast references (5.8x ROAS)
- Masculinity/testosterone crisis (7.04x ROAS)
- FDA/Big Pharma conspiracy (4.2x ROAS)
- Urgency/last day (12.8x ROAS)
- Europe ban/regulation (8.9x ROAS)

PRODUCTS: ${PRODUCTS.join(", ")}

Return a JSON object with these fields:
{
  "title": "Script name",
  "product": "Product name",
  "hook": "Opening hook (2-3 sentences, create urgency/curiosity)",
  "problem": "Agitate the problem (2-3 sentences)",
  "solution": "Present the solution (2-3 sentences)",
  "cta": "Call to action (1-2 sentences with specific offer)",
  "tips": ["Tip 1", "Tip 2", "Tip 3"],
  "expectedRoas": 4.5,
  "confidence": 85
}`;

    try{
      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,system:systemPrompt,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})
      });
      const data=await response.json();
      const reply=data.content&&data.content[0]?data.content[0].text:"Error generating script.";
      
      try{
        const jsonMatch=reply.match(/\{[\s\S]*"hook"[\s\S]*"cta"[\s\S]*\}/);
        if(jsonMatch)setLiveScript(JSON.parse(jsonMatch[0]));
      }catch(e){console.log("Could not parse JSON from response");}
      
      setGenMsgs([...newMsgs,{role:"assistant",content:reply}]);
    }catch(err){
      setGenMsgs([...newMsgs,{role:"assistant",content:"Error: "+err.message}]);
    }
    setGenLoading(false);
  };

  const tabs=[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"influencers",label:"Influencers",icon:"👥"},{id:"scripts",label:"Scripts",icon:"📝"},{id:"insights",label:"Insights",icon:"💡"},{id:"brain",label:"Brain Chat",icon:"🧠"},{id:"generator",label:"AI Generator",icon:"✨"}];
  const ranges=[{id:"1m",label:"1M"},{id:"3m",label:"3M"},{id:"6m",label:"6M"},{id:"1y",label:"1Y"},{id:"all",label:"All"}];

  return React.createElement("div",{style:{minHeight:"100vh",backgroundColor:"#0a0a0a",color:"#f0f0f0",fontFamily:"Inter,-apple-system,sans-serif"}},
    
    // UpPromote Modal
    showUpModal&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"20px",padding:"32px",width:"400px",border:"1px solid #333"}},
        React.createElement("h3",{style:{fontSize:"20px",fontWeight:"700",marginBottom:"20px"}},"🔗 Connect UpPromote"),
        React.createElement("p",{style:{color:"#888",marginBottom:"20px",fontSize:"14px"}},"Enter your UpPromote API key to sync real-time referral data."),
        React.createElement("input",{type:"text",placeholder:"Enter API Key...",value:upKey,onChange:e=>setUpKey(e.target.value),style:{width:"100%",padding:"14px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"10px",color:"#fff",marginBottom:"16px",boxSizing:"border-box"}}),
        React.createElement("div",{style:{display:"flex",gap:"12px"}},
          React.createElement("button",{onClick:()=>setShowUpModal(false),style:{flex:1,padding:"12px",backgroundColor:"#333",border:"none",borderRadius:"10px",color:"#fff",cursor:"pointer"}},"Cancel"),
          React.createElement("button",{onClick:connectUpPromote,style:{flex:1,padding:"12px",background:"linear-gradient(135deg,#f59e0b,#d97706)",border:"none",borderRadius:"10px",color:"#fff",fontWeight:"600",cursor:"pointer"}},"Connect")
        )
      )
    ),

    // Metric Time Series Modal
    selMetric&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"900px",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("h2",{style:{fontSize:"22px",fontWeight:"700",margin:0,textTransform:"capitalize"}},selMetric+" Over Time"),
          React.createElement("button",{onClick:()=>setSelMetric(null),style:{padding:"8px 14px",background:"#333",border:"none",borderRadius:"8px",color:"#fff",cursor:"pointer"}},"✕")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          React.createElement("div",{style:{display:"flex",gap:"8px",marginBottom:"24px"}},ranges.map(r=>React.createElement("button",{key:r.id,onClick:()=>setTimeRange(r.id),style:{padding:"10px 18px",borderRadius:"8px",backgroundColor:timeRange===r.id?"#f59e0b":"#252525",border:"none",color:timeRange===r.id?"#000":"#fff",cursor:"pointer",fontWeight:"600"}},r.label))),
          React.createElement(Chart,{data:getTimeData(selMetric,timeRange),color:selMetric==="revenue"?"#22c55e":selMetric==="spend"?"#ef4444":selMetric==="views"?"#3b82f6":"#a855f7",height:280,metric:selMetric})
        )
      )
    ),

    // Influencer Detail Modal
    selInf&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px",overflowY:"auto"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"1100px",maxHeight:"90vh",overflow:"auto",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"16px"}},
            React.createElement("div",{style:{width:"56px",height:"56px",borderRadius:"14px",background:`linear-gradient(135deg,${selInf.roas>=4?"#22c55e":"#f59e0b"},${selInf.roas>=4?"#16a34a":"#d97706"})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",fontWeight:"700",color:"#fff"}},selInf.name.charAt(0)),
            React.createElement("div",null,
              React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},selInf.name),
              React.createElement("p",{style:{color:"#888",margin:"4px 0 0",fontSize:"14px"}},selInf.platforms.join(" • ")+" • "+selInf.count+" videos")
            )
          ),
          React.createElement("button",{onClick:()=>setSelInf(null),style:{padding:"10px 14px",background:"#333",border:"none",borderRadius:"10px",color:"#fff",cursor:"pointer"}},"✕")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px",marginBottom:"24px"}},
            [{l:"Revenue",v:fmt(selInf.revenue),c:"#22c55e"},{l:"Spend",v:fmt(selInf.spend),c:"#ef4444"},{l:"ROAS",v:selInf.roas.toFixed(2)+"x",c:selInf.roas>=3?"#22c55e":"#fbbf24"},{l:"Views",v:fmtK(selInf.views),c:"#3b82f6"},{l:"Conv Rate",v:selInf.convRate.toFixed(1)+"%",c:"#a855f7"},{l:"Avg/Video",v:fmt(selInf.avgRev),c:"#ec4899"}].map((m,i)=>React.createElement("div",{key:i,style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px"}},
              React.createElement("p",{style:{fontSize:"11px",color:"#888",margin:0}},m.l),
              React.createElement("p",{style:{fontSize:"22px",fontWeight:"700",margin:"6px 0 0",color:m.c}},m.v)
            ))
          ),
          React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"16px",padding:"20px",marginBottom:"20px"}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}},
              React.createElement("div",{style:{display:"flex",gap:"8px"}},["revenue","roas","views","refs"].map(m=>React.createElement("button",{key:m,onClick:()=>setChartMetric(m),style:{padding:"8px 14px",borderRadius:"8px",backgroundColor:chartMetric===m?"rgba(245,158,11,0.2)":"transparent",border:"1px solid "+(chartMetric===m?"#f59e0b":"#444"),color:chartMetric===m?"#fbbf24":"#888",cursor:"pointer",fontSize:"12px",textTransform:"capitalize"}},m))),
              React.createElement("div",{style:{display:"flex",gap:"4px"}},ranges.map(r=>React.createElement("button",{key:r.id,onClick:()=>setTimeRange(r.id),style:{padding:"6px 12px",borderRadius:"6px",backgroundColor:timeRange===r.id?"#f59e0b":"transparent",border:"none",color:timeRange===r.id?"#000":"#888",cursor:"pointer",fontSize:"11px"}},r.label)))
            ),
            React.createElement(Chart,{data:getChartData(selInf,chartMetric,timeRange),color:chartMetric==="revenue"?"#22c55e":chartMetric==="roas"?"#fbbf24":"#3b82f6",height:200,metric:chartMetric})
          ),
          React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"14px",padding:"18px"}},
            React.createElement("h4",{style:{fontSize:"14px",fontWeight:"700",margin:"0 0 12px"}},"📹 Video History"),
            React.createElement("div",{style:{maxHeight:"250px",overflowY:"auto"}},
              React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"12px"}},
                React.createElement("thead",null,React.createElement("tr",{style:{backgroundColor:"#1a1a1a"}},["Date","Product","Script","Revenue","ROAS"].map((h,i)=>React.createElement("th",{key:i,style:{textAlign:i>2?"right":"left",padding:"10px",color:"#666"}},h)))),
                React.createElement("tbody",null,selInf.videos.sort((a,b)=>new Date(b.dt)-new Date(a.dt)).map((v,i)=>React.createElement("tr",{key:i,style:{borderTop:"1px solid #333"}},
                  React.createElement("td",{style:{padding:"10px",color:"#999"}},v.dt),
                  React.createElement("td",{style:{padding:"10px"}},v.product||"-"),
                  React.createElement("td",{style:{padding:"10px",color:"#f59e0b"}},v.script||"-"),
                  React.createElement("td",{style:{padding:"10px",textAlign:"right",color:"#22c55e"}},fmt(v.pdfRev)),
                  React.createElement("td",{style:{padding:"10px",textAlign:"right"}},React.createElement("span",{style:{padding:"3px 8px",borderRadius:"4px",backgroundColor:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?"rgba(34,197,94,0.15)":"rgba(251,191,36,0.15)",color:(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0)>=3?"#22c55e":"#fbbf24"}},(v.pdfSpend>0?v.pdfRev/v.pdfSpend:0).toFixed(2)+"x"))
                )))
              )
            )
          )
        )
      )
    ),

    // Script Detail Modal
    selScript&&React.createElement("div",{style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"20px",overflowY:"auto"}},
      React.createElement("div",{style:{backgroundColor:"#1a1a1a",borderRadius:"24px",width:"100%",maxWidth:"800px",maxHeight:"90vh",overflow:"auto",border:"1px solid #333"}},
        React.createElement("div",{style:{padding:"24px",borderBottom:"1px solid #333",display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("div",null,
            React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},selScript.name),
            React.createElement("p",{style:{color:"#888",margin:"4px 0 0"}},selScript.product)
          ),
          React.createElement("button",{onClick:()=>setSelScript(null),style:{padding:"10px 14px",background:"#333",border:"none",borderRadius:"10px",color:"#fff",cursor:"pointer"}},"✕")
        ),
        React.createElement("div",{style:{padding:"24px"}},
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginBottom:"24px"}},
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px",textAlign:"center"}},React.createElement("p",{style:{fontSize:"11px",color:"#888",margin:0}},"Avg ROAS"),React.createElement("p",{style:{fontSize:"28px",fontWeight:"800",margin:"8px 0 0",color:"#22c55e"}},selScript.avgRoas+"x")),
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px",textAlign:"center"}},React.createElement("p",{style:{fontSize:"11px",color:"#888",margin:0}},"Times Used"),React.createElement("p",{style:{fontSize:"28px",fontWeight:"800",margin:"8px 0 0",color:"#3b82f6"}},selScript.timesUsed)),
            React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"12px",padding:"16px",textAlign:"center"}},React.createElement("p",{style:{fontSize:"11px",color:"#888",margin:0}},"Total Revenue"),React.createElement("p",{style:{fontSize:"28px",fontWeight:"800",margin:"8px 0 0",color:"#fbbf24"}},fmt(selScript.totalRev)))
          ),
          React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},
            [{key:"hook",label:"🎣 HOOK",color:"#f59e0b"},{key:"problem",label:"⚠️ PROBLEM",color:"#ef4444"},{key:"solution",label:"💡 SOLUTION",color:"#22c55e"},{key:"cta",label:"🎯 CALL TO ACTION",color:"#a855f7"}].map(item=>selScript[item.key]&&React.createElement("div",{key:item.key,style:{backgroundColor:"#252525",borderRadius:"14px",padding:"18px",borderLeft:"4px solid "+item.color}},
              React.createElement("h5",{style:{fontSize:"12px",fontWeight:"700",color:item.color,margin:"0 0 10px",letterSpacing:"0.5px"}},item.label),
              React.createElement("p",{style:{color:"#e5e5e5",fontSize:"15px",lineHeight:"1.7",margin:0}},selScript[item.key])
            )),
            selScript.tips&&selScript.tips.length>0&&React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"14px",padding:"18px"}},
              React.createElement("h5",{style:{fontSize:"12px",fontWeight:"700",color:"#fbbf24",margin:"0 0 12px"}},"💡 PERFORMANCE TIPS"),
              React.createElement("ul",{style:{margin:0,paddingLeft:"20px",color:"#d1d5db",fontSize:"14px",lineHeight:"1.8"}},selScript.tips.map((t,i)=>React.createElement("li",{key:i,style:{marginBottom:"6px"}},t)))
            )
          )
        )
      )
    ),

    // Header
    React.createElement("header",{style:{borderBottom:"2px solid #d97706",background:"linear-gradient(135deg,#0a0a0a 0%,#1a1510 50%,#0a0a0a 100%)",padding:"16px 32px"}},
      React.createElement("div",{style:{maxWidth:"1400px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"16px"}},
          React.createElement("div",{style:{width:"48px",height:"48px",borderRadius:"14px",background:"linear-gradient(135deg,#f59e0b,#b45309)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}},"🌲"),
          React.createElement("div",null,
            React.createElement("h1",{style:{fontSize:"24px",fontWeight:"800",color:"#fff",margin:0}},"Black Forest Intelligence"),
            React.createElement("p",{style:{fontSize:"12px",color:"#fbbf24",margin:0}},stats.videos+" Videos • "+sorted.length+" Influencers • "+fmt(stats.revenue)+" Revenue")
          )
        ),
        React.createElement("button",{onClick:()=>setShowUpModal(true),style:{padding:"10px 20px",background:upConnected?"linear-gradient(135deg,#22c55e,#16a34a)":"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"10px",color:"#fff",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"}},upConnected?"✓ UpPromote Connected":"🔗 Connect UpPromote")
      )
    ),

    // Nav
    React.createElement("nav",{style:{borderBottom:"1px solid #333",backgroundColor:"#111",position:"sticky",top:0,zIndex:40}},
      React.createElement("div",{style:{maxWidth:"1400px",margin:"0 auto",padding:"0 32px",display:"flex",gap:"4px"}},
        tabs.map(t=>React.createElement("button",{key:t.id,onClick:()=>setTab(t.id),style:{padding:"14px 22px",background:tab===t.id?"linear-gradient(to bottom,rgba(245,158,11,0.15),transparent)":"transparent",border:"none",borderBottom:tab===t.id?"3px solid #f59e0b":"3px solid transparent",color:tab===t.id?"#fbbf24":"#888",cursor:"pointer",fontWeight:tab===t.id?"600":"500",fontSize:"14px",display:"flex",alignItems:"center",gap:"6px"}},React.createElement("span",null,t.icon),t.label))
      )
    ),

    // Main Content
    React.createElement("main",{style:{maxWidth:"1400px",margin:"0 auto",padding:"24px 32px"}},

      // DASHBOARD TAB
      tab==="dashboard"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"12px"}},
          [{l:"Total Revenue",v:fmt(stats.revenue),c:"#22c55e",i:"💰",m:"revenue"},{l:"Total Spend",v:fmt(stats.spend),c:"#ef4444",i:"💸",m:"spend"},{l:"Overall ROAS",v:stats.roas.toFixed(2)+"x",c:"#fbbf24",i:"📈"},{l:"Total Views",v:fmtK(stats.views),c:"#3b82f6",i:"👁️",m:"views"},{l:"Referrals",v:fmtK(stats.refs),c:"#a855f7",i:"🔗",m:"refs"},{l:"Conversion",v:stats.convRate.toFixed(1)+"%",c:"#ec4899",i:"🎯"}].map((m,i)=>React.createElement("div",{key:i,onClick:()=>m.m&&setSelMetric(m.m),style:{backgroundColor:"#1c1c1c",borderRadius:"14px",padding:"18px",border:"1px solid #333",cursor:m.m?"pointer":"default",transition:"transform 0.15s",":hover":{transform:"translateY(-2px)"}}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"}},React.createElement("p",{style:{fontSize:"11px",color:"#888",margin:0}},m.l),React.createElement("span",null,m.i)),
            React.createElement("p",{style:{fontSize:"26px",fontWeight:"800",color:m.c,margin:0}},m.v),
            m.m&&React.createElement("p",{style:{fontSize:"10px",color:"#555",margin:"6px 0 0"}},"Click for chart →")
          ))
        ),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}},
            React.createElement("h3",{style:{fontWeight:"700",margin:0,fontSize:"18px"}},"📊 Influencer Leaderboard"),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px"}},
              React.createElement("select",{value:sortBy,onChange:e=>setSortBy(e.target.value),style:{padding:"8px 12px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"8px",color:"#fff",fontSize:"12px"}},["revenue","roas","spend","views","count"].map(o=>React.createElement("option",{key:o,value:o},o.charAt(0).toUpperCase()+o.slice(1)))),
              React.createElement("button",{onClick:()=>setSortDir(d=>d==="desc"?"asc":"desc"),style:{padding:"8px 12px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"8px",color:"#fff",cursor:"pointer"}},sortDir==="desc"?"↓ High":"↑ Low")
            )
          ),
          React.createElement("div",{style:{borderRadius:"10px",overflow:"hidden",border:"1px solid #333"}},
            React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"}},
              React.createElement("thead",null,React.createElement("tr",{style:{backgroundColor:"#252525"}},["#","Influencer","Videos","Revenue","Spend","ROAS"].map((h,i)=>React.createElement("th",{key:i,style:{textAlign:i>1?"right":"left",padding:"12px",color:"#666"}},h)))),
              React.createElement("tbody",null,sorted.slice(0,20).map((inf,i)=>React.createElement("tr",{key:inf.name,onClick:()=>setSelInf(inf),style:{borderTop:"1px solid #333",cursor:"pointer"}},
                React.createElement("td",{style:{padding:"12px",color:"#666"}},i+1),
                React.createElement("td",{style:{padding:"12px",fontWeight:"500"}},inf.name),
                React.createElement("td",{style:{padding:"12px",textAlign:"right",color:"#888"}},inf.count),
                React.createElement("td",{style:{padding:"12px",textAlign:"right",color:"#22c55e",fontWeight:"600"}},fmt(inf.revenue)),
                React.createElement("td",{style:{padding:"12px",textAlign:"right",color:"#ef4444"}},fmt(inf.spend)),
                React.createElement("td",{style:{padding:"12px",textAlign:"right"}},React.createElement("span",{style:{padding:"4px 10px",borderRadius:"6px",backgroundColor:inf.roas>=3?"rgba(34,197,94,0.15)":"rgba(251,191,36,0.15)",color:inf.roas>=3?"#22c55e":"#fbbf24",fontWeight:"600"}},inf.roas.toFixed(2)+"x"))
              )))
            )
          )
        )
      ),

      // INFLUENCERS TAB
      tab==="influencers"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"👥 All Influencers ("+sorted.length+")"),
          React.createElement("input",{type:"text",placeholder:"Search influencers...",value:search,onChange:e=>setSearch(e.target.value),style:{width:"280px",padding:"12px 16px",backgroundColor:"#1c1c1c",border:"1px solid #333",borderRadius:"10px",color:"#fff",fontSize:"14px"}})
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"14px"}},
          sorted.map(inf=>React.createElement("div",{key:inf.name,onClick:()=>setSelInf(inf),style:{backgroundColor:"#1c1c1c",borderRadius:"14px",padding:"18px",border:"1px solid #333",cursor:"pointer"}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"14px"}},
              React.createElement("div",{style:{width:"50px",height:"50px",borderRadius:"12px",background:`linear-gradient(135deg,${inf.roas>=4?"#22c55e":"#f59e0b"},${inf.roas>=4?"#16a34a":"#d97706"})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"700",color:"#fff"}},inf.name.charAt(0)),
              React.createElement("div",{style:{flex:1}},
                React.createElement("p",{style:{fontSize:"16px",fontWeight:"700",margin:0}},inf.name),
                React.createElement("p",{style:{color:"#666",fontSize:"12px",margin:"2px 0 0"}},inf.count+" videos • "+inf.platforms.join(", "))
              ),
              React.createElement("div",{style:{textAlign:"right"}},
                React.createElement("p",{style:{fontSize:"18px",fontWeight:"800",color:"#22c55e",margin:0}},fmt(inf.revenue)),
                React.createElement("p",{style:{fontSize:"14px",color:inf.roas>=3?"#22c55e":"#fbbf24",margin:"2px 0 0",fontWeight:"600"}},inf.roas.toFixed(2)+"x ROAS")
              )
            )
          ))
        )
      ),

      // SCRIPTS TAB
      tab==="scripts"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"📝 Script Library"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:"16px"}},
          Object.entries(SCRIPTS).sort((a,b)=>b[1].avgRoas-a[1].avgRoas).map(([k,s])=>React.createElement("div",{key:k,onClick:()=>setSelScript(s),style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:`2px solid ${s.avgRoas>=5?"rgba(34,197,94,0.4)":"#333"}`,cursor:"pointer"}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}},
              React.createElement("div",null,
                React.createElement("h3",{style:{fontSize:"16px",fontWeight:"700",margin:0}},s.name),
                React.createElement("p",{style:{color:"#888",fontSize:"13px",margin:"4px 0 0"}},s.product)
              ),
              React.createElement("div",{style:{padding:"10px 16px",borderRadius:"10px",backgroundColor:s.avgRoas>=5?"rgba(34,197,94,0.15)":"rgba(245,158,11,0.15)"}},
                React.createElement("span",{style:{fontSize:"20px",fontWeight:"800",color:s.avgRoas>=5?"#22c55e":"#fbbf24"}},s.avgRoas+"x")
              )
            ),
            React.createElement("p",{style:{color:"#999",fontSize:"13px",margin:"0 0 12px",lineHeight:"1.5"}},s.hook.substring(0,120)+"..."),
            React.createElement("div",{style:{display:"flex",gap:"20px",paddingTop:"12px",borderTop:"1px solid #333",fontSize:"12px",color:"#666"}},
              React.createElement("span",null,"📊 Used "+s.timesUsed+"x"),
              React.createElement("span",null,"💰 "+fmt(s.totalRev)+" total")
            )
          ))
        )
      ),

      // INSIGHTS TAB
      tab==="insights"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"💡 Performance Insights"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}},
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px",fontSize:"16px"}},"🏆 Top Revenue Generators"),
            React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},topByRev.map((inf,i)=>React.createElement("div",{key:inf.name,onClick:()=>setSelInf(inf),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px",backgroundColor:"#252525",borderRadius:"10px",cursor:"pointer"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
                React.createElement("span",{style:{color:i<3?"#fbbf24":"#666",fontWeight:"700"}},i+1),
                React.createElement("span",{style:{fontWeight:"500"}},inf.name)
              ),
              React.createElement("span",{style:{color:"#22c55e",fontWeight:"700"}},fmt(inf.revenue))
            )))
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px",fontSize:"16px"}},"⚡ Highest ROAS (3+ videos)"),
            React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},topByRoas.map((inf,i)=>React.createElement("div",{key:inf.name,onClick:()=>setSelInf(inf),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px",backgroundColor:"#252525",borderRadius:"10px",cursor:"pointer"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
                React.createElement("span",{style:{color:i<3?"#fbbf24":"#666",fontWeight:"700"}},i+1),
                React.createElement("span",{style:{fontWeight:"500"}},inf.name)
              ),
              React.createElement("span",{style:{color:"#22c55e",fontWeight:"700"}},inf.roas.toFixed(2)+"x")
            )))
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px",fontSize:"16px"}},"📝 Best Converting Scripts"),
            React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"10px"}},topScripts.slice(0,5).map((s,i)=>React.createElement("div",{key:s.name,onClick:()=>setSelScript(s),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px",backgroundColor:"#252525",borderRadius:"10px",cursor:"pointer"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
                React.createElement("span",{style:{color:i<3?"#fbbf24":"#666",fontWeight:"700"}},i+1),
                React.createElement("span",{style:{fontWeight:"500",fontSize:"13px"}},s.name)
              ),
              React.createElement("span",{style:{color:"#22c55e",fontWeight:"700"}},s.avgRoas+"x")
            )))
          )
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}},
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px",fontSize:"16px"}},"📈 Revenue Over Time"),
            React.createElement(Chart,{data:getTimeData("revenue","all"),color:"#22c55e",height:220,metric:"revenue"})
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
            React.createElement("h3",{style:{fontWeight:"700",marginBottom:"16px",fontSize:"16px"}},"📊 ROAS Trend"),
            React.createElement(Chart,{data:getTimeData("roas","all"),color:"#fbbf24",height:220,metric:"roas"})
          )
        )
      ),

      // BRAIN CHAT TAB
      tab==="brain"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"🧠 Intelligence Brain"),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",display:"flex",flexDirection:"column",height:"550px"}},
          React.createElement("div",{ref:brainRef,style:{flex:1,overflowY:"auto",padding:"20px",display:"flex",flexDirection:"column",gap:"14px"}},
            brainMsgs.length===0?React.createElement("div",{style:{textAlign:"center",padding:"60px 20px",color:"#555"}},
              React.createElement("div",{style:{fontSize:"48px",marginBottom:"16px"}},"🧠"),
              React.createElement("p",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}},"Ask me anything about your data"),
              React.createElement("p",{style:{fontSize:"14px"}},"Try: \"Who are my top performers?\" or \"Which scripts work best?\"")
            ):brainMsgs.map((m,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}},
              React.createElement("div",{style:{maxWidth:"80%",borderRadius:"16px",padding:"14px 18px",backgroundColor:m.role==="user"?"rgba(245,158,11,0.2)":"#252525",border:m.role==="user"?"1px solid rgba(245,158,11,0.3)":"1px solid #333"}},
                React.createElement("pre",{style:{whiteSpace:"pre-wrap",fontSize:"14px",fontFamily:"inherit",margin:0,lineHeight:"1.6"}},m.content)
              )
            ))
          ),
          React.createElement("div",{style:{padding:"16px",borderTop:"1px solid #333"}},
            React.createElement("div",{style:{display:"flex",gap:"12px"}},
              React.createElement("input",{type:"text",value:brainInput,onChange:e=>setBrainInput(e.target.value),onKeyDown:e=>{if(e.key==="Enter"&&!brainLoading)sendBrain(brainInput);},placeholder:"Ask the Intelligence Brain...",style:{flex:1,padding:"14px 18px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"12px",color:"#fff",fontSize:"14px"}}),
              React.createElement("button",{onClick:()=>sendBrain(brainInput),disabled:brainLoading,style:{padding:"14px 28px",background:brainLoading?"#444":"linear-gradient(135deg,#8b5cf6,#6366f1)",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"600",cursor:brainLoading?"not-allowed":"pointer"}},brainLoading?"...":"Ask")
            )
          )
        )
      ),

      // GENERATOR TAB
      tab==="generator"&&React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},
        React.createElement("h2",{style:{fontSize:"24px",fontWeight:"800",margin:0}},"✨ AI Script Generator"),
        React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",padding:"20px",border:"1px solid #333"}},
          React.createElement("div",{style:{display:"flex",gap:"14px"}},
            React.createElement("select",{value:genProduct,onChange:e=>setGenProduct(e.target.value),style:{flex:1,padding:"14px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"10px",color:"#fff",fontSize:"14px"}},
              React.createElement("option",{value:""},"Select Product..."),
              PRODUCTS.map(p=>React.createElement("option",{key:p,value:p},p))
            ),
            React.createElement("button",{onClick:()=>generateScript(),disabled:genLoading||!genProduct,style:{padding:"14px 28px",background:genProduct?"linear-gradient(135deg,#f59e0b,#d97706)":"#333",borderRadius:"10px",border:"none",color:"#fff",fontWeight:"700",cursor:genProduct?"pointer":"not-allowed"}},genLoading?"Generating...":"✨ Generate Script")
          )
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}},
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",display:"flex",flexDirection:"column",height:"450px"}},
            React.createElement("div",{style:{padding:"16px",borderBottom:"1px solid #333"}},React.createElement("h3",{style:{fontSize:"15px",fontWeight:"700",margin:0}},"💬 Chat with AI")),
            React.createElement("div",{ref:chatRef,style:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"}},
              genMsgs.map((m,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}},
                React.createElement("div",{style:{maxWidth:"85%",borderRadius:"12px",padding:"12px 16px",backgroundColor:m.role==="user"?"rgba(245,158,11,0.2)":"#252525"}},
                  React.createElement("pre",{style:{whiteSpace:"pre-wrap",fontSize:"13px",fontFamily:"inherit",margin:0}},m.content.length>500?m.content.substring(0,500)+"...":m.content)
                )
              ))
            ),
            React.createElement("div",{style:{padding:"14px",borderTop:"1px solid #333"}},
              React.createElement("div",{style:{display:"flex",gap:"10px"}},
                React.createElement("input",{type:"text",value:genInput,onChange:e=>setGenInput(e.target.value),onKeyDown:e=>{if(e.key==="Enter"&&!genLoading)generateScript(genInput);},placeholder:"Ask for changes...",style:{flex:1,padding:"12px 16px",backgroundColor:"#252525",border:"1px solid #444",borderRadius:"10px",color:"#fff",fontSize:"13px"}}),
                React.createElement("button",{onClick:()=>generateScript(genInput),disabled:genLoading,style:{padding:"12px 20px",background:"linear-gradient(135deg,#f59e0b,#d97706)",borderRadius:"10px",border:"none",color:"#fff",cursor:"pointer"}},"Send")
              )
            )
          ),
          React.createElement("div",{style:{backgroundColor:"#1c1c1c",borderRadius:"16px",border:"1px solid #333",padding:"20px",overflowY:"auto",maxHeight:"450px"}},
            React.createElement("h3",{style:{fontSize:"15px",fontWeight:"700",margin:"0 0 16px"}},"📝 Live Preview"),
            liveScript?React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}},
              React.createElement("h4",{style:{fontSize:"18px",fontWeight:"700",margin:0,color:"#fbbf24"}},liveScript.title||"Generated Script"),
              liveScript.product&&React.createElement("p",{style:{color:"#888",margin:0,fontSize:"13px"}},"Product: "+liveScript.product),
              [{key:"hook",label:"🎣 HOOK",color:"#f59e0b"},{key:"problem",label:"⚠️ PROBLEM",color:"#ef4444"},{key:"solution",label:"💡 SOLUTION",color:"#22c55e"},{key:"cta",label:"🎯 CTA",color:"#a855f7"}].map(item=>liveScript[item.key]&&React.createElement("div",{key:item.key,style:{backgroundColor:"#252525",borderRadius:"10px",padding:"14px",borderLeft:"4px solid "+item.color}},
                React.createElement("h5",{style:{fontSize:"11px",color:item.color,margin:"0 0 8px",fontWeight:"700"}},item.label),
                React.createElement("p",{style:{fontSize:"13px",margin:0,lineHeight:"1.6"}},liveScript[item.key])
              )),
              liveScript.tips&&React.createElement("div",{style:{backgroundColor:"#252525",borderRadius:"10px",padding:"14px"}},
                React.createElement("h5",{style:{fontSize:"11px",color:"#fbbf24",margin:"0 0 8px",fontWeight:"700"}},"💡 TIPS"),
                React.createElement("ul",{style:{margin:0,paddingLeft:"16px",fontSize:"12px",color:"#ccc"}},liveScript.tips.map((t,i)=>React.createElement("li",{key:i},t)))
              ),
              liveScript.expectedRoas&&React.createElement("div",{style:{display:"flex",gap:"16px",paddingTop:"12px",borderTop:"1px solid #333"}},
                React.createElement("span",{style:{fontSize:"13px",color:"#888"}},"Expected ROAS: ",React.createElement("strong",{style:{color:"#22c55e"}},liveScript.expectedRoas+"x")),
                liveScript.confidence&&React.createElement("span",{style:{fontSize:"13px",color:"#888"}},"Confidence: ",React.createElement("strong",{style:{color:"#fbbf24"}},liveScript.confidence+"%"))
              )
            ):React.createElement("div",{style:{textAlign:"center",padding:"40px",color:"#555"}},
              React.createElement("p",null,"Select a product and generate a script"),
              React.createElement("p",{style:{fontSize:"13px",marginTop:"8px"}},"The AI will create a high-converting script based on your top performers")
            )
          )
        )
      )
    ),

    // Global styles
    React.createElement("style",null,`
      input::placeholder{color:#666}
      select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
      *:focus{outline:none;border-color:#f59e0b !important}
      ::-webkit-scrollbar{width:8px}
      ::-webkit-scrollbar-track{background:#1a1a1a}
      ::-webkit-scrollbar-thumb{background:#444;border-radius:4px}
      ::-webkit-scrollbar-thumb:hover{background:#555}
    `)
  );
}
