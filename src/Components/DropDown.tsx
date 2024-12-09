import React ,{useEffect, useState} from "react";
import '../Modules/themes';
type options = {
    label:string;
    value:string;
}
interface DropDownProps{
    options:options[],
    onSelect:any,
    condition:any,
    theme:any,
    value:string
}

const DropDown:React.FC<DropDownProps> = ({options,onSelect,condition,theme,value}) => {

    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(()=>{
        setSelectedValue(value)
    },)

    const handleChange = (event:any) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
        onSelect(selectedOption); // Pass the selected value back to the parent component
    };
  return (
    <div className="hover:scale-110" style={{border:"2px solid",borderRadius:"8px"}}>
     {condition === "Theme" ? <select value={selectedValue} className={`cursor-pointer rounded-lg ${selectedValue !== '' ? "ace-"+selectedValue : "ace-dracula"}`} onChange={handleChange}>
                <option value="">Select an Theme</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> : 
            <select value={selectedValue} className={`cursor-pointer rounded-lg ${theme !== '' ? "ace-"+theme : "ace-dracula"}`} onChange={handleChange}>
            <option value="">Select an Language</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    }
    </div>
  );
};

export default DropDown;
