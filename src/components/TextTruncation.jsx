import React,{useState, useEffect} from "react";

export default function TextTruncation({text, maxLength}) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text.length > maxLength){
      setTruncatedText(text.slice(0, maxLength) + '...')
    }
  }, [text, maxLength])

  return (
    <div>
      {truncatedText}
    </div>
  )
}