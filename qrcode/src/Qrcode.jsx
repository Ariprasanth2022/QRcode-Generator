import { createElement } from "react";
import { useState } from "react"

export const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading,setLoading] = useState(false)
  const [qrCode, setqrCode] = useState("")
  const [qrSize,setqrSize] = useState("")
  async function generateQR(){
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrCode)}`;
      setImg(url);
    }
    catch(error){
      console.error("Error generating OR code",error);
    }
    finally{
      setLoading(false);
    }
   }
   function download(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
   }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please Wait...</p>}
        {img && <img className="qrcodeimage" src={img} />}
        <div>
          <label htmlFor="dataInput" className="input-label">Data for QR code :</label>
          <input type="text" id="dataInput" placeholder=" Enter data QR code" value={qrCode} onChange={(e)=>setqrCode(e.target.value)}/>
          <label htmlFor="sizeInput" className="input-label">Image size (e.g.,150) :</label>
          <input type="text" id="sizeInput" placeholder=" Image size" value={qrSize} onChange={(e)=>setqrSize(e.target.value)}/>
        
        <button className="generate" onClick={generateQR} disabled={loading}>Generate QR code</button>
        <button className="download" onClick={download}>Download QR code</button>
        </div>
        <p className="footer">Designed by Ariprasanth</p>
    </div>
    
  )
}
