'use client'

import { useRef, useState } from "react"
import './style.css'

export default function Home() {
  const [newValue, setNewValue] = useState('')
  const [selectRadio, setSelectRadio] = useState('radio1')
  const textareaconvert = useRef()
  const textareaconvert2 = useRef()

  const handleOptionRadio = (e: any) => {
    setSelectRadio(e.target.value)
    if(e.target.value == 'option1'){
      setNewValue(value => reformatText(textareaconvert2.current.value, 1))
    }else if(e.target.value == 'option2'){
      setNewValue(value => reformatText2(textareaconvert2.current.value))
    }else if(e.target.value == 'option3'){
      setNewValue(text => text.toLowerCase())
      textareaconvert2.current.value = textareaconvert2.current.value.toLowerCase()
    }else if(e.target.value == 'option4'){
      setNewValue(text => text.toUpperCase())
      textareaconvert2.current.value = textareaconvert2.current.value.toUpperCase()
    }else if(e.target.value == 'option5') {
      setNewValue(text => transformText(text))
      textareaconvert2.current.value = transformText(textareaconvert2.current.value)
    }else if(e.target.value == 'option6'){
      textareaconvert.current.value = textareaconvert2.current.value
    }
  }

  function reformatText(text: string) {
    const characters = text.split('');
  
    const textWithSpecialChars = [];
    for (let i = 0; i < characters.length; i++) {
      textWithSpecialChars.push(characters[i]);
      if (i !== characters.length - 1) {
          textWithSpecialChars.push(String.fromCharCode(0x336));
      }
    }
  
    return textWithSpecialChars.join('');
  }

  function reformatText2(text: string) {
    const characters = text.split('');
  
    const formattedText = characters.map((char, index) => {
      if (char === ' ') {
        return char;
      } else if (index === characters.length - 1) {
        return char + '̲';
      } else {
        return char + '̲';
      }
    }).join('');
  
    return formattedText;
  }

  const transformText = (text: string) => {
    var text = text.toLocaleLowerCase()
    const words = text.split(' ');
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const formattedText = formattedWords.join(' ');
    return formattedText
  }

  const convert = (e: any) => {
    var newtext = e.target.value
    setNewValue(newtext)
  }

  const clipboard = () => {
       textareaconvert.current.select()
       document.execCommand('copy')
       alert('Copiado com sucesso')
  };

  const clear = () => {
    textareaconvert.current.value = ''
    textareaconvert2.current.value = ''
  }

  return (
    <main className="w-[100vw] h-[100vh] bg-[#eeecec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <textarea 
          className="w-[50%] rounded-md" 
          rows="4"
          onChange={e => convert(e)}
          defaultValue=""
          ref={textareaconvert2}
          />
        <div className="flex flex-col gap-[1rem] my-[1rem]">
          <div className="flex gap-[1rem]">
            <label>
              <input 
              type="radio"
              value="option1"
              checked={selectRadio === 'option1'}
              onChange={handleOptionRadio}
              />
              <del> Rasurado</del>
            </label>
            <label className="underline">
              <input 
              type="radio"
              value="option2"
              checked={selectRadio === 'option2'}
              onChange={handleOptionRadio}
              />
              Sublinhado
            </label>

            <label>
              <input 
              type="radio"
              value="option3"
              checked={selectRadio === 'option3'}
              onChange={handleOptionRadio}
              />
              Minúsculo
            </label>
          </div>
          <div className="flex gap-[1rem]">
            <label>
              <input 
              type="radio"
              value="option4"
              checked={selectRadio === 'option4'}
              onChange={handleOptionRadio}
              />
              Maiúsculo
            </label>
            <label>
              <input 
              type="radio"
              value="option5"
              checked={selectRadio === 'option5'}
              onChange={handleOptionRadio}
              />
              Iniciais Maiúsculas
            </label>
            <label>
              <input 
              type="radio"
              value="option6"
              checked={selectRadio === 'option6'}
              onChange={handleOptionRadio}
              />
              Sem efeito
            </label>
          </div>

        </div>
        <textarea 
          className={`w-[50%] rounded-md textarea`} 
          id="output"
          rows="4"
          ref={textareaconvert}
          value={newValue}
          readOnly
          />
        <div className="flex gap-[4%] w-[50%] my-[1rem]">
          <button
          onClick={clipboard}
          className="w-[48%] px-[1rem] py-[0.5rem] bg-white rounded-md hover:bg-[#6c757d] hover:text-[#fff] transition ease-linear"
          >Copiar</button>
          <button
          className="w-[48%] px-[1rem] py-[0.5rem] bg-white rounded-md hover:bg-[#6c757d] hover:text-[#fff] transition ease-linear"
          onClick={clear}
          >Limpar</button>
        </div>
      </div>
    </main>
  )
}
