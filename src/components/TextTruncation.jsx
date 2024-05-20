import React,{useState, useEffect} from "react";
import style from '../Style/TextTruncation.module.css'

export default function TextTruncation({text, maxLength, onClick, condition}) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text.length > maxLength){
      setTruncatedText(text.slice(0, maxLength))
    }
  }, [text, maxLength])

  return (
    <p>
      {truncatedText}
      <a onClick={onClick} className={style.read}> читать</a>
    </p> 
  )
}