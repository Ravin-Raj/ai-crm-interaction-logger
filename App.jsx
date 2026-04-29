import { useState } from "react";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const [form, setForm] = useState({
    hcp_name:"",
    interaction_type:"",
    date:"",
    time:"",
    attendees:"",
    topics:"",
    sentiment:"",
    outcomes:"",
    follow_up:""
  });


  function formatTime(time){
    if(!time) return "";
    const parts = time.split(":");
    let hour = parseInt(parts[0]);
    const minute = parts[1];
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return hour + ":" + minute + " " + ampm;
  }


  /* 🎤 Voice Recognition */

  const startVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!SpeechRecognition){
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

  };


  const sendMessage = async () => {

    if(message.trim() === "") return;

    setChat(prev => [...prev,{role:"user",text:message}]);

    try{

      const res = await fetch("http://127.0.0.1:8000/log-interaction",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({text:message})
      });

      const data = await res.json();

      /* Success message */

      setChat(prev => [
        ...prev,
        {
          role:"ai",
          type:"success",
          text:"Interaction logged successfully! Fields have been auto-filled."
        },
        {
          role:"ai",
          type:"suggestion",
          text:`Suggested Follow-up: Schedule a follow-up meeting with ${data.hcp_name || "the doctor"} next week to review discussion outcomes.`
        }
      ]);

      setForm({
        hcp_name:data.hcp_name || "",
        interaction_type:data.interaction_type || "",
        date:data.date || "",
        time:formatTime(data.time),
        attendees:data.attendees || "",
        topics:data.topics || "",
        sentiment:data.sentiment || "",
        outcomes:data.outcomes || "",
        follow_up:data.follow_up || ""
      });

    }catch{

      setChat(prev => [...prev,{
        role:"ai",
        text:"⚠️ Backend connection error"
      }]);

    }

    setMessage("");
  };


  const saveInteraction = async () => {

    await fetch("http://127.0.0.1:8000/save-interaction",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    alert("Interaction Saved Successfully");
  };


  const inputStyle={
    width:"100%",
    padding:"10px",
    marginBottom:"12px",
    borderRadius:"6px",
    border:"1px solid #444",
    background:"#1f1f1f",
    color:"white",
    height:"42px",
    boxSizing:"border-box"
  };


  return (

<div style={{
background:"#0f172a",
minHeight:"100vh",
padding:"40px",
color:"white",
fontFamily:"Arial"
}}>

<h1 style={{textAlign:"center",marginBottom:"40px"}}>
AI-Powered CRM Interaction Logger
</h1>

<div style={{display:"flex",gap:"40px"}}>

{/* LEFT PANEL */}

<div style={{
flex:1,
background:"#111827",
padding:"25px",
borderRadius:"10px"
}}>

<h2>Log HCP Interaction</h2>

<input
style={inputStyle}
placeholder="HCP Name"
value={form.hcp_name}
onChange={e=>setForm({...form,hcp_name:e.target.value})}
/>

<input
style={inputStyle}
placeholder="Interaction Type"
value={form.interaction_type}
onChange={e=>setForm({...form,interaction_type:e.target.value})}
/>

<input
type="date"
style={inputStyle}
value={form.date}
onChange={e=>setForm({...form,date:e.target.value})}
/>

<input
style={inputStyle}
placeholder="Time"
value={form.time}
onChange={e=>setForm({...form,time:e.target.value})}
/>

<input
style={inputStyle}
placeholder="Attendees"
value={form.attendees}
onChange={e=>setForm({...form,attendees:e.target.value})}
/>

<textarea
style={inputStyle}
placeholder="Topics Discussed"
value={form.topics}
onChange={e=>setForm({...form,topics:e.target.value})}
/>

<select
style={inputStyle}
value={form.sentiment}
onChange={e=>setForm({...form,sentiment:e.target.value})}
>
<option value="">Sentiment</option>
<option>Positive</option>
<option>Neutral</option>
<option>Negative</option>
</select>

<textarea
style={inputStyle}
placeholder="Outcomes"
value={form.outcomes}
onChange={e=>setForm({...form,outcomes:e.target.value})}
/>

<textarea
style={inputStyle}
placeholder="Follow-up Actions"
value={form.follow_up}
onChange={e=>setForm({...form,follow_up:e.target.value})}
/>

<button
onClick={saveInteraction}
style={{
padding:"12px 25px",
background:"#3b82f6",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
Save Interaction
</button>

</div>


{/* RIGHT PANEL */}

<div style={{
flex:1,
background:"#111827",
padding:"25px",
borderRadius:"10px"
}}>

<h2>🤖 AI Assistant</h2>

<div style={{
height:"320px",
overflowY:"auto",
border:"1px solid #333",
padding:"10px",
marginBottom:"10px"
}}>

<div style={{
background:"#dbeafe",
color:"#1e293b",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}>
Log interaction details here (e.g., "Met Dr Smith, discussed Product-X efficacy, positive sentiment, shared brochure")
</div>

{chat.map((msg,i)=>{

if(msg.role==="user"){
return(
<div key={i} style={{
background:"#e5e7eb",
color:"#111827",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px",
borderLeft:"4px solid #3b82f6"
}}>
{msg.text}
</div>
)
}

if(msg.type==="success"){
return(
<div key={i} style={{
background:"#dcfce7",
color:"#14532d",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px",
border:"1px solid #22c55e"
}}>
✅ <b>Interaction logged successfully!</b><br/>
Fields have been automatically populated based on your summary.
</div>
)
}

if(msg.type==="suggestion"){
return(
<div key={i} style={{
background:"#fef9c3",
color:"#92400e",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px",
border:"1px solid #facc15"
}}>
🤖 {msg.text}
</div>
)
}

return(
<div key={i} style={{
background:"#1f2937",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px"
}}>
🤖 {msg.text}
</div>
)

})}

</div>

<div style={{display:"flex",gap:"10px"}}>

<input
value={message}
onChange={e=>setMessage(e.target.value)}
placeholder="Describe interaction..."
style={{
flex:1,
padding:"10px",
borderRadius:"6px",
border:"1px solid #444",
background:"#1f1f1f",
color:"white"
}}
/>

<button
onClick={startVoiceInput}
style={{
padding:"10px 15px",
background:"#f59e0b",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
🎤
</button>

<button
onClick={sendMessage}
style={{
padding:"10px 20px",
background:"#22c55e",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}
>
Log
</button>

</div>

</div>

</div>

</div>

  );
}

export default App;