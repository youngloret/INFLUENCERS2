const express=require('express'),app=express(),path=require('path');
app.use(express.json());
app.use('/api/uppromote/referrals',async(req,res)=>{try{const r=await fetch('https://af.uppromote.com/api/referrals',{headers:{'Authorization':req.headers.authorization}});res.json(await r.json());}catch(e){res.status(500).json({error:e.message});}});
app.use('/api/uppromote/affiliates',async(req,res)=>{try{const r=await fetch('https://af.uppromote.com/api/affiliates',{headers:{'Authorization':req.headers.authorization}});res.json(await r.json());}catch(e){res.status(500).json({error:e.message});}});
app.use(express.static(path.join(__dirname,'dist')));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'dist','index.html')));
app.listen(process.env.PORT||3000,()=>console.log('BFS Hub running'));
