import styled from "styled-components";



type InputLoginType = {
    type: string; // Type de l'input (ex : "text", "password", "email")
    placeholder?: string; // Le placeholder est optionnel
    value: string; // La valeur actuelle de l'input
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction appelée lors du changement
  };

  

export default function InputLogin({type, placeholder, value, onChange}: InputLoginType) {


  return (

    <Input

       type={type}
       placeholder={placeholder}
       value={value}
       onChange={onChange}

      /> 

  )
}

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;
